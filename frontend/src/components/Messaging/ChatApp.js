import React from 'react';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';

const ChatApp = () => {
  return (
    <div className="flex h-full bg-gray-100">
      <div className="flex w-full mx-auto border border-gray-300 rounded-lg overflow-hidden h-[calc(100vh-4rem)] md:h-[calc(100vh-6rem)]">
        <div className="w-1/3 border-r border-gray-300 bg-white">
          <ChatList />
        </div>
        <div className="w-2/3 bg-white">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
