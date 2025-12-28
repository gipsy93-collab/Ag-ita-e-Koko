import React, { useState } from 'react';
import { Question } from '../types';

const QUESTIONS: Question[] = [
  // Antivirales no VIH
  {
    id: 1,
    text: "¿Qué virus entran en el club “Herpesvirus” del tema?",
    options: [
      "Solo herpes simple",
      "Herpes simple, varicela‑zóster, Epstein‑Barr y citomegalovirus",
      "Solo Epstein‑Barr",
      "Solo citomegalovirus"
    ],
    correctAnswer: 1,
    explanation: "El texto menciona VHS, VVZ, VEB y CMV como Herpesvirus relevantes clínicamente."
  },
  {
    id: 2,
    text: "Aciclovir y colegas son especialmente útiles contra…",
    options: [
      "Virus de la rabia",
      "Herpes simple y varicela‑zóster",
      "Gusanos intestinales",
      "Bacterias gram negativas"
    ],
    correctAnswer: 1,
    explanation: "Aciclovir y derivados se emplean sobre todo frente a VHS y VVZ."
  },
  {
    id: 3,
    text: "Valaciclovir y famciclovir se diferencian de aciclovir/penciclovir porque…",
    options: [
      "Son inhalados",
      "Son antibióticos",
      "Son profármacos que se convierten en el fármaco activo en el organismo",
      "Son solo tópicos"
    ],
    correctAnswer: 2,
    explanation: "Valaciclovir es profármaco de aciclovir y famciclovir lo es de penciclovir (mejor biodisponibilidad)."
  },
  {
    id: 4,
    text: "Ganciclovir y valganciclovir se usan sobre todo frente a…",
    options: [
      "Virus de la gripe A",
      "Citomegalovirus (CMV) y otros herpesvirus",
      "Bacterias anaerobias",
      "Hongos dermatofitos"
    ],
    correctAnswer: 1,
    explanation: "Son análogos nucleosídicos potentes usados en infecciones graves por CMV."
  },
  {
    id: 5,
    text: "¿Qué característica comparten aciclovir, ganciclovir, ribavirina y otros antivirales de esta lista?",
    options: [
      "Son todos antiinflamatorios",
      "Son análogos de nucleósidos que inhiben polimerasas víricas",
      "Son todos vacunas",
      "Solo actúan sobre bacterias"
    ],
    correctAnswer: 1,
    explanation: "Se definen como análogos de nucleósidos de ADN/ARN que impiden la replicación al bloquear polimerasas."
  },
  {
    id: 6,
    text: "Ribavirina en el tema se describe como…",
    options: [
      "Antibiótico de amplio espectro",
      "Antiviral que inhibe in vitro virus ADN y ARN (Herpesvirus, Adenovirus, Poxvirus, etc.)",
      "Solo anti‑VHB",
      "Exclusivo para VIH"
    ],
    correctAnswer: 1,
    explanation: "Se menciona su capacidad de inhibir crecimiento de diversos virus ADN y ARN in vitro."
  },
  {
    id: 7,
    text: "Zanamivir y oseltamivir pertenecen al grupo de…",
    options: [
      "Interferones",
      "Antibióticos betalactámicos",
      "Inhibidores de neuraminidasa activos frente a gripe A y B",
      "Betabloqueantes"
    ],
    correctAnswer: 2,
    explanation: "Son inhibidores de neuraminidasa usados contra virus influenza A y B."
  },
  {
    id: 8,
    text: "Según el texto, oseltamivir en plena epidemia de gripe estacional se considera…",
    options: [
      "Completamente inútil",
      "Potencialmente útil en casos sospechosos, aunque no haya evidencias de eficacia en COVID‑19",
      "Solo antihistamínico",
      "Un simple placebo"
    ],
    correctAnswer: 1,
    explanation: "Podría beneficiar a casos sospechosos que resulten ser gripe, aunque no ataque al COVID-19."
  },
  {
    id: 9,
    text: "Amantadina se menciona como antiviral clásico frente a…",
    options: [
      "VIH",
      "Virus influenza (algunos tipos de gripe)",
      "HSV‑2 exclusivamente",
      "Adenovirus únicamente"
    ],
    correctAnswer: 1,
    explanation: "Amantadina es un antiviral histórico frente a ciertos virus de la gripe (bloquea canal M2)."
  },
  {
    id: 10,
    text: "Interferones alfa, beta y gamma en este tema cuentan como…",
    options: [
      "Antidepresivos",
      "Antivirales no VIH con acción inmunomoduladora",
      "Antiagregantes plaquetarios",
      "Diuréticos"
    ],
    correctAnswer: 1,
    explanation: "Se listan dentro de los antivirales no VIH, con efecto inmunomodulador y antiproliferativo."
  },
  // Antirretrovirales
  {
    id: 11,
    text: "Los antirretrovirales se definen como…",
    options: [
      "Antibióticos contra retrobacterias",
      "Antivirales específicos para infecciones por retrovirus como el VIH",
      "Vacunas de ARN",
      "Antifúngicos sistémicos"
    ],
    correctAnswer: 1,
    explanation: "Se usan frente a retrovirus, especialmente el VIH causante del SIDA."
  },
  {
    id: 12,
    text: "Zidovudina (AZT), didanosina, estavudina, lamivudina… forman parte de…",
    options: [
      "Inhibidores de proteasas",
      "Inhibidores de transcriptasa inversa (ITI)",
      "Betabloqueantes",
      "Antiagregantes"
    ],
    correctAnswer: 1,
    explanation: "Se mencionan como ITI: nucleósidos que bloquean la enzima transcriptasa inversa del VIH."
  },
  {
    id: 13,
    text: "Saquinavir, ritonavir, indinavir son…",
    options: [
      "Inhibidores de transcriptasa inversa",
      "Inhibidores de proteasas del VIH",
      "Antiinflamatorios no esteroideos",
      "Benzodiacepinas"
    ],
    correctAnswer: 1,
    explanation: "Son inhibidores de proteasa (IP) que impiden la maduración correcta de los viriones."
  },
  {
    id: 14,
    text: "¿Cómo actúan los inhibidores de proteasa según el texto?",
    options: [
      "Activando la neuraminidasa",
      "Inhibiendo competitivamente proteasas virales, generando viriones no infecciosos",
      "Rompiendo la cápside viral",
      "Aumentando la síntesis de ADN viral"
    ],
    correctAnswer: 1,
    explanation: "Bloquean proteasas que cortan polipéptidos, así que los viriones resultantes son inmaduros y no infecciosos."
  },
  // COVID-19
  {
    id: 15,
    text: "En el contexto de SARS‑CoV‑2, los inhibidores de neuraminidasa (oseltamivir) se describen como…",
    options: [
      "Antídotos definitivos",
      "Tratamientos en estudio sin datos claros de eficacia, útiles sobre todo si el cuadro es gripe",
      "Totalmente prohibidos",
      "Iguales que antibióticos"
    ],
    correctAnswer: 1,
    explanation: "No hay evidencia de eficacia directa en COVID‑19, pero se usan en sospecha de gripe concomitante."
  },
  {
    id: 16,
    text: "Remdesivir, según el texto, se encuentra…",
    options: [
      "Retirado del mercado",
      "En protocolo de investigación clínica para evaluar su eficacia",
      "Solo como jarabe infantil",
      "Solo como uso veterinario"
    ],
    correctAnswer: 1,
    explanation: "El texto indica que se está desarrollando un protocolo de investigación clínica."
  },
  {
    id: 17,
    text: "Lopinavir/ritonavir se citan en COVID‑19 como…",
    options: [
      "Vacuna combinada",
      "Inhibidores de proteasa reutilizados, a veces combinados con interferones",
      "Anticoagulantes",
      "Corticoides inyectables"
    ],
    correctAnswer: 1,
    explanation: "Se mencionan como inhibidores de proteasa (originalmente de VIH) probados experimentalmente en COVID."
  },
  {
    id: 18,
    text: "Sobre la eficacia clínica de lopinavir/ritonavir e interferones en COVID‑19, el texto dice que…",
    options: [
      "Es excelente y definitiva",
      "No se tienen datos concluyentes de eficacia clínica",
      "Es peor que placebo",
      "Solo sirve para niños"
    ],
    correctAnswer: 1,
    explanation: "El texto enfatiza la falta de datos de eficacia clínica en ese momento."
  },
  {
    id: 19,
    text: "Ribavirina y remdesivir se mencionan en COVID‑19 porque…",
    options: [
      "Son mucolíticos",
      "Inhiben in vitro el crecimiento de algunos virus ADN y ARN y podrían ser opción terapéutica",
      "Son antipiréticos",
      "Son vacunas inactivadas"
    ],
    correctAnswer: 1,
    explanation: "Por su mecanismo de acción amplio (inhibición in vitro), se consideraron opciones a estudio."
  },
  {
    id: 20,
    text: "Anticuerpos monoclonales en este tema se presentan como…",
    options: [
      "Solo antitumorales",
      "Potenciales herramientas terapéuticas útiles también en infecciones virales",
      "Únicamente antihistamínicos",
      "Exclusivos de trasplante"
    ],
    correctAnswer: 1,
    explanation: "Se indica que tienen buen valor terapéutico en infecciones virales y podrían ser útiles."
  }
];

const ViralQuiz: React.FC = () => {
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
      <div className="flex flex-col items-center justify-center h-full bg-emerald-900 text-white p-8 overflow-y-auto">
        <h2 className="text-4xl md:text-5xl font-black mb-6 animate-bounce text-center">¡Amenaza Viral Neutralizada!</h2>
        <div className="bg-white text-emerald-900 rounded-3xl p-8 shadow-2xl text-center max-w-md w-full">
          <p className="text-xl mb-2 font-bold">Puntuación Final</p>
          <p className="text-6xl font-black mb-6 text-emerald-600">{score}</p>
          <p className="text-gray-600 mb-6 font-medium">
            {score > (QUESTIONS.length * 100 * 0.8) ? "¡Eres un experto en virología!" : "Revisa el protocolo de contención."}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95"
          >
            Volver a Jugar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-100 relative overflow-hidden">
      <div className="bg-emerald-700 p-4 flex justify-between items-center shadow-md z-10 text-white">
        <div className="flex items-center space-x-2">
          <span className="bg-emerald-800 px-3 py-1 rounded-full font-bold text-sm border border-emerald-500">
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
              <button onClick={nextQuestion} className="bg-white text-emerald-900 font-black py-3 px-10 rounded-full hover:bg-gray-200 transition-colors shadow-lg transform active:scale-95">
                Siguiente ➔
              </button>
            </div>
            <p className="text-lg text-gray-300 mb-3 font-medium bg-white/10 p-3 rounded-lg border-l-4 border-emerald-400">
               💡 {currentQuestion.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViralQuiz;