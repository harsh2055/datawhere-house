import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Upload, BarChart3, MessageSquare, Settings, LogOut,
  TrendingUp, Users, DollarSign, Database, Activity, Bell, Download,
  Filter, Calendar, RefreshCw, Eye, Zap, Globe, Moon, Sun
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const AdvancedDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLiveData, setIsLiveData] = useState(true);
  const [notifications, setNotifications] = useState(3);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveMetrics, setLiveMetrics] = useState({
    revenue: 2400000,
    growth: 23.8,
    users: 12458,
    dataStored: 847
  });

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate real-time data updates
  useEffect(() => {
    if (!isLiveData) return;
    
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        revenue: prev.revenue + Math.random() * 1000,
        growth: prev.growth + (Math.random() - 0.5) * 0.1,
        users: prev.users + Math.floor(Math.random() * 10),
        dataStored: prev.dataStored + Math.random() * 0.5
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isLiveData]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    navigate('/login');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const exportData = (format) => {
    alert(`Exporting dashboard data as ${format.toUpperCase()}...`);
    // In production, this would generate actual files
  };

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50'}`}>
      {/* Enhanced Sidebar */}
      <aside className={`w-64 ${isDarkMode ? 'bg-slate-900/80' : 'bg-white/80'} backdrop-blur-lg border-r ${isDarkMode ? 'border-purple-500/20' : 'border-gray-200'}`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <Database className="w-8 h-8 text-purple-400" />
              <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>DataWhere</span>
            </div>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-200 hover:bg-gray-300'} transition`}
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
            </button>
          </div>
          
          {/* User Profile */}
          <div className={`mb-6 p-4 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'} border ${isDarkMode ? 'border-purple-500/20' : 'border-gray-200'}`}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                JD
              </div>
              <div>
                <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>John Doe</p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Admin</p>
              </div>
            </div>
          </div>
          
          <nav className="space-y-2">
            <SidebarLink 
              icon={<LayoutDashboard className="w-5 h-5" />}
              text="Dashboard"
              to="/dashboard"
              active={true}
              isDarkMode={isDarkMode}
            />
            <SidebarLink 
              icon={<Upload className="w-5 h-5" />}
              text="Upload Data"
              to="/upload"
              isDarkMode={isDarkMode}
            />
            <SidebarLink 
              icon={<BarChart3 className="w-5 h-5" />}
              text="Analytics"
              to="/analytics"
              isDarkMode={isDarkMode}
            />
            <SidebarLink 
              icon={<MessageSquare className="w-5 h-5" />}
              text="AI Assistant"
              to="/ai-assistant"
              isDarkMode={isDarkMode}
            />
            <SidebarLink 
              icon={<Settings className="w-5 h-5" />}
              text="Settings"
              to="/settings"
              isDarkMode={isDarkMode}
            />
          </nav>

          <button 
            onClick={handleLogout}
            className={`w-full mt-8 flex items-center space-x-3 px-4 py-3 ${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-red-500/10' : 'text-gray-600 hover:text-red-600 hover:bg-red-50'} rounded-lg transition`}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Enhanced Header */}
        <div className={`sticky top-0 z-10 ${isDarkMode ? 'bg-slate-900/80' : 'bg-white/80'} backdrop-blur-lg border-b ${isDarkMode ? 'border-purple-500/20' : 'border-gray-200'} p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
                Advanced Analytics Dashboard
              </h1>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                {currentTime.toLocaleString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Live Data Toggle */}
              <button
                onClick={() => setIsLiveData(!isLiveData)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  isLiveData 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                    : isDarkMode ? 'bg-white/10 text-gray-400' : 'bg-gray-200 text-gray-600'
                } transition`}
              >
                <Activity className="w-5 h-5" />
                <span>{isLiveData ? 'Live' : 'Paused'}</span>
                {isLiveData && <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>}
              </button>

              {/* Notifications */}
              <button className={`relative p-2 rounded-lg ${isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-200 hover:bg-gray-300'} transition`}>
                <Bell className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>

              {/* Export Menu */}
              <div className="relative group">
                <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition text-white">
                  <Download className="w-5 h-5" />
                  <span>Export</span>
                </button>
                <div className={`absolute right-0 mt-2 w-48 ${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-lg shadow-xl border ${isDarkMode ? 'border-purple-500/20' : 'border-gray-200'} opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all`}>
                  <button onClick={() => exportData('pdf')} className={`w-full text-left px-4 py-3 ${isDarkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-100 text-gray-900'} transition`}>Export as PDF</button>
                  <button onClick={() => exportData('excel')} className={`w-full text-left px-4 py-3 ${isDarkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-100 text-gray-900'} transition`}>Export as Excel</button>
                  <button onClick={() => exportData('csv')} className={`w-full text-left px-4 py-3 ${isDarkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-100 text-gray-900'} transition`}>Export as CSV</button>
                  <button onClick={() => exportData('json')} className={`w-full text-left px-4 py-3 ${isDarkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-100 text-gray-900'} transition rounded-b-lg`}>Export as JSON</button>
                </div>
              </div>

              {/* Refresh Button */}
              <button className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-200 hover:bg-gray-300'} transition`}>
                <RefreshCw className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
              </button>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <QuickStat 
              label="Active Users" 
              value="2,847" 
              trend="+12%" 
              icon={<Users className="w-5 h-5" />}
              isDarkMode={isDarkMode}
            />
            <QuickStat 
              label="Queries/sec" 
              value="384" 
              trend="+8%" 
              icon={<Zap className="w-5 h-5" />}
              isDarkMode={isDarkMode}
            />
            <QuickStat 
              label="Uptime" 
              value="99.9%" 
              trend="stable" 
              icon={<Activity className="w-5 h-5" />}
              isDarkMode={isDarkMode}
            />
            <QuickStat 
              label="Global Requests" 
              value="1.2M" 
              trend="+25%" 
              icon={<Globe className="w-5 h-5" />}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>

        <div className="p-8">
          {/* Enhanced KPI Cards with Real-time Updates */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <EnhancedKPICard
              title="Total Revenue"
              value={`$${(liveMetrics.revenue / 1000000).toFixed(2)}M`}
              change="+12.5%"
              trend="up"
              icon={<DollarSign className="w-6 h-6" />}
              color="from-green-500 to-emerald-600"
              sparklineData={revenueSparkline}
              isDarkMode={isDarkMode}
            />
            <EnhancedKPICard
              title="Growth Rate"
              value={`${liveMetrics.growth.toFixed(1)}%`}
              change="+4.3%"
              trend="up"
              icon={<TrendingUp className="w-6 h-6" />}
              color="from-blue-500 to-cyan-600"
              sparklineData={growthSparkline}
              isDarkMode={isDarkMode}
            />
            <EnhancedKPICard
              title="Active Users"
              value={liveMetrics.users.toLocaleString()}
              change="+8.2%"
              trend="up"
              icon={<Users className="w-6 h-6" />}
              color="from-purple-500 to-pink-600"
              sparklineData={usersSparkline}
              isDarkMode={isDarkMode}
            />
            <EnhancedKPICard
              title="Data Stored"
              value={`${liveMetrics.dataStored.toFixed(0)} GB`}
              change="+15.7%"
              trend="up"
              icon={<Database className="w-6 h-6" />}
              color="from-orange-500 to-red-600"
              sparklineData={storageSparkline}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Advanced Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Sales Trend with Predictions */}
            <ChartCard title="Sales Trend & Forecast" isDarkMode={isDarkMode}>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={salesTrendWithForecast}>
                  <defs>
                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#444" : "#ddd"} />
                  <XAxis dataKey="month" stroke={isDarkMode ? "#888" : "#666"} />
                  <YAxis stroke={isDarkMode ? "#888" : "#666"} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: isDarkMode ? '#1e293b' : '#fff', 
                      border: `1px solid ${isDarkMode ? '#6366f1' : '#ddd'}`,
                      color: isDarkMode ? '#fff' : '#000'
                    }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="actual" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorActual)" name="Actual Sales" />
                  <Area type="monotone" dataKey="forecast" stroke="#10b981" fillOpacity={1} fill="url(#colorForecast)" strokeDasharray="5 5" name="Forecast" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Performance Radar */}
            <ChartCard title="Performance Metrics" isDarkMode={isDarkMode}>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={performanceData}>
                  <PolarGrid stroke={isDarkMode ? "#444" : "#ddd"} />
                  <PolarAngleAxis dataKey="metric" stroke={isDarkMode ? "#888" : "#666"} />
                  <PolarRadiusAxis stroke={isDarkMode ? "#888" : "#666"} />
                  <Radar name="Current" dataKey="current" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                  <Radar name="Target" dataKey="target" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  <Legend />
                  <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#1e293b' : '#fff', border: `1px solid ${isDarkMode ? '#6366f1' : '#ddd'}` }} />
                </RadarChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Revenue Comparison */}
            <ChartCard title="Revenue Comparison (YoY)" isDarkMode={isDarkMode}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#444" : "#ddd"} />
                  <XAxis dataKey="quarter" stroke={isDarkMode ? "#888" : "#666"} />
                  <YAxis stroke={isDarkMode ? "#888" : "#666"} />
                  <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#1e293b' : '#fff', border: `1px solid ${isDarkMode ? '#6366f1' : '#ddd'}` }} />
                  <Legend />
                  <Bar dataKey="2023" fill="#6366f1" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="2024" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Customer Segments */}
            <ChartCard title="Customer Segments" isDarkMode={isDarkMode}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={customerSegments}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {customerSegments.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#1e293b' : '#fff', border: `1px solid ${isDarkMode ? '#6366f1' : '#ddd'}` }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Real-time Activity Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className={`${isDarkMode ? 'bg-white/5' : 'bg-white'} backdrop-blur-lg rounded-xl border ${isDarkMode ? 'border-purple-500/20' : 'border-gray-200'} p-6`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Real-time Activity
                  </h3>
                  <div className="flex items-center space-x-2 text-green-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm">Live Updates</span>
                  </div>
                </div>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {realtimeActivities.map((activity, index) => (
                    <ActivityItem key={index} activity={activity} isDarkMode={isDarkMode} />
                  ))}
                </div>
              </div>
            </div>

            {/* Top Performers */}
            <div className={`${isDarkMode ? 'bg-white/5' : 'bg-white'} backdrop-blur-lg rounded-xl border ${isDarkMode ? 'border-purple-500/20' : 'border-gray-200'} p-6`}>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
                Top Performers
              </h3>
              <div className="space-y-4">
                {topPerformers.map((performer, index) => (
                  <PerformerCard key={index} performer={performer} rank={index + 1} isDarkMode={isDarkMode} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Components
const SidebarLink = ({ icon, text, to, active, isDarkMode }) => (
  <Link
    to={to}
    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
      active 
        ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-white border border-purple-500/50' 
        : isDarkMode ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
    }`}
  >
    {icon}
    <span>{text}</span>
  </Link>
);

const QuickStat = ({ label, value, trend, icon, isDarkMode }) => (
  <div className={`${isDarkMode ? 'bg-white/5' : 'bg-white'} backdrop-blur-lg rounded-lg border ${isDarkMode ? 'border-purple-500/20' : 'border-gray-200'} p-4`}>
    <div className="flex items-center justify-between">
      <div>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{label}</p>
        <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{value}</p>
      </div>
      <div className="text-purple-400">{icon}</div>
    </div>
    <p className="text-xs text-green-400 mt-1">{trend}</p>
  </div>
);

const EnhancedKPICard = ({ title, value, change, trend, icon, color, sparklineData, isDarkMode }) => (
  <div className={`${isDarkMode ? 'bg-white/5' : 'bg-white'} backdrop-blur-lg rounded-xl border ${isDarkMode ? 'border-purple-500/20' : 'border-gray-200'} p-6 hover:border-purple-500/50 transition group`}>
    <div className="flex items-start justify-between mb-4">
      <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center group-hover:scale-110 transition`}>
        {icon}
      </div>
      <span className={`text-sm font-semibold ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
        {change}
      </span>
    </div>
    <h3 className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-1`}>{title}</h3>
    <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>{value}</p>
    
    {/* Mini Sparkline */}
    <div className="h-12">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={sparklineData}>
          <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const ChartCard = ({ title, children, isDarkMode }) => (
  <div className={`${isDarkMode ? 'bg-white/5' : 'bg-white'} backdrop-blur-lg rounded-xl border ${isDarkMode ? 'border-purple-500/20' : 'border-gray-200'} p-6`}>
    <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>{title}</h3>
    {children}
  </div>
);

const ActivityItem = ({ activity, isDarkMode }) => (
  <div className={`flex items-center space-x-4 p-4 ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'} rounded-lg hover:bg-white/10 transition`}>
    <div className={`w-10 h-10 ${activity.color} rounded-lg flex items-center justify-center`}>
      {activity.icon}
    </div>
    <div className="flex-1">
      <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-medium`}>{activity.text}</p>
      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{activity.time}</p>
    </div>
    <span className={`px-3 py-1 ${activity.badge} rounded-full text-sm`}>
      {activity.status}
    </span>
  </div>
);

const PerformerCard = ({ performer, rank, isDarkMode }) => (
  <div className={`flex items-center space-x-4 p-4 ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'} rounded-lg`}>
    <div className={`w-8 h-8 ${rank === 1 ? 'bg-yellow-500' : rank === 2 ? 'bg-gray-400' : 'bg-orange-600'} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
      {rank}
    </div>
    <div className="flex-1">
      <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-medium`}>{performer.name}</p>
      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{performer.metric}</p>
    </div>
    <div className="text-right">
      <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-bold`}>{performer.value}</p>
      <p className="text-xs text-green-400">{performer.growth}</p>
    </div>
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
const revenueSparkline = Array.from({ length: 10 }, (_, i) => ({ value: 40000 + Math.random() * 30000 }));
const growthSparkline = Array.from({ length: 10 }, (_, i) => ({ value: 15 + Math.random() * 15 }));
const usersSparkline = Array.from({ length: 10 }, (_, i) => ({ value: 10000 + Math.random() * 5000 }));
const storageSparkline = Array.from({ length: 10 }, (_, i) => ({ value: 700 + Math.random() * 200 }));

const salesTrendWithForecast = [
  { month: 'Jan', actual: 45000 },
  { month: 'Feb', actual: 52000 },
  { month: 'Mar', actual: 48000 },
  { month: 'Apr', actual: 61000 },
  { month: 'May', actual: 55000 },
  { month: 'Jun', actual: 67000 },
  { month: 'Jul', forecast: 72000 },
  { month: 'Aug', forecast: 78000 },
  { month: 'Sep', forecast: 82000 },
];

const performanceData = [
  { metric: 'Speed', current: 85, target: 100 },
  { metric: 'Accuracy', current: 92, target: 95 },
  { metric: 'Uptime', current: 99, target: 99.9 },
  { metric: 'Security', current: 88, target: 100 },
  { metric: 'Scalability', current: 78, target: 90 },
];

const revenueComparisonData = [
  { quarter: 'Q1', 2023: 180000, 2024: 220000 },
  { quarter: 'Q2', 2023: 195000, 2024: 245000 },
  { quarter: 'Q3', 2023: 210000, 2024: 268000 },
  { quarter: 'Q4', 2023: 235000, 2024: 295000 },
];

const customerSegments = [
  { name: 'Enterprise', value: 45 },
  { name: 'SMB', value: 30 },
  { name: 'Startup', value: 15 },
  { name: 'Individual', value: 10 },
];

const COLORS = ['#8b5cf6', '#6366f1', '#3b82f6', '#06b6d4'];

const realtimeActivities = [
  { 
    icon: <Upload className="w-5 h-5 text-white" />,
    text: 'New dataset uploaded: Q4_Sales_2024.csv',
    time: 'Just now',
    status: 'Processing',
    badge: 'bg-blue-500/20 text-blue-400',
    color: 'bg-gradient-to-r from-blue-500 to-cyan-600'
  },
  { 
    icon: <TrendingUp className="w-5 h-5 text-white" />,
    text: 'Revenue milestone reached: $2.5M',
    time: '2 min ago',
    status: 'Completed',
    badge: 'bg-green-500/20 text-green-400',
    color: 'bg-gradient-to-r from-green-500 to-emerald-600'
  },
  { 
    icon: <Users className="w-5 h-5 text-white" />,
    text: '150 new users registered today',
    time: '5 min ago',
    status: 'Active',
    badge: 'bg-purple-500/20 text-purple-400',
    color: 'bg-gradient-to-r from-purple-500 to-pink-600'
  },
  { 
    icon: <Database className="w-5 h-5 text-white" />,
    text: 'Database backup completed successfully',
    time: '12 min ago',
    status: 'Success',
    badge: 'bg-green-500/20 text-green-400',
    color: 'bg-gradient-to-r from-emerald-500 to-teal-600'
  },
];

const topPerformers = [
  { name: 'Widget A', metric: 'Revenue', value: '$840K', growth: '+35%' },
  { name: 'Widget B', metric: 'Sales Volume', value: '12.4K', growth: '+28%' },
  { name: 'Widget C', metric: 'Growth Rate', value: '45%', growth: '+18%' },
];

export default AdvancedDashboard;