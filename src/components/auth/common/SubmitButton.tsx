interface SubmitButtonProps {
  text?: string;
}

const SubmitButton = ({ text }: SubmitButtonProps) => {
  return (
    <button
      type='submit'
      className='w-full transform rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white transition-all duration-200 ease-in-out hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-95 disabled:opacity-70'
    >
      {text}
    </button>
  );
};

export default SubmitButton;
