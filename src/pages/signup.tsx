import SignUpForm from "@/components/auth/sign-up";

const SignUp = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/20 to-background">
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="w-full max-w-lg">
                    <SignUpForm />
                </div>
            </div>
        </div>
    );
};

export default SignUp;
