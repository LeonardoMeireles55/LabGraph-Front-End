import { useState } from 'react';
import { useRouter } from 'next/router';
import InputField from './InputField';
import ErrorMessage from '../common/ErrorMessage';
import SubmitButton from './SubmitButton';
import Logo from '@/components/common/Logo';
import Link from 'next/link';
import ThemeToggle from '../common/ThemeToggle';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/signIn`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                await fetch('/api/login', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ token: data.tokenJWT }),
                })
                router.push('/hematology')
              } else {
                setError(data.message || 'Login failed')
              }
        } catch (err) {
            setError('Erro ao conectar ao servidor');
        }
    };

    return (
        <div className="w-full relative rounded-xl border border-borderColor bg-surface/80 p-8 shadow-xl">
            <div className="absolute right-4 top-4 z-50">
                <ThemeToggle />
            </div>
            <div className="mb-8 text-center">
                <div className="mb-4 flex justify-center text-textSecondary opacity-95">
                    <Logo className="h-20 w-auto" />
                </div>
                <h1 className="text-4xl font-bold text-textPrimary">LabGraph</h1>
                <p className="mt-2 text-textSecondary">Faça login para continuar</p>
            </div>

            {error && <ErrorMessage message={error} />}

            <form onSubmit={handleSubmit} className="space-y-6">
                <InputField
                    id="email"
                    type="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    id="password"
                    type="password"
                    label="Senha"
                    autocomplete='current-password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center">
                        <input type="checkbox" className="rounded border-borderColor text-primary focus:ring-primary" />
                        <span className="ml-2 text-textSecondary">Lembrar-me</span>
                    </label>
                    <Link href="#" className="text-primary hover:text-primary/80">Esqueceu a senha?</Link>
                </div>

                <SubmitButton />

                <p className="mt-4 text-center text-sm text-textSecondary">
                    Não tem uma conta?{' '}
                    <Link href="/signup" className="text-primary hover:text-primary/80">
                        Registre-se
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default LoginForm;
