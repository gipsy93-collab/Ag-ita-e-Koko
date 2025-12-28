import React, { useState } from 'react';
import { Question } from '../types';

const QUESTIONS: Question[] = [
  // Concepto General
  {
    id: 1,
    text: "¿Para qué sirven, en la vida real, los inmunosupresores?",
    options: [
      "Para curar resfriados en 24 horas",
      "Para “fortalecer” el sistema inmune",
      "Para suprimir o modular la respuesta inmune en autoinmunidad, trasplantes y algunas neoplasias",
      "Para broncearse mejor"
    ],
    correctAnswer: 2,
    explanation: "Se usan en enfermedades autoinmunes, prevención del rechazo de trasplantes y ciertos cánceres."
  },
  {
    id: 2,
    text: "Cuando el sistema inmunitario “se pone en tu contra” y ataca tus propios tejidos, hablamos de…",
    options: [
      "Inmunodeficiencia congénita",
      "Enfermedad autoinmune",
      "Alergia al estudio",
      "Infección crónica"
    ],
    correctAnswer: 1,
    explanation: "La autoinmunidad aparece cuando las defensas reconocen estructuras propias como extrañas."
  },
  {
    id: 3,
    text: "¿Por qué se necesitan inmunosupresores tras un trasplante de órgano?",
    options: [
      "Para que el órgano no tenga frío",
      "Porque el sistema inmune reconoce el órgano como extraño e intenta rechazarlo",
      "Para que el órgano cambie de grupo sanguíneo",
      "Para evitar dolor local"
    ],
    correctAnswer: 1,
    explanation: "El injerto expresa antígenos distintos y dispara una respuesta inmune que hay que controlar."
  },
  // Anticuerpos
  {
    id: 4,
    text: "Las globulinas antilinfocíticas y antitimocíticas son…",
    options: [
      "Antibióticos",
      "Anticuerpos policlonales usados como inmunosupresores",
      "Diuréticos ahorradores de potasio",
      "Vitaminas intravenosas"
    ],
    correctAnswer: 1,
    explanation: "Son mezclas de anticuerpos dirigidas contra linfocitos/Timo para deprimir la respuesta inmune."
  },
  {
    id: 5,
    text: "Infliximab y Muromonab se consideran…",
    options: [
      "Hormonas tiroideas",
      "Anticuerpos monoclonales (mAb) inmunosupresores",
      "Anticoagulantes",
      "Analgésicos"
    ],
    correctAnswer: 1,
    explanation: "Son anticuerpos específicos contra dianas concretas (TNF-alfa, CD3) del sistema inmune."
  },
  // Inmunofilinas
  {
    id: 6,
    text: "Ciclosporina y tacrolimus actúan como…",
    options: [
      "Betabloqueantes",
      "Inhibidores de ciclofilinas, modulando la activación de linfocitos T",
      "Antiagregantes plaquetarios",
      "Estatinas"
    ],
    correctAnswer: 1,
    explanation: "Se unen a inmunofilinas (ciclofilinas/FKBP) e interfieren en la activación de linfocitos T (calcineurina)."
  },
  {
    id: 7,
    text: "Una toxicidad destacable de ciclosporina/tacrolimus es…",
    options: [
      "Hipersalivación",
      "Depresión de la médula ósea y otras toxicidades inmunitarias",
      "Hipertrofia del pelo de la lengua",
      "Osteoporosis inmediata"
    ],
    correctAnswer: 1,
    explanation: "Pueden deprimir médula ósea y producir nefrotoxicidad; requieren monitorización."
  },
  {
    id: 8,
    text: "Rapamicina (Sirolimus) se caracteriza por…",
    options: [
      "Activar la síntesis proteica",
      "Inhibir mTOR, bloqueando síntesis de proteínas y división celular",
      "Ser solo diurético",
      "Ser laxante suave"
    ],
    correctAnswer: 1,
    explanation: "Es un inhibidor enzimático de mTOR, lo que detiene el ciclo celular y la proliferación de linfocitos."
  },
  // Glucocorticoides
  {
    id: 9,
    text: "Prednisona, prednisolona y metilprednisolona se usan como inmunosupresores porque…",
    options: [
      "Engordan al paciente y al órgano",
      "Disminuyen la actividad inflamatoria e inmune, sobre todo de linfocitos",
      "Solo bajan la fiebre",
      "Solo sirven como antieméticos"
    ],
    correctAnswer: 1,
    explanation: "Inhiben múltiples mediadores inflamatorios y reducen la respuesta de células inmunes."
  },
  {
    id: 10,
    text: "En situaciones agudas graves, estos glucocorticoides suelen administrarse…",
    options: [
      "Solo por vía tópica",
      "Por vía intravenosa",
      "Exclusivamente por vía intranasal",
      "Únicamente en colirio"
    ],
    correctAnswer: 1,
    explanation: "Prednisona, prednisolona y metilprednisolona IV se emplean en crisis o rechazo agudo."
  },
  // Citostáticos
  {
    id: 11,
    text: "Azatioprina (AZA) se clasifica como…",
    options: [
      "Antiácido",
      "Citostático citotóxico con efecto inmunosupresor",
      "Antihipertensivo",
      "Antipsicótico"
    ],
    correctAnswer: 1,
    explanation: "Es un citostático que interfiere en la síntesis de ADN y reduce la proliferación de células inmunes."
  },
  {
    id: 12,
    text: "Metotrexato, además de antineoplásico, aquí aparece como…",
    options: [
      "Antiarrítmico",
      "Citostático/antimetabolito con efecto inmunosupresor",
      "Antihistamínico",
      "Vitaminas del grupo B"
    ],
    correctAnswer: 1,
    explanation: "El mismo mecanismo sobre folatos se aprovecha para frenar la proliferación de células inmunitarias (ej. Artritis)."
  },
  {
    id: 13,
    text: "Micofenolato de mofetilo se utiliza como…",
    options: [
      "Analgésico",
      "Citostático inmunosupresor",
      "Antibiótico",
      "Antiemético"
    ],
    correctAnswer: 1,
    explanation: "Es un inmunosupresor que inhibe la síntesis de purinas y la proliferación de linfocitos."
  },
  {
    id: 14,
    text: "Ciclofosfamida, además de antineoplásico, figura como…",
    options: [
      "Antihipertensivo",
      "Citotóxico inmunosupresor",
      "Broncodilatador",
      "Hipoglucemiante"
    ],
    correctAnswer: 1,
    explanation: "Su acción citotóxica sobre células de alta proliferación se usa para suprimir la respuesta inmune severa."
  },
  // Nuevos
  {
    id: 15,
    text: "Anakinra, Etanercept, Leflunomida se agrupan como…",
    options: [
      "Laxantes",
      "Nuevos inmunosupresores con dianas específicas",
      "Diuréticos de asa",
      "Antiácidos"
    ],
    correctAnswer: 1,
    explanation: "Se consideran nuevas opciones inmunosupresoras utilizadas en diversas patologías inflamatorias/autoinmunes."
  },
  // Inmunoestimulantes
  {
    id: 16,
    text: "Los inmunoestimulantes se usan sobre todo en…",
    options: [
      "Personas sanas que quieren “superpoderes”",
      "Inmunodeficiencias congénitas o adquiridas",
      "Rechazo de trasplante",
      "Anafilaxia aguda"
    ],
    correctAnswer: 1,
    explanation: "En estos pacientes la respuesta inmune es insuficiente y se intenta potenciarla."
  },
  {
    id: 17,
    text: "La mayoría de inmunoestimulantes se dirigen especialmente a…",
    options: [
      "Células del tejido adiposo",
      "Eritrocitos",
      "Células/linfocitos T",
      "Plaquetas"
    ],
    correctAnswer: 2,
    explanation: "Muchas estrategias buscan mejorar funciones críticas de los linfocitos T para combatir infecciones."
  },
  {
    id: 18,
    text: "En este tema, los interferones se presentan como…",
    options: [
      "Solo antivirales",
      "Inmunoestimulantes con usos también antineoplásicos y antivíricos",
      "Anticoagulantes",
      "Diuréticos"
    ],
    correctAnswer: 1,
    explanation: "Tienen un papel como inmunomoduladores estimulantes en distintas patologías, incluidos cáncer y virus."
  },
  {
    id: 19,
    text: "¿Para qué se emplean las inmunoglobulinas en pacientes con inmunodeficiencias?",
    options: [
      "Para subir el colesterol",
      "Para aportar anticuerpos listos y mejorar la defensa frente a infecciones",
      "Para bajar la tensión arterial",
      "Para sedar al paciente"
    ],
    correctAnswer: 1,
    explanation: "Son preparados de anticuerpos humanos (IgG) que refuerzan la inmunidad humoral pasivamente."
  },
  {
    id: 20,
    text: "Levamisol se considera un…",
    options: [
      "Anticoagulante oral",
      "Inmunoestimulante sintético",
      "Antidepresivo",
      "Hipnótico"
    ],
    correctAnswer: 1,
    explanation: "Es un inmunoestimulante sintético que puede potenciar la respuesta inmunitaria (uso histórico/limitado)."
  }
];

const ImmunoQuiz: React.FC = () => {
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
      <div className="flex flex-col items-center justify-center h-full bg-cyan-900 text-white p-8 overflow-y-auto">
        <h2 className="text-4xl md:text-5xl font-black mb-6 animate-bounce text-center">¡Examen Inmunológico Superado!</h2>
        <div className="bg-white text-cyan-900 rounded-3xl p-8 shadow-2xl text-center max-w-md w-full">
          <p className="text-xl mb-2 font-bold">Puntuación Final</p>
          <p className="text-6xl font-black mb-6 text-cyan-600">{score}</p>
          <p className="text-gray-600 mb-6 font-medium">
            {score > (QUESTIONS.length * 100 * 0.8) ? "¡Tu sistema inmune es fuerte!" : "Necesitas un poco de inmunoestimulación (estudio)."}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95"
          >
            Volver a Jugar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-100 relative overflow-hidden">
      <div className="bg-cyan-700 p-4 flex justify-between items-center shadow-md z-10 text-white">
        <div className="flex items-center space-x-2">
          <span className="bg-cyan-800 px-3 py-1 rounded-full font-bold text-sm border border-cyan-500">
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
              <button onClick={nextQuestion} className="bg-white text-cyan-900 font-black py-3 px-10 rounded-full hover:bg-gray-200 transition-colors shadow-lg transform active:scale-95">
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

export default ImmunoQuiz;