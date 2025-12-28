import React, { useState } from 'react';

interface Scenario {
  id: number;
  virusName: string;
  symptoms: string;
  clue: string;
  correctDrugId: string;
  explanation: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    virusName: "Herpes Zóster (Culebrilla)",
    symptoms: "Erupción vesicular dolorosa que sigue un dermatoma. Antecedente de varicela.",
    clue: "Necesitamos un análogo de nucleósido clásico.",
    correctDrugId: "ACICLOVIR",
    explanation: "¡Correcto! El Aciclovir (o Valaciclovir) es el tratamiento de elección para infecciones por VHS y VVZ (Herpes/Varicela)."
  },
  {
    id: 2,
    virusName: "Citomegalovirus (CMV)",
    symptoms: "Paciente trasplantado con visión borrosa (Retinitis). Riesgo grave.",
    clue: "Necesitamos algo más potente que el aciclovir.",
    correctDrugId: "GANCICLOVIR",
    explanation: "¡Exacto! El Ganciclovir es el fármaco de elección para CMV, aunque hay que vigilar la neutropenia."
  },
  {
    id: 3,
    virusName: "VIH (SIDA)",
    symptoms: "Infección crónica. Carga viral alta. Necesitamos frenar la transcriptasa inversa.",
    clue: "Fármaco histórico, primer antirretroviral.",
    correctDrugId: "ZIDOVUDINA",
    explanation: "¡Bien! La Zidovudina (AZT) es un inhibidor de la transcriptasa inversa (ITI) fundamental en la historia del VIH."
  },
  {
    id: 4,
    virusName: "Influenza A (Gripe)",
    symptoms: "Fiebre alta, mialgias, epidemia estacional. Inicio hace < 48h.",
    clue: "Inhibidor de la neuraminidasa.",
    correctDrugId: "OSELTAMIVIR",
    explanation: "¡Correcto! Oseltamivir bloquea la neuraminidasa, impidiendo que el virus salga de la célula y se propague."
  },
  {
    id: 5,
    virusName: "COVID-19 (Investigación)",
    symptoms: "Neumonía viral grave por SARS-CoV-2.",
    clue: "Antiviral de amplio espectro en protocolo de estudio (según el tema).",
    correctDrugId: "REMDESIVIR",
    explanation: "¡Así es! Remdesivir se menciona como fármaco en protocolo de investigación clínica para COVID-19."
  }
];

const DRUGS = [
  { id: "ACICLOVIR", name: "Aciclovir", type: "Anti-Herpes" },
  { id: "GANCICLOVIR", name: "Ganciclovir", type: "Anti-CMV" },
  { id: "ZIDOVUDINA", name: "Zidovudina (AZT)", type: "Antirretroviral (ITI)" },
  { id: "OSELTAMIVIR", name: "Oseltamivir", type: "Anti-Gripe" },
  { id: "REMDESIVIR", name: "Remdesivir", type: "Anti-ARN (COVID)" },
  { id: "AMOXICILINA", name: "Amoxicilina", type: "Antibiótico (¡NO!)" },
];

const ViralSim: React.FC = () => {
  const [level, setLevel] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentScenario = SCENARIOS[level];

  const handleSelect = (drugId: string) => {
    if (feedback) return;

    if (drugId === "AMOXICILINA") {
        setIsCorrect(false);
        setFeedback("❌ ¡ERROR GRAVE! Los antibióticos NO matan virus. Solo bacterias.");
        return;
    }

    if (drugId === currentScenario.correctDrugId) {
      setIsCorrect(true);
      setFeedback(currentScenario.explanation);
    } else {
      setIsCorrect(false);
      setFeedback("❌ Fármaco ineficaz para este virus. Inténtalo de nuevo.");
    }
  };

  const nextLevel = () => {
    if (level < SCENARIOS.length - 1) {
      setLevel(level + 1);
      setFeedback(null);
      setIsCorrect(null);
    } else {
      setFeedback("¡Amenaza Biológica Neutralizada! ☣️✅");
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white p-4 overflow-hidden">
      <div className="bg-emerald-700 p-4 rounded-xl shadow-lg mb-4 flex justify-between items-center">
         <h2 className="text-xl font-black flex items-center gap-2">☣️ Cazadores de Virus</h2>
         <span className="bg-black/30 px-3 py-1 rounded-full text-sm">Nivel {level + 1}/{SCENARIOS.length}</span>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto">
        {/* Microscopio / Paciente */}
        <div className="bg-gray-800 rounded-3xl p-6 border-4 border-emerald-600 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
           {/* Radar effect */}
           <div className="absolute inset-0 rounded-full border border-emerald-500/30 animate-[ping_3s_linear_infinite] scale-50"></div>
           
           <div className="w-32 h-32 bg-emerald-900/50 rounded-full flex items-center justify-center mb-4 relative z-10">
              <span className="text-6xl animate-pulse">🦠</span>
           </div>
           
           <h3 className="text-2xl font-black text-emerald-400 mb-2">{currentScenario.virusName}</h3>
           <p className="text-gray-300 mb-4 text-lg">{currentScenario.symptoms}</p>
           
           <div className="w-full bg-gray-900 p-4 rounded-xl border border-gray-600 z-10">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Pista del Laboratorio</h4>
              <p className="text-emerald-200 font-bold italic">"{currentScenario.clue}"</p>
           </div>
        </div>

        {/* Arsenal Antiviral */}
        <div className="flex flex-col gap-4">
           <h3 className="text-xl font-bold text-center md:text-left">🧪 Selecciona el Antiviral</h3>
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
                      : 'bg-white text-gray-900 border-emerald-500 hover:bg-emerald-50 shadow-lg'
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
                    {isCorrect ? '¡VIRUS ELIMINADO!' : 'TRATAMIENTO FALLIDO'}
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

export default ViralSim;