import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

// Initialize Socket.IO client (connects to the backend server)
const socket = io('http://localhost:5000');

const App = () => {
  const [messages, setMessages] = useState([]); // To hold chat messages
  const [newMessage, setNewMessage] = useState(''); // To hold input message
  const [userId, setUserId] = useState('123'); // Assuming a user ID, you can get it after login

  // UseEffect hook to listen for new messages from the backend via Socket.IO
  useEffect(() => {
    socket.on('newMessage', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]); // Add the new message to state
    });

    // Clean up the socket listener when the component unmounts
    return () => socket.off('newMessage');
  }, []);

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return; // Prevent sending empty messages

    const messageData = { userId, message: newMessage };

    // Emit the message to the backend using Socket.IO
    socket.emit('sendMessage', messageData);

    // Optionally, save the message to the backend via an HTTP request (using Axios)
    await axios.post('http://localhost:5000/sendMessage', messageData);

    setNewMessage(''); // Clear the input field
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-4 w-96 rounded-lg shadow-md">
        {/* Message List: Displaying all messages */}
        <div className="h-80 overflow-y-scroll mb-4">
          {messages.map((msg, index) => (
            <div key={index} className="p-2 border-b border-gray-200">{msg.message}</div>
          ))}
        </div>

        {/* Input Box: For typing new messages */}
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />

        {/* Send Button: Sends the new message */}
        <button onClick={handleSendMessage} className="w-full mt-2 p-2 bg-blue-500 text-white rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default App;
