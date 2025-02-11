// lib/axios.ts
import axios from 'axios';

// Create axios instance with custom config
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://test.omniswift.com.ng/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // You can add auth token here if needed
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Handle specific error status codes
            switch (error.response.status) {
                case 401:
                    // Handle unauthorized
                    console.error('Unauthorized access');
                    // You might want to redirect to login page
                    break;
                case 404:
                    console.error('Resource not found');
                    break;
                case 500:
                    console.error('Server error');
                    break;
                default:
                    console.error('An error occurred');
            }
        } else if (error.request) {
            // Request was made but no response received
            console.error('No response received:', error.request);
        } else {
            // Something happened in setting up the request
            console.error('Error setting up request:', error.message);
        }
        return Promise.reject(error);
    }
);

// API endpoints
export const endpoints = {
    allData: '/viewAllData',
    ages: '/viewAllAges',
    states: '/viewAllStates',
    levels: '/viewAllLevels',
    genders: '/viewAllGender',
    submit: '/filterData',
    result: '/viewResult',
};

// API methods
export const apiService = {
    getAllData: () => api.get(endpoints.allData),
    getAges: () => api.get(endpoints.ages),
    getStates: () => api.get(endpoints.states),
    getLevels: () => api.get(endpoints.levels),
    getResult: (id: number) => api.post(`${endpoints.result}/${id}`),
    getGenders: () => api.get(endpoints.genders),
    submitForm: (data: any) => api.post(endpoints.submit, data),
};

export default api;