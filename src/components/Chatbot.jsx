import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { destinations } from '../data/destinations';
import ReactMarkdown from 'react-markdown';
import { Link, useNavigate } from 'react-router-dom';

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            content: '¡Hola! Soy tu asistente de turismo. ¿En qué destino de Bolivia te puedo ayudar hoy?'
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleLinkClick = (e, href) => {
        const isInternal = href.startsWith('/');
        if (isInternal) {
            e.preventDefault();
            navigate(href);
            setIsOpen(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMessage = inputValue.trim();
        setInputValue('');
        setMessages(prev => [...prev, { id: Date.now(), type: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
            if (!apiKey) {
                throw new Error('No API key provided');
            }

            const genAI = new GoogleGenerativeAI(apiKey);

            const systemInstruction = `Eres un asistente virtual EXCLUSIVAMENTE enfocado en el turismo en Bolivia. 
TU ÚNICO PROPÓSITO es ayudar a los turistas a explorar y conocer destinos en Bolivia.

REGLAS ESTRICTAS:
1. SI el usuario te pregunta sobre cualquier otro tema (por ejemplo: matemáticas, programación, política, moda, cocina general, deportes internacionales, etc.), DEBES rechazar amablemente la pregunta y desviar la conversación de vuelta al turismo en Bolivia.
   - Ejemplo de respuesta evasiva: "Lo siento, mi especialidad es mostrarte las maravillas de Bolivia. ¿Te gustaría saber sobre alguna aventura en Los Andes o un paseo por la Amazonía?"
2. Responde SIEMPRE de manera amigable, útil y concisa, usando formato Markdown para tu respuesta (viñetas, negritas e itálicas).
3. Cuando menciones un destino específico de la lista de abajo, proporciona un enlace usando markdown para que el usuario pueda visitarlo, con el formato EXACTO: [Nombre del destino](/destination/id-del-destino).

Aquí tienes la lista OFICIAL de destinos que representamos:

${destinations.map(d => `- **[${d.name}](/destination/${d.id})**: ${d.shortDescription}`).join('\n')}

Si te preguntan por algún lugar de Bolivia que no está en nuestra lista principal, puedes dar información general pero sugiere visitar los lugares de nuestra lista.`;

            const model = genAI.getGenerativeModel({
                model: 'gemini-2.5-flash',
                systemInstruction: systemInstruction
            });

            // Prepare conversation history for the API
            const history = messages
                .filter(m => m.id !== 1) // Skip our custom welcome message for the API history
                .map(m => ({
                    role: m.type === 'bot' ? 'model' : 'user',
                    parts: [{ text: m.content }]
                }));

            const chat = model.startChat({
                history: history,
            });

            const result = await chat.sendMessage(userMessage);
            const responseText = result.response.text();

            setMessages(prev => [...prev, { id: Date.now(), type: 'bot', content: responseText }]);
        } catch (error) {
            console.error('Error calling Gemini API:', error);
            let errorMessage = 'Lo siento, ha ocurrido un error de conexión.';
            if (error.message.includes('No API key provided')) {
                errorMessage = 'La clave de API de Gemini no está configurada. Por favor añade VITE_GEMINI_API_KEY en tu archivo .env.';
            }
            setMessages(prev => [...prev, { id: Date.now(), type: 'bot', content: errorMessage, isError: true }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Botón flotante inferior derecho */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 p-4 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-700 transition-colors z-50 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-teal-300"
                        aria-label="Abrir chat"
                    >
                        <MessageSquare className="w-6 h-6" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Ventana del Chatbot */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-gray-100"
                    >
                        {/* Header */}
                        <div className="bg-teal-600 text-white p-4 flex justify-between items-center shadow-md z-10">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-2 rounded-full">
                                    <Bot className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg leading-tight">Guía Turístico</h3>
                                    <p className="text-xs text-teal-100 font-medium">Asistente Virtual (IA)</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                                aria-label="Cerrar chat"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 bg-opacity-50">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] rounded-2xl p-4 shadow-sm prose prose-sm prose-p:leading-relaxed prose-a:text-teal-600 prose-a:font-semibold hover:prose-a:text-teal-700 ${message.type === 'user'
                                            ? 'bg-teal-600 text-white rounded-br-sm prose-p:text-white prose-strong:text-white'
                                            : message.isError
                                                ? 'bg-red-50 text-red-800 border border-red-200 rounded-bl-sm'
                                                : 'bg-white text-gray-800 border border-gray-100 rounded-bl-sm'
                                            }`}
                                    >
                                        <ReactMarkdown
                                            components={{
                                                a: ({ node, ...props }) => {
                                                    const isInternal = props.href?.startsWith('/');
                                                    if (isInternal) {
                                                        return (
                                                            <Link
                                                                to={props.href}
                                                                onClick={(e) => handleLinkClick(e, props.href)}
                                                                className="underline decoration-teal-300 underline-offset-2"
                                                            >
                                                                {props.children}
                                                            </Link>
                                                        )
                                                    }
                                                    return <a target="_blank" rel="noopener noreferrer" className="underline decoration-teal-300 underline-offset-2" {...props} />
                                                }
                                            }}
                                        >
                                            {message.content}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm rounded-bl-sm flex items-center gap-2 text-gray-500">
                                        <Loader2 className="w-4 h-4 animate-spin text-teal-600" />
                                        <span className="text-sm animate-pulse">Escribiendo...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-100">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Escribe un mensaje..."
                                    className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all text-sm text-gray-800 placeholder-gray-400"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || isLoading}
                                    className="absolute right-2 p-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 disabled:opacity-50 disabled:hover:bg-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-300"
                                    aria-label="Enviar mensaje"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
