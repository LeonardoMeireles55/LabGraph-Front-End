import { InputFieldProps } from '@/components/auth/types/Auth';
import React from 'react';

const InputField: React.FC<InputFieldProps> = ({
  id,
  type,
  label,
  value,
  onChange,
  autocomplete,
}) => {
  return (
    <div className='space-y-2'>
      <label htmlFor={id} className='block text-sm font-medium text-bgText transition-colors'>
        {label}
      </label>
      <input
        type={type}
        id={id}
        autoComplete={autocomplete ?? 'off'}
        value={value}
        onChange={onChange}
        className='placeholder:text-gray-400 hover:border-textPrimary/50 focus:ring-textPrimary/30 w-full rounded-lg border border-borderColor bg-surface p-3 text-bgText transition-all duration-200 ease-in-out focus:border-textPrimary focus:outline-none focus:ring-1'
        required
      />
    </div>
  );
};

export default InputField;
