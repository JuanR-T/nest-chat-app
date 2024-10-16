import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000', { transports: ['websocket', 'polling'] });

const Chat = () => {
    const [messages, setMessages] = useState<String[]>([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        socket.on('message', (message: string) => {
            setMessages([...messages, message]);
        });
        console.log("messages res: ", messages)
    }, [messages]);

    const sendMessage = () => {
        console.log("newMessage", newMessage)
        socket.emit('message', newMessage);
        setNewMessage('');
    };

    return (
        <div className="bg-pink-800 h-10 w-60">
            <div className="chat">
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <div className="input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;