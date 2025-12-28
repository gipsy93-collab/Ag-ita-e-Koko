import React, { useState } from 'react';
import { Question } from '../types';

const QUESTIONS: Question[] = [
  // Quinolonas
  {
    id: 1,
    text: "Las quinolonas son antibióticos de…",
    options: [
      "Origen vegetal",
      "Origen sintético",
      "Origen marino",
      "Origen lácteo"
    ],
    correctAnswer: 1,
    explanation: "El tema indica expresamente que son ATB de origen sintético."
  },
  {
    id: 2,
    text: "¿Quién pertenece a la 1ª generación de quinolonas?",
    options: [
      "Ciprofloxacino",
      "Ácido nalidíxico y ácido pipemídico",
      "Levofloxacino",
      "Norfloxacino"
    ],
    correctAnswer: 1,
    explanation: "Se nombran como representantes de la primera generación."
  },
  {
    id: 3,
    text: "Un ejemplo de fluoroquinolona de amplio espectro es…",
    options: [
      "Penicilina G",
      "Sulfametoxazol",
      "Ciprofloxacino (también norfloxacino y otras)",
      "Nitrofurantoína"
    ],
    correctAnswer: 2,
    explanation: "Norfloxacino y ciprofloxacino se citan como fluoroquinolonas."
  },
  {
    id: 4,
    text: "Las quinolonas ejercen su efecto bactericida principalmente por…",
    options: [
      "Inhibir la síntesis de folato",
      "Inhibir ADN‑girasa / topoisomerasa II bacteriana",
      "Bloquear ribosomas 50S",
      "Romper la pared celular"
    ],
    correctAnswer: 1,
    explanation: "El tema subraya la inhibición de ADN‑girasa/topoisomerasa II."
  },
  {
    id: 5,
    text: "Las fluoroquinolonas se caracterizan por…",
    options: [
      "Ser solo bacteriostáticas",
      "Ser bactericidas con amplio espectro y buena actividad frente a Pseudomonas",
      "Ser exclusivamente para Gram positivos",
      "No absorberse por vía oral"
    ],
    correctAnswer: 1,
    explanation: "Son bactericidas, de amplio espectro y útiles frente a bacterias resistentes, incluidas Pseudomonas."
  },
  {
    id: 6,
    text: "Las quinolonas se administran habitualmente…",
    options: [
      "Solo IV",
      "Vía oral y parenteral, con buena biodisponibilidad oral",
      "Solo tópicas",
      "Solo intramuscular"
    ],
    correctAnswer: 1,
    explanation: "El resumen indica buena absorción oral y posibilidad de administración parenteral."
  },
  {
    id: 7,
    text: "Una característica destacada de las fluoroquinolonas es…",
    options: [
      "No pasan la barrera hematoencefálica",
      "Buena absorción VO y posible toxicidad articular",
      "Solo actúan en la piel",
      "Dependen de la vitamina K"
    ],
    correctAnswer: 1,
    explanation: "Se menciona buena biodisponibilidad y toxicidad articular como efecto adverso relevante."
  },
  // Sulfamidas
  {
    id: 8,
    text: "Las sulfamidas actúan…",
    options: [
      "Estimulando la síntesis de ácido fólico",
      "Inhibiendo la síntesis de ácido fólico bacteriano (efecto bacteriostático)",
      "Inhibiendo la ADN‑girasa",
      "Solo rompiendo la membrana"
    ],
    correctAnswer: 1,
    explanation: "Son antimetabolitos del ácido fólico con efecto bacteriostático."
  },
  {
    id: 9,
    text: "¿Cuál es una sulfamida sistémica?",
    options: [
      "Sulfadiazina argéntica tópica",
      "Sulfadiazina, sulfametoxazol, sulfadoxina",
      "Sulfasalazina solo intestinal",
      "Almagato"
    ],
    correctAnswer: 1,
    explanation: "El tema distingue sistémicas (vía oral/IV) y no sistémicas."
  },
  {
    id: 10,
    text: "Sulfasalazina se describe como…",
    options: [
      "Sistémica IV",
      "Insoluble, no sistémica, de acción local intestinal (E. Crohn, colitis ulcerosa)",
      "Fármaco tópico para quemaduras",
      "Antiviral"
    ],
    correctAnswer: 1,
    explanation: "Se administra por vía oral pero no pasa a sangre, actuando a nivel intestinal."
  },
  {
    id: 11,
    text: "Sulfadiazina argéntica se utiliza principalmente…",
    options: [
      "Por vía oral para neumonía",
      "Como tópico dermatológico en quemaduras de 2º grado",
      "Solo para faringitis",
      "Para diarrea del viajero"
    ],
    correctAnswer: 1,
    explanation: "Se usa en pomada/crema para prevenir infecciones en quemaduras."
  },
  {
    id: 12,
    text: "Cotrimoxazol es la combinación de…",
    options: [
      "Dos quinolonas",
      "Sulfametoxazol (sulfamida) + trimetoprim",
      "Amoxicilina + ácido clavulánico",
      "Nitrofurantoína + ciprofloxacino"
    ],
    correctAnswer: 1,
    explanation: "Se detalla como sulfamida + antimetabolito del folato."
  },
  {
    id: 13,
    text: "Cotrimoxazol se considera…",
    options: [
      "Solo bacteriostático",
      "Sinérgico, con efecto bactericida al asociar sulfamida y trimetoprim",
      "Solo antivírico",
      "Solo antifúngico"
    ],
    correctAnswer: 1,
    explanation: "Separados son bacteriostáticos, juntos logran efecto bactericida."
  },
  {
    id: 14,
    text: "Un efecto adverso importante de sulfamidas/cotrimoxazol es…",
    options: [
      "Hipertensión",
      "Depresión de médula ósea y metahemoglobinemia (cianosis)",
      "Miopía aguda",
      "Hipertiroidismo"
    ],
    correctAnswer: 1,
    explanation: "Se citan depresión medular y conversión de Hb en meta‑Hb."
  },
  {
    id: 15,
    text: "Según el texto, la administración de sulfamidas en embarazo…",
    options: [
      "Es totalmente segura",
      "Debe evitarse",
      "Es obligatoria en el tercer trimestre",
      "Depende solo del peso"
    ],
    correctAnswer: 1,
    explanation: "Se indica que debe evitarse en gestantes."
  },
  // Nitrofurantoína
  {
    id: 16,
    text: "Nitrofurantoína actúa…",
    options: [
      "Solo como inhibidor de folato",
      "Inhibiendo diversos sistemas enzimáticos bacterianos (bacteriostático o bactericida según dosis)",
      "Solo como antiácido",
      "Solo rompiendo la pared"
    ],
    correctAnswer: 1,
    explanation: "Interfiere en múltiples enzimas bacterianas; a bajas dosis es bacteriostático y a altas bactericida."
  },
  {
    id: 17,
    text: "Este fármaco (nitrofurantoína) se utiliza sobre todo en…",
    options: [
      "Neumonía grave",
      "Infecciones urinarias no complicadas por E. coli",
      "Meningitis",
      "Endocarditis bacteriana"
    ],
    correctAnswer: 1,
    explanation: "El resumen la sitúa como alternativa para ITU no complicadas."
  },
  {
    id: 18,
    text: "Nitrofurantoína es activa frente a…",
    options: [
      "Solo Gram positivos",
      "Solo Gram negativos",
      "Muchas bacterias Gram positivas y Gram negativas",
      "Solo anaerobios estrictos"
    ],
    correctAnswer: 2,
    explanation: "Se destaca su actividad frente a la mayoría de Gram + y Gram − involucrados en ITU."
  },
  {
    id: 19,
    text: "Además de tratamiento agudo, la nitrofurantoína se usa…",
    options: [
      "Para tratar gripe",
      "Con fines preventivos y de supresión a largo plazo en ITU recurrentes",
      "Solo como profilaxis quirúrgica abdominal",
      "Exclusivamente en quemaduras"
    ],
    correctAnswer: 1,
    explanation: "Se menciona su uso profiláctico y en supresión prolongada."
  },
  {
    id: 20,
    text: "Según el resumen, ¿cuál es bacteriostático “clásico”?",
    options: [
      "Quinolonas",
      "Tetraciclinas, cloranfenicol, macrólidos, sulfamidas, trimetoprim, lincosaminas",
      "Aminoglucósidos",
      "Betalactámicos"
    ],
    correctAnswer: 1,
    explanation: "El tema los lista como bacteriostáticos que requieren la ayuda del sistema inmune."
  }
];

const SyntheticsQuiz: React.FC = () => {
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
      <div className="flex flex-col items-center justify-center h-full bg-amber-900 text-white p-8 overflow-y-auto">
        <h2 className="text-4xl md:text-5xl font-black mb-6 animate-bounce text-center">¡Laboratorio Completado!</h2>
        <div className="bg-white text-amber-900 rounded-3xl p-8 shadow-2xl text-center max-w-md w-full">
          <p className="text-xl mb-2 font-bold">Puntuación Final</p>
          <p className="text-6xl font-black mb-6 text-amber-600">{score}</p>
          <p className="text-gray-600 mb-6 font-medium">
            {score > (QUESTIONS.length * 100 * 0.8) ? "¡Eres un alquimista experto!" : "Revisa las fórmulas químicas."}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95"
          >
            Volver a Jugar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-100 relative overflow-hidden">
      <div className="bg-amber-700 p-4 flex justify-between items-center shadow-md z-10 text-white">
        <div className="flex items-center space-x-2">
          <span className="bg-amber-800 px-3 py-1 rounded-full font-bold text-sm border border-amber-500">
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
              <button onClick={nextQuestion} className="bg-white text-amber-900 font-black py-3 px-10 rounded-full hover:bg-gray-200 transition-colors shadow-lg transform active:scale-95">
                Siguiente ➔
              </button>
            </div>
            <p className="text-lg text-gray-300 mb-3 font-medium bg-white/10 p-3 rounded-lg border-l-4 border-amber-400">
               💡 {currentQuestion.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SyntheticsQuiz;