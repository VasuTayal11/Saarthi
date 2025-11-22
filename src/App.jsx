import React, { useState } from 'react';
import Header from './components/Header';
import PDFUpload from './components/PDFUpload';
import ChatInterface from './components/ChatInterface';
import SummaryDisplay from './components/SummaryDisplay';
import { useChat } from './hooks/useChat';
import { getStoredData, clearStoredData } from './utils/storage';

function App() {
  const [activeTab, setActiveTab] = useState('upload');
  const [summary, setSummary] = useState(null);
  const { messages, sendMessage, isLoading } = useChat();

  const handlePDFProcessed = (summaryData) => {
    setSummary(summaryData);
    setActiveTab('summary');
  };

  const handleClearStorage = () => {
    clearStoredData();
    setSummary(null);
    window.location.reload();
  };

  const hasStoredData = getStoredData('chat_messages') || getStoredData('pdf_summary');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-1 shadow-lg border border-gray-200">
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'upload'
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-primary-500'
              }`}
            >
              📁 PDF अपलोड करें
            </button>
            <button
              onClick={() => setActiveTab('summary')}
              disabled={!summary}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'summary'
                  ? 'bg-primary-500 text-white shadow-md'
                  : summary 
                    ? 'text-gray-600 hover:text-primary-500'
                    : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              📝 सारांश
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              disabled={!summary}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'chat'
                  ? 'bg-primary-500 text-white shadow-md'
                  : summary 
                    ? 'text-gray-600 hover:text-primary-500'
                    : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              💬 सारथी से बात करें
            </button>
          </div>
        </div>

        {/* Clear Storage Button */}
        {hasStoredData && (
          <div className="text-center mb-6">
            <button
              onClick={handleClearStorage}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300 shadow-md"
            >
              🗑️ सभी डेटा साफ करें
            </button>
          </div>
        )}

        {/* Content Sections */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'upload' && (
            <PDFUpload onPDFProcessed={handlePDFProcessed} />
          )}
          
          {activeTab === 'summary' && summary && (
            <SummaryDisplay summary={summary} />
          )}
          
          {activeTab === 'chat' && (
            <div>
              {summary ? (
                <ChatInterface 
                  messages={messages}
                  onSendMessage={sendMessage}
                  isLoading={isLoading}
                />
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 text-center">
                  <div className="text-4xl mb-4">⚠️</div>
                  <h3 className="text-xl font-semibold text-yellow-800 mb-2">
                    पहले PDF अपलोड करें
                  </h3>
                  <p className="text-yellow-600">
                    चैट का उपयोग करने के लिए कृपया पहले एक PDF दस्तावेज़ अपलोड करें।
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;