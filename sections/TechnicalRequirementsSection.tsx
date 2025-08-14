import React from 'react';
import { RfpData } from '../types';
import SectionHeader from '../components/SectionHeader';

interface Props {
  rfpData: RfpData;
  setRfpData: React.Dispatch<React.SetStateAction<RfpData>>;
}

const TechnicalRequirementsSection: React.FC<Props> = ({ rfpData, setRfpData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRfpData(prev => ({
      ...prev,
      techReqs: { ...prev.techReqs, [name]: value }
    }));
  };

  return (
    <section className="p-6 bg-white rounded-lg shadow-md border border-slate-200">
      <SectionHeader number={4} title="Design Requirements" />
      <p className="text-slate-600 mb-6 text-sm">
        Specify the technical criteria and performance guarantees expected.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="captureEfficiency" className="block text-md font-semibold text-slate-700 mb-1">Minimum CO₂ Capture Efficiency</label>
          <div className="flex items-center">
            <input
              id="captureEfficiency"
              name="captureEfficiency"
              type="number"
              value={rfpData.techReqs.captureEfficiency}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="e.g., 90"
            />
            <span className="inline-flex items-center px-3 text-slate-600 bg-slate-100 border border-l-0 border-slate-300 rounded-r-md h-full">%</span>
          </div>
        </div>

        <div>
          <label htmlFor="productPurity" className="block text-md font-semibold text-slate-700 mb-1">Minimum CO₂ Product Purity</label>
          <div className="flex items-center">
            <input
              id="productPurity"
              name="productPurity"
              type="number"
              step="0.1"
              value={rfpData.techReqs.productPurity}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="e.g., 99.5"
            />
            <span className="inline-flex items-center px-3 text-slate-600 bg-slate-100 border border-l-0 border-slate-300 rounded-r-md h-full">%</span>
          </div>
        </div>

        <div>
          <label htmlFor="lifetime" className="block text-md font-semibold text-slate-700 mb-1">Expected Plant Operational Lifetime</label>
          <div className="flex items-center">
            <input
              id="lifetime"
              name="lifetime"
              type="number"
              value={rfpData.techReqs.lifetime}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="e.g., 25"
            />
            <span className="inline-flex items-center px-3 text-slate-600 bg-slate-100 border border-l-0 border-slate-300 rounded-r-md h-full">years</span>
          </div>
        </div>

        <div>
          <label htmlFor="turndownRatio" className="block text-md font-semibold text-slate-700 mb-1">Flexibility (Turndown Ratio)</label>
          <div className="flex items-center">
            <input
              id="turndownRatio"
              name="turndownRatio"
              type="number"
              value={rfpData.techReqs.turndownRatio}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="e.g., 50"
            />
            <span className="inline-flex items-center px-3 text-slate-600 bg-slate-100 border border-l-0 border-slate-300 rounded-r-md h-full">%</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalRequirementsSection;