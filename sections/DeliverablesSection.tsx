import React from 'react';
import { RfpData } from '../types';
import { DELIVERABLES_LIST } from '../constants';
import SectionHeader from '../components/SectionHeader';
import CheckboxItem from '../components/CheckboxItem';

interface Props {
  rfpData: RfpData;
  setRfpData: React.Dispatch<React.SetStateAction<RfpData>>;
}

const DeliverablesSection: React.FC<Props> = ({ rfpData, setRfpData }) => {
  const handleCheckboxChange = (label: string, isChecked: boolean) => {
    setRfpData(prev => ({
      ...prev,
      deliverables: { ...prev.deliverables, [label]: isChecked }
    }));
  };

  return (
    <div>
      <SectionHeader number="5.1" title="Deliverables" />
      <p className="text-slate-600 mb-6 text-sm">
        List all documentation and engineering deliverables required from the licensor.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {DELIVERABLES_LIST.map((item) => (
          <CheckboxItem
            key={item}
            label={item}
            isChecked={rfpData.deliverables[item] ?? false}
            onChange={(isChecked) => handleCheckboxChange(item, isChecked)}
          />
        ))}
      </div>
    </div>
  );
};

export default DeliverablesSection;