// This is a simplified chat. For real-time, you'd need WebSockets.
// For a hackathon, polling is a great and easy way to simulate real-time.

import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getChatMessages, postChatMessage } from '../api/api';

function GroupChatPage({ user }) {
    const { chatId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages]);

    useEffect(() => {
        const fetchMessages = () => {
            getChatMessages(chatId).then(res => setMessages(res.data));
        };
        fetchMessages();
        const interval = setInterval(fetchMessages, 3000); // Poll every 3 seconds
        return () => clearInterval(interval);
    }, [chatId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;
        const { data } = await postChatMessage(chatId, newMessage);
        setMessages([...messages, data]);
        setNewMessage('');
    };

    return (
        <div className="container">
            <Link to="/dashboard">← Back to Dashboard</Link>
            <h1>Group Chat</h1>
            <div className="card" style={{ height: '500px', overflowY: 'scroll', display: 'flex', flexDirection: 'column-reverse' }}>
                <div> {/* Flipped container */}
                    {messages.slice().reverse().map(msg => (
                        <div key={msg.id} style={{ margin: '10px', textAlign: msg.author === user.id ? 'right' : 'left' }}>
                            <div style={{
                                background: msg.author === user.id ? '#dcf8c6' : '#fff',
                                padding: '10px',
                                borderRadius: '10px',
                                display: 'inline-block'
                            }}>
                                <strong>{msg.author_name}</strong>
                                <p style={{margin: '5px 0 0 0'}}>{msg.content}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', marginTop: '10px' }}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    style={{ flexGrow: 1, padding: '10px' }}
                    placeholder="Type a message..."
                />
                <button type="submit" style={{ padding: '10px 20px' }}>Send</button>
            </form>
        </div>
    );
}

export default GroupChatPage;