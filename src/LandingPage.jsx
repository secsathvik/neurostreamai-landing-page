import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';

// Move roles array outside component to avoid dependency issues
const roles = [
  'Data Engineers',
  'Analytics Engineers', 
  'Data Analysts',
  'ML Engineers',
  'Product Managers'
];

// Minimal SVG Icons
const ArrowRightIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const CheckIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
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

const PlusIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
  </svg>
);

const MinusIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12H4" />
  </svg>
);

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const [expandedSections, setExpandedSections] = useState({});
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    // Scroll to top on component mount (page load/refresh)
    window.scrollTo(0, 0);
    
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Theme is now managed by ThemeContext

  const toggleSection = (categoryIndex) => {
    setExpandedSections(prev => ({
      ...prev,
      [categoryIndex]: !prev[categoryIndex]
    }));
  };

  const features = [
    {
      category: "AI-Powered Intelligence",
      items: [
        {
          title: "Intelligent Automation",
          description: "AI agents that understand your data infrastructure and automatically optimize pipelines."
        },
        {
          title: "Natural Language Interface",
          description: "Ask questions in plain English. Get SQL, insights, and visualizations instantly."
        },
        {
          title: "Role-Specific Intelligence",
          description: "Each role gets a specialized AI assistant trained on domain expertise."
        },
        {
          title: "Autonomous Problem Solving",
          description: "Self-healing pipelines that detect and fix issues without human intervention."
        },
        {
          title: "Smart Resource Optimization",
          description: "AI automatically adjusts compute and storage based on workload patterns."
        }
      ]
    },
    {
      category: "Universal Data Connectivity",
      items: [
        {
          title: "300+ Pre-Built Connectors",
          description: "Connect any data source with battle-tested Airbyte integrations."
        },
        {
          title: "Real-Time & Batch Processing",
          description: "Handle streaming and scheduled data loads with flexible orchestration."
        },
        {
          title: "Automatic Schema Evolution",
          description: "Adapt to source changes without breaking downstream processes."
        },
        {
          title: "Custom Connector Support",
          description: "Build specialized connectors for unique data sources and APIs."
        },
        {
          title: "High-Volume Data Handling",
          description: "Scale from gigabytes to petabytes with enterprise-grade performance."
        }
      ]
    },
    {
      category: "Modern Data Transformations",
      items: [
        {
          title: "SQL-First Approach",
          description: "Build models using familiar SQL with dbt's powerful transformation framework."
        },
        {
          title: "Version-Controlled Models",
          description: "Track changes, test modifications, and collaborate with Git integration."
        },
        {
          title: "AI-Generated Models",
          description: "Describe business requirements in plain language. Get production-ready SQL."
        },
        {
          title: "Built-In Testing Framework",
          description: "Ensure data quality with automated validation and anomaly detection."
        },
        {
          title: "Dependency Management",
          description: "Automatic model orchestration based on data lineage and dependencies."
        }
      ]
    },
    {
      category: "Smart Orchestration",
      items: [
        {
          title: "Asset-Based Workflows",
          description: "Orchestrate data assets, not just tasks, with intelligent dependency tracking."
        },
        {
          title: "Event-Driven Automation",
          description: "Trigger workflows based on data arrival, quality checks, or business events."
        },
        {
          title: "Parallel Processing",
          description: "Optimize execution time with intelligent parallelization of independent tasks."
        },
        {
          title: "Failure Recovery",
          description: "Automatic retries and fallback strategies keep your pipelines running."
        },
        {
          title: "Cross-System Coordination",
          description: "Seamlessly orchestrate across databases, APIs, and cloud services."
        }
      ]
    },
    {
      category: "Complete Observability",
      items: [
        {
          title: "Real-Time Monitoring",
          description: "Track pipeline health, performance, and costs with Prometheus metrics."
        },
        {
          title: "Data Quality Dashboards",
          description: "Monitor freshness, completeness, and accuracy across all data assets."
        },
        {
          title: "Smart Alerting",
          description: "Get notified of issues before they impact business operations."
        },
        {
          title: "Performance Analytics",
          description: "Identify bottlenecks and optimization opportunities automatically."
        },
        {
          title: "Custom Metrics",
          description: "Define and track business-specific KPIs and data quality measures."
        }
      ]
    },
    {
      category: "Enterprise Security",
      items: [
        {
          title: "Zero-Trust Architecture",
          description: "Role-based access control with granular permissions and audit trails."
        },
        {
          title: "Data Privacy Protection",
          description: "Automatic PII detection, masking, and compliance enforcement."
        },
        {
          title: "Encryption Everywhere",
          description: "Data encrypted at rest, in transit, and during processing."
        },
        {
          title: "Compliance Ready",
          description: "Meet SOC 2, GDPR, HIPAA, and other regulatory requirements."
        },
        {
          title: "Security Monitoring",
          description: "Continuous threat detection and automated security policy enforcement."
        }
      ]
    },
    {
      category: "Developer-First Platform",
      items: [
        {
          title: "Infrastructure as Code",
          description: "Terraform-based deployments ensure consistent, reproducible environments."
        },
        {
          title: "GitOps Workflows",
          description: "Version-controlled pipelines with automated CI/CD and testing."
        },
        {
          title: "Local Development",
          description: "Test changes locally before deploying to production environments."
        },
        {
          title: "API-First Design",
          description: "Comprehensive REST and GraphQL APIs for custom integrations."
        },
        {
          title: "SDK Support",
          description: "Python and JavaScript libraries for extending platform capabilities."
        }
      ]
    },
    {
      category: "Business Intelligence Ready",
      items: [
        {
          title: "Native BI Integration",
          description: "Connect directly to Tableau, Power BI, Looker, and other BI tools."
        },
        {
          title: "Semantic Layer",
          description: "Consistent metrics definitions across all reporting and analytics tools."
        },
        {
          title: "Automated Reporting",
          description: "AI-generated insights and executive summaries delivered on schedule."
        },
        {
          title: "Interactive Dashboards",
          description: "Build and share real-time dashboards with drag-and-drop simplicity."
        },
        {
          title: "Mobile Analytics",
          description: "Access insights and monitor pipelines from any device, anywhere."
        }
      ]
    },
    {
      category: "Transparent Pricing",
      items: [
        {
          title: "Usage-Based Model",
          description: "Pay only for data processed and compute resources consumed."
        },
        {
          title: "Cost Monitoring",
          description: "Real-time tracking of infrastructure costs with budget alerts."
        },
        {
          title: "Resource Optimization",
          description: "AI automatically rightsizes compute to minimize waste and maximize performance."
        },
        {
          title: "Predictable Scaling",
          description: "Linear cost scaling as your data and team grow."
        },
        {
          title: "No Hidden Fees",
          description: "Transparent pricing with no surprise charges or vendor lock-in costs."
        }
      ]
    }
  ];

  const testimonials = [
    {
      quote: "NeuroStream reduced our pipeline debugging time by 70%. The AI actually understands our infrastructure.",
      author: "Sarah Chen",
      role: "Senior Data Engineer at TechCorp"
    },
    {
      quote: "I can finally get complex data insights without constantly asking the engineering team.",
      author: "Emily Johnson",
      role: "Product Manager at Growth Labs"
    },
    {
      quote: "The AI suggestions for dbt optimizations are consistently better than what I would write myself.",
      author: "Mike Rodriguez",
      role: "Analytics Engineer at DataFlow"
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
              <button 
                onClick={() => {
                  // Scroll to top and refresh to reset all state
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  // Small delay to allow smooth scroll, then refresh
                  setTimeout(() => {
                    window.location.href = window.location.pathname;
                  }, 300);
                }}
                className={`transition-colors duration-300 hover:scale-105 ${isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-600'}`}
              >
                NeuroStream
              </button>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={`transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'} font-medium`}>Home</Link>
              <Link to="/about" className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>About</Link>
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
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className={`inline-block px-4 py-2 rounded-full text-sm mb-8 ${isDarkMode ? 'bg-white/5 border border-white/10 text-gray-300' : 'bg-gray-900/5 border border-gray-200 text-gray-600'}`}>
              AI-Powered Data Engineering Platform
            </div>
            
            <h1 className="text-5xl md:text-7xl font-light mb-8 leading-tight tracking-tight">
              Data engineering
              <br />
              <span className="font-normal bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-300% bg-size-300">
                reimagined
              </span>
            </h1>
            
            <p className={`text-xl md:text-2xl mb-12 leading-relaxed font-light ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Intelligent AI assistants for{' '}
              <span className={`transition-all duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {roles[currentRole]}
              </span>
              <br />
              Build, monitor, and optimize data pipelines with conversational AI
            </p>
            
            <div className="flex justify-center items-center mb-16">
              <Link to="/waitlist" className={`px-8 py-4 rounded-full transition-all duration-300 font-medium flex items-center group ${isDarkMode ? 'bg-white text-black hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-800'}`}>
                Invite only
                <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
            
            <div className={`flex items-center justify-center space-x-8 text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              <span>Request beta access</span>
              <span>•</span>
              <span>Handpicked community</span>
              <span>•</span>
              <span>Setup in minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className={`py-24 px-6 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6 tracking-tight">
              AI that understands your role
            </h2>
            <p className={`text-xl font-light ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Each assistant is trained on role-specific knowledge and best practices.
            </p>
          </div>
          
          <div className={`border rounded-3xl p-8 backdrop-blur-sm ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-lg'}`}>
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className={`text-sm ml-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>NeuroStream AI Assistant</span>
            </div>
            
            <div className="space-y-6">
              <div className={`rounded-2xl p-6 border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-200'}`}>
                <p className={`font-light ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  "Build an ELT pipeline: extract user data from a CSV, clean it, filter active users, and load the results into BigQuery as active_users."
                </p>
              </div>
              
              <div className={`rounded-2xl p-6 border ${isDarkMode ? 'bg-white/10 border-white/20' : 'bg-white border-gray-300 shadow-sm'}`}>
                <p className={`font-light leading-relaxed ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  🔧 NeuroStream auto-generates:
                  <br /><br />
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  <strong className={isDarkMode ? 'text-white' : 'text-gray-900'}>Smart Dagster asset code</strong>
                  <br />
                  • CSV extraction with automatic schema detection
                  <br />
                  • Data cleaning transformations (nulls, duplicates, validation)
                  <br />
                  • Active user filtering logic
                  <br />
                  • BigQuery connector with optimized partitioning
                  <br /><br />
                  <strong className={isDarkMode ? 'text-white' : 'text-gray-900'}>Clean visual DAG</strong>
                  <br />
                  • Interactive pipeline visualization
                  <br />
                  • Real-time execution monitoring
                  <br />
                  • Data lineage tracking
                  <br /><br />
                  <strong className={isDarkMode ? 'text-white' : 'text-gray-900'}>Everything editable in one place</strong>
                  <br />
                  • Code editor with syntax highlighting
                  <br />
                  • One-click deployment to production
                  <br />
                  • Built-in testing and validation
                  </span>
                  <br /><br />
                  Ready to deploy your pipeline in 3 minutes instead of 3 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`py-24 px-6 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">
              Powered by{' '}
              <span className="font-normal bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-300% bg-size-300">
                intelligence
              </span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto font-light ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              NeuroStream combines proven open-source tools with cutting-edge AI to create a platform that thinks and adapts.
            </p>
            <p className={`text-lg max-w-2xl mx-auto font-medium mt-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              Explore our key features below:
            </p>
          </div>
          
          <div className="space-y-16">
            {features.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-8">
                <div className="text-center">
                  <button
                    onClick={() => toggleSection(categoryIndex)}
                    className={`inline-flex items-center space-x-3 text-3xl font-light mb-4 tracking-tight transition-colors duration-300 ${
                      isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-600'
                    }`}
                  >
                    <span>{category.category}</span>
                    <div className={`transition-transform duration-300 ${expandedSections[categoryIndex] ? 'rotate-0' : 'rotate-0'}`}>
                      {expandedSections[categoryIndex] ? (
                        <MinusIcon className="w-6 h-6" />
                      ) : (
                        <PlusIcon className="w-6 h-6" />
                      )}
                    </div>
                  </button>
                </div>
                
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  expandedSections[categoryIndex] 
                    ? 'max-h-screen opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}>
                  <div className="flex flex-wrap justify-center gap-8">
                    {category.items.map((feature, featureIndex) => (
                      <div key={featureIndex} className={`group p-6 rounded-2xl border transition-all duration-300 w-full max-w-sm md:w-80 lg:w-72 text-center ${
                        isDarkMode 
                          ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' 
                          : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm'
                      }`}>
                        <h4 className={`text-lg font-medium mb-3 transition-colors duration-300 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {feature.title}
                        </h4>
                        <p className={`text-sm leading-relaxed font-light ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`py-24 px-6 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6 tracking-tight">
              Trusted by data teams
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className={`border rounded-2xl p-8 backdrop-blur-sm ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-lg'}`}>
                <p className={`text-lg mb-8 leading-relaxed font-light italic ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  "{testimonial.quote}"
                </p>
                <div>
                  <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{testimonial.author}</div>
                  <div className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className={`py-24 px-6 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-6 tracking-tight">
              Simple, transparent pricing
            </h2>
            <p className={`text-xl font-light ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Start free, scale as you grow</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className={`border rounded-3xl p-8 backdrop-blur-sm ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-lg'}`}>
              <div className="mb-8">
                <h3 className="text-2xl font-medium mb-2">Starter</h3>
                <div className="mb-4">
                  <span className="text-4xl font-light">Free</span>
                </div>
                <p className={`font-light ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Perfect for small teams getting started</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <CheckIcon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="font-light">Up to 3 team members</span>
                </li>
                <li className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <CheckIcon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="font-light">Basic AI assistant</span>
                </li>
                <li className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <CheckIcon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="font-light">1M rows processed/month</span>
                </li>
                <li className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <CheckIcon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="font-light">Community support</span>
                </li>
              </ul>
              
              <Link to="/waitlist" className={`w-full py-3 rounded-full transition-all duration-300 font-medium flex items-center justify-center ${isDarkMode ? 'border border-white/20 hover:border-white/40' : 'border border-gray-300 hover:border-gray-400'}`}>
                Start free
              </Link>
            </div>

            {/* Pro Plan */}
            <div className={`rounded-3xl p-8 relative ${isDarkMode ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
                  Most popular
                </span>
              </div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-medium mb-2">Professional</h3>
                <div className="mb-4">
                  <span className="text-4xl font-light">Contact for pricing</span>
                </div>
                <p className={`font-light ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`}>For growing data teams</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className={`flex items-center ${isDarkMode ? 'text-gray-800' : 'text-gray-200'}`}>
                  <CheckIcon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="font-light">Up to 15 team members</span>
                </li>
                <li className={`flex items-center ${isDarkMode ? 'text-gray-800' : 'text-gray-200'}`}>
                  <CheckIcon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="font-light">Full AI assistant suite</span>
                </li>
                <li className={`flex items-center ${isDarkMode ? 'text-gray-800' : 'text-gray-200'}`}>
                  <CheckIcon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="font-light">50M rows processed/month</span>
                </li>
                <li className={`flex items-center ${isDarkMode ? 'text-gray-800' : 'text-gray-200'}`}>
                  <CheckIcon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="font-light">Priority support</span>
                </li>
                <li className={`flex items-center ${isDarkMode ? 'text-gray-800' : 'text-gray-200'}`}>
                  <CheckIcon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="font-light">Advanced analytics</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-24 px-6 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-8 tracking-tight">
            Ready to transform your data workflow?
          </h2>
          <p className={`text-xl mb-12 font-light ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Join thousands of data professionals using AI to build better pipelines, faster.
          </p>
          
          <div className="flex justify-center">
            <Link to="/waitlist" className={`px-8 py-4 rounded-full transition-all duration-300 font-medium flex items-center justify-center group hover:shadow-lg ${isDarkMode ? 'bg-white text-black hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-800'}`}>
              Request beta access
              <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t py-12 px-6 ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-xl font-medium mb-6 tracking-tight">NeuroStream</div>
              <p className={`font-light ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                AI-powered data engineering platform for modern teams.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Product</h4>
              <ul className={`space-y-3 font-light ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li><button type="button" className={`transition-colors duration-300 ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'} text-left`}>Features</button></li>
                <li><button type="button" className={`transition-colors duration-300 ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'} text-left`}>Pricing</button></li>
                <li><button type="button" className={`transition-colors duration-300 ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'} text-left`}>Documentation</button></li>
                <li><button type="button" className={`transition-colors duration-300 ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'} text-left`}>API</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className={`space-y-3 font-light ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li><Link to="/about" className={`transition-colors duration-300 ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'}`}>About</Link></li>
                <li><Link to="/team" className={`transition-colors duration-300 ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'}`}>Team</Link></li>
                <li><Link to="/contact" className={`transition-colors duration-300 ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'}`}>Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Resources</h4>
              <ul className={`space-y-3 font-light ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li><button type="button" className={`transition-colors duration-300 ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'} text-left`}>Help Center</button></li>
                <li><button type="button" className={`transition-colors duration-300 ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'} text-left`}>Community</button></li>
                <li><button type="button" className={`transition-colors duration-300 ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'} text-left`}>Privacy</button></li>
                <li><button type="button" className={`transition-colors duration-300 ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'} text-left`}>Terms</button></li>
              </ul>
            </div>
          </div>
          
          <div className={`border-t pt-8 mt-12 text-center font-light ${isDarkMode ? 'border-white/10 text-gray-500' : 'border-gray-200 text-gray-400'}`}>
            <p>&copy; 2025 NeuroStream AI. All rights reserved.</p>
          </div>
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

export default LandingPage; 