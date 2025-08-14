import React from 'react';
import { RfpData } from '../types';
import SectionHeader from '../components/SectionHeader';

interface Props {
  rfpData: RfpData;
  setRfpData: React.Dispatch<React.SetStateAction<RfpData>>;
}

const InputRow: React.FC<{label: string, name: keyof RfpData['submission'], value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder: string, type?: string}> = 
  ({ label, name, value, onChange, placeholder, type = "text" }) => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
        <label htmlFor={name} className="font-semibold text-slate-700 text-sm">{label}</label>
        <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            className="sm:col-span-2 w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm"
            placeholder={placeholder}
        />
    </div>
);

const EvaluationMetric: React.FC<{title: string, points: readonly string[], name: keyof RfpData['evaluationMetrics'], value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void}> = 
  ({ title, points, name, value, onChange }) => (
    <div>
        <h4 className="font-semibold text-slate-800 mb-2">{title}</h4>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-3 text-sm pl-2">
            {points.map((point, index) => <li key={index}>{point}</li>)}
        </ul>
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            className="w-full h-24 px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm"
            placeholder="Additional space for details..."
        />
    </div>
);


const SubmissionSection: React.FC<Props> = ({ rfpData, setRfpData }) => {
  const handleSubmissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRfpData(prev => ({
      ...prev,
      submission: { ...prev.submission, [name]: value }
    }));
  };

  const handleMetricsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRfpData(prev => ({
      ...prev,
      evaluationMetrics: { ...prev.evaluationMetrics, [name]: value }
    }));
  };

  const evaluationCriteria = [
    { name: 'technicalFeasibility', title: 'Technical Feasibility', points: ['Proven technology and operational experience', 'Compliance with technical requirements'] },
    { name: 'references', title: 'References', points: ['List of similar projects and client testimonials'] },
    { name: 'cost', title: 'Cost', points: ['Total installed cost estimate', 'Operating and maintenance cost projections'] },
    { name: 'scheduleAdherence', title: 'Schedule Adherence', points: ['Proposed project execution timeline', 'Demonstrated ability to meet project milestones'] },
    { name: 'esg', title: 'ESG Considerations', points: ['Environmental impact assessment', 'Social and governance policies'] },
  ] as const;

  return (
    <div>
      <SectionHeader number="5.2" title="Submission & Evaluation" />
      <p className="text-slate-600 mb-6 text-sm">
        This section provides detailed instructions on how proposals must be formatted and submitted, along with the specific criteria that will be used for evaluation.
      </p>

      <div className="space-y-8">
        <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-3">Submission Instructions</h3>
            <div className="space-y-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <InputRow label="Proposal Format" name="submissionFormat" value={rfpData.submission.submissionFormat} onChange={handleSubmissionChange} placeholder="e.g., PDF" />
                <InputRow label="Contact Person" name="contactPerson" value={rfpData.submission.contactPerson} onChange={handleSubmissionChange} placeholder="e.g., John Doe, Project Manager" />
                <InputRow label="Email" name="contactEmail" value={rfpData.submission.contactEmail} onChange={handleSubmissionChange} placeholder="e.g., john.doe@example.com" type="email" />
                <InputRow label="Phone" name="phone" value={rfpData.submission.phone} onChange={handleSubmissionChange} placeholder="e.g., +1 (555) 123-4567" type="tel" />
                <InputRow label="Deadline" name="deadline" value={rfpData.submission.deadline} onChange={handleSubmissionChange} placeholder="" type="datetime-local" />
            </div>
        </div>
        
        <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">Proposal Formatting</h3>
            <p className="text-sm text-slate-600 bg-slate-100 p-3 rounded-md">
                Proposals shall be submitted in two separate parts: a technical proposal and a commercial proposal.
            </p>
        </div>

        <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">Evaluation Metrics</h3>
            <p className="text-sm text-slate-600 mb-4">
                Proposals will be evaluated based on the following criteria. Please provide the requested information and use the additional space for further details.
            </p>
            <div className="space-y-6">
              {evaluationCriteria.map(metric => (
                  <EvaluationMetric
                      key={metric.name}
                      title={metric.title}
                      points={metric.points}
                      name={metric.name}
                      value={rfpData.evaluationMetrics[metric.name]}
                      onChange={handleMetricsChange}
                  />
              ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionSection;