import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Database, Mail, Lock, Eye, EyeOff, AlertCircle, Loader } from 'lucide-react';
import { signIn } from '../services/supabase';

const LoginPageDB = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Call real Supabase authentication
    const { data, error: signInError } = await signIn(formData.email, formData.password);

    if (signInError) {
      setError(signInError.message || 'Invalid email or password');
      setLoading(false);
      return;
    }

    if (data.session) {
      // Store session
      localStorage.setItem('auth_token', data.session.access_token);
      localStorage.setItem('user_email', formData.email);
      
      setLoading(false);
      navigate('/dashboard');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
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
          <p className="text-gray-400">Sign in to your account</p>
          <div className="mt-2 flex items-center justify-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400">Connected to Real Database</span>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-400 font-medium">Login Failed</p>
                <p className="text-red-300 text-sm mt-1">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
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
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Input */}
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
                  className="w-full pl-12 pr-12 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-400">Remember me</span>
              </label>
              <a href="#" className="text-sm text-purple-400 hover:text-purple-300">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-purple-400 hover:text-purple-300 font-semibold">
              Sign up
            </Link>
          </p>
        </div>

        {/* Database Info */}
        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <div className="flex items-start space-x-3">
            <Database className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-300 font-medium mb-1">
                🎉 Now Connected to Real Database!
              </p>
              <p className="text-xs text-blue-200">
                Your data is stored in a real PostgreSQL database powered by Supabase.
                Create an account to get started!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPageDB;