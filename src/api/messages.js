import axios from 'axios';  

const BASE_API_URL = 'https://8000-annanahit-drfapi-niz9191cenx.ws.codeinstitute-ide.net/';  

const axiosInstance = axios.create({  
    baseURL: BASE_API_URL,  
    headers: {  
        'Content-Type': 'application/json',  
    },  
});  

// Function to retrieve auth token from localStorage  
export const getAuthToken = () => {  
    const token = localStorage.getItem('access_token');  
    console.log('Retrieved token:', token); // Debugging line  
    if (!token) {  
        console.error('Token not found in localStorage.');  
    }  
    return token;  
};  

// Function to fetch messages  
export const getMessages = async (userId, token) => {  
    if (!userId || !token) {  
        throw new Error('User ID and token are required');  
    }  

    try {  
        const response = await axiosInstance.get('/messages/', {  
            headers: { 'Authorization': `Bearer ${token}` },  
            params: { user: userId },  
        });  
        return response.data;  
    } catch (error) {  
        console.error('Error fetching messages:', error.response ? error.response.data : error.message);  
        throw error;  
    }  
};  

// Function to handle login  
export const handleLogin = async (credentials) => {  
    try {  
        const response = await axiosInstance.post('/api/login/', credentials);  
        
        // Verify the response status and data structure  
        if (response.status === 200) { // Check if the response is OK  
            const data = response.data;   
            localStorage.setItem('access_token', data.token); // Store the token  
            console.log('Login successful, token stored:', data.token);   
            return data; // Return the data for further use if necessary  
        } else {  
            console.error('Login failed with status:', response.status, 'Data:', response.data);  
            throw new Error('Login failed');  
        }  
    } catch (error) {  
        console.error('Error during login:', error.response ? error.response.data : error.message);  
        throw error; // Rethrow to handle errors in the calling function  
    }  
};