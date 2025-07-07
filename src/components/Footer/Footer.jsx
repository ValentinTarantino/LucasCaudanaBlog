import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-main mt-auto py-3">
            <div className="container text-center">
                <span>© {new Date().getFullYear()} Blog Deportivo creado para Lucas Caudana.</span>
            </div>
        </footer>
    );
};

export default Footer;