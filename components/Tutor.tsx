import React, { useState, useRef, useEffect } from 'react';
import { chatWithTutor } from '../services/geminiService';
import { ChatMessage } from '../types';

interface Props {
  topicTitle: string;
  contextData: string;
}

const Tutor: React.FC<Props> = ({ topicTitle, contextData }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: `¡Hola! Soy Koko-Bot 🥥. Pregúntame lo que quieras sobre ${topicTitle} y te responderé a la velocidad de la luz.` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const currentInput = input;
    const userMsg: ChatMessage = { role: 'user', text: currentInput };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
    }));

    const responseText = await chatWithTutor(history, currentInput, contextData);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-4 text-white font-bold flex items-center shadow-md shrink-0">
        <span className="text-3xl mr-3 animate-bounce">⚡</span>
        <div>
           <h2 className="text-xl font-black">Preguntas Rápidas IA</h2>
           <p className="text-sm text-teal-100 flex items-center gap-1">
             <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
             Online (Gemini Flash-Lite)
           </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
            {msg.role === 'model' && <div className="mr-2 text-2xl">🥥</div>}
            <div className={`max-w-[85%] p-3 px-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-purple-600 text-white rounded-tr-none' 
                : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-fade-in">
             <div className="mr-2 text-2xl">🥥</div>
             <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none flex items-center gap-2 text-gray-500 text-sm shadow-sm">
               <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
               <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
               <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-200 flex gap-2 shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu duda aquí..."
          disabled={isLoading}
          className="flex-1 p-4 rounded-full bg-gray-100 border-0 focus:ring-2 focus:ring-teal-400 focus:bg-white transition-all outline-none"
        />
        <button 
          type="submit" 
          disabled={isLoading || !input.trim()}
          className="bg-teal-500 hover:bg-teal-600 text-white p-4 rounded-full font-bold shadow-lg transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed aspect-square flex items-center justify-center"
        >
          ➤
        </button>
      </form>
    </div>
  );
};

export default Tutor;