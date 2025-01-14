import CustomError from '@/components/ui/custom-errors';

export default function Custom403() {
    return (
        <CustomError
            code='403'
            title='Forbidden'
            message="You don't have permission to access this resource"
            buttonText='Home'
            buttonHref='/'
        />
    );
}
