import React, { useState } from 'react';
import { Question } from '../types';

const QUESTIONS: Question[] = [
  // Antimetabolitos
  {
    id: 1,
    text: "¿Qué hace un antimetabolito en la célula tumoral?",
    options: [
      "Le enseña bioquímica",
      "Se hace pasar por un metabolito y sabotea la síntesis de ADN/ARN",
      "Mejora la respiración celular",
      "Solo actúa como vitamina cara"
    ],
    correctAnswer: 1,
    explanation: "Los antimetabolitos imitan metabolitos normales y bloquean rutas de síntesis de ácidos nucleicos en células que se dividen rápido."
  },
  {
    id: 2,
    text: "¿Qué enzima bloquea el metotrexato?",
    options: [
      "ATP sintasa",
      "Dihidrofolato reductasa",
      "ADN polimerasa",
      "Amilasa pancreática"
    ],
    correctAnswer: 1,
    explanation: "Metotrexato es un análogo del ácido fólico que inhibe la dihidrofolato reductasa, impidiendo regenerar folatos activos."
  },
  {
    id: 3,
    text: "¿Para qué se administra ácido/folinato de folato en esquemas con metotrexato?",
    options: [
      "Para que el paciente “no se quede sin vitaminas”",
      "Para rescatar células normales y reducir toxicidad",
      "Para aumentar el efecto del metotrexato",
      "Para mejorar el sabor de la quimio"
    ],
    correctAnswer: 1,
    explanation: "El folinato de calcio permite que las células sanas recuperen folatos activos y soporten mejor el tratamiento (Rescate)."
  },
  {
    id: 4,
    text: "5‑Fluoruracilo y citarabina son…",
    options: [
      "Antibióticos",
      "Antidepresivos muy fuertes",
      "Antimetabolitos análogos de pirimidinas",
      "Vitaminas del grupo B"
    ],
    correctAnswer: 2,
    explanation: "Estos fármacos imitan pirimidinas e interfieren en la síntesis de ADN/ARN."
  },
  {
    id: 5,
    text: "Fludarabina se clasifica como…",
    options: [
      "Antiandrógeno",
      "Antimetabolito análogo de purinas",
      "Antiestrogénico",
      "Inmunoglobulina"
    ],
    correctAnswer: 1,
    explanation: "Fludarabina es un análogo de purinas que bloquea la síntesis de nucleótidos púricos."
  },
  // Alquilantes
  {
    id: 6,
    text: "¿Qué hacen los agentes alquilantes al ADN?",
    options: [
      "Lo hidratan",
      "Añaden grupos alquilo y provocan enlaces cruzados y roturas",
      "Lo transforman en ARN",
      "Lo convierten en doble hélice “de lujo”"
    ],
    correctAnswer: 1,
    explanation: "Alquilan el ADN, causando daños estructurales que impiden su replicación y llevan a muerte celular."
  },
  {
    id: 7,
    text: "¿Cuál de estos es un agente alquilante?",
    options: [
      "Tamoxifeno",
      "Ciclofosfamida",
      "Imatinib",
      "BCG"
    ],
    correctAnswer: 1,
    explanation: "Ciclofosfamida es un clásico agente alquilante; al igual que ifosfamida, carmustina y tiotepa."
  },
  {
    id: 8,
    text: "Toxicidad estrella del cisplatino:",
    options: [
      "Hipertiroidismo",
      "Alopecia irreversible",
      "Nefrotoxicidad importante",
      "Cataratas agudas"
    ],
    correctAnswer: 2,
    explanation: "Cisplatino es muy nefrotóxico y mielotóxico; el riñón es el órgano crítico."
  },
  {
    id: 9,
    text: "Medida típica para reducir nefrotoxicidad del cisplatino:",
    options: [
      "Dar café antes de la quimio",
      "Hidratación intensa y diuréticos (manitol, furosemida)",
      "Suspender el oxígeno",
      "Añadir más cisplatino “para compensar”"
    ],
    correctAnswer: 1,
    explanation: "Hidratación y diuresis forzada ayudan a eliminar el fármaco y disminuir el contacto con el túbulo renal."
  },
  // Antibióticos Antitumorales
  {
    id: 10,
    text: "Doxorrubicina y bleomicina se consideran…",
    options: [
      "Antihipertensivos",
      "Antibióticos antitumorales",
      "Anticoagulantes",
      "Antiulcerosos"
    ],
    correctAnswer: 1,
    explanation: "Son antibióticos antitumorales que interfieren con el ADN mediante radicales libres e intercalación."
  },
  {
    id: 11,
    text: "Topotecán, etopósido y tenipósido actúan sobre…",
    options: [
      "Receptores de estrógenos",
      "Topoisomerasas implicadas en la replicación del ADN",
      "Canales de sodio",
      "Receptores beta adrenérgicos"
    ],
    correctAnswer: 1,
    explanation: "Inhiben topoisomerasas (I o II), enzimas que desenrollan el ADN; sin ellas, la replicación se bloquea."
  },
  {
    id: 12,
    text: "¿Qué hace la L‑asparraginasa?",
    options: [
      "Aumenta la síntesis de proteínas",
      "Degrada asparragina, dejando a algunas células tumorales sin aminoácido esencial",
      "Aporta glucosa extra al tumor",
      "Actúa como diurético"
    ],
    correctAnswer: 1,
    explanation: "Al eliminar asparragina del medio, priva a células tumorales (que no pueden sintetizarla) de este aminoácido."
  },
  // Antimitóticos
  {
    id: 13,
    text: "Los antimitóticos actúan sobre…",
    options: [
      "Fase G0",
      "Fase S",
      "Fase M, bloqueando la mitosis",
      "Fase de vacaciones celulares"
    ],
    correctAnswer: 2,
    explanation: "Inhiben la formación o dinámica de microtúbulos del huso mitótico, deteniendo la mitosis."
  },
  {
    id: 14,
    text: "Vincristina y vinblastina…",
    options: [
      "Fijan calcio en hueso",
      "Se unen a tubulina e impiden la polimerización de microtúbulos",
      "Actúan como ansiolíticos",
      "Son solo antiinflamatorios"
    ],
    correctAnswer: 1,
    explanation: "Estos alcaloides de la Vinca bloquean la formación (polimerización) del huso mitótico."
  },
  {
    id: 15,
    text: "Paclitaxel (taxano) se caracteriza por…",
    options: [
      "Disolver microtúbulos ya formados",
      "Estabilizar excesivamente los microtúbulos e impedir su desensamblaje",
      "Bloquear receptores de estrógenos",
      "Inhibir la dihidrofolato reductasa"
    ],
    correctAnswer: 1,
    explanation: "Los taxanos estabilizan los microtúbulos, impidiendo su dinámica normal ('los congelan')."
  },
  // Hormonales
  {
    id: 16,
    text: "Tamoxifeno se usa principalmente en…",
    options: [
      "Cáncer de colon",
      "Cáncer de mama hormonosensible",
      "Cáncer de páncreas",
      "Cáncer de piel no melanoma"
    ],
    correctAnswer: 1,
    explanation: "Es un antiestrogénico clásico (SERM) para tumores de mama dependientes de estrógenos."
  },
  {
    id: 17,
    text: "Mecanismo principal de tamoxifeno:",
    options: [
      "Estimula la aromatasa",
      "Aumenta la testosterona",
      "Bloquea receptores de estrógenos en tejido tumoral",
      "Inhibe la síntesis de folatos"
    ],
    correctAnswer: 2,
    explanation: "Compite con el estrógeno por su receptor en el tejido mamario."
  },
  {
    id: 18,
    text: "Aminoglutetimida es…",
    options: [
      "Beta‑bloqueante",
      "Inhibidor de la aromatasa",
      "Anticoagulante",
      "Antiarrítmico"
    ],
    correctAnswer: 1,
    explanation: "Inhibe la aromatasa, enzima clave para la síntesis periférica de estrógenos."
  },
  {
    id: 19,
    text: "Leuprolide, como análogo de LH‑RH/GnRH, a la larga…",
    options: [
      "Aumenta mucho las gonadotropinas",
      "Desensibiliza la hipófisis y baja la producción de hormonas sexuales",
      "Solo actúa en el tiroides",
      "Es un simple analgésico"
    ],
    correctAnswer: 1,
    explanation: "La estimulación continua desensibiliza el eje, provocando una caída de testosterona/estrógenos (castración química)."
  },
  {
    id: 20,
    text: "Flutamida se utiliza sobre todo en…",
    options: [
      "Cáncer de ovario",
      "Cáncer de próstata",
      "Cáncer de tiroides",
      "Linfoma de Hodgkin"
    ],
    correctAnswer: 1,
    explanation: "Es un antiandrógeno puro que bloquea el receptor de testosterona en tumores prostáticos."
  },
  {
    id: 21,
    text: "Prednisona, dexametasona y metilprednisolona en oncología se usan porque…",
    options: [
      "Dan hambre y engordan al tumor",
      "Tienen efecto linfolítico e inmunosupresor, útil en leucemias y linfomas",
      "Son buenos antiácidos",
      "Aumentan la masa muscular"
    ],
    correctAnswer: 1,
    explanation: "Inducen apoptosis en células linfoides (linfolítico) y modulan la respuesta inmune/inflamatoria."
  },
  // Inmunoterapia
  {
    id: 22,
    text: "La inmunoterapia antineoplásica busca…",
    options: [
      "Dormir al sistema inmune",
      "Sustituir al tumor por tejido adiposo",
      "Potenciar las defensas del paciente contra células tumorales",
      "Cambiar el grupo sanguíneo del tumor"
    ],
    correctAnswer: 2,
    explanation: "Estimula o dirige el sistema inmune para que reconozca y destruya células cancerosas."
  },
  {
    id: 23,
    text: "Aldesleukina es…",
    options: [
      "Un diurético",
      "Una interleucina (IL-2) usada para activar linfocitos y NK",
      "Un antiarrítmico",
      "Una heparina de bajo peso molecular"
    ],
    correctAnswer: 1,
    explanation: "Es Interleucina-2 recombinante, potencia la actividad citotóxica de células inmunes."
  },
  {
    id: 24,
    text: "Interferones alfa y beta actúan…",
    options: [
      "Solo como antivirales",
      "Modulando inmunidad y con efecto antiproliferativo sobre células tumorales",
      "Aumentando la glucemia",
      "Activando osteoclastos"
    ],
    correctAnswer: 1,
    explanation: "Tienen acciones inmunomoduladoras y antiproliferativas directas."
  },
  {
    id: 25,
    text: "Alemtuzumab y Cetuximab son ejemplos de…",
    options: [
      "Antidepresivos",
      "Anticuerpos monoclonales dirigidos contra dianas tumorales",
      "Antiagregantes plaquetarios",
      "Antihistamínicos"
    ],
    correctAnswer: 1,
    explanation: "Son anticuerpos monoclonales (mAbs) diseñados para dianas específicas (CD52, EGFR)."
  },
  {
    id: 26,
    text: "La vacuna BCG se usa, por ejemplo, en cáncer de…",
    options: [
      "Hígado",
      "Mama",
      "Vejiga superficial",
      "Cerebro"
    ],
    correctAnswer: 2,
    explanation: "La instilación intravesical de BCG provoca una reacción inmune local que elimina células tumorales en vejiga."
  },
  // Nuevos
  {
    id: 27,
    text: "Bortezomib actúa principalmente como…",
    options: [
      "Inhibidor de aromatasa",
      "Inhibidor del proteasoma",
      "Beta‑bloqueante",
      "Antagonista dopaminérgico"
    ],
    correctAnswer: 1,
    explanation: "Al bloquear el proteasoma, la célula tumoral acumula proteínas tóxicas y muere."
  },
  {
    id: 28,
    text: "Imatinib, Erlotinib y Gefitinib tienen en común que…",
    options: [
      "Son betabloqueantes",
      "Son inhibidores de tirosina‑quinasas/receptores de crecimiento",
      "Son diuréticos de asa",
      "Son vacunas de virus vivos"
    ],
    correctAnswer: 1,
    explanation: "Son fármacos de 'molécula pequeña' (-nib) que inhiben quinasas intracelulares específicas."
  }
];

const OncoQuiz: React.FC = () => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentQuestion = QUESTIONS[currentQIndex];

  const handleOptionClick = (index: number) => {
    if (selectedOption !== null) return; 

    setSelectedOption(index);
    const correct = index === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    if (correct) setScore(score + 100);
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    if (currentQIndex < QUESTIONS.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-blue-900 text-white p-8 overflow-y-auto">
        <h2 className="text-4xl md:text-5xl font-black mb-6 animate-bounce text-center">¡Test Oncológico Completado!</h2>
        <div className="bg-white text-blue-900 rounded-3xl p-8 shadow-2xl text-center max-w-md w-full">
          <p className="text-xl mb-2 font-bold">Puntuación Final</p>
          <p className="text-6xl font-black mb-6 text-blue-600">{score}</p>
          <p className="text-gray-600 mb-6 font-medium">
            {score > (QUESTIONS.length * 100 * 0.8) ? "¡Experto en Quimioterapia!" : "Buen esfuerzo. Repasa el Mapa Mental y vuelve a intentar."}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95"
          >
            Volver a Jugar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-100 relative overflow-hidden">
      <div className="bg-blue-800 p-4 flex justify-between items-center shadow-md z-10 text-white">
        <div className="flex items-center space-x-2">
          <span className="bg-blue-900 px-3 py-1 rounded-full font-bold text-sm border border-blue-600">
            {currentQIndex + 1} / {QUESTIONS.length}
          </span>
        </div>
        <div className="font-black text-xl md:text-2xl">Puntos: {score}</div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-start md:justify-center p-4 md:p-6 text-center z-10 overflow-y-auto">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl max-w-4xl w-full mb-6 border-b-4 border-gray-200">
          <h2 className="text-xl md:text-3xl font-black text-gray-800 leading-tight">
            {currentQuestion.text}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full max-w-5xl pb-20 md:pb-0">
          {currentQuestion.options.map((option, idx) => {
            let btnClass = "";
            if (selectedOption !== null) {
              if (idx === currentQuestion.correctAnswer) {
                btnClass = "bg-green-500 text-white ring-4 ring-green-300 opacity-100";
              } else if (idx === selectedOption) {
                btnClass = "bg-red-500 text-white ring-4 ring-red-300 opacity-100";
              } else {
                btnClass = "bg-gray-200 text-gray-400 opacity-40 grayscale";
              }
            } else {
                const colors = ["bg-red-500 border-red-700", "bg-blue-500 border-blue-700", "bg-yellow-500 border-yellow-700", "bg-green-500 border-green-700"];
                btnClass = `${colors[idx]} text-white hover:brightness-110 kahoot-shadow active:kahoot-shadow-active border-b-4`;
            }
            const shapes = ["▲", "◆", "●", "■"];
            return (
              <button
                key={idx}
                disabled={selectedOption !== null}
                onClick={() => handleOptionClick(idx)}
                className={`p-4 md:p-6 rounded-xl text-lg md:text-xl font-bold transition-all transform flex items-center shadow-lg min-h-[80px] text-left ${btnClass}`}
              >
                <span className="mr-4 text-2xl opacity-80 shrink-0">{shapes[idx]}</span>
                <span>{option}</span>
              </button>
            );
          })}
        </div>
      </div>

      {selectedOption !== null && (
        <div className="absolute bottom-0 left-0 right-0 bg-gray-900/95 text-white p-6 z-20 animate-slide-up backdrop-blur-sm border-t-4 border-white/20">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center md:justify-between mb-4 gap-4">
              <div className={`text-3xl md:text-4xl font-black ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isCorrect ? "¡Correcto!" : "Incorrecto..."}
              </div>
              <button onClick={nextQuestion} className="bg-white text-blue-900 font-black py-3 px-10 rounded-full hover:bg-gray-200 transition-colors shadow-lg transform active:scale-95">
                Siguiente ➔
              </button>
            </div>
            <p className="text-lg text-gray-300 mb-3 font-medium bg-white/10 p-3 rounded-lg border-l-4 border-yellow-400">
               💡 {currentQuestion.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OncoQuiz;