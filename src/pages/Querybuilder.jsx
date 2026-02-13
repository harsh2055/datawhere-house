import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, Upload, BarChart3, MessageSquare, Settings, LogOut,
  Play, Save, Download, Copy, Code, Eye, Database, Filter, Plus, X,
  Check, AlertCircle, Zap
} from 'lucide-react';

const QueryBuilder = () => {
  const [selectedTables, setSelectedTables] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [filters, setFilters] = useState([]);
  const [sqlQuery, setSqlQuery] = useState('');
  const [queryResults, setQueryResults] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeTab, setActiveTab] = useState('visual'); // visual or sql

  const handleExecuteQuery = () => {
    setIsExecuting(true);
    
    // Simulate query execution
    setTimeout(() => {
      setQueryResults({
        columns: ['Date', 'Product', 'Region', 'Sales', 'Units'],
        rows: [
          ['2024-01-15', 'Widget A', 'North America', '$12,450', '124'],
          ['2024-01-15', 'Widget B', 'Europe', '$8,750', '87'],
          ['2024-01-16', 'Widget C', 'Asia', '$15,200', '152'],
          ['2024-01-16', 'Widget A', 'South America', '$6,300', '63'],
          ['2024-01-17', 'Widget B', 'North America', '$9,800', '98'],
        ],
        executionTime: '245ms',
        rowsAffected: 5
      });
      setIsExecuting(false);
    }, 1500);
  };

  const addTable = (table) => {
    if (!selectedTables.includes(table)) {
      setSelectedTables([...selectedTables, table]);
    }
  };

  const removeTable = (table) => {
    setSelectedTables(selectedTables.filter(t => t !== table));
    setSelectedColumns(selectedColumns.filter(c => !c.startsWith(table)));
  };

  const addColumn = (column) => {
    if (!selectedColumns.includes(column)) {
      setSelectedColumns([...selectedColumns, column]);
    }
  };

  const addFilter = () => {
    setFilters([...filters, { column: '', operator: '=', value: '' }]);
  };

  const removeFilter = (index) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const generateSQL = () => {
    if (selectedColumns.length === 0 || selectedTables.length === 0) {
      return '-- Select tables and columns to generate SQL';
    }

    let sql = `SELECT\n  ${selectedColumns.join(',\n  ')}\nFROM\n  ${selectedTables.join(',\n  ')}`;
    
    if (filters.length > 0) {
      const whereClause = filters
        .filter(f => f.column && f.value)
        .map(f => `${f.column} ${f.operator} '${f.value}'`)
        .join('\n  AND ');
      
      if (whereClause) {
        sql += `\nWHERE\n  ${whereClause}`;
      }
    }

    sql += ';';
    setSqlQuery(sql);
    return sql;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlQuery);
    alert('SQL copied to clipboard!');
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900/80 backdrop-blur-lg border-r border-purple-500/20">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <Database className="w-8 h-8 text-purple-400" />
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
              icon={<Code className="w-5 h-5" />}
              text="Query Builder"
              to="/query-builder"
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
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-purple-500/20 bg-slate-900/80 backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Query Builder</h1>
              <p className="text-gray-400">Build complex queries visually or write SQL directly</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={generateSQL}
                className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition flex items-center space-x-2"
              >
                <Zap className="w-5 h-5" />
                <span>Generate SQL</span>
              </button>
              
              <button
                onClick={handleExecuteQuery}
                disabled={isExecuting}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition flex items-center space-x-2 disabled:opacity-50"
              >
                <Play className="w-5 h-5" />
                <span>{isExecuting ? 'Executing...' : 'Execute Query'}</span>
              </button>

              <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition">
                <Save className="w-5 h-5 text-white" />
              </button>

              <button onClick={copyToClipboard} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition">
                <Copy className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 mt-6">
            <button
              onClick={() => setActiveTab('visual')}
              className={`px-6 py-2 rounded-lg transition ${
                activeTab === 'visual'
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-white border border-purple-500/50'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Visual Builder
            </button>
            <button
              onClick={() => setActiveTab('sql')}
              className={`px-6 py-2 rounded-lg transition ${
                activeTab === 'sql'
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-white border border-purple-500/50'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              SQL Editor
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {activeTab === 'visual' ? (
              <>
                {/* Tables Section */}
                <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500/20 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">Select Tables</h3>
                    <span className="text-sm text-gray-400">{selectedTables.length} selected</span>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    {availableTables.map((table) => (
                      <button
                        key={table.name}
                        onClick={() => addTable(table.name)}
                        className={`p-4 rounded-lg border transition ${
                          selectedTables.includes(table.name)
                            ? 'bg-purple-500/20 border-purple-500 text-white'
                            : 'bg-white/5 border-purple-500/20 text-gray-400 hover:border-purple-500/50'
                        }`}
                      >
                        <Database className="w-6 h-6 mb-2" />
                        <p className="font-semibold">{table.name}</p>
                        <p className="text-xs mt-1">{table.rows} rows</p>
                      </button>
                    ))}
                  </div>

                  {selectedTables.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedTables.map((table) => (
                        <div key={table} className="flex items-center space-x-2 px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full">
                          <span className="text-white">{table}</span>
                          <button onClick={() => removeTable(table)}>
                            <X className="w-4 h-4 text-white hover:text-red-400" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Columns Section */}
                <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500/20 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">Select Columns</h3>
                    <span className="text-sm text-gray-400">{selectedColumns.length} selected</span>
                  </div>

                  {selectedTables.length === 0 ? (
                    <div className="text-center py-12">
                      <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400">Please select tables first</p>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-6 gap-3 mb-4">
                        {selectedTables.flatMap(table => 
                          availableTables.find(t => t.name === table)?.columns.map(col => (
                            <button
                              key={`${table}.${col}`}
                              onClick={() => addColumn(`${table}.${col}`)}
                              className={`px-3 py-2 rounded-lg text-sm transition ${
                                selectedColumns.includes(`${table}.${col}`)
                                  ? 'bg-blue-500/20 border border-blue-500 text-white'
                                  : 'bg-white/5 border border-purple-500/20 text-gray-400 hover:border-blue-500/50'
                              }`}
                            >
                              {col}
                            </button>
                          ))
                        )}
                      </div>

                      {selectedColumns.length > 0 && (
                        <div className="bg-slate-900/50 rounded-lg p-4 border border-purple-500/20">
                          <p className="text-xs text-gray-400 mb-2">Selected Columns:</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedColumns.map((column) => (
                              <span key={column} className="px-3 py-1 bg-blue-500/20 border border-blue-500/50 rounded-full text-white text-sm">
                                {column}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Filters Section */}
                <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500/20 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">Filters (WHERE)</h3>
                    <button
                      onClick={addFilter}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Add Filter</span>
                    </button>
                  </div>

                  {filters.length === 0 ? (
                    <div className="text-center py-8">
                      <Filter className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                      <p className="text-gray-400">No filters applied</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filters.map((filter, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4 bg-slate-900/50 rounded-lg border border-purple-500/20">
                          <select className="flex-1 px-4 py-2 bg-white/10 border border-purple-500/30 rounded-lg text-white">
                            <option>Select Column</option>
                            {selectedColumns.map(col => (
                              <option key={col} value={col}>{col}</option>
                            ))}
                          </select>

                          <select className="w-32 px-4 py-2 bg-white/10 border border-purple-500/30 rounded-lg text-white">
                            <option value="=">=</option>
                            <option value="!=">!=</option>
                            <option value=">">{'>'}</option>
                            <option value="<">{'<'}</option>
                            <option value=">=">{'≥'}</option>
                            <option value="<=">{'≤'}</option>
                            <option value="LIKE">LIKE</option>
                          </select>

                          <input
                            type="text"
                            placeholder="Value"
                            className="flex-1 px-4 py-2 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-gray-500"
                          />

                          <button
                            onClick={() => removeFilter(index)}
                            className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* SQL Editor */
              <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">SQL Editor</h3>
                  <div className="flex items-center space-x-2">
                    <Code className="w-5 h-5 text-purple-400" />
                    <span className="text-sm text-gray-400">Write custom SQL</span>
                  </div>
                </div>
                
                <textarea
                  value={sqlQuery}
                  onChange={(e) => setSqlQuery(e.target.value)}
                  placeholder="-- Write your SQL query here
SELECT * FROM sales
WHERE date >= '2024-01-01'
ORDER BY revenue DESC
LIMIT 100;"
                  className="w-full h-96 px-6 py-4 bg-slate-900/80 border border-purple-500/30 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-purple-500 resize-none"
                  spellCheck={false}
                />
              </div>
            )}

            {/* Generated SQL Preview */}
            {activeTab === 'visual' && sqlQuery && (
              <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Generated SQL</h3>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
                  >
                    <Copy className="w-4 h-4 text-white" />
                    <span className="text-white">Copy</span>
                  </button>
                </div>
                
                <pre className="p-6 bg-slate-900/80 border border-purple-500/30 rounded-lg text-purple-300 font-mono text-sm overflow-x-auto">
                  {sqlQuery}
                </pre>
              </div>
            )}

            {/* Query Results */}
            {queryResults && (
              <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">Query Results</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {queryResults.rowsAffected} rows • Executed in {queryResults.executionTime}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition flex items-center space-x-2">
                      <Download className="w-4 h-4 text-white" />
                      <span className="text-white">Export CSV</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-purple-500/20">
                        {queryResults.columns.map((column, index) => (
                          <th 
                            key={index}
                            className="text-left py-3 px-4 text-purple-400 font-semibold"
                          >
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {queryResults.rows.map((row, rowIndex) => (
                        <tr 
                          key={rowIndex}
                          className="border-b border-purple-500/10 hover:bg-white/5 transition"
                        >
                          {row.map((cell, cellIndex) => (
                            <td 
                              key={cellIndex}
                              className="py-3 px-4 text-gray-300"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

// Sidebar Link Component
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

// Mock Data
const availableTables = [
  { 
    name: 'sales', 
    rows: '12,458',
    columns: ['date', 'product_id', 'region', 'revenue', 'units', 'customer_id']
  },
  { 
    name: 'products', 
    rows: '234',
    columns: ['product_id', 'name', 'category', 'price', 'stock']
  },
  { 
    name: 'customers', 
    rows: '8,234',
    columns: ['customer_id', 'name', 'email', 'segment', 'joined_date']
  },
  { 
    name: 'regions', 
    rows: '50',
    columns: ['region_id', 'name', 'country', 'continent']
  },
];

export default QueryBuilder;