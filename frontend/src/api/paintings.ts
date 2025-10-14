import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

export interface Painting {
  id: number
  urlKey: string
  title: string
  description: string
  titleEs?: string // Spanish title
  descriptionEs?: string // Spanish description
  category: string
  tags: string
  imageUrl: string
  thumbnailUrl: string
  difficulty: number
  colorPalette: string
  svgPath: string
  featured: boolean
  viewCount: number
  createdAt: string
  updatedAt: string
}

export interface PaginatedResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
  number: number
}

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout - prevents hanging on slow backend
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout - backend is too slow')
    }
    return Promise.reject(error)
  }
)

export const paintingsApi = {
  getPaintingByUrlKey: async (urlKey: string): Promise<Painting> => {
    const response = await api.get(`/paintings/${urlKey}`)
    return response.data
  },

  getAllPaintings: async (
    page = 0,
    size = 20,
    sortBy = 'createdAt',
    direction = 'desc'
  ): Promise<PaginatedResponse<Painting>> => {
    const response = await api.get('/paintings', {
      params: { page, size, sortBy, direction },
    })
    return response.data
  },

  getPaintingsByCategory: async (
    category: string,
    page = 0,
    size = 20
  ): Promise<PaginatedResponse<Painting>> => {
    const response = await api.get(`/paintings/category/${category}`, {
      params: { page, size },
    })
    return response.data
  },

  getFeaturedPaintings: async (
    page = 0,
    size = 20
  ): Promise<PaginatedResponse<Painting>> => {
    const response = await api.get('/paintings/featured', {
      params: { page, size },
    })
    return response.data
  },

  getPopularPaintings: async (
    page = 0,
    size = 20
  ): Promise<PaginatedResponse<Painting>> => {
    const response = await api.get('/paintings/popular', {
      params: { page, size },
    })
    return response.data
  },

  searchPaintings: async (
    keyword: string,
    page = 0,
    size = 20
  ): Promise<PaginatedResponse<Painting>> => {
    const response = await api.get('/paintings/search', {
      params: { keyword, page, size },
    })
    return response.data
  },

  getAllCategories: async (): Promise<string[]> => {
    const response = await api.get('/paintings/categories')
    return response.data
  },

  createPainting: async (painting: Partial<Painting>): Promise<Painting> => {
    const response = await api.post('/paintings', painting)
    return response.data
  },

  autocompletePaintings: async (query: string, limit = 10): Promise<string[]> => {
    const response = await api.get('/paintings/autocomplete', {
      params: { query, limit },
    })
    return response.data
  },
}

export default paintingsApi
