import React, { useState } from 'react';

const TONGUE_TWISTERS = [
  {
    name: "Furosemida",
    rhyme: "Furosemida en el asa anida, frena la sal enseguida. Si el edema te intimida, esta es la salida de la vida.",
    meaning: "Diurético de asa (máxima eficacia). Inhibe cotransporte Na/K/2Cl. Uso en EAP e IC grave."
  },
  {
    name: "Hidroclorotiazida",
    rhyme: "Hidroclorotiazida, eficacia medida. En el túbulo distal es bienvenida, para la tensión mantenida.",
    meaning: "Tiazida (eficacia media). Inhibe reabsorción Na/Cl en TCD. Uso en HTA y edemas leves."
  },
  {
    name: "Espironolactona",
    rhyme: "Espironolactona no desentona, bloquea a la aldosterona. Al potasio lo perdona y el corazón se corona.",
    meaning: "Ahorrador de potasio. Antagonista de aldosterona. Evita hipopotasemia y remodelado cardiaco."
  },
  {
    name: "Amilorida",
    rhyme: "Amilorida el canal intimida, la entrada de sodio liquida. El potasio no tiene huida y se queda en la partida.",
    meaning: "Ahorrador de potasio. Bloquea canales de Na+ epiteliales en el túbulo colector."
  },
  {
    name: "Manitol",
    rhyme: "Manitol, azúcar sin rol, no se absorbe ni con alcohol. Arrastra agua sin control y baja la presión cual girasol.",
    meaning: "Diurético osmótico. Inerte farmacológicamente. Usado en edema cerebral o glaucoma."
  },
  {
    name: "Acetazolamida",
    rhyme: "Acetazolamida, la base prohibida. La anhidrasa queda dormida y el bicarbonato se va de huida.",
    meaning: "Inhibidor de la anhidrasa carbónica. Alcaliniza la orina. Uso en glaucoma y mal de montaña."
  },
  {
    name: "Torasemida",
    rhyme: "Torasemida, prima querida, más potente y con más vida. En el asa hace la herida y la retención es vencida.",
    meaning: "Diurético de asa de larga duración. Similar a furosemida pero más estable."
  },
  {
    name: "Indapamida",
    rhyme: "Indapamida, tiazida atrevida. Baja la presión sin medida y al vaso le da la bienvenida.",
    meaning: "Símil-tiazida. Muy usada en hipertensión por su perfil vascular favorable."
  }
];

const DiureticGlossary: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setActiveId(activeId === idx ? null : idx);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
       <div className="bg-blue-600 p-4 text-white font-bold flex items-center shadow-md shrink-0">
        <span className="text-3xl mr-3">💧</span>
        <div>
           <h2 className="text-xl font-black">Glosario Hidráulico</h2>
           <p className="text-sm text-blue-200">Rimas para el riñón</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-blue-50">
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
                     ? 'bg-white shadow-2xl ring-4 ring-blue-400 scale-[1.02] z-10' 
                     : 'bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 hover:bg-blue-100'
                   }
                `}
              >
                 <div className="min-h-[100px] flex items-center justify-center p-4 relative">
                    {!isActive && (
                        <div className="absolute inset-x-4 bottom-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                             <div className="h-full bg-gradient-to-r from-blue-200 to-cyan-200 w-2/3"></div>
                        </div>
                    )}
                    <div className={`absolute top-0 left-0 w-2 h-full bg-blue-600 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
                    <h3 className={`text-2xl font-black text-center transition-colors duration-300 z-10 ${isActive ? 'text-blue-700 scale-110' : 'text-gray-800'}`}>
                      {item.name}
                    </h3>
                    <div className={`absolute right-5 text-blue-500 text-2xl font-bold transition-transform duration-300 ${isActive ? 'rotate-180' : 'rotate-0'}`}>
                       ▼
                    </div>
                 </div>

                 <div className={`
                    bg-blue-50/50 overflow-hidden transition-all duration-500 ease-in-out border-t border-blue-100
                    ${isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                 `}>
                    <div className="p-6 pt-2">
                        <div className="bg-white p-4 rounded-xl shadow-sm mb-3 border-l-4 border-blue-500">
                            <p className="text-xl font-bold text-blue-800 italic text-center leading-relaxed">
                            "{item.rhyme}"
                            </p>
                        </div>
                        <div className="flex items-start gap-2 text-sm text-gray-700 bg-white/50 p-3 rounded-lg">
                            <span className="text-lg">🚽</span>
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

export default DiureticGlossary;