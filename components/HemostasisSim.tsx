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
    title: "Prevención Secundaria IAM",
    description: "Paciente que ha sufrido un infarto. Necesitamos evitar que las plaquetas se vuelvan a agregar a largo plazo.",
    problem: "Necesitamos inhibir COX-1 a dosis bajas.",
    correctDrugId: "AAS",
    explanation: "¡Correcto! El Ácido Acetilsalicílico (AAS) a dosis bajas es el estándar para prevención secundaria cardiovascular."
  },
  {
    id: 2,
    title: "Trombosis Venosa Profunda (TVP)",
    description: "Paciente hospitalizado con pierna hinchada y dolorosa. Trombo en vena poplítea.",
    problem: "Necesitamos anticoagulación parenteral inmediata, preferiblemente SC.",
    correctDrugId: "ENOXAPARINA",
    explanation: "¡Exacto! La Enoxaparina (HBPM) es ideal para tratar TVP por su perfil seguro y administración subcutánea."
  },
  {
    id: 3,
    title: "Prótesis Valvular Mecánica",
    description: "Paciente con válvula metálica. Alto riesgo de embolia. Necesita anticoagulación oral crónica.",
    problem: "Necesitamos un antagonista de la Vitamina K.",
    correctDrugId: "WARFARINA",
    explanation: "¡Bien! En válvulas mecánicas, los AVK (Warfarina/Acenocumarol) siguen siendo la única opción segura aprobada."
  },
  {
    id: 4,
    title: "Ictus Isquémico Agudo (<3h)",
    description: "Paciente llega a urgencias con parálisis facial y afasia hace 2 horas. Hay un trombo bloqueando el cerebro.",
    problem: "Necesitamos disolver el trombo YA.",
    correctDrugId: "ALTEPLASA",
    explanation: "¡Vital! La Alteplasa (t-PA) es un fibrinolítico que disuelve el coágulo. Solo útil en ventana terapéutica corta."
  },
  {
    id: 5,
    title: "Sobredosis de Heparina",
    description: "Error médico. Se ha administrado heparina sódica en exceso. El paciente sangra.",
    problem: "Necesitamos el antídoto específico.",
    correctDrugId: "PROTAMINA",
    explanation: "¡Correcto! El Sulfato de Protamina neutraliza la acción de la Heparina No Fraccionada."
  }
];

const DRUGS = [
  { id: "AAS", name: "AAS (Aspirina)", type: "Antiagregante" },
  { id: "ENOXAPARINA", name: "Enoxaparina", type: "HBPM (Anticoagulante)" },
  { id: "WARFARINA", name: "Warfarina", type: "AVK (Oral)" },
  { id: "ALTEPLASA", name: "Alteplasa", type: "Fibrinolítico" },
  { id: "PROTAMINA", name: "Protamina", type: "Antídoto" },
  { id: "VITAMINA_K", name: "Vitamina K", type: "Antídoto AVK" },
];

const HemostasisSim: React.FC = () => {
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
      setFeedback("❌ Fármaco incorrecto. Revisa si necesitas prevenir (antiagregar/anticoagular) o disolver.");
    }
  };

  const nextLevel = () => {
    if (level < SCENARIOS.length - 1) {
      setLevel(level + 1);
      setFeedback(null);
      setIsCorrect(null);
    } else {
      setFeedback("¡Equilibrio Hemostático Conseguido! 🩸⚖️");
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white p-4 overflow-hidden">
      <div className="bg-rose-700 p-4 rounded-xl shadow-lg mb-4 flex justify-between items-center">
         <h2 className="text-xl font-black flex items-center gap-2">🩸 El Equilibrio Vital</h2>
         <span className="bg-black/30 px-3 py-1 rounded-full text-sm">Nivel {level + 1}/{SCENARIOS.length}</span>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto">
        {/* Paciente / Situación */}
        <div className="bg-gray-800 rounded-3xl p-6 border-4 border-rose-600 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
           {/* Blood flow effect */}
           <div className="absolute inset-0 bg-gradient-to-b from-rose-900/20 to-transparent animate-pulse"></div>
           
           <div className="w-32 h-32 bg-rose-900/50 rounded-full flex items-center justify-center mb-4 relative z-10">
              <span className="text-6xl">🩺</span>
           </div>
           
           <h3 className="text-2xl font-black text-rose-400 mb-2">{currentScenario.title}</h3>
           <p className="text-gray-300 mb-4 text-lg">{currentScenario.description}</p>
           
           <div className="w-full bg-gray-900 p-4 rounded-xl border border-gray-600 z-10">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Objetivo Terapéutico</h4>
              <p className="text-rose-200 font-bold italic">"{currentScenario.problem}"</p>
           </div>
        </div>

        {/* Fármacos */}
        <div className="flex flex-col gap-4">
           <h3 className="text-xl font-bold text-center md:text-left">💉 Tratamiento</h3>
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
                      : 'bg-white text-gray-900 border-rose-500 hover:bg-rose-50 shadow-lg'
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
                    {isCorrect ? '¡CORRECTO!' : 'ERROR CLÍNICO'}
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

export default HemostasisSim;