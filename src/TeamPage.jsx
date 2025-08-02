import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';

// Reusing icons from LandingPage
const ArrowRightIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);





const TeamPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    // Scroll to top on component mount (page load/refresh)
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const teamMembers = [
    {
      name: "Sathvik Prasad",
      role: "Co-Founder",
      bio: "Passionate about leveraging AI to transform data engineering workflows. Building the future of intelligent data infrastructure.",
      email: "sathvikprasad@neurostreamai.com"
    },
    {
      name: "Nikhilesh Shenoy",
      role: "Co-Founder", 
      bio: "Focused on creating seamless developer experiences in the data ecosystem. Committed to democratizing data engineering through AI innovation.",
      email: "nikhilesh.shenoy@neurostreamai.com"
    },
    {
      name: "Pranay Srinivas",
      role: "Co-Founder",
      bio: "Dedicated to building scalable AI-powered solutions for modern data teams. Driving the vision of autonomous data infrastructure.",
      email: "pranay.srinivas@neurostreamai.com"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Add CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          background-size: 300% 300%;
          animation: gradient 6s ease infinite;
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? isDarkMode 
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' 
            : 'bg-white/80 backdrop-blur-xl border-b border-gray-200'
          : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center py-6">
            <div className="text-xl font-medium tracking-tight">
              <Link 
                to="/"
                className={`transition-colors duration-300 ${isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-600'}`}
              >
                NeuroStream
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Home</Link>
              <Link to="/about" className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>About</Link>
              <Link to="/team" className={`transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'} font-medium`}>Team</Link>
              <Link to="/contact" className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Contact</Link>
              <div className="flex items-center space-x-4">
                <Link to="/waitlist" className={`px-6 py-2 rounded-full transition-all duration-300 font-medium flex items-center group hover:shadow-lg ${isDarkMode ? 'bg-white text-black hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-800'}`}>
                  Beta Access
                  <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="flex md:hidden items-center space-x-3">
              <Link to="/waitlist" className={`px-4 py-2 rounded-full transition-all duration-300 font-medium text-sm flex items-center group hover:shadow-lg ${isDarkMode ? 'bg-white text-black hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-800'}`}>
                Beta Access
                <ArrowRightIcon className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className={`inline-block px-4 py-2 rounded-full text-sm mb-8 ${isDarkMode ? 'bg-white/5 border border-white/10 text-gray-300' : 'bg-gray-900/5 border border-gray-200 text-gray-600'}`}>
              Meet the Team
            </div>
            
            <h1 className="text-5xl md:text-7xl font-light mb-8 leading-tight tracking-tight">
              Building the future
              <br />
              <span className="font-normal bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-300% bg-size-300">
                together
              </span>
            </h1>
            
            <p className={`text-xl md:text-2xl mb-12 leading-relaxed font-light ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              We're building the future of data engineering with AI-powered intelligence.
              <br />
              Our team combines decades of experience from leading tech companies with cutting-edge AI research.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className={`py-24 px-6 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className={`border rounded-3xl p-8 backdrop-blur-sm transition-all duration-300 hover:scale-105 text-center ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-gray-200 shadow-lg hover:shadow-xl'}`}>
                <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-2xl font-light ${isDarkMode ? 'bg-white/10 border border-white/20' : 'bg-gray-100 border border-gray-200'}`}>
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-2xl font-light mb-2 tracking-tight">{member.name}</h3>
                <p className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-medium mb-4">{member.role}</p>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed mb-6 font-light`}>
                  {member.bio}
                </p>
                <div className={`px-4 py-2 rounded-full text-sm ${isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200'}`}>
                  <a 
                    href={`mailto:${member.email}`}
                    className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    {member.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className={`py-24 px-6 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-light mb-6 tracking-tight">
            Our{' '}
            <span className="font-normal bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-300% bg-size-300">
              Mission
            </span>
          </h2>
          <p className={`text-xl font-light mb-20 leading-relaxed max-w-4xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            We believe data engineering shouldn't be a bottleneck to innovation. Our mission is to democratize data infrastructure by making it as easy as writing a simple prompt.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`border rounded-3xl p-8 backdrop-blur-sm ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-lg'}`}>
              <h3 className="text-xl font-light mb-4 tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">AI-First</h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-light leading-relaxed`}>
                Leveraging cutting-edge AI to automate complex data workflows and reduce manual overhead.
              </p>
            </div>
            <div className={`border rounded-3xl p-8 backdrop-blur-sm ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-lg'}`}>
              <h3 className="text-xl font-light mb-4 tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Developer Experience</h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-light leading-relaxed`}>
                Building tools that data engineers actually love to use, with intuitive interfaces and powerful capabilities.
              </p>
            </div>
            <div className={`border rounded-3xl p-8 backdrop-blur-sm ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-lg'}`}>
              <h3 className="text-xl font-light mb-4 tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Open Source</h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-light leading-relaxed`}>
                Built on proven open-source foundations, ensuring transparency, reliability, and community-driven innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-24 px-6 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light mb-6 tracking-tight">
            Join Our{' '}
            <span className="font-normal bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-300% bg-size-300">
              Journey
            </span>
          </h2>
          <p className={`text-xl font-light mb-16 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            We're always looking for talented individuals who share our vision of transforming data engineering.
          </p>
          <div className="flex justify-center items-center">
            <Link to="/waitlist" className={`px-8 py-4 rounded-full transition-all duration-300 font-medium flex items-center group ${isDarkMode ? 'bg-white text-black hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-800'}`}>
              Invite only
              <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-16 px-6 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-xl font-medium tracking-tight mb-8">
            NeuroStream
          </div>
          <div className="flex justify-center space-x-8 mb-8">
            <Link to="/" className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              Home
            </Link>
            <Link to="/team" className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              Team
            </Link>
            <Link to="/contact" className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              Contact
            </Link>
          </div>
          <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            © 2025 NeuroStream AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TeamPage; 