import React from 'react';
import { RfpData } from '../types';
import SectionHeader from '../components/SectionHeader';

interface Props {
  rfpData: RfpData;
  setRfpData: React.Dispatch<React.SetStateAction<RfpData>>;
}

const AbbreviationsSection: React.FC<Props> = ({ rfpData, setRfpData }) => {
  const handleAbbrChange = (id: string, field: 'abbr' | 'fullName', value: string) => {
    setRfpData(prev => ({
      ...prev,
      abbreviations: prev.abbreviations.map(a => a.id === id ? { ...a, [field]: value } : a)
    }));
  };

  const addAbbrRow = () => {
    setRfpData(prev => ({
      ...prev,
      abbreviations: [...prev.abbreviations, { id: Date.now().toString(), abbr: '', fullName: '' }]
    }));
  };

  const removeAbbrRow = (id: string) => {
    setRfpData(prev => ({
      ...prev,
      abbreviations: prev.abbreviations.filter(a => a.id !== id)
    }));
  };

  return (
    <section className="p-6 bg-white rounded-lg shadow-md border border-slate-200">
      <SectionHeader number={2} title="Abbreviations" />
      <p className="text-slate-600 mb-4 text-sm">
        Define any abbreviations used throughout the document for clarity.
      </p>
      
      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="w-full text-sm text-left text-slate-600">
          <thead className="text-xs text-slate-700 uppercase bg-slate-100">
            <tr>
              <th scope="col" className="px-6 py-3 w-1/4">Abbreviation</th>
              <th scope="col" className="px-6 py-3">Full Name</th>
              <th scope="col" className="px-4 py-3 w-16"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {rfpData.abbreviations.map((abbr) => (
              <tr key={abbr.id} className="bg-white border-b hover:bg-slate-50">
                <td className="px-4 py-1">
                  <input
                    type="text"
                    value={abbr.abbr}
                    onChange={e => handleAbbrChange(abbr.id, 'abbr', e.target.value)}
                    className="w-full bg-transparent font-semibold focus:outline-none focus:bg-slate-100 rounded px-2 py-1"
                    placeholder="e.g., RFP"
                  />
                </td>
                <td className="px-4 py-1">
                  <input
                    type="text"
                    value={abbr.fullName}
                    onChange={e => handleAbbrChange(abbr.id, 'fullName', e.target.value)}
                    className="w-full bg-transparent focus:outline-none focus:bg-slate-100 rounded px-2 py-1"
                    placeholder="e.g., Request for Proposal"
                  />
                </td>
                <td className="px-4 py-1 text-center">
                  <button
                    onClick={() => removeAbbrRow(abbr.id)}
                    className="text-red-500 hover:text-red-700 p-1 opacity-50 hover:opacity-100 transition-opacity"
                    aria-label="Remove row"
                  >
                    &#x2715;
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={addAbbrRow} className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-semibold">
        + Add Abbreviation
      </button>
    </section>
  );
};

export default AbbreviationsSection;
