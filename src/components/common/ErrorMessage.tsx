interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <div className="mb-4 rounded bg-danger/10 p-3 text-sm text-danger">
            {message}
        </div>
    );
};

export default ErrorMessage;
