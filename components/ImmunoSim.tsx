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
    title: "El Trasplante Renal",
    description: "Paciente de 45 años acaba de recibir un riñón. Necesitamos una terapia de mantenimiento para evitar que sus linfocitos T activen el rechazo.",
    problem: "Necesita inhibir la activación de células T (calcineurina).",
    correctDrugId: "CICLOSPORINA",
    explanation: "¡Correcto! La Ciclosporina (o Tacrolimus) es fundamental para inhibir la calcineurina y evitar la activación de linfocitos T post-trasplante."
  },
  {
    id: 2,
    title: "Crisis de Rechazo Agudo",
    description: "¡Alerta! El paciente del trasplante presenta fiebre y dolor en el injerto. El sistema inmune está atacando violentamente ahora mismo.",
    problem: "Necesitamos una inmunosupresión potente y rápida por vía intravenosa.",
    correctDrugId: "METILPREDNISOLONA",
    explanation: "¡Exacto! En situaciones agudas graves (crisis de rechazo), los Glucocorticoides IV (Metilprednisolona) son la primera línea de choque."
  },
  {
    id: 3,
    title: "Artritis Reumatoide",
    description: "Paciente con dolor articular severo autoinmune. Necesitamos frenar la proliferación de células inmunes de forma crónica.",
    problem: "Necesitamos un citostático/antimetabolito.",
    correctDrugId: "METOTREXATO",
    explanation: "¡Bien! El Metotrexato es un citostático clave en autoinmunidad (como Artritis Reumatoide) por su efecto antiproliferativo sobre células inmunes."
  },
  {
    id: 4,
    title: "Niño Burbuja (Inmunodeficiencia)",
    description: "Paciente con inmunodeficiencia congénita. Su cuerpo no produce anticuerpos suficientes y tiene infecciones recurrentes.",
    problem: "El sistema falla. Necesita 'refuerzos' externos.",
    correctDrugId: "INMUNOGLOBULINAS",
    explanation: "¡Perfecto! En inmunodeficiencias, administramos Inmunoglobulinas de plasma humano para aportar los anticuerpos que el paciente no tiene."
  }
];

const DRUGS = [
  { id: "CICLOSPORINA", name: "Ciclosporina", type: "Inhibidor Calcineurina" },
  { id: "METILPREDNISOLONA", name: "Metilprednisolona (IV)", type: "Glucocorticoide Potente" },
  { id: "METOTREXATO", name: "Metotrexato", type: "Citostático / Antimetabolito" },
  { id: "INMUNOGLOBULINAS", name: "Inmunoglobulinas", type: "Inmunoestimulante Pasivo" },
  { id: "LEVAMISOL", name: "Levamisol", type: "Inmunoestimulante Sintético" },
];

const ImmunoSim: React.FC = () => {
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
      setFeedback("❌ Fármaco incorrecto. Analiza el mecanismo de acción requerido.");
    }
  };

  const nextLevel = () => {
    if (level < SCENARIOS.length - 1) {
      setLevel(level + 1);
      setFeedback(null);
      setIsCorrect(null);
    } else {
      setFeedback("¡Has equilibrado el Sistema Inmune con éxito! 🛡️");
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white p-4 overflow-hidden">
      <div className="bg-cyan-700 p-4 rounded-xl shadow-lg mb-4 flex justify-between items-center">
         <h2 className="text-xl font-black">🛡️ El Guardián del Sistema Inmune</h2>
         <span className="bg-black/30 px-3 py-1 rounded-full text-sm">Caso {level + 1}/{SCENARIOS.length}</span>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto">
        {/* Caso Clínico */}
        <div className="bg-gray-800 rounded-3xl p-6 border-4 border-gray-700 flex flex-col items-center text-center shadow-2xl">
           <div className="w-32 h-32 bg-cyan-900/50 rounded-full flex items-center justify-center mb-4 relative animate-pulse">
              <span className="text-6xl">🩺</span>
              <div className="absolute top-0 right-0 w-4 h-4 bg-cyan-400 rounded-full animate-ping"></div>
           </div>
           
           <h3 className="text-2xl font-black text-cyan-400 mb-2">{currentScenario.title}</h3>
           <p className="text-gray-300 mb-6 text-lg">{currentScenario.description}</p>
           
           <div className="w-full bg-gray-900 p-4 rounded-xl border border-gray-600">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Desafío Inmunológico</h4>
              <p className="text-cyan-200 font-bold">{currentScenario.problem}</p>
           </div>
        </div>

        {/* Farmacia */}
        <div className="flex flex-col gap-4">
           <h3 className="text-xl font-bold text-center md:text-left">💊 Elige la Terapia</h3>
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
                      : 'bg-white text-gray-900 border-cyan-500 hover:bg-cyan-50 shadow-lg'
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
                    {isCorrect ? '¡TERAPIA CORRECTA!' : 'FALLO TERAPÉUTICO'}
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

export default ImmunoSim;