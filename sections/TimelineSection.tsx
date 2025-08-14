import React from 'react';
import { RfpData } from '../types';
import SectionHeader from '../components/SectionHeader';

interface Props {
  rfpData: RfpData;
  setRfpData: React.Dispatch<React.SetStateAction<RfpData>>;
}

const TimelineSection: React.FC<Props> = ({ rfpData, setRfpData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRfpData(prev => ({
      ...prev,
      timeline: { ...prev.timeline, [name]: value }
    }));
  };

  return (
    <div>
      <SectionHeader number="5.3" title="Project Timeline & Milestones" />
      <p className="text-slate-600 mb-6 text-sm">
        Provide key project dates and milestones.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="submissionDeadline" className="block text-md font-semibold text-slate-700 mb-1">Proposal Submission Deadline</label>
          <input
            id="submissionDeadline"
            name="submissionDeadline"
            type="date"
            value={rfpData.timeline.submissionDeadline}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
        <div>
          <label htmlFor="contractAward" className="block text-md font-semibold text-slate-700 mb-1">Final Selection & Contract Award</label>
          <input
            id="contractAward"
            name="contractAward"
            type="date"
            value={rfpData.timeline.contractAward}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
        <div>
          <label htmlFor="clarificationPeriod" className="block text-md font-semibold text-slate-700 mb-1">Technical Clarification Period</label>
          <div className="flex items-center">
            <input
              id="clarificationPeriod"
              name="clarificationPeriod"
              type="number"
              value={rfpData.timeline.clarificationPeriod}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="e.g., 2"
            />
            <span className="inline-flex items-center px-3 text-slate-600 bg-slate-100 border border-l-0 border-slate-300 rounded-r-md h-full">weeks</span>
          </div>
        </div>
        <div>
          <label htmlFor="evaluationPeriod" className="block text-md font-semibold text-slate-700 mb-1">Evaluation & Shortlisting</label>
          <div className="flex items-center">
            <input
              id="evaluationPeriod"
              name="evaluationPeriod"
              type="number"
              value={rfpData.timeline.evaluationPeriod}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="e.g., 4"
            />
            <span className="inline-flex items-center px-3 text-slate-600 bg-slate-100 border border-l-0 border-slate-300 rounded-r-md h-full">weeks</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;