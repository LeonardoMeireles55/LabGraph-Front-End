const Footer = (): JSX.Element => {
    return (
        <footer className="bg-background text-textSecondary">
            <div className="text-sm md:text-base">
                &copy; {new Date().getFullYear()} <strong>LabGraph</strong>. Todos os direitos reservados.
            </div>
            {/* <div className="flex flex-col items-center justify-center space-y-0 text-[10px] md:flex-row md:space-x-6 md:space-y-0 md:text-sm">
                    <Link href="/#" className="text-textSecondary transition-colors hover:text-primary">
                        Sobre
                    </Link>
                    <Link href="/#" className="text-textSecondary transition-colors hover:text-primary">
                        Termos de Uso
                    </Link>
                    <Link href="/#" className="text-textSecondary transition-colors hover:text-primary">
                        Política de Privacidade
                    </Link>
                </div> */}
        </footer>
    );
};

export default Footer;
