import React from 'react';

const SummaryDisplay = ({ summary }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-purple-600 px-6 py-4">
        <div className="flex items-center space-x-3">
          <span className="text-white text-xl">📄</span>
          <h2 className="text-xl font-bold text-white">PDF Summary</h2>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* English Summary */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-blue-500 p-2 rounded-lg">
              <span className="text-white font-bold">EN</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">English Summary</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">{summary.english}</p>
        </div>

        {/* Hindi Explanation */}
        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-green-600 p-2 rounded-lg">
              <span className="text-white font-bold">हिंदी</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Hindi Explanation</h3>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg" dir="rtl">
            {summary.hindi}
          </p>
        </div>

        {/* Key Points */}
        <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-purple-600 text-lg">⭐</span>
            <h3 className="text-lg font-semibold text-gray-800">Key Points</h3>
          </div>
          <ul className="space-y-2">
            {summary.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1 flex-shrink-0">
                  {index + 1}
                </div>
                <span className="text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-orange-600 text-lg">🌐</span>
              <h4 className="font-semibold text-gray-800">Bilingual Support</h4>
            </div>
            <p className="text-sm text-gray-600">Get explanations in both English and Hindi</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg">💬</span>
              <h4 className="font-semibold text-gray-800">Chat Ready</h4>
            </div>
            <p className="text-sm text-gray-600">Ask more questions about your PDF in the chat</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryDisplay;