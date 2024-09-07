export const sendMessage = async ({ receiver, content }, token) => {
    if (!receiver || !content) {
        throw new Error('Receiver and content are required');
    }

    try {
        const response = await fetch('https://8000-annanahit-drfapi-niz9191cenx.ws.codeinstitute-ide.net/messages/create/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ receiver, content }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};
export const getMessages = async (userId, token) => {
    if (!userId || !token) {
        throw new Error('User ID and token are required');
    }

    try {
        const response = await fetch(`https://8000-annanahit-drfapi-niz9191cenx.ws.codeinstitute-ide.net/messages/user/${userId}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};
export const fetchMessage = async (messageId, token) => {
    if (!messageId) {
        console.error('No messageId provided');
        return;
    }

    try {
        const response = await fetch(`https://8000-annanahit-drfapi-niz9191cenx.ws.codeinstitute-ide.net/messages/${messageId}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Message data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching message:', error);
    }
};
