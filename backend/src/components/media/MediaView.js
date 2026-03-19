import React, { useState, useEffect } from 'react';
import { getGeneros } from '../../services/generoService'; // Importas tus servicios
import { axiosInstance } from '../services/axiosConfig';

export const MediaView = () => {
    const [generos, setGeneros] = useState([]); // Estado para géneros

    useEffect(() => {
        const cargarActivos = async () => {
            try {
                const resp = await getGeneros();
                export const MediaView = () => {
    const [generos, setGeneros] = useState([]);
    const [directores, setDirectores] = useState([]);
    const [productoras, setProductoras] = useState([]);
    const [tipos, setTipos] = useState([]);
    
    // Carga de catálogos filtrados por estado 'Activo'
    useEffect(() => {
        const cargarDatos = async () => {
            const [resG, resD, resP, resT] = await Promise.all([
                axiosInstance.get('/genero'),
                axiosInstance.get('/director'),
                axiosInstance.get('/productora'),
                axiosInstance.get('/tipo')
            ]);
            setGeneros(resG.data.filter(g => g.estado === 'Activo')); // [cite: 117, 118]
            setDirectores(resD.data.filter(d => d.estado === 'Activo')); // [cite: 77]
            setProductoras(resP.data.filter(p => p.estado === 'Activo')); // [cite: 78]
            setTipos(resT.data); // [cite: 80]
        };
        cargarDatos();
    }, []);

    return (
        <div className="container-fluid bg-dark text-white p-4">
            <h3>Gestión de Películas y Series</h3>
            <form className="row g-3">
                <div className="col-md-3">
                    <label>Serial (Único)</label>
                    <input name="serial" className="form-control" required /> {/* [cite: 66, 128] */}
                </div>
                <div className="col-md-6">
                    <label>Título</label>
                    <input name="titulo" className="form-control" /> {/* [cite: 67, 132] */}
                </div>
                <div className="col-md-3">
                    <label>Género Principal</label>
                    <select className="form-select" name="genero">
                        <option value="">Seleccione...</option>
                        {generos.map(g => <option key={g._id} value={g._id}>{g.nombre}</option>)}
                    </select>
                </div>
                {/* Campos adicionales para Sinopsis, URL, Imagen y Año [cite: 141] */}
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Guardar Producción</button>
                </div>
            </form>
        </div>
    );
};
                // Filtramos para que el select solo tenga géneros con estado 'Activo'
                const activos = resp.data.filter(g => g.estado === 'Activo');
                setGeneros(activos);
            } catch (error) {
                console.error("Error cargando géneros", error);
            }
        };
        cargarActivos();
    }, []);

    return (
        <div className="container-fluid bg-dark text-white p-4">
            {/* Formulario que utiliza los datos filtrados */}
            <select className="form-select" name="genero">
                <option value="">Seleccione un Género...</option>
                {generos.map(g => (
                    <option key={g._id} value={g._id}>{g.nombre}</option>
                ))}
            </select>
        </div>
    );
};