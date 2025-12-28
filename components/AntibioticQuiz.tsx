import React, { useState } from 'react';
import { Question } from '../types';

const QUESTIONS: Question[] = [
  // Conceptos básicos
  {
    id: 1,
    text: "¿Qué hace un antibiótico bactericida?",
    options: [
      "Les da consejos de vida a las bacterias",
      "Mata a las bacterias responsables de la infección",
      "Solo las deja un poco mareadas",
      "Las convierte en virus"
    ],
    correctAnswer: 1,
    explanation: "Bactericidas producen la muerte del microorganismo, no solo frenan su crecimiento."
  },
  {
    id: 2,
    text: "Un antibiótico bacteriostático se caracteriza por…",
    options: [
      "Revivir bacterias del pasado",
      "Inhibir el crecimiento, pero las bacterias siguen vivas y pueden volver a multiplicarse",
      "Convertir bacterias en hongos",
      "Ser siempre tóxico"
    ],
    correctAnswer: 1,
    explanation: "Bacteriostáticos detienen la multiplicación; la eliminación final depende del sistema inmune."
  },
  {
    id: 3,
    text: "¿Cuál de estos grupos es principalmente bactericida?",
    options: [
      "Tetraciclinas y macrólidos",
      "Betalactámicos, quinolonas, aminoglucósidos",
      "Sulfamidas y cloranfenicol",
      "“Todos por igual”"
    ],
    correctAnswer: 1,
    explanation: "Betalactámicos, quinolonas, nitrofurantoínas, aminoglucósidos, vancomicina y teicoplanina se consideran bactericidas."
  },
  {
    id: 4,
    text: "La CMI (concentración mínima inhibitoria) es…",
    options: [
      "La dosis máxima tolerada por el paciente",
      "La menor concentración capaz de inhibir el crecimiento de 10⁵ bacterias en 1 ml",
      "La concentración que mata a todas las bacterias del planeta",
      "La concentración más barata"
    ],
    correctAnswer: 1,
    explanation: "CMI = mínima concentración que impide el crecimiento visible tras 18–24 h."
  },
  {
    id: 5,
    text: "La CMB (concentración mínima bactericida) es…",
    options: [
      "Lo mismo que la CMI",
      "La menor concentración capaz de matar 10⁵ bacterias en 1 ml",
      "La dosis que produce fiebre",
      "Una medida solo teórica, nunca usada"
    ],
    correctAnswer: 1,
    explanation: "CMB indica la concentración que destruye la población bacteriana en las condiciones del ensayo."
  },
  {
    id: 6,
    text: "El EPA (Efecto Post-Antibiótico) se define como…",
    options: [
      "El efecto placebo del antibiótico",
      "El tiempo de inhibición del crecimiento bacteriano tras retirar el antibiótico",
      "El tiempo que dura el envase en la nevera",
      "El periodo de patente del fármaco"
    ],
    correctAnswer: 1,
    explanation: "Muchas familias muestran EPA y esto permite espaciar dosis incluso con semividas cortas (12–24 h)."
  },
  // Mecanismos
  {
    id: 7,
    text: "¿Qué grupos inhiben la síntesis de la pared celular bacteriana?",
    options: [
      "Macrólidos y tetraciclinas",
      "Quinolonas y nitrofurantoínas",
      "Betalactámicos, vancomicina y teicoplanina",
      "Sulfamidas y trimetoprim"
    ],
    correctAnswer: 2,
    explanation: "Estos antibióticos impiden la formación de la pared de peptidoglucano, llevando a lisis bacteriana."
  },
  {
    id: 8,
    text: "¿Qué grupos inhiben la síntesis de proteínas bacterianas?",
    options: [
      "Betalactámicos",
      "Aminoglucósidos, cloranfenicol, tetraciclinas, macrólidos",
      "Quinolonas",
      "Nitrofurantoínas solo"
    ],
    correctAnswer: 1,
    explanation: "Actúan sobre ribosomas bacterianos (30S o 50S), frenando la síntesis proteica."
  },
  {
    id: 9,
    text: "Las quinolonas actúan principalmente…",
    options: [
      "En la síntesis de folato",
      "En la pared celular",
      "Interfiriendo con la síntesis/metabolismo de ácidos nucleicos",
      "En la membrana mitocondrial humana"
    ],
    correctAnswer: 2,
    explanation: "Inhiben enzimas como ADN girasa/topoisomerasa, bloqueando la replicación de ADN bacteriano."
  },
  {
    id: 10,
    text: "¿Qué combinación clásica bloquea la síntesis de ácido fólico bacteriano?",
    options: [
      "Penicilina + cefalosporina",
      "Sulfamidas (sulfametoxazol) + trimetoprim (cotrimoxazol)",
      "Quinolona + macrólido",
      "Aminoglucósido + vancomicina"
    ],
    correctAnswer: 1,
    explanation: "Sulfamidas y trimetoprim actúan en pasos distintos de la vía del ácido fólico, potenciándose."
  },
  // Betalactámicos
  {
    id: 11,
    text: "¿Qué grupos forman parte de los antibióticos betalactámicos?",
    options: [
      "Macrólidos y tetraciclinas",
      "Penicilinas, cefalosporinas, carbapenemes y monobactámicos",
      "Quinolonas y aminoglucósidos",
      "Sulfamidas y nitrofurantoínas"
    ],
    correctAnswer: 1,
    explanation: "Todos comparten el anillo betalactámico y actúan sobre la pared celular."
  },
  {
    id: 12,
    text: "La penicilina G (bencilpenicilina) se clasifica como…",
    options: [
      "Penicilina resistente a betalactamasas",
      "Penicilina natural",
      "Penicilina de amplio espectro",
      "Penicilina anti‑Pseudomonas"
    ],
    correctAnswer: 1,
    explanation: "Es la forma natural, sensible a betalactamasas y usada sobre todo por vía parenteral."
  },
  {
    id: 13,
    text: "¿Cuál es una forma de penicilina G de acción prolongada por vía intramuscular?",
    options: [
      "Penicilina V",
      "Penicilina G‑procaína o G‑benzatina",
      "Amoxicilina",
      "Oxacilina"
    ],
    correctAnswer: 1,
    explanation: "Asociaciones con procaína o benzatina liberan la penicilina lentamente tras la inyección IM."
  },
  {
    id: 14,
    text: "¿Qué penicilina es resistente a betalactamasas (antistafilocócica clásica)?",
    options: [
      "Amoxicilina",
      "Meticilina (y oxacilina, cloxacilina)",
      "Penicilina G",
      "Ampicilina"
    ],
    correctAnswer: 1,
    explanation: "Meticilina y derivados se diseñaron para resistir betalactamasas de estafilococos."
  },
  {
    id: 15,
    text: "¿Cuál de estas es una penicilina de amplio espectro aminopenicilina?",
    options: [
      "Penicilina V",
      "Meticilina",
      "Ampicilina o amoxicilina",
      "Ticarcilina"
    ],
    correctAnswer: 2,
    explanation: "Ampicilina, pivampicilina y amoxicilina amplían el espectro frente a Gram‑negativos."
  },
  {
    id: 16,
    text: "¿Qué penicilinas son activas frente a Pseudomonas?",
    options: [
      "Penicilina V y G",
      "Ticarcilina y carbenicilina",
      "Meticilina y oxacilina",
      "Cefalexima y cefixima"
    ],
    correctAnswer: 1,
    explanation: "Ticarcilina y carbenicilina se usan especialmente por su actividad antipseudomónica."
  },
  {
    id: 17,
    text: "¿Por qué se combinan amoxicilina o ampicilina con ácido clavulánico o sulbactam?",
    options: [
      "Para mejorar el sabor",
      "Porque estos inhibidores de betalactamasas protegen al antibiótico",
      "Para hacerlas más ácidas",
      "Para que sean bacteriostáticas"
    ],
    correctAnswer: 1,
    explanation: "Sulbactam, ácido clavulánico y tazobactam inhiben betalactamasas, ampliando el espectro."
  },
  {
    id: 18,
    text: "Las cefalosporinas se parecen a las penicilinas porque…",
    options: [
      "Son macrólidos",
      "Actúan sobre ribosomas",
      "Son betalactámicos que inhiben la síntesis de pared celular",
      "Son siempre bacteriostáticos"
    ],
    correctAnswer: 2,
    explanation: "Comparten anillo betalactámico y mecanismo de acción sobre la pared."
  },
  {
    id: 19,
    text: "¿Qué es correcto sobre las cefalosporinas?",
    options: [
      "Solo se administran por vía oral",
      "La mayoría son parenterales, algunas también orales (cefuroxima, cefalexima, cefixima)",
      "Solo se usan tópicamente",
      "No se usan en clínica"
    ],
    correctAnswer: 1,
    explanation: "Existen formulaciones IV y orales según la generación."
  },
  {
    id: 20,
    text: "Imipenem, meropenem y ertapenem son…",
    options: [
      "Macrólidos",
      "Aminoglucósidos",
      "Antibióticos carbapenemes de amplio espectro",
      "Sulfamidas"
    ],
    correctAnswer: 2,
    explanation: "Son betalactámicos muy potentes de uso hospitalario, por vía IV."
  },
  {
    id: 21,
    text: "Aztreonam se clasifica como…",
    options: [
      "Cefalosporina oral",
      "Antibiótico monobactámico",
      "Quinolona",
      "Antimicótico"
    ],
    correctAnswer: 1,
    explanation: "Es un betalactámico de estructura monobactámica, administrado IV."
  },
  {
    id: 22,
    text: "¿Qué se suele destacar de muchos betalactámicos (penicilinas/cefalo) en embarazo y pediatría?",
    options: [
      "Están totalmente prohibidos",
      "Son de los antibióticos más seguros en embarazadas y niños",
      "Solo se usan en última línea",
      "Son siempre nefrotóxicos"
    ],
    correctAnswer: 1,
    explanation: "Penicilinas y muchas cefalosporinas tienen buen perfil de seguridad en estas poblaciones."
  },
  {
    id: 23,
    text: "¿Qué combinación es correcta respecto a bactericidas/bacteriostáticos?",
    options: [
      "Betalactámicos y quinolonas: bactericidas",
      "Tetraciclinas y macrólidos: bactericidas",
      "Sulfamidas: siempre bactericidas",
      "Aminoglucósidos: bacteriostáticos"
    ],
    correctAnswer: 0,
    explanation: "Tetraciclinas, macrólidos, sulfamidas, cloranfenicol suelen ser bacteriostáticos; aminoglucósidos, bactericidas."
  },
  {
    id: 24,
    text: "¿Por qué el EPA permite espaciar las dosis de algunos antibióticos?",
    options: [
      "Porque el médico lo dice",
      "Porque el crecimiento sigue inhibido incluso cuando la concentración plasmática ha caído",
      "Porque se acumulan en el pelo",
      "Porque se metabolizan más lento en lunes"
    ],
    correctAnswer: 1,
    explanation: "Aunque la concentración sérica baje, persiste un efecto inhibitorio sobre la bacteria, permitiendo intervalos de 12–24 h."
  }
];

const AntibioticQuiz: React.FC = () => {
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
      <div className="flex flex-col items-center justify-center h-full bg-yellow-900 text-white p-8 overflow-y-auto">
        <h2 className="text-4xl md:text-5xl font-black mb-6 animate-bounce text-center">¡Examen de Infectología Superado!</h2>
        <div className="bg-white text-yellow-900 rounded-3xl p-8 shadow-2xl text-center max-w-md w-full">
          <p className="text-xl mb-2 font-bold">Puntuación Final</p>
          <p className="text-6xl font-black mb-6 text-yellow-600">{score}</p>
          <p className="text-gray-600 mb-6 font-medium">
            {score > (QUESTIONS.length * 100 * 0.8) ? "¡Eres el terror de las bacterias!" : "Sigue estudiando el espectro antibiótico."}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95"
          >
            Volver a Jugar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-100 relative overflow-hidden">
      <div className="bg-yellow-700 p-4 flex justify-between items-center shadow-md z-10 text-white">
        <div className="flex items-center space-x-2">
          <span className="bg-yellow-800 px-3 py-1 rounded-full font-bold text-sm border border-yellow-500">
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
              <button onClick={nextQuestion} className="bg-white text-yellow-900 font-black py-3 px-10 rounded-full hover:bg-gray-200 transition-colors shadow-lg transform active:scale-95">
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

export default AntibioticQuiz;