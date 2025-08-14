import React from 'react';
import { SparklesIcon, LoadingSpinnerIcon } from './icons/AiIcons';

interface AiButtonProps {
  onClick: () => void;
  isLoading: boolean;
  text?: string;
}

const AiButton: React.FC<AiButtonProps> = ({ onClick, isLoading, text = 'AI Assist' }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-100 border border-blue-200 rounded-md hover:bg-blue-200 disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed transition"
    >
      {isLoading ? (
        <>
          <LoadingSpinnerIcon />
          Generating...
        </>
      ) : (
        <>
          <SparklesIcon />
          {text}
        </>
      )}
    </button>
  );
};

export default AiButton;
