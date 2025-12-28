import React, { useState } from 'react';
import CardioTopic from './components/CardioTopic';
import OncoTopic from './components/OncoTopic';
import AntibioticTopic from './components/AntibioticTopic';
import ImmunoTopic from './components/ImmunoTopic';
import CPRTopic from './components/CPRTopic';
import ViralTopic from './components/ViralTopic';
import DiureticTopic from './components/DiureticTopic';
import HemostasisTopic from './components/HemostasisTopic';
import SyntheticsTopic from './components/SyntheticsTopic';
import Theme16Topic from './components/Theme16Topic';

enum Topic {
  NONE = 'NONE',
  CARDIO = 'CARDIO',
  ONCO = 'ONCO',
  ANTIBIO = 'ANTIBIO',
  IMMUNO = 'IMMUNO',
  CPR = 'CPR',
  VIRAL = 'VIRAL',
  DIURETIC = 'DIURETIC',
  HEMOSTASIS = 'HEMOSTASIS',
  SYNTHETICS = 'SYNTHETICS',
  THEME16 = 'THEME16'
}

const App: React.FC = () => {
  const [currentTopic, setCurrentTopic] = useState<Topic>(Topic.NONE);

  const renderContent = () => {
    switch (currentTopic) {
      case Topic.CARDIO:
        return <CardioTopic onBack={() => setCurrentTopic(Topic.NONE)} />;
      case Topic.ONCO:
        return <OncoTopic onBack={() => setCurrentTopic(Topic.NONE)} />;
      case Topic.ANTIBIO:
        return <AntibioticTopic onBack={() => setCurrentTopic(Topic.NONE)} />;
      case Topic.IMMUNO:
        return <ImmunoTopic onBack={() => setCurrentTopic(Topic.NONE)} />;
      case Topic.CPR:
        return <CPRTopic onBack={() => setCurrentTopic(Topic.NONE)} />;
      case Topic.VIRAL:
        return <ViralTopic onBack={() => setCurrentTopic(Topic.NONE)} />;
      case Topic.DIURETIC:
        return <DiureticTopic onBack={() => setCurrentTopic(Topic.NONE)} />;
      case Topic.HEMOSTASIS:
        return <HemostasisTopic onBack={() => setCurrentTopic(Topic.NONE)} />;
      case Topic.SYNTHETICS:
        return <SyntheticsTopic onBack={() => setCurrentTopic(Topic.NONE)} />;
      case Topic.THEME16:
        return <Theme16Topic onBack={() => setCurrentTopic(Topic.NONE)} />;
      default:
        // Topic Selector Screen
        return (
          <div className="flex flex-col items-center justify-center h-full animate-fade-in-up overflow-y-auto py-10">
             <h2 className="text-white text-3xl md:text-5xl font-black mb-10 text-center drop-shadow-lg shrink-0">
                ¿Qué quieres aprender hoy?
             </h2>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl px-4">
                {/* 1. Tema 9: Cardiovascular */}
                <button 
                  onClick={() => setCurrentTopic(Topic.CARDIO)}
                  className="bg-white rounded-3xl p-6 shadow-2xl transform transition-all hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] group relative overflow-hidden flex flex-col h-full min-h-[250px]"
                >
                   <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <span className="text-8xl">❤️</span>
                   </div>
                   <div className="relative z-10 text-left flex-1 flex flex-col">
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform inline-block">🫀</div>
                      <h3 className="text-2xl font-black text-purple-900 mb-2">Tema 9: Cardio</h3>
                      <p className="text-gray-600 text-sm md:text-base mb-6 flex-1">Insuficiencia Cardiaca, Antiarrítmicos, HTA y Angina.</p>
                      <div className="mt-auto inline-block bg-purple-600 text-white px-6 py-2 rounded-full font-bold group-hover:bg-purple-700 text-center">
                        Entrar ➔
                      </div>
                   </div>
                </button>

                {/* 2. Tema 10: Diuréticos */}
                <button 
                  onClick={() => setCurrentTopic(Topic.DIURETIC)}
                  className="bg-gradient-to-br from-blue-600 to-cyan-700 rounded-3xl p-6 shadow-2xl transform transition-all hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] group relative overflow-hidden text-white border-2 border-cyan-400/30 flex flex-col h-full min-h-[250px]"
                >
                   <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <span className="text-8xl">💧</span>
                   </div>
                   <div className="relative z-10 text-left flex-1 flex flex-col">
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform inline-block">🚽</div>
                      <h3 className="text-2xl font-black text-cyan-100 mb-2">Tema 10: Diuréticos</h3>
                      <p className="text-cyan-200/80 text-sm md:text-base mb-6 flex-1">Furosemida, Tiazidas, Ahorradores de K+ y Osmóticos.</p>
                      <div className="mt-auto inline-block bg-white text-blue-700 px-6 py-2 rounded-full font-bold group-hover:bg-blue-50 text-center shadow-lg">
                        Entrar ➔
                      </div>
                   </div>
                </button>

                {/* 3. Tema 11: Hemostasia */}
                <button 
                  onClick={() => setCurrentTopic(Topic.HEMOSTASIS)}
                  className="bg-gradient-to-br from-rose-700 to-pink-900 rounded-3xl p-6 shadow-2xl transform transition-all hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] group relative overflow-hidden text-white border-2 border-rose-500/30 flex flex-col h-full min-h-[250px]"
                >
                   <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <span className="text-8xl">🩸</span>
                   </div>
                   <div className="relative z-10 text-left flex-1 flex flex-col">
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform inline-block">🩹</div>
                      <h3 className="text-2xl font-black text-rose-100 mb-2">Tema 11: Hemostasia</h3>
                      <p className="text-rose-200/80 text-sm md:text-base mb-6 flex-1">Antiagregantes, Heparinas y Fibrinolíticos.</p>
                      <div className="mt-auto inline-block bg-white text-rose-800 px-6 py-2 rounded-full font-bold group-hover:bg-rose-50 text-center shadow-lg">
                        Entrar ➔
                      </div>
                   </div>
                </button>

                {/* 4. Tema 12: Inmunosupresores */}
                <button 
                  onClick={() => setCurrentTopic(Topic.IMMUNO)}
                  className="bg-gradient-to-br from-cyan-500 to-teal-600 rounded-3xl p-6 shadow-2xl transform transition-all hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] group relative overflow-hidden text-white border-2 border-cyan-300/30 flex flex-col h-full min-h-[250px]"
                >
                   <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <span className="text-8xl">🛡️</span>
                   </div>
                   <div className="relative z-10 text-left flex-1 flex flex-col">
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform inline-block">💉</div>
                      <h3 className="text-2xl font-black text-cyan-50 mb-2">Tema 12: Inmuno</h3>
                      <p className="text-cyan-100 text-sm md:text-base mb-6 flex-1">Autoinmunidad, Trasplantes y Glucocorticoides.</p>
                      <div className="mt-auto inline-block bg-white text-teal-700 px-6 py-2 rounded-full font-bold group-hover:bg-cyan-50 text-center shadow-lg">
                        Entrar ➔
                      </div>
                   </div>
                </button>

                {/* 5. Tema 13: Oncología */}
                <button 
                  onClick={() => setCurrentTopic(Topic.ONCO)}
                  className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-3xl p-6 shadow-2xl transform transition-all hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] group relative overflow-hidden text-white border-2 border-blue-500/30 flex flex-col h-full min-h-[250px]"
                >
                   <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <span className="text-8xl">🧬</span>
                   </div>
                   <div className="relative z-10 text-left flex-1 flex flex-col">
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform inline-block">☢️</div>
                      <h3 className="text-2xl font-black text-blue-200 mb-2">Tema 13: Onco</h3>
                      <p className="text-blue-100/70 text-sm md:text-base mb-6 flex-1">Antineoplásicos, Ciclo Celular y Toxicidad.</p>
                      <div className="mt-auto inline-block bg-blue-500 text-white px-6 py-2 rounded-full font-bold group-hover:bg-blue-400 text-center">
                        Entrar ➔
                      </div>
                   </div>
                </button>

                {/* 6. Tema 14: Antibióticos */}
                <button 
                  onClick={() => setCurrentTopic(Topic.ANTIBIO)}
                  className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-6 shadow-2xl transform transition-all hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] group relative overflow-hidden text-white border-2 border-yellow-300/30 flex flex-col h-full min-h-[250px]"
                >
                   <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <span className="text-8xl">💊</span>
                   </div>
                   <div className="relative z-10 text-left flex-1 flex flex-col">
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform inline-block">🦠</div>
                      <h3 className="text-2xl font-black text-yellow-50 mb-2">Tema 14: Antibióticos</h3>
                      <p className="text-yellow-100 text-sm md:text-base mb-6 flex-1">Betalactámicos, Bactericidas vs Bacteriostáticos.</p>
                      <div className="mt-auto inline-block bg-white text-orange-600 px-6 py-2 rounded-full font-bold group-hover:bg-yellow-50 text-center shadow-lg">
                        Entrar ➔
                      </div>
                   </div>
                </button>

                {/* 7. Tema 15: Sintéticos */}
                <button 
                  onClick={() => setCurrentTopic(Topic.SYNTHETICS)}
                  className="bg-gradient-to-br from-amber-500 to-orange-700 rounded-3xl p-6 shadow-2xl transform transition-all hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] group relative overflow-hidden text-white border-2 border-amber-400/30 flex flex-col h-full min-h-[250px]"
                >
                   <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <span className="text-8xl">⚗️</span>
                   </div>
                   <div className="relative z-10 text-left flex-1 flex flex-col">
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform inline-block">🧪</div>
                      <h3 className="text-2xl font-black text-amber-100 mb-2">Tema 15: Sintéticos</h3>
                      <p className="text-amber-200/80 text-sm md:text-base mb-6 flex-1">Quinolonas, Sulfamidas y Nitrofurantoína.</p>
                      <div className="mt-auto inline-block bg-white text-orange-800 px-6 py-2 rounded-full font-bold group-hover:bg-amber-50 text-center shadow-lg">
                        Entrar ➔
                      </div>
                   </div>
                </button>

                {/* 8. Tema 16: Aminoglucósidos+ */}
                <button 
                  onClick={() => setCurrentTopic(Topic.THEME16)}
                  className="bg-gradient-to-br from-purple-600 to-fuchsia-800 rounded-3xl p-6 shadow-2xl transform transition-all hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] group relative overflow-hidden text-white border-2 border-purple-400/30 flex flex-col h-full min-h-[250px]"
                >
                   <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <span className="text-8xl">🧬</span>
                   </div>
                   <div className="relative z-10 text-left flex-1 flex flex-col">
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform inline-block">🧪</div>
                      <h3 className="text-2xl font-black text-purple-100 mb-2">Tema 16: Otros ATBs</h3>
                      <p className="text-purple-200/80 text-sm md:text-base mb-6 flex-1">Aminoglucósidos, Glucopéptidos y Macrólidos.</p>
                      <div className="mt-auto inline-block bg-white text-purple-800 px-6 py-2 rounded-full font-bold group-hover:bg-purple-50 text-center shadow-lg">
                        Entrar ➔
                      </div>
                   </div>
                </button>

                {/* 9. Tema 17: Antivíricos */}
                <button 
                  onClick={() => setCurrentTopic(Topic.VIRAL)}
                  className="bg-gradient-to-br from-emerald-600 to-lime-800 rounded-3xl p-6 shadow-2xl transform transition-all hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] group relative overflow-hidden text-white border-2 border-emerald-400/30 flex flex-col h-full min-h-[250px]"
                >
                   <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <span className="text-8xl">☣️</span>
                   </div>
                   <div className="relative z-10 text-left flex-1 flex flex-col">
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform inline-block">🧪</div>
                      <h3 className="text-2xl font-black text-emerald-100 mb-2">Tema 17: Antivíricos</h3>
                      <p className="text-emerald-200/80 text-sm md:text-base mb-6 flex-1">Herpes, VIH, Gripe y COVID-19.</p>
                      <div className="mt-auto inline-block bg-white text-emerald-700 px-6 py-2 rounded-full font-bold group-hover:bg-emerald-50 text-center shadow-lg">
                        Entrar ➔
                      </div>
                   </div>
                </button>

                {/* 10. Tema 18: RCP */}
                <button 
                  onClick={() => setCurrentTopic(Topic.CPR)}
                  className="bg-gradient-to-br from-red-600 to-rose-800 rounded-3xl p-6 shadow-2xl transform transition-all hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] group relative overflow-hidden text-white border-2 border-red-400/30 flex flex-col h-full min-h-[250px]"
                >
                   <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <span className="text-8xl">📢</span>
                   </div>
                   <div className="relative z-10 text-left flex-1 flex flex-col">
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform inline-block">🚨</div>
                      <h3 className="text-2xl font-black text-red-100 mb-2">Tema 18: RCP</h3>
                      <p className="text-red-200/80 text-sm md:text-base mb-6 flex-1">Adrenalina, Atropina, Antiarrítmicos y Urgencias.</p>
                      <div className="mt-auto inline-block bg-white text-red-700 px-6 py-2 rounded-full font-bold group-hover:bg-red-50 text-center shadow-lg">
                        Entrar ➔
                      </div>
                   </div>
                </button>
             </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-purple-700 font-sans selection:bg-pink-300 flex flex-col">
      {/* Global Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 p-4 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setCurrentTopic(Topic.NONE)}
          >
            <div className="bg-white p-2 rounded-lg shadow-lg group-hover:rotate-12 transition-transform">
               🥥
            </div>
            <h1 className="text-white text-2xl md:text-3xl font-black tracking-tight drop-shadow-md">
              Agüita e <span className="text-yellow-400">Koko</span>
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto p-4 md:p-8 flex-1 flex flex-col h-[calc(100vh-80px)]">
         {renderContent()}
      </main>
    </div>
  );
};

export default App;