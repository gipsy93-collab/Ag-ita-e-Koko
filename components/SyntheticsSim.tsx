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
    title: "Cistitis Aguda en Joven",
    description: "Mujer de 25 años con disuria y frecuencia. Orina turbia. Probable E. coli. Sin fiebre ni dolor lumbar.",
    problem: "Necesitamos un antiséptico urinario que se concentre en orina.",
    correctDrugId: "NITROFURANTOINA",
    explanation: "¡Correcto! La Nitrofurantoína es ideal para ITU no complicada (cistitis) porque se concentra muy bien en orina y cubre E. coli."
  },
  {
    id: 2,
    title: "Quemadura de Segundo Grado",
    description: "Paciente sufre quemadura extensa en brazo con agua hirviendo. Riesgo alto de infección cutánea.",
    problem: "Necesitamos un antibacteriano tópico preventivo.",
    correctDrugId: "SULFADIAZINA_ARG",
    explanation: "¡Exacto! La Sulfadiazina Argéntica (Silvederma) es el estándar tópico para prevenir infecciones en quemaduras."
  },
  {
    id: 3,
    title: "Infección por Pseudomonas",
    description: "Paciente hospitalizado con infección sistémica grave. El cultivo muestra Pseudomonas aeruginosa.",
    problem: "Necesitamos un antibiótico oral potente con actividad antipseudomónica.",
    correctDrugId: "CIPROFLOXACINO",
    explanation: "¡Bien! Las Fluoroquinolonas como el Ciprofloxacino son de los pocos antibióticos orales efectivos contra Pseudomonas."
  },
  {
    id: 4,
    title: "Colitis Ulcerosa",
    description: "Paciente con enfermedad inflamatoria intestinal. Necesita tratamiento antiinflamatorio local en el colon.",
    problem: "Necesitamos una sulfamida que NO se absorba.",
    correctDrugId: "SULFASALAZINA",
    explanation: "¡Perfecto! La Sulfasalazina no se absorbe, llega al colon y allí actúa localmente contra la inflamación/infección."
  }
];

const DRUGS = [
  { id: "NITROFURANTOINA", name: "Nitrofurantoína", type: "Antiséptico Urinario" },
  { id: "SULFADIAZINA_ARG", name: "Sulfadiazina Argéntica", type: "Tópico (Cremas)" },
  { id: "CIPROFLOXACINO", name: "Ciprofloxacino", type: "Fluoroquinolona" },
  { id: "SULFASALAZINA", name: "Sulfasalazina", type: "Sulfamida Intestinal" },
  { id: "AMOXICILINA", name: "Amoxicilina", type: "Betalactámico (No Sintético)" },
];

const SyntheticsSim: React.FC = () => {
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
      setFeedback("❌ Fármaco incorrecto. Revisa el sitio de acción y el espectro.");
    }
  };

  const nextLevel = () => {
    if (level < SCENARIOS.length - 1) {
      setLevel(level + 1);
      setFeedback(null);
      setIsCorrect(null);
    } else {
      setFeedback("¡Maestro Químico! Has resuelto todos los casos. ⚗️✅");
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white p-4 overflow-hidden">
      <div className="bg-amber-700 p-4 rounded-xl shadow-lg mb-4 flex justify-between items-center">
         <h2 className="text-xl font-black flex items-center gap-2">⚗️ El Laboratorio Sintético</h2>
         <span className="bg-black/30 px-3 py-1 rounded-full text-sm">Caso {level + 1}/{SCENARIOS.length}</span>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto">
        {/* Paciente / Matraz */}
        <div className="bg-gray-800 rounded-3xl p-6 border-4 border-amber-600 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
           <div className="w-32 h-32 bg-amber-900/50 rounded-full flex items-center justify-center mb-4 relative z-10">
              <span className="text-6xl animate-bounce">🧪</span>
           </div>
           
           <h3 className="text-2xl font-black text-amber-400 mb-2">{currentScenario.title}</h3>
           <p className="text-gray-300 mb-4 text-lg">{currentScenario.description}</p>
           
           <div className="w-full bg-gray-900 p-4 rounded-xl border border-gray-600 z-10">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Requerimiento Químico</h4>
              <p className="text-amber-200 font-bold italic">"{currentScenario.problem}"</p>
           </div>
        </div>

        {/* Estantería de Químicos */}
        <div className="flex flex-col gap-4">
           <h3 className="text-xl font-bold text-center md:text-left">💊 Selecciona el Compuesto</h3>
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
                      : 'bg-white text-gray-900 border-amber-500 hover:bg-amber-50 shadow-lg'
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
                    {isCorrect ? '¡REACCIÓN EXITOSA!' : 'FALLO EN LA MEZCLA'}
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

export default SyntheticsSim;