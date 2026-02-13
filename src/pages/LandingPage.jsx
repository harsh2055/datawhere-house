import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Database, 
  Brain, 
  TrendingUp, 
  Shield, 
  Zap, 
  Globe,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-900/80 backdrop-blur-lg border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Database className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                DataWhere House
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link to="/features" className="hover:text-purple-400 transition">Features</Link>
              <Link to="/about" className="hover:text-purple-400 transition">About</Link>
              <Link to="/pricing" className="hover:text-purple-400 transition">Pricing</Link>
            </div>
            <div className="flex space-x-4">
              <Link to="/login" className="px-4 py-2 hover:text-purple-400 transition">
                Login
              </Link>
              <Link 
                to="/signup" 
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Transform Your Data Into Intelligent Growth
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Enterprise Data Warehouse & AI-Powered Analytics Platform
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Store Smart. Scale Fast.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/signup"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition transform hover:scale-105 flex items-center justify-center"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-lg rounded-lg text-lg font-semibold hover:bg-white/20 transition border border-purple-500/30">
              Request Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Powerful Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-8 bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Enterprise Architecture</h2>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold mb-2">Data Ingestion</h3>
                <p className="text-gray-400">CSV, JSON, APIs, Databases</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold mb-2">ETL Processing</h3>
                <p className="text-gray-400">Transform & Load Data</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold mb-2">AI Analytics</h3>
                <p className="text-gray-400">ML-Powered Insights</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose DataWhere House?</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="p-8 bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500/20"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Data?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of companies using DataWhere House to power their analytics
          </p>
          <Link 
            to="/signup"
            className="inline-block px-8 py-4 bg-white text-purple-600 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
          >
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900 border-t border-purple-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Database className="w-6 h-6 text-purple-400" />
                <span className="text-lg font-bold">DataWhere House</span>
              </div>
              <p className="text-gray-400 text-sm">
                Store Smart. Scale Fast.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link to="/features" className="hover:text-purple-400">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-purple-400">Pricing</Link></li>
                <li><a href="#" className="hover:text-purple-400">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link to="/about" className="hover:text-purple-400">About</Link></li>
                <li><a href="#" className="hover:text-purple-400">Careers</a></li>
                <li><a href="#" className="hover:text-purple-400">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-purple-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-purple-400">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-purple-500/20 text-center text-gray-400 text-sm">
            <p>&copy; 2024 DataWhere House. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Feature data
const features = [
  {
    icon: <Database className="w-6 h-6" />,
    title: "Unified Data Storage",
    description: "Store structured and unstructured data in a single, scalable warehouse"
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "ETL Pipelines",
    description: "Build and automate data transformation workflows with ease"
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Star Schema Design",
    description: "Optimized data modeling for lightning-fast queries and analytics"
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "AI-Powered Analytics",
    description: "Machine learning models for forecasting and predictive insights"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Enterprise Security",
    description: "Bank-level encryption and compliance with SOC 2, GDPR, HIPAA"
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Global Scale",
    description: "Multi-region deployment with 99.99% uptime guarantee"
  }
];

// Benefits data
const benefits = [
  {
    title: "Lightning Fast Performance",
    description: "Query billions of rows in milliseconds with our optimized query engine"
  },
  {
    title: "Easy Integration",
    description: "Connect to 100+ data sources with pre-built connectors and APIs"
  },
  {
    title: "Cost Effective",
    description: "Pay only for what you use with our flexible pricing model"
  },
  {
    title: "24/7 Support",
    description: "Enterprise support team available around the clock"
  }
];

// Testimonials data
const testimonials = [
  {
    quote: "DataWhere House transformed how we handle analytics. The AI assistant is a game-changer.",
    name: "Sarah Chen",
    role: "CTO, TechCorp Inc."
  },
  {
    quote: "We reduced our data processing time by 80% and cut costs in half. Highly recommend!",
    name: "Michael Rodriguez",
    role: "VP of Data, FinanceHub"
  },
  {
    quote: "The ETL pipelines are incredibly intuitive. Our team was up and running in days.",
    name: "Emily Thompson",
    role: "Data Lead, RetailMax"
  }
];

export default LandingPage;