import React, { useState, useEffect } from 'react';

// --- Tipos Locales ---
interface PatientStatus {
  neutrophils: number; // 0-100 (Goal: >50)
  nausea: number;      // 0-100 (Goal: <20)
  kidneyHealth: number;// 0-100 (Goal: >80)
  tumorSize: number;   // 0-100 (Goal: 0)
}

const OncoSim: React.FC = () => {
  const [cycle, setCycle] = useState(1);
  const [status, setStatus] = useState<PatientStatus>({
    neutrophils: 80,
    nausea: 10,
    kidneyHealth: 95,
    tumorSize: 100
  });
  const [feedback, setFeedback] = useState("Paciente listo para iniciar Quimioterapia. ¡Cuidado con la toxicidad!");
  const [history, setHistory] = useState<string[]>([]);

  // Acciones disponibles
  const applyAction = (action: string) => {
    setStatus(prev => {
      let next = { ...prev };
      let msg = "";

      switch (action) {
        case 'CISPLATINO':
          next.tumorSize = Math.max(0, prev.tumorSize - 25);
          next.kidneyHealth = Math.max(0, prev.kidneyHealth - 30); // Nefrotóxico
          next.nausea = Math.min(100, prev.nausea + 60); // Emetógeno
          next.neutrophils = Math.max(0, prev.neutrophils - 10);
          msg = "Cisplatino administrado: Tumor reduce, pero riñón y estómago sufren.";
          break;
        case 'HIDRATACION':
          next.kidneyHealth = Math.min(100, prev.kidneyHealth + 40);
          next.nausea = Math.max(0, prev.nausea - 10);
          msg = "Hidratación + Manitol: El riñón te lo agradece.";
          break;
        case 'ONDANSETRON':
          next.nausea = Math.max(0, prev.nausea - 50);
          msg = "Ondansetrón: Antiemético potente (Antagonista 5-HT3). Nauseas bajan.";
          break;
        case 'FILGRASTIM':
          next.neutrophils = Math.min(100, prev.neutrophils + 50);
          msg = "Filgrastim (G-CSF): Estimula médula ósea. Suben defensas.";
          break;
        case 'DOXORRUBICINA':
            next.tumorSize = Math.max(0, prev.tumorSize - 30);
            next.neutrophils = Math.max(0, prev.neutrophils - 40); // Mielotóxico
            msg = "Doxorrubicina (Roja): Golpe fuerte al tumor, pero ojo a la mielosupresión.";
            break;
      }

      setFeedback(msg);
      setHistory(h => [msg, ...h]);
      return next;
    });
  };

  const nextCycle = () => {
    if (status.kidneyHealth < 40 || status.neutrophils < 20) {
        setFeedback("❌ ¡PACIENTE INESTABLE! No se puede dar otro ciclo. Revisa toxicidad.");
        return;
    }
    setCycle(c => c + 1);
    setStatus(prev => ({
        ...prev,
        nausea: Math.max(0, prev.nausea - 20), // Mejora con el tiempo
        neutrophils: Math.max(0, prev.neutrophils - 10), // Fatiga medular acumulada
        tumorSize: Math.min(100, prev.tumorSize + 5) // Ligero rebote si no se trata
    }));
    setFeedback(`⏳ Iniciando Ciclo ${cycle + 1}. Evalúa al paciente.`);
  };

  const getBarColor = (val: number, goodMin: number, goodMax: number) => {
      // Logic generic: if higher is better (max 100) or lower is better
      return 'bg-blue-500'; 
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white overflow-hidden">
      <div className="bg-red-900 p-4 shadow-lg z-10 flex justify-between items-center shrink-0">
         <h2 className="text-xl font-black text-white">🏥 Simulación: Toxicidad Quimioterapia</h2>
         <span className="badge bg-white text-red-900 px-3 py-1 rounded-full font-bold">Ciclo: {cycle}</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Monitor */}
         <div className="bg-black rounded-3xl p-6 border-4 border-slate-700 shadow-2xl">
             <h3 className="text-gray-400 font-mono mb-4 border-b border-gray-700 pb-2">MONITOR DE TOXICIDAD</h3>
             
             {/* Barras */}
             <div className="space-y-6">
                <div>
                    <div className="flex justify-between mb-1"><span className="font-bold">Tamaño Tumor</span> <span>{status.tumorSize}%</span></div>
                    <div className="h-6 bg-gray-800 rounded overflow-hidden">
                        <div className="h-full bg-red-600 transition-all duration-500" style={{width: `${status.tumorSize}%`}}></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between mb-1"><span className="font-bold">Salud Renal</span> <span>{status.kidneyHealth}%</span></div>
                    <div className="h-6 bg-gray-800 rounded overflow-hidden">
                        <div className={`h-full transition-all duration-500 ${status.kidneyHealth < 50 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} style={{width: `${status.kidneyHealth}%`}}></div>
                    </div>
                    {status.kidneyHealth < 50 && <span className="text-xs text-red-400">⚠️ RIESGO FALLO RENAL (Cisplatino)</span>}
                </div>
                <div>
                    <div className="flex justify-between mb-1"><span className="font-bold">Neutrófilos</span> <span>{status.neutrophils}%</span></div>
                    <div className="h-6 bg-gray-800 rounded overflow-hidden">
                        <div className={`h-full transition-all duration-500 ${status.neutrophils < 40 ? 'bg-yellow-500' : 'bg-blue-400'}`} style={{width: `${status.neutrophils}%`}}></div>
                    </div>
                    {status.neutrophils < 30 && <span className="text-xs text-yellow-400">⚠️ NEUTROPENIA FEBRIL</span>}
                </div>
                <div>
                    <div className="flex justify-between mb-1"><span className="font-bold">Nauseas/Vómitos</span> <span>{status.nausea}%</span></div>
                    <div className="h-6 bg-gray-800 rounded overflow-hidden">
                        <div className={`h-full transition-all duration-500 ${status.nausea > 50 ? 'bg-orange-500' : 'bg-green-800'}`} style={{width: `${status.nausea}%`}}></div>
                    </div>
                </div>
             </div>

             <div className="mt-6 p-4 bg-slate-800 rounded-xl border-l-4 border-blue-500 font-mono text-sm">
                <span className="text-blue-400 font-bold">STATUS:</span> {feedback}
             </div>
         </div>

         {/* Controles */}
         <div className="bg-white rounded-3xl p-6 shadow-xl text-gray-900 flex flex-col">
             <h3 className="text-xl font-black mb-4">⚕️ Órdenes Médicas</h3>
             <div className="grid grid-cols-2 gap-3 mb-4">
                 <button onClick={() => applyAction('CISPLATINO')} className="p-4 bg-red-100 border-2 border-red-300 rounded-xl hover:bg-red-200 font-bold text-red-900">
                    💉 Cisplatino
                    <div className="text-xs font-normal opacity-70">Mata tumor, daña riñón</div>
                 </button>
                 <button onClick={() => applyAction('DOXORRUBICINA')} className="p-4 bg-red-100 border-2 border-red-300 rounded-xl hover:bg-red-200 font-bold text-red-900">
                    💉 Doxorrubicina
                    <div className="text-xs font-normal opacity-70">Potente, baja defensas</div>
                 </button>
                 <button onClick={() => applyAction('HIDRATACION')} className="p-4 bg-blue-100 border-2 border-blue-300 rounded-xl hover:bg-blue-200 font-bold text-blue-900">
                    💧 Hidratación
                    <div className="text-xs font-normal opacity-70">Salva el riñón</div>
                 </button>
                 <button onClick={() => applyAction('ONDANSETRON')} className="p-4 bg-green-100 border-2 border-green-300 rounded-xl hover:bg-green-200 font-bold text-green-900">
                    🤢 Ondansetrón
                    <div className="text-xs font-normal opacity-70">Anti-vómitos</div>
                 </button>
                 <button onClick={() => applyAction('FILGRASTIM')} className="p-4 bg-purple-100 border-2 border-purple-300 rounded-xl hover:bg-purple-200 font-bold text-purple-900">
                    🛡️ Filgrastim
                    <div className="text-xs font-normal opacity-70">Sube defensas</div>
                 </button>
             </div>
             
             {status.tumorSize === 0 ? (
                 <div className="bg-green-500 text-white p-4 rounded-xl font-black text-center animate-bounce">
                     ¡REMISIÓN COMPLETA! 🏆
                 </div>
             ) : (
                <button onClick={nextCycle} className="mt-auto w-full py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl">
                    Siguiente Ciclo ➡️
                </button>
             )}
         </div>
      </div>
    </div>
  );
};

export default OncoSim;