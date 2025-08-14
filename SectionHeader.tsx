import React from 'react';

interface SectionHeaderProps {
  number: number | string;
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ number, title }) => (
  <div className="mb-4 pb-2 border-b-2 border-slate-300">
    <h2 className="text-2xl font-bold text-slate-800">
      {number}. {title}
    </h2>
  </div>
);

export default SectionHeader;
