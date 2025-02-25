'use client'
import { useState } from 'react'
import { Send, User, Bot } from 'lucide-react'
import { getScrapes } from '../Api/Endpoints'

export default function Chatbot() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const extractHashtags = (text) => {
    const hashtagRegex = /#[\w\u00C0-\u00FF]+/g
    const matches = text.match(hashtagRegex)
    return matches ? matches.map(tag => tag.substring(1)) : [] // Elimina el símbolo # de los hashtags
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (input.trim()) {
      // Agregar mensaje del usuario
      setMessages([...messages, { role: 'user', content: input }])
      const userInput = input
      setInput('')
      setIsLoading(true)
      
      // Mensaje de espera
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Espera hasta que obtengamos los mejores datos de los hashtags que ingresaste...' }
      ])
      
      try {
        // Extraer hashtags del texto ingresado por el usuario
        const hashtags = extractHashtags(userInput)
        
        // Si no hay hashtags, informar al usuario
        if (hashtags.length === 0) {
          setMessages(prev => {
            const updatedMessages = prev.slice(0, -1) // Elimina el mensaje de espera
            return [...updatedMessages, { 
              role: 'assistant', 
              content: 'No he detectado ningún hashtag en tu mensaje. Por favor, ingresa uno o más hashtags comenzando con el símbolo #, como por ejemplo #tecnología o #marketing.' 
            }]
          })
          return
        }

        // Llamada real a la API
        const data = await getScrapes(hashtags, 10, 'top')
        
        // Actualiza el último mensaje (de espera) con la respuesta real
        setMessages(prev => {
          // Creamos una copia de los mensajes previos excepto el último (mensaje de espera)
          const updatedMessages = prev.slice(0, -1)
          
          // Formatea la respuesta de la API para mostrarla en el chat
          let formattedResponse = 'Aquí está la información que encontramos:'
          
          if (data && Array.isArray(data)) {
            formattedResponse = `Encontramos ${data.length} resultados relacionados con tus hashtags:\n\n` + 
                              data.slice(0, 5).map((item, index) => 
                                `${index + 1}. ${item.title || item.caption || 'Post sin título'}`
                              ).join('\n')
            
            if (data.length > 5) {
              formattedResponse += `\n\n...y ${data.length - 5} resultados más.`
            }
          } else {
            formattedResponse = 'No encontramos información específica para esos hashtags. Intenta con otros términos.'
          }
          
          // Agrega el nuevo mensaje con la respuesta real
          return [...updatedMessages, { role: 'assistant', content: formattedResponse }]
        })
      } catch (error) {
        // En caso de error, actualiza el mensaje de espera con un mensaje de error
        setMessages(prev => {
          const updatedMessages = prev.slice(0, -1)
          return [...updatedMessages, { 
            role: 'assistant', 
            content: `Lo siento, hubo un problema al buscar información. Por favor intenta de nuevo más tarde. Error: ${error.message}` 
          }]
        })
        console.error('Error en Chatbot:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Main Content - centered, fixed width like Claude/ChatGPT */}
      <main className="flex-grow flex flex-col overflow-hidden bg-gray-50">
        <div className="max-w-3xl w-full mx-auto h-full flex flex-col">
          {/* Messages container */}
          <div className="flex-grow overflow-y-auto p-4 md:px-6">
            {/* Welcome message if no messages yet */}
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center px-4 py-6 text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-3">
                  <Bot size={28} className="text-blue-600" />
                </div>
                <h3 className="text-base font-semibold text-gray-800 mb-2">¡Bienvenido a Social-Retriever!</h3>
                <p className="text-sm text-gray-600 max-w-md mb-4">
                  Ingresa hashtags para descubrir información relevante y tendencias en redes sociales.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <button 
                    onClick={() => setInput('#tecnología')}
                    className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs hover:bg-blue-100 transition">
                    #tecnología
                  </button>
                  <button 
                    onClick={() => setInput('#marketing')}
                    className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs hover:bg-blue-100 transition">
                    #marketing
                  </button>
                  <button 
                    onClick={() => setInput('#sostenibilidad')}
                    className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs hover:bg-blue-100 transition">
                    #sostenibilidad
                  </button>
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.length > 0 && (
              <div className="space-y-6 pb-2">
                {messages.map((message, index) => (
                  <div key={index} className="w-full">
                    <div className="max-w-3xl mx-auto flex gap-4">
                      <div className="flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center bg-gray-100">
                        {message.role === 'user' ? 
                          <User size={14} className="text-gray-600" /> : 
                          <Bot size={14} className="text-blue-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm mb-1 font-medium text-gray-700">
                          {message.role === 'user' ? 'Tú' : 'Social-Retriever'}
                        </div>
                        <div className="text-sm text-gray-800 whitespace-pre-line">
                          {message.content}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Loading indicator */}
                {isLoading && (
                  <div className="w-full">
                    <div className="max-w-3xl mx-auto flex gap-4">
                      <div className="flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center bg-gray-100">
                        <Bot size={14} className="text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm mb-1 font-medium text-gray-700">
                          Social-Retriever
                        </div>
                        <div className="flex space-x-1 items-center h-4">
                          <div className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                          <div className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Input Form */}
          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ingresa hashtags (#tecnología, #marketing...)"
                  className="flex-grow p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <button 
                  type="submit" 
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:hover:bg-blue-600"
                  disabled={!input.trim() || isLoading}
                >
                  <Send size={16} />
                </button>
              </form>
              <div className="text-xs text-gray-400 mt-1 text-center">
                Powered by Social-Retriever
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}