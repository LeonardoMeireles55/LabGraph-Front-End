interface CheckIconProps {
  text: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckIcon = ({ text, checked, onChange }: CheckIconProps) => {
  return (
    <label className='flex items-center space-x-1 cursor-pointer'>
      <div className='relative'>
        <input
          type='checkbox'
          className='sr-only'
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div
          className={`w-4 h-4 flex border rounded-full transition-colors duration-200 
                    ${checked ? 'border-borderColor bg-checkbox' : 'border-borderColor bg-checkbox'}`}
        >
          {checked && (
            <svg
              viewBox='0 0 16 16'
              fill='currentColor'
              xmlns='http://www.w3.org/2000/svg'
              className='w-4 h-4 text-textSecondary'
            >
              <path d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z' />
            </svg>
          )}
        </div>
      </div>
      <span className='text-textSecondary transition-colors duration-200'>{text}</span>
    </label>
  );
};

export default CheckIcon;
