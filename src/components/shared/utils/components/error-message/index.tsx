import ErrorMessageProps from './types/errorMessageProps';

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <div className='bg-danger mb-2 rounded p-3 text-sm text-textPrimary'>{message}</div>;
};

export default ErrorMessage;
