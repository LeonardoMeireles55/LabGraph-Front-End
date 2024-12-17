import React from 'react';

interface InputFieldProps {
    id: string;
    type: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ id, type, label, value, onChange }) => {
    return (
        <div className="space-y-1">
            <label htmlFor={id} className="block text-sm font-medium text-textPrimary">
                {label}
            </label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                className="w-full rounded-lg border border-borderColor bg-background/50 p-3 text-textPrimary 
                         placeholder-textSecondary/50 outline-none transition-all duration-200
                         focus:border-primary focus:bg-background focus:shadow-sm"
                required
            />
        </div>
    );
};

export default InputField;
