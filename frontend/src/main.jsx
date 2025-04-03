import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { AlertTriangleIcon, CheckCircleIcon, ArrowLeftIcon } from 'lucide-react';

const ResultsDisplay = ({ result, onReset }) => {
  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'green';
    if (confidence >= 75) return 'yellow';
    return 'red';
  };

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
      <div style={{ backgroundColor: '#22c55e', padding: '1rem 1.5rem', color: 'white' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Analysis Results</h2>
      </div>
      <div style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
          {result.confidence >= 80 ? (
            <CheckCircleIcon style={{ height: '2.5rem', width: '2.5rem', color: '#22c55e', flexShrink: 0 }} />
          ) : (
            <AlertTriangleIcon style={{ height: '2.5rem', width: '2.5rem', color: '#facc15', flexShrink: 0 }} />
          )}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#2d3748' }}>{result.name}</h3>
            <div style={{ marginTop: '0.25rem', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '0.875rem', color: '#718096', marginRight: '0.5rem' }}>Confidence:</span>
              <span style={{ fontWeight: '500', color: getConfidenceColor(result.confidence) }}>
                {result.confidence}%
              </span>
            </div>
          </div>
        </div>
        <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h4 style={{ fontWeight: '500', color: '#2d3748' }}>Description</h4>
            <p style={{ marginTop: '0.25rem', color: '#4a5568' }}>{result.description}</p>
          </div>
          <div>
            <h4 style={{ fontWeight: '500', color: '#2d3748' }}>Recommended Treatment</h4>
            <p style={{ marginTop: '0.25rem', color: '#4a5568' }}>{result.treatment}</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
          <button
            onClick={onReset}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#22c55e', cursor: 'pointer' }}
          >
            <ArrowLeftIcon style={{ height: '1rem', width: '1rem' }} />
            Analyze another plant
          </button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setResult({
        name: 'Example Disease',
        confidence: Math.floor(Math.random() * (100 - 60 + 1)) + 60, // Random confidence between 60 and 100
        description: 'This is a sample description of the disease.',
        treatment: 'Sample treatment recommendation.',
      });
    }
  };

  const handleTakePhoto = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          const video = document.createElement('video');
          video.srcObject = stream;
          video.play();
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          video.addEventListener('loadeddata', () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/png');
            setSelectedImage(dataUrl);
            setResult({
              name: 'Example Disease',
              confidence: Math.floor(Math.random() * (100 - 60 + 1)) + 60, // Random confidence between 60 and 100
              description: 'This is a sample description of the disease.',
              treatment: 'Sample treatment recommendation.',
            });
            stream.getTracks().forEach((track) => track.stop());
          });
        })
        .catch((err) => {
          console.error('Could not access camera: ', err);
          alert('Could not access camera.');
        });
    } else {
      alert('Camera not supported.');
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setResult(null);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb', padding: '1rem' }}>
      <div style={{ width: '100%', maxWidth: '36rem' }}>
        {selectedImage ? (
          <ResultsDisplay result={result} onReset={handleReset} />
        ) : (
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Telephone farming Cortana</h1>
              <p style={{ color: '#4a5568', marginBottom: '1.5rem' }}>
                Upload or take a picture of your crop, and our system will  identify potential diseases or pests and give you a solution.
              </p>
              <div style={{ border: '2px dashed #cbd5e0', borderRadius: '8px', padding: '1.5rem', marginBottom: '1rem' }}>
                {selectedImage ? (
                  <img src={selectedImage} alt="Uploaded Plant" style={{ maxWidth: '100%', maxHeight: '12rem', margin: '0 auto' }} />
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ height: '3rem', width: '3rem', color: '#cbd5e0' }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L4 8m4-4v12"
                      />
                    </svg>
                    <p style={{ color: '#718096', marginTop: '0.5rem' }}>Upload a plant image</p>
                    <p style={{ color: '#718096' }}>Drag and drop an image here, or click to select a file</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleImageUpload}
                />
                <button
                  style={{ marginTop: '1rem', backgroundColor: '#22c55e', color: 'white', borderRadius: '6px', padding: '0.5rem 1rem', width: '100%', cursor: 'pointer' }}
                  onClick={() => fileInputRef.current.click()}
                >
                  Select Image
                </button>
                <button
                  style={{ marginTop: '0.5rem', backgroundColor: '#22c55e', color: 'white', borderRadius: '6px', padding: '0.5rem 1rem', width: '100%', cursor: 'pointer' }}
                  onClick={handleTakePhoto}
                >
                  Take Photo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);