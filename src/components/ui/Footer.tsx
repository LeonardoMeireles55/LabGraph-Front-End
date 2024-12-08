const Footer = (): JSX.Element => {
    return (
        <footer className="bg-background flex items-center justify-center md:mt-8 text-textSecondary">
            <div className="w-full">
                <div className="text-xs md:text-base">
                    <span>&copy; {new Date().getFullYear()} LabGraph. Todos os direitos reservados.</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
