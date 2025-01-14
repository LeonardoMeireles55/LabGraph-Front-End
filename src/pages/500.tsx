
import CustomError from '@/components/ui/custom-errors';

export default function Custom500() {
    return (
        <CustomError
            code='500'
            title='Server Error'
            message="Something went wrong on our servers"
            buttonText='Home'
            buttonHref='/'
        />
    );
}