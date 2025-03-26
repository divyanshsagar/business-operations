import React from 'react';
import { LayoutDashboard, Mail, Shield, Settings } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { EmailProcessor } from './components/EmailProcessor';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-indigo-600">
              <h1 className="text-xl font-bold text-white">DataProcessor AI</h1>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto bg-white">
              <nav className="flex-1 px-2 py-4 space-y-1">
                <SidebarLink icon={<LayoutDashboard />} text="Dashboard" active />
                <SidebarLink icon={<Mail />} text="Email Processing" />
                <SidebarLink icon={<Shield />} text="Compliance" />
                <SidebarLink icon={<Settings />} text="Settings" />
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Dashboard />
              <div className="mt-6">
                <EmailProcessor />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarLink({ icon, text, active = false }) {
  return (
    <a
      href="#"
      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
        active
          ? 'bg-indigo-50 text-indigo-600'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <span className={`mr-3 h-6 w-6 ${active ? 'text-indigo-600' : 'text-gray-400'}`}>
        {icon}
      </span>
      {text}
    </a>
  );
}

export default App;