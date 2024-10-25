import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  accelerometer,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';

setUpdateIntervalForType(SensorTypes.accelerometer, 400); // Update every 400ms

export default function RunScreen({navigation}) {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [steps, setSteps] = useState(0);
  const [calories, setCalories] = useState(0);
  let [totalDistance, setDistance] = useState(0);
  const avgCaloriesPerStep = 0.04; // Average calories per step
  let lastStepTime = Date.now();

  let startPos;
  let lastPosition;
  let watchID;
  let distance = 0;

  useEffect(() => {
    let interval;
    const subscription = accelerometer.subscribe(({x}) => {
      const now = Date.now();
      if (x > 1 && now - lastStepTime > 500) {
        lastStepTime = now;
        setSteps(prevSteps => prevSteps + 1);
      }
    });

    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
      subscription.unsubscribe();
    };
  }, [isRunning]);

  function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  function updatePosition(position) {
    if (!startPos) {
      startPos = position.coords;
      lastPosition = position.coords;
      return;
    }

    const endPos = position.coords;
    const distanceKM = haversine(lastPosition.latitude, lastPosition.longitude, endPos.latitude, endPos.longitude);

    distance = distanceKM;
    lastPosition = endPos;
  }

  useEffect(() => {
    setCalories(steps * avgCaloriesPerStep);
  }, [steps]);

  const startTimer = () => {
    setIsRunning(true);
    startPos;
    distance = 0;
    if ('geolocation' in navigator) {
      watchID = navigator.geolocation.watchPosition(updatePosition);
    } else {
      console.log('Geolocation is not available.');
    }
  }

  const stopTimer = () => {
    if ('geolocation' in navigator) {
    navigator.geolocation.clearWatch(watchID);
    } else {
      console.log('Geolocation is not available.');
    }
    setIsRunning(false);
    totalDistance = distance;
    navigation.navigate('Scoreboard', {distance: totalDistance});
  };
  const resetTimer = () => {
    setTimer(0);
    setSteps(0);
    setCalories(0);
    setDistance(0);
    setIsRunning(false);
  };


  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${
        remainingSeconds < 10 ? '0' : ''
    }${remainingSeconds}`;
  };

  return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f2f2f7" />
        <Text style={styles.headerText}>Running Workout</Text>
        <Text style={styles.timer}>{formatTime(timer)}</Text>
        <Text style={styles.stats}>Steps: {steps}</Text>
        <Text style={styles.stats}>Calories: {calories.toFixed(2)}</Text>
        <Text style={styles.stats}>Distance: {distance.toFixed(2)} m</Text>
        <View style={styles.buttonsContainer}>
          {!isRunning ? (
              <TouchableOpacity
                  style={[styles.button, styles.startButton]}
                  onPress={startTimer}>
                <Text style={styles.buttonText}>Start</Text>
              </TouchableOpacity>
          ) : (
              <>
                <TouchableOpacity
                    style={[styles.button, styles.stopButton]}
                    onPress={stopTimer}>
                  <Text style={styles.buttonText}>Stop</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.resetButton]}
                    onPress={resetTimer}>
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
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  startButton: {
    backgroundColor: '#34C759',
    width: 150,
    height: 70,
  },
  stopButton: {
    backgroundColor: '#FF3B30',
    width: 150,
    height: 70,
  },
  resetButton: {
    backgroundColor: '#FF9500',
    width: 150,
    height: 70,
  },
});
