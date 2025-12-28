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
    title: "Edema Agudo de Pulmón",
    description: "Paciente llega ahogándose. Pulmones encharcados. Situación crítica.",
    problem: "Necesitamos eliminar mucho líquido RÁPIDO.",
    correctDrugId: "FUROSEMIDA",
    explanation: "¡Correcto! Furosemida es el diurético de máxima eficacia (Asa). Indispensable en emergencias como el EAP."
  },
  {
    id: 2,
    title: "Hipertensión Arterial Esencial",
    description: "Paciente ambulatorio. Presión alta moderada. Sin edemas graves.",
    problem: "Necesitamos un diurético suave para mantenimiento crónico.",
    correctDrugId: "HIDROCLOROTIAZIDA",
    explanation: "¡Exacto! Las Tiazidas son ideales para HTA por su efecto vasodilatador a largo plazo y potencia media."
  },
  {
    id: 3,
    title: "Ascitis por Cirrosis",
    description: "Paciente con hígado graso y barriga hinchada (Ascitis). Tiene hiperaldosteronismo secundario.",
    problem: "Necesitamos bloquear la aldosterona y no perder más potasio.",
    correctDrugId: "ESPIRONOLACTONA",
    explanation: "¡Bien! Espironolactona es el diurético de elección en cirrosis/ascitis porque antagoniza el exceso de aldosterona."
  },
  {
    id: 4,
    title: "Edema Cerebral",
    description: "Paciente tras traumatismo craneal. Presión intracraneal elevada. Cerebro hinchado.",
    problem: "Necesitamos 'chupar' agua del tejido cerebral al vaso sanguíneo.",
    correctDrugId: "MANITOL",
    explanation: "¡Perfecto! El Manitol (osmótico) se queda en la sangre y atrae agua desde el cerebro por ósmosis."
  }
];

const DRUGS = [
  { id: "FUROSEMIDA", name: "Furosemida", type: "Diurético de Asa" },
  { id: "HIDROCLOROTIAZIDA", name: "Hidroclorotiazida", type: "Tiazida" },
  { id: "ESPIRONOLACTONA", name: "Espironolactona", type: "Ahorrador de K+" },
  { id: "MANITOL", name: "Manitol", type: "Osmótico" },
  { id: "ACETAZOLAMIDA", name: "Acetazolamida", type: "Inh. Anhidrasa Carbónica" },
];

const DiureticSim: React.FC = () => {
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
      setFeedback("❌ Fármaco incorrecto. Revisa la potencia y el mecanismo necesario.");
    }
  };

  const nextLevel = () => {
    if (level < SCENARIOS.length - 1) {
      setLevel(level + 1);
      setFeedback(null);
      setIsCorrect(null);
    } else {
      setFeedback("¡Maestro de los Fluidos! 💧✅");
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white p-4 overflow-hidden">
      <div className="bg-blue-700 p-4 rounded-xl shadow-lg mb-4 flex justify-between items-center">
         <h2 className="text-xl font-black flex items-center gap-2">🔧 Ingeniero Hidráulico</h2>
         <span className="bg-black/30 px-3 py-1 rounded-full text-sm">Nivel {level + 1}/{SCENARIOS.length}</span>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto">
        {/* Tuberías / Paciente */}
        <div className="bg-gray-800 rounded-3xl p-6 border-4 border-blue-600 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
           {/* Water effect */}
           <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-blue-500/20 animate-pulse"></div>
           
           <div className="w-32 h-32 bg-blue-900/50 rounded-full flex items-center justify-center mb-4 relative z-10">
              <span className="text-6xl animate-bounce">🚰</span>
           </div>
           
           <h3 className="text-2xl font-black text-blue-400 mb-2">{currentScenario.title}</h3>
           <p className="text-gray-300 mb-4 text-lg">{currentScenario.description}</p>
           
           <div className="w-full bg-gray-900 p-4 rounded-xl border border-gray-600 z-10">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Problema de Presión</h4>
              <p className="text-blue-200 font-bold italic">"{currentScenario.problem}"</p>
           </div>
        </div>

        {/* Válvulas / Fármacos */}
        <div className="flex flex-col gap-4">
           <h3 className="text-xl font-bold text-center md:text-left">🎛️ Abre la Válvula Correcta</h3>
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
                      : 'bg-white text-gray-900 border-blue-500 hover:bg-blue-50 shadow-lg'
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
                    {isCorrect ? '¡PRESIÓN ESTABILIZADA!' : 'FUGA NO CONTENIDA'}
                 </h3>
                 <p className="text-white text-lg">{feedback}</p>
              </div>
              
              {isCorrect ? (
                  level < SCENARIOS.length - 1 ? (
                    <button onClick={nextLevel} className="px-8 py-3 bg-white text-green-900 font-black rounded-full shadow-xl hover:scale-105 transition-transform">
                        Siguiente Nivel ➡️
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

export default DiureticSim;