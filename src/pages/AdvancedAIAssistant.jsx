import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, Upload, BarChart3, MessageSquare, Settings, LogOut,
  Send, Bot, User, Sparkles, Mic, MicOff, Copy, ThumbsUp, ThumbsDown,
  Download, Trash2, Star, TrendingUp, Database, Code, FileText
} from 'lucide-react';

const AdvancedAIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Hello! I'm your advanced AI data analyst powered by machine learning. I can help you:\n\n• Analyze complex data patterns\n• Generate SQL queries\n• Create visualizations\n• Forecast trends\n• Answer business questions\n\nTry asking me anything or use voice input!",
      timestamp: new Date().toISOString(),
      suggestedActions: [
        { text: "Show revenue by region", icon: <BarChart3 className="w-4 h-4" /> },
        { text: "Generate sales report", icon: <FileText className="w-4 h-4" /> },
        { text: "Write SQL query", icon: <Code className="w-4 h-4" /> }
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [savedQueries, setSavedQueries] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);

  const exampleQueries = [
    {
      category: "Revenue Analysis",
      icon: <TrendingUp className="w-5 h-5" />,
      queries: [
        "What was the total revenue in Q4?",
        "Compare revenue this year vs last year",
        "Which products generate the most revenue?"
      ]
    },
    {
      category: "Data Queries",
      icon: <Database className="w-5 h-5" />,
      queries: [
        "Show me the top 10 customers by sales",
        "What's the average order value?",
        "List all products with low stock"
      ]
    },
    {
      category: "Predictions",
      icon: <Sparkles className="w-5 h-5" />,
      queries: [
        "Predict sales for next quarter",
        "Forecast customer churn rate",
        "What trends do you see in the data?"
      ]
    },
    {
      category: "SQL Generation",
      icon: <Code className="w-5 h-5" />,
      queries: [
        "Write SQL to find duplicate records",
        "Create a query to join sales and customers",
        "Generate a complex aggregation query"
      ]
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = { 
      role: 'user', 
      content: inputMessage,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    setShowSuggestions(false);

    // Simulate AI response with more advanced features
    setTimeout(() => {
      const aiResponse = generateAdvancedResponse(inputMessage);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleVoiceInput = () => {
    if (!isListening) {
      // Start voice recognition
      setIsListening(true);
      
      // Simulate voice recognition
      setTimeout(() => {
        const voiceText = "What was the total revenue in Q4?";
        setInputMessage(voiceText);
        setIsListening(false);
      }, 2000);
    } else {
      setIsListening(false);
    }
  };

  const handleExampleClick = (query) => {
    setInputMessage(query);
    setShowSuggestions(false);
  };

  const handleSuggestedAction = (action) => {
    setInputMessage(action.text);
  };

  const copyMessage = (content) => {
    navigator.clipboard.writeText(content);
    alert('Message copied to clipboard!');
  };

  const saveQuery = (content) => {
    setSavedQueries([...savedQueries, { content, timestamp: new Date() }]);
    alert('Query saved!');
  };

  const generateAdvancedResponse = (query) => {
    const queryLower = query.toLowerCase();
    let response = {
      role: 'assistant',
      content: '',
      timestamp: new Date().toISOString(),
      hasChart: false,
      chartData: null,
      hasSQLQuery: false,
      sqlQuery: null,
      suggestedActions: []
    };
    
    if (queryLower.includes('revenue') && queryLower.includes('q4')) {
      response.content = "📊 **Q4 2024 Revenue Analysis**\n\nBased on the data in your warehouse:\n\n**Total Revenue: $2.95M** (↑ 25.5% vs Q4 2023)\n\n**Regional Breakdown:**\n• 🇺🇸 North America: $1.2M (40.7%)\n• 🇪🇺 Europe: $850K (28.8%)\n• 🌏 Asia: $650K (22%)\n• 🌎 South America: $250K (8.5%)\n\n**Key Insights:**\n✓ Strong performance in North America driven by Widget A\n✓ European market showing steady growth\n✓ Asia presents significant expansion opportunity\n\n**Recommendations:**\n• Increase inventory for Widget A in NA region\n• Expand marketing in Asian markets\n• Consider new product launches in Q1 2025";
      
      response.hasChart = true;
      response.chartData = {
        type: 'bar',
        data: [
          { region: 'North America', revenue: 1200000 },
          { region: 'Europe', revenue: 850000 },
          { region: 'Asia', revenue: 650000 },
          { region: 'South America', revenue: 250000 }
        ]
      };

      response.suggestedActions = [
        { text: "Show monthly breakdown", icon: <BarChart3 className="w-4 h-4" /> },
        { text: "Compare with Q3", icon: <TrendingUp className="w-4 h-4" /> },
        { text: "Generate SQL query", icon: <Code className="w-4 h-4" /> }
      ];
    }
    else if (queryLower.includes('sql') || queryLower.includes('query')) {
      response.content = "💡 **Generated SQL Query**\n\nHere's the SQL query for your request:\n\n```sql\nSELECT \n  r.region_name,\n  p.product_name,\n  SUM(s.revenue) as total_revenue,\n  COUNT(s.sale_id) as num_sales,\n  AVG(s.revenue) as avg_sale\nFROM sales s\nJOIN regions r ON s.region_id = r.region_id\nJOIN products p ON s.product_id = p.product_id\nWHERE s.sale_date >= '2024-10-01'\n  AND s.sale_date < '2025-01-01'\nGROUP BY r.region_name, p.product_name\nORDER BY total_revenue DESC\nLIMIT 10;\n```\n\n**Query Explanation:**\n• Joins sales with regions and products\n• Filters for Q4 2024 (Oct-Dec)\n• Groups by region and product\n• Shows top 10 combinations by revenue\n\nWould you like me to execute this query or modify it?";
      
      response.hasSQLQuery = true;
      response.sqlQuery = "SELECT r.region_name, p.product_name, SUM(s.revenue) as total_revenue...";
      
      response.suggestedActions = [
        { text: "Execute this query", icon: <Code className="w-4 h-4" /> },
        { text: "Modify query", icon: <FileText className="w-4 h-4" /> },
        { text: "Export as SQL file", icon: <Download className="w-4 h-4" /> }
      ];
    }
    else if (queryLower.includes('predict') || queryLower.includes('forecast')) {
      response.content = "🔮 **Sales Forecast - Q1 2025**\n\nUsing machine learning models (LSTM + ARIMA), here's the forecast:\n\n**Predicted Revenue: $3.4M**\n• Expected growth: +28% YoY\n• Confidence interval: $3.2M - $3.6M (95%)\n• Model accuracy: 94.3%\n\n**Monthly Predictions:**\n📅 January: $1.05M (±$80K)\n📅 February: $1.15M (±$90K)\n📅 March: $1.20M (±$95K)\n\n**Contributing Factors:**\n✓ Seasonal trends (+15% typical increase)\n✓ New product launch (estimated +$200K)\n✓ Market expansion in Asia (+35% projected)\n✓ Improved conversion rates (+3.2%)\n\n**Risk Factors:**\n⚠️ Economic slowdown in Europe\n⚠️ Supply chain constraints\n⚠️ Competitive market pressure\n\n**Recommendation:** Prepare for 20-30% growth with flexibility to scale operations.";
      
      response.hasChart = true;
      response.suggestedActions = [
        { text: "Show detailed breakdown", icon: <BarChart3 className="w-4 h-4" /> },
        { text: "Compare scenarios", icon: <TrendingUp className="w-4 h-4" /> },
        { text: "Export forecast data", icon: <Download className="w-4 h-4" /> }
      ];
    }
    else if (queryLower.includes('top') && (queryLower.includes('product') || queryLower.includes('customer'))) {
      response.content = "🏆 **Top Performers Analysis**\n\n**Top 5 Products by Revenue:**\n\n1. 🥇 **Widget A** - $840K\n   • 35% of total revenue\n   • 12% growth MoM\n   • Strong in NA & Europe\n\n2. 🥈 **Widget B** - $672K\n   • 28% of total revenue\n   • Leading in Asian markets\n   • Stable 5% growth\n\n3. 🥉 **Widget C** - $528K\n   • 22% of total revenue\n   • Emerging product\n   • High potential (+18% growth)\n\n4. **Widget D** - $240K\n   • 10% of total revenue\n   • Niche market leader\n\n5. **Widget E** - $120K\n   • 5% of total revenue\n   • New product launch\n\n**Strategic Recommendations:**\n• ↗️ Increase inventory for Widget C (high growth trajectory)\n• 🎯 Focus marketing on Widget A in untapped regions\n• 🔄 Consider product refresh for Widget B";
      
      response.suggestedActions = [
        { text: "Show customer breakdown", icon: <User className="w-4 h-4" /> },
        { text: "Analyze by region", icon: <BarChart3 className="w-4 h-4" /> },
        { text: "Generate detailed report", icon: <FileText className="w-4 h-4" /> }
      ];
    }
    else {
      response.content = `I've analyzed your query about "${query}". Here's what I found:\n\nBased on your current data trends and patterns, I recommend exploring our analytics dashboard for detailed visualizations of this metric.\n\n**Quick Insights:**\n• Your data shows strong positive trends\n• Consider running deeper analysis on this topic\n• I can help generate custom reports or SQL queries\n\n**What would you like to know more about?**`;
      
      response.suggestedActions = [
        { text: "Generate detailed analysis", icon: <BarChart3 className="w-4 h-4" /> },
        { text: "Create SQL query", icon: <Code className="w-4 h-4" /> },
        { text: "Export data", icon: <Download className="w-4 h-4" /> }
      ];
    }
    
    return response;
  };

  const clearChat = () => {
    if (window.confirm('Clear all messages?')) {
      setMessages([{
        role: 'assistant',
        content: "Chat cleared! How can I help you?",
        timestamp: new Date().toISOString()
      }]);
      setShowSuggestions(true);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900/80 backdrop-blur-lg border-r border-purple-500/20">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <MessageSquare className="w-8 h-8 text-purple-400" />
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
            />
            <SidebarLink 
              icon={<MessageSquare className="w-5 h-5" />}
              text="AI Assistant"
              to="/ai-assistant"
              active={true}
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

          {/* Saved Queries */}
          {savedQueries.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-gray-400">Saved Queries</h4>
                <Star className="w-4 h-4 text-yellow-400" />
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {savedQueries.slice(-5).map((query, index) => (
                  <div key={index} className="p-2 bg-white/5 rounded text-xs text-gray-400 truncate">
                    {query.content}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Enhanced Header */}
        <div className="p-6 border-b border-purple-500/20 bg-slate-900/80 backdrop-blur-lg">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center relative">
                  <Sparkles className="w-6 h-6 text-white" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Advanced AI Assistant</h1>
                  <p className="text-gray-400 text-sm">Powered by GPT-4 • Real-time Analysis</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={clearChat}
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
                  title="Clear chat"
                >
                  <Trash2 className="w-5 h-5 text-white" />
                </button>
                
                <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition">
                  <Download className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto space-y-6">
            {messages.map((message, index) => (
              <div key={index}>
                <MessageBubble 
                  message={message} 
                  onCopy={() => copyMessage(message.content)}
                  onSave={() => saveQuery(message.content)}
                  onSuggestedAction={handleSuggestedAction}
                />
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="bg-white/5 backdrop-blur-lg border border-purple-500/20 p-4 rounded-2xl">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Example Queries (shown when chat is empty or on demand) */}
        {showSuggestions && messages.length === 1 && (
          <div className="p-6 border-t border-purple-500/20 bg-slate-900/80">
            <div className="max-w-5xl mx-auto">
              <p className="text-gray-400 text-sm mb-4 font-semibold">💡 Try these example queries:</p>
              <div className="grid grid-cols-2 gap-4">
                {exampleQueries.map((category, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-lg border border-purple-500/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="text-purple-400">{category.icon}</div>
                      <h4 className="text-white font-semibold">{category.category}</h4>
                    </div>
                    <div className="space-y-2">
                      {category.queries.map((query, qIndex) => (
                        <button
                          key={qIndex}
                          onClick={() => handleExampleClick(query)}
                          className="w-full text-left px-3 py-2 bg-white/5 hover:bg-white/10 border border-purple-500/20 hover:border-purple-500/50 rounded-lg text-sm text-gray-300 transition"
                        >
                          "{query}"
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-6 border-t border-purple-500/20 bg-slate-900/80 backdrop-blur-lg">
          <div className="max-w-5xl mx-auto">
            <form onSubmit={handleSubmit} className="flex space-x-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask anything about your data... (or use voice input)"
                  className="w-full px-6 py-4 bg-white/10 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition pr-16"
                />
                
                {/* Voice Input Button */}
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition ${
                    isListening 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : 'bg-white/10 hover:bg-white/20 text-gray-400'
                  }`}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
              </div>
              
              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Send</span>
              </button>
            </form>
            
            {isListening && (
              <div className="mt-3 flex items-center justify-center space-x-2 text-red-400">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Listening...</span>
              </div>
            )}
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

const MessageBubble = ({ message, onCopy, onSave, onSuggestedAction }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex items-start space-x-4 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {/* Avatar */}
      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser 
          ? 'bg-gradient-to-r from-pink-500 to-orange-600' 
          : 'bg-gradient-to-r from-blue-500 to-purple-600'
      }`}>
        {isUser ? <User className="w-6 h-6 text-white" /> : <Bot className="w-6 h-6 text-white" />}
      </div>

      {/* Message Content */}
      <div className={`flex-1 ${isUser ? 'text-right' : ''}`}>
        <div className={`inline-block max-w-3xl ${
          isUser
            ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-purple-500/30'
            : 'bg-white/5 backdrop-blur-lg border border-purple-500/20'
        } rounded-2xl p-4`}>
          <div className="text-white whitespace-pre-line markdown-content">
            {message.content}
          </div>
          
          <p className="text-xs text-gray-500 mt-2">
            {new Date(message.timestamp).toLocaleTimeString()}
          </p>
        </div>

        {/* Suggested Actions */}
        {!isUser && message.suggestedActions && message.suggestedActions.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {message.suggestedActions.map((action, index) => (
              <button
                key={index}
                onClick={() => onSuggestedAction(action)}
                className="flex items-center space-x-2 px-4 py-2 bg-white/5 border border-purple-500/20 rounded-lg hover:bg-white/10 hover:border-purple-500/50 transition text-sm text-gray-300"
              >
                {action.icon}
                <span>{action.text}</span>
              </button>
            ))}
          </div>
        )}

        {/* Message Actions */}
        {!isUser && (
          <div className="flex items-center space-x-2 mt-3">
            <button
              onClick={onCopy}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition"
              title="Copy message"
            >
              <Copy className="w-4 h-4 text-gray-400" />
            </button>
            <button
              onClick={onSave}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition"
              title="Save query"
            >
              <Star className="w-4 h-4 text-gray-400" />
            </button>
            <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition">
              <ThumbsUp className="w-4 h-4 text-gray-400" />
            </button>
            <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition">
              <ThumbsDown className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedAIAssistant;