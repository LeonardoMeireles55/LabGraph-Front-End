import ErrorMessageProps from './types/errorMessageProps';

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <div className='bg-danger/10 mb-4 rounded p-3 text-sm text-danger'>{message}</div>;
};

export default ErrorMessage;
