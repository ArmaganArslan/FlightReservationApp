import React, { useState } from 'react';

export default function Sidebar() {
  const [selectedArrivalTime, setSelectedArrivalTime] = useState('');
  const [selectedStops, setSelectedStops] = useState('');
  const [selectedAirlines, setSelectedAirlines] = useState([]);

  const airlines = [
    { name: 'Alitalia', price: 230 },
    { name: 'Lufthansa', price: 230 },
    { name: 'Air France', price: 230 },
    { name: 'Brussels Airlines', price: 230 },
    { name: 'Air Italy', price: 230 },
    { name: 'Siberia', price: 230 },
  ];

  const radioClass = "appearance-none w-4 h-4 border-2 border-gray-300 rounded-full checked:bg-[rgb(73,26,149)] checked:border-[rgb(73,26,149)]";

  return (
    <aside className="bg-purple-50 p-6 rounded-lg space-y-6">
      {/* Sort by */}
      <div className="space-y-2">
        <h3 className="text-gray-900 font-medium">Sort by:</h3>
        <div className="relative">
          <select className="w-full p-2.5 bg-white border border-purple-200 rounded-full appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[rgb(73,26,149)] transition-all hover:border-[rgb(73,26,149)]">
            <option>Lowest Price</option>
            <option>Highest Price</option>
            <option>Shortest Duration</option>
            <option>Earliest Departure</option>
          </select>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg 
              className="w-4 h-4 text-[rgb(73,26,149)]" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M19 9l-7 7-7-7" 
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Arrival Time */}
      <div className="space-y-3">
        <h3 className="text-gray-900 font-medium">Arrival Time</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-3">
            <div className="relative">
              <input
                type="radio"
                name="arrival-time"
                value="morning"
                className={radioClass}
                onChange={(e) => setSelectedArrivalTime(e.target.value)}
                checked={selectedArrivalTime === 'morning'}
              />
            </div>
            <span className="text-gray-700">5:00 AM - 11:59 AM</span>
          </label>
          <label className="flex items-center space-x-3">
            <div className="relative">
              <input
                type="radio"
                name="arrival-time"
                value="afternoon"
                className={radioClass}
                onChange={(e) => setSelectedArrivalTime(e.target.value)}
                checked={selectedArrivalTime === 'afternoon'}
              />
            </div>
            <span className="text-gray-700">12:00 PM - 5:59 PM</span>
          </label>
        </div>
      </div>

      {/* Stops */}
      <div className="space-y-3">
        <h3 className="text-gray-900 font-medium">Stops</h3>
        <div className="space-y-2">
          {['Nonstop', '1 Stop', '2+ Stops'].map((stop) => (
            <label key={stop} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <input
                    type="radio"
                    name="stops"
                    value={stop}
                    className={radioClass}
                    onChange={(e) => setSelectedStops(e.target.value)}
                    checked={selectedStops === stop}
                  />
                </div>
                <span className="text-gray-700">{stop}</span>
              </div>
              <span className="text-gray-500">$230</span>
            </label>
          ))}
        </div>
      </div>

      {/* Airlines */}
      <div className="space-y-3">
        <h3 className="text-gray-900 font-medium">Airlines Included</h3>
        <div className="space-y-2">
          {airlines.map((airline) => (
            <label key={airline.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <input
                    type="radio"
                    name="airline"
                    value={airline.name}
                    className={radioClass}
                    onChange={(e) => setSelectedAirlines([e.target.value])}
                    checked={selectedAirlines.includes(airline.name)}
                  />
                </div>
                <span className={`text-gray-700 ${airline.name === 'Siberia' ? 'text-gray-400' : ''}`}>
                  {airline.name}
                </span>
              </div>
              <span className="text-gray-500">${airline.price}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}

