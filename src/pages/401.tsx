import CustomError from '@/components/ui/custom-errors';

export default function Custom401() {
    return (
        <CustomError
            code='401'
            title='Unauthorized'
            message="You need to be authenticated to access this page"
            buttonText='Home'
            buttonHref='/'
        />
    );
}
