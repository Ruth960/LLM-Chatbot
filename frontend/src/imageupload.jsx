import React, { useState, useRef } from 'react'
import {
  UploadCloudIcon,
  CameraIcon,
  ImageIcon,
  Loader2Icon,
} from 'lucide-react'
const ImageUpload = ({ onImageSubmit, isAnalyzing }) => {
  const [dragActive, setDragActive] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const fileInputRef = useRef(null)
  const cameraInputRef = useRef(null)
  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }
  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageSelection(e.dataTransfer.files[0])
    }
  }
  const handleImageSelection = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file)
      const imageUrl = URL.createObjectURL(file)
      setPreviewUrl(imageUrl)
    }
  }
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleImageSelection(e.target.files[0])
    }
  }
  const handleUploadClick = () => {
    fileInputRef.current.click()
  }
  const handleCameraClick = () => {
    cameraInputRef.current.click()
  }
  const handleSubmit = () => {
    if (selectedImage) {
      onImageSubmit(selectedImage)
    }
  }
  const resetSelection = () => {
    setSelectedImage(null)
    setPreviewUrl(null)
  }
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {!selectedImage ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${dragActive ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <UploadCloudIcon className="mx-auto h-12 w-12 text-green-600" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            Upload a plant image
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Drag and drop an image here, or click to select a file
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <button
              type="button"
              onClick={handleUploadClick}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center gap-2"
            >
              <ImageIcon className="h-5 w-5" />
              Select Image
            </button>
            <button
              type="button"
              onClick={handleCameraClick}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center gap-2"
            >
              <CameraIcon className="h-5 w-5" />
              Take Photo
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative">
            <img
              src={previewUrl}
              alt="Plant preview"
              className="w-full h-64 object-contain rounded-lg border border-gray-200"
            />
            <button
              onClick={resetSelection}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <button
            onClick={handleSubmit}
            disabled={isAnalyzing}
            className={`w-full py-2 rounded-md flex items-center justify-center gap-2 ${isAnalyzing ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} text-white`}
          >
            {isAnalyzing ? (
              <>
                <Loader2Icon className="h-5 w-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>Analyze Plant</>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
export default ImageUpload
