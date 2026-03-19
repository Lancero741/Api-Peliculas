import axios from 'axios';

const API_BASE_URL = 'https://api-peliculas.onrender.com/api'; // Replace with your actual deployed API URL or localhost

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * MEDIA SERVICE (Películas y Series)
 */
export const MediaService = {
  // Get all media
  getAll: async () => {
    try {
      const response = await apiClient.get('/media');
      return response.data;
    } catch (error) {
      console.error('Error fetching media:', error);
      throw error;
    }
  },

  // Get single media by ID
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/media/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching media with id ${id}:`, error);
      throw error;
    }
  },

  // Create new media
  create: async (mediaData) => {
    try {
      const response = await apiClient.post('/media', mediaData);
      return response.data;
    } catch (error) {
      console.error('Error creating media:', error);
      throw error;
    }
  },

  // Update existing media
  update: async (id, mediaData) => {
    try {
      const response = await apiClient.put(`/media/${id}`, mediaData);
      return response.data;
    } catch (error) {
      console.error(`Error updating media with id ${id}:`, error);
      throw error;
    }
  },

  // Delete media
  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/media/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting media with id ${id}:`, error);
      throw error;
    }
  }
};

/**
 * OTHER SERVICES (Generos, Directores, Productoras, Tipos)
 * You can follow the same pattern for other modules.
 */

export const GenreService = {
  getAll: () => apiClient.get('/generos').then(res => res.data),
};

export const DirectorService = {
  getAll: () => apiClient.get('/directores').then(res => res.data),
};

export const ProducerService = {
  getAll: () => apiClient.get('/productoras').then(res => res.data),
};

export const TypeService = {
  getAll: () => apiClient.get('/tipos').then(res => res.data),
};