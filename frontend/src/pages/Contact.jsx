import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import bgimage from '../assets/home.jpg';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

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
            Get in <span className="text-blue-200">Touch</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Contact us anytime.
          </p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Email */}
            <div className="bg-slate-50 rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow border border-gray-200 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-4">
                <Mail className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-700 mb-2">Send us an email anytime</p>
              <a href="mailto:support@bodima.lk" className="text-blue-600 font-semibold hover:text-blue-700">
                support@bodima.lk
              </a>
            </div>

            {/* Phone */}
            <div className="bg-slate-50 rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow border border-gray-200 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-xl mb-4">
                <Phone className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-700 mb-2">Call us during business hours</p>
              <a href="tel:+94771234567" className="text-green-600 font-semibold hover:text-green-700">
                +94 77 123 4567
              </a>
            </div>

            {/* Location */}
            <div className="bg-slate-50 rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow border border-gray-200 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-xl mb-4">
                <MapPin className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Location</h3>
              <p className="text-gray-700">Colombo, Sri Lanka</p>
              <p className="text-sm text-gray-600 mt-2">Available 24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Send us a Message</h2>
            <p className="text-xl text-gray-600">We'll get back to you as soon as possible</p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-8 shadow-lg border border-gray-200">
            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 font-semibold flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Thank you for your message! We'll get back to you soon.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-bold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <Send size={20} />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Business Hours Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Business Hours */}
            <div className="bg-slate-50 rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg">
                  <Clock className="text-yellow-600" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Business Hours</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700 font-semibold">Monday - Friday</span>
                  <span className="text-gray-600">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 font-semibold">Saturday</span>
                  <span className="text-gray-600">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 font-semibold">Sunday</span>
                  <span className="text-gray-600">Closed</span>
                </div>
                <p className="text-sm text-gray-600 mt-4 pt-4 border-t border-gray-200">
                  Email support available 24/7
                </p>
              </div>
            </div>

            {/* FAQ Quick Links */}
            <div className="bg-slate-50 rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
                  <MessageSquare className="text-purple-600" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Quick Help</h3>
              </div>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2">
                    <span>→</span> Learn About Us
                  </Link>
                </li>
                <li>
                  <Link to="/search" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2">
                    <span>→</span> Browse Listings
                  </Link>
                </li>
                <li>
                  <Link to="/add-place" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2">
                    <span>→</span> Post a Listing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Optional) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Find Us</h2>
          <div className="bg-slate-50 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <div className="bg-gray-300 h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-700 font-semibold">Colombo, Sri Lanka</p>
                <p className="text-gray-600 text-sm mt-2">Map coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-blue-100 mb-8">Join thousands of happy users finding their perfect boarding places</p>
          <Link
            to="/search"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white text-blue-600 font-bold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Browse Listings Now
          </Link>
        </div>
      </section>
    </>
  );
};

export default Contact;
