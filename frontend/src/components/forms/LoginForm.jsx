import React, { useState } from 'react';
import './loginForm.css';

const LoginForm = ({ onSubmit, loading = false, error = null }) => {
  const [formData, setFormData] = useState({
    correo: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.correo) {
      newErrors.correo = 'El correo es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      newErrors.correo = 'El correo no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-form-header">
        <h2>Iniciar Sesión</h2>
        <p>Ingresa a Gestora X</p>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        {error && (
          <div className="form-error-general">
            {error}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="correo" className="form-label">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            className={`form-input ${errors.correo ? 'form-input-error' : ''}`}
            placeholder="tu@empresa.com"
            disabled={loading}
          />
          {errors.correo && <span className="form-error">{errors.correo}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`form-input ${errors.password ? 'form-input-error' : ''}`}
            placeholder="••••••••"
            disabled={loading}
          />
          {errors.password && <span className="form-error">{errors.password}</span>}
        </div>

        <button 
          type="submit" 
          className={`submit-btn ${loading ? 'submit-btn-loading' : ''}`}
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="loading-spinner"></div>
              Iniciando sesión...
            </>
          ) : (
            'Iniciar Sesión'
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;