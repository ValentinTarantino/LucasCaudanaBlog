import './Header.css';

const Header = ({ clientName, children }) => {
    return (
        <header className="header-main">
            <nav className="navbar">
                <div className="container d-flex justify-content-between align-items-center">
                    <span className="navbar-brand">{clientName}</span>
                    <div>
                        {children}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;