import './sidebar.css';

const Sidebar = ({ isOpen, menuItems, onClose }) => {
  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h3>Menú</h3>
          <button className="sidebar-close" onClick={onClose}>×</button>
        </div>
        <ul className="sidebar-menu">
          {menuItems?.map((item, index) => (
            <li key={index} className="sidebar-item">
              <a href={item.url} className="sidebar-link">
                {item.icon && <span className="sidebar-icon">{item.icon}</span>}
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;