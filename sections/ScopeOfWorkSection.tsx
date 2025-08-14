import React, { useState } from 'react';
import { RfpData, Feedstock } from '../types';
import SectionHeader from '../components/SectionHeader';
import AiButton from '../components/AiButton';
import { generateRfpContent } from '../services/geminiService';

interface Props {
  rfpData: RfpData;
  setRfpData: React.Dispatch<React.SetStateAction<RfpData>>;
}

const UploadIcon: React.FC = () => (
    <svg className="w-8 h-8 mb-2 text-slate-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
    </svg>
);

const ScopeOfWorkSection: React.FC<Props> = ({ rfpData, setRfpData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setIsLoading(true);
    setError('');
    const prompt = `Generate a "Scope of Work (SOW)" section for an RFP for a CO2 capture project. Describe the general scope, including requirements for handling feed gas, operating conditions, CO2 purity, and integration with other facilities. Mention common methods like amine-based solvents. Keep it concise.`;

    try {
      const content = await generateRfpContent(prompt);
      setRfpData(prev => ({ ...prev, scopeOfWork: content }));
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedstockChange = (id: string, field: 'description' | 'unit' | 'value', value: string) => {
    setRfpData(prev => ({
      ...prev,
      feedstocks: prev.feedstocks.map(f => f.id === id ? { ...f, [field]: value } : f)
    }));
  };
  
  const addFeedstockRow = () => {
    setRfpData(prev => ({
      ...prev,
      feedstocks: [...prev.feedstocks, { id: Date.now().toString(), description: '', unit: '', value: '', type: 'item' }]
    }));
  };

  const removeFeedstockRow = (id: string) => {
    setRfpData(prev => ({
      ...prev,
      feedstocks: prev.feedstocks.filter(f => f.id !== id)
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRfpData(prev => ({
          ...prev,
          blockFlowDiagram: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setRfpData(prev => ({
      ...prev,
      blockFlowDiagram: ''
    }));
    // Also reset the file input
    const input = document.getElementById('bfd-upload') as HTMLInputElement;
    if (input) {
        input.value = '';
    }
  };

  const handleUtilityChange = (id: string, field: 'selected' | 'condition', value: string | boolean) => {
    setRfpData(prev => ({
        ...prev,
        utilities: prev.utilities.map(u => u.id === id ? { ...u, [field]: value } : u)
    }));
  };

  return (
    <section className="p-6 bg-white rounded-lg shadow-md border border-slate-200">
      <SectionHeader number={3} title="Scope of Work (SOW)" />
      
      <p className="text-slate-600 mb-4 text-sm">
        Clearly define the extent of work required from the licensor. Include feed gas composition, operating conditions, capture capacity, purity levels, and integration needs.
      </p>

      <div className="flex justify-end mb-2">
        <AiButton onClick={handleGenerate} isLoading={isLoading} />
      </div>

      <textarea
        value={rfpData.scopeOfWork}
        onChange={(e) => setRfpData(prev => ({ ...prev, scopeOfWork: e.target.value }))}
        placeholder="Describe the scope of work..."
        className="w-full h-32 px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition mb-6"
      />
      {error && <p className="text-red-500 text-sm mt-2 mb-4">{error}</p>}
      
      <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-700 mb-2">Block Flow Diagram</h3>
          <p className="text-slate-600 mb-3 text-sm">
              Optionally, upload an image of the Block Flow Diagram (BFD) for better process visualization.
          </p>
          <div className="mt-2 p-4 border border-slate-200 rounded-lg bg-slate-50">
              <input
                  type="file"
                  id="bfd-upload"
                  className="hidden"
                  accept="image/png, image/jpeg, image/gif"
                  onChange={handleImageUpload}
              />
              {rfpData.blockFlowDiagram ? (
                  <div className="text-center">
                      <img src={rfpData.blockFlowDiagram} alt="Block Flow Diagram Preview" className="max-w-full max-h-80 mx-auto rounded-md border border-slate-300" />
                      <button 
                          onClick={removeImage}
                          className="mt-3 text-sm text-red-600 hover:text-red-800 font-semibold"
                      >
                          Remove Image
                      </button>
                  </div>
              ) : (
                  <label htmlFor="bfd-upload" className="cursor-pointer flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-300 rounded-lg hover:bg-slate-100 transition text-center p-4">
                      <UploadIcon />
                      <p className="mb-1 text-sm text-slate-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-slate-500">PNG, JPG, GIF</p>
                  </label>
              )}
          </div>
      </div>

      <h3 className="text-lg font-semibold text-slate-700 mt-6 mb-2">Feed Gas Composition</h3>
      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="w-full text-sm text-left text-slate-600">
            <thead className="text-xs text-slate-700 uppercase bg-slate-100">
                <tr>
                    <th scope="col" className="px-6 py-3 w-2/5">Description</th>
                    <th scope="col" className="px-6 py-3">Unit</th>
                    <th scope="col" className="px-6 py-3">Value</th>
                    <th scope="col" className="px-4 py-3 w-16"><span className="sr-only">Actions</span></th>
                </tr>
            </thead>
            <tbody>
                {rfpData.feedstocks.map((feedstock) => {
                    if (feedstock.type === 'spacer') {
                        return (
                            <tr key={feedstock.id} className="bg-slate-50">
                                <td colSpan={4} className="py-2"></td>
                            </tr>
                        );
                    }
                    if (feedstock.type === 'header') {
                        return (
                          <tr key={feedstock.id} className="bg-white border-b">
                              <td className="px-6 py-2 font-semibold text-slate-800" colSpan={4}>{feedstock.description}</td>
                          </tr>
                        );
                    }
                    // It's an 'item' row
                    return (
                        <tr key={feedstock.id} className="bg-white border-b hover:bg-slate-50">
                            <td className={`py-1 ${feedstock.isSubItem ? 'pl-10' : 'pl-6'}`}>
                                <input type="text" value={feedstock.description} onChange={e => handleFeedstockChange(feedstock.id, 'description', e.target.value)} className="w-full bg-transparent focus:outline-none focus:bg-slate-100 rounded px-2 py-1"/>
                            </td>
                            <td className="px-6 py-1">
                                <input type="text" value={feedstock.unit} onChange={e => handleFeedstockChange(feedstock.id, 'unit', e.target.value)} className="w-full bg-transparent focus:outline-none focus:bg-slate-100 rounded px-2 py-1"/>
                            </td>
                            <td className="px-6 py-1">
                                <input type="text" value={feedstock.value} onChange={e => handleFeedstockChange(feedstock.id, 'value', e.target.value)} className="w-full bg-transparent focus:outline-none focus:bg-slate-100 rounded px-2 py-1"/>
                            </td>
                            <td className="px-4 py-1 text-center">
                                {feedstock.type === 'item' && (
                                    <button onClick={() => removeFeedstockRow(feedstock.id)} className="text-red-500 hover:text-red-700 p-1 opacity-50 hover:opacity-100 transition-opacity" aria-label="Remove row">&#x2715;</button>
                                )}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
      </div>
      <button onClick={addFeedstockRow} className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-semibold">+ Add Item</button>
      <p className="mt-2 text-sm text-slate-500 italic">
        Note: Licensor shall provide the feedstock contamintants limitations of CO2 capturing unit.
      </p>


      <div className="mt-6">
          <h3 className="text-lg font-semibold text-slate-700 mb-2">Utility Supply Condition</h3>
          <p className="text-sm text-slate-600 mb-4">
              The design of the unit shall be based on available utilities and off-sites. All utilities, off-sites, and their properties and battery limit specifications are described in the design basis. 
              The following utilities will be available:
          </p>
          <div className="space-y-4">
              {rfpData.utilities.map((utility) => (
                  <div key={utility.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <label className="flex items-center gap-3 cursor-pointer">
                          <input
                              type="checkbox"
                              checked={utility.selected}
                              onChange={(e) => handleUtilityChange(utility.id, 'selected', e.target.checked)}
                              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="font-semibold text-slate-700">{utility.name}</span>
                      </label>
                      {utility.selected && (
                          <div className="mt-3 pl-8">
                              <label htmlFor={`utility-condition-${utility.id}`} className="block text-sm font-medium text-slate-600 mb-1">Condition</label>
                              <input
                                  id={`utility-condition-${utility.id}`}
                                  type="text"
                                  value={utility.condition}
                                  onChange={(e) => handleUtilityChange(utility.id, 'condition', e.target.value)}
                                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm"
                                  placeholder={utility.condition.startsWith('e.g.') ? utility.condition : "Describe condition..."}
                              />
                          </div>
                      )}
                  </div>
              ))}
          </div>
      </div>

      <div className="mt-6">
          <label className="block text-md font-semibold text-slate-700 mb-1">Emission and Waste Treatment Requirements</label>
          <textarea
              value={rfpData.emissionRequirements}
              onChange={(e) => setRfpData(prev => ({ ...prev, emissionRequirements: e.target.value }))}
              placeholder="Describe emission and waste treatment requirements..."
              className="w-full h-24 px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
      </div>

    </section>
  );
};

export default ScopeOfWorkSection;