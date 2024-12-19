import React from 'react';

interface InputFieldProps {
    id: string;
    type: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    autocomplete?: string;
}

const InputField: React.FC<InputFieldProps> = ({ id, type, label, value, onChange, autocomplete }) => {
    return (
        <div className="space-y-1">
            <label htmlFor={id}  className="block text-sm font-medium text-textPrimary">
                {label}
            </label>
            <input
                type={type}
                id={id}
                autoComplete={autocomplete===undefined ? 'off' : 'current-password'}
                value={value}
                onChange={onChange}
                className="w-full rounded-lg border border-borderColor p-3 text-[black] 
                          outline-none focus:border-textPrimary"
                required
            />
        </div>
    );
};

export default InputField;
