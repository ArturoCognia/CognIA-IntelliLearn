'use client'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { FaPaperPlane, FaLightbulb, FaBookReader, FaChartLine, FaMicrophone, FaStop, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa'

type Message = {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
}

type SuggestionTopic = {
  id: string
  title: string
  icon: React.ReactNode
}

export const FloatingAssistant = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hola, soy tu asistente CognIA. ¿En qué puedo ayudarte hoy?',
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Temas sugeridos
  const suggestionTopics: SuggestionTopic[] = [
    { id: '1', title: 'Explícame regresión lineal', icon: <FaLightbulb /> },
    { id: '2', title: 'Resumir mi próxima lección', icon: <FaBookReader /> },
    { id: '3', title: 'Ver mi progreso', icon: <FaChartLine /> }
  ]

  // Función para simular respuestas del asistente
  const generateAIResponse = (userMessage: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (userMessage.toLowerCase().includes('regresión') || userMessage.toLowerCase().includes('regresion')) {
          resolve('La regresión lineal es un algoritmo de aprendizaje supervisado que predice un valor continuo basado en variables independientes. La fórmula básica es y = mx + b, donde m es la pendiente y b el intercepto. ¿Te gustaría ejemplos prácticos?')
        } else if (userMessage.toLowerCase().includes('resumen') || userMessage.toLowerCase().includes('resumir')) {
          resolve('Tu próxima lección es "Herramientas y entorno de desarrollo" con una duración de 20 minutos. Aprenderás sobre Scikit-learn, TensorFlow y PyTorch. ¿Necesitas preparación previa?')
        } else if (userMessage.toLowerCase().includes('progreso') || userMessage.toLowerCase().includes('avance')) {
          resolve('Has completado el 25% del curso "Introducción al Machine Learning". Tienes 3 lecciones completadas y 9 por completar. Tu ritmo es bueno. Recomiendo completar "Algoritmos de Machine Learning" esta semana.')
        } else {
          resolve('Como asistente de aprendizaje personalizado, puedo ayudarte con explicaciones de conceptos, resúmenes de lecciones, análisis de progreso y recomendaciones de estudio. ¿En qué tema específico necesitas ayuda?')
        }
      }, 1500)
    })
  }

  // Auto-scroll a mensajes nuevos
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!inputValue.trim()) return

    // Agregar mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setShowSuggestions(false)
    setIsLoading(true)
    
    // Simular respuesta del AI
    const aiResponse = await generateAIResponse(userMessage.text)
    
    // Agregar respuesta del AI
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: aiResponse,
      sender: 'ai',
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, aiMessage])
    setIsLoading(false)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
    setShowSuggestions(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      // Simulación de voz a texto
      setTimeout(() => {
        setInputValue('¿Puedes explicarme qué es regresión lineal?')
        setIsRecording(false)
      }, 2000)
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setIsMinimized(false)
    }
  }

  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMinimized(!isMinimized)
  }

  return (
    <>
      {/* Botón flotante cuando está cerrado */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-md text-white font-medium shadow-lg bg-gradient-to-r from-[#132944] to-[#3C31A3] hover:scale-105 transition-transform"
        >
          <div className="">
            <Image src={'/assets/images/IA.svg'} alt="Asistente CognIA" width={33} height={33} />
          </div>
          <span>Asistente CognIA</span>
        </button>
      )}

      {/* Ventana de chat cuando está abierto */}
      {isOpen && (
        <div 
          className={`fixed ${isMinimized ? 'bottom-6 right-6 w-80 h-14' : 'bottom-6 right-6 w-96 h-[500px] max-h-[80vh]'} z-50 rounded-lg shadow-xl transition-all duration-300 flex flex-col overflow-hidden`}
        >
          {/* Encabezado del chat */}
          <div className="bg-gradient-to-r from-[#132944] to-[#3C31A3] p-3 text-white flex items-center justify-between cursor-move">
            <div className="flex items-center">
              <Image src="/assets/images/IA.svg" alt="CognIA" width={28} height={28} className="mr-2" />
              <h2 className="font-medium">Asistente CognIA</h2>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={toggleMinimize}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                {isMinimized ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
              </button>
              <button 
                onClick={toggleChat}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <FaTimes size={14} />
              </button>
            </div>
          </div>

          {/* Contenido del chat - solo visible si no está minimizado */}
          {!isMinimized && (
            <>
              {/* Área de mensajes */}
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
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs mt-1 opacity-70 text-right">
                        {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-white shadow text-gray-700 rounded-lg rounded-tl-none max-w-[80%] p-3">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-[#3C31A3] animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-[#3C31A3] animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 rounded-full bg-[#3C31A3] animate-bounce" style={{animationDelay: '0.4s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef}></div>
              </div>

              {/* Sugerencias */}
              {showSuggestions && (
                <div className="px-3 py-2 border-t border-gray-200 bg-white">
                  <div className="flex flex-wrap gap-2">
                    {suggestionTopics.map(topic => (
                      <button
                        key={topic.id}
                        onClick={() => handleSuggestionClick(topic.title)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-full flex items-center transition-colors"
                      >
                        <span className="mr-1 text-[#3C31A3]">{topic.icon}</span>
                        {topic.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input de mensaje */}
              <div className="p-3 border-t border-gray-200 bg-white">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={toggleRecording}
                    className={`p-2 rounded-full ${isRecording ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'} hover:opacity-80 transition-colors`}
                  >
                    {isRecording ? <FaStop size={12} /> : <FaMicrophone size={12} />}
                  </button>
                  <div className="relative flex-grow">
                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-[#3C31A3] resize-none h-9 text-sm leading-tight"
                      placeholder="Escribe un mensaje..."
                      rows={1}
                    />
                    <button
                      onClick={handleSend}
                      disabled={!inputValue.trim()}
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full ${
                        inputValue.trim() ? 'text-[#3C31A3] hover:bg-purple-100' : 'text-gray-400'
                      }`}
                    >
                      <FaPaperPlane size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
} 