import React, { useState, useEffect } from 'react';
import { EmojiHappyIcon, XIcon, PaperAirplaneIcon, SparklesIcon } from '@heroicons/react/solid';
import styled from 'styled-components';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';

function Chat(props) {
  const bot = props.bot;
  const messages = props.messages || [];
  const { productId } = useParams(); // Extract product ID from URL params
  const location = useLocation();
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  // Extract product ID from URL on component mount and route changes
  useEffect(() => {
    const extractProductId = () => {
      // Method 1: From URL params (if using /product/:productId)
      if (productId) {
        setCurrentProductId(productId);
        return;
      }
      
      // Method 2: From current pathname (fallback)
      const pathSegments = location.pathname.split('/');
      const productIndex = pathSegments.indexOf('product');
      if (productIndex !== -1 && pathSegments[productIndex + 1]) {
        setCurrentProductId(pathSegments[productIndex + 1]);
        return;
      }
      
      // Method 3: From query parameters (if using ?productId=1)
      const urlParams = new URLSearchParams(location.search);
      const queryProductId = urlParams.get('productId');
      if (queryProductId) {
        setCurrentProductId(queryProductId);
        return;
      }
      
      // Method 4: From hash (if using #productId=1)
      const hash = location.hash.slice(1); // Remove the # symbol
      if (hash) {
        const hashParams = new URLSearchParams(hash);
        const hashProductId = hashParams.get('productId');
        if (hashProductId) {
          setCurrentProductId(hashProductId);
          return;
        }
      }
      
      // Default fallback
      setCurrentProductId('1');
    };

    extractProductId();
  }, [productId, location.pathname, location.search, location.hash]);

  // Debug log to show extracted product ID
  useEffect(() => {
    console.log('Current Product ID:', currentProductId);
    console.log('URL:', location.pathname);
  }, [currentProductId, location.pathname]);

  // NEW AND IMPROVED MessageCard component
const MessageCard = (props) => {
    // A bit of style logic to make the code cleaner
    const isUser = props.sender;
    
    // Base classes for the message bubble
    const bubbleClasses = "px-4 py-3 rounded-2xl inline-block max-w-xl shadow-md";

    
    // Conditional classes for user vs. bot
    const userClasses = "bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-br-none";
    const botClasses = "bg-white text-gray-800 rounded-bl-none border border-gray-200";

    return (
        // Main container for a single message row
        <div className={`flex items-end mb-4 gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
            
            {/* Bot Avatar (only shows if it's not the user) */}
            {!isUser && (
                <img src={props.url} alt="Bot" className="w-8 h-8 rounded-full ring-2 ring-white" />
            )}

            {/* The Message Bubble */}
            <div className={`${bubbleClasses} ${isUser ? userClasses : botClasses}`}>
                <p className="text-sm leading-relaxed">{props.message}</p>
            </div>
            
            {/* User Avatar (only shows if it's the user) */}
            {isUser && (
                <img src={props.url} alt="User" className="w-8 h-8 rounded-full ring-2 ring-white" />
            )}
        </div>
    );
};
  const submitHandler = async (value) => {
    if (!value.trim()) return;

    const userMessage = {
      message: value,
      url: 'https://picsum.photos/200/300',
      sender: true,
    };
    props.setMessages([userMessage, ...messages], value);
    setIsLoading(true);

    const requestBody = {
      message: value,
      product_id: currentProductId, // Using dynamically extracted product ID
      session_id: 'test-session-123',
      user_context: {},
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/chat/ask', requestBody);
      const botMessage = {
        message: response.data.response || 'Sorry, no response.',
        url: bot.url || 'https://picsum.photos/200',
        sender: false,
      };
      props.setMessages([botMessage, userMessage, ...messages], value);
    } catch (error) {
      console.error('API error:', error);
      const errorMsg = {
        message: 'Something went wrong. Please try again.',
        url: bot.url || 'https://picsum.photos/200',
        sender: false,
      };
      props.setMessages([errorMsg, userMessage, ...messages], value);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputValue.trim()) {
        submitHandler(inputValue);
        setInputValue('');
      }
    }
  };

  return (
    <Wrapper className="chat flex flex-col flex-1 h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Enhanced Header */}
      <div className="flex max-h-20 sm:items-center justify-between p-4 bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img 
              src={bot.url} 
              alt="" 
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full ring-2 ring-emerald-300 shadow-lg" 
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
          </div>
          <div className="flex flex-col leading-tight">
            <div className="text-lg sm:text-xl mt-1 flex items-center">
              <span className="text-gray-800 mr-2 font-semibold">{bot.name}</span>
              <SparklesIcon className="w-5 h-5 text-emerald-500" />
            </div>
            <span className="text-sm text-gray-600 flex items-center">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
              {bot.profile} 
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-300 ease-in-out text-gray-500 hover:bg-red-50 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
            onClick={() => props.closeMessage()}
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Enhanced Messages Area */}
<div className="chat-message overflow-y-scroll overflow-x-hidden p-6 flex flex-col-reverse flex-grow"> 
        {messages.map((ele, index) => (
          <MessageCard
            key={index}
            url={ele.url}
            message={ele.message}
            sender={ele.sender}
          />
        ))}
        {isLoading && (
          <div className="bot flex mb-4 items-end">
            <img src={bot.url} alt="Bot" className="w-8 h-8 rounded-full ring-2 ring-emerald-300" />
            <div className="flex flex-col space-y-2 text-xs sm:text-base max-w-xs mx-2 items-start">
              <div>
                <p className="px-4 py-3 rounded-2xl bg-white text-gray-600 italic shadow-lg border border-gray-100">
                  <span className="inline-flex items-center">
                    <span className="animate-bounce mr-1">●</span>
                    <span className="animate-bounce mr-1" style={{ animationDelay: '0.1s' }}>●</span>
                    <span className="animate-bounce mr-2" style={{ animationDelay: '0.2s' }}>●</span>
                    Typing...
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Input Form */}
      <form
        className="flex-shrink bg-white/80 backdrop-blur-sm border-t border-gray-200/50 p-4 shadow-sm"
        onSubmit={(e) => {
          e.preventDefault();
          if (inputValue.trim()) {
            submitHandler(inputValue);
            setInputValue('');
          }
        }}
      >
        <div className="relative flex items-center">
          <span className="absolute left-3 flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full h-8 w-8 transition duration-300 ease-in-out text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <EmojiHappyIcon className="h-5 w-5" />
            </button>
          </span>
          <input
            type="text"
            placeholder="Ask me anything about this product..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="w-full focus:outline-none focus:ring-2 focus:ring-indigo-300 text-gray-700 placeholder-gray-500 pl-12 pr-14 bg-gray-50 rounded-full py-3 sm:py-4 border border-gray-200 transition-all duration-200 hover:bg-gray-100 disabled:opacity-50"
          />
          <div className="absolute right-2 flex items-center">
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="inline-flex items-center justify-center rounded-full h-10 w-10 sm:h-12 sm:w-12 transition duration-300 ease-in-out text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              <PaperAirplaneIcon className="h-5 w-5 sm:h-6 sm:w-6 transform rotate-45" />
            </button>
          </div>
        </div>
        <div className="flex pt-2 justify-between items-center">
          <span className="text-xs text-gray-500">
            Product ID: {currentProductId || 'Loading...'}
          </span>
          <a href="#" className="text-gray-400 text-xs hover:text-indigo-500 transition-colors">
            by Wali.io
          </a>
        </div>
      </form>
    </Wrapper>
  );
}

export default Chat;

const Wrapper = styled.div`
  .chat-message::-webkit-scrollbar {
    width: 0.25rem;
  }
  .chat-message::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 0.5rem;
  }
  .chat-message::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #6366f1, #8b5cf6);
    border-radius: 0.5rem;
  }
  .chat-message::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #4f46e5, #7c3aed);
  }
  
  /* Custom animations */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .chat-message > div {
    animation: fadeIn 0.3s ease-out;
  }
`;