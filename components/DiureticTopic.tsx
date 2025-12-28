import React, { useState } from 'react';
import { GamePhase } from '../types';
import DiureticMap from './DiureticMap';
import DiureticSim from './DiureticSim';
import DiureticQuiz from './DiureticQuiz';
import DiureticGlossary from './DiureticGlossary';

interface Props {
    onBack: () => void;
}

const DiureticTopic: React.FC<Props> = ({ onBack }) => {
  const [phase, setPhase] = useState<GamePhase>(GamePhase.MENU);

  const renderContent = () => {
    switch (phase) {
      case GamePhase.MAP:
        return <DiureticMap />;
      case GamePhase.SIMULATION:
        return <DiureticSim />;
      case GamePhase.QUIZ:
        return <DiureticQuiz />;
      case GamePhase.GLOSSARY:
        return <DiureticGlossary />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto animate-fade-in-up">
            <button onClick={() => setPhase(GamePhase.MAP)} className="p-8 bg-blue-600 text-white rounded-3xl shadow-xl hover:bg-blue-700 transform hover:-translate-y-2 transition-all group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🧠</div>
              <h2 className="text-2xl font-black">Mapa Renal</h2>
              <p className="opacity-90 mt-2">Clasificación: Asa, Tiazidas y Ahorradores.</p>
            </button>

            <button onClick={() => setPhase(GamePhase.SIMULATION)} className="p-8 bg-cyan-600 text-white rounded-3xl shadow-xl hover:bg-cyan-700 transform hover:-translate-y-2 transition-all group">
               <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🔧</div>
              <h2 className="text-2xl font-black">Ingeniero Hidráulico</h2>
              <p className="opacity-90 mt-2">Simulación: Controla edemas y presión.</p>
            </button>

            <button onClick={() => setPhase(GamePhase.QUIZ)} className="p-8 bg-indigo-500 text-white rounded-3xl shadow-xl hover:bg-indigo-600 transform hover:-translate-y-2 transition-all group">
               <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🏆</div>
              <h2 className="text-2xl font-black">Test de Fluidos</h2>
              <p className="opacity-90 mt-2">24 preguntas sobre mecanismos renales.</p>
            </button>

            <button onClick={() => setPhase(GamePhase.GLOSSARY)} className="p-8 bg-sky-500 text-white rounded-3xl shadow-xl hover:bg-sky-600 transform hover:-translate-y-2 transition-all group">
               <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🗣️</div>
              <h2 className="text-2xl font-black">Rimas Hídricas</h2>
              <p className="opacity-90 mt-2">Trabalenguas para memorizar fármacos.</p>
            </button>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Barra de Navegación Interna del Módulo */}
      <div className="mb-4 flex justify-between items-center bg-white/10 p-2 rounded-xl backdrop-blur-sm border border-white/10">
           <h3 className="text-white font-bold px-2 flex items-center gap-2">
             <span>💧</span> Módulo Diuréticos (Tema 10)
           </h3>
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
                className="bg-white text-blue-900 px-4 py-2 rounded-full font-bold shadow-md hover:bg-gray-100 transition-colors text-sm"
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

export default DiureticTopic;