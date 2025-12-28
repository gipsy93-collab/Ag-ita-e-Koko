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
    title: "Asistolia (Línea Plana)",
    description: "Paciente en parada cardiaca. El monitor muestra línea plana. Iniciamos RCP 30:2.",
    problem: "Necesitamos un vasopresor potente para mejorar perfusión.",
    correctDrugId: "ADRENALINA",
    explanation: "¡Correcto! La Adrenalina es el vasopresor de elección en cualquier ritmo de parada. Aumenta la perfusión cerebral y coronaria."
  },
  {
    id: 2,
    title: "Bradicardia Sintomática",
    description: "Paciente consciente pero mareado. Frecuencia cardiaca: 35 lpm. Tono vagal excesivo.",
    problem: "Necesitamos un vagolítico.",
    correctDrugId: "ATROPINA",
    explanation: "¡Exacto! La Atropina bloquea el sistema parasimpático (antagonista muscarínico) y acelera el corazón."
  },
  {
    id: 3,
    title: "Sobredosis de Heroína",
    description: "Paciente joven encontrado inconsciente, pupilas mióticas (puntiformes), no respira (depresión respiratoria).",
    problem: "Intoxicación por Opiáceos.",
    correctDrugId: "NALOXONA",
    explanation: "¡Bien! La Naloxona es el antídoto específico (antagonista puro) para revertir la depresión respiratoria por opiáceos."
  },
  {
    id: 4,
    title: "Fibrilación Ventricular Refractaria",
    description: "El paciente sigue en parada tras desfibrilar. Ritmo caótico ventricular.",
    problem: "Necesitamos un antiarrítmico del Grupo III.",
    correctDrugId: "AMIODARONA",
    explanation: "¡Correcto! La Amiodarona es el antiarrítmico de elección en FV/TV sin pulso refractaria a descargas."
  },
  {
    id: 5,
    title: "Hiperpotasemia Severa",
    description: "Paciente renal crónico en parada. ECG previo con ondas T picudas. Sospecha de K+ muy alto.",
    problem: "Necesitamos proteger la membrana cardiaca.",
    correctDrugId: "CLORURO_CALCICO",
    explanation: "¡Vital! El Cloruro de Calcio estabiliza la membrana miocárdica ante la toxicidad por hiperpotasemia."
  }
];

const DRUGS = [
  { id: "ADRENALINA", name: "Adrenalina", type: "Vasopresor" },
  { id: "ATROPINA", name: "Atropina", type: "Vagolítico" },
  { id: "NALOXONA", name: "Naloxona", type: "Antídoto Opioide" },
  { id: "AMIODARONA", name: "Amiodarona", type: "Antiarrítmico" },
  { id: "CLORURO_CALCICO", name: "Cloruro Cálcico", type: "Cardiotónico / Ión" },
  { id: "GLUCOSA", name: "Glucosa", type: "Azúcar" },
];

const CPRSim: React.FC = () => {
  const [level, setLevel] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentScenario = SCENARIOS[level];

  const handleSelect = (drugId: string) => {
    if (feedback) return;

    if (drugId === "GLUCOSA") {
        setIsCorrect(false);
        setFeedback("❌ ¡ERROR! No usar Glucosa rutinariamente en RCP (daño neurológico). Solo si hipoglucemia.");
        return;
    }

    if (drugId === currentScenario.correctDrugId) {
      setIsCorrect(true);
      setFeedback(currentScenario.explanation);
    } else {
      setIsCorrect(false);
      setFeedback("❌ Fármaco incorrecto. ¡El paciente pierde tiempo vital!");
    }
  };

  const nextLevel = () => {
    if (level < SCENARIOS.length - 1) {
      setLevel(level + 1);
      setFeedback(null);
      setIsCorrect(null);
    } else {
      setFeedback("¡Reanimación Exitosa! Paciente recuperó pulso (ROSC). 💓");
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white p-4 overflow-hidden">
      <div className="bg-red-600 p-4 rounded-xl shadow-lg mb-4 flex justify-between items-center animate-pulse">
         <h2 className="text-xl font-black flex items-center gap-2">🚨 CÓDIGO ROJO: Carro de Parada</h2>
         <span className="bg-black/30 px-3 py-1 rounded-full text-sm">Caso {level + 1}/{SCENARIOS.length}</span>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto">
        {/* Monitor / Paciente */}
        <div className="bg-gray-800 rounded-3xl p-6 border-4 border-red-700 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
           {/* ECG Background simulation */}
           <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: 'linear-gradient(transparent 95%, #00ff00 95%)', backgroundSize: '100% 50px'}}></div>
           
           <div className="w-32 h-32 bg-red-900/50 rounded-full flex items-center justify-center mb-4 relative">
              <span className="text-6xl animate-ping opacity-75 absolute">❤️</span>
              <span className="text-6xl z-10">💔</span>
           </div>
           
           <h3 className="text-2xl font-black text-red-400 mb-2">{currentScenario.title}</h3>
           <p className="text-gray-300 mb-6 text-lg">{currentScenario.description}</p>
           
           <div className="w-full bg-gray-900 p-4 rounded-xl border border-gray-600 z-10">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Situación Crítica</h4>
              <p className="text-red-200 font-bold">{currentScenario.problem}</p>
           </div>
        </div>

        {/* Carro de Parada */}
        <div className="flex flex-col gap-4">
           <h3 className="text-xl font-bold text-center md:text-left">⚡ ¡Rápido! Elige el Fármaco</h3>
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
                      : 'bg-white text-gray-900 border-red-500 hover:bg-red-50 shadow-lg'
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
                    {isCorrect ? '¡BIEN HECHO!' : 'ERROR CRÍTICO'}
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

export default CPRSim;