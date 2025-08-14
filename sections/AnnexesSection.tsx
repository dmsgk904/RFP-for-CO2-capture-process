import React from 'react';
import { RfpData } from '../types';
import SectionHeader from '../components/SectionHeader';

interface Props {
  rfpData: RfpData;
  setRfpData: React.Dispatch<React.SetStateAction<RfpData>>;
}

const AnnexesSection: React.FC<Props> = ({ rfpData, setRfpData }) => {
  const handleAnnexChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRfpData(prev => ({
      ...prev,
      annexes: { ...prev.annexes, [name]: value }
    }));
  };
  
  const handleQaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRfpData(prev => ({ ...prev, qa: e.target.value }));
  };

  return (
    <div>
      <SectionHeader number="5.5" title="Annexes & Q&A" />
      <p className="text-slate-600 mb-6 text-sm">
        Include supporting documents and define the query process.
      </p>

      <div className="space-y-4">
        <div>
          <label htmlFor="annexA" className="block text-md font-semibold text-slate-700 mb-1">Annex A: Feed Gas Specifications</label>
          <textarea
            id="annexA"
            name="a"
            value={rfpData.annexes.a}
            onChange={handleAnnexChange}
            className="w-full h-20 px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Details for Annex A..."
          />
        </div>
        <div>
          <label htmlFor="annexB" className="block text-md font-semibold text-slate-700 mb-1">Annex B: Design Basis Document</label>
          <textarea
            id="annexB"
            name="b"
            value={rfpData.annexes.b}
            onChange={handleAnnexChange}
            className="w-full h-20 px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Details for Annex B..."
          />
        </div>
        <div>
          <label htmlFor="annexC" className="block text-md font-semibold text-slate-700 mb-1">Annex C: Sample Contract Terms</label>
          <textarea
            id="annexC"
            name="c"
            value={rfpData.annexes.c}
            onChange={handleAnnexChange}
            className="w-full h-20 px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Details for Annex C..."
          />
        </div>
        <div>
          <label htmlFor="annexD" className="block text-md font-semibold text-slate-700 mb-1">Annex D: Proposal Submission Template</label>
          <textarea
            id="annexD"
            name="d"
            value={rfpData.annexes.d}
            onChange={handleAnnexChange}
            className="w-full h-20 px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Details for Annex D..."
          />
        </div>
        <div className="pt-4">
          <label htmlFor="qa" className="block text-md font-semibold text-slate-700 mb-1">Q&A Process</label>
          <textarea
            id="qa"
            name="qa"
            value={rfpData.qa}
            onChange={handleQaChange}
            className="w-full h-24 px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Describe the process for submitting questions and receiving answers..."
          />
        </div>
      </div>
    </div>
  );
};

export default AnnexesSection;