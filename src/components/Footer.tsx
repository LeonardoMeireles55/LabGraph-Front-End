function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-200 py-4 mt-6">
            <div className="max-w-7xl mx-auto flex justify-center items-center px-4">
                <div className="text-sm">
                    <span>&copy; {new Date().getFullYear()} LabGraph. Todos os direitos reservados.</span>
                </div>
            </div>
        </footer>
    );
}
export default Footer;