import './Header.css';

const Header = ({ clientName, children }) => {
    return (
        <header className="header-main">
            <nav className="navbar">
        <div className="container d-flex flex-column flex-md-row justify-content-center justify-content-md-between align-items-center">
        <span className="navbar-brand mb-2 mb-md-0">{clientName}</span>
        <div>{children}</div>
        </div>
            </nav>
        </header>
    );
};

export default Header;