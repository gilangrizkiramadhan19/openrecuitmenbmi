import axios, { AxiosInstance } from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Add request interceptor for CSRF token if needed
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('csrf_token') : null
  if (token) {
    config.headers['X-CSRF-Token'] = token
  }
  return config
})

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// Job-related endpoints
export const jobsAPI = {
  getAll: (params?: { location?: string; division?: string; experience_level?: string; page?: number }) =>
    api.get('/jobs', { params }),
  
  getById: (id: string | number) =>
    api.get(`/jobs/${id}`),
  
  search: (query: string, params?: any) =>
    api.get('/jobs/search', { params: { q: query, ...params } }),
}

// Location endpoints
export const locationsAPI = {
  getAll: () => api.get('/locations'),
}

// Division endpoints
export const divisionsAPI = {
  getAll: () => api.get('/divisions'),
}

// Experience level endpoints
export const experienceLevelsAPI = {
  getAll: () => api.get('/experience-levels'),
}

// Testimonials endpoints
export const testimonialsAPI = {
  getAll: () => api.get('/testimonials'),
}

// Articles endpoints
export const articlesAPI = {
  getAll: (params?: { limit?: number; page?: number }) =>
    api.get('/articles', { params }),
  
  getById: (id: string | number) =>
    api.get(`/articles/${id}`),
}

export default api
