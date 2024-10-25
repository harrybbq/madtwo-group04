import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Button} from '@rneui/themed';
import WeatherScreen from './WeatherScreen';

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={[styles.logo, {width: 200, height: 200}]}
          source={require('./StrathvaLogo.png')} // Provide the correct path to your logo image
          resizeMode="contain" // Adjust the resizing mode as needed
        />
        <Text style={styles.titleText}>STRATHVA</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#6495ED'}]}
          onPress={() => navigation.navigate('RunScreen')}>
          <Text style={styles.buttonText}>Start a Run</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#6495ED'}]}
          onPress={() => navigation.navigate('WalkScreen')}>
          <Text style={styles.buttonText}>Start a Walk</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#6495ED'}]}
          onPress={() => navigation.navigate('CycleScreen')}>
          <Text style={styles.buttonText}>Start a Cycle</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#6495ED'}]}
          onPress={() => navigation.navigate('Scoreboard')}>
          <Text style={styles.buttonText}>View Scoreboard</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#6495ED'}]}
          onPress={() => navigation.navigate('GymMapScreen')}>
          <Text style={styles.buttonText}>View Nearby Gyms</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.weatherBox}>
        <WeatherScreen />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FF',
  },
  header: {
    marginTop: 30,
    padding: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  logo: {
    position: 'absolute',
    zIndex: -1,
    opacity: 0.7,
  },
  titleText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#396a93',
    fontFamily: 'fantasy',
    textShadowColor: 'rgba(255, 255, 255, 1)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5,
    elevation: 5,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginBottom: 20,
    width: 200,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  weatherBox: {
    flex: 0.5,
    backgroundColor: '#6495ED',
    borderRadius: 10,
    margin: 20,
    marginTop: -30,
    padding: 1,
    justifyCntent: 'center',
    alignItems: 'center',
  },
});
