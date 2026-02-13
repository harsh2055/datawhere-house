import React from 'react';
import { Link } from 'react-router-dom';
import { Database, Users, Award, Target, Rocket, Heart } from 'lucide-react';

const AboutPage = () => {
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
              <Link to="/features" className="hover:text-purple-400 transition">Features</Link>
              <Link to="/about" className="text-purple-400">About</Link>
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
            About DataWhere House
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            We're on a mission to democratize data analytics and make enterprise-grade
            data infrastructure accessible to every organization
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-purple-500/20">
              <Target className="w-12 h-12 text-purple-400 mb-6" />
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                To empower businesses of all sizes with world-class data infrastructure,
                enabling them to make data-driven decisions faster and more confidently.
                We believe every company should have access to the same powerful tools
                that tech giants use.
              </p>
            </div>
            <div className="p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-purple-500/20">
              <Rocket className="w-12 h-12 text-purple-400 mb-6" />
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                A world where data is no longer a barrier but a catalyst for innovation.
                Where businesses spend less time managing infrastructure and more time
                deriving insights. Where AI-powered analytics are as easy to use as
                asking a question.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Story</h2>
          <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
            <p>
              Founded in 2020 by a team of data engineers from leading tech companies,
              DataWhere House was born out of frustration with the complexity and cost
              of modern data infrastructure.
            </p>
            <p>
              Our founders spent years building data warehouses at companies like Google,
              Amazon, and Microsoft. They saw firsthand how smaller companies struggled
              with the same challenges they solved at scale – but didn't have the resources
              or expertise to implement similar solutions.
            </p>
            <p>
              We set out to change that. Today, DataWhere House serves over 5,000 companies
              worldwide, processing over 10 petabytes of data daily, and helping businesses
              make better decisions through the power of data.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="p-8 bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500/20 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">By The Numbers</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div 
                key={index}
                className="p-8 bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500/20 text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-purple-400 mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Journey</h2>
          <p className="text-xl mb-8 opacity-90">
            Be part of the data revolution. Start building with DataWhere House today.
          </p>
          <Link 
            to="/signup"
            className="inline-block px-8 py-4 bg-white text-purple-600 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
};

// Data
const values = [
  {
    icon: <Users className="w-8 h-8" />,
    title: "Customer First",
    description: "Every decision we make starts with how it impacts our customers"
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Excellence",
    description: "We set the highest standards and continuously raise the bar"
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Integrity",
    description: "We build trust through transparency and ethical practices"
  }
];

const stats = [
  { value: "5,000+", label: "Active Customers" },
  { value: "10PB+", label: "Data Processed Daily" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "150+", label: "Team Members" }
];

const team = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-Founder",
    bio: "Former VP of Engineering at Google Cloud, 15 years in distributed systems"
  },
  {
    name: "Marcus Johnson",
    role: "CTO & Co-Founder",
    bio: "Ex-Amazon Principal Engineer, led the Redshift optimization team"
  },
  {
    name: "Dr. Priya Patel",
    role: "Chief Data Scientist",
    bio: "PhD in Machine Learning from MIT, published researcher in AI/ML"
  }
];

export default AboutPage;