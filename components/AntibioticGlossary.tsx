import React, { useState } from 'react';

const TONGUE_TWISTERS = [
  {
    name: "Penicilina",
    rhyme: "Penicilina, la vecina, a la bacteria asesina. Rompe la pared fina y la infección termina en la ruina.",
    meaning: "Betalactámico bactericida. Inhibe síntesis de pared celular. Prototipo del grupo."
  },
  {
    name: "Amoxicilina + Clavulánico",
    rhyme: "Amoxicilina con clavulánico, para el bicho es pánico. Si la enzima ataca titánico, el escudo es mecánico.",
    meaning: "El ácido clavulánico inhibe las betalactamasas, protegiendo a la amoxicilina de la resistencia."
  },
  {
    name: "Cefalosporinas",
    rhyme: "Cefalosporina camina, pared celular elimina. De primera a cuarta se empina, y a la bacteria fulmina.",
    meaning: "Betalactámicos de amplio espectro. Clasificados en generaciones según su actividad."
  },
  {
    name: "Vancomicina",
    rhyme: "Vancomicina no desafina, al Gram positivo cocina. Si es resistente a meticilina, esta es la medicina.",
    meaning: "Glicopéptido que inhibe la pared celular. Reserva para S. aureus resistente (MRSA)."
  },
  {
    name: "Aminoglucósidos",
    rhyme: "Aminoglucósido intrépido, al ribosoma deja lívido. Bactericida rápido, pero al oído y riñón deja tímido.",
    meaning: "Inhiben síntesis proteica (30S). Son bactericidas potentes pero ototóxicos y nefrotóxicos."
  },
  {
    name: "Macrólidos",
    rhyme: "Macrólido pálido, frena el crecimiento válido. Sin pared no es inválido, intracelular es su cálido.",
    meaning: "Bacteriostáticos (inhiben 50S). Útiles en alérgicos a penicilina y bacterias intracelulares."
  },
  {
    name: "Quinolonas",
    rhyme: "Quinolona en la zona, al ADN lo arrincona. La girasa ya no funciona y la bacteria se desmorona.",
    meaning: "Inhiben la ADN girasa/topoisomerasa. Interfieren con la replicación del ADN bacteriano."
  },
  {
    name: "Sulfamidas",
    rhyme: "Sulfamida en la partida, deja al folato sin vida. La bacteria queda perdida y su división impedida.",
    meaning: "Antimetabolitos. Bloquean la síntesis de ácido fólico bacteriano (bacteriostáticos)."
  }
];

const AntibioticGlossary: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setActiveId(activeId === idx ? null : idx);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
       <div className="bg-yellow-600 p-4 text-white font-bold flex items-center shadow-md shrink-0">
        <span className="text-3xl mr-3">🦠</span>
        <div>
           <h2 className="text-xl font-black">Glosario Antibiótico</h2>
           <p className="text-sm text-yellow-200">Rimas contra las bacterias</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-yellow-50">
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
                     ? 'bg-white shadow-2xl ring-4 ring-yellow-300 scale-[1.02] z-10' 
                     : 'bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 hover:bg-yellow-100'
                   }
                `}
              >
                 <div className="min-h-[100px] flex items-center justify-center p-4 relative">
                    {!isActive && (
                        <div className="absolute inset-x-4 bottom-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                             <div className="h-full bg-gradient-to-r from-yellow-200 to-orange-200 w-2/3"></div>
                        </div>
                    )}
                    <div className={`absolute top-0 left-0 w-2 h-full bg-yellow-500 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
                    <h3 className={`text-2xl font-black text-center transition-colors duration-300 z-10 ${isActive ? 'text-yellow-700 scale-110' : 'text-gray-800'}`}>
                      {item.name}
                    </h3>
                    <div className={`absolute right-5 text-yellow-500 text-2xl font-bold transition-transform duration-300 ${isActive ? 'rotate-180' : 'rotate-0'}`}>
                       ▼
                    </div>
                 </div>

                 <div className={`
                    bg-yellow-50/50 overflow-hidden transition-all duration-500 ease-in-out border-t border-yellow-100
                    ${isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                 `}>
                    <div className="p-6 pt-2">
                        <div className="bg-white p-4 rounded-xl shadow-sm mb-3 border-l-4 border-yellow-400">
                            <p className="text-xl font-bold text-yellow-800 italic text-center leading-relaxed">
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

export default AntibioticGlossary;