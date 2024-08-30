"use client";
import React, { useEffect, useState } from 'react';

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/contact/messages');
        const data = await response.json();

        if (data.success) {
          setMessages(data.data);
        } else {
          console.error('Failed to fetch messages');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2 className="text-4xl text-center font-bold mb-4">Messages</h2>
      {messages.length > 0 ? (
        <ul className="space-y-4">
          {messages.map((message) => (
            <li key={message._id} className="bg-white p-4 border rounded-lg shadow">
              <p><strong>Email:</strong> {message.email}</p>
              <p><strong>Subject:</strong> {message.subject}</p>
              <p><strong>Message:</strong> {message.message}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No messages found.</p>
      )}
    </div>
  );
};

export default MessageList;
