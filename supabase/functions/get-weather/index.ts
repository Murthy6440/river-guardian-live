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

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.statusText}`);
    }

    const data = await response.json();
    const current = data.current;

    // Map weather code to description
    const getWeatherDescription = (code: number): string => {
      if (code === 0) return 'Clear sky';
      if (code <= 3) return 'Partly cloudy';
      if (code <= 49) return 'Foggy';
      if (code <= 59) return 'Drizzle';
      if (code <= 69) return 'Rain';
      if (code <= 79) return 'Snow';
      if (code <= 99) return 'Thunderstorm';
      return 'Unknown';
    };

    const weatherData = {
      temperature: Math.round(current.temperature_2m),
      humidity: current.relative_humidity_2m,
      windSpeed: Math.round(current.wind_speed_10m),
      description: getWeatherDescription(current.weather_code),
      icon: current.weather_code <= 3 ? '01d' : '03d',
      feelsLike: Math.round(current.apparent_temperature),
      pressure: Math.round(current.pressure_msl),
      visibility: 10,
      clouds: current.cloud_cover,
    };

    console.log('Weather data fetched successfully:', weatherData);

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
