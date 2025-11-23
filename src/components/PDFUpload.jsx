import React, { useState, useEffect } from 'react';

const PDFUpload = ({ onPDFProcessed }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    return () => {};
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file) => {
    if (file.type !== 'application/pdf') {
      alert('कृपया एक PDF फ़ाइल अपलोड करें');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('pdf', file);

    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) return 90;
        return prev + 10;
      });
    }, 500);

    try {
      // NOTE: Ensure this matches your Ngrok URL exactly
      const response = await fetch('https://aydin-unstandardised-nonerroneously.ngrok-free.dev/upload-pdf', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      clearInterval(progressInterval);

      if (result.success) {
        setUploadProgress(100);
        
        setTimeout(() => {
          setIsUploading(false);
          
          let summaryData;

          // --- FIX IS HERE ---
          // Check if result.summary is already an object (from the new backend)
          if (result.summary && typeof result.summary === 'object') {
            summaryData = {
              english: result.summary.english || "PDF Processed.",
              hindi: result.summary.hindi || "दस्तावेज़ सफलतापूर्वक तैयार है।",
              keyPoints: result.summary.keyPoints || ["विश्लेषण पूर्ण हुआ", "AI तैयार है"]
            };
          } else {
            // Fallback if backend returns just a string
            summaryData = {
              english: "PDF successfully processed.",
              hindi: result.summary || "PDF सफलतापूर्वक प्रसंस्कृत किया गया।",
              keyPoints: [
                "दस्तावेज़ विश्लेषण पूर्ण हुआ",
                "AI अब प्रश्नों के उत्तर देने के लिए तैयार है"
              ]
            };
          }
          
          onPDFProcessed(summaryData); 
        }, 500);

      } else {
        setIsUploading(false);
        alert(`अपलोड विफल: ${result.message}`);
      }

    } catch (error) {
      clearInterval(progressInterval);
      setIsUploading(false);
      console.error(error);
      alert('सर्वर त्रुटि। कृपया सुनिश्चित करें कि Colab चल रहा है।');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
      <div className="text-center mb-8">
        <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">📄</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">अपना PDF अपलोड करें</h2>
        <p className="text-gray-600">एक PDF दस्तावेज़ अपलोड करें और सारथी आपको हिंदी में सारांश प्रदान करेगा</p>
      </div>

      {isUploading ? (
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">PDF विश्लेषण हो रहा है...</h3>
          <p className="text-xs text-gray-500 mb-4">(कृपया प्रतीक्षा करें)</p>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-primary-500 to-purple-600 h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">{uploadProgress}% पूर्ण</p>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
            isDragging
              ? 'border-primary-500 bg-primary-50 scale-105'
              : 'border-gray-300 hover:border-primary-400 hover:bg-primary-25'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-input').click()}
        >
          <div className="text-4xl mb-4">📤</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            अपना PDF यहाँ छोड़ें या ब्राउज़ करने के लिए क्लिक करें
          </h3>
          <p className="text-gray-500 mb-4">
            10MB तक की PDF फाइलें समर्थित हैं।
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 shadow-md">
            PDF फ़ाइल चुनें
          </button>
          <input
            id="file-input"
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="text-blue-600 font-bold text-lg mb-2">📚</div>
          <h4 className="font-semibold text-gray-800">स्मार्ट सारांश</h4>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-green-600 font-bold text-lg mb-2">🇮🇳</div>
          <h4 className="font-semibold text-gray-800">हिंदी व्याख्या</h4>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="text-purple-600 font-bold text-lg mb-2">💬</div>
          <h4 className="font-semibold text-gray-800">प्रश्नोत्तर</h4>
        </div>
      </div>
    </div>
  );
};

export default PDFUpload;