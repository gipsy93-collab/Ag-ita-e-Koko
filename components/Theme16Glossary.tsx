import React, { useState } from 'react';

const TONGUE_TWISTERS = [
  {
    name: "Gentamicina",
    rhyme: "Gentamicina en el riñón camina, y al oído desafina. Si la dosis no se afina, la toxicidad germina.",
    meaning: "Aminoglucósido. Bactericida potente pero con índice terapéutico estrecho. Ototóxico y Nefrotóxico."
  },
  {
    name: "Vancomicina",
    rhyme: "Vancomicina al 'Red Man' avecina, si la pasas rápido te contamina. Gram positivos son su rutina, resistente a meticilina.",
    meaning: "Glucopéptido. Uso en S. aureus resistente (MRSA). IV lenta para evitar Síndrome del Hombre Rojo."
  },
  {
    name: "Tetraciclinas",
    rhyme: "Tetraciclina en el hueso se inclina, mancha el diente y no se elimina. Con la leche no combina, el calcio la arruina.",
    meaning: "Bacteriostáticos. Quelan el calcio (no dar con lácteos). Se depositan en huesos/dientes (contraindicado en niños/embarazo)."
  },
  {
    name: "Eritromicina",
    rhyme: "Eritromicina, la alternativa fina. Si la penicilina te asesina, esta te ilumina. Al 50S domina.",
    meaning: "Macrólido. Alternativa segura en alérgicos a Penicilina. Inhibe síntesis proteica (50S). Poca toxicidad."
  },
  {
    name: "Cloranfenicol",
    rhyme: "Cloranfenicol, cuidado con el sol. Si al bebé le das el rol, se pone gris cual caracol.",
    meaning: "Bacteriostático. Riesgo de Síndrome del Bebé Gris (colapso circulatorio) y aplasia medular."
  },
  {
    name: "Neomicina",
    rhyme: "Neomicina, tópica y divina. Pero si entra en la sanguínea, el músculo no camina y la respiración termina.",
    meaning: "Aminoglucósido muy tóxico por vía parenteral. Uso tópico/oral. Riesgo de Bloqueo Neuromuscular."
  },
  {
    name: "Estreptomicina",
    rhyme: "Estreptomicina, la TBC elimina. Fue la primera en la vitrina, pero el oído te fulmina.",
    meaning: "Primer aminoglucósido. Uso clásico en Tuberculosis y Brucelosis."
  },
  {
    name: "Teicoplanina",
    rhyme: "Teicoplanina, prima de la vanco-micina. Más grasa (liposoluble) la domina, y duele menos la inyectina (IM).",
    meaning: "Glucopéptido similar a Vancomicina pero más liposoluble y permite vía IM."
  }
];

const Theme16Glossary: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setActiveId(activeId === idx ? null : idx);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
       <div className="bg-purple-600 p-4 text-white font-bold flex items-center shadow-md shrink-0">
        <span className="text-3xl mr-3">🧪</span>
        <div>
           <h2 className="text-xl font-black">Glosario Bio-Tóxico</h2>
           <p className="text-sm text-purple-200">Rimas de amplio espectro</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-purple-50">
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
                     ? 'bg-white shadow-2xl ring-4 ring-purple-400 scale-[1.02] z-10' 
                     : 'bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 hover:bg-purple-100'
                   }
                `}
              >
                 <div className="min-h-[100px] flex items-center justify-center p-4 relative">
                    {!isActive && (
                        <div className="absolute inset-x-4 bottom-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                             <div className="h-full bg-gradient-to-r from-purple-200 to-fuchsia-200 w-2/3"></div>
                        </div>
                    )}
                    <div className={`absolute top-0 left-0 w-2 h-full bg-purple-600 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
                    <h3 className={`text-2xl font-black text-center transition-colors duration-300 z-10 ${isActive ? 'text-purple-700 scale-110' : 'text-gray-800'}`}>
                      {item.name}
                    </h3>
                    <div className={`absolute right-5 text-purple-500 text-2xl font-bold transition-transform duration-300 ${isActive ? 'rotate-180' : 'rotate-0'}`}>
                       ▼
                    </div>
                 </div>

                 <div className={`
                    bg-purple-50/50 overflow-hidden transition-all duration-500 ease-in-out border-t border-purple-100
                    ${isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                 `}>
                    <div className="p-6 pt-2">
                        <div className="bg-white p-4 rounded-xl shadow-sm mb-3 border-l-4 border-purple-500">
                            <p className="text-xl font-bold text-purple-800 italic text-center leading-relaxed">
                            "{item.rhyme}"
                            </p>
                        </div>
                        <div className="flex items-start gap-2 text-sm text-gray-700 bg-white/50 p-3 rounded-lg">
                            <span className="text-lg">🦠</span>
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

export default Theme16Glossary;