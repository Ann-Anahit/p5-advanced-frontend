

export const fetchMessage = async (messageId, token) => {
    if (!messageId) {
        console.error('No messageId provided');
        return;
    }

    try {
        const response = await fetch(`https://8000-annanahit-drfapi-niz9191cenx.ws.codeinstitute-ide.net/messages/${messageId}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,  // Ensure token is valid
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
