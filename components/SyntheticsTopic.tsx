import React, { useState } from 'react';
import { GamePhase } from '../types';
import SyntheticsMap from './SyntheticsMap';
import SyntheticsSim from './SyntheticsSim';
import SyntheticsQuiz from './SyntheticsQuiz';
import SyntheticsGlossary from './SyntheticsGlossary';

interface Props {
    onBack: () => void;
}

const SyntheticsTopic: React.FC<Props> = ({ onBack }) => {
  const [phase, setPhase] = useState<GamePhase>(GamePhase.MENU);

  const renderContent = () => {
    switch (phase) {
      case GamePhase.MAP:
        return <SyntheticsMap />;
      case GamePhase.SIMULATION:
        return <SyntheticsSim />;
      case GamePhase.QUIZ:
        return <SyntheticsQuiz />;
      case GamePhase.GLOSSARY:
        return <SyntheticsGlossary />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto animate-fade-in-up">
            <button onClick={() => setPhase(GamePhase.MAP)} className="p-8 bg-amber-600 text-white rounded-3xl shadow-xl hover:bg-amber-700 transform hover:-translate-y-2 transition-all group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🧠</div>
              <h2 className="text-2xl font-black">Mapa Sintético</h2>
              <p className="opacity-90 mt-2">Quinolonas, Sulfamidas y Nitrofurantoína.</p>
            </button>

            <button onClick={() => setPhase(GamePhase.SIMULATION)} className="p-8 bg-orange-500 text-white rounded-3xl shadow-xl hover:bg-orange-600 transform hover:-translate-y-2 transition-all group">
               <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">⚗️</div>
              <h2 className="text-2xl font-black">Laboratorio</h2>
              <p className="opacity-90 mt-2">Simulación: Elige el compuesto exacto.</p>
            </button>

            <button onClick={() => setPhase(GamePhase.QUIZ)} className="p-8 bg-yellow-500 text-white rounded-3xl shadow-xl hover:bg-yellow-600 transform hover:-translate-y-2 transition-all group">
               <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🏆</div>
              <h2 className="text-2xl font-black">Test Químico</h2>
              <p className="opacity-90 mt-2">20 preguntas de antibióticos sintéticos.</p>
            </button>

            <button onClick={() => setPhase(GamePhase.GLOSSARY)} className="p-8 bg-amber-800 text-white rounded-3xl shadow-xl hover:bg-amber-900 transform hover:-translate-y-2 transition-all group">
               <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🗣️</div>
              <h2 className="text-2xl font-black">Rimas Artificiales</h2>
              <p className="opacity-90 mt-2">Trabalenguas para memorizar.</p>
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
             <span>⚗️</span> Módulo Sintéticos (Tema 15)
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
                className="bg-white text-amber-900 px-4 py-2 rounded-full font-bold shadow-md hover:bg-gray-100 transition-colors text-sm"
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

export default SyntheticsTopic;