const webinars = [
    {
      id: 1,
      title: 'Webinar on React Hooks',
      description: 'An in-depth look at React Hooks and how to use them effectively in your projects.',
      date: '2024-09-15',
      time: '10:00 AM - 11:00 AM',
      price: 'Free',
      features: [
        'Access to webinar recording',
        'Interactive Q&A session',
        'Certificate of participation'
      ]
    },
    {
      id: 2,
      title: 'Advanced Tailwind CSS Techniques',
      description: 'Explore advanced techniques and best practices for using Tailwind CSS in your web applications.',
      date: '2024-09-20',
      time: '2:00 PM - 3:00 PM',
      price: '1000',
      features: [
        'Access to exclusive CSS resources',
        'Hands-on coding examples',
        'Certificate of completion'
      ]
    },
  ];
  
  const Joinwebinar = () => {
    return (
      <div className="bg-gradient-to-r min-h-screen from-purple-300 to-blue-200 flex justify-center items-center p-8">
        <div className="flex gap-6 flex-wrap justify-center">
          {webinars.map((webinar) => (
            <div
              key={webinar.id}
              className="flex-1 max-w-xs min-w-[300px] bg-white border border-gray-300 shadow-lg rounded-2xl p-6 text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl transform-gpu"
            >
              <h3 className="text-2xl font-bold text-purple-700 mb-4">{webinar.title}</h3>
              <p className="text-gray-600 mb-4">{webinar.description}</p>
              <div className="mb-6">
                <span className="text-3xl font-bold text-purple-800">{webinar.price}</span>
                <br />
                <span className="text-gray-500">/webinar</span>
              </div>
              <p className="text-gray-600 mb-6">
                <strong>Date:</strong> {webinar.date}
                <br />
                <strong>Time:</strong> {webinar.time}
              </p>
              <div className="mb-6">
                <button
                  onClick={() => alert('Joining webinar...')}
                  className="w-full bg-purple-600 text-white py-3 px-4 rounded-full hover:bg-purple-700 transition duration-300 shadow-md hover:shadow-lg"
                >
                  Join Webinar
                </button>
              </div>
              <ul className="list-disc list-inside text-left text-gray-600">
                {webinar.features.map((feature, index) => (
                  <li key={index} className="py-2 border-t border-gray-300">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Joinwebinar;