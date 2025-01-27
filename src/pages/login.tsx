import LoginForm from '@/components/auth/sign-in';
import Footer from '@/components/ui/footer';

const Login = () => {
  return (
    <div className='from-primary/20 min-h-screen bg-gradient-to-br to-background'>
      <div className='flex min-h-screen items-center justify-center p-4'>
        <div className='w-full flex justify-center items-center'>
          <LoginForm />
          <Footer />
        </div>

      </div>
    </div>
  );
};

export default Login;
