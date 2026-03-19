import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MediaService, 
  GenreService, 
  DirectorService, 
  ProducerService, 
  TypeService 
} from './services/MediaService';

const EditMediaComponent = () => {
  const { id } = useParams(); // Get ID from URL if editing
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    serial: '',
    titulo: '',
    sinopsis: '',
    urlPelicula: '',
    imagenPortada: '',
    fechaCreacion: '',
    fechaActualizacion: '',
    anoEstreno: '',
    genero: '',
    director: '',
    productora: '',
    tipo: ''
  });

  const [options, setOptions] = useState({
    generos: [],
    directores: [],
    productoras: [],
    tipos: []
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // 1. Fetch all dropdown options in parallel
        const [gs, ds, ps, ts] = await Promise.all([
          GenreService.getAll(),
          DirectorService.getAll(),
          ProducerService.getAll(),
          TypeService.getAll()
        ]);

        setOptions({
          generos: gs.filter(g => g.estado === 'Activo'),
          directores: ds.filter(d => d.estado === 'Activo'),
          productoras: ps.filter(p => p.estado === 'Activo'),
          tipos: ts
        });

        // 2. If we have an ID, fetch the existing media record
        if (id) {
          const media = await MediaService.getById(id);
          setFormData({
            ...media,
            // Ensure IDs are extracted if the API returns objects
            genero: media.genero?._id || media.genero,
            director: media.director?._id || media.director,
            productora: media.productora?._id || media.productora,
            tipo: media.tipo?._id || media.tipo
          });
        }
      } catch (err) {
        console.error("Error loading form data:", err);
        alert("Error loading data. Please check the API.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      if (id) {
        await MediaService.update(id, formData);
        alert("Media updated successfully!");
      } else {
        await MediaService.create(formData);
        alert("Media created successfully!");
      }
      navigate('/media'); // Redirect back to list
    } catch (err) {
      console.error("Error saving media:", err);
      alert("Error saving record. Check console for details.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="p-10 text-white">Loading Form...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-zinc-900 text-white rounded-lg shadow-xl border border-zinc-800 my-10">
      <h2 className="text-2xl font-bold mb-6 text-red-500">
        {id ? 'Edit Media Asset' : 'Add New Media'}
      </h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Serial */}
        <div className="flex flex-col">
          <label className="text-sm text-zinc-400 mb-1">Serial Number *</label>
          <input 
            name="serial" 
            value={formData.serial} 
            onChange={handleChange}
            required
            className="bg-zinc-800 border border-zinc-700 p-2 rounded focus:border-red-500 outline-none"
          />
        </div>

        {/* Title */}
        <div className="flex flex-col">
          <label className="text-sm text-zinc-400 mb-1">Title *</label>
          <input 
            name="titulo" 
            value={formData.titulo} 
            onChange={handleChange}
            required
            className="bg-zinc-800 border border-zinc-700 p-2 rounded focus:border-red-500 outline-none"
          />
        </div>

        {/* Synopsis - Full Width */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm text-zinc-400 mb-1">Synopsis</label>
          <textarea 
            name="sinopsis" 
            value={formData.sinopsis} 
            onChange={handleChange}
            rows="3"
            className="bg-zinc-800 border border-zinc-700 p-2 rounded focus:border-red-500 outline-none"
          />
        </div>

        {/* Release Year */}
        <div className="flex flex-col">
          <label className="text-sm text-zinc-400 mb-1">Release Year</label>
          <input 
            type="number"
            name="anoEstreno" 
            value={formData.anoEstreno} 
            onChange={handleChange}
            className="bg-zinc-800 border border-zinc-700 p-2 rounded focus:border-red-500 outline-none"
          />
        </div>

        {/* URL */}
        <div className="flex flex-col">
          <label className="text-sm text-zinc-400 mb-1">Movie URL / Source *</label>
          <input 
            name="urlPelicula" 
            value={formData.urlPelicula} 
            onChange={handleChange}
            required
            placeholder="http://localhost:4000/media"
            className="bg-zinc-800 border border-zinc-700 p-2 rounded focus:border-red-500 outline-none"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-col">
          <label className="text-sm text-zinc-400 mb-1">Genre</label>
          <select 
            name="genero" 
            value={formData.genero} 
            onChange={handleChange}
            className="bg-zinc-800 border border-zinc-700 p-2 rounded focus:border-red-500 outline-none"
          >
            <option value="">Select Genre</option>
            {options.generos.map(g => <option key={g._id} value={g._id}>{g.nombre}</option>)}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-zinc-400 mb-1">Director</label>
          <select 
            name="director" 
            value={formData.director} 
            onChange={handleChange}
            className="bg-zinc-800 border border-zinc-700 p-2 rounded focus:border-red-500 outline-none"
          >
            <option value="">Select Director</option>
            {options.directores.map(d => <option key={d._id} value={d._id}>{d.nombres}</option>)}
          </select>
        </div>

        {/* Actions */}
        <div className="md:col-span-2 flex justify-end gap-4 mt-6">
          <button 
            type="button" 
            onClick={() => navigate('/media')}
            className="px-6 py-2 text-zinc-400 hover:text-white transition"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={isSaving}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-2 rounded font-semibold transition disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Confirm Update'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMediaComponent;