import React, { useState } from 'react';

interface Scenario {
  id: number;
  bugName: string;
  description: string;
  characteristics: string[];
  correctDrugId: string;
  explanation: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    bugName: "Streptococcus pyogenes",
    description: "Paciente con amigdalitis bacteriana. Dolor de garganta severo y fiebre.",
    characteristics: ["Gram Positivo", "No produce Beta-lactamasas", "Sensible"],
    correctDrugId: "PENICILINA",
    explanation: "¡Correcto! La Penicilina G o V sigue siendo el tratamiento de elección para el estreptococo, ya que no suele desarrollar resistencias complejas."
  },
  {
    id: 2,
    bugName: "Staphylococcus aureus (Productor de Penicilinasa)",
    description: "Infección de piel (celulitis). La bacteria ha aprendido a destruir el anillo betalactámico simple.",
    characteristics: ["Gram Positivo", "Produce Betalactamasas", "Destruye Penicilina G"],
    correctDrugId: "METICILINA",
    explanation: "¡Exacto! Necesitas una penicilina penicilinasa-resistente como la Meticilina, Oxacilina o Cloxacilina."
  },
  {
    id: 3,
    bugName: "Pseudomonas aeruginosa",
    description: "Paciente hospitalizado con neumonía nosocomial. Bacteria muy resistente y peligrosa.",
    characteristics: ["Gram Negativo", "Oportunista", "Multirresistente"],
    correctDrugId: "CARBENICILINA",
    explanation: "¡Bien! Necesitas una Penicilina Antipseudomónica (Carbenicilina, Ticarcilina o Piperacilina) o un Carbapenem."
  },
  {
    id: 4,
    bugName: "Mycoplasma pneumoniae",
    description: "Neumonía atípica. El paciente tose mucho pero la radiografía es difusa.",
    characteristics: ["¡NO TIENE PARED CELULAR!", "Intracelular"],
    correctDrugId: "MACROLIDO",
    explanation: "¡Brillante! Como el Mycoplasma no tiene pared, los Betalactámicos NO funcionan. Usamos Macrólidos (Eritromicina, Azitromicina) que atacan ribosomas."
  }
];

const DRUGS = [
  { id: "PENICILINA", name: "Penicilina G/V", type: "Betalactámico Natural" },
  { id: "METICILINA", name: "Meticilina/Oxacilina", type: "Resistente a Penicilinasa" },
  { id: "CARBENICILINA", name: "Ticarcilina/Carbenicilina", type: "Antipseudomonas" },
  { id: "MACROLIDO", name: "Eritromicina (Macrólido)", type: "Inhibidor Síntesis Proteica" },
  { id: "VANCOMICINA", name: "Vancomicina", type: "Glicopéptido" },
];

const AntibioticSim: React.FC = () => {
  const [level, setLevel] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentScenario = SCENARIOS[level];

  const handleSelect = (drugId: string) => {
    if (feedback) return; // Wait for next level

    if (drugId === currentScenario.correctDrugId) {
      setIsCorrect(true);
      setFeedback(currentScenario.explanation);
    } else {
      setIsCorrect(false);
      setFeedback("❌ Antibiótico ineficaz. Revisa las características de la bacteria e inténtalo de nuevo.");
    }
  };

  const nextLevel = () => {
    if (level < SCENARIOS.length - 1) {
      setLevel(level + 1);
      setFeedback(null);
      setIsCorrect(null);
    } else {
      // End game
      setFeedback("¡Has curado a todos los pacientes! 🦠🔫");
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white p-4 overflow-hidden">
      <div className="bg-green-700 p-4 rounded-xl shadow-lg mb-4 flex justify-between items-center">
         <h2 className="text-xl font-black">🏥 La Batalla Bacteriana</h2>
         <span className="bg-black/30 px-3 py-1 rounded-full text-sm">Caso {level + 1}/{SCENARIOS.length}</span>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto">
        {/* Paciente / Bacteria */}
        <div className="bg-gray-800 rounded-3xl p-6 border-4 border-gray-700 flex flex-col items-center text-center shadow-2xl">
           <div className="w-32 h-32 bg-green-900/50 rounded-full flex items-center justify-center mb-4 relative animate-pulse">
              <span className="text-6xl">🦠</span>
              {/* Particles */}
              <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
              <div className="absolute bottom-2 left-2 w-3 h-3 bg-green-400 rounded-full animate-ping delay-100"></div>
           </div>
           
           <h3 className="text-2xl font-black text-green-400 mb-2">{currentScenario.bugName}</h3>
           <p className="text-gray-300 mb-6">{currentScenario.description}</p>
           
           <div className="w-full bg-gray-900 p-4 rounded-xl border border-gray-600">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Características Detectadas</h4>
              <div className="flex flex-wrap gap-2 justify-center">
                 {currentScenario.characteristics.map((char, i) => (
                   <span key={i} className="px-3 py-1 bg-green-900 text-green-200 rounded-full text-sm font-bold border border-green-700">
                     {char}
                   </span>
                 ))}
              </div>
           </div>
        </div>

        {/* Arsenal */}
        <div className="flex flex-col gap-4">
           <h3 className="text-xl font-bold text-center md:text-left">⚡ Elige tu Arma</h3>
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
                      : 'bg-white text-gray-900 border-green-500 hover:bg-green-50 shadow-lg'
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
                    {isCorrect ? '¡EFECTIVO!' : 'FALLO TERAPÉUTICO'}
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

export default AntibioticSim;