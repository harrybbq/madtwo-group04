import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';

const averageMET = 5.5; // Moderate cycling MET value
const weightKg = 70; // Average weight in kilograms, this should be user-inputted for accuracy

export default function CycleScreen({ navigation }) {
  const [timer, setTimer] = useState(0);
  const [isCycling, setIsCycling] = useState(false);
  const [calories, setCalories] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);

  let startPos;
  let lastPosition;
  let watchID;
  let distance = 0;

  useEffect(() => {
    let interval;
    if (isCycling) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isCycling]);

  const startCycling = () => {
    setIsCycling(true);
    startPos = undefined; // Reset start position
    distance = 0;
    if ('geolocation' in navigator) {
      watchID = navigator.geolocation.watchPosition(updatePosition);
    } else {
      console.log('Geolocation is not available.');
    }
  };

  const stopCycling = () => {
    setIsCycling(false);
    setTotalDistance(distance); // Update the total distance state
    navigation.navigate('Scoreboard', { distance: totalDistance });
    if ('geolocation' in navigator) {
      navigator.geolocation.clearWatch(watchID);
    } else {
      console.log('Geolocation is not available.');
    }
  };

  const resetCycling = () => {
    setTimer(0);
    setCalories(0);
    setIsCycling(false);
    setTotalDistance(0);
  };

  function updatePosition(position) {
    if (!startPos) {
      startPos = position.coords;
      lastPosition = position.coords;
      return;
    }

    const endPos = position.coords;
    const distanceKM = haversine(lastPosition.latitude, lastPosition.longitude, endPos.latitude, endPos.longitude);

    distance += distanceKM; // Update the accumulated distance
    setTotalDistance(distance); // Set the updated distance state

    // Calculate and update calories based on the total distance
    const caloriesBurned = distance * (averageMET * weightKg * 3.5) / 200;
    setCalories(caloriesBurned);

    lastPosition = endPos;
  }

  function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in kilometers
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  // Utility function to format the timer
  const formatTime = seconds => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f2f2f7" />
        <Text style={styles.headerText}>Cycling Workout</Text>
        <Text style={styles.timer}>{formatTime(timer)}</Text>
        <Text style={styles.stats}>Calories: {calories.toFixed(2)}</Text>
        <Text style={styles.stats}>Distance: {totalDistance.toFixed(2)} km</Text>
        <View style={styles.buttonsContainer}>
          {!isCycling ? (
              <TouchableOpacity
                  style={[styles.button, styles.startButton]}
                  onPress={startCycling}>
                <Text style={styles.buttonText}>Start Cycling</Text>
              </TouchableOpacity>
          ) : (
              <>
                <TouchableOpacity
                    style={[styles.button, styles.stopButton]}
                    onPress={stopCycling}>
                  <Text style={styles.buttonText}>Stop Cycling</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.resetButton]}
                    onPress={resetCycling}>
                  <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
              </>
          )}
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f7',
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: -50,
  },
  timer: {
    fontSize: 60,
    fontWeight: '200',
    marginBottom: 20,
  },
  stats: {
    fontSize: 22,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 25,
    marginHorizontal: 5,
    elevation: 3,
    width: 150, // Specific button width
    height: 70, // Specific button height
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  startButton: {
    backgroundColor: '#34C759',
  },
  stopButton: {
    backgroundColor: '#FF3B30',
  },
  resetButton: {
    backgroundColor: '#FF9500',
  },
});