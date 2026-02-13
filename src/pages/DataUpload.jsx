import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, Upload, BarChart3, MessageSquare, Settings, LogOut,
  FileSpreadsheet, CheckCircle, X, AlertCircle
} from 'lucide-react';

const DataUpload = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      setUploadSuccess(false);
      
      // Simulate file preview
      const mockPreview = {
        headers: ['Date', 'Product', 'Region', 'Sales', 'Units'],
        rows: [
          ['2024-01-15', 'Widget A', 'North America', '$12,450', '124'],
          ['2024-01-15', 'Widget B', 'Europe', '$8,750', '87'],
          ['2024-01-16', 'Widget C', 'Asia', '$15,200', '152'],
          ['2024-01-16', 'Widget A', 'South America', '$6,300', '63'],
          ['2024-01-17', 'Widget B', 'North America', '$9,800', '98'],
        ]
      };
      setPreviewData(mockPreview);
    }
  };

  const handleUpload = async () => {
    setUploading(true);
    
    // Simulate API call
    setTimeout(() => {
      setUploading(false);
      setUploadSuccess(true);
      
      // Clear after 3 seconds
      setTimeout(() => {
        setUploadSuccess(false);
        setUploadedFile(null);
        setPreviewData(null);
      }, 3000);
    }, 2000);
  };

  const handleClear = () => {
    setUploadedFile(null);
    setPreviewData(null);
    setUploadSuccess(false);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900/80 backdrop-blur-lg border-r border-purple-500/20">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <Upload className="w-8 h-8 text-purple-400" />
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
              active={true}
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
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Upload Data</h1>
            <p className="text-gray-400">Upload CSV, Excel, or JSON files to your data warehouse</p>
          </div>

          {/* Upload Area */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-8 mb-8">
            <div className="border-2 border-dashed border-purple-500/30 rounded-xl p-12 text-center hover:border-purple-500/50 transition">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".csv,.xlsx,.xls,.json"
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {uploadedFile ? uploadedFile.name : 'Drop your file here or click to browse'}
                </h3>
                <p className="text-gray-400 mb-4">
                  Supports CSV, Excel (.xlsx, .xls), and JSON files
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Maximum file size: 100MB</span>
                </div>
              </label>
            </div>

            {/* File Info */}
            {uploadedFile && (
              <div className="mt-6 p-4 bg-white/10 rounded-lg flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileSpreadsheet className="w-6 h-6 text-purple-400" />
                  <div>
                    <p className="text-white font-medium">{uploadedFile.name}</p>
                    <p className="text-sm text-gray-400">
                      {(uploadedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClear}
                  className="text-gray-400 hover:text-red-400 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Upload Button */}
            {uploadedFile && !uploadSuccess && (
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="w-full mt-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition disabled:opacity-50"
              >
                {uploading ? 'Processing...' : 'Upload & Process Data'}
              </button>
            )}

            {/* Success Message */}
            {uploadSuccess && (
              <div className="mt-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <div>
                  <p className="text-white font-medium">Upload Successful!</p>
                  <p className="text-sm text-gray-400">Your data has been processed and added to the warehouse</p>
                </div>
              </div>
            )}
          </div>

          {/* Data Preview */}
          {previewData && (
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Data Preview</h3>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                  {previewData.rows.length} rows detected
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-purple-500/20">
                      {previewData.headers.map((header, index) => (
                        <th 
                          key={index}
                          className="text-left py-3 px-4 text-purple-400 font-semibold"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.rows.map((row, rowIndex) => (
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

              {/* Validation Info */}
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-white font-medium mb-1">Data Validation</p>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>✓ All columns have valid data types</li>
                    <li>✓ No duplicate records found</li>
                    <li>✓ Date formats are consistent</li>
                    <li>✓ Ready for upload</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Recent Uploads */}
          <div className="mt-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-8">
            <h3 className="text-xl font-bold text-white mb-6">Recent Uploads</h3>
            <div className="space-y-4">
              {recentUploads.map((upload, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <FileSpreadsheet className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{upload.name}</p>
                      <p className="text-sm text-gray-400">
                        {upload.rows} rows • {upload.date}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                    Processed
                  </span>
                </div>
              ))}
            </div>
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
const recentUploads = [
  { name: 'sales_q4_2024.csv', rows: '12,458', date: '2 hours ago' },
  { name: 'customer_data.xlsx', rows: '8,234', date: '5 hours ago' },
  { name: 'inventory_update.json', rows: '3,672', date: '1 day ago' },
];

export default DataUpload;