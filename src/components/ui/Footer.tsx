const Footer = (): JSX.Element => {
    return (
        <footer className="bg-background flex justify-center text-textSecondary">
            <div className="max-w-7xl flex justify-center items-end">
                <div className="text-xs md:text-lg">
                    <span>&copy; {new Date().getFullYear()} LabGraph. Todos os direitos reservados.</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
