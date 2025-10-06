import axios from 'axios'

// Update this to your backend URL
const API_BASE_URL = 'http://localhost:8080/api'

export interface Painting {
  id: number
  urlKey: string
  title: string
  description: string
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
  headers: {
    'Content-Type': 'application/json',
  },
})

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
}

export default paintingsApi
