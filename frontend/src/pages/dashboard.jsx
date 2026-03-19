import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="animate-fade-in" style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
        Bienvenido a <span style={{ color: 'var(--primary)', textShadow: '0 0 20px rgba(88,166,255,0.5)' }}>CineStream</span>
      </h1>
      <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
        La plataforma definitiva para administrar tu catálogo de películas, series, directores, productoras y géneros.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
        <div className="glass-panel">
          <h3>Gestión de Producciones</h3>
          <p style={{marginTop: '0.5rem'}}>Añade, edita y elimina películas o series. Accede al catálogo completo.</p>
          <Link to="/media" className="btn btn-primary" style={{ marginTop: '1rem' }}>Ir al Catálogo</Link>
        </div>
        <div className="glass-panel">
          <h3>Catálogos Base</h3>
          <p style={{marginTop: '0.5rem'}}>Administra Directores, Productoras, Tipos y Géneros.</p>
          <button className="btn" style={{ marginTop: '1rem' }} onClick={() => alert('Para fines demostrativos, esta sección está en desarrollo.')}>Configurar</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
