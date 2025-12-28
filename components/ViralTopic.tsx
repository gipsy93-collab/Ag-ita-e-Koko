import React, { useState } from 'react';
import { GamePhase } from '../types';
import ViralMap from './ViralMap';
import ViralSim from './ViralSim';
import ViralQuiz from './ViralQuiz';
import ViralGlossary from './ViralGlossary';

interface Props {
    onBack: () => void;
}

const ViralTopic: React.FC<Props> = ({ onBack }) => {
  const [phase, setPhase] = useState<GamePhase>(GamePhase.MENU);

  const renderContent = () => {
    switch (phase) {
      case GamePhase.MAP:
        return <ViralMap />;
      case GamePhase.SIMULATION:
        return <ViralSim />;
      case GamePhase.QUIZ:
        return <ViralQuiz />;
      case GamePhase.GLOSSARY:
        return <ViralGlossary />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto animate-fade-in-up">
            <button onClick={() => setPhase(GamePhase.MAP)} className="p-8 bg-emerald-600 text-white rounded-3xl shadow-xl hover:bg-emerald-700 transform hover:-translate-y-2 transition-all group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🧠</div>
              <h2 className="text-2xl font-black">Mapa Viral</h2>
              <p className="opacity-90 mt-2">Clasificación: Herpes, VIH y COVID-19.</p>
            </button>

            <button onClick={() => setPhase(GamePhase.SIMULATION)} className="p-8 bg-lime-600 text-white rounded-3xl shadow-xl hover:bg-lime-700 transform hover:-translate-y-2 transition-all group">
               <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">☣️</div>
              <h2 className="text-2xl font-black">Cazadores</h2>
              <p className="opacity-90 mt-2">Simulación: Identifica y trata el virus.</p>
            </button>

            <button onClick={() => setPhase(GamePhase.QUIZ)} className="p-8 bg-teal-500 text-white rounded-3xl shadow-xl hover:bg-teal-600 transform hover:-translate-y-2 transition-all group">
               <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🏆</div>
              <h2 className="text-2xl font-black">Test Virología</h2>
              <p className="opacity-90 mt-2">20 preguntas sobre antivirales.</p>
            </button>

            <button onClick={() => setPhase(GamePhase.GLOSSARY)} className="p-8 bg-green-500 text-white rounded-3xl shadow-xl hover:bg-green-600 transform hover:-translate-y-2 transition-all group">
               <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🗣️</div>
              <h2 className="text-2xl font-black">Rimas Tóxicas</h2>
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
             <span>☣️</span> Módulo Antivíricos (Tema 17)
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
                className="bg-white text-emerald-900 px-4 py-2 rounded-full font-bold shadow-md hover:bg-gray-100 transition-colors text-sm"
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

export default ViralTopic;