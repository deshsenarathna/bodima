import React from 'react'
import { CiSearch } from "react-icons/ci";
import bgimage from '../assets/home.jpg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Home = () => {

  const [city, setCity] = useState("");
  const [people, setPeople] = useState(1);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
     if (!city) return alert("Please enter city");
     navigate(`/search?city=${encodeURIComponent(city)}&people=${people}`);
  };
  return (
    <section
      className="relative min-h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${bgimage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
        
  <div className="absolute inset-0 bg-black opacity-70"></div>
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Find Your Perfect Boarding Place
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover comfortable and affordable boarding options for students and working professionals
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Find Your Perfect Place</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  placeholder="Select city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Persons</label>
                <select
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select guests</option>
                  <option value="1">1 Person</option>
                  <option value="2">2 Persons</option>
                  <option value="3">3 Persons</option>
                  <option value="4">4+ Persons</option>
                </select>
              </div>
            </div>
            
            <button
              onClick={handleSearch}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
            >
              <CiSearch className="w-5 h-5" />
              <span>Search Places</span>
            </button>
          </div>
        </div>
      </section>
  )
}

export default Home