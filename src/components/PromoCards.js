import React from 'react'
import { FaCar, FaUmbrellaBeach } from 'react-icons/fa';

export default function PromoCards() {
  const promos = [
    {
      title: "CAR RENTALS",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1470&auto=format&fit=crop",
      bgColor: "from-orange-400/50 to-orange-600/50",
      icon: <FaCar className="h-6 w-6" />
    },
    {
      title: "HOTELS",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1476&auto=format&fit=crop",
      bgColor: "from-blue-400/50 to-blue-600/50",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: "TRAVEL PACKAGES",
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1421&auto=format&fit=crop",
      bgColor: "from-green-400/50 to-green-600/50",
      icon: <FaUmbrellaBeach className="h-6 w-6" />
    }
  ]

  return (
    <div className="space-y-4">
      {promos.map((promo, index) => (
        <div 
          key={index} 
          className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group transition-transform hover:scale-[1.02]"
        >
          <img
            src={promo.image}
            alt={promo.title}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${promo.bgColor} transition-opacity`}>
            <div className="absolute inset-x-0 bottom-0 p-4">
              <div className="flex flex-col items-start gap-2 text-white">
                <div className="bg-white/20 p-2 rounded-lg">
                  {promo.icon}
                </div>
                <span className="text-lg font-bold tracking-wider">{promo.title}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

