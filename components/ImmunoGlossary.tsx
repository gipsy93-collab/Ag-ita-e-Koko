import React, { useState } from 'react';

const TONGUE_TWISTERS = [
  {
    name: "Ciclosporina",
    rhyme: "Ciclosporina a la inmunofilina se avecina. Frena al linfocito en la esquina, pero a la médula la desafina.",
    meaning: "Inhibidor de la calcineurina (vía inmunofilinas). Evita rechazo de trasplantes. Ojo toxicidad medular."
  },
  {
    name: "Tacrolimus",
    rhyme: "Tacrolimus es primo, pero más fino. Al mismo receptor adivino, y el rechazo se queda en el camino.",
    meaning: "Más potente que la ciclosporina. Mismo mecanismo (inhibir calcineurina/activación T)."
  },
  {
    name: "Prednisona",
    rhyme: "La Prednisona no perdona, la inflamación abandona. Si es aguda la zona, intravenosa se corona.",
    meaning: "Glucocorticoide. Inmunosupresor potente por vía IV en crisis agudas o rechazo."
  },
  {
    name: "Infliximab",
    rhyme: "Infliximab es un mab, que al TNF le hace un grab. La autoinmunidad hace 'dab' y se cierra el lab.",
    meaning: "Anticuerpo Monoclonal (mAb). Bloquea mediadores inflamatorios en enfermedades autoinmunes."
  },
  {
    name: "Rapamicina (Sirolimus)",
    rhyme: "Rapamicina frena la turbina del mTOR en la colina. La célula no camina y la división termina.",
    meaning: "Inhibidor de mTOR. Detiene el ciclo celular y la proliferación de linfocitos."
  },
  {
    name: "Azatioprina",
    rhyme: "Azatioprina, citostático que domina. El ADN contamina y el linfocito se elimina.",
    meaning: "Citostático. Impide la síntesis de purinas, frenando la expansión de células inmunes."
  },
  {
    name: "Inmunoglobulinas",
    rhyme: "Inmunoglobulina, defensa genuina. Si tu cuerpo no atina, el plasma te patrocina.",
    meaning: "Inmunoestimulante. Aporta anticuerpos pasivos en inmunodeficiencias."
  },
  {
    name: "Interferón",
    rhyme: "Interferón, menudo guasón. Al virus le da un bofetón y al cáncer le pone el tapón.",
    meaning: "Inmunoestimulante. Activa defensas antivirales y antitumorales."
  }
];

const ImmunoGlossary: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setActiveId(activeId === idx ? null : idx);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
       <div className="bg-cyan-600 p-4 text-white font-bold flex items-center shadow-md shrink-0">
        <span className="text-3xl mr-3">🛡️</span>
        <div>
           <h2 className="text-xl font-black">Glosario Inmune</h2>
           <p className="text-sm text-cyan-200">Rimas de defensa y ataque</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-cyan-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {TONGUE_TWISTERS.map((item, idx) => {
            const isActive = activeId === idx;
            return (
              <div 
                key={idx} 
                onClick={() => toggle(idx)}
                className={`
                   relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-300
                   ${isActive 
                     ? 'bg-white shadow-2xl ring-4 ring-cyan-300 scale-[1.02] z-10' 
                     : 'bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 hover:bg-cyan-100'
                   }
                `}
              >
                 <div className="min-h-[100px] flex items-center justify-center p-4 relative">
                    {!isActive && (
                        <div className="absolute inset-x-4 bottom-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                             <div className="h-full bg-gradient-to-r from-cyan-200 to-teal-200 w-2/3"></div>
                        </div>
                    )}
                    <div className={`absolute top-0 left-0 w-2 h-full bg-cyan-500 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
                    <h3 className={`text-2xl font-black text-center transition-colors duration-300 z-10 ${isActive ? 'text-cyan-700 scale-110' : 'text-gray-800'}`}>
                      {item.name}
                    </h3>
                    <div className={`absolute right-5 text-cyan-500 text-2xl font-bold transition-transform duration-300 ${isActive ? 'rotate-180' : 'rotate-0'}`}>
                       ▼
                    </div>
                 </div>

                 <div className={`
                    bg-cyan-50/50 overflow-hidden transition-all duration-500 ease-in-out border-t border-cyan-100
                    ${isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                 `}>
                    <div className="p-6 pt-2">
                        <div className="bg-white p-4 rounded-xl shadow-sm mb-3 border-l-4 border-cyan-400">
                            <p className="text-xl font-bold text-cyan-800 italic text-center leading-relaxed">
                            "{item.rhyme}"
                            </p>
                        </div>
                        <div className="flex items-start gap-2 text-sm text-gray-700 bg-white/50 p-3 rounded-lg">
                            <span className="text-lg">🤓</span>
                            <p><strong>Lo serio:</strong> {item.meaning}</p>
                        </div>
                    </div>
                 </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ImmunoGlossary;