import { Link } from 'react-router-dom';
import { 
  Droplets, 
  Shield, 
  Bell, 
  MapPin, 
  Users, 
  Clock, 
  ArrowRight,
  CheckCircle,
  Smartphone,
  Globe,
  AlertTriangle,
  BarChart3,
  CloudRain,
  Navigation
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: <Bell className="text-primary" size={28} />,
    title: 'Real-time Alerts',
    description: 'Instant notifications when flood risks are detected in your area with zone-based severity levels.'
  },
  {
    icon: <MapPin className="text-accent" size={28} />,
    title: 'Location Tracking',
    description: 'GPS-based monitoring to identify nearby flood zones and provide personalized safety information.'
  },
  {
    icon: <Navigation className="text-zone-safe" size={28} />,
    title: 'Escape Routes',
    description: 'Pre-planned evacuation routes to nearest safe zones with real-time traffic and accessibility updates.'
  },
  {
    icon: <CloudRain className="text-zone-warning" size={28} />,
    title: 'Weather Forecast',
    description: 'Accurate weather predictions integrated with flood risk assessment for better preparedness.'
  },
  {
    icon: <BarChart3 className="text-destructive" size={28} />,
    title: 'Statistics & Analysis',
    description: 'Comprehensive data visualization of flood patterns, affected regions, and relief operations.'
  },
  {
    icon: <Users className="text-primary" size={28} />,
    title: 'Community Alerts',
    description: 'Crowdsourced information from local communities for faster and more accurate flood detection.'
  },
];

const advantages = [
  'Early warning system saves lives and reduces property damage',
  'Works offline with cached data for areas with poor connectivity',
  'Multi-language support for diverse Indian communities',
  'Integration with NDMA and state disaster management authorities',
  'Free to use for all citizens across India',
  'Low data consumption optimized for 2G/3G networks',
];

const stats = [
  { value: '28+', label: 'States Covered' },
  { value: '2.8K+', label: 'Flood Zones Monitored' },
  { value: '4L+', label: 'Lives Protected' },
  { value: '< 5 min', label: 'Alert Response Time' },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
                  <Droplets className="text-primary" size={28} />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">
                  FloodGuard<span className="text-primary">India</span>
                </h1>
                <p className="text-xs text-muted-foreground">Early Warning System</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#advantages" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Advantages</a>
              <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
              <Link to="/dashboard">
                <Button className="gap-2">
                  Open Dashboard <ArrowRight size={16} />
                </Button>
              </Link>
            </nav>

            <Link to="/dashboard" className="md:hidden">
              <Button size="sm">Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/30 mb-6">
              <AlertTriangle className="text-destructive animate-pulse" size={16} />
              <span className="text-sm font-medium text-destructive">Monsoon Season Active - Stay Alert</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Protecting India from
              <span className="text-primary block">Flood Disasters</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Real-time flood monitoring and early warning system designed to save lives. 
              Get instant alerts, escape routes, and survival information for your location.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="gap-2 text-lg px-8">
                  <Shield size={20} />
                  Access Dashboard
                </Button>
              </Link>
              <a href="#features">
                <Button size="lg" variant="outline" className="gap-2 text-lg px-8">
                  Learn More
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary font-mono">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Purpose Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Purpose</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Building a safer India through technology and community collaboration
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 rounded-2xl bg-card border border-border">
                <Globe className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-3">National Coverage</h3>
                <p className="text-muted-foreground">
                  FloodGuard India is a comprehensive flood monitoring system that covers all 28 states 
                  and 8 union territories. We work closely with the National Disaster Management Authority (NDMA) 
                  and state-level agencies to provide accurate, real-time flood information.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border">
                <Clock className="text-accent mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-3">Early Warning System</h3>
                <p className="text-muted-foreground">
                  Our advanced prediction algorithms analyze weather patterns, river water levels, 
                  and historical data to provide early warnings up to 72 hours before potential flooding. 
                  This crucial lead time helps communities prepare and evacuate safely.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border">
                <Smartphone className="text-zone-safe mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-3">Mobile First</h3>
                <p className="text-muted-foreground">
                  Designed for accessibility, our platform works seamlessly on all devices including 
                  low-end smartphones. SMS alerts ensure that even users without internet access 
                  receive critical flood warnings in their local language.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border">
                <Users className="text-zone-warning mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-3">Community Driven</h3>
                <p className="text-muted-foreground">
                  Local volunteers and community members contribute real-time ground reports, 
                  helping us provide more accurate and localized flood information. 
                  Together, we build a resilient India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools to keep you informed and safe during flood emergencies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors group"
              >
                <div className="p-3 rounded-xl bg-secondary/50 w-fit mb-4 group-hover:bg-primary/10 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section id="advantages" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why FloodGuard India?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Trusted by millions of Indians for reliable flood information
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {advantages.map((advantage, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border"
                >
                  <CheckCircle className="text-zone-safe shrink-0 mt-0.5" size={20} />
                  <span className="text-sm">{advantage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Safe, Stay Informed
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Access real-time flood monitoring, weather forecasts, and emergency resources for your location.
            </p>
            <Link to="/dashboard">
              <Button size="lg" className="gap-2 text-lg px-8">
                Open Dashboard <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Droplets className="text-primary" size={24} />
              </div>
              <div>
                <p className="font-semibold">FloodGuard India</p>
                <p className="text-xs text-muted-foreground">Early Warning System</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
              <Link to="/weather" className="hover:text-foreground transition-colors">Weather</Link>
              <Link to="/statistics" className="hover:text-foreground transition-colors">Statistics</Link>
            </div>

            <p className="text-sm text-muted-foreground">
              Emergency Helpline: <span className="font-mono font-semibold">1800-XXX-XXXX</span>
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2026 FloodGuard India. Developed for public safety.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
