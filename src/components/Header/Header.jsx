import './Header.css';

import './Header.css';

const Header = ({ clientName, children }) => {
  return (
    <header className="header-main">
      <nav className="navbar">
        {/*
          - d-flex: Habilita Flexbox
          - flex-column: Apila los elementos en móvil (por defecto)
          - align-items-center: Centra los elementos horizontalmente en la vista de columna
          - flex-md-row: Los pone en fila en pantallas medianas y grandes
          - justify-content-md-between: Los separa a los extremos en pantallas medianas y grandes
        */}
        <div className="container d-flex flex-column flex-md-row justify-content-md-between align-items-center">
          
          <span className="navbar-brand mb-2 mb-md-0">
            {clientName}
          </span>

          {/* --- ¡LA CORRECCIÓN CLAVE! --- */}
          {/* Quitamos el div que envolvía a children. Ahora el botón es un hijo directo del flexbox. */}
          {children}
          
        </div>
      </nav>
    </header>
  );
};

export default Header;