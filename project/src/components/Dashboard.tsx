import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Mail, Users, AlertTriangle, CheckCircle } from 'lucide-react';

const data = [
  { name: 'Mon', processed: 400, pending: 240 },
  { name: 'Tue', processed: 300, pending: 139 },
  { name: 'Wed', processed: 200, pending: 980 },
  { name: 'Thu', processed: 278, pending: 390 },
  { name: 'Fri', processed: 189, pending: 480 },
];

export function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Processed Emails"
          value="1,234"
          icon={<Mail className="w-6 h-6" />}
          trend="+12.5%"
        />
        <StatCard
          title="Active Users"
          value="56"
          icon={<Users className="w-6 h-6" />}
          trend="+3.2%"
        />
        <StatCard
          title="Issues Detected"
          value="23"
          icon={<AlertTriangle className="w-6 h-6" />}
          trend="-5.1%"
        />
        <StatCard
          title="Compliance Score"
          value="98%"
          icon={<CheckCircle className="w-6 h-6" />}
          trend="+0.8%"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Email Processing Metrics</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="processed" stroke="#4F46E5" strokeWidth={2} />
              <Line type="monotone" dataKey="pending" stroke="#EC4899" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend }) {
  const isPositive = trend.startsWith('+');
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div className="text-indigo-600">{icon}</div>
        <span className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {trend}
        </span>
      </div>
      <div className="mt-4">
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );
}