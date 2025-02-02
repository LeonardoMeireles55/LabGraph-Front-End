import LoginForm from '@/components/authentication/sign-in';

const Login = () => {
  return (
    <div className=' h-screen from-primary/20 bg-gradient-to-br to-background'>
      <div className='flex items-center justify-center p-1.5 h-screen'>
        <div className='w-full max-w-lg flex justify-center items-center content-center'>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
