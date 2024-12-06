const Footer = (): JSX.Element => {
    return (
        <footer className="bg-background flex justify-center text-textSecondary">
            <div className="w-full">
                <div className="md:mb-4 text-xs md:text-base">
                    <span>&copy; {new Date().getFullYear()} LabGraph. Todos os direitos reservados.</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
