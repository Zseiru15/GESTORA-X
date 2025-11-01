import './button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  onClick, 
  type = 'button',
  ...props 
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${disabled ? 'btn-disabled' : ''}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;