import React, { useState } from 'react';

const TONGUE_TWISTERS = [
  {
    name: "Metotrexato",
    rhyme: "Metotrexato, el sensato, al folato le dio un trato. Paró la reductasa un rato y la célula no tuvo plato.",
    meaning: "Antimetabolito. Inhibe la dihidrofolato reductasa, bloqueando la síntesis de ADN."
  },
  {
    name: "Cisplatino",
    rhyme: "Cisplatino, platino fino, al riñón le da un destino. Si no hidratas el camino, te deja el túbulo porcino.",
    meaning: "Alquilante (platino). Muy nefrotóxico y emetógeno. Requiere hidratación intensa."
  },
  {
    name: "Vincristina",
    rhyme: "Vincristina cristalina, el huso la desafina. La mitosis no camina y la célula se elimina.",
    meaning: "Antimitótico (Vinca). Inhibe la polimerización de microtúbulos. Neurotóxico."
  },
  {
    name: "Paclitaxel",
    rhyme: "Paclitaxel en el riel, congela el microtúbulo fiel. No lo deja mover su piel y el tumor pierde el nivel.",
    meaning: "Antimitótico (Taxano). Estabiliza los microtúbulos impidiendo su desensamblaje."
  },
  {
    name: "Doxorrubicina",
    rhyme: "Doxorrubicina roja y fina, al corazón le da espina. Rompe el ADN en la esquina y la célula se arruina.",
    meaning: "Antibiótico antitumoral. Cardiotóxico (dosis-dependiente). Color rojo característico."
  },
  {
    name: "Tamoxifeno",
    rhyme: "Tamoxifeno en el seno, al estrógeno pone freno. Bloquea el receptor de lleno y el tumor traga veneno.",
    meaning: "Antiestrogénico. Usado en cáncer de mama hormonosensible."
  },
  {
    name: "Ciclofosfamida",
    rhyme: "Ciclofosfamida enseguida, la vejiga deja herida. Con Mesna le das salida y la cistitis es vencida.",
    meaning: "Alquilante. Puede causar cistitis hemorrágica (se previene con Mesna e hidratación)."
  },
  {
    name: "Imatinib",
    rhyme: "Imatinib, cual adalid, frena a la quinasa en la lid. El tumor se queda sin vid y pierde su ardid.",
    meaning: "Inhibidor de Tirosina Quinasa. Terapia dirigida molecular."
  }
];

const OncoGlossary: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setActiveId(activeId === idx ? null : idx);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
       <div className="bg-orange-600 p-4 text-white font-bold flex items-center shadow-md shrink-0">
        <span className="text-3xl mr-3">🧬</span>
        <div>
           <h2 className="text-xl font-black">Glosario Oncológico</h2>
           <p className="text-sm text-orange-200">Rimas contra el cáncer</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-orange-50">
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
                     ? 'bg-white shadow-2xl ring-4 ring-orange-300 scale-[1.02] z-10' 
                     : 'bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 hover:bg-orange-100'
                   }
                `}
              >
                 <div className="min-h-[100px] flex items-center justify-center p-4 relative">
                    {!isActive && (
                        <div className="absolute inset-x-4 bottom-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                             <div className="h-full bg-gradient-to-r from-orange-200 to-red-200 w-2/3"></div>
                        </div>
                    )}
                    <div className={`absolute top-0 left-0 w-2 h-full bg-orange-500 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
                    <h3 className={`text-2xl font-black text-center transition-colors duration-300 z-10 ${isActive ? 'text-orange-600 scale-110' : 'text-gray-800'}`}>
                      {item.name}
                    </h3>
                    <div className={`absolute right-5 text-orange-400 text-2xl font-bold transition-transform duration-300 ${isActive ? 'rotate-180' : 'rotate-0'}`}>
                       ▼
                    </div>
                 </div>

                 <div className={`
                    bg-orange-50/50 overflow-hidden transition-all duration-500 ease-in-out border-t border-orange-100
                    ${isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                 `}>
                    <div className="p-6 pt-2">
                        <div className="bg-white p-4 rounded-xl shadow-sm mb-3 border-l-4 border-orange-400">
                            <p className="text-xl font-bold text-orange-700 italic text-center leading-relaxed">
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

export default OncoGlossary;