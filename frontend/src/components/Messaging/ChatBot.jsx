import React from 'react'

const ChatBot = () => {
  return (
    <div className=" bg-gradient-to-r from-purple-100 to-blue-200 flex items-center justify-center p-4">
      <div className="w-3/4 h-fit aspect-video  rounded -sm">
        {/* Content goes here */}<iframe
          allow="microphone;"
          width="100%"
          max-width="48rem"
          height="430"
          src="https://www.chatbase.co/chatbot-iframe/NU6lWFXaqOEEu_hoqON0y"
          title="Chatbot"
          className="border border-gray-300 rounded"
        ></iframe>
      </div>
    </div>
  )
}

export default ChatBot;
