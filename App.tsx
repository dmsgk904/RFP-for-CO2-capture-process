import React, { useState } from 'react';
import { RfpData } from './types';
import { DELIVERABLES_LIST, COMMERCIAL_TERMS_LIST } from './constants';
import IntroductionSection from './sections/IntroductionSection';
import AbbreviationsSection from './sections/AbbreviationsSection';
import ScopeOfWorkSection from './sections/ScopeOfWorkSection';
import TechnicalRequirementsSection from './sections/TechnicalRequirementsSection';
import DeliverablesSection from './sections/DeliverablesSection';
import SubmissionSection from './sections/SubmissionSection';
import TimelineSection from './sections/TimelineSection';
import CommercialTermsSection from './sections/CommercialTermsSection';
import AnnexesSection from './sections/AnnexesSection';
import { HeaderIcon } from './components/icons/HeaderIcon';
import { RfpPreview } from './sections/RfpPreview';
import SectionHeader from './components/SectionHeader';

const initialDeliverables = DELIVERABLES_LIST.reduce((acc, item) => ({ ...acc, [item]: true }), {});
const initialCommercialTerms = COMMERCIAL_TERMS_LIST.reduce((acc, item) => ({ ...acc, [item]: true }), {});

const App: React.FC = () => {
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [rfpData, setRfpData] = useState<RfpData>({
    companyName: '',
    projectName: '',
    introduction: '',
    abbreviations: [
      { id: '1', abbr: 'RFP', fullName: 'Request for Proposal' },
      { id: '2', abbr: 'SOW', fullName: 'Scope of Work' },
      { id: '3', abbr: 'BFD', fullName: 'Block Flow Diagram' },
      { id: '4', abbr: 'TPD', fullName: 'Tonnes Per Day' },
    ],
    scopeOfWork: '',
    blockFlowDiagram: '',
    feedstocks: [
      { id: 'temp', description: 'Temperature', unit: 'deg C', value: '67.9', type: 'item' },
      { id: 'pres', description: 'Pressure', unit: 'kg/cm2g', value: 'Atm', type: 'item' },
      { id: 'flow', description: 'Mass Flowrate', unit: 'kg/h', value: '830,100', type: 'item' },
      { id: 'part', description: 'Particulate', unit: 'kg/h', value: '1.8', type: 'item' },
      { id: 'spc1', description: '', unit: '', value: '', type: 'spacer' },
      { id: 'comp', description: 'Composition', unit: '', value: '', type: 'header' },
      { id: 'co2', description: 'CO2', unit: 'mol%', value: '11.76', type: 'item', isSubItem: true },
      { id: 'o2', description: 'O2', unit: 'mol%', value: '2.21', type: 'item', isSubItem: true },
      { id: 'h2o', description: 'H2O', unit: 'mol%', value: '28.20', type: 'item', isSubItem: true },
      { id: 'n2', description: 'N2', unit: 'mol%', value: '57.82', type: 'item', isSubItem: true },
      { id: 'so2', description: 'SO2', unit: 'molppm', value: '0.5224', type: 'item', isSubItem: true },
      { id: 'co', description: 'CO', unit: 'molppm', value: '3.0235', type: 'item', isSubItem: true },
      { id: 'nox', description: 'NOx', unit: 'molppm', value: '34.9793', type: 'item', isSubItem: true },
    ],
    co2CaptureCapacity: '',
    utilities: [
      { id: 'steam', name: 'Superheated LP steam', selected: true, condition: 'e.g., 5.5 kg/cm2g @ 250 deg C' },
      { id: 'cooling_water', name: 'Process cooling water', selected: true, condition: 'e.g., Supply/Return 32/42 deg C' },
      { id: 'demin_water', name: 'Demineralized water', selected: false, condition: 'e.g., BFW quality' },
      { id: 'power', name: 'Electrical power', selected: true, condition: 'e.g., 440V / 380V / 220V, 3 Phase, 60Hz' },
    ],
    emissionRequirements: 'Must comply with local environmental regulations. Specify limits for NOx, SOx, and other pollutants.',
    techReqs: {
      captureEfficiency: '90',
      productPurity: '99.5',
      lifetime: '25',
      turndownRatio: '50',
    },
    deliverables: initialDeliverables,
    submission: {
      contactPerson: '',
      contactEmail: '',
      submissionFormat: 'PDF',
      phone: '',
      deadline: '',
    },
    evaluationMetrics: {
      technicalFeasibility: '',
      references: '',
      cost: '',
      scheduleAdherence: '',
      esg: '',
    },
    timeline: {
      submissionDeadline: '',
      clarificationPeriod: '2',
      evaluationPeriod: '4',
      contractAward: '',
    },
    commercialTerms: initialCommercialTerms,
    annexes: {
      a: 'Detailed feed gas composition, including trace components and expected variations.',
      b: 'Full design basis document including site conditions, battery limits, and integration points.',
      c: 'Draft contract terms and conditions for review.',
      d: 'Standard template for proposal submission format.',
    },
    qa: 'All questions must be submitted in writing to the designated contact person by the Q&A deadline. Responses will be distributed to all participating bidders.',
  });

  if (isPreviewing) {
    return <RfpPreview data={rfpData} onBackToEditor={() => setIsPreviewing(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      <main className="max-w-4xl mx-auto p-4 sm:p-8">
        <header className="mb-10 text-center border-b border-slate-300 pb-6">
          <div className="flex items-center justify-center gap-4">
            <HeaderIcon />
            <h1 className="text-4xl font-bold text-slate-800">RFP Generator</h1>
          </div>
          <p className="text-slate-600 mt-2">For CO₂ Capture Process Licensor</p>
        </header>

        <div className="mb-8 p-6 bg-white rounded-lg shadow-md border border-slate-200 space-y-6">
            <div>
                <label htmlFor="companyName" className="block text-lg font-semibold text-slate-700 mb-2">Company Name</label>
                <input
                    id="companyName"
                    type="text"
                    value={rfpData.companyName}
                    onChange={(e) => setRfpData(prev => ({ ...prev, companyName: e.target.value }))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Your Company Name"
                />
            </div>
            <div>
                <label htmlFor="projectName" className="block text-lg font-semibold text-slate-700 mb-2">Project Name</label>
                <input
                    id="projectName"
                    type="text"
                    value={rfpData.projectName}
                    onChange={(e) => setRfpData(prev => ({ ...prev, projectName: e.target.value }))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Example CO2 Capture Project"
                />
            </div>
             <div>
                <label htmlFor="co2CaptureCapacity" className="block text-lg font-semibold text-slate-700 mb-2">CO₂ Capture Capacity</label>
                <div className="flex">
                    <input
                        id="co2CaptureCapacity"
                        type="number"
                        value={rfpData.co2CaptureCapacity}
                        onChange={(e) => setRfpData(prev => ({ ...prev, co2CaptureCapacity: e.target.value }))}
                        className="w-full px-4 py-2 border border-r-0 border-slate-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="2500"
                    />
                    <span className="inline-flex items-center px-4 text-slate-600 bg-slate-100 border border-l-0 border-slate-300 rounded-r-md">
                        TPD
                    </span>
                </div>
            </div>
        </div>


        <div className="space-y-8">
          <IntroductionSection rfpData={rfpData} setRfpData={setRfpData} />
          <AbbreviationsSection rfpData={rfpData} setRfpData={setRfpData} />
          <ScopeOfWorkSection rfpData={rfpData} setRfpData={setRfpData} />
          <TechnicalRequirementsSection rfpData={rfpData} setRfpData={setRfpData} />

          <section className="p-6 bg-white rounded-lg shadow-md border border-slate-200">
            <SectionHeader number={5} title="Proposal Requirements" />
            <p className="text-slate-600 mb-6 text-sm">
                This part of the RFP outlines the required deliverables, submission instructions, evaluation criteria, timeline, and other commercial and legal terms.
            </p>
            <div className="space-y-8 border-t border-slate-200 pt-6">
                <DeliverablesSection rfpData={rfpData} setRfpData={setRfpData} />
                <SubmissionSection rfpData={rfpData} setRfpData={setRfpData} />
                <TimelineSection rfpData={rfpData} setRfpData={setRfpData} />
                <CommercialTermsSection rfpData={rfpData} setRfpData={setRfpData} />
                <AnnexesSection rfpData={rfpData} setRfpData={setRfpData} />
            </div>
          </section>
        </div>

        <footer className="mt-12 text-center">
            <button 
                onClick={() => setIsPreviewing(true)}
                className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 shadow-lg"
            >
                Preview & Export RFP
            </button>
            <p className="text-sm text-slate-500 mt-4">
                End of Document. Review all sections before exporting.
            </p>
        </footer>
      </main>
    </div>
  );
};

export default App;