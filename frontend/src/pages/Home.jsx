import React from 'react'
import { CiSearch } from "react-icons/ci";
import { MapPin, Users, DollarSign, Shield, Clock, Award } from "lucide-react";
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
    <>
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center"
        style={{ backgroundImage: `url(${bgimage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-blue-900/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Find Your Perfect <span className="text-blue-300">Boarding Place</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-2">
              Discover comfortable and affordable boarding options for students and working professionals
            </p>
            <p className="text-blue-200">Join thousands of happy residents</p>
          </div>

          {/* Search Form */}
          <div className="bg-slate-50 rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto backdrop-blur-sm bg-opacity-95 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Search Your Ideal Place</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin size={18} className="text-blue-600" />
                  City
                </label>
                <input
                  type="text"
                  placeholder="Enter city name"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Users size={18} className="text-purple-600" />
                  Number of Persons
                </label>
                <select
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 Persons</option>
                  <option value="3">3 Persons</option>
                  <option value="4">4+ Persons</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleSearch}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-bold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <CiSearch className="w-5 h-5" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-xl text-gray-600">Everything you need for a comfortable boarding experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-50 rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-xl mb-4">
                <MapPin className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Easy to Find</h3>
              <p className="text-gray-600">Browse hundreds of listings with detailed locations and photos</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-50 rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-xl mb-4">
                <DollarSign className="text-green-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Affordable Prices</h3>
              <p className="text-gray-600">Competitive rates with transparent pricing, no hidden charges</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-50 rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-100 rounded-xl mb-4">
                <Shield className="text-purple-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Safe & Secure</h3>
              <p className="text-gray-600">Verified listings and direct contact with property owners</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-slate-50 rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-yellow-100 rounded-xl mb-4">
                <Clock className="text-yellow-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quick Response</h3>
              <p className="text-gray-600">Direct messaging with owners for instant updates</p>
            </div>

            {/* Feature 5 */}
            <div className="bg-slate-50 rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-red-100 rounded-xl mb-4">
                <Award className="text-red-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Assured</h3>
              <p className="text-gray-600">Curated listings to ensure you get the best options</p>
            </div>

            {/* Feature 6 */}
            <div className="bg-slate-50 rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-100 rounded-xl mb-4">
                <Users className="text-indigo-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600">Connect with thousands of residents and property owners</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Find Your Perfect Boarding Place?</h2>
          <p className="text-lg text-blue-100 mb-8">Start your search today and discover amazing places in your city</p>
          <button
            onClick={() => {
              document.querySelector('input[placeholder="Enter city name"]')?.focus();
            }}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
          >
            Start Searching
          </button>
        </div>
      </section>
    </>
  )
}

export default Home