import React, { useState } from 'react';
import { Question } from '../types';

const QUESTIONS: Question[] = [
  // Vasopresores y vagolíticos
  {
    id: 1,
    text: "¿Cuál es el vasopresor de elección en cualquier ritmo durante una parada cardiaca?",
    options: [
      "Noradrenalina",
      "Dopamina",
      "Adrenalina (epinefrina)",
      "Fenilefrina"
    ],
    correctAnswer: 2,
    explanation: "La adrenalina sigue siendo el vasopresor estándar porque aumenta la perfusión cerebral y coronaria durante la RCP."
  },
  {
    id: 2,
    text: "¿Por qué se siguen usando vasopresores en PCR si no mejoran claramente la supervivencia al alta?",
    options: [
      "Porque salen baratos",
      "Porque mejoran la perfusión cerebral y coronaria a corto plazo",
      "Porque mejoran el ánimo del equipo",
      "Porque no tienen efectos adversos"
    ],
    correctAnswer: 1,
    explanation: "No hay gran evidencia en supervivencia final, pero sí en mejora de perfusión durante la reanimación."
  },
  {
    id: 3,
    text: "Atropina, en este contexto, se clasifica como…",
    options: [
      "Betabloqueante",
      "Fármaco vagolítico (antagonista muscarínico/parasimpaticolítico)",
      "Vasodilatador coronario",
      "Diurético"
    ],
    correctAnswer: 1,
    explanation: "Bloquea receptores muscarínicos, inhibiendo el tono parasimpático (vagal)."
  },
  // Antiarrítmicos en PCR
  {
    id: 4,
    text: "¿Qué antiarrítmico de grupo III se usa en parada cardiaca?",
    options: [
      "Lidocaína",
      "Amiodarona",
      "Adenosina",
      "Sotalol no se menciona aquí"
    ],
    correctAnswer: 1,
    explanation: "Amiodarona (grupo 3) se recomienda en ciertas arritmias durante la PCR (FV/TV sin pulso)."
  },
  {
    id: 5,
    text: "¿A qué subgrupo de antiarrítmicos pertenece la lidocaína en este tema?",
    options: [
      "Grupo Ia",
      "Grupo Ib",
      "Grupo Ic",
      "Grupo II"
    ],
    correctAnswer: 1,
    explanation: "Lidocaína es un antiarrítmico de grupo 1b útil en arritmias ventriculares."
  },
  {
    id: 6,
    text: "Adenosina, en la clasificación simple del tema, aparece como…",
    options: [
      "Betabloqueante clásico",
      "“Otros antiarrítmicos” (ADP/ATP)",
      "Calcioantagonista",
      "Diurético de asa"
    ],
    correctAnswer: 1,
    explanation: "Se encuadra en el grupo de otros antiarrítmicos, útil en taquicardias supraventriculares."
  },
  {
    id: 7,
    text: "¿Qué otro fármaco se menciona como útil en arritmias de PCR además de amiodarona, lidocaína y adenosina?",
    options: [
      "Verapamilo",
      "Digoxina",
      "Sulfato de magnesio",
      "Furosemida"
    ],
    correctAnswer: 2,
    explanation: "El sulfato de magnesio se incluye entre los antiarrítmicos empleados en la parada (Torsade de Pointes)."
  },
  // Cardiotonicos e hiperkalemia
  {
    id: 8,
    text: "¿Qué dos fármacos se nombran como cardiotónicos (inotrópicos positivos) en el tema?",
    options: [
      "Noradrenalina y dopamina",
      "Cloruro de calcio y digoxina",
      "Verapamilo y diltiazem",
      "Amiodarona y lidocaína"
    ],
    correctAnswer: 1,
    explanation: "Se citan cloruro de calcio y el digitálico digoxina como inotrópicos positivos."
  },
  {
    id: 9,
    text: "¿En qué situación se destaca el uso de calcio en el resumen final del tema?",
    options: [
      "Hipocalcemia leve",
      "Hiperpotasemia tóxica",
      "Hipertensión esencial",
      "Insomnio agudo"
    ],
    correctAnswer: 1,
    explanation: "El calcio se señala como esencial en el tratamiento de la hiperpotasemia tóxica para proteger la membrana."
  },
  {
    id: 10,
    text: "¿Para qué se indica el bicarbonato sódico en el contexto de RCP según el resumen?",
    options: [
      "Hipoglucemia",
      "Hipocalcemia",
      "Hiperpotasemia e intoxicación por antidepresivos tricíclicos (ADT)",
      "Hipotensión ortostática"
    ],
    correctAnswer: 2,
    explanation: "El bicarbonato se reserva para hiperpotasemia y ciertas intoxicaciones como por ADT."
  },
  // Naloxona y fluidoterapia
  {
    id: 11,
    text: "Naloxona, en este tema, se presenta como…",
    options: [
      "Agonista opioide parcial",
      "Analgésico potente",
      "Antagonista opioide puro (antídoto de opiáceos)",
      "Anestésico general"
    ],
    correctAnswer: 2,
    explanation: "Se usa para revertir depresión respiratoria por intoxicación de opiáceos."
  },
  {
    id: 12,
    text: "¿En qué contexto se recomienda naloxona durante la RCP?",
    options: [
      "En toda PCR, por si acaso",
      "En depresión respiratoria secundaria a intoxicación por opiáceos",
      "Solo en arritmias ventriculares",
      "En hipovolemia"
    ],
    correctAnswer: 1,
    explanation: "Está indicada cuando la PCR o la depresión respiratoria se relacionan con opiáceos."
  },
  {
    id: 13,
    text: "¿Por qué se recomienda fluidoterapia precoz cuando se sospecha hipovolemia en PCR?",
    options: [
      "Para diluir los fármacos",
      "Porque la hipovolemia es causa reversible de parada y hay que restaurar volumen",
      "Para bajar la glucosa",
      "Para subir la temperatura corporal"
    ],
    correctAnswer: 1,
    explanation: "La hipovolemia es una de las 'H' reversibles de la PCR y requiere aporte rápido de líquidos."
  },
  {
    id: 14,
    text: "¿Qué tipo de solución se debe evitar infundir de rutina en la RCP por empeorar el pronóstico neurológico?",
    options: [
      "Suero salino",
      "Ringer lactato",
      "Glucosa (dextrosa)",
      "Bicarbonato sódico"
    ],
    correctAnswer: 2,
    explanation: "La dextrosa causa hiperglucemia que empeora el pronóstico neurológico tras la isquemia."
  },
  {
    id: 15,
    text: "¿Qué problema puede causar la infusión de exceso de líquidos en ausencia de hipovolemia?",
    options: [
      "Mejora de la perfusión sin límites",
      "Ser perjudicial, empeorando la situación hemodinámica",
      "No tiene ningún efecto",
      "Produce hipoglucemia"
    ],
    correctAnswer: 1,
    explanation: "El volumen excesivo sin hipovolemia puede ser dañino (sobrecarga) en el contexto de RCP."
  },
  // Resumen integrador
  {
    id: 16,
    text: "¿Cuál es el motivo principal de usar adrenalina durante la RCP?",
    options: [
      "Disminuir la frecuencia cardiaca",
      "Su potente acción vasoconstrictora que mejora perfusión cerebral y coronaria",
      "Aumentar la diuresis",
      "Sedar al paciente"
    ],
    correctAnswer: 1,
    explanation: "La vasoconstricción periférica de adrenalina dirige flujo a órganos vitales (cerebro/corazón)."
  },
  {
    id: 17,
    text: "¿Qué fármaco se utiliza específicamente por su efecto vagolítico/parasimpaticolítico en la RCP?",
    options: [
      "Amiodarona",
      "Lidocaína",
      "Atropina",
      "Adenosina"
    ],
    correctAnswer: 2,
    explanation: "Atropina bloquea el parasimpático, útil en ciertas bradicardias sintomáticas."
  },
  {
    id: 18,
    text: "¿Qué cuatro fármacos se listan como antiarrítmicos clave en la parada cardiorrespiratoria?",
    options: [
      "Verapamilo, diltiazem, propranolol, sotalol",
      "Amiodarona, lidocaína, adenosina y sulfato de magnesio",
      "Digoxina, verapamilo, atenolol, nifedipino",
      "Solo amiodarona"
    ],
    correctAnswer: 1,
    explanation: "El resumen nombra explícitamente Amiodarona, Lidocaína, Adenosina y Magnesio como antiarrítmicos en la PCR."
  }
];

const CPRQuiz: React.FC = () => {
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
      <div className="flex flex-col items-center justify-center h-full bg-red-900 text-white p-8 overflow-y-auto">
        <h2 className="text-4xl md:text-5xl font-black mb-6 animate-bounce text-center">¡Código Rojo Despejado!</h2>
        <div className="bg-white text-red-900 rounded-3xl p-8 shadow-2xl text-center max-w-md w-full">
          <p className="text-xl mb-2 font-bold">Puntuación Final</p>
          <p className="text-6xl font-black mb-6 text-red-600">{score}</p>
          <p className="text-gray-600 mb-6 font-medium">
            {score > (QUESTIONS.length * 100 * 0.8) ? "¡Has salvado al paciente!" : "Necesitas repasar el protocolo de RCP."}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95"
          >
            Volver a Jugar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-100 relative overflow-hidden">
      <div className="bg-red-700 p-4 flex justify-between items-center shadow-md z-10 text-white">
        <div className="flex items-center space-x-2">
          <span className="bg-red-800 px-3 py-1 rounded-full font-bold text-sm border border-red-500">
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
              <button onClick={nextQuestion} className="bg-white text-red-900 font-black py-3 px-10 rounded-full hover:bg-gray-200 transition-colors shadow-lg transform active:scale-95">
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

export default CPRQuiz;