import { InputFieldProps } from '@/components/authentication/types/Auth';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';

const InputField: React.FC<InputFieldProps> = ({
  id,
  type,
  label,
  value,
  onChange,
  placeholder,
  icon,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='space-y-0'>
      <label htmlFor={id} className='block text-xs sm:text-sm text-textSecondary transition-colors'>
        {label}
      </label>
      <div className='relative'>
        {icon && <div className='absolute left-3 top-1/2 -translate-y-1/2'>{icon}</div>}
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          id={id}
          value={value}
          onChange={onChange}
          className={`input-modern   ${icon ? 'pl-10' : 'pl-3'}`}
          required
          placeholder={placeholder}
        />
        {type === 'password' && (
          <button
            type='button'
            onClick={togglePasswordVisibility}
            className='absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary hover:text-textPrimary'
          >
            {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
