import React from 'react';

const chats = [
  {
    id: 1,
    name: 'Pritam Mundhe',
    message: 'Hey, how are you?',
    time: '12:45 PM',
    profilePic: 'https://via.placeholder.com/50', // Replace with actual image URL
  },
  {
    id: 2,
    name: 'Bhushan Rokade',
    message: 'Let’s meet tomorrow!',
    time: '11:30 AM',
    profilePic: 'https://via.placeholder.com/50', // Replace with actual image URL
  },
  // Add more chat objects as needed
];

const ChatList = () => {
  return (
    <div className="w-full h-full bg-gray-100 mx-1">
      <div className="border-b border-gray-300 py-5 px-10 sticky top-0 bg-white">
        <h1 className="text-xl font-semibold text-gray-800 ">Chats</h1>
      </div>
      <div className="overflow-y-auto">
        {chats.map((chat) => (
          <div 
            key={chat.id} 
            className="flex items-center p-2 bg-white hover:bg-gray-50 cursor-pointer mx-2 my-1 rounded-lg shadow-sm"
          >
            <img
              src={chat.profilePic}
              alt={`${chat.name}'s profile`}
              className="w-14 h-14 rounded-full mr-4"
            />
            <div className="flex-1  pb-2">
              <div className="flex justify-between items-center mb-1">
                <h2 className="text-lg font-semibold text-gray-900">{chat.name}</h2>
                <span className="text-xs text-gray-500">{chat.time}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{chat.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
