import { Package, Check, AlertTriangle, Droplets, Utensils, Flashlight, Radio, BandageIcon, FileText, Shirt, Battery } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SurvivalItem {
  id: string;
  name: string;
  description: string;
  priority: 'essential' | 'important' | 'recommended';
  icon: React.ReactNode;
  quantity: string;
}

const survivalItems: SurvivalItem[] = [
  {
    id: '1',
    name: 'Drinking Water',
    description: '1 gallon per person per day for at least 3 days',
    priority: 'essential',
    icon: <Droplets size={18} />,
    quantity: '15L minimum',
  },
  {
    id: '2',
    name: 'Non-Perishable Food',
    description: 'Canned goods, dry foods, energy bars',
    priority: 'essential',
    icon: <Utensils size={18} />,
    quantity: '3-day supply',
  },
  {
    id: '3',
    name: 'First Aid Kit',
    description: 'Bandages, antiseptic, medications, masks',
    priority: 'essential',
    icon: <BandageIcon size={18} />,
    quantity: '1 complete kit',
  },
  {
    id: '4',
    name: 'Flashlight & Batteries',
    description: 'LED flashlight with extra batteries',
    priority: 'essential',
    icon: <Flashlight size={18} />,
    quantity: '2 flashlights',
  },
  {
    id: '5',
    name: 'Battery/Crank Radio',
    description: 'For emergency broadcasts and weather updates',
    priority: 'important',
    icon: <Radio size={18} />,
    quantity: '1 unit',
  },
  {
    id: '6',
    name: 'Important Documents',
    description: 'ID, insurance, bank details in waterproof bag',
    priority: 'important',
    icon: <FileText size={18} />,
    quantity: 'All copies',
  },
  {
    id: '7',
    name: 'Extra Clothing',
    description: 'Warm clothes, rain gear, sturdy shoes',
    priority: 'important',
    icon: <Shirt size={18} />,
    quantity: '1 set per person',
  },
  {
    id: '8',
    name: 'Power Bank',
    description: 'Fully charged mobile power bank',
    priority: 'recommended',
    icon: <Battery size={18} />,
    quantity: '10000mAh+',
  },
];

const priorityStyles = {
  essential: {
    badge: 'bg-destructive/20 text-destructive border-destructive/30',
    border: 'border-l-destructive',
    icon: <AlertTriangle size={12} />,
    label: 'Essential',
  },
  important: {
    badge: 'bg-zone-warning/20 text-zone-warning border-zone-warning/30',
    border: 'border-l-zone-warning',
    icon: <AlertTriangle size={12} />,
    label: 'Important',
  },
  recommended: {
    badge: 'bg-zone-safe/20 text-zone-safe border-zone-safe/30',
    border: 'border-l-zone-safe',
    icon: <Check size={12} />,
    label: 'Recommended',
  },
};

export function SurvivalItems() {
  return (
    <div className="rounded-2xl bg-card border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Package className="text-zone-warning" size={20} />
          Survival Kit Checklist
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Essential items to prepare for flood emergencies
        </p>
      </div>

      {/* Priority Legend */}
      <div className="flex items-center gap-4 p-3 border-b border-border bg-secondary/20">
        {Object.entries(priorityStyles).map(([key, style]) => (
          <div key={key} className="flex items-center gap-1.5 text-xs">
            <span className={cn('px-1.5 py-0.5 rounded border', style.badge)}>
              {style.label}
            </span>
          </div>
        ))}
      </div>

      <div className="p-4 space-y-2">
        {survivalItems.map((item) => (
          <div
            key={item.id}
            className={cn(
              'flex items-start gap-3 p-3 rounded-lg bg-secondary/30 border-l-4 transition-all duration-200 hover:bg-secondary/50',
              priorityStyles[item.priority].border
            )}
          >
            <div className={cn(
              'p-2 rounded-lg',
              item.priority === 'essential' && 'bg-destructive/20 text-destructive',
              item.priority === 'important' && 'bg-zone-warning/20 text-zone-warning',
              item.priority === 'recommended' && 'bg-zone-safe/20 text-zone-safe'
            )}>
              {item.icon}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-medium text-sm">{item.name}</h4>
                <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                  {item.quantity}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Contacts */}
      <div className="p-4 border-t border-border bg-secondary/20">
        <h4 className="text-sm font-medium mb-2">Emergency Contacts</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 rounded bg-card">
            <p className="text-muted-foreground">NDRF Helpline</p>
            <p className="font-mono font-medium">1800-XXX-XXXX</p>
          </div>
          <div className="p-2 rounded bg-card">
            <p className="text-muted-foreground">Disaster Control</p>
            <p className="font-mono font-medium">108 / 112</p>
          </div>
        </div>
      </div>
    </div>
  );
}
