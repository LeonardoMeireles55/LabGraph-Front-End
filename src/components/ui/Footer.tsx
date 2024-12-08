const Footer = (): JSX.Element => {
    return (
        <footer className="bg-background flex flex-col items-center justify-center py-4 md:py-6 text-textSecondary">
            <div className="w-full max-w-screen-lg px-4 text-center">
                <div className="text-xs md:text-sm mb-2">
                    &copy; {new Date().getFullYear()} <strong>LabGraph</strong>. Todos os direitos reservados.
                </div>
                <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-6 text-[10px] md:text-sm">
                    <a
                        href="/#"
                        className="text-textSecondary hover:text-primary transition-colors"
                    >
                        Sobre
                    </a>
                    <a
                        href="/#"
                        className="text-textSecondary hover:text-primary transition-colors"
                    >
                        Termos de Uso
                    </a>
                    <a
                        href="/#"
                        className="text-textSecondary hover:text-primary transition-colors"
                    >
                        Política de Privacidade
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;