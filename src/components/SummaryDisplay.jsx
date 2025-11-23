import React from 'react';

const SummaryDisplay = ({ summary }) => {
  // Safety Check: If summary data is missing, don't render or crash
  if (!summary) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 text-center text-gray-500">
        Loading summary...
      </div>
    );
  }

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
        {/* Hindi Explanation */}
        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-green-600 p-2 rounded-lg">
              <span className="text-white font-bold">हिंदी</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Hindi Explanation</h3>
          </div>
          {/* FIXED: Removed dir="rtl" because Hindi is Left-to-Right */}
          <p className="text-gray-700 leading-relaxed text-lg">
            {summary.hindi || "हिंदी सारांश उपलब्ध नहीं है।"}
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-orange-600 text-lg">🌐</span>
              <h4 className="font-semibold text-gray-800">Summariser</h4>
            </div>
            <p className="text-sm text-gray-600">Get summaries in Hindi</p>
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