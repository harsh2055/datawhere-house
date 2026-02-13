import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Database, Brain, Zap, Shield, TrendingUp, Globe,
  Code, Lock, Cloud, Layers, GitBranch, BarChart3
} from 'lucide-react';

const FeaturesPage = () => {
  return (
    <div className="min-h-screen text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-900/80 backdrop-blur-lg border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Database className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                DataWhere House
              </span>
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link to="/features" className="text-purple-400">Features</Link>
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Enterprise-Grade Features
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to build, scale, and optimize your data infrastructure
          </p>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Core Capabilities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => (
              <div 
                key={index}
                className="p-8 bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3"></div>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Technical Excellence</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {technicalFeatures.map((feature, index) => (
              <div 
                key={index}
                className="p-8 bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500/20"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">100+ Pre-Built Integrations</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Connect to your existing tools and data sources in minutes
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {integrations.map((integration, index) => (
              <div 
                key={index}
                className="p-6 bg-white/5 backdrop-blur-lg rounded-lg border border-purple-500/20 hover:border-purple-500/50 transition"
              >
                <p className="text-sm font-medium">{integration}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Start your free trial today. No credit card required.
          </p>
          <Link 
            to="/signup"
            className="inline-block px-8 py-4 bg-white text-purple-600 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
          >
            Start Free Trial
          </Link>
        </div>
      </section>
    </div>
  );
};

// Data
const coreFeatures = [
  {
    icon: <Database className="w-8 h-8" />,
    title: "Unified Data Warehouse",
    description: "Centralize all your data in one secure, scalable repository",
    highlights: [
      "Petabyte-scale storage",
      "Schema-on-read flexibility",
      "Real-time data ingestion",
      "Multi-format support"
    ]
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "ETL Pipelines",
    description: "Build and automate data transformation workflows",
    highlights: [
      "Visual pipeline builder",
      "Automated scheduling",
      "Error handling & retries",
      "Performance monitoring"
    ]
  },
  {
    icon: <Layers className="w-8 h-8" />,
    title: "Star Schema Design",
    description: "Optimized data modeling for fast queries",
    highlights: [
      "Automatic schema generation",
      "Dimension tables",
      "Fact tables",
      "Query optimization"
    ]
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "AI & Machine Learning",
    description: "Advanced analytics powered by ML models",
    highlights: [
      "Predictive forecasting",
      "Anomaly detection",
      "Natural language queries",
      "Auto ML capabilities"
    ]
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Enterprise Security",
    description: "Bank-level encryption and compliance",
    highlights: [
      "SOC 2 Type II certified",
      "GDPR & HIPAA compliant",
      "Row-level security",
      "Audit logging"
    ]
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Advanced Analytics",
    description: "Deep insights and visualizations",
    highlights: [
      "Interactive dashboards",
      "Custom reports",
      "Real-time metrics",
      "Trend analysis"
    ]
  }
];

const technicalFeatures = [
  {
    icon: <Code className="w-6 h-6" />,
    title: "REST & GraphQL APIs",
    description: "Full programmatic access to your data warehouse with comprehensive API documentation"
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Advanced Encryption",
    description: "AES-256 encryption at rest and TLS 1.3 in transit for all data"
  },
  {
    icon: <Cloud className="w-6 h-6" />,
    title: "Multi-Cloud Support",
    description: "Deploy on AWS, Azure, or GCP with automatic failover and disaster recovery"
  },
  {
    icon: <GitBranch className="w-6 h-6" />,
    title: "Version Control",
    description: "Git-like versioning for data schemas, pipelines, and transformations"
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Query Optimization",
    description: "Automatic query optimization and caching for 10x faster performance"
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Global CDN",
    description: "Edge caching and global distribution for low-latency data access worldwide"
  }
];

const integrations = [
  "Salesforce",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Snowflake",
  "BigQuery",
  "Redshift",
  "S3",
  "Stripe",
  "HubSpot",
  "Shopify",
  "Google Analytics"
];

export default FeaturesPage;