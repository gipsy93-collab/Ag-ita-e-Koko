import React, { useState } from 'react';

const TONGUE_TWISTERS = [
  {
    name: "Ciprofloxacino",
    rhyme: "Ciprofloxacino, al ADN le cambia el destino. Gira la girasa en el camino y a la Pseudomonas la deja en el molino.",
    meaning: "Fluoroquinolona. Inhibe ADN-girasa. Bactericida de amplio espectro (incluye Pseudomonas)."
  },
  {
    name: "Ácido Nalidíxico",
    rhyme: "Ácido Nalidíxico, el abuelo quístico. De primera generación es característico, urinario y muy artístico.",
    meaning: "Quinolona de 1ª generación. Antiséptico urinario antiguo."
  },
  {
    name: "Sulfametoxazol",
    rhyme: "Sulfametoxazol, apaga el sol del folato cual farol. La bacteria pierde el control y no mete gol.",
    meaning: "Sulfamida sistémica. Inhibe síntesis de ácido fólico (bacteriostático)."
  },
  {
    name: "Cotrimoxazol",
    rhyme: "Cotrimoxazol, la pareja del rock and roll. Sulfamida y Trimetoprim toman el control, bactericida cual alcohol.",
    meaning: "Asociación sinérgica (Sulfametoxazol + Trimetoprim). Bloqueo secuencial del folato (Bactericida)."
  },
  {
    name: "Sulfadiazina Argéntica",
    rhyme: "Sulfadiazina de plata, a la quemadura rescata. En la piel se desata y la infección mata.",
    meaning: "Sulfamida tópica. Uso exclusivo en prevención de infecciones en quemaduras de 2º y 3º grado."
  },
  {
    name: "Sulfasalazina",
    rhyme: "Sulfasalazina en la cocina, al intestino ilumina. No pasa a la orina, y la colitis termina.",
    meaning: "Sulfamida no absorbible. Acción local antiinflamatoria/antibacteriana en intestino (Colitis ulcerosa, Crohn)."
  },
  {
    name: "Nitrofurantoína",
    rhyme: "Nitrofurantoína, la orina domina. Al E. coli lo cocina, y si la tomas mucho, previene la ruina.",
    meaning: "Antiséptico urinario. Bactericida a altas dosis en orina. Útil en ITU no complicada y profilaxis."
  },
  {
    name: "Norfloxacino",
    rhyme: "Norfloxacino, fluorado y fino. Para la cistitis es el padrino, pero cuidado con el tendón del vecino.",
    meaning: "Fluoroquinolona urinaria. Ojo con la toxicidad articular/tendinosa."
  }
];

const SyntheticsGlossary: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setActiveId(activeId === idx ? null : idx);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
       <div className="bg-amber-600 p-4 text-white font-bold flex items-center shadow-md shrink-0">
        <span className="text-3xl mr-3">⚗️</span>
        <div>
           <h2 className="text-xl font-black">Glosario Sintético</h2>
           <p className="text-sm text-amber-200">Rimas de laboratorio</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-amber-50">
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
                     ? 'bg-white shadow-2xl ring-4 ring-amber-400 scale-[1.02] z-10' 
                     : 'bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 hover:bg-amber-100'
                   }
                `}
              >
                 <div className="min-h-[100px] flex items-center justify-center p-4 relative">
                    {!isActive && (
                        <div className="absolute inset-x-4 bottom-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                             <div className="h-full bg-gradient-to-r from-amber-200 to-orange-200 w-2/3"></div>
                        </div>
                    )}
                    <div className={`absolute top-0 left-0 w-2 h-full bg-amber-600 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
                    <h3 className={`text-2xl font-black text-center transition-colors duration-300 z-10 ${isActive ? 'text-amber-700 scale-110' : 'text-gray-800'}`}>
                      {item.name}
                    </h3>
                    <div className={`absolute right-5 text-amber-500 text-2xl font-bold transition-transform duration-300 ${isActive ? 'rotate-180' : 'rotate-0'}`}>
                       ▼
                    </div>
                 </div>

                 <div className={`
                    bg-amber-50/50 overflow-hidden transition-all duration-500 ease-in-out border-t border-amber-100
                    ${isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                 `}>
                    <div className="p-6 pt-2">
                        <div className="bg-white p-4 rounded-xl shadow-sm mb-3 border-l-4 border-amber-500">
                            <p className="text-xl font-bold text-amber-800 italic text-center leading-relaxed">
                            "{item.rhyme}"
                            </p>
                        </div>
                        <div className="flex items-start gap-2 text-sm text-gray-700 bg-white/50 p-3 rounded-lg">
                            <span className="text-lg">🧪</span>
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

export default SyntheticsGlossary;