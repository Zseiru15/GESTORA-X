import './nvbar.css';

const Navbar = ({ logo, menuItems, user }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        {logo && <img src={logo} alt="Logo" className="navbar-logo" />}
        <span className="navbar-title">Mi App</span>
      </div>
      
      <ul className="navbar-menu">
        {menuItems?.map((item, index) => (
          <li key={index} className="navbar-item">
            <a href={item.url} className="navbar-link">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      
      <div className="navbar-user">
        {user ? (
          <span>Bienvenido, {user.name}</span>
        ) : (
          <button className="btn-login">Iniciar Sesión</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;  