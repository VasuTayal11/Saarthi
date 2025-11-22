import { useState, useEffect } from 'react';
import { getStoredData, setStoredData } from '../utils/storage';

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load messages from storage on component mount
  useEffect(() => {
    const storedMessages = getStoredData('chat_messages') || [];
    setMessages(storedMessages);
  }, []);

  const sendMessage = async (messageText) => {
    const userMessage = {
      text: messageText,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setStoredData('chat_messages', updatedMessages);
    
    setIsLoading(true);

    try {
      // Send message to backend
      const response = await fetch('https://f6ae1b0e8949.ngrok-free.app/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageText }),
      });

      const data = await response.json();

      const aiResponse = {
        text: data.success ? data.response : `त्रुटि: ${data.response}`,
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };

      const finalMessages = [...updatedMessages, aiResponse];
      setMessages(finalMessages);
      setStoredData('chat_messages', finalMessages);
    } catch (error) {
      const errorResponse = {
        text: 'सर्वर से कनेक्शन विफल। कृपया बाद में पुनः प्रयास करें।',
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };

      const finalMessages = [...updatedMessages, errorResponse];
      setMessages(finalMessages);
      setStoredData('chat_messages', finalMessages);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    sendMessage,
    isLoading,
  };
};