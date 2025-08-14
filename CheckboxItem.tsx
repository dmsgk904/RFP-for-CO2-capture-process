import React from 'react';

interface CheckboxItemProps {
  label: string;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckboxItem: React.FC<CheckboxItemProps> = ({ label, isChecked, onChange }) => (
  <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-md border border-slate-200 hover:bg-slate-100 transition cursor-pointer">
    <input
      type="checkbox"
      checked={isChecked}
      onChange={(e) => onChange(e.target.checked)}
      className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
    />
    <span className="text-slate-700">{label}</span>
  </label>
);

export default CheckboxItem;
