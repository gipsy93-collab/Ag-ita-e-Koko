import React, { useState } from 'react';

interface Scenario {
  id: number;
  title: string;
  description: string;
  problem: string;
  correctDrugId: string;
  explanation: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    title: "Alérgico a Penicilina",
    description: "Paciente con infección respiratoria (Gram+). Historial de shock anafiláctico con Penicilinas.",
    problem: "Necesitamos una alternativa segura.",
    correctDrugId: "ERITROMICINA",
    explanation: "¡Correcto! Los Macrólidos (Eritromicina, Claritromicina) son la alternativa de elección en alérgicos a beta-lactámicos."
  },
  {
    id: 2,
    title: "S. aureus Resistente (MRSA)",
    description: "Infección grave por Staphylococcus aureus resistente a Meticilina. Los beta-lactámicos no sirven.",
    problem: "Necesitamos el 'cañón' de los Gram Positivos.",
    correctDrugId: "VANCOMICINA",
    explanation: "¡Exacto! La Vancomicina (Glucopéptido) es el fármaco de elección para MRSA. Recuerda infundir lento para evitar 'Hombre Rojo'."
  },
  {
    id: 3,
    title: "Tuberculosis (TBC)",
    description: "Paciente diagnosticado con TBC. Necesitamos un aminoglucósido clásico como parte del esquema.",
    problem: "Necesitamos el primer aminoglucósido descubierto.",
    correctDrugId: "ESTREPTOMICINA",
    explanation: "¡Bien! La Estreptomicina es un aminoglucósido esencial en el tratamiento de la Tuberculosis y Brucelosis."
  },
  {
    id: 4,
    title: "Infección Cutánea Leve",
    description: "Pequeña herida infectada. Queremos tratamiento tópico para evitar absorción sistémica tóxica.",
    problem: "Necesitamos un aminoglucósido tópico.",
    correctDrugId: "NEOMICINA",
    explanation: "¡Perfecto! La Neomicina es muy tóxica por vía parenteral, pero excelente por vía tópica (piel) u oral (no se absorbe)."
  },
  {
    id: 5,
    title: "Error de Medicación",
    description: "A un paciente se le administró Neomicina parenteral por error. Presenta parálisis flácida y dificultad respiratoria.",
    problem: "Bloqueo Neuromuscular. Necesitamos el antídoto.",
    correctDrugId: "CALCIO_NEOSTIGMINA",
    explanation: "¡Vital! El bloqueo neuromuscular por aminoglucósidos se revierte con Calcio y Neostigmina."
  }
];

const DRUGS = [
  { id: "ERITROMICINA", name: "Eritromicina", type: "Macrólido" },
  { id: "VANCOMICINA", name: "Vancomicina", type: "Glucopéptido" },
  { id: "ESTREPTOMICINA", name: "Estreptomicina", type: "Aminoglucósido" },
  { id: "NEOMICINA", name: "Neomicina", type: "Aminoglucósido (Tópico)" },
  { id: "CALCIO_NEOSTIGMINA", name: "Calcio + Neostigmina", type: "Antídoto" },
  { id: "TETRACICLINA", name: "Tetraciclina", type: "Bacteriostático" },
];

const Theme16Sim: React.FC = () => {
  const [level, setLevel] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentScenario = SCENARIOS[level];

  const handleSelect = (drugId: string) => {
    if (feedback) return;

    if (drugId === currentScenario.correctDrugId) {
      setIsCorrect(true);
      setFeedback(currentScenario.explanation);
    } else {
      setIsCorrect(false);
      setFeedback("❌ Fármaco incorrecto. Revisa las alergias, resistencias y toxicidades.");
    }
  };

  const nextLevel = () => {
    if (level < SCENARIOS.length - 1) {
      setLevel(level + 1);
      setFeedback(null);
      setIsCorrect(null);
    } else {
      setFeedback("¡Experto en Antibióticos Complejos! 🧪✅");
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white p-4 overflow-hidden">
      <div className="bg-purple-700 p-4 rounded-xl shadow-lg mb-4 flex justify-between items-center">
         <h2 className="text-xl font-black flex items-center gap-2">☣️ Zona de Toxicidad</h2>
         <span className="bg-black/30 px-3 py-1 rounded-full text-sm">Caso {level + 1}/{SCENARIOS.length}</span>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto">
        {/* Paciente / Bacteria */}
        <div className="bg-gray-800 rounded-3xl p-6 border-4 border-purple-600 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
           {/* Biohazard effect */}
           <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(168,85,247,0.2)_0%,transparent_70%)] animate-pulse"></div>
           
           <div className="w-32 h-32 bg-purple-900/50 rounded-full flex items-center justify-center mb-4 relative z-10">
              <span className="text-6xl animate-bounce">🧫</span>
           </div>
           
           <h3 className="text-2xl font-black text-purple-400 mb-2">{currentScenario.title}</h3>
           <p className="text-gray-300 mb-4 text-lg">{currentScenario.description}</p>
           
           <div className="w-full bg-gray-900 p-4 rounded-xl border border-gray-600 z-10">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Desafío Clínico</h4>
              <p className="text-purple-200 font-bold italic">"{currentScenario.problem}"</p>
           </div>
        </div>

        {/* Estantería de Fármacos */}
        <div className="flex flex-col gap-4">
           <h3 className="text-xl font-bold text-center md:text-left">💊 Elige el Tratamiento</h3>
           <div className="grid grid-cols-1 gap-3">
              {DRUGS.map((drug) => (
                <button
                  key={drug.id}
                  onClick={() => handleSelect(drug.id)}
                  disabled={!!feedback}
                  className={`
                    p-4 rounded-xl text-left border-l-8 transition-all hover:translate-x-2
                    ${feedback 
                      ? 'opacity-50 cursor-not-allowed bg-gray-800 border-gray-600' 
                      : 'bg-white text-gray-900 border-purple-500 hover:bg-purple-50 shadow-lg'
                    }
                  `}
                >
                   <div className="font-black text-lg">{drug.name}</div>
                   <div className="text-sm opacity-70">{drug.type}</div>
                </button>
              ))}
           </div>
        </div>
      </div>

      {/* Feedback Overlay */}
      {feedback && (
        <div className={`absolute bottom-0 left-0 right-0 p-6 z-20 backdrop-blur-md border-t-4 transition-all duration-500 animate-slide-up ${isCorrect ? 'bg-green-900/90 border-green-400' : 'bg-red-900/90 border-red-400'}`}>
           <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-4 justify-between">
              <div>
                 <h3 className={`text-2xl font-black mb-1 ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
                    {isCorrect ? '¡TRATAMIENTO CORRECTO!' : 'ERROR DE MEDICACIÓN'}
                 </h3>
                 <p className="text-white text-lg">{feedback}</p>
              </div>
              
              {isCorrect ? (
                  level < SCENARIOS.length - 1 ? (
                    <button onClick={nextLevel} className="px-8 py-3 bg-white text-green-900 font-black rounded-full shadow-xl hover:scale-105 transition-transform">
                        Siguiente Caso ➡️
                    </button>
                  ) : (
                    <button onClick={() => window.location.reload()} className="px-8 py-3 bg-yellow-400 text-yellow-900 font-black rounded-full shadow-xl hover:scale-105 transition-transform">
                        Menú Principal 🏠
                    </button>
                  )
              ) : (
                 <button onClick={() => {setFeedback(null); setIsCorrect(null);}} className="px-8 py-3 bg-white text-red-900 font-black rounded-full shadow-xl hover:scale-105 transition-transform">
                    Intentar de nuevo 🔄
                 </button>
              )}
           </div>
        </div>
      )}
    </div>
  );
};

export default Theme16Sim;