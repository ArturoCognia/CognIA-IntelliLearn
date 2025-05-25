import { useState, useRef, useEffect } from 'react';
import { FaTimes, FaPaperPlane, FaLightbulb, FaBookReader, FaChartLine } from 'react-icons/fa';
import { useAuth } from '@/lib/AuthContext';
import Image from 'next/image';
import { chatWithAI } from '@/lib/firebase';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export const FloatingAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [chatHistory, setChatHistory] = useState<Array<{role: string, content: string}>>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  // Sugerencias predefinidas
  const suggestionTopics = [
    { id: '1', title: 'Explícame regresión lineal', icon: <FaLightbulb className="text-[#3C31A3]" /> },
    { id: '2', title: 'Resumir mi próxima lección', icon: <FaBookReader className="text-[#3C31A3]" /> },
    { id: '3', title: 'Ver mi progreso', icon: <FaChartLine className="text-[#3C31A3]" /> }
  ];

  // Inicializar mensajes con saludo personalizado
  useEffect(() => {
    if (user) {
      const welcomeMessage: Message = {
        id: 'welcome',
        sender: 'assistant',
        text: `¡Hola ${user.displayName?.split(' ')[0] || 'estudiante'}! Soy tu asistente CognIA. ¿En qué puedo ayudarte hoy?`,
        timestamp: new Date()
      };
      
      setMessages([welcomeMessage]);
      setChatHistory([{ role: 'model', content: welcomeMessage.text }]);
    }
  }, [user]);

  // Scroll automático al final de los mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // Agregar el mensaje del usuario a la conversación
    const userMessage: Message = { 
      id: Date.now().toString(),
      sender: 'user', 
      text: inputValue,
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setShowSuggestions(false);

    // Actualizar historial de chat
    const newChatHistory = [...chatHistory, { role: 'user', content: userMessage.text }];
    setChatHistory(newChatHistory);
    
    try {
      // Obtener respuesta de Gemini AI
      const aiResponseText = await chatWithAI(newChatHistory);
      
      // Agregar respuesta del AI
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setChatHistory(prev => [...prev, { role: 'model', content: aiResponseText }]);
    } catch (error) {
      console.error('Error al obtener respuesta de IA:', error);
      // Agregar mensaje de error
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Lo siento, ha ocurrido un error. Por favor, intenta de nuevo más tarde.',
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setTimeout(() => {
      handleSend();
    }, 100);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Botón del asistente */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="flex items-center gap-2 px-5 py-3 rounded-md text-white font-medium shadow-lg bg-gradient-to-r from-[#132944] to-[#3C31A3] hover:scale-105 transition-transform"
        >
          <div>
            <Image src="/assets/images/IA.svg" alt="Asistente CognIA" width={33} height={33} />
          </div>
          <span>Asistente CognIA</span>
        </button>
      )}

      {/* Ventana del chat */}
      {isOpen && (
        <div className="absolute bottom-0 right-0 w-96 h-[500px] max-h-[80vh] bg-white rounded-lg shadow-xl overflow-hidden flex flex-col transition-all">
          {/* Cabecera */}
          <div className="bg-gradient-to-r from-[#132944] to-[#3C31A3] p-3 text-white flex items-center justify-between cursor-move">
            <div className="flex items-center">
              <Image src="/assets/images/IA.svg" alt="CognIA" width={28} height={28} className="mr-2" />
              <h3 className="font-medium">Asistente CognIA</h3>
            </div>
            <button onClick={toggleChat} className="p-1 hover:bg-white/20 rounded-full transition-colors">
              <FaTimes size={14} />
            </button>
          </div>

          {/* Cuerpo del chat */}
          <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-[#3C31A3] text-white rounded-tr-none'
                      : 'bg-white shadow text-gray-700 rounded-tl-none'
                  }`}
                >
                  <p>{message.text}</p>
                  <p className="text-xs mt-1 opacity-70 text-right">
                    {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Indicador de escritura */}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-white shadow text-gray-700 rounded-lg rounded-tl-none max-w-[80%] p-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-[#3C31A3] animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-[#3C31A3] animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-[#3C31A3] animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Sugerencias */}
          {showSuggestions && messages.length <= 1 && (
            <div className="px-3 py-2 border-t border-gray-200 bg-white">
              <div className="flex flex-wrap gap-2">
                {suggestionTopics.map(topic => (
                  <button
                    key={topic.id}
                    onClick={() => handleSuggestionClick(topic.title)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-full flex items-center transition-colors"
                  >
                    <span className="mr-1">{topic.icon}</span>
                    {topic.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Campo de entrada */}
          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-2">
              <div className="relative flex-grow">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-[#3C31A3] resize-none h-9 text-sm leading-tight"
                  placeholder="Escribe un mensaje..."
                  rows={1}
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full ${
                    inputValue.trim() ? 'text-[#3C31A3] hover:bg-gray-100' : 'text-gray-400'
                  }`}
                >
                  <FaPaperPlane size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 