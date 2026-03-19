import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1rem', borderRadius: 'var(--radius-lg)' }}>
      <h2 style={{ margin: 0 }}>
        <span style={{ color: 'var(--primary)' }}>Cine</span>Stream
      </h2>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/" className="btn">Inicio</Link>
        <Link to="/media" className="btn btn-primary">Catálogo</Link>
      </div>
    </nav>
  );
}

export default Navbar;
