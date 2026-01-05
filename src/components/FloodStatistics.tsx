import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const waterLevelData = [
  { day: 'Mon', level: 1.8, rainfall: 25 },
  { day: 'Tue', level: 2.1, rainfall: 45 },
  { day: 'Wed', level: 2.4, rainfall: 65 },
  { day: 'Thu', level: 2.8, rainfall: 80 },
  { day: 'Fri', level: 2.6, rainfall: 55 },
  { day: 'Sat', level: 2.3, rainfall: 35 },
  { day: 'Sun', level: 2.4, rainfall: 40 },
];

const regionData = [
  { region: 'Delhi', affected: 45000, evacuated: 38000 },
  { region: 'Assam', affected: 120000, evacuated: 95000 },
  { region: 'Bengal', affected: 85000, evacuated: 72000 },
  { region: 'Kerala', affected: 32000, evacuated: 28000 },
  { region: 'UP', affected: 67000, evacuated: 54000 },
];

const statistics = [
  {
    label: 'Total Affected',
    value: '3.49L',
    change: '+12%',
    trend: 'up',
    color: 'text-destructive',
  },
  {
    label: 'Evacuated',
    value: '2.87L',
    change: '+18%',
    trend: 'up',
    color: 'text-zone-safe',
  },
  {
    label: 'Relief Camps',
    value: '847',
    change: '+5%',
    trend: 'up',
    color: 'text-accent',
  },
  {
    label: 'Rescue Teams',
    value: '1,234',
    change: '0%',
    trend: 'stable',
    color: 'text-zone-warning',
  },
];

export function FloodStatistics() {
  return (
    <div className="rounded-2xl bg-card border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <BarChart3 className="text-accent" size={20} />
          Flood Statistics
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Weekly trends and regional impact analysis
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 border-b border-border">
        {statistics.map((stat) => (
          <div key={stat.label} className="text-center p-3 rounded-lg bg-secondary/30">
            <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
            <p className={`text-xl font-bold font-mono ${stat.color}`}>{stat.value}</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              {stat.trend === 'up' ? (
                <TrendingUp size={12} className={stat.label === 'Evacuated' ? 'text-zone-safe' : 'text-destructive'} />
              ) : (
                <TrendingDown size={12} className="text-muted-foreground" />
              )}
              <span className="text-xs text-muted-foreground">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-4 p-4">
        {/* Water Level Trend */}
        <div className="bg-secondary/20 rounded-xl p-4">
          <h4 className="text-sm font-medium mb-3">Water Level Trend (m)</h4>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={waterLevelData}>
              <defs>
                <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(200, 80%, 55%)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(200, 80%, 55%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 40%, 18%)" />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: 'hsl(215, 20%, 55%)' }} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(215, 20%, 55%)' }} domain={[0, 4]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(222, 47%, 10%)',
                  border: '1px solid hsl(222, 40%, 18%)',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="level"
                stroke="hsl(200, 80%, 55%)"
                fill="url(#waterGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Regional Impact */}
        <div className="bg-secondary/20 rounded-xl p-4">
          <h4 className="text-sm font-medium mb-3">Regional Impact (thousands)</h4>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={regionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 40%, 18%)" />
              <XAxis dataKey="region" tick={{ fontSize: 10, fill: 'hsl(215, 20%, 55%)' }} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(215, 20%, 55%)' }} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(222, 47%, 10%)',
                  border: '1px solid hsl(222, 40%, 18%)',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                formatter={(value: number) => `${(value / 1000).toFixed(0)}k`}
              />
              <Bar dataKey="affected" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="evacuated" fill="hsl(160, 84%, 39%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-3 h-3 rounded bg-destructive" />
              <span className="text-muted-foreground">Affected</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-3 h-3 rounded bg-zone-safe" />
              <span className="text-muted-foreground">Evacuated</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
