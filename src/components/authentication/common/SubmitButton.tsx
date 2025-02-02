import { LogIn } from 'lucide-react';

interface SubmitButtonProps {
  text?: string;
  icon?: boolean;
}

const SubmitButton = ({ text, icon = true }: SubmitButtonProps) => {
  return (
    <button
      type='submit'
      className='w-full transform rounded-lg bg-buttonMuted px-3 py-1.5 text-base font-semibold text-white transition-all duration-200 ease-in-out hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-95 disabled:opacity-70 flex items-center justify-center gap-1'
    >
      {icon ? <LogIn className='w-5 h-5' /> : text}
    </button>
  );
};

export default SubmitButton;
