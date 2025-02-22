import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const causes = [
  { id: 1, title: 'Flood Relief', description: 'Help provide essential supplies to flood victims.', goal: 10000, raised: 7500, image: '/flood.jpg' },
  { id: 2, title: 'Disaster Recovery', description: 'Support recovery efforts after natural disasters.', goal: 15000, raised: 9000, image: '/earth.jpg' },
  { id: 3, title: 'Wildfire Relief', description: 'Aid those affected by wildfires.', goal: 12000, raised: 6000, image: '/fire.png' },
];

const DonationPage = () => {
  const navigate = useNavigate();
  const [selectedCause, setSelectedCause] = useState(null);

  const handleOpenModal = (cause) => {
    setSelectedCause(cause);
  };

  const handleCloseModal = () => {
    setSelectedCause(null);
  };

  const handleDonate = () => {
    navigate('/checkout', { state: { cause: selectedCause } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Choose a Cause to Donate</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {causes.map((cause) => (
          <div key={cause.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={cause.image} alt={cause.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{cause.title}</h2>
              <p className="text-gray-600 mb-4">{cause.description}</p>
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{Math.round((cause.raised / cause.goal) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${(cause.raised / cause.goal) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Raised: ${cause.raised.toLocaleString()}</p>
                  <p className="text-sm font-semibold">Goal: ${cause.goal.toLocaleString()}</p>
                </div>
                <button
                  onClick={() => handleOpenModal(cause)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCause && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedCause.title}</h2>
            <img src={selectedCause.image} alt={selectedCause.title} className="w-full h-48 object-cover rounded mb-4" />
            <p className="text-gray-600 mb-4">{selectedCause.description}</p>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Progress</span>
                <span>{Math.round((selectedCause.raised / selectedCause.goal) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${(selectedCause.raised / selectedCause.goal) * 100}%` }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-1">Raised: ${selectedCause.raised.toLocaleString()}</p>
            <p className="text-sm font-semibold mb-4">Goal: ${selectedCause.goal.toLocaleString()}</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
              >
                Close
              </button>
              <button
                onClick={handleDonate}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
              >
                Donate Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationPage;