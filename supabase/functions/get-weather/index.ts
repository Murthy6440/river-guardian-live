import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { lat, lon } = await req.json();
    const apiKey = Deno.env.get('OPENWEATHERMAP_API_KEY');

    if (!apiKey) {
      throw new Error('OpenWeatherMap API key not configured');
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.statusText}`);
    }

    const data = await response.json();

    const weatherData = {
      temperature: Math.round(data.main.temp),
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      description: data.weather[0]?.description || 'Unknown',
      icon: data.weather[0]?.icon || '01d',
      feelsLike: Math.round(data.main.feels_like),
      pressure: data.main.pressure,
      visibility: Math.round((data.visibility || 10000) / 1000), // Convert to km
      clouds: data.clouds?.all || 0,
    };

    return new Response(JSON.stringify(weatherData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching weather:', errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
