import ErrorMessageProps from './types/errorMessageProps';

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <div className='mb-2 rounded bg-danger p-3 text-xs text-errorText'>{message}</div>;
};

export default ErrorMessage;
