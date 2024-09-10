import React from 'react';

const messages = [
  {
    id: 1,
    text: 'Hey, how are you?',
    sender: 'John Doe',
    time: '12:45 PM',
    isSentByUser: false,
  },
  {
    id: 2,
    text: 'I’m good, thanks! How about you?',
    sender: 'You',
    time: '12:46 PM',
    isSentByUser: true,
  },
  // Add more message objects as needed
];

const ChatWindow = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-6rem)] bg-white rounded-lg shadow-lg">
      <div className="border-b border-gray-300 py-2.5 px-4 md:px-5 sticky top-0 bg-white">
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/50" // Replace with actual image URL
            alt="Profile"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full mr-3 md:mr-4"
          />
          <div>
            <h2 className="text-base md:text-lg font-semibold text-gray-900">Pritam Mundhe</h2>
            <p className="text-xs md:text-sm text-gray-600">Online</p>
          </div>
        </div>
      </div>
      <div className="flex-1 p-2 md:p-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex mb-3 ${
              message.isSentByUser ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs px-3 py-2 shadow ${
                message.isSentByUser ? 'bg-purple-200' : 'bg-gray-200'
              }`}
            >
              <p className="text-xs md:text-sm text-gray-900">{message.text}</p>
              <span className="text-xs text-gray-500">{message.time}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-300 py-2 px-3 md:px-4">
  <div className="flex items-center">
    <input
      type="text"
      className="flex-1 px-4 py-2.5 border focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-100 text-gray-800 placeholder-gray-500"
      placeholder="Type a message..."
    />
    <button className="ml-2 px-5 py-2.5 bg-purple-600 text-white text-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-400">
      Send
    </button>
  </div>
</div>

    </div>
  );
};

export default ChatWindow;
