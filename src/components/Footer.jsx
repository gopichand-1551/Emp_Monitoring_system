import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="app-footer">
            <div className="footer-content">
                <p className="footer-text">
                    © {currentYear} <span className="footer-brand">Cogninode Technologies</span> - All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
