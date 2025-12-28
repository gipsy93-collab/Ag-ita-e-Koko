import React from 'react';

const CardioInfographic: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-gray-900 p-6 text-center shrink-0">
        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider mb-2">
          Guía Rápida de Farmacología Cardiovascular
        </h2>
        <p className="text-gray-300 text-sm md:text-base max-w-3xl mx-auto">
          Resumen de los grupos farmacológicos clave para tratar insuficiencia cardíaca, arritmias e hipertensión.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50">
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto h-full">
          
          {/* Columna Izquierda: Insuficiencia Cardíaca (Tono Rojo/Naranja) */}
          <div className="flex-1 bg-orange-50 rounded-3xl p-6 border-4 border-orange-200 shadow-lg relative overflow-hidden group hover:border-orange-400 transition-colors duration-300">
            {/* Background Icon */}
            <div className="absolute -right-10 -bottom-10 text-[15rem] opacity-5 pointer-events-none text-orange-900 select-none">
              🫀
            </div>

            <div className="flex items-center gap-4 mb-8 border-b-2 border-orange-200 pb-4">
              <div className="bg-orange-500 text-white p-4 rounded-2xl shadow-lg text-4xl">
                💔
              </div>
              <h3 className="text-2xl font-black text-orange-900 leading-tight">
                Fármacos para la <br/>Insuficiencia Cardíaca
              </h3>
            </div>

            <div className="space-y-8 relative z-10">
              {/* Bloque Inotrópicos */}
              <div className="bg-white p-5 rounded-2xl shadow-md border-l-8 border-orange-500 hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">💪</span>
                  <div>
                    <h4 className="text-lg font-bold text-orange-800 mb-1">Inotrópicos Positivos</h4>
                    <p className="font-black text-gray-900 text-xl mb-2">Aumentan la Fuerza del Corazón</p>
                    <p className="text-gray-600 text-sm mb-3">
                      Mejoran la capacidad de bombeo al incrementar la fuerza de las contracciones.
                    </p>
                    <div className="bg-orange-100 p-3 rounded-xl">
                      <p className="text-xs font-bold text-orange-800 uppercase tracking-wider mb-1">Principal Grupo</p>
                      <p className="font-bold text-gray-800">Glucósidos Digitálicos (Digoxina)</p>
                      <p className="text-xs text-gray-600 mt-1">Actúa directamente sobre las células musculares cardíacas.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bloque Vasodilatadores */}
              <div className="bg-white p-5 rounded-2xl shadow-md border-l-8 border-red-500 hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">🥓</span>
                  <div>
                    <h4 className="text-lg font-bold text-red-800 mb-1">Vasodilatadores</h4>
                    <p className="font-black text-gray-900 text-xl mb-2">Alivian la Carga de Trabajo</p>
                    <p className="text-gray-600 text-sm">
                      Relajan los vasos sanguíneos, disminuyendo la presión que el corazón debe vencer para bombear.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Ritmo y Presión (Tono Azul/Cian) */}
          <div className="flex-1 bg-cyan-50 rounded-3xl p-6 border-4 border-cyan-200 shadow-lg relative overflow-hidden group hover:border-cyan-400 transition-colors duration-300">
             {/* Background Icon */}
             <div className="absolute -right-10 -bottom-10 text-[15rem] opacity-5 pointer-events-none text-cyan-900 select-none">
              🩺
            </div>

            <div className="flex items-center gap-4 mb-8 border-b-2 border-cyan-200 pb-4">
              <div className="bg-cyan-600 text-white p-4 rounded-2xl shadow-lg text-4xl">
                💓
              </div>
              <h3 className="text-2xl font-black text-cyan-900 leading-tight">
                Fármacos para el Ritmo <br/>y la Presión Arterial
              </h3>
            </div>

            <div className="space-y-6 relative z-10">
              {/* Bloque Antiarrítmicos */}
              <div className="bg-white p-5 rounded-2xl shadow-md border-l-8 border-cyan-500 hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">📉</span>
                  <div>
                    <h4 className="text-lg font-bold text-cyan-800 mb-1">Antiarrítmicos</h4>
                    <p className="font-black text-gray-900 text-xl mb-2">Estabilizan el Ritmo Cardíaco</p>
                    <p className="text-gray-600 text-sm">
                      Suprimen o bloquean las alteraciones en el origen o transmisión del impulso eléctrico.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bloque Beta-bloqueantes */}
              <div className="bg-white p-5 rounded-2xl shadow-md border-l-8 border-blue-600 hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">🛡️</span>
                  <div>
                    <h4 className="text-lg font-bold text-blue-800 mb-1">Beta-bloqueantes</h4>
                    <p className="font-black text-gray-900 text-xl mb-2">Reducen Presión y Frecuencia</p>
                    <p className="text-gray-600 text-sm">
                      Bloquean los efectos de la adrenalina, disminuyendo la presión arterial y el estrés cardíaco.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bloque IECAs / ARA II */}
              <div className="bg-white p-5 rounded-2xl shadow-md border-l-8 border-teal-500 hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">🧬</span>
                  <div>
                    <h4 className="text-lg font-bold text-teal-800 mb-1">IECAs y ARA II</h4>
                    <p className="font-black text-gray-900 text-xl mb-2">Sistema Renina-Angiotensina</p>
                    <p className="text-gray-600 text-sm">
                      Inhiben el sistema hormonal clave para producir vasodilatación y bajar la presión arterial.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CardioInfographic;