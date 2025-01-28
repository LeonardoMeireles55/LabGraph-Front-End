import SignUpForm from '@/components/auth/sign-up';

const SignUp = () => {
  return (
    <div className=' h-screen from-primary/20 bg-gradient-to-br to-background'>
      <div className='flex items-center justify-center p-1.5 h-screen'>
        <div className='w-full max-w-lg flex justify-center items-center content-center'>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
