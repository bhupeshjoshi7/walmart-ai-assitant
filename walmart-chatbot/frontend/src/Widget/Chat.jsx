import React, { useState, useRef, useEffect } from 'react';
import { Smile, X, Send, Circle, MoreVertical, Phone, Video } from 'lucide-react';

function Chat(props) {
    const bot = props.bot || { name: 'AI Assistant', profile: 'Online', url: 'https://picsum.photos/100/100?random=1' };
    const messages = props.messages ? props.messages : [];
    const messagesEndRef = useRef(null);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const MessageCard = ({ message, sender, url, timestamp = "12:34 PM" }) => {
        return (
            <div className={`flex mb-6 ${sender ? 'justify-end' : 'justify-start'} group`}>
                {!sender && (
                    <div className="flex-shrink-0 mr-3">
                        <img 
                            src={url} 
                            alt="Bot profile" 
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-lg" 
                        />
                    </div>
                )}
                <div className="flex flex-col max-w-xs lg:max-w-md">
                    <div className={`px-6 py-3 rounded-3xl relative ${
                        sender 
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-lg shadow-lg' 
                            : 'bg-white text-gray-800 rounded-bl-lg shadow-lg border border-gray-100'
                    }`}>
                        <p className="text-sm leading-relaxed">{message}</p>
                        {sender && (
                            <div className="absolute -bottom-1 -right-1 w-0 h-0 border-l-8 border-l-blue-600 border-t-8 border-t-transparent border-b-8 border-b-transparent"></div>
                        )}
                        {!sender && (
                            <div className="absolute -bottom-1 -left-1 w-0 h-0 border-r-8 border-r-white border-t-8 border-t-transparent border-b-8 border-b-transparent"></div>
                        )}
                    </div>
                    <div className={`text-xs text-gray-400 mt-1 ${sender ? 'text-right' : 'text-left'}`}>
                        {timestamp}
                    </div>
                </div>
                {sender && (
                    <div className="flex-shrink-0 ml-3">
                        <img 
                            src={url} 
                            alt="User profile" 
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-lg" 
                        />
                    </div>
                )}
            </div>
        );
    };

    const submitHandler = () => {
        if (inputValue.trim()) {
            props.setMessages && props.setMessages([
                { 
                    message: inputValue.trim(), 
                    url: "https://picsum.photos/100/100?random=2", 
                    sender: true 
                }, 
                ...messages
            ]);
            setInputValue('');
            
            // Simulate bot typing
            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                props.setMessages && props.setMessages([
                    { 
                        message: "Thanks for your message! I'm here to help.", 
                        url: bot.url, 
                        sender: false 
                    },
                    { 
                        message: inputValue.trim(), 
                        url: "https://picsum.photos/100/100?random=2", 
                        sender: true 
                    }, 
                    ...messages
                ]);
            }, 1500);
        }
    };

    const TypingIndicator = () => (
        <div className="flex justify-start mb-6">
            <div className="flex-shrink-0 mr-3">
                <img 
                    src={bot.url} 
                    alt="Bot profile" 
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-lg" 
                />
            </div>
            <div className="bg-white rounded-3xl rounded-bl-lg px-6 py-4 shadow-lg border border-gray-100">
                <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-full bg-gradient-to-br from-gray-50 via-white to-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between p-6 bg-white/90 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <img 
                            src={bot.url} 
                            alt={bot.name} 
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-lg" 
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                            <Circle className="w-2 h-2 fill-current" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{bot.name}</h3>
                        <p className="text-sm text-green-500 font-medium">{bot.profile}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button 
                        type="button" 
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                    >
                        <Phone className="w-5 h-5 text-gray-500" />
                    </button>
                    <button 
                        type="button" 
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                    >
                        <Video className="w-5 h-5 text-gray-500" />
                    </button>
                    <button 
                        type="button" 
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                    >
                        <MoreVertical className="w-5 h-5 text-gray-500" />
                    </button>
                    <button 
                        type="button" 
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => props.closeMessage && props.closeMessage()}
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-2">
                <div className="flex flex-col-reverse">
                    {messages.map((ele, index) => (
                        <MessageCard 
                            key={index}
                            url={ele.url} 
                            message={ele.message} 
                            sender={ele.sender} 
                        />
                    ))}
                    {isTyping && <TypingIndicator />}
                </div>
                <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-6 bg-white/90 backdrop-blur-sm border-t border-gray-200/50">
                <div className="flex items-center space-x-4">
                    <button 
                        type="button" 
                        className="p-3 rounded-full hover:bg-gray-100 transition-colors duration-200 flex-shrink-0"
                    >
                        <Smile className="w-5 h-5 text-gray-500" />
                    </button>
                    
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && submitHandler()}
                            placeholder="Type a message..."
                            className="w-full px-6 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 text-gray-800 placeholder-gray-500"
                        />
                    </div>
                    
                    <button 
                        type="button"
                        onClick={submitHandler}
                        disabled={!inputValue.trim()}
                        className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0 shadow-lg"
                    >
                        <Send className="w-5 h-5 text-white" />
                    </button>
                </div>
                
                <div className="flex justify-center mt-4">
                    <a 
                        href="#" 
                        className="text-xs text-gray-400 hover:text-gray-600 transition-colors duration-200 font-medium"
                    >
                        Powered by Wali.io
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Chat;