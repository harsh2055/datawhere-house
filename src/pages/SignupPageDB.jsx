import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Database, Mail, Lock, User, Building, Eye, EyeOff, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { signUp } from '../services/supabase';

const SignupPageDB = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setErrors({});

    // Call real Supabase signup
    const { data, error } = await signUp(
      formData.email,
      formData.password,
      formData.fullName,
      formData.company
    );

    if (error) {
      setErrors({ submit: error.message || 'Failed to create account. Please try again.' });
      setLoading(false);
      return;
    }

    // Success!
    setSuccess(true);
    
    // If email confirmation is required
    if (data.user && !data.session) {
      setErrors({ submit: 'Please check your email to verify your account!' });
      setLoading(false);
      return;
    }

    // Auto login if session exists
    if (data.session) {
      localStorage.setItem('auth_token', data.session.access_token);
      localStorage.setItem('user_email', formData.email);
      localStorage.setItem('user_name', formData.fullName);
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear specific error when user types
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Database className="w-10 h-10 text-purple-400" />
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              DataWhere House
            </span>
          </div>
          <p className="text-gray-400">Create your account</p>
          <div className="mt-2 flex items-center justify-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400">Real Database Enabled</span>
          </div>
        </div>

        {/* Signup Form */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-8">
          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-400 font-medium">Account Created!</p>
                <p className="text-green-300 text-sm mt-1">Redirecting to dashboard...</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errors.submit && (
            <div className={`mb-6 p-4 ${
              errors.submit.includes('email') 
                ? 'bg-blue-500/10 border-blue-500/50' 
                : 'bg-red-500/10 border-red-500/50'
            } border rounded-lg flex items-start space-x-3`}>
              <AlertCircle className={`w-5 h-5 ${
                errors.submit.includes('email') ? 'text-blue-400' : 'text-red-400'
              } flex-shrink-0 mt-0.5`} />
              <div>
                <p className={`${
                  errors.submit.includes('email') ? 'text-blue-400' : 'text-red-400'
                } font-medium`}>
                  {errors.submit.includes('email') ? 'Check Your Email' : 'Signup Failed'}
                </p>
                <p className={`${
                  errors.submit.includes('email') ? 'text-blue-300' : 'text-red-300'
                } text-sm mt-1`}>
                  {errors.submit}
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className={`w-full pl-12 pr-4 py-3 bg-white/10 border ${
                    errors.fullName ? 'border-red-500' : 'border-purple-500/30'
                  } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition`}
                  placeholder="John Doe"
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full pl-12 pr-4 py-3 bg-white/10 border ${
                    errors.email ? 'border-red-500' : 'border-purple-500/30'
                  } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition`}
                  placeholder="you@company.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Company Name
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  placeholder="Your Company Inc."
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={`w-full pl-12 pr-12 py-3 bg-white/10 border ${
                    errors.password ? 'border-red-500' : 'border-purple-500/30'
                  } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition`}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className={`w-full pl-12 pr-4 py-3 bg-white/10 border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-purple-500/30'
                  } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition`}
                  placeholder="Confirm your password"
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start">
              <input type="checkbox" required className="mt-1 mr-2" />
              <span className="text-sm text-gray-400">
                I agree to the{' '}
                <a href="#" className="text-purple-400 hover:text-purple-300">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-purple-400 hover:text-purple-300">
                  Privacy Policy
                </a>
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Creating account...</span>
                </>
              ) : success ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Account Created!</span>
                </>
              ) : (
                <span>Create Account</span>
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold">
              Sign in
            </Link>
          </p>
        </div>

        {/* Database Info */}
        <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-green-300 font-medium mb-1">
                Secure Account Creation
              </p>
              <p className="text-xs text-green-200">
                Your account will be stored securely in a PostgreSQL database with encrypted passwords.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPageDB;