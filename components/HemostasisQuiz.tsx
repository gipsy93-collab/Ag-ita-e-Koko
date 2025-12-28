import React, { useState } from 'react';
import { Question } from '../types';

const QUESTIONS: Question[] = [
  // Antiagregantes
  {
    id: 1,
    text: "¿Qué hace el AAS como antiagregante plaquetario?",
    options: [
      "Activa la COX y sube Tromboxanos",
      "Inhibe irreversiblemente COX y disminuye la formación de Tromboxanos",
      "Solo baja la fiebre",
      "Solo inhibe leucotrienos"
    ],
    correctAnswer: 1,
    explanation: "A dosis bajas inhibe COX plaquetaria y la síntesis de TXA₂, reduciendo la agregación."
  },
  {
    id: 2,
    text: "El AAS como antiagregante se usa típicamente…",
    options: [
      "A dosis altas antiinflamatorias",
      "A dosis bajas específicas para plaquetas",
      "Solo en perfusión continua",
      "Solo por vía intramuscular"
    ],
    correctAnswer: 1,
    explanation: "El tema diferencia dosis bajas antiagregantes de dosis altas antiinflamatorias/analgésicas."
  },
  {
    id: 3,
    text: "Respecto a AAS, triflusal se caracteriza porque…",
    options: [
      "Tiene mayor potencia analgésica",
      "Tiene menos actividad antiinflamatoria y se usa como antiagregante",
      "No actúa sobre COX",
      "Solo sirve como antipirético"
    ],
    correctAnswer: 1,
    explanation: "Se destaca su perfil más antiagregante y menos antiinflamatorio."
  },
  {
    id: 4,
    text: "Ticlopidina y clopidogrel actúan como…",
    options: [
      "Inhibidores de COX",
      "Inhibidores del receptor plaquetario de ADP",
      "Antagonistas de GP IIb/IIIa",
      "Inhibidores de trombina"
    ],
    correctAnswer: 1,
    explanation: "Bloquean la agregación plaquetaria mediada por ADP."
  },
  {
    id: 5,
    text: "Abciximab y tirofibán se clasifican como…",
    options: [
      "Fibrinolíticos",
      "Antiagregantes antagonistas del complejo glucoproteína IIb/IIIa",
      "Heparinas de bajo peso molecular",
      "Anticoagulantes orales"
    ],
    correctAnswer: 1,
    explanation: "Bloquean la unión de fibrinógeno a GP IIb/IIIa, impidiendo la agregación final."
  },
  {
    id: 6,
    text: "¿En qué se basan los antiagregantes Dipiridamol e iloprost?",
    options: [
      "Aumentar calcio intraplaquetario",
      "Aumentar AMPc intraplaquetario y reducir calcio, inhibiendo la agregación",
      "Inhibir vitamina K",
      "Activar trombina"
    ],
    correctAnswer: 1,
    explanation: "El aumento de AMPc se acompaña de disminución de calcio y menor agregación."
  },
  // Heparinas
  {
    id: 7,
    text: "La heparina se considera un…",
    options: [
      "Anticoagulante oral",
      "Inhibidor indirecto de la coagulación que actúa vía antitrombina III",
      "Inhibidor directo de trombina",
      "Fibrinolítico"
    ],
    correctAnswer: 1,
    explanation: "Se une a antitrombina III e inactiva enzimas de la coagulación."
  },
  {
    id: 8,
    text: "¿Cuál es una característica típica de la Heparina No Fraccionada (HNF)?",
    options: [
      "Solo se administra por vía oral",
      "Se administra IV o SC y requiere monitorización del TTPa",
      "No necesita monitorización",
      "No tiene antídoto"
    ],
    correctAnswer: 1,
    explanation: "HNF se usa IV/SC y requiere control del tiempo de tromboplastina parcial activado."
  },
  {
    id: 9,
    text: "En comparación con HNF, las HBPM se caracterizan por…",
    options: [
      "Administrarse SC, tener actividad mayor sobre factor Xa que trombina y no precisar monitorización rutinaria",
      "Siempre necesitar TTPa",
      "No tener efecto sobre factor Xa",
      "No usarse en profilaxis"
    ],
    correctAnswer: 0,
    explanation: "Mayor biodisponibilidad, vida media más larga y perfil más predecible."
  },
  {
    id: 10,
    text: "Las HBPM se utilizan especialmente para…",
    options: [
      "Tratar migrañas",
      "Profilaxis y tratamiento de la enfermedad tromboembólica",
      "Tratar hemorragias agudas",
      "Aumentar la presión arterial"
    ],
    correctAnswer: 1,
    explanation: "Se destacan en la prevención de tromboembolismo."
  },
  {
    id: 11,
    text: "En caso de sobredosis de HNF, el antídoto es…",
    options: [
      "Vitamina K",
      "Sulfato de protamina",
      "Ácido tranexámico",
      "Plasma fresco solo"
    ],
    correctAnswer: 1,
    explanation: "La protamina neutraliza la heparina."
  },
  {
    id: 12,
    text: "La actividad anticoagulante de heparinas (HNF/HBPM) reside…",
    options: [
      "En la vitamina K",
      "En una secuencia pentasacárida específica",
      "Solo en cadenas largas",
      "En el calcio del preparado"
    ],
    correctAnswer: 1,
    explanation: "Esa secuencia es la responsable de la unión a antitrombina III."
  },
  // AVK
  {
    id: 13,
    text: "Acenocumarol y warfarina se clasifican como…",
    options: [
      "Heparinas",
      "Anticoagulantes orales antivitamina K (dicumarínicos)",
      "Fibrinolíticos",
      "Antiagregantes"
    ],
    correctAnswer: 1,
    explanation: "Son antagonistas de vitamina K que bloquean la síntesis de factores dependientes de ella."
  },
  {
    id: 14,
    text: "Los dicumarínicos se utilizan sobre todo en…",
    options: [
      "Emergencias agudas",
      "Situaciones clínicas crónicas, a menudo tras inicio con heparina",
      "Hemorragia aguda",
      "Profilaxis inmediata en urgencias sin heparina"
    ],
    correctAnswer: 1,
    explanation: "Tienen inicio de acción tardío y se usan a largo plazo."
  },
  {
    id: 15,
    text: "El tratamiento con acenocumarol/warfarina requiere…",
    options: [
      "Ningún control",
      "Riguroso control analítico (TP/INR)",
      "Solo control de creatinina",
      "Solo control de glucosa"
    ],
    correctAnswer: 1,
    explanation: "Es imprescindible ajustar dosis según el INR."
  },
  {
    id: 16,
    text: "Dicumarínicos vs heparina:",
    options: [
      "Dicumarínicos vía oral y efecto tardío; heparina parenteral y efecto inmediato",
      "Dicumarínicos IV; heparina oral",
      "Ambos sin monitorización",
      "Ambos con el mismo antídoto"
    ],
    correctAnswer: 0,
    explanation: "Diferencia clara en vía de administración e inicio de acción."
  },
  {
    id: 17,
    text: "Según el tema, el efecto de acenocumarol…",
    options: [
      "Tiene menos persistencia que el de warfarina",
      "Dura más que warfarina",
      "Es idéntico",
      "No se conoce"
    ],
    correctAnswer: 0,
    explanation: "Se menciona que el efecto de acenocumarol es más corto que el de warfarina."
  },
  {
    id: 18,
    text: "El periodo de latencia aproximado de acenocumarol es…",
    options: [
      "Inmediato",
      "24–48 h",
      "5–10 días",
      "1 mes"
    ],
    correctAnswer: 1,
    explanation: "El texto lo sitúa entre 24–48 h."
  },
  {
    id: 19,
    text: "¿Qué ocurre si el paciente toma muchos alimentos ricos en vitamina K con AVK?",
    options: [
      "Aumenta el efecto anticoagulante",
      "Disminuye el efecto anticoagulante",
      "No hay interacción",
      "Produce hipopotasemia"
    ],
    correctAnswer: 1,
    explanation: "La vitamina K compite, disminuyendo el efecto del fármaco."
  },
  {
    id: 20,
    text: "En hemorragias menores por acenocumarol, el antídoto de elección es…",
    options: [
      "Protamina",
      "Vitamina K1 (fitomenadiona)",
      "Ácido tranexámico solo",
      "Uroquinasa"
    ],
    correctAnswer: 1,
    explanation: "La fitomenadiona corrige el efecto de AVK."
  },
  // NACOs
  {
    id: 21,
    text: "Dabigatrán etexilato se describe como…",
    options: [
      "Heparina de bajo peso molecular",
      "Profármaco oral inhibidor directo de la trombina",
      "Inhibidor del factor Xa",
      "Fibrinolítico"
    ],
    correctAnswer: 1,
    explanation: "Es el profármaco de dabigatrán, inhibidor directo de trombina."
  },
  {
    id: 22,
    text: "Sobre los Inhibidores directos de trombina (IDT), ¿qué es correcto?",
    options: [
      "Necesitan antitrombina III como cofactor",
      "Inhiben trombina libre y unida al trombo",
      "Inducen trombocitopenia grave siempre",
      "Son menos eficaces que HBPM por definición"
    ],
    correctAnswer: 1,
    explanation: "No requieren antitrombina y pueden inhibir trombina ligada al coágulo."
  },
  {
    id: 23,
    text: "Desirudina, lepirudina y bivalirudina son…",
    options: [
      "AVK",
      "Derivados parenterales de hirudina, inhibidores directos de trombina",
      "Inhibidores de factor Xa",
      "Fibrinolíticos"
    ],
    correctAnswer: 1,
    explanation: "Se listan como derivados de hirudina por vía parenteral."
  },
  {
    id: 24,
    text: "Rivaroxabán y apixabán son…",
    options: [
      "Dicumarínicos",
      "Anticoagulantes orales inhibidores directos del factor Xa (NACO)",
      "Heparinas",
      "Fibrinolíticos"
    ],
    correctAnswer: 1,
    explanation: "Son nuevos anticoagulantes orales antagonistas directos de Xa."
  },
  // Fibrinólisis
  {
    id: 25,
    text: "¿Qué es la fibrinólisis?",
    options: [
      "La síntesis de fibrina",
      "La degradación de redes de fibrina para evitar trombos excesivos",
      "La formación de plaquetas",
      "La síntesis de trombina"
    ],
    correctAnswer: 1,
    explanation: "Es el proceso fisiológico de degradación de coágulos de fibrina."
  },
  {
    id: 26,
    text: "Estreptocinasa, uroquinasa, anistreplasa y alteplasa son…",
    options: [
      "Activadores de la fibrinólisis (trombolíticos)",
      "Antiagregantes",
      "AVK",
      "Inhibidores de la fibrinólisis"
    ],
    correctAnswer: 0,
    explanation: "Favorecen la conversión de plasminógeno en plasmina y disuelven trombos."
  },
  {
    id: 27,
    text: "Alteplasa (t‑PA) se describe como fármaco que…",
    options: [
      "Inhibe plasmina",
      "Favorece el mecanismo de la fibrinólisis",
      "Sólo estabiliza coágulos",
      "Bloquea trombina"
    ],
    correctAnswer: 1,
    explanation: "Es un activador tisular del plasminógeno, trombolítico."
  },
  {
    id: 28,
    text: "Ácido tranexámico y ácido ε‑aminocaproico se usan como…",
    options: [
      "Trombolíticos",
      "Inhibidores de la fibrinólisis (antihemorrágicos)",
      "Anticoagulantes orales",
      "Antiagregantes"
    ],
    correctAnswer: 1,
    explanation: "Se utilizan para prevenir o tratar hemorragias al frenar la fibrinólisis."
  },
  {
    id: 29,
    text: "Los inhibidores de la fibrinólisis actúan…",
    options: [
      "Activando plasminógeno",
      "Inhibiendo activación o acción de plasmina/plasminógeno, estabilizando coágulos",
      "Degradando fibrina",
      "Aumentando trombina"
    ],
    correctAnswer: 1,
    explanation: "Evitan que se degrade la red de fibrina, favoreciendo la hemostasia."
  },
  {
    id: 30,
    text: "Estos fármacos antifibrinolíticos se utilizan en…",
    options: [
      "Evitar tromboembolismos",
      "Prevención y tratamiento de distintos tipos de hemorragias",
      "Profilaxis de TVP",
      "Rutina en todos los pacientes anticoagulados"
    ],
    correctAnswer: 1,
    explanation: "Son antihemorrágicos indicados cuando el problema es exceso de fibrinólisis o riesgo de sangrado."
  }
];

const HemostasisQuiz: React.FC = () => {
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
      <div className="flex flex-col items-center justify-center h-full bg-rose-900 text-white p-8 overflow-y-auto">
        <h2 className="text-4xl md:text-5xl font-black mb-6 animate-bounce text-center">¡Hemostasia Controlada!</h2>
        <div className="bg-white text-rose-900 rounded-3xl p-8 shadow-2xl text-center max-w-md w-full">
          <p className="text-xl mb-2 font-bold">Puntuación Final</p>
          <p className="text-6xl font-black mb-6 text-rose-600">{score}</p>
          <p className="text-gray-600 mb-6 font-medium">
            {score > (QUESTIONS.length * 100 * 0.8) ? "¡Experto en Coagulación!" : "Revisa la cascada de coagulación."}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95"
          >
            Volver a Jugar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-100 relative overflow-hidden">
      <div className="bg-rose-700 p-4 flex justify-between items-center shadow-md z-10 text-white">
        <div className="flex items-center space-x-2">
          <span className="bg-rose-800 px-3 py-1 rounded-full font-bold text-sm border border-rose-500">
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
              <button onClick={nextQuestion} className="bg-white text-rose-900 font-black py-3 px-10 rounded-full hover:bg-gray-200 transition-colors shadow-lg transform active:scale-95">
                Siguiente ➔
              </button>
            </div>
            <p className="text-lg text-gray-300 mb-3 font-medium bg-white/10 p-3 rounded-lg border-l-4 border-rose-400">
               💡 {currentQuestion.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HemostasisQuiz;