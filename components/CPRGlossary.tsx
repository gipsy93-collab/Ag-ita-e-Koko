import React, { useState } from 'react';

const TONGUE_TWISTERS = [
  {
    name: "Adrenalina",
    rhyme: "Adrenalina, la gasolina, si el corazón no camina. Vasoconstriñe la esquina y la sangre al cerebro destina.",
    meaning: "Vasopresor de elección en PCR. Aumenta perfusión cerebral y coronaria."
  },
  {
    name: "Atropina",
    rhyme: "Atropina, la divina, si el nervio Vago domina. El freno elimina y el ritmo se empina.",
    meaning: "Vagolítico (Parasimpaticolítico). Útil en bradicardias por tono vagal excesivo."
  },
  {
    name: "Amiodarona",
    rhyme: "Amiodarona no abandona, si la arritmia detona. En la fibrilación se corona, aunque el yodo amontona.",
    meaning: "Antiarrítmico Grupo III. Usado en Fibrilación Ventricular/Taquicardia Ventricular sin pulso."
  },
  {
    name: "Lidocaína",
    rhyme: "Lidocaína camina, anestesia y desafina. Si el ventrículo trina, esta es su medicina.",
    meaning: "Antiarrítmico Grupo Ib. Alternativa a amiodarona en arritmias ventriculares."
  },
  {
    name: "Naloxona",
    rhyme: "Naloxona no perdona, si el opio te atontona. Despierta a la persona y la respiración funciona.",
    meaning: "Antagonista opioide puro. Antídoto en depresión respiratoria por opiáceos."
  },
  {
    name: "Bicarbonato",
    rhyme: "Bicarbonato, el sensato, si el potasio pasa el rato. Al ácido le da un trato y al tricíclico un arrebato.",
    meaning: "Agente alcalinizante. Usado en hiperpotasemia severa e intoxicación por antidepresivos tricíclicos."
  },
  {
    name: "Cloruro Cálcico",
    rhyme: "Calcio al miocardio, llega extraordinario. Si el potasio es precario (alto), protege el escenario.",
    meaning: "Cardiotónico. Protege el corazón en hiperpotasemia tóxica (estabiliza membrana)."
  },
  {
    name: "Sulfato de Magnesio",
    rhyme: "Magnesio en el trapecio, quita el ritmo necio. Si la Torsade tiene precio, este es su desprecio.",
    meaning: "Antiarrítmico. Específico para Torsade de Pointes y arritmias por hipomagnesemia."
  }
];

const CPRGlossary: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setActiveId(activeId === idx ? null : idx);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
       <div className="bg-red-700 p-4 text-white font-bold flex items-center shadow-md shrink-0">
        <span className="text-3xl mr-3">📢</span>
        <div>
           <h2 className="text-xl font-black">Glosario de Urgencias</h2>
           <p className="text-sm text-red-200">Rimas para salvar vidas</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-red-50">
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
                     ? 'bg-white shadow-2xl ring-4 ring-red-400 scale-[1.02] z-10' 
                     : 'bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 hover:bg-red-100'
                   }
                `}
              >
                 <div className="min-h-[100px] flex items-center justify-center p-4 relative">
                    {!isActive && (
                        <div className="absolute inset-x-4 bottom-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                             <div className="h-full bg-gradient-to-r from-red-200 to-orange-200 w-2/3"></div>
                        </div>
                    )}
                    <div className={`absolute top-0 left-0 w-2 h-full bg-red-600 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
                    <h3 className={`text-2xl font-black text-center transition-colors duration-300 z-10 ${isActive ? 'text-red-700 scale-110' : 'text-gray-800'}`}>
                      {item.name}
                    </h3>
                    <div className={`absolute right-5 text-red-500 text-2xl font-bold transition-transform duration-300 ${isActive ? 'rotate-180' : 'rotate-0'}`}>
                       ▼
                    </div>
                 </div>

                 <div className={`
                    bg-red-50/50 overflow-hidden transition-all duration-500 ease-in-out border-t border-red-100
                    ${isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                 `}>
                    <div className="p-6 pt-2">
                        <div className="bg-white p-4 rounded-xl shadow-sm mb-3 border-l-4 border-red-500">
                            <p className="text-xl font-bold text-red-800 italic text-center leading-relaxed">
                            "{item.rhyme}"
                            </p>
                        </div>
                        <div className="flex items-start gap-2 text-sm text-gray-700 bg-white/50 p-3 rounded-lg">
                            <span className="text-lg">🚑</span>
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

export default CPRGlossary;