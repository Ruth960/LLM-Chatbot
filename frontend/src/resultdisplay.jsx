import React from 'react';
import { AlertTriangleIcon, CheckCircleIcon, ArrowLeftIcon } from 'lucide-react';
import PropTypes from 'prop-types'; // Add prop validation

const ResultsDisplay = ({ result, onReset }) => {
  // More granular confidence level assessment
  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 75) return 'text-yellow-600';
    if (confidence >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  // Handle potential missing data gracefully
  const {
    name = 'Unknown Plant',
    confidence = 0,
    description = 'No description available',
    treatment = 'No treatment information available'
  } = result || {};

  // Determine icon based on confidence
  const ResultIcon = confidence >= 80 ? CheckCircleIcon : AlertTriangleIcon;
  const iconColor = confidence >= 80 ? 'text-green-600' : 'text-yellow-600';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-2xl mx-auto">
      <div className="bg-green-700 px-6 py-4 text-white flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analysis Results</h2>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(confidence)} bg-white`}>
          {confidence}%
        </span>
      </div>
      <div className="p-6">
        <div className="flex items-start space-x-4 mb-6">
          <ResultIcon className={`h-10 w-10 ${iconColor} flex-shrink-0`} />
          <div>
            <h3 className="text-xl font-bold text-gray-900">{name}</h3>
            <div className="mt-1 flex items-center">
              <span className="text-sm text-gray-600 mr-2">Confidence:</span>
              <span className={`font-medium ${getConfidenceColor(confidence)}`}>
                {confidence}%
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="font-medium text-gray-900">Description</h4>
            <p className="mt-1 text-gray-700">{description}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="font-medium text-gray-900">Recommended Treatment</h4>
            <p className="mt-1 text-gray-700">{treatment}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <button
            onClick={onReset}
            className="flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors px-4 py-2 rounded-md hover:bg-green-50"
            aria-label="Analyze another plant"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Analyze another plant
          </button>
        </div>
      </div>
    </div>
  );
};

// Add prop validation
ResultsDisplay.propTypes = {
  result: PropTypes.shape({
    name: PropTypes.string,
    confidence: PropTypes.number,
    description: PropTypes.string,
    treatment: PropTypes.string
  }),
  onReset: PropTypes.func.isRequired
};

// Default props
ResultsDisplay.defaultProps = {
  result: {
    name: 'Unknown Plant',
    confidence: 0,
    description: 'No description available',
    treatment: 'No treatment information available'
  }
};

export default ResultsDisplay;