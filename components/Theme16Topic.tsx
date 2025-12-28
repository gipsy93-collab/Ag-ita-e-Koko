import React, { useState } from 'react';
import { GamePhase } from '../types';
import Theme16Map from './Theme16Map';
import Theme16Sim from './Theme16Sim';
import Theme16Quiz from './Theme16Quiz';
import Theme16Glossary from './Theme16Glossary';

interface Props {
    onBack: () => void;
}

const Theme16Topic: React.FC<Props> = ({ onBack }) => {
  const [phase, setPhase] = useState<GamePhase>(GamePhase.MENU);

  const renderContent = () => {
    switch (phase) {
      case GamePhase.MAP:
        return <Theme16Map />;
      case GamePhase.SIMULATION:
        return <Theme16Sim />;
      case GamePhase.QUIZ:
        return <Theme16Quiz />;
      case GamePhase.GLOSSARY:
        return <Theme16Glossary />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto animate-fade-in-up">
            <button onClick={() => setPhase(GamePhase.MAP)} className="p-8 bg-purple-600 text-white rounded-3xl shadow-xl hover:bg-purple-700 transform hover:-translate-y-2 transition-all group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🧠</div>
              <h2 className="text-2xl font-black">Mapa Aminoglucósidos</h2>
              <p className="opacity-90 mt-2">Clasificación y Toxicidades clave.</p>
            </button>

            <button onClick={() => setPhase(GamePhase.SIMULATION)} className="p-8 bg-fuchsia-500 text-white rounded-3xl shadow-xl hover:bg-fuchsia-600 transform hover:-translate-y-2 transition-all group">
               <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">☣️</div>
              <h2 className="text-2xl font-black">Zona de Toxicidad</h2>
              <p className="opacity-90 mt-2">Simulación: Evita dañar el riñón y oído.</p>
            </button>

            <button onClick={() => setPhase(GamePhase.QUIZ)} className="p-8 bg-violet-500 text-white rounded-3xl shadow-xl hover:bg-violet-600 transform hover:-translate-y-2 transition-all group">
               <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🏆</div>
              <h2 className="text-2xl font-black">Test Tema 16</h2>
              <p className="opacity-90 mt-2">20 preguntas sobre estos antibióticos.</p>
            </button>

            <button onClick={() => setPhase(GamePhase.GLOSSARY)} className="p-8 bg-purple-800 text-white rounded-3xl shadow-xl hover:bg-purple-900 transform hover:-translate-y-2 transition-all group">
               <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🗣️</div>
              <h2 className="text-2xl font-black">Rimas Bio-Tóxicas</h2>
              <p className="opacity-90 mt-2">Trabalenguas para memorizar efectos.</p>
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
             <span>🧪</span> Módulo Aminoglucósidos+ (Tema 16)
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
                className="bg-white text-purple-900 px-4 py-2 rounded-full font-bold shadow-md hover:bg-gray-100 transition-colors text-sm"
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

export default Theme16Topic;