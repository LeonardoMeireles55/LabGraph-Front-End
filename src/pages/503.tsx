import CustomError from '@/components/ui/custom-errors';

export default function Custom503() {

    return (
        <CustomError
            code='503'
            title='Connection Failed'
            message="Unable to connect to the server. Please check your internet connection and try again."
            buttonText='Retry Connection'
            buttonHref='#'
        />
    );
}