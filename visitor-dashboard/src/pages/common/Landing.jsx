import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';  
import  vmslogo  from '../../assets/VMS.svg';
import {
  Shield,
  Bell,
  BarChart3,
  CreditCard,
  ArrowRight,
  CheckCircle,
  Star,
  Menu,
  X,
  Eye,
  UserPlus,
  Activity,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Users,
  Clock,
  Globe,
  Lock,
  Zap,
  TrendingUp,
  Award,
  Building2,
  Smartphone,
  Cloud,
  Database,
  QrCode,
  MessageSquare,
  Calendar,
  FileText,
  AlertCircle,
  ChevronRight,
  Play,
  Download,
  BookOpen
} from 'lucide-react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [pricingType, setPricingType] = useState('monthly');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const testimonials = [
    {
      quote: "Estmac VMS revolutionized our visitor management with its contactless QR system. The cloud dashboard gives us complete control across all our locations.",
      name: "Rajesh Kumar",
      position: "IT Director",
      company: "Infosys Technologies",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      quote: "The WhatsApp integration and AI-powered analytics have transformed our healthcare facility's visitor experience. Zero paper waste and 100% efficiency.",
      name: "Dr. Priya Sharma",
      position: "Hospital Administrator",
      company: "Apollo Hospitals",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      quote: "From a 45-minute manual process to 2-minute digital check-in. The ROI was immediate and our visitors love the professional experience.",
      name: "Amit Patel",
      position: "Facilities Manager",
      company: "Tata Consultancy Services",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      monthly: "₹2,999",
      yearly: "₹2,499",
      customize: "Custom Pricing",
      description: "Perfect for small offices",
      features: [
        "Up to 500 visitors/month",
        "QR Code Check-in/out",
        "WhatsApp notifications",
        "Basic analytics dashboard",
        "Email support",
        "Single location"
      ],
      popular: false,
      cta: "Start Free Trial"
    },
    {
      name: "Professional",
      monthly: "₹4,999",
      yearly: "₹4,199",
      customize: "Custom Pricing",
      description: "Ideal for growing businesses",
      features: [
        "Up to 2,000 visitors/month",
        "Advanced AI analytics",
        "Custom digital passes",
        "Multi-channel notifications",
        "Priority support",
        "Up to 3 locations",
        "API integrations",
        "Custom branding"
      ],
      popular: true,
      cta: "Most Popular"
    },
    {
      name: "Enterprise",
      monthly: "₹9,999",
      yearly: "₹8,499",
      customize: "Custom Pricing",
      description: "For large organizations",
      features: [
        "Unlimited visitors",
        "Advanced security protocols",
        "Full custom branding",
        "Complete API access",
        "24/7 dedicated support",
        "Unlimited locations",
        "Custom integrations",
        "White-label solution",
        "SLA guarantee"
      ],
      popular: false,
      cta: "Contact Sales"
    }
  ];

  const featuresList = [
    {
      icon: QrCode,
      title: "Contactless QR Check-In",
      description: "Revolutionary QR-based contactless visitor registration with zero hardware dependency and instant digital pass generation."
    },
    {
      icon: Cloud,
      title: "Cloud-Enabled Dashboard",
      description: "Powerful central management platform providing real-time visibility and control across multiple locations."
    },
    {
      icon: MessageSquare,
      title: "WhatsApp Integration",
      description: "Seamless WhatsApp-enabled digital passes and notifications for enhanced visitor communication."
    },
    {
      icon: BarChart3,
      title: "AI-Powered Analytics",
      description: "Smart memory system with comprehensive insights into visitor patterns, peak times, and detailed reporting."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Advanced security protocols with multi-layer authentication and comprehensive audit trails."
    },
    {
      icon: Zap,
      title: "Paperless Workflow",
      description: "Complete digital transformation eliminating paper waste and streamlining visitor management processes."
    }
  ];

  const industriesList = [
    {
      icon: Building2,
      title: "Corporate Offices",
      description: "Professional visitor management for modern workplaces",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Users,
      title: "Healthcare",
      description: "Secure patient and visitor tracking for medical facilities",
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: BookOpen,
      title: "Education",
      description: "Student and parent visitor management for schools",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Globe,
      title: "Government",
      description: "High-security visitor protocols for government buildings",
      color: "from-purple-600 to-pink-600"
    },
    {
      icon: Building2,
      title: "Manufacturing",
      description: "Industrial visitor safety and access control",
      color: "from-pink-500 to-orange-500"
    },
    {
      icon: Users,
      title: "Retail",
      description: "Customer and vendor visitor management solutions",
      color: "from-orange-500 to-purple-500"
    }
  ];

  const benefitsList = [
    {
      icon: TrendingUp,
      title: "99.9% Uptime",
      description: "Reliable cloud infrastructure ensuring continuous operation"
    },
    {
      icon: Clock,
      title: "50% Time Savings",
      description: "Automated processes reduce visitor processing time significantly"
    },
    {
      icon: Award,
      title: "ISO Certified",
      description: "Enterprise-grade security and compliance standards"
    },
    {
      icon: Globe,
      title: "Multi-Location",
      description: "Centralized management across unlimited locations"
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  const getPrice = (plan) =>
    pricingType === 'monthly'
      ? `${plan.monthly} /month`
      : pricingType === 'yearly'
      ? `${plan.yearly} /month (billed annually)`
      : 'According to requirement, pricing will vary';

  // Contact Modal
  const ContactModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 w-[90vw] max-w-lg relative shadow-xl">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={() => setIsContactModalOpen(false)}
        >
          <X className="w-6 h-6" />
        </button>
        <h3 className="text-xl font-bold mb-4 text-gray-900">Contact Us</h3>
        <form className="space-y-4">
          <input className="w-full p-2 border rounded" type="text" placeholder="Name" />
          <input className="w-full p-2 border rounded" type="email" placeholder="Email" />
          <textarea className="w-full p-2 border rounded" rows="4" placeholder="Message"></textarea>
          <button type="submit" className="w-full mt-2 text-white py-3 rounded-lg font-semibold" style={{backgroundColor: '#1E3A8A'}}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );

  // Video Modal
  const VideoModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-lg p-6 relative w-[95vw] max-w-2xl">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <X className="w-7 h-7" />
        </button>
        <h3 className="text-lg font-bold mb-4 text-gray-900">How It Works Demo</h3>
        <div className="w-full aspect-video rounded overflow-hidden">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/Po3jStA673E" // Replace with your demo video link if needed
            title="Demo Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {isContactModalOpen && <ContactModal />}
      {isVideoModalOpen && <VideoModal />}

      {/* Header / Navbar */}
      <header className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-left space-x-2">
              {/* <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center"> */}
                {/* <Shield className="w-5 h-5 text-white" /> */}
               <img src={vmslogo} alt="" width={250}/>
              {/* </div> */}
              {/* <span className="text-xl font-bold text-gray-900">VMS-Estmac</span> */}
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 transition-colors" onMouseEnter={(e) => e.target.style.color = '#1E3A8A'} onMouseLeave={(e) => e.target.style.color = '#374151'}>Features</a>
              <a href="#pricing" className="text-gray-700 transition-colors" onMouseEnter={(e) => e.target.style.color = '#1E3A8A'} onMouseLeave={(e) => e.target.style.color = '#374151'}>Pricing</a>
              <a href="#about" className="text-gray-700 transition-colors" onMouseEnter={(e) => e.target.style.color = '#1E3A8A'} onMouseLeave={(e) => e.target.style.color = '#374151'}>About</a>
              {/* <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a> */}
              <button 
                className="text-white px-6 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2"
                style={{backgroundColor: '#1E3A8A'}}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#1E40AF'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#1E3A8A'}
                onClick={() => setIsContactModalOpen(true)}>
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden py-4 border-t border-gray-200"
            >
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-700 transition-colors" onMouseEnter={(e) => e.target.style.color = '#1E3A8A'} onMouseLeave={(e) => e.target.style.color = '#374151'}>Features</a>
                <a href="#pricing" className="text-gray-700 transition-colors" onMouseEnter={(e) => e.target.style.color = '#1E3A8A'} onMouseLeave={(e) => e.target.style.color = '#374151'}>Pricing</a>
                <a href="#about" className="text-gray-700 transition-colors" onMouseEnter={(e) => e.target.style.color = '#1E3A8A'} onMouseLeave={(e) => e.target.style.color = '#374151'}>Our Clients</a>
                <a href="#contact" className="text-gray-700 transition-colors" onMouseEnter={(e) => e.target.style.color = '#1E3A8A'} onMouseLeave={(e) => e.target.style.color = '#374151'}>Contact</a>
                <button 
                  className="text-white px-6 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 w-fit"
                  style={{backgroundColor: '#1E3A8A'}}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#1E40AF'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#1E3A8A'}
                  onClick={() => setIsContactModalOpen(true)}>
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8" style={{backgroundColor: '#F9FAFB'}}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg" style={{backgroundColor: '#EBF8FF', color: '#1E3A8A'}}>
                <Zap className="w-4 h-4 mr-2" style={{color: '#3B82F6'}} />
                Revolutionary Contactless Technology
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight" style={{color: '#111827'}}>
                Next-Generation{' '}
                <span style={{color: '#1E3A8A'}}>
                  Visitor Management
                </span>{' '}
                System
              </h1>
              <p className="mt-6 text-xl leading-relaxed" style={{color: '#6B7280'}}>
                Transform your workplace with AI-powered, contactless QR visitor management. 
                Zero hardware dependency, 100% paperless workflow, and WhatsApp-enabled digital passes 
                for the ultimate modern visitor experience.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button 
                  className="text-white px-8 py-4 rounded-xl transition-all duration-300 flex items-center space-x-2 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                  style={{backgroundColor: '#1E3A8A'}}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#1E40AF'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#1E3A8A'}
                  onClick={() => setIsContactModalOpen(true)}>
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  className="border-2 px-8 py-4 rounded-xl transition-all duration-300 text-lg font-semibold flex items-center space-x-2"
                  style={{borderColor: '#3B82F6', color: '#3B82F6'}}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#EBF8FF';
                    e.target.style.borderColor = '#1E3A8A';
                    e.target.style.color = '#1E3A8A';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderColor = '#3B82F6';
                    e.target.style.color = '#3B82F6';
                  }}
                  onClick={() => setIsVideoModalOpen(true)}>
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </button>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm" style={{color: '#6B7280'}}>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" style={{color: '#10B981'}} />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" style={{color: '#10B981'}} />
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" style={{color: '#10B981'}} />
                  <span>Instant deployment</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Main Dashboard Card */}
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="p-6" style={{backgroundColor: '#1E3A8A'}}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white text-xl font-semibold">Estmac VMS Dashboard</h3>
                      <p className="text-sm" style={{color: '#93C5FD'}}>Real-time Visitor Management</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full animate-pulse" style={{backgroundColor: '#10B981'}}></div>
                      <span className="text-white text-sm">Live</span>
                    </div>
                  </div>
                </div>
                
                {/* Stats Row */}
                <div className="p-6 border-b border-gray-100">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold" style={{color: '#1E3A8A'}}>47</div>
                      <div className="text-xs text-gray-500">Today's Visitors</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold" style={{color: '#3B82F6'}}>12</div>
                      <div className="text-xs text-gray-500">Currently Inside</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold" style={{color: '#10B981'}}>3</div>
                      <div className="text-xs text-gray-500">Pending Approval</div>
                    </div>
                  </div>
                </div>

                {/* Recent Visitors */}
                <div className="p-6">
                  <h4 className="font-semibold mb-4 flex items-center" style={{color: '#111827'}}>
                    <QrCode className="w-4 h-4 mr-2" style={{color: '#1E3A8A'}} />
                    Recent QR Check-ins
                  </h4>
                  <div className="space-y-3">
                    {[
                      { name: 'Rajesh Kumar', company: 'Infosys', time: '2 min ago', status: 'checked-in' },
                      { name: 'Priya Sharma', company: 'TCS', time: '5 min ago', status: 'approved' },
                      { name: 'Amit Patel', company: 'Wipro', time: '8 min ago', status: 'waiting' }
                    ].map((visitor, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 rounded-full" style={{
                            backgroundColor: visitor.status === 'checked-in' ? '#1E3A8A' :
                            visitor.status === 'approved' ? '#3B82F6' : '#10B981'
                          }}></div>
                          <div>
                            <div className="font-medium text-sm text-gray-900">{visitor.name}</div>
                            <div className="text-xs text-gray-500">{visitor.company}</div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-400">{visitor.time}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* WhatsApp Integration Badge */}
                <div className="p-4 border-t" style={{backgroundColor: '#ECFDF5', borderColor: '#D1FAE5'}}>
                  <div className="flex items-center justify-center space-x-2" style={{color: '#065F46'}}>
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-sm font-medium">WhatsApp Notifications Active</span>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-200">
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-6 h-6" style={{color: '#1E3A8A'}} />
                  <div>
                    <div className="text-sm font-semibold" style={{color: '#111827'}}>Mobile App</div>
                    <div className="text-xs text-gray-500">4.8★ Rating</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-200">
                <div className="flex items-center space-x-2">
                  <Cloud className="w-6 h-6" style={{color: '#3B82F6'}} />
                  <div>
                    <div className="text-sm font-semibold" style={{color: '#111827'}}>Cloud Sync</div>
                    <div className="text-xs text-gray-500">99.9% Uptime</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }} className="text-center mb-16">
            <motion.div variants={fadeInUp} className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg" style={{backgroundColor: '#EBF8FF', color: '#1E3A8A'}}>
              <Award className="w-4 h-4 mr-2" style={{color: '#3B82F6'}} />
              Award-Winning Technology
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{color: '#111827'}}>
              Revolutionary Features for{' '}
              <span style={{color: '#1E3A8A'}}>
                Modern Workplaces
              </span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the future of visitor management with cutting-edge technology that eliminates hardware dependency and streamlines operations.
            </motion.p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresList.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 group border border-gray-100 relative overflow-hidden"
                onMouseEnter={(e) => e.target.style.borderColor = '#3B82F6'}
                onMouseLeave={(e) => e.target.style.borderColor = '#E5E7EB'}
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" style={{backgroundColor: '#EBF8FF'}}></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg" style={{backgroundColor: '#1E3A8A'}}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20" style={{backgroundColor: '#F9FAFB'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{color: '#111827'}}>
              Trusted Across{' '}
              <span style={{color: '#1E3A8A'}}>
                Industries
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From healthcare to manufacturing, our VMS adapts to your industry's unique requirements
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industriesList.map((industry, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group border border-gray-100"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300" style={{backgroundColor: '#1E3A8A'}}>
                  <industry.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{industry.title}</h3>
                <p className="text-gray-600">{industry.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{color: '#111827'}}>
              Why Choose{' '}
              <span style={{color: '#1E3A8A'}}>
                Estmac VMS
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Proven results and enterprise-grade reliability for organizations worldwide
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefitsList.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" style={{backgroundColor: '#1E3A8A'}}>
                  <benefit.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16" style={{backgroundColor: '#F9FAFB'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple 3-step process to transform your visitor experience</p>
            <button 
              className="mt-6 inline-flex items-center px-5 py-2 text-white rounded-lg transition-all duration-300 font-semibold"
              style={{backgroundColor: '#1E3A8A'}}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1E40AF'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#1E3A8A'}
              onClick={() => setIsVideoModalOpen(true)}>
              <Eye className="mr-2 w-5 h-5" /> Watch Demo
            </button>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: UserPlus,
                step: "1",
                title: "Register",
                description: "Visitors register online or at the kiosk with personal details and purpose of visit."
              },
              {
                icon: CheckCircle,
                step: "2",
                title: "Approve",
                description: "Hosts receive instant notifications and can approve or decline visitor requests."
              },
              {
                icon: Activity,
                step: "3",
                title: "Track",
                description: "Monitor visitor activity in real-time with comprehensive analytics and reporting."
              }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto" style={{backgroundColor: '#1E3A8A'}}>
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-sm font-bold" style={{color: '#1E3A8A'}}>{step.step}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 text-lg">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20" style={{backgroundColor: '#1E3A8A'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{color: '#93C5FD'}}>
              See how organizations across India are transforming their visitor management with Estmac VMS
            </p>
          </motion.div>
          <div className="relative">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl max-w-5xl mx-auto"
            >
              <div className="flex items-center justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium mb-8 leading-relaxed text-gray-800 text-center">
                "{testimonials[currentTestimonial].quote}"
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <img 
                  src={testimonials[currentTestimonial].image} 
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="font-bold text-lg text-gray-900">{testimonials[currentTestimonial].name}</p>
                  <p className="font-medium" style={{color: '#3B82F6'}}>{testimonials[currentTestimonial].position}</p>
                  <p className="text-gray-600">{testimonials[currentTestimonial].company}</p>
                </div>
              </div>
            </motion.div>
            {/* Testimonial indicators */}
            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    idx === currentTestimonial ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{color: '#111827'}}>
              Flexible Pricing for{' '}
              <span style={{color: '#1E3A8A'}}>
                Every Organization
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Start with our free trial and scale as you grow. No hidden fees, no long-term contracts.
            </p>
            <div className="flex justify-center gap-2 bg-gray-100 p-1 rounded-xl w-fit mx-auto">
              <button
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  pricingType === 'monthly' 
                    ? 'bg-white shadow-md' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                style={pricingType === 'monthly' ? {color: '#1E3A8A'} : {}}
                onClick={() => setPricingType('monthly')}
              >
                Monthly
              </button>
              <button
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  pricingType === 'yearly' 
                    ? 'bg-white shadow-md' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                style={pricingType === 'yearly' ? {color: '#1E3A8A'} : {}}
                onClick={() => setPricingType('yearly')}
              >
                Yearly
                <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Save 20%</span>
              </button>
              <button
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  pricingType === 'customize' 
                    ? 'bg-white shadow-md' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                style={pricingType === 'customize' ? {color: '#1E3A8A'} : {}}
                onClick={() => setPricingType('customize')}
              >
                Enterprise
              </button>
            </div>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`bg-white rounded-3xl shadow-xl border-2 p-8 relative transition-all duration-300 hover:shadow-2xl ${
                  plan.popular 
                    ? 'scale-105' 
                    : 'border-gray-100'
                }`}
                style={plan.popular ? {borderColor: '#1E3A8A', backgroundColor: '#EBF8FF'} : {}}
                onMouseEnter={(e) => {
                  if (!plan.popular) {
                    e.target.style.borderColor = '#3B82F6';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!plan.popular) {
                    e.target.style.borderColor = '#E5E7EB';
                  }
                }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg" style={{backgroundColor: '#1E3A8A'}}>
                      {plan.cta}
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-5xl font-bold text-gray-900">{getPrice(plan)}</span>
                  </div>
                  {pricingType === 'yearly' && plan.name !== 'Enterprise' && (
                    <p className="text-sm text-green-600 font-medium">Save ₹{parseInt(plan.monthly.replace(',', '')) - parseInt(plan.yearly.replace(',', ''))} per month</p>
                  )}
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-4 px-6 rounded-xl font-bold transition-all duration-300 transform hover:-translate-y-1 ${
                    plan.popular
                      ? 'text-white shadow-lg hover:shadow-xl'
                      : plan.name === 'Enterprise'
                      ? 'border-2'
                      : 'border-2 border-gray-300 text-gray-700'
                  }`}
                  style={
                    plan.popular
                      ? {backgroundColor: '#1E3A8A'}
                      : plan.name === 'Enterprise'
                      ? {borderColor: '#1E3A8A', color: '#1E3A8A', backgroundColor: 'transparent'}
                      : {}
                  }
                  onMouseEnter={(e) => {
                    if (plan.popular) {
                      e.target.style.backgroundColor = '#1E40AF';
                    } else if (plan.name === 'Enterprise') {
                      e.target.style.backgroundColor = '#EBF8FF';
                    } else {
                      e.target.style.borderColor = '#1E3A8A';
                      e.target.style.color = '#1E3A8A';
                      e.target.style.backgroundColor = '#EBF8FF';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (plan.popular) {
                      e.target.style.backgroundColor = '#1E3A8A';
                    } else if (plan.name === 'Enterprise') {
                      e.target.style.backgroundColor = 'transparent';
                    } else {
                      e.target.style.borderColor = '#D1D5DB';
                      e.target.style.color = '#374151';
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                  onClick={() => setIsContactModalOpen(true)}
                >
                  {plan.cta}
                </button>
                {plan.name === 'Starter' && (
                  <p className="text-center text-sm text-gray-500 mt-4">14-day free trial included</p>
                )}
              </motion.div>
            ))}
          </div>
          
          {/* Additional Info */}
          <div className="text-center mt-16">
            <p className="text-gray-600 mb-4">Need a custom solution for your organization?</p>
            <button 
              className="font-semibold transition-colors"
              style={{color: '#1E3A8A'}}
              onMouseEnter={(e) => e.target.style.color = '#1E40AF'}
              onMouseLeave={(e) => e.target.style.color = '#1E3A8A'}
              onClick={() => setIsContactModalOpen(true)}
            >
              Contact our sales team →
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20" style={{backgroundColor: '#F9FAFB'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{color: '#111827'}}>
              Trusted by Leading{' '}
              <span style={{color: '#1E3A8A'}}>
                Organizations
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Estmac VMS is revolutionizing workplace security and guest experience across India with cutting-edge technology that eliminates traditional bottlenecks.
            </p>
          </motion.div>

          {/* Company Logos */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60 mb-16">
            {['Infosys', 'TCS', 'Wipro', 'HCL', 'Tech Mahindra', 'Cognizant'].map((company, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.6, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="w-24 h-16 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
                  <span className="text-gray-600 font-semibold text-sm">{company}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Key Stats */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {[
              { number: '500+', label: 'Organizations Served' },
              { number: '1M+', label: 'Visitors Processed' },
              { number: '99.9%', label: 'Uptime Guarantee' },
              { number: '50+', label: 'Cities Covered' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="text-center bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="text-4xl font-bold mb-2" style={{color: '#1E3A8A'}}>{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Technology Description */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
              Revolutionary Technology
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed text-justify">
              Estmac VMS combines cutting-edge QR-based contactless check-in technology with a powerful, cloud-enabled central dashboard. 
              Designed for seamless integration across diverse industries—from commercial offices to healthcare and education—it eliminates 
              traditional bottlenecks and risks by automating visitor registration, approvals, and tracking without any dependency on physical 
              hardware or downloads. Leveraging AI-powered smart memory and WhatsApp-enabled digital passes, Estmac VMS not only accelerates 
              visitor processing but also enhances operational efficiency, reduces waste through paperless workflows, and ensures comprehensive, 
              real-time visibility into visitor activity across multiple locations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-8">
                <img src={vmslogo} alt="Estmac VMS" className="h-12" />
              </div>
              <p className="text-gray-400 mb-8 text-lg leading-relaxed max-w-md">
                Revolutionizing visitor management with AI-powered, contactless QR technology. 
                Trusted by 500+ organizations across India for secure, efficient, and paperless visitor experiences.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center transition-colors" onMouseEnter={(e) => e.target.style.backgroundColor = '#1E3A8A'} onMouseLeave={(e) => e.target.style.backgroundColor = '#1F2937'}>
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center transition-colors" onMouseEnter={(e) => e.target.style.backgroundColor = '#1E3A8A'} onMouseLeave={(e) => e.target.style.backgroundColor = '#1F2937'}>
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center transition-colors" onMouseEnter={(e) => e.target.style.backgroundColor = '#1E3A8A'} onMouseLeave={(e) => e.target.style.backgroundColor = '#1F2937'}>
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center transition-colors" onMouseEnter={(e) => e.target.style.backgroundColor = '#1E3A8A'} onMouseLeave={(e) => e.target.style.backgroundColor = '#1F2937'}>
                  <MessageSquare className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-8">Quick Links</h3>
              <ul className="space-y-4">
                {[
                  { name: 'Features', href: '#features' },
                  { name: 'Pricing', href: '#pricing' },
                  { name: 'About Us', href: '#about' },
                  { name: 'Contact', href: '#contact' },
                  { name: 'Support', href: '#' },
                  { name: 'Privacy Policy', href: '#' }
                ].map((link, idx) => (
                  <li key={idx}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors flex items-center group">
                      <span>{link.name}</span>
                      <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-8">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 mt-1 flex-shrink-0" style={{color: '#3B82F6'}} />
                  <div>
                    <p className="text-gray-400">Email us</p>
                    <p className="text-white font-medium">support@estmac.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 mt-1 flex-shrink-0" style={{color: '#3B82F6'}} />
                  <div>
                    <p className="text-gray-400">Call us</p>
                    <p className="text-white font-medium">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 mt-1 flex-shrink-0" style={{color: '#3B82F6'}} />
                  <div>
                    <p className="text-gray-400">Visit us</p>
                    <p className="text-white font-medium">Dehugoan, Pune, Maharashtra</p>
                  </div>
                </div>
                <button 
                  className="mt-6 w-full py-3 text-white rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                  style={{backgroundColor: '#1E3A8A'}}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#1E40AF'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#1E3A8A'}
                  onClick={() => setIsContactModalOpen(true)}
                >
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="border-t border-gray-800 mt-16 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-6">
            <p className="text-gray-400">
                  © 2025 Estmac VMS. All rights reserved.
                </p>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-500 text-sm">
                Made with ❤️ in India | ISO 27001 Certified | SOC 2 Compliant
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
