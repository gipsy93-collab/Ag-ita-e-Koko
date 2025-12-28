import React, { useState } from 'react';
import { GamePhase } from '../types';
import ConceptMap from './ConceptMap';
import Simulation from './Simulation';
import Quiz from './Quiz';
import Glossary from './Glossary';
import CardioInfographic from './CardioInfographic';

interface Props {
    onBack: () => void;
}

const CardioTopic: React.FC<Props> = ({ onBack }) => {
  const [phase, setPhase] = useState<GamePhase>(GamePhase.MENU);

  const renderContent = () => {
    switch (phase) {
      case GamePhase.MAP:
        return <ConceptMap />;
      case GamePhase.SIMULATION:
        return <Simulation />;
      case GamePhase.QUIZ:
        return <Quiz />;
      case GamePhase.GLOSSARY:
        return <Glossary />;
      case GamePhase.INFOGRAPHIC:
        return <CardioInfographic />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto animate-fade-in-up">
            <button onClick={() => setPhase(GamePhase.MAP)} className="p-8 bg-red-500 text-white rounded-3xl shadow-xl hover:bg-red-600 transform hover:-translate-y-2 transition-all group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🧠</div>
              <h2 className="text-2xl font-black">Mapa Mental Pareto</h2>
              <p className="opacity-90 mt-2">Entiende el 80% del tema en el 20% del tiempo.</p>
            </button>

            <button onClick={() => setPhase(GamePhase.INFOGRAPHIC)} className="p-8 bg-purple-600 text-white rounded-3xl shadow-xl hover:bg-purple-700 transform hover:-translate-y-2 transition-all group">
               <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📊</div>
              <h2 className="text-2xl font-black">Guía Rápida</h2>
              <p className="opacity-90 mt-2">Infografía visual de grupos farmacológicos.</p>
            </button>

            <button onClick={() => setPhase(GamePhase.SIMULATION)} className="p-8 bg-blue-500 text-white rounded-3xl shadow-xl hover:bg-blue-600 transform hover:-translate-y-2 transition-all group">
               <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">💉</div>
              <h2 className="text-2xl font-black">Simulación Clínica</h2>
              <p className="opacity-90 mt-2">Aplica fármacos a un paciente virtual.</p>
            </button>

            <button onClick={() => setPhase(GamePhase.QUIZ)} className="p-8 bg-green-500 text-white rounded-3xl shadow-xl hover:bg-green-600 transform hover:-translate-y-2 transition-all group">
               <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🏆</div>
              <h2 className="text-2xl font-black">Autoevaluación</h2>
              <p className="opacity-90 mt-2">Test gamificado para probar tu conocimiento.</p>
            </button>

            <button onClick={() => setPhase(GamePhase.GLOSSARY)} className="p-8 bg-pink-500 text-white rounded-3xl shadow-xl hover:bg-pink-600 transform hover:-translate-y-2 transition-all group md:col-span-2">
               <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🗣️</div>
              <h2 className="text-2xl font-black">Trabalenguas</h2>
              <p className="opacity-90 mt-2">Glosario divertido para memorizar fármacos.</p>
            </button>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Barra de Navegación Interna del Módulo */}
      <div className="mb-4 flex justify-between items-center bg-white/10 p-2 rounded-xl backdrop-blur-sm border border-white/10">
           <h3 className="text-white font-bold px-2">🫀 Módulo Cardiovascular</h3>
           <div className="flex gap-2">
            {phase !== GamePhase.MENU && (
                <button 
                    onClick={() => setPhase(GamePhase.MENU)}
                    className="bg-white/20 text-white px-4 py-2 rounded-full font-bold hover:bg-white/30 transition-colors text-sm"
                >
                    Menú Tema
                </button>
            )}
            <button 
                onClick={onBack}
                className="bg-white text-purple-700 px-4 py-2 rounded-full font-bold shadow-md hover:bg-gray-100 transition-colors text-sm"
            >
                ⬅ Inicio App
            </button>
           </div>
      </div>
      
      <div className="flex-1 overflow-hidden rounded-3xl relative">
        {renderContent()}
      </div>
    </div>
  );
};

export default CardioTopic;