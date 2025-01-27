import { InputFieldProps } from '@/components/auth/types/Auth';
import React from 'react';

const InputField: React.FC<InputFieldProps> = ({
  id,
  type,
  label,
  value,
  onChange,
  autoCompleteProps,
}) => {
  return (
    <div className='space-y-0'>
      <label htmlFor={id} className='block text-xs sm:text-sm  text-textSecondary transition-colors'>
        {label}
      </label>
      <input
        type={type}
        id={id}
        autoComplete={autoCompleteProps ? 'off' : 'on'}
        value={value}
        onChange={onChange}
        className='placeholder:text-textSecondary hover:border-textPrimary focus:ring-textSecondary w-full rounded-lg border border-borderColor bg-surface p-1.5 text-bgText transition-all duration-200 ease-in-out focus:border-textPrimary focus:outline-none focus:ring-1'
        required
      />
    </div>
  );
};

export default InputField;
