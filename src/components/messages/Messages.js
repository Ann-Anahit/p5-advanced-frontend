import React, { useState } from "react";
import styles from '../../styles/Messages.module.css';

const Messages = () => {
    const [selectedContact, setSelectedContact] = useState(null);
    const [newMessage, setNewMessage] = useState('');

    const contacts = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
        { id: 3, name: 'Doe' },
    ];

    const messages = {
        1: [
            { sender: 'John', text: 'Hello!' },
            { sender: 'You', text: 'Hi, how are you?' },
        ],
        2: [
            { sender: 'Jane', text: 'Hi there!' },
            { sender: 'You', text: 'Hey!' },
        ],
        3: [
            { sender: 'Doe', text: 'Good morning!' },
            { sender: 'You', text: 'Morning!' },
        ],
    };

    const handleSelectContact = (contactId) => {
        setSelectedContact(contactId);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() !== '') {
            // For now, we are just logging the message. Add your send logic here.
            console.log(`Sending message: ${newMessage}`);
            setNewMessage('');
        }
    };

    return (
        <div className={styles.MessagesContainer}>
            <div className={styles.ContactList}>
                <h3>Contacts</h3>
                {contacts.map((contact) => (
                    <div
                        key={contact.id}
                        className={selectedContact === contact.id ? styles.SelectedContact : ''}
                        onClick={() => handleSelectContact(contact.id)}
                    >
                        {contact.name}
                    </div>
                ))}
            </div>

            {selectedContact && (
                <div className={styles.MessageSection}>
                    <h3>Messages with {contacts.find((contact) => contact.id === selectedContact).name}</h3>
                    <div className={styles.MessageList}>
                        {messages[selectedContact]?.map((message, index) => (
                            <div key={index} className={styles.Message}>
                                <strong>{message.sender}:</strong> {message.text}
                            </div>
                        ))}
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

            {!selectedContact && <p>Select a contact to start chatting!</p>}
        </div>
    );
};

export default Messages;
