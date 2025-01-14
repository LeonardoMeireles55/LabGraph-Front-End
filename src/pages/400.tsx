import CustomError from '@/components/ui/custom-errors';

export default function Custom400() {
    return (
        <CustomError
            code='400'
            title='Bad Request'
            message="The server cannot process the request due to invalid syntax"
            buttonText='Home'
            buttonHref='/'
        />
    );
}
