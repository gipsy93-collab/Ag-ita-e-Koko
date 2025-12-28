import React, { useState } from 'react';
import { Question } from '../types';

const QUESTIONS: Question[] = [
  // Aminoglucósidos
  {
    id: 1,
    text: "Los aminoglucósidos se caracterizan por…",
    options: [
      "Metabolizarse intensamente en hígado",
      "No metabolizarse y excretarse por filtración glomerular",
      "Eliminarse solo por bilis",
      "Ser lipofílicos y acumularse en grasa"
    ],
    correctAnswer: 1,
    explanation: "El texto destaca que no se metabolizan y se eliminan por filtración glomerular."
  },
  {
    id: 2,
    text: "Los aminoglucósidos tienen…",
    options: [
      "Índice terapéutico amplísimo",
      "Índice terapéutico muy estrecho",
      "Casi nula toxicidad",
      "Uso solo tópico"
    ],
    correctAnswer: 1,
    explanation: "Se insiste en su índice terapéutico muy estrecho, requiriendo monitorización."
  },
  {
    id: 3,
    text: "La toxicidad típica de aminoglucósidos es…",
    options: [
      "Dermatológica y pulmonar",
      "Ototoxicidad y nefrotoxicidad",
      "Solo hepatotoxicidad",
      "Solo hipotensión"
    ],
    correctAnswer: 1,
    explanation: "Requieren monitorizar niveles por riesgo de daño oído‑riñón."
  },
  {
    id: 4,
    text: "Una peculiaridad farmacodinámica de los aminoglucósidos es…",
    options: [
      "No tener EPA",
      "Tener efecto post‑antibiótico prolongado",
      "Ser solo bacteriostáticos",
      "Actuar solo en fase G0"
    ],
    correctAnswer: 1,
    explanation: "Se menciona que presentan un efecto post‑ATB prolongado."
  },
  {
    id: 5,
    text: "¿Cuál de estos es un aminoglucósido?",
    options: [
      "Eritromicina",
      "Gentamicina (también estreptomicina, tobramicina, amikacina)",
      "Doxiciclina",
      "Claritromicina"
    ],
    correctAnswer: 1,
    explanation: "El tema lista estreptomicina, gentamicina, tobramicina, amikacina y espectinomicina."
  },
  {
    id: 6,
    text: "Neomicina se utiliza principalmente…",
    options: [
      "Sistémica IV",
      "Vía tópica dermatológica y oral; es muy tóxica por vía parenteral",
      "Solo intramuscular",
      "Solo inhalada"
    ],
    correctAnswer: 1,
    explanation: "Se advierte que es muy tóxica si se administra por vía parenteral."
  },
  // Glucopéptidos
  {
    id: 7,
    text: "¿Qué son vancomicina y teicoplanina?",
    options: [
      "Macrólidos",
      "Antibióticos glucopéptidos",
      "Aminoglucósidos",
      "Tetraciclinas"
    ],
    correctAnswer: 1,
    explanation: "Se identifican como glucopéptidos, útiles en Gram positivos resistentes."
  },
  {
    id: 8,
    text: "Vancomicina se administra…",
    options: [
      "Siempre por vía oral",
      "Preferentemente IV lenta; no por vía oral salvo indicaciones especiales",
      "Solo IM sin problemas",
      "Solo tópica"
    ],
    correctAnswer: 1,
    explanation: "NO ORAL (salvo colitis), solo IV lenta para reducir toxicidad (Síndrome Hombre Rojo)."
  },
  {
    id: 9,
    text: "Teicoplanina se menciona como…",
    options: [
      "Más tóxica y menos liposoluble",
      "Más liposoluble, mejor penetración y algo menos tóxica que vancomicina",
      "Solo tópica",
      "Macrólido alternativo"
    ],
    correctAnswer: 1,
    explanation: "Se indica mayor liposolubilidad y mejor penetración tisular que vancomicina."
  },
  // Tetraciclinas
  {
    id: 10,
    text: "¿Cuál NO es tetraciclina?",
    options: [
      "Tetraciclina",
      "Doxiciclina",
      "Gentamicina",
      "Minociclina"
    ],
    correctAnswer: 2,
    explanation: "Gentamicina es un aminoglucósido. Las otras son tetraciclinas."
  },
  {
    id: 11,
    text: "Las tetraciclinas actúan…",
    options: [
      "Rompiendo pared celular",
      "Como bacteriostáticos, inhibiendo síntesis proteica",
      "Como bactericidas sobre ADN",
      "Solo como antivirales"
    ],
    correctAnswer: 1,
    explanation: "Se definen como inhibidores de síntesis proteica (subunidad 30S), bacteriostáticos."
  },
  {
    id: 12,
    text: "Respecto a administración IV/IM de tetraciclinas:",
    options: [
      "IM es indolora en cualquier volumen",
      "IM produce dolor intenso; IV debe ir diluida y lenta (>1 h)",
      "No se pueden dar por VO",
      "Son siempre de vida ultracorta"
    ],
    correctAnswer: 1,
    explanation: "Se indica dolor intenso IM y necesidad de perfusión IV lenta en volumen adecuado."
  },
  // Cloranfenicol
  {
    id: 13,
    text: "Cloranfenicol y tianfenicol se describen como…",
    options: [
      "Aminoglucósidos",
      "Derivados del ácido dicloroacético, bacteriostáticos",
      "Betalactámicos",
      "Sulfamidas"
    ],
    correctAnswer: 1,
    explanation: "Se denominan “derivados del ácido dicloroacético”, bacteriostáticos."
  },
  {
    id: 14,
    text: "Cloranfenicol y tianfenicol…",
    options: [
      "Bloquean ADN‑girasa",
      "Se fijan a la subunidad 50S del ribosoma e inhiben síntesis proteica",
      "Rompen la membrana citoplasmática",
      "Aumentan síntesis de ácido fólico"
    ],
    correctAnswer: 1,
    explanation: "Se unen a la subunidad 50S deteniendo la síntesis proteica."
  },
  // Macrólidos
  {
    id: 15,
    text: "¿Cuál es macrólido según el tema?",
    options: [
      "Gentamicina",
      "Vancomicina",
      "Eritromicina (también claritromicina, azitromicina)",
      "Doxiciclina"
    ],
    correctAnswer: 2,
    explanation: "El resumen lista eritromicina y varios derivados (Claritro, Azitro, Espiramicina)."
  },
  {
    id: 16,
    text: "Los macrólidos…",
    options: [
      "Inhiben ADN‑girasa",
      "Se unen a la subunidad 50S del ribosoma e inhiben síntesis de proteínas",
      "Actúan como diuréticos",
      "Rompen la pared celular"
    ],
    correctAnswer: 1,
    explanation: "Comparten diana en la subunidad 50S con otros bacteriostáticos."
  },
  {
    id: 17,
    text: "En pacientes alérgicos a penicilinas, los macrólidos son…",
    options: [
      "Contraindicados",
      "Buena alternativa, poco tóxicos",
      "Obligatorios vía IV",
      "Solo tópicos"
    ],
    correctAnswer: 1,
    explanation: "Se menciona que son buena alternativa en alérgicos a betalactámicos por su seguridad."
  },
  {
    id: 18,
    text: "Según el tema, los macrólidos…",
    options: [
      "Están prohibidos en niños y embarazo",
      "Pueden utilizarse en niños y embarazadas",
      "Solo se usan en neonatos",
      "Solo en mujeres no fértiles"
    ],
    correctAnswer: 1,
    explanation: "Se indica que son seguros y pueden utilizarse en estas poblaciones (a diferencia de tetraciclinas)."
  },
  // Seguridad
  {
    id: 19,
    text: "¿Qué problema especial puede causar neomicina (y aminoglucósidos)?",
    options: [
      "Hipertensión severa",
      "Bloqueo neuromuscular",
      "Psicosis aguda",
      "Trombocitopenia"
    ],
    correctAnswer: 1,
    explanation: "Se menciona que puede producir bloqueo neuromuscular (tipo curare)."
  },
  {
    id: 20,
    text: "Según el texto, el bloqueo neuromuscular por neomicina se trata con…",
    options: [
      "Vitamina K",
      "Calcio y neostigmina",
      "Digoxina",
      "Heparina"
    ],
    correctAnswer: 1,
    explanation: "Se propone Ca²⁺ y neostigmina como tratamiento del bloqueo."
  }
];

const Theme16Quiz: React.FC = () => {
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
      <div className="flex flex-col items-center justify-center h-full bg-purple-900 text-white p-8 overflow-y-auto">
        <h2 className="text-4xl md:text-5xl font-black mb-6 animate-bounce text-center">¡Espectro Cubierto!</h2>
        <div className="bg-white text-purple-900 rounded-3xl p-8 shadow-2xl text-center max-w-md w-full">
          <p className="text-xl mb-2 font-bold">Puntuación Final</p>
          <p className="text-6xl font-black mb-6 text-purple-600">{score}</p>
          <p className="text-gray-600 mb-6 font-medium">
            {score > (QUESTIONS.length * 100 * 0.8) ? "¡Experto en Antibióticos!" : "Cuidado con las resistencias."}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95"
          >
            Volver a Jugar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-100 relative overflow-hidden">
      <div className="bg-purple-700 p-4 flex justify-between items-center shadow-md z-10 text-white">
        <div className="flex items-center space-x-2">
          <span className="bg-purple-800 px-3 py-1 rounded-full font-bold text-sm border border-purple-500">
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
              <button onClick={nextQuestion} className="bg-white text-purple-900 font-black py-3 px-10 rounded-full hover:bg-gray-200 transition-colors shadow-lg transform active:scale-95">
                Siguiente ➔
              </button>
            </div>
            <p className="text-lg text-gray-300 mb-3 font-medium bg-white/10 p-3 rounded-lg border-l-4 border-purple-400">
               💡 {currentQuestion.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Theme16Quiz;