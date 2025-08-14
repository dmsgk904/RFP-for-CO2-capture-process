import React, { useState } from 'react';
import { RfpData } from '../types';
import SectionHeader from '../components/SectionHeader';
import AiButton from '../components/AiButton';
import { generateRfpContent } from '../services/geminiService';

interface Props {
  rfpData: RfpData;
  setRfpData: React.Dispatch<React.SetStateAction<RfpData>>;
}

const IntroductionSection: React.FC<Props> = ({ rfpData, setRfpData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setIsLoading(true);
    setError('');
    const prompt = `Generate a professional "Introduction" section for a Request for Proposal (RFP) issued by ${rfpData.companyName}. The project is named "${rfpData.projectName}". The goal is to select a licensor for a CO₂ capture process. The intended application is post-combustion capture from a gas-fired power plant. Provide context on the project's importance and key objectives. The output should be a well-structured paragraph.`;

    try {
      const content = await generateRfpContent(prompt);
      setRfpData(prev => ({ ...prev, introduction: content }));
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="p-6 bg-white rounded-lg shadow-md border border-slate-200">
      <SectionHeader number={1} title="Introduction" />
      <p className="text-slate-600 mb-4 text-sm">
        Briefly describe the project background, goals, and rationale for issuing the RFP. Define the intended application of the CO₂ capture technology (e.g., post-combustion, pre-combustion, flue gas treatment). Provide context on project location and key objectives.
      </p>
      
      <div className="flex justify-end mb-2">
        <AiButton onClick={handleGenerate} isLoading={isLoading} />
      </div>

      <textarea
        value={rfpData.introduction}
        onChange={(e) => setRfpData(prev => ({ ...prev, introduction: e.target.value }))}
        placeholder="Describe the project introduction and purpose here..."
        className="w-full h-48 px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </section>
  );
};

export default IntroductionSection;