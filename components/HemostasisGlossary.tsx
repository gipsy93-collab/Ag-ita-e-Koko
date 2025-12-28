import React, { useState } from 'react';

const TONGUE_TWISTERS = [
  {
    name: "AAS (Aspirina)",
    rhyme: "AAS a dosis baja, la plaqueta se relaja. Si la COX se raja, el trombo no encaja.",
    meaning: "Antiagregante. A dosis bajas (75-100mg) inhibe irreversiblemente la COX-1 plaquetaria."
  },
  {
    name: "Clopidogrel",
    rhyme: "Clopidogrel, amigo fiel, bloquea el ADP en el papel. La plaqueta no se pega a la piel y el stent va sobre riel.",
    meaning: "Antiagregante. Inhibe el receptor P2Y12 de ADP. Usado en stents y alergia a AAS."
  },
  {
    name: "Heparina Sódica",
    rhyme: "Heparina en la vena, al trombo le da pena. Con la antitrombina se encadena y el TTPa la frena.",
    meaning: "Anticoagulante parenteral (HNF). Requiere monitorización (TTPa). Antídoto: Protamina."
  },
  {
    name: "Enoxaparina (HBPM)",
    rhyme: "Enoxaparina, pinchazo en la cocina. Al Factor Xa domina y no necesita rutina (de análisis).",
    meaning: "Heparina de Bajo Peso Molecular. Vía subcutánea. Más predecible, no requiere control rutinario."
  },
  {
    name: "Warfarina / Acenocumarol",
    rhyme: "Warfarina y Sintrom, qué complicación. La vitamina K es su maldición y el INR tu obsesión.",
    meaning: "Anticoagulantes orales (AVK). Inhiben factores K-dependientes. Estrecho margen (INR 2-3)."
  },
  {
    name: "Rivaroxabán",
    rhyme: "Rivaroxabán, el nuevo capitán. Al Factor Xa le dan, sin mirar el afán (del INR).",
    meaning: "Anticoagulante oral directo (NACO). Inhibidor directo del Factor Xa. No requiere monitorización."
  },
  {
    name: "Alteplasa (t-PA)",
    rhyme: "Alteplasa arrasa, el coágulo pasa. Si el ictus amenaza, esta enzima lo despedaza.",
    meaning: "Fibrinolítico. Activa el plasminógeno a plasmina para disolver el trombo formado."
  },
  {
    name: "Ácido Tranexámico",
    rhyme: "Tranexámico al pánico, tapón mecánico. Si sangras titánico, este es el botánico.",
    meaning: "Antifibrinolítico. Inhibe la disolución del coágulo. Usado en hemorragias."
  }
];

const HemostasisGlossary: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setActiveId(activeId === idx ? null : idx);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
       <div className="bg-rose-700 p-4 text-white font-bold flex items-center shadow-md shrink-0">
        <span className="text-3xl mr-3">🩸</span>
        <div>
           <h2 className="text-xl font-black">Glosario Hematológico</h2>
           <p className="text-sm text-rose-200">Rimas de coagulación</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-rose-50">
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
                     ? 'bg-white shadow-2xl ring-4 ring-rose-400 scale-[1.02] z-10' 
                     : 'bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 hover:bg-rose-100'
                   }
                `}
              >
                 <div className="min-h-[100px] flex items-center justify-center p-4 relative">
                    {!isActive && (
                        <div className="absolute inset-x-4 bottom-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                             <div className="h-full bg-gradient-to-r from-rose-200 to-red-200 w-2/3"></div>
                        </div>
                    )}
                    <div className={`absolute top-0 left-0 w-2 h-full bg-rose-600 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
                    <h3 className={`text-2xl font-black text-center transition-colors duration-300 z-10 ${isActive ? 'text-rose-700 scale-110' : 'text-gray-800'}`}>
                      {item.name}
                    </h3>
                    <div className={`absolute right-5 text-rose-500 text-2xl font-bold transition-transform duration-300 ${isActive ? 'rotate-180' : 'rotate-0'}`}>
                       ▼
                    </div>
                 </div>

                 <div className={`
                    bg-rose-50/50 overflow-hidden transition-all duration-500 ease-in-out border-t border-rose-100
                    ${isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                 `}>
                    <div className="p-6 pt-2">
                        <div className="bg-white p-4 rounded-xl shadow-sm mb-3 border-l-4 border-rose-500">
                            <p className="text-xl font-bold text-rose-800 italic text-center leading-relaxed">
                            "{item.rhyme}"
                            </p>
                        </div>
                        <div className="flex items-start gap-2 text-sm text-gray-700 bg-white/50 p-3 rounded-lg">
                            <span className="text-lg">💉</span>
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

export default HemostasisGlossary;