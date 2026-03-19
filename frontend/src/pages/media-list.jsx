import React, { useState, useEffect } from 'react';
import api from '../services/api';

const MediaList = () => {
  const [medias, setMedias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const { data: fetchedMediaList } = await api.get('/media');
      setMedias(fetchedMediaList);
    } catch (error) {
      console.error('Error fetching media:', error);
      alert('Error al conectar con la API. Verifica que el Backend esté corriendo.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="animate-fade-in"><h2 style={{textAlign: 'center', marginTop: '4rem'}}>Cargando catálogo...</h2></div>;

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Catálogo de Producciones</h2>
        <button className="btn btn-primary">+ Nueva Producción</button>
      </div>

      {medias.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem' }}>
          <h3>No hay producciones en el catálogo</h3>
          <p>Empieza agregando tu primera película o serie llamando al API.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
          {medias.map(mediaItem => (
            <div key={mediaItem._id} className="glass-panel" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '350px', background: `url(${mediaItem.foto || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop'}) center/cover`, borderBottom: '1px solid var(--glass-border)' }}></div>
              <div style={{ padding: '1.5rem', flexGrow: 1 }}>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem', lineHeight: '1.3' }}>{mediaItem.titulo}</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>{mediaItem.sinopsis?.substring(0, 100)}...</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: 'auto' }}>
                  <span style={{ fontSize: '0.8rem', background: 'rgba(88,166,255,0.2)', color: 'var(--primary)', padding: '4px 10px', borderRadius: '12px', fontWeight: '500' }}>
                    {mediaItem.añoEstreno || 'N/A'}
                  </span>
                  <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '12px' }}>
                    {mediaItem.genero?.nombre || 'Género Desconocido'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MediaList;
