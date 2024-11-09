import React, { useState, useEffect } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import styles from '../../styles/Messages.module.css';
import Asset from '../../components/Asset';
import Avatar from '../../components/Avatar'; // Import the Avatar component
import { useCurrentUser } from '../../contexts/CurrentUserContext'; // Import the useCurrentUser hook

const Messages = () => {
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loadingContacts, setLoadingContacts] = useState(true);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // To store error messages

    const { currentUser } = useCurrentUser(); // Use current user's data

    // Fetch user profiles as contacts
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axiosReq.get('/profiles/');
                setContacts(response.data.results);
                setLoadingContacts(false);
            } catch (error) {
                setLoadingContacts(false);
                setErrorMessage('Failed to load contacts. Please try again later.');
            }
        };
        fetchContacts();
    }, []);

    // Fetch messages when a contact is selected
    useEffect(() => {
        if (!selectedContact) return;

        const fetchMessages = async () => {
            try {
                const response = await axiosReq.get(`/messages/?recipient=${selectedContact}`);
                setMessages(response.data.results); // Load previous messages
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages(); // Initial fetch

        const intervalId = setInterval(async () => {
            setLoadingMessages(true);
            try {
                const response = await axiosReq.get(`/messages/?recipient=${selectedContact}`);
                setMessages(response.data.results); // Refresh the message list
            } catch (error) {
                console.error('Error fetching messages:', error);
            } finally {
                setLoadingMessages(false);
            }
        }, 5000); // Poll every 5 seconds

        return () => clearInterval(intervalId); // Cleanup interval on unmount or contact change
    }, [selectedContact]);

    // Handle selecting a contact
    const handleSelectContact = (contactId) => {
        setSelectedContact(contactId);
        setMessages([]); // Clear messages when switching contacts
    };

    // Handle sending a message
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        const messageData = {
            sender: currentUser?.username || 'you', // Use current user's username
            text: newMessage,
        };
        console.log('Sending message:', messageData); // Log the message data

        // Optimistically add the message to the local state
        setMessages((prev) => [...prev, messageData]);
        setNewMessage('');

        try {
            // Send the message to the backend
            const response = await axiosReq.post('/messages/', {
                recipient: selectedContact,
                text: newMessage,
            }, {
                headers: {
                    Authorization: `Bearer ${currentUser.token}` // If using JWT
                }
            });

            console.log("Message sent response:", response.data);
        } catch (error) {
            console.error('Error sending message:', error);
            setErrorMessage('Failed to send message. Please try again later.');
        }
    };

    return (
        <div className={styles.MessagesContainer}>
            <div className={styles.ContactList}>
                <h3>Contacts</h3>
                {loadingContacts ? (
                    <Asset spinner />
                ) : contacts.length ? (
                    contacts.map((contact) => (
                        <div
                            key={contact.id}
                            className={`${styles.Contact} ${selectedContact === contact.id ? styles.SelectedContact : ''}`}
                            onClick={() => handleSelectContact(contact.id)}
                        >
                            {/* Use the Avatar component here */}
                            <Avatar
                                src={contact.image} // Pass the contact image URL to Avatar
                                text={contact.username} // Display the username or fallback text
                            />
                        </div>
                    ))
                ) : (
                    <p>No contacts found.</p>
                )}
            </div>

            {errorMessage && <div className={styles.ErrorMessage}>{errorMessage}</div>} {/* Error message display */}

            {selectedContact && (
                <div className={styles.MessageSection}>
                    <h3>Messages with {contacts.find((contact) => contact.id === selectedContact)?.username || "Selected Contact"}</h3>
                    <div className={styles.MessageList}>
                        {loadingMessages ? (
                            <Asset spinner />
                        ) : (
                            messages.map((message, index) => (
                                <div key={index} className={styles.Message}>
                                    <strong>{message.sender}:</strong> {message.text}
                                </div>
                            ))
                        )}
                    </div>
                    <form onSubmit={handleSendMessage} className={styles.MessageForm}>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message"
                            className={styles.MessageInput}
                        />
                        <button type="submit" className={styles.MessageButton}>Send</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Messages;
