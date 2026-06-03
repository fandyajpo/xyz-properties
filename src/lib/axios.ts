import axios from 'axios'

// Initialize the axios instance with default config
export const apiClient = axios.create({
  // Use environment variable for base URL if available, fallback to a default
  baseURL: import.meta.env.VITE_BACKEND_URL,
})

// Request interceptor for adding auth tokens or other generic logic
apiClient.interceptors.request.use(
  (config) => {
    // Example: Attach token from localStorage or Auth Context
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Example: Handle 401 Unauthorized globally
    // if (error.response?.status === 401) {
    //   // Redirect to login or refresh token
    // }
    return Promise.reject(error)
  }
)
