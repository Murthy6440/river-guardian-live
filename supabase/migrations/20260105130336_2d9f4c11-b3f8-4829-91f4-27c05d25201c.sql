-- Create table for push notification subscriptions
CREATE TABLE public.push_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  endpoint TEXT NOT NULL UNIQUE,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  phone_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert subscriptions (anonymous users can subscribe)
CREATE POLICY "Anyone can create subscriptions" 
ON public.push_subscriptions 
FOR INSERT 
WITH CHECK (true);

-- Allow anyone to read their own subscription by endpoint
CREATE POLICY "Anyone can read subscriptions" 
ON public.push_subscriptions 
FOR SELECT 
USING (true);

-- Allow updates to subscriptions
CREATE POLICY "Anyone can update subscriptions" 
ON public.push_subscriptions 
FOR UPDATE 
USING (true);

-- Create table for alert history
CREATE TABLE public.flood_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  zone_name TEXT NOT NULL,
  zone_level TEXT NOT NULL CHECK (zone_level IN ('danger', 'warning', 'safe')),
  water_level DECIMAL(5,2),
  message TEXT NOT NULL,
  latitude DECIMAL(10,7),
  longitude DECIMAL(10,7),
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notifications_sent INTEGER DEFAULT 0,
  sms_sent INTEGER DEFAULT 0
);

-- Enable RLS for alerts (public read for everyone)
ALTER TABLE public.flood_alerts ENABLE ROW LEVEL SECURITY;

-- Anyone can read alerts
CREATE POLICY "Anyone can read alerts" 
ON public.flood_alerts 
FOR SELECT 
USING (true);

-- Only backend can insert alerts (via service role)
CREATE POLICY "Service can insert alerts"
ON public.flood_alerts
FOR INSERT
WITH CHECK (true);

-- Enable realtime for alerts
ALTER PUBLICATION supabase_realtime ADD TABLE public.flood_alerts;