interface SubmitButtonProps {
    text?: string;
}

const SubmitButton = ({ text = "Entrar" }: SubmitButtonProps) => {
    return (
        <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
            {text}
        </button>
    );
};

export default SubmitButton;