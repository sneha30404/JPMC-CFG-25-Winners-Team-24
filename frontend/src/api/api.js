// frontend/src/api/api.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// --- AUTH ---
export const checkPhoneNumber = (phone_number) => api.post('/phonecheck/', { phone_number });

export const loginUser = (phone_number, otp) => api.post('/login/', { phone_number, otp });

export const registerTrainee = (phone_number, name, interest) => 
    api.post('/register/trainee/', { phone_number, name, interest });

export const registerAdmin = (phone_number, name) => 
    api.post('/register/admin/', { phone_number, name });

// --- DATA FETCHING ---
export const getDashboardData = () => api.get('/dashboard/');
export const getCommunityPosts = () => api.get('/community-posts/');
export const getUserChats = () => api.get('/chats/');
export const getChatMessages = (chatId) => api.get(`/chats/${chatId}/messages/`);

// --- ACTIONS ---
export const createCommunityPost = (content) => api.post('/community-posts/', { content });
export const updateCourseProgress = (course_id, completed) => api.post('/course-progress/', { course_id, completed });
export const postChatMessage = (chatId, content) => api.post(`/chats/${chatId}/messages/`, { content });

export default api;