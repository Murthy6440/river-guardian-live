import { Header } from '@/components/Header';
import { FloodStatistics } from '@/components/FloodStatistics';
import { BarChart3, TrendingUp, Activity, MapPin, Users, AlertTriangle } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const hourlyData = [
  { time: '00:00', level: 2.1 },
  { time: '04:00', level: 2.3 },
  { time: '08:00', level: 2.5 },
  { time: '12:00', level: 2.8 },
  { time: '16:00', level: 2.6 },
  { time: '20:00', level: 2.4 },
  { time: '24:00', level: 2.3 },
];

const zoneDistribution = [
  { name: 'Safe Zones', value: 45, color: 'hsl(160, 84%, 39%)' },
  { name: 'Warning Zones', value: 35, color: 'hsl(48, 96%, 53%)' },
  { name: 'Danger Zones', value: 20, color: 'hsl(0, 72%, 51%)' },
];

const stateWiseData = [
  { state: 'Assam', alerts: 12, affected: 120000, status: 'critical' },
  { state: 'West Bengal', alerts: 8, affected: 85000, status: 'warning' },
  { state: 'Uttar Pradesh', alerts: 6, affected: 67000, status: 'warning' },
  { state: 'Bihar', alerts: 5, affected: 55000, status: 'moderate' },
  { state: 'Kerala', alerts: 4, affected: 32000, status: 'moderate' },
  { state: 'Delhi', alerts: 3, affected: 45000, status: 'warning' },
];

const Statistics = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/30">
            <BarChart3 className="text-accent" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Statistics & Analysis</h1>
            <p className="text-sm text-muted-foreground">Comprehensive flood data insights</p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="text-primary" size={18} />
              <span className="text-sm text-muted-foreground">Monitored Zones</span>
            </div>
            <p className="text-2xl font-bold font-mono">2,847</p>
            <p className="text-xs text-zone-safe flex items-center gap-1 mt-1">
              <TrendingUp size={12} /> +124 this week
            </p>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="text-destructive" size={18} />
              <span className="text-sm text-muted-foreground">Active Alerts</span>
            </div>
            <p className="text-2xl font-bold font-mono text-destructive">38</p>
            <p className="text-xs text-muted-foreground mt-1">Across 12 states</p>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Users className="text-zone-warning" size={18} />
              <span className="text-sm text-muted-foreground">People Affected</span>
            </div>
            <p className="text-2xl font-bold font-mono">4.04L</p>
            <p className="text-xs text-muted-foreground mt-1">71% evacuated</p>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="text-accent" size={18} />
              <span className="text-sm text-muted-foreground">Avg Response Time</span>
            </div>
            <p className="text-2xl font-bold font-mono">18 min</p>
            <p className="text-xs text-zone-safe flex items-center gap-1 mt-1">
              <TrendingUp size={12} /> -3 min improvement
            </p>
          </div>
        </div>

        {/* Main Statistics Component */}
        <FloodStatistics />

        {/* Additional Analysis */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Hourly Water Level */}
          <div className="rounded-2xl bg-card border border-border p-4">
            <h3 className="text-lg font-semibold mb-4">24-Hour Water Level Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 40%, 18%)" />
                <XAxis dataKey="time" tick={{ fontSize: 10, fill: 'hsl(215, 20%, 55%)' }} />
                <YAxis tick={{ fontSize: 10, fill: 'hsl(215, 20%, 55%)' }} domain={[1.5, 3.5]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(222, 47%, 10%)',
                    border: '1px solid hsl(222, 40%, 18%)',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="level"
                  stroke="hsl(200, 80%, 55%)"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(200, 80%, 55%)', strokeWidth: 0, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Zone Distribution */}
          <div className="rounded-2xl bg-card border border-border p-4">
            <h3 className="text-lg font-semibold mb-4">Zone Distribution</h3>
            <div className="flex items-center">
              <ResponsiveContainer width="50%" height={180}>
                <PieChart>
                  <Pie
                    data={zoneDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {zoneDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(222, 47%, 10%)',
                      border: '1px solid hsl(222, 40%, 18%)',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                {zoneDistribution.map((zone) => (
                  <div key={zone.name} className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded" style={{ backgroundColor: zone.color }} />
                    <span className="text-sm text-muted-foreground">{zone.name}</span>
                    <span className="text-sm font-mono font-medium">{zone.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* State-wise Analysis */}
        <div className="rounded-2xl bg-card border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-lg font-semibold">State-wise Flood Analysis</h3>
            <p className="text-xs text-muted-foreground mt-1">Current flood situation across major states</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">State</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Active Alerts</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Affected Population</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {stateWiseData.map((state) => (
                  <tr key={state.state} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                    <td className="p-4 font-medium">{state.state}</td>
                    <td className="p-4 font-mono">{state.alerts}</td>
                    <td className="p-4 font-mono">{(state.affected / 1000).toFixed(0)}K</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          state.status === 'critical'
                            ? 'bg-destructive/20 text-destructive'
                            : state.status === 'warning'
                            ? 'bg-zone-warning/20 text-zone-warning'
                            : 'bg-zone-safe/20 text-zone-safe'
                        }`}
                      >
                        {state.status.charAt(0).toUpperCase() + state.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 text-sm text-muted-foreground border-t border-border">
          <p className="mb-2">
            🌊 FloodGuard India - Real-time Flood Monitoring & Early Warning System
          </p>
          <p className="text-xs">
            Data updated every 5 minutes • Emergency helpline: 1800-XXX-XXXX
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Statistics;
