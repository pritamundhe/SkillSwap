// // /client/src/pages/Webinar.js
// import React from "react";

// const Webinar = () => {
//   return (
//     <div className="container mx-auto p-6">
//       <header className="text-center mb-8">
//         <h1 className="text-3xl font-bold">Build a Video Chat App</h1>
//         <p className="mt-2">
//           This tutorial will show you how to build a video chat app using
//           JavaScript and NodeJS. It will also show you how to use PeerJS,
//           WebRTC, and Socket.io.
//         </p>
//         <a
//           href="https://video-chat-app-v1.herokuapp.com/"
//           className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded shadow"
//         >
//           Click Here to see live example of the app we’ll be building.
//         </a>
//       </header>

//       <section className="mb-6">
//         <h2 className="text-2xl font-semibold">Pre-Project Setup</h2>
//         <p>Here’s what you’ll need:</p>
//         <ul className="list-disc ml-6">
//           <li>
//             <strong>NodeJS:</strong> Visit the official Node.js website to
//             download and install Node.
//           </li>
//           <li>
//             <strong>NPM:</strong> NPM gets installed when you install Node.js.
//           </li>
//         </ul>
//       </section>

//       <section className="mb-6">
//         <h2 className="text-2xl font-semibold">Project Setup</h2>
//         <p>All the code for this project can be found in the GitHub Repo:</p>
//         <ul className="list-disc ml-6">
//           <li>
//             Create an empty directory named <code>video-chat-app</code>.
//           </li>
//           <li>
//             Run <code>npm init</code>.
//           </li>
//           <li>
//             Install dependencies:{" "}
//             <code>npm install express ejs socket.io uuid peer</code>.
//           </li>
//           <li>
//             Install Nodemon: <code>npm install --save-dev nodemon</code>.
//           </li>
//           <li>
//             Create a file named <code>server.js</code>.
//           </li>
//         </ul>
//       </section>

//       <section className="mb-6">
//         <h2 className="text-2xl font-semibold">
//           Creating our Server (with Express JS)
//         </h2>
//         <p>Let’s create a boilerplate Express starter app:</p>
//         <pre className="bg-gray-100 p-4 rounded">
//           <code>
//             {`const express = require("express");
// const app = express();
// const server = require("http").Server(app);
// app.get("/", (req, res) => {
//     res.status(200).send("Hello World");
// });
// server.listen(3030);`}
//           </code>
//         </pre>
//         <p>Now you can test your server by running:</p>
//         <pre className="bg-gray-100 p-4 rounded">
//           <code>nodemon server.js</code>
//         </pre>
//         <p>
//           Visit:{" "}
//           <a href="http://localhost:3030" className="text-blue-500">
//             localhost:3030
//           </a>{" "}
//           to see "Hello World".
//         </p>
//       </section>

//       <footer className="text-center mt-8">
//         <p>
//           Live Demo:{" "}
//           <a
//             href="https://video-chat-app-v1.herokuapp.com/"
//             className="text-blue-500"
//           >
//             https://video-chat-app-v1.herokuapp.com/
//           </a>
//         </p>
//         <p>
//           Source Code:{" "}
//           <a
//             href="https://github.com/itstaranarora/video-chat-v1"
//             className="text-blue-500"
//           >
//             GitHub Repository
//           </a>
//         </p>
//         <p>Follow me on LinkedIn and GitHub if you find this post useful!</p>
//       </footer>
//     </div>
//   );
// };

// export default Webinar;


import React from 'react';
import { Link } from 'react-router-dom';


function WebinarPage() {
  return (
    <div className="bg-gradient-to-r from-purple-100 to-blue-200 min-h-screen flex justify-center items-center">
      <div className="flex gap-6 flex-wrap justify-center">
        {/* Card 1: Join Webinar */}
        <div className="flex-1 max-w-xs min-w-[280px] bg-white border border-gray-200 shadow-lg rounded-2xl p-8 text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl transform-gpu">
          <h3 className="text-2xl font-bold text-purple-700 mb-6">Join Webinar</h3>
          <p className="text-gray-600 mb-6">Learn from experts in live sessions.</p>
          <div className="flex justify-center">
            <Link to="/join">
              <button className="bg-purple-600 text-white py-3 px-6 rounded-full hover:bg-purple-700 transition duration-300 shadow-md hover:shadow-lg">
                Click Here
              </button>
            </Link>
          </div>
        </div>

        {/* Card 2: Take Webinar */}
        <div className="flex-1 max-w-xs min-w-[280px] bg-white border border-gray-200 shadow-lg rounded-2xl p-8 text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl transform-gpu">
          <h3 className="text-2xl font-bold text-purple-700 mb-6">Take Webinar</h3>
          <p className="text-gray-600 mb-6">Host and manage your own webinar sessions.</p>
          <div className="flex justify-center">
            <Link to="/createwebinar">
            <button className="bg-purple-600 text-white py-3 px-6 rounded-full hover:bg-purple-700 transition duration-300 shadow-md hover:shadow-lg">
              Click Here
            </button>
            </Link>
          </div>
        </div>

        {/* Card 3: Webinar Calendar */}
        {/* <div className="flex-1 max-w-xs min-w-[280px] bg-white border border-gray-200 shadow-lg rounded-2xl p-8 text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl transform-gpu">
          <h3 className="text-2xl font-bold text-purple-700 mb-6">Webinar Calendar</h3>
          <p className="text-gray-600 mb-6">View upcoming webinars and plan your schedule.</p>
          <div className="flex justify-center">
            <Link to="/webinar">
              <button className="bg-purple-600 text-white py-3 px-6 rounded-full hover:bg-purple-700 transition duration-300 shadow-md hover:shadow-lg">
                Click Here
              </button>
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default WebinarPage;