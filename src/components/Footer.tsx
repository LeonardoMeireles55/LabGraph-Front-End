const Footer = (): JSX.Element => {
    return (
        <footer className="bg-background flex justify-center items-end text-textSecondary py-4 mt-6 md:mt-16">
            <div className="max-w-7xl flex justify-center items-end px-4">
                <div className="text-xs md:text-base">
                    <span>&copy; {new Date().getFullYear()} LabGraph. Todos os direitos reservados.</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
