import CustomError from '@/features/authentication/custom-errors';

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
