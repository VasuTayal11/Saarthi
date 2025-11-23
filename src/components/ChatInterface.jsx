import React, { useState, useRef, useEffect } from 'react';

// Added default empty array for messages to prevent crash if undefined
const ChatInterface = ({ messages = [], onSendMessage, isLoading }) => {
  const [inputMessage, setInputMessage] = useState('');
  
  // Refs for auto-scrolling and input focus
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]); // Scroll when messages OR loading state changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() && !isLoading) {
      await onSendMessage(inputMessage);
      setInputMessage('');
      // Focus back on input after sending
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleSuggestedClick = (question) => {
    setInputMessage(question);
    // Focus using Ref instead of ID
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const suggestedQuestions = [
    "इस दस्तावेज़ का मुख्य विषय क्या है?",
    "मुख्य बिंदु समझाएं",
    "इससे मुझे क्या याद रखना चाहिए?",
    "विस्तार से समझाएं"
  ];

  // Helper to safely format time
  const formatTime = (timestamp) => {
    if (!timestamp) return new Date().toLocaleTimeString();
    try {
      return new Date(timestamp).toLocaleTimeString();
    } catch (e) {
      return "";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden h-[600px] flex flex-col">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-primary-500 to-purple-600 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="bg-white p-2 rounded-xl">
            <span className="text-primary-600 text-xl">🤖</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">सारथी AI सहायक</h2>
            <p className="text-primary-100 text-sm">अपने PDF के बारे में हिंदी में कुछ भी पूछें</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">सारथी AI में आपका स्वागत है!</h3>
            <p className="text-gray-600 mb-6">मैं आपके PDF दस्तावेज़ों को समझने में मदद कर सकता हूं। इनमें से कोई प्रश्न पूछें:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedClick(question)}
                  className="bg-white border border-gray-200 rounded-lg p-3 text-sm text-gray-700 hover:border-primary-300 hover:shadow-md transition-all duration-200 text-left"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start space-x-3 ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user'
                    ? 'bg-primary-500'
                    : 'bg-gradient-to-r from-green-500 to-blue-500'
                }`}
              >
                {message.sender === 'user' ? (
                  <span className="text-white text-sm">👤</span>
                ) : (
                  <span className="text-white text-sm">🤖</span>
                )}
              </div>
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-primary-500 text-white rounded-tr-none'
                    : 'bg-white border border-gray-200 rounded-tl-none shadow-sm'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.text}</p>
                <div
                  className={`text-xs mt-2 ${
                    message.sender === 'user' ? 'text-primary-100' : 'text-gray-500'
                  }`}
                >
                  {/* Fixed: Safe time formatting */}
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-green-500 to-blue-500">
              <span className="text-white text-sm">🤖</span>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <form onSubmit={handleSubmit} className="flex space-x-3">
          <input
            ref={inputRef} // Fixed: Using Ref instead of ID
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="अपने PDF के बारे में पूछें... (केवल हिंदी में)"
            className="flex-1 border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 text-white p-3 rounded-2xl transition-colors duration-200 shadow-md disabled:shadow-none"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <span className="text-lg">📤</span>
            )}
          </button>
        </form>
        <div className="text-xs text-gray-500 text-center mt-2">
          सारथी केवल हिंदी समझता है। आपकी चैट आपके ब्राउज़र में स्थानीय रूप से संग्रहीत है।
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;