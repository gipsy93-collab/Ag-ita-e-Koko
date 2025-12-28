import React, { useState } from 'react';
import { Question } from '../types';

const QUESTIONS: Question[] = [
  // Conceptos y clasificación general
  {
    id: 1,
    text: "¿Qué hacen en realidad los diuréticos?",
    options: [
      "Actúan directamente sobre el agua “empujándola” hacia fuera",
      "Actúan sobre el transporte de iones en la nefrona, aumentando la eliminación de agua y sales",
      "Solo cambian el color de la orina",
      "Solo suben la presión arterial"
    ],
    correctAnswer: 1,
    explanation: "No “mueven agua” por magia, sino que modifican la reabsorción tubular de sodio y otros iones."
  },
  {
    id: 2,
    text: "¿En qué partes de la nefrona pueden actuar los diuréticos?",
    options: [
      "Solo en el glomérulo",
      "Túbulo proximal, asa de Henle, túbulo distal y colector",
      "Solo en la vejiga",
      "Solo en la arteria renal"
    ],
    correctAnswer: 1,
    explanation: "Cada grupo de diuréticos tiene su segmento diana dentro de la nefrona."
  },
  {
    id: 3,
    text: "¿Cómo se clasifican los diuréticos en este tema?",
    options: [
      "Por color de comprimido",
      "Por potencia (máxima, media, ligera) y segmento de acción",
      "Por sabor",
      "Por vía de administración únicamente"
    ],
    correctAnswer: 1,
    explanation: "Se habla de diuréticos de máxima eficacia (asa), media (tiazidas) y ligera (ahorradores K⁺, osmóticos, etc.)."
  },
  // Diuréticos de máxima eficacia (del asa)
  {
    id: 4,
    text: "¿Cuáles son los diuréticos “del asa” de máxima eficacia?",
    options: [
      "Hidroclorotiazida, clortalidona, indapamida",
      "Furosemida, ácido etacrínico y torasemida",
      "Espironolactona, amilorida",
      "Manitol, isosorbida"
    ],
    correctAnswer: 1,
    explanation: "Son los diuréticos de máxima potencia, actuando en el asa de Henle."
  },
  {
    id: 5,
    text: "Mecanismo estrella de los diuréticos del asa:",
    options: [
      "Activan la bomba de sodio",
      "Inhiben la reabsorción de NaCl (Cl⁻/Na⁺) en el asa de Henle",
      "Solo cambian el pH de la orina",
      "Bloquean la aldosterona"
    ],
    correctAnswer: 1,
    explanation: "Inhiben el cotransporte Na⁺/K⁺/2Cl⁻ en el asa ascendente gruesa."
  },
  {
    id: 6,
    text: "Uso típico de los diuréticos de máxima eficacia:",
    options: [
      "Tratar el insomnio",
      "Tratamiento de la insuficiencia cardiaca y edemas importantes",
      "Aumentar el apetito",
      "Tratar alergias"
    ],
    correctAnswer: 1,
    explanation: "Son clave para reducir sobrecarga de volumen, por ejemplo en IC."
  },
  // Diuréticos de eficacia media (tiazidas)
  {
    id: 7,
    text: "¿Qué grupo corresponde a los diuréticos de eficacia media (“tiazidas”)?",
    options: [
      "Furosemida, torasemida",
      "Hidroclorotiazida, clortalidona, indapamida",
      "Espironolactona, triamtereno",
      "Manitol, isosorbida"
    ],
    correctAnswer: 1,
    explanation: "Se citan como tiazidas o similares de eficacia media/mediana."
  },
  {
    id: 8,
    text: "¿Dónde actúan principalmente las tiazidas?",
    options: [
      "Asa de Henle descendente",
      "Segmentos diluyentes del túbulo contorneado distal",
      "Túbulo colector final",
      "Solo en el glomérulo"
    ],
    correctAnswer: 1,
    explanation: "Se indica que actúan en los segmentos diluyentes del túbulo distal."
  },
  {
    id: 9,
    text: "Indicación frecuente de tiazidas:",
    options: [
      "Asma agudo",
      "Hipertensión y edemas moderados",
      "Migraña aguda",
      "Insuficiencia hepática aguda"
    ],
    correctAnswer: 1,
    explanation: "Por su potencia media y duración, se usan mucho en HTA y edemas menos severos."
  },
  // Diuréticos de eficacia ligera
  {
    id: 10,
    text: "Los diuréticos de eficacia ligera se suelen usar…",
    options: [
      "Siempre solos",
      "Asociados a otros para potenciar efecto y reducir pérdida de potasio",
      "Solo como placebo",
      "Solo en pediatría"
    ],
    correctAnswer: 1,
    explanation: "Se emplean en combinación para evitar hipopotasemia causada por los potentes."
  },
  {
    id: 11,
    text: "¿Dónde actúan los diuréticos ahorradores de potasio?",
    options: [
      "Glomérulo",
      "Último tramo del túbulo distal y tramo inicial del colector",
      "Asa descendente de Henle",
      "Arteriola eferente"
    ],
    correctAnswer: 1,
    explanation: "Esa es su localización diana en la nefrona (Túbulo Colector)."
  },
  {
    id: 12,
    text: "Espironolactona se clasifica como…",
    options: [
      "Diurético osmótico",
      "Antagonista de la aldosterona",
      "Tiazida",
      "Inhibidor de anhidrasa carbónica"
    ],
    correctAnswer: 1,
    explanation: "Bloquea los receptores de aldosterona, reduciendo reabsorción de Na⁺ y pérdida de K⁺."
  },
  {
    id: 13,
    text: "Triamtereno y amilorida son…",
    options: [
      "Antagonistas de aldosterona",
      "Bloqueadores de canales de sodio en TCD/TC",
      "Betabloqueantes",
      "Diuréticos osmóticos"
    ],
    correctAnswer: 1,
    explanation: "Inhiben la entrada de Na⁺ por los canales luminales (ENaC), reduciendo la secreción de K⁺."
  },
  {
    id: 14,
    text: "Sobre el potasio, los ahorradores de K⁺ se caracterizan por…",
    options: [
      "Producir siempre hipopotasemia grave",
      "No producir hipopotasemia; incluso pueden dar hiperpotasemia",
      "Inactivar el potasio plasmático",
      "Aumentar el calcio en orina"
    ],
    correctAnswer: 1,
    explanation: "El texto resalta que estos diuréticos no producen hipopotasemia, es su principal ventaja."
  },
  // Inhibidores de anhidrasa carbónica
  {
    id: 15,
    text: "Acetazolamida se clasifica como…",
    options: [
      "Diurético del asa",
      "Tiazida",
      "Inhibidor de la anhidrasa carbónica",
      "Diurético osmótico"
    ],
    correctAnswer: 2,
    explanation: "Inhibe la anhidrasa carbónica (AC), bloqueando la reabsorción de bicarbonato sódico."
  },
  {
    id: 16,
    text: "Mecanismo clave de acetazolamida:",
    options: [
      "Bloquear aldosterona",
      "Inhibir la AC e impedir la reabsorción de bicarbonato sódico",
      "Aumentar reabsorción de NaCl",
      "Solo cambiar el pH sanguíneo sin pasar por el riñón"
    ],
    correctAnswer: 1,
    explanation: "Al bloquear AC, se pierde bicarbonato y sodio, aumentando la diuresis y alcalinizando la orina."
  },
  // Diuréticos osmóticos
  {
    id: 17,
    text: "¿Qué caracteriza a los diuréticos osmóticos como manitol e isosorbida?",
    options: [
      "Son hormonas proteicas",
      "Son moléculas de bajo peso molecular filtradas pero no reabsorbidas",
      "Son tiazidas de nueva generación",
      "Son antagonistas de aldosterona"
    ],
    correctAnswer: 1,
    explanation: "Aumentan la presión osmótica del filtrado tubular, arrastrando agua."
  },
  {
    id: 18,
    text: "Vía de administración típica del manitol y la isosorbida según el tema:",
    options: [
      "Oral",
      "Intravenosa",
      "Intranasal",
      "Tópica"
    ],
    correctAnswer: 1,
    explanation: "Se especifica que se administran por vía IV para efecto sistémico."
  },
  {
    id: 19,
    text: "¿Son farmacológicamente inertes los diuréticos osmóticos?",
    options: [
      "Siempre activos sobre receptores",
      "Se consideran farmacológicamente inertes; su efecto es osmótico",
      "Solo actúan sobre receptores beta",
      "Son antagonistas de calcio"
    ],
    correctAnswer: 1,
    explanation: "El texto subraya que son inertes y actúan solo aumentando la osmolaridad."
  },
  {
    id: 20,
    text: "Definición práctica de diurético osmótico en el texto:",
    options: [
      "Fármaco que baja el pH urinario",
      "Inhibe reabsorción de agua y sodio, aumenta osmolaridad de sangre y filtrado renal",
      "Solo aumenta el potasio urinario",
      "Solo cambia el color de la orina"
    ],
    correctAnswer: 1,
    explanation: "Su mecanismo se basa en aumentar osmolaridad plasmática y tubular, arrastrando agua."
  },
  // Mix
  {
    id: 21,
    text: "¿Dónde NO actúa la furosemida principalmente?",
    options: [
      "Asa de Henle",
      "Túbulo contorneado distal como tiazida clásica",
      "En el asa ascendente gruesa",
      "En pacientes con IC"
    ],
    correctAnswer: 1,
    explanation: "Furosemida es de máxima eficacia (asa), no de mediana eficacia (distal)."
  },
  {
    id: 22,
    text: "La clortalidona es…",
    options: [
      "Diurético del asa",
      "Diurético de eficacia media (tiazida/símil tiazida)",
      "Diurético osmótico",
      "Antagonista de aldosterona"
    ],
    correctAnswer: 1,
    explanation: "Se incluye entre los diuréticos de mediana eficacia junto a hidroclorotiazida."
  },
  {
    id: 23,
    text: "Sobre la insuficiencia renal crónica y los diuréticos del asa:",
    options: [
      "No se pueden usar nunca",
      "Pueden usarse; son útiles incluso con FG bajo",
      "Solo se usa acetazolamida",
      "Solo manitol"
    ],
    correctAnswer: 1,
    explanation: "Los diuréticos de asa siguen siendo efectivos incluso cuando el filtrado glomerular cae."
  },
  {
    id: 24,
    text: "La amilorida es…",
    options: [
      "Antagonista de aldosterona",
      "Bloqueador de canales de sodio ahorrador de potasio",
      "Tiazida",
      "Inhibidor de AC"
    ],
    correctAnswer: 1,
    explanation: "Amilorida y triamtereno bloquean canales de Na⁺ en el TCD/TC sin depender de aldosterona."
  }
];

const DiureticQuiz: React.FC = () => {
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
        <h2 className="text-4xl md:text-5xl font-black mb-6 animate-bounce text-center">¡Control de Fluidos Completado!</h2>
        <div className="bg-white text-blue-900 rounded-3xl p-8 shadow-2xl text-center max-w-md w-full">
          <p className="text-xl mb-2 font-bold">Puntuación Final</p>
          <p className="text-6xl font-black mb-6 text-blue-600">{score}</p>
          <p className="text-gray-600 mb-6 font-medium">
            {score > (QUESTIONS.length * 100 * 0.8) ? "¡Riñón funcionando al 100%!" : "Necesitas revisar la nefrona."}
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
      <div className="bg-blue-700 p-4 flex justify-between items-center shadow-md z-10 text-white">
        <div className="flex items-center space-x-2">
          <span className="bg-blue-800 px-3 py-1 rounded-full font-bold text-sm border border-blue-500">
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
            <p className="text-lg text-gray-300 mb-3 font-medium bg-white/10 p-3 rounded-lg border-l-4 border-blue-400">
               💡 {currentQuestion.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiureticQuiz;