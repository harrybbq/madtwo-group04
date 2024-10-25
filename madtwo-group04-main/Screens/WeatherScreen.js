import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import axios from 'axios';

const WeatherScreen = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          'https://api.openweathermap.org/data/2.5/weather?q=Glasgow,Scotland&appid=89bc0e8e6e797c7c76d74cfbd4e61e44&units=metric',
        );
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <View style={styles.content}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!weatherData) {
    return (
      <View style={styles.content}>
        <Text>Failed to fetch weather data.</Text>
      </View>
    );
  }

  return (
    <View style={styles.content}>
      <Text style={{fontSize: 24, color: '#FFFFFF'}}>Glasgow, Scotland</Text>
      <Text style={{fontSize: 20, color: '#FFFFFF'}}>
        {weatherData.weather[0].description} {Math.round(weatherData.main.temp)}
        °C
      </Text>
      <Text style={{fontSize: 20, color: '#FFFFFF'}}>
        {weatherData.main.temp > 2
          ? 'It is a good day for a workout'
          : "It isn't a great day for a workout"}
      </Text>
    </View>
  );
};

export default WeatherScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
