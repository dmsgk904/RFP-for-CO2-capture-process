import React from 'react';
import { RfpData } from '../types';
import { COMMERCIAL_TERMS_LIST } from '../constants';
import SectionHeader from '../components/SectionHeader';
import CheckboxItem from '../components/CheckboxItem';

interface Props {
  rfpData: RfpData;
  setRfpData: React.Dispatch<React.SetStateAction<RfpData>>;
}

const CommercialTermsSection: React.FC<Props> = ({ rfpData, setRfpData }) => {
  const handleCheckboxChange = (label: string, isChecked: boolean) => {
    setRfpData(prev => ({
      ...prev,
      commercialTerms: { ...prev.commercialTerms, [label]: isChecked }
    }));
  };

  return (
    <div>
      <SectionHeader number="5.4" title="Commercial Terms" />
      <p className="text-slate-600 mb-4 text-sm">
        Outline the commercial expectations and terms.
      </p>
      
      <h3 className="text-md font-semibold text-slate-700 mb-3">Commercial Proposal will consist of the following as a minimum:</h3>

      <div className="grid grid-cols-1 gap-4">
        {COMMERCIAL_TERMS_LIST.map((item) => (
          <CheckboxItem
            key={item}
            label={item}
            isChecked={rfpData.commercialTerms[item] ?? false}
            onChange={(isChecked) => handleCheckboxChange(item, isChecked)}
          />
        ))}
      </div>
    </div>
  );
};

export default CommercialTermsSection;