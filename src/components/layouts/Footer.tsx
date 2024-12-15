import Link from 'next/link';

const Footer = (): JSX.Element => {
    return (
        <footer className="bg-background flex flex-col text-textSecondary">
            <div className="text-center">
                <div className="text-xs md:text-sm">
                    &copy; {new Date().getFullYear()} <strong>LabGraph</strong>. Todos os direitos reservados.
                </div>
                <div className="flex flex-col md:flex-row justify-center items-center space-y-0 md:space-y-0 md:space-x-6 text-[10px] md:text-sm">
                    <Link
                        href="/#"
                        className="text-textSecondary hover:text-primary transition-colors"
                    >
                        Sobre
                    </Link>
                    <Link
                        href="/#"
                        className="text-textSecondary hover:text-primary transition-colors"
                    >
                        Termos de Uso
                    </Link>
                    <Link
                        href="/#"
                        className="text-textSecondary hover:text-primary transition-colors"
                    >
                        Política de Privacidade
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;