import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';

// Reusing icons from other pages
const ArrowRightIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const SunIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const CodeIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const DatabaseIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
  </svg>
);

const ChartIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const FlowIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const AboutPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    // Scroll to top on component mount (page load/refresh)
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const workflowSteps = [
    {
      icon: DatabaseIcon,
      title: "Describe your data source and destination",
      description: "Our Airbyte agent configures and sets up connections with a few simple words",
      step: "01"
    },
    {
      icon: CodeIcon,
      title: "Describe your logic",
      description: "dbt models are auto-generated from natural language",
      step: "02"
    },
    {
      icon: FlowIcon,
      title: "Describe your desired flow",
      description: "Dagster DAGs are built instantly",
      step: "03"
    },
    {
      icon: ChartIcon,
      title: "Describe the insight you want",
      description: "Our Visualization Agent turns your dbt models into powerful, interactive dashboards, without ever leaving the platform",
      step: "04"
    }
  ];

  const benefits = [
    {
      title: "Accelerated Setup",
      description: "Go from idea to production-ready data pipeline in minutes, not weeks"
    },
    {
      title: "Reduced Tool Fatigue",
      description: "One unified platform eliminates context-switching between multiple disconnected tools"
    },
    {
      title: "Smarter Collaboration",
      description: "Bridge the gap between engineering and analytics teams with natural language interfaces"
    },
    {
      title: "Strategic Focus",
      description: "More time for high-leverage work that drives business value, less time on repetitive configuration"
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
              <Link to="/about" className={`transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'} font-medium`}>About</Link>
              <Link to="/team" className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Team</Link>
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
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12">
            <div className={`inline-block px-4 py-2 rounded-full text-sm mb-8 ${isDarkMode ? 'bg-white/5 border border-white/10 text-gray-300' : 'bg-gray-900/5 border border-gray-200 text-gray-600'}`}>
              About NeuroStream AI
            </div>
            
            <h1 className="text-5xl md:text-7xl font-light mb-8 leading-tight tracking-tight">
              Reimagining{' '}
              <span className="font-normal bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-300% bg-size-300">
                data engineering
              </span>
            </h1>
            
            <p className={`text-xl md:text-2xl mb-12 leading-relaxed font-light max-w-4xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              We're building a truly AI-native, natural language-driven platform that unifies the entire data engineering lifecycle, from ingestion to transformation to orchestration to analytics.
            </p>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className={`py-24 px-6 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">
              The{' '}
              <span className="font-normal bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-300% bg-size-300">
                problem
              </span>
            </h2>
          </div>
          
          <div className={`border rounded-3xl p-12 backdrop-blur-sm ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-lg'}`}>
            <p className={`text-xl md:text-2xl font-light leading-relaxed text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              The modern data engineering landscape is <span className="font-medium text-red-400">fragmented</span>, <span className="font-medium text-red-400">repetitive</span>, and <span className="font-medium text-red-400">mentally taxing</span>. 
              Ingestion happens in one platform, transformations in another, orchestration in a third, and visualization in yet another disconnected tool.
            </p>
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className={`text-lg font-light leading-relaxed text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Every step demands tool-specific code, configuration, and context-switching, leading to engineering fatigue and lost momentum.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Overview */}
      <section className={`py-24 px-6 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-8 tracking-tight">
            Our{' '}
            <span className="font-normal bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-300% bg-size-300">
              solution
            </span>
          </h2>
          <p className={`text-xl md:text-2xl font-light leading-relaxed mb-16 max-w-4xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            A unified control center for modern data engineering, built from the ground up for developers, with native support for Airbyte, dbt, Dagster, BigQuery, Postgres and more.
          </p>
        </div>
      </section>

      {/* Workflow Steps */}
      <section className={`py-24 px-6 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6 tracking-tight">
              How it{' '}
              <span className="font-normal bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-300% bg-size-300">
                works
              </span>
            </h2>
            <p className={`text-lg font-light ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Natural language meets enterprise-grade data engineering
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {workflowSteps.map((step, index) => (
              <div key={index} className={`border rounded-3xl p-8 backdrop-blur-sm transition-all duration-300 hover:scale-105 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-gray-200 shadow-lg hover:shadow-xl'}`}>
                <div className="flex items-start space-x-6">
                  <div className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center ${isDarkMode ? 'bg-white/10 border border-white/20' : 'bg-gray-100 border border-gray-200'}`}>
                    <step.icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      STEP {step.step}
                    </div>
                    <h3 className="text-xl font-light mb-3 tracking-tight">{step.title}</h3>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed font-light`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Control & Flexibility */}
      <section className={`py-24 px-6 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="max-w-6xl mx-auto">
          <div className={`border rounded-3xl p-12 backdrop-blur-sm ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-lg'}`}>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-light mb-6 tracking-tight">
                Need{' '}
                <span className="font-normal bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-300% bg-size-300">
                  control?
                </span>
              </h2>
            </div>
            <p className={`text-xl font-light leading-relaxed text-center mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Open our NeuroStream code IDE to manually edit dbt, Dagster, or visualization logic/code in real-time.
            </p>
            <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200'}`}>
              <p className={`text-lg font-light leading-relaxed text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                NeuroStream AI offers <span className="font-medium">maximum editability</span> and <span className="font-medium">full developer control</span> at every layer. 
                Built as a user-first architecture, it empowers you to automate the boring and tedious, without sacrificing precision, flexibility, or standards.
              </p>
              <p className={`text-center mt-4 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                The agents assist; you stay in command.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className={`py-24 px-6 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6 tracking-tight">
              Transforming the{' '}
              <span className="font-normal bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-300% bg-size-300">
                experience
              </span>
            </h2>
            <p className={`text-lg font-light ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              We're not just speeding up the process, we're transforming how you work
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className={`border rounded-3xl p-8 backdrop-blur-sm text-center ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-lg'}`}>
                <h3 className="text-xl font-light mb-4 tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {benefit.title}
                </h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-light leading-relaxed`}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-24 px-6 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light mb-6 tracking-tight">
            Ready to{' '}
            <span className="font-normal bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-300% bg-size-300">
              transform
            </span>{' '}
            your data engineering?
          </h2>
          <p className={`text-xl font-light mb-16 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Whether you're designing pipelines or presenting insights to stakeholders, everything happens in one intelligent, AI-augmented space.
          </p>
          <div className="flex justify-center items-center">
            <Link to="/waitlist" className={`px-8 py-4 rounded-full transition-all duration-300 font-medium flex items-center group ${isDarkMode ? 'bg-white text-black hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-800'}`}>
              Join the Beta
              <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

             {/* Footer */}
       <footer className={`py-16 px-6 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
         <div className="max-w-6xl mx-auto text-center">
           <div className="text-xl font-medium tracking-tight mb-8">
             NeuroStream AI
           </div>
           <div className="flex justify-center space-x-8 mb-8">
             <Link to="/" className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
               Home
             </Link>
             <Link to="/about" className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
               About
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

       {/* Theme Toggle */}
       <div className="fixed bottom-6 right-6 z-50">
         <button
           onClick={toggleTheme}
           className={`p-3 rounded-full transition-all duration-300 shadow-lg backdrop-blur-sm ${
             isDarkMode 
               ? 'bg-white/10 border border-white/20 text-white hover:bg-white/20' 
               : 'bg-gray-900/10 border border-gray-200 text-gray-900 hover:bg-gray-900/20'
           }`}
           aria-label="Toggle theme"
         >
           {isDarkMode ? (
             <SunIcon className="w-5 h-5" />
           ) : (
             <MoonIcon className="w-5 h-5" />
           )}
         </button>
       </div>
     </div>
   );
 };

export default AboutPage; 