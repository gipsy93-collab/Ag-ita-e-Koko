import React, { useState } from 'react';

const TONGUE_TWISTERS = [
  {
    name: "Aciclovir",
    rhyme: "Aciclovir al herpes le da fin, rompe su ADN y lo deja en el jardín. Si es zóster o simple, es el paladín.",
    meaning: "Análogo de nucleósido. Inhibe la ADN polimerasa viral. Útil en Herpes Simple y Varicela-Zóster."
  },
  {
    name: "Ganciclovir",
    rhyme: "Ganciclovir, al citomegalovirus va a herir. Es potente al combatir, pero la médula puede sufrir.",
    meaning: "Análogo de guanosina. Potente contra CMV (Citomegalovirus). Ojo con la mielotoxicidad."
  },
  {
    name: "Zidovudina (AZT)",
    rhyme: "Zidovudina, la retroviral, a la transcriptasa le sienta fatal. El VIH se queda sin señal y frena su mal.",
    meaning: "Inhibidor de la Transcriptasa Inversa (ITI). Fármaco clásico antirretroviral (VIH)."
  },
  {
    name: "Ritonavir",
    rhyme: "Ritonavir, el protector, corta la proteasa y apaga el motor. El virus sale sin valor y no causa dolor.",
    meaning: "Inhibidor de Proteasa (IP). Impide la maduración del virus, generando viriones no infecciosos."
  },
  {
    name: "Oseltamivir",
    rhyme: "Oseltamivir en la gripe va, a la neuraminidasa detendrá. Si es Influenza A o B, el virus no saldrá.",
    meaning: "Inhibidor de la neuraminidasa. Impide la liberación de nuevos virus de la gripe (Influenza A y B)."
  },
  {
    name: "Ribavirina",
    rhyme: "Ribavirina, de amplio espectro camina. ADN o ARN, a todos domina, aunque la anemia se avecina.",
    meaning: "Antiviral de amplio espectro in vitro. Usado en VSR, Hepatitis C y fiebres hemorrágicas."
  },
  {
    name: "Interferones",
    rhyme: "Interferón, el chivato, avisa a la célula hace rato. Sube la defensa sensato y al virus le da un mal trato.",
    meaning: "Inmunomoduladores naturales. Activan defensas antivirales y frenan la replicación."
  },
  {
    name: "Foscarnet",
    rhyme: "Foscarnet, si el herpes es resistente, entra de frente. Al riñón le hinca el diente, úsalo prudentemente.",
    meaning: "Inhibidor de polimerasas. Alternativa en CMV o Herpes resistentes. Muy nefrotóxico."
  }
];

const ViralGlossary: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setActiveId(activeId === idx ? null : idx);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
       <div className="bg-emerald-600 p-4 text-white font-bold flex items-center shadow-md shrink-0">
        <span className="text-3xl mr-3">☣️</span>
        <div>
           <h2 className="text-xl font-black">Glosario Viral</h2>
           <p className="text-sm text-emerald-200">Rimas de contención biológica</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-emerald-50">
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
                     ? 'bg-white shadow-2xl ring-4 ring-emerald-400 scale-[1.02] z-10' 
                     : 'bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 hover:bg-emerald-100'
                   }
                `}
              >
                 <div className="min-h-[100px] flex items-center justify-center p-4 relative">
                    {!isActive && (
                        <div className="absolute inset-x-4 bottom-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                             <div className="h-full bg-gradient-to-r from-emerald-200 to-lime-200 w-2/3"></div>
                        </div>
                    )}
                    <div className={`absolute top-0 left-0 w-2 h-full bg-emerald-600 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
                    <h3 className={`text-2xl font-black text-center transition-colors duration-300 z-10 ${isActive ? 'text-emerald-700 scale-110' : 'text-gray-800'}`}>
                      {item.name}
                    </h3>
                    <div className={`absolute right-5 text-emerald-500 text-2xl font-bold transition-transform duration-300 ${isActive ? 'rotate-180' : 'rotate-0'}`}>
                       ▼
                    </div>
                 </div>

                 <div className={`
                    bg-emerald-50/50 overflow-hidden transition-all duration-500 ease-in-out border-t border-emerald-100
                    ${isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                 `}>
                    <div className="p-6 pt-2">
                        <div className="bg-white p-4 rounded-xl shadow-sm mb-3 border-l-4 border-emerald-500">
                            <p className="text-xl font-bold text-emerald-800 italic text-center leading-relaxed">
                            "{item.rhyme}"
                            </p>
                        </div>
                        <div className="flex items-start gap-2 text-sm text-gray-700 bg-white/50 p-3 rounded-lg">
                            <span className="text-lg">🔬</span>
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

export default ViralGlossary;