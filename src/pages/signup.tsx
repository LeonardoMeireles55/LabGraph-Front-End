import SignUpForm from '@/components/auth/sign-up';
import Footer from '@/components/ui/footer';

const SignUp = () => {
  return (
    <div className='from-primary/20 min-h-screen bg-gradient-to-br to-background'>
      <div className='flex min-h-screen items-center justify-center p-4'>
        <div className='w-full flex justify-center items-center'>
          <SignUpForm />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
