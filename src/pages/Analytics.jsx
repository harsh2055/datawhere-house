import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, Upload, BarChart3, MessageSquare, Settings, LogOut,
  TrendingUp, Calendar, MapPin, Download
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('30days');
  const [region, setRegion] = useState('all');

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900/80 backdrop-blur-lg border-r border-purple-500/20">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <BarChart3 className="w-8 h-8 text-purple-400" />
            <span className="text-xl font-bold text-white">DataWhere</span>
          </div>
          
          <nav className="space-y-2">
            <SidebarLink 
              icon={<LayoutDashboard className="w-5 h-5" />}
              text="Dashboard"
              to="/dashboard"
            />
            <SidebarLink 
              icon={<Upload className="w-5 h-5" />}
              text="Upload Data"
              to="/upload"
            />
            <SidebarLink 
              icon={<BarChart3 className="w-5 h-5" />}
              text="Analytics"
              to="/analytics"
              active={true}
            />
            <SidebarLink 
              icon={<MessageSquare className="w-5 h-5" />}
              text="AI Assistant"
              to="/ai-assistant"
            />
            <SidebarLink 
              icon={<Settings className="w-5 h-5" />}
              text="Settings"
              to="/settings"
            />
          </nav>

          <Link
            to="/login"
            className="w-full mt-8 flex items-center space-x-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-red-500/10 rounded-lg transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
              <p className="text-gray-400">Deep insights into your business performance</p>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Export Report</span>
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500/20 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Date Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Date Range
                </label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="7days">Last 7 Days</option>
                  <option value="30days">Last 30 Days</option>
                  <option value="90days">Last 90 Days</option>
                  <option value="1year">Last Year</option>
                </select>
              </div>

              {/* Region Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Region
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="all">All Regions</option>
                  <option value="na">North America</option>
                  <option value="eu">Europe</option>
                  <option value="asia">Asia</option>
                  <option value="sa">South America</option>
                </select>
              </div>

              {/* Quick Stats */}
              <div className="flex items-end">
                <div className="w-full p-4 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-lg border border-purple-500/30">
                  <p className="text-sm text-gray-400">Total Revenue</p>
                  <p className="text-2xl font-bold text-white">$2.4M</p>
                  <p className="text-sm text-green-400">↑ 12.5% vs last period</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Sales Trend Chart */}
            <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Sales Trend</h3>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                  ↑ 23.5%
                </span>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={salesTrendData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #6366f1' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#8b5cf6" 
                    fillOpacity={1} 
                    fill="url(#colorSales)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Revenue Comparison */}
            <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500/20 p-6">
              <h3 className="text-xl font-bold text-white mb-6">Revenue Comparison</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="quarter" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #6366f1' }}
                  />
                  <Legend />
                  <Bar dataKey="2023" fill="#6366f1" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="2024" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Monthly Growth */}
            <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500/20 p-6">
              <h3 className="text-xl font-bold text-white mb-6">Monthly Growth %</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #6366f1' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="growth" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Product Distribution */}
            <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500/20 p-6">
              <h3 className="text-xl font-bold text-white mb-6">Product Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={productData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {productData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #6366f1' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {productData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index] }}
                    ></div>
                    <span className="text-sm text-gray-400">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Insights Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InsightCard
              icon={<TrendingUp className="w-6 h-6" />}
              title="Best Performing Product"
              value="Widget A"
              description="35% of total revenue"
              color="from-green-500 to-emerald-600"
            />
            <InsightCard
              icon={<MapPin className="w-6 h-6" />}
              title="Top Region"
              value="North America"
              description="$850K in revenue"
              color="from-blue-500 to-cyan-600"
            />
            <InsightCard
              icon={<BarChart3 className="w-6 h-6" />}
              title="Growth Forecast"
              value="+28%"
              description="Predicted Q1 2025 growth"
              color="from-purple-500 to-pink-600"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

// Components
const SidebarLink = ({ icon, text, to, active }) => (
  <Link
    to={to}
    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
      active 
        ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-white border border-purple-500/50' 
        : 'text-gray-400 hover:text-white hover:bg-white/5'
    }`}
  >
    {icon}
    <span>{text}</span>
  </Link>
);

const InsightCard = ({ icon, title, value, description, color }) => (
  <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500/20 p-6 hover:border-purple-500/50 transition group">
    <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
      {icon}
    </div>
    <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
    <p className="text-2xl font-bold text-white mb-2">{value}</p>
    <p className="text-sm text-gray-500">{description}</p>
  </div>
);

// Chart label renderer
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
  const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Mock Data
const salesTrendData = [
  { month: 'Jan', sales: 45000 },
  { month: 'Feb', sales: 52000 },
  { month: 'Mar', sales: 48000 },
  { month: 'Apr', sales: 61000 },
  { month: 'May', sales: 55000 },
  { month: 'Jun', sales: 67000 },
];

const revenueComparisonData = [
  { quarter: 'Q1', 2023: 180000, 2024: 220000 },
  { quarter: 'Q2', 2023: 195000, 2024: 245000 },
  { quarter: 'Q3', 2023: 210000, 2024: 268000 },
  { quarter: 'Q4', 2023: 235000, 2024: 295000 },
];

const growthData = [
  { month: 'Jan', growth: 12 },
  { month: 'Feb', growth: 18 },
  { month: 'Mar', growth: 15 },
  { month: 'Apr', growth: 24 },
  { month: 'May', growth: 19 },
  { month: 'Jun', growth: 28 },
];

const productData = [
  { name: 'Widget A', value: 35 },
  { name: 'Widget B', value: 28 },
  { name: 'Widget C', value: 22 },
  { name: 'Widget D', value: 15 },
];

const COLORS = ['#8b5cf6', '#6366f1', '#3b82f6', '#06b6d4'];

export default Analytics;