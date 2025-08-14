import React, { useState } from 'react';
import { RfpData } from '../types';
import { DELIVERABLES_LIST, COMMERCIAL_TERMS_LIST } from '../constants';
import Modal from '../components/Modal';
import { WordCopyPreview } from './WordCopyPreview';

interface RfpPreviewProps {
  data: RfpData;
  onBackToEditor: () => void;
}

const PreviewSection: React.FC<{ number: number | string, title: string, children: React.ReactNode }> = ({ number, title, children }) => (
    <section className="mb-10 break-inside-avoid">
        <div className="mb-4 pb-2 border-b-2 border-slate-900">
            <h2 className="text-3xl font-bold text-slate-900">{number}. {title}</h2>
        </div>
        <div className="space-y-4 text-base">
            {children}
        </div>
    </section>
);

const SubPreviewSection: React.FC<{ number: string, title: string, children: React.ReactNode }> = ({ number, title, children }) => (
    <div className="mb-8 break-inside-avoid">
        <div className="mb-4 pb-2 border-b border-slate-300">
            <h3 className="text-2xl font-semibold text-slate-800">{number}. {title}</h3>
        </div>
        <div className="space-y-4 text-sm">
            {children}
        </div>
    </div>
);

const formatDateTime = (dateString: string) => {
    if (!dateString || isNaN(new Date(dateString).getTime())) return 'Not specified';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const formatDateOnly = (dateString: string) => {
    if (!dateString || isNaN(new Date(dateString).getTime())) return 'TBD';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const RfpPreview: React.FC<RfpPreviewProps> = ({ data, onBackToEditor }) => {
    const [isWordModalOpen, setIsWordModalOpen] = useState(false);

    const handlePrint = () => {
        window.print();
    };

    const evaluationCriteria = [
        { name: 'technicalFeasibility', title: 'Technical Feasibility', points: ['Proven technology and operational experience', 'Compliance with technical requirements'] },
        { name: 'references', title: 'References', points: ['List of similar projects and client testimonials'] },
        { name: 'cost', title: 'Cost', points: ['Total installed cost estimate', 'Operating and maintenance cost projections'] },
        { name: 'scheduleAdherence', title: 'Schedule Adherence', points: ['Proposed project execution timeline', 'Demonstrated ability to meet project milestones'] },
        { name: 'esg', title: 'ESG Considerations', points: ['Environmental impact assessment', 'Social and governance policies'] },
    ] as const;
    
    const inlineHeadingStyle = "text-xl font-semibold text-slate-800 mt-8 mb-4 border-b pb-2";

    return (
        <div className="bg-slate-200 font-sans">
            <div className="max-w-4xl mx-auto p-4 sm:p-8 print:hidden">
                <div className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center">
                    <h1 className="text-xl font-bold text-slate-700">RFP Preview & Export</h1>
                    <div className="flex gap-4">
                        <button onClick={onBackToEditor} className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-200 rounded-md hover:bg-slate-300 transition">
                            Back to Editor
                        </button>
                        <button 
                            onClick={() => setIsWordModalOpen(true)} 
                            className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 transition"
                        >
                            Copy for Word
                        </button>
                        <button onClick={handlePrint} className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition">
                            Print / Save as PDF
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto p-8 sm:p-12 bg-white shadow-2xl print:shadow-none print:p-2 text-slate-700 leading-relaxed">
                <header className="text-center mb-12 border-b-4 border-slate-800 pb-6">
                    <p className="text-xl text-slate-500 font-semibold">Request for Proposal (RFP)</p>
                    <h1 className="text-4xl font-bold text-slate-900 mt-2 tracking-tight">{data.projectName}</h1>
                    <p className="text-lg text-slate-700 mt-4">Issued by: {data.companyName}</p>
                    <p className="text-lg text-slate-700 mt-1">CO₂ Capture Capacity Target: <strong>{data.co2CaptureCapacity || 'N/A'} TPD</strong></p>
                </header>

                <main>
                    <PreviewSection number={1} title="Introduction">
                        <p className="whitespace-pre-wrap">{data.introduction || 'Not provided.'}</p>
                    </PreviewSection>
                    
                    {data.abbreviations && data.abbreviations.length > 0 && (
                        <PreviewSection number={2} title="Abbreviations">
                            <table className="w-full text-sm text-left border-collapse">
                                <thead className="border-b-2 border-slate-400">
                                    <tr>
                                        <th className="p-2 w-1/4 font-semibold">Abbreviation</th>
                                        <th className="p-2 font-semibold">Full Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.abbreviations.map(abbr => (
                                        <tr key={abbr.id} className="border-b border-slate-200">
                                            <td className="p-2 font-semibold">{abbr.abbr}</td>
                                            <td className="p-2">{abbr.fullName}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </PreviewSection>
                    )}

                    <PreviewSection number={3} title="Scope of Work (SOW)">
                        <p className="whitespace-pre-wrap">{data.scopeOfWork || 'Not provided.'}</p>
                        
                        {data.blockFlowDiagram && (
                            <div className="mt-6 break-inside-avoid">
                                <h3 className={inlineHeadingStyle}>Block Flow Diagram</h3>
                                <img src={data.blockFlowDiagram} alt="Block Flow Diagram" className="max-w-full rounded-md border border-slate-300" />
                            </div>
                        )}

                        <h3 className={inlineHeadingStyle}>Feed Gas Composition</h3>
                        <table className="w-full text-sm text-left border-collapse">
                            <thead className="border-b-2 border-slate-400">
                                <tr>
                                    <th className="p-2 w-2/5 font-semibold">Description</th>
                                    <th className="p-2 font-semibold">Unit</th>
                                    <th className="p-2 font-semibold">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.feedstocks.map(f => {
                                    if (f.type === 'spacer') return <tr key={f.id}><td colSpan={3} className="py-1 bg-slate-50"></td></tr>;
                                    if (f.type === 'header') return <tr key={f.id}><td colSpan={3} className="p-2 pt-3 font-bold text-slate-800">{f.description}</td></tr>;
                                    return (
                                        <tr key={f.id} className="border-b border-slate-200">
                                            <td className={`p-2 ${f.isSubItem ? 'pl-6' : ''}`}>{f.description}</td>
                                            <td className="p-2">{f.unit}</td>
                                            <td className="p-2 font-mono">{f.value}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <p className="mt-2 text-sm text-slate-600 italic">
                            Note: Licensor shall provide the feedstock contamintants limitations of CO2 capturing unit.
                        </p>
                        
                        <h3 className={inlineHeadingStyle}>Utility Supply Condition</h3>
                        <p className="mb-4">
                            The design of the unit shall be based on available utilities and off-sites. All utilities, off-sites, and their properties and battery limit specifications are described in the design basis. The following utilities will be available:
                        </p>
                        <ul className="list-disc list-inside space-y-2 pl-2">
                            {data.utilities
                                .filter(u => u.selected)
                                .map(u => (
                                    <li key={u.id}>
                                        <strong>{u.name}:</strong> {u.condition}
                                    </li>
                                ))
                            }
                            {data.utilities.filter(u => u.selected).length === 0 && (
                                <p className="text-slate-500 italic">No specific utilities selected.</p>
                            )}
                        </ul>

                        <h3 className={inlineHeadingStyle}>Emission and Waste Treatment Requirements</h3>
                        <p className="whitespace-pre-wrap">{data.emissionRequirements || 'Not provided.'}</p>
                    </PreviewSection>

                    <PreviewSection number={4} title="Design Requirements">
                         <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-base">
                            <li className="flex justify-between border-b pb-2"><strong>Min. CO₂ Capture Efficiency:</strong> <span>{data.techReqs.captureEfficiency || 'N/A'} %</span></li>
                            <li className="flex justify-between border-b pb-2"><strong>Min. CO₂ Product Purity:</strong> <span>{data.techReqs.productPurity || 'N/A'} %</span></li>
                            <li className="flex justify-between border-b pb-2"><strong>Plant Operational Lifetime:</strong> <span>{data.techReqs.lifetime || 'N/A'} years</span></li>
                            <li className="flex justify-between border-b pb-2"><strong>Flexibility (Turndown Ratio):</strong> <span>{data.techReqs.turndownRatio || 'N/A'} %</span></li>
                        </ul>
                    </PreviewSection>
                    
                    <PreviewSection number={5} title="Proposal Requirements">
                        <SubPreviewSection number="5.1" title="Deliverables">
                            <ul className="list-disc list-inside grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                                {DELIVERABLES_LIST.filter(item => data.deliverables[item]).map(item => <li key={item}>{item}</li>)}
                            </ul>
                        </SubPreviewSection>

                        <SubPreviewSection number="5.2" title="Submission & Evaluation">
                            <h4 className="text-lg font-semibold text-slate-800 mb-2">Submission Instructions</h4>
                            <ul className="space-y-1 mb-6">
                                <li><strong>Format:</strong> {data.submission.submissionFormat || 'Not specified'}</li>
                                <li><strong>Contact:</strong> {data.submission.contactPerson || 'Not specified'} ({data.submission.contactEmail || 'N/A'}, {data.submission.phone || 'N/A'})</li>
                                <li><strong>Deadline:</strong> {formatDateTime(data.submission.deadline)}</li>
                            </ul>
                            <h4 className="text-lg font-semibold text-slate-800 mb-2">Proposal Formatting</h4>
                            <p className="mb-6">Proposals shall be submitted in two separate parts: a technical proposal and a commercial proposal.</p>
                            <h4 className="text-lg font-semibold text-slate-800 mb-2">Evaluation Metrics</h4>
                            <div className="space-y-4">
                            {evaluationCriteria.map(metric => (
                                <div key={metric.name}>
                                    <h5 className="text-base font-semibold text-slate-800">{metric.title}</h5>
                                    <ul className="list-disc list-inside text-slate-600 pl-2">
                                        {metric.points.map(p => <li key={p}>{p}</li>)}
                                    </ul>
                                    {data.evaluationMetrics[metric.name] && <div className="mt-2 p-3 bg-slate-50 border-l-4 border-slate-300 whitespace-pre-wrap font-mono text-xs">{data.evaluationMetrics[metric.name]}</div>}
                                </div>
                            ))}
                            </div>
                        </SubPreviewSection>

                        <SubPreviewSection number="5.3" title="Project Timeline & Milestones">
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                                <li className="flex justify-between border-b pb-2"><strong>Proposal Submission Deadline:</strong> <span>{formatDateOnly(data.timeline.submissionDeadline)}</span></li>
                                <li className="flex justify-between border-b pb-2"><strong>Final Selection & Contract Award:</strong> <span>{formatDateOnly(data.timeline.contractAward)}</span></li>
                                <li className="flex justify-between border-b pb-2"><strong>Technical Clarification Period:</strong> <span>{data.timeline.clarificationPeriod || 'N/A'} weeks</span></li>
                                <li className="flex justify-between border-b pb-2"><strong>Evaluation & Shortlisting:</strong> <span>{data.timeline.evaluationPeriod || 'N/A'} weeks</span></li>
                            </ul>
                        </SubPreviewSection>

                        <SubPreviewSection number="5.4" title="Commercial Terms">
                             <p className="mb-4 font-semibold">Commercial Proposal will consist of the following as a minimum:</p>
                            <ul className="list-disc list-inside space-y-2">
                                {COMMERCIAL_TERMS_LIST.filter(item => data.commercialTerms[item]).map(item => <li key={item}>{item}</li>)}
                            </ul>
                        </SubPreviewSection>

                        <SubPreviewSection number="5.5" title="Annexes & Q&A">
                            <div className="space-y-4">
                                <div><h5 className="text-base font-semibold">Annex A: Feed Gas Specifications</h5><p className="whitespace-pre-wrap">{data.annexes.a}</p></div>
                                <div><h5 className="text-base font-semibold">Annex B: Design Basis Document</h5><p className="whitespace-pre-wrap">{data.annexes.b}</p></div>
                                <div><h5 className="text-base font-semibold">Annex C: Sample Contract Terms</h5><p className="whitespace-pre-wrap">{data.annexes.c}</p></div>
                                <div><h5 className="text-base font-semibold">Annex D: Proposal Submission Template</h5><p className="whitespace-pre-wrap">{data.annexes.d}</p></div>
                                <div className="pt-4"><h5 className="text-base font-semibold">Q&A Process</h5><p className="whitespace-pre-wrap">{data.qa}</p></div>
                            </div>
                        </SubPreviewSection>
                    </PreviewSection>
                </main>
                 <footer className="mt-12 pt-6 border-t border-slate-300 text-center text-xs text-slate-500">
                    <p>End of Document</p>
                </footer>
            </div>

            <Modal isOpen={isWordModalOpen} onClose={() => setIsWordModalOpen(false)} title="Copy Content for Microsoft Word">
                <WordCopyPreview data={data} />
            </Modal>
        </div>
    );
};
