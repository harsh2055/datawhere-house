import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Database, Check, X } from 'lucide-react';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

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
              <Link to="/about" className="hover:text-purple-400 transition">About</Link>
              <Link to="/pricing" className="text-purple-400">Pricing</Link>
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
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Choose the plan that fits your needs. Scale up or down anytime.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={billingCycle === 'monthly' ? 'text-white font-semibold' : 'text-gray-400'}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="relative w-16 h-8 bg-white/20 rounded-full transition"
            >
              <div className={`absolute w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full top-1 transition-all ${
                billingCycle === 'annual' ? 'left-9' : 'left-1'
              }`}></div>
            </button>
            <span className={billingCycle === 'annual' ? 'text-white font-semibold' : 'text-gray-400'}>
              Annual
              <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                Save 20%
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index}
                className={`p-8 rounded-2xl border transition ${
                  plan.popular 
                    ? 'bg-gradient-to-b from-blue-500/10 to-purple-600/10 border-purple-500 scale-105'
                    : 'bg-white/5 backdrop-blur-lg border-purple-500/20 hover:border-purple-500/50'
                }`}
              >
                {plan.popular && (
                  <div className="mb-4">
                    <span className="px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-5xl font-bold">
                    ${billingCycle === 'monthly' ? plan.priceMonthly : plan.priceAnnual}
                  </span>
                  <span className="text-gray-400 ml-2">
                    /{billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>

                <Link
                  to="/signup"
                  className={`w-full block text-center py-3 rounded-lg font-semibold transition mb-8 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  {plan.cta}
                </Link>

                <div className="space-y-4">
                  <p className="font-semibold mb-4">Everything in {plan.name}:</p>
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? 'text-gray-300' : 'text-gray-600'}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500/20"
              >
                <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Data?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Start your 14-day free trial. No credit card required.
          </p>
          <Link 
            to="/signup"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition"
          >
            Start Free Trial
          </Link>
        </div>
      </section>
    </div>
  );
};

// Data
const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for small teams and startups",
    priceMonthly: 99,
    priceAnnual: 950,
    cta: "Start Free Trial",
    popular: false,
    features: [
      { text: "Up to 100GB data storage", included: true },
      { text: "5 team members", included: true },
      { text: "Basic ETL pipelines", included: true },
      { text: "Standard analytics", included: true },
      { text: "Email support", included: true },
      { text: "AI assistant (limited)", included: true },
      { text: "Advanced ML models", included: false },
      { text: "Custom integrations", included: false },
      { text: "Dedicated support", included: false }
    ]
  },
  {
    name: "Professional",
    description: "For growing businesses",
    priceMonthly: 299,
    priceAnnual: 2870,
    cta: "Get Started",
    popular: true,
    features: [
      { text: "Up to 1TB data storage", included: true },
      { text: "Unlimited team members", included: true },
      { text: "Advanced ETL pipelines", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Priority support", included: true },
      { text: "Full AI assistant access", included: true },
      { text: "Advanced ML models", included: true },
      { text: "10 custom integrations", included: true },
      { text: "Dedicated support", included: false }
    ]
  },
  {
    name: "Enterprise",
    description: "For large-scale organizations",
    priceMonthly: 999,
    priceAnnual: 9590,
    cta: "Contact Sales",
    popular: false,
    features: [
      { text: "Unlimited data storage", included: true },
      { text: "Unlimited team members", included: true },
      { text: "Custom ETL pipelines", included: true },
      { text: "Enterprise analytics", included: true },
      { text: "24/7 dedicated support", included: true },
      { text: "Full AI assistant access", included: true },
      { text: "All ML models + custom", included: true },
      { text: "Unlimited integrations", included: true },
      { text: "SLA guarantees", included: true }
    ]
  }
];

const faqs = [
  {
    question: "Can I change plans later?",
    answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate the difference."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, ACH transfers, and wire transfers for annual plans. Enterprise customers can also pay via invoice."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes! All plans come with a 14-day free trial. No credit card required to start."
  },
  {
    question: "What happens to my data if I cancel?",
    answer: "You can export all your data before canceling. We retain your data for 30 days after cancellation in case you change your mind."
  },
  {
    question: "Do you offer discounts for non-profits?",
    answer: "Yes! We offer special pricing for non-profits and educational institutions. Contact our sales team for details."
  }
];

export default PricingPage;