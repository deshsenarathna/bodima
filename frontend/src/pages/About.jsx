import React from 'react';
import { Users, Target, Heart, Zap, Globe, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import bgimage from '../assets/home.jpg';

const About = () => {
  return (
    <>
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden"
        style={{ backgroundImage: `url(${bgimage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-blue-900/50"></div>
        
        {/* Content */}
        <div className="relative max-w-4xl mx-auto text-center z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            About <span className="text-blue-200">BODIMA</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-2xl mx-auto">
            Connecting students and professionals with their perfect boarding homes
          </p>
          <Link
            to="/search"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-blue-600 font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Explore Listings
          </Link>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-4">
                BODIMA is on a mission to transform the way students and working professionals find boarding accommodations. We believe everyone deserves a safe, comfortable, and affordable place to call home.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Founded with the vision of simplifying the housing search process, BODIMA connects property owners with quality tenants through a transparent, user-friendly platform.
              </p>
              <p className="text-lg text-gray-700">
                Our platform has helped thousands of students and professionals find their perfect boarding places across Sri Lanka.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-4">
                <Target className="text-blue-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Vision</h3>
              <p className="text-gray-700">
                To be the most trusted and convenient platform for finding boarding accommodations, making housing accessible to everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-slate-50 rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-xl mb-4">
                <Heart className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Trust & Integrity</h3>
              <p className="text-gray-700">
                We build trust through transparency, honest listings, and verified information from property owners.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-slate-50 rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-xl mb-4">
                <Users className="text-green-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community First</h3>
              <p className="text-gray-700">
                We put our users at the center of everything we do, continuously improving based on feedback.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-slate-50 rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-100 rounded-xl mb-4">
                <Zap className="text-purple-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-700">
                We constantly innovate to make finding boarding places faster, easier, and more reliable.
              </p>
            </div>

            {/* Value 4 */}
            <div className="bg-slate-50 rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-yellow-100 rounded-xl mb-4">
                <Award className="text-yellow-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality</h3>
              <p className="text-gray-700">
                We maintain high standards for listings and ensure quality experiences for all users.
              </p>
            </div>

            {/* Value 5 */}
            <div className="bg-slate-50 rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-red-100 rounded-xl mb-4">
                <Globe className="text-red-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Accessibility</h3>
              <p className="text-gray-700">
                We make boarding search accessible to everyone, regardless of location or background.
              </p>
            </div>

            {/* Value 6 */}
            <div className="bg-slate-50 rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-100 rounded-xl mb-4">
                <Heart className="text-indigo-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sustainability</h3>
              <p className="text-gray-700">
                We promote sustainable living practices and support eco-friendly boarding options.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl text-blue-100">Helping thousands find their perfect homes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">5000+</div>
              <p className="text-blue-100 text-lg">Active Listings</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">15000+</div>
              <p className="text-blue-100 text-lg">Happy Users</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">25+</div>
              <p className="text-blue-100 text-lg">Cities Covered</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">4.8★</div>
              <p className="text-blue-100 text-lg">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose BODIMA?</h2>
            <p className="text-xl text-gray-600">What makes us different</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-50 rounded-2xl p-8 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg flex-shrink-0">
                  <span className="text-blue-600 font-bold text-xl">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Verified Listings</h3>
                  <p className="text-gray-700">All properties are verified to ensure authenticity and quality standards.</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg flex-shrink-0">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Direct Communication</h3>
                  <p className="text-gray-700">Connect directly with property owners without intermediaries.</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg flex-shrink-0">
                  <span className="text-purple-600 font-bold text-xl">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Interactive Maps</h3>
                  <p className="text-gray-700">View exact locations on maps to understand neighborhoods better.</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg flex-shrink-0">
                  <span className="text-yellow-600 font-bold text-xl">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Transparent Pricing</h3>
                  <p className="text-gray-700">No hidden charges - see exactly what you're paying for.</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg flex-shrink-0">
                  <span className="text-red-600 font-bold text-xl">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Mobile Friendly</h3>
                  <p className="text-gray-700">Search and connect on the go with our responsive platform.</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg flex-shrink-0">
                  <span className="text-indigo-600 font-bold text-xl">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">24/7 Support</h3>
                  <p className="text-gray-700">Get help whenever you need it with our dedicated support team.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Find Your Perfect Boarding Place?</h2>
          <p className="text-lg text-blue-100 mb-8">Join thousands of satisfied users on BODIMA</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/search"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white text-blue-600 font-bold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Browse Listings
            </Link>
            <Link
              to="/add-place"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-blue-700 text-white font-bold hover:bg-blue-800 transition-colors shadow-lg border-2 border-white"
            >
              Post a Listing
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="font-semibold text-gray-900 mb-1">Email</p>
              <p className="text-gray-600">support@bodima.lk</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1">Phone</p>
              <p className="text-gray-600">+94 77 XXX XXXX</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1">Address</p>
              <p className="text-gray-600">Colombo, Sri Lanka</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
