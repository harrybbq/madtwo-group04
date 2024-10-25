import React, {useEffect, useState} from 'react';
import MapView, {Callout, Marker} from 'react-native-maps';
import {
  View,
  SafeAreaView,
  Linking,
  ActivityIndicator,
  StyleSheet,
  Text,
} from 'react-native';
import {SearchBar, Button} from '@rneui/themed';
import Geolocation from '@react-native-community/geolocation';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGyms, setFilteredGyms] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLocation();
  }, []);

  const showAllGyms = () => {
    setFilteredGyms(gyms);
    setSearchTerm('');
  };

  const handleSearchInputChange = text => {
    setSearchTerm(text);
    const filtered = gyms.filter(gym =>
      gym.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredGyms(filtered);
  };

  const handleURLPress = url => {
    Linking.openURL(url);
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setUserLocation({latitude, longitude});
        setLoading(false);
      },
      error => {
        console.error('Error getting location:', error.message);
        setLoading(false);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.searchSection}>
        <Text style={styles.title}>Find Gyms</Text>
        <SearchBar
          placeholder="Search for nearby gyms..."
          onChangeText={handleSearchInputChange}
          value={searchTerm}
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInputContainer}
          lightTheme
          round
        />
        <Text style={styles.instructions}>
          Click on each marker to show gym name and click on name to go to gym
          website.
        </Text>
        <Button
          title="Search"
          onPress={() => handleSearchInputChange(searchTerm)}
          buttonStyle={styles.searchButton}
        />
        <Button
          title="Show All Nearby Gyms"
          onPress={showAllGyms}
          buttonStyle={styles.showAllButton}
        />
      </SafeAreaView>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.activityIndicator}
        />
      ) : (
        <MapView
          style={styles.map}
          provider="google"
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {filteredGyms.map(gym => (
            <Marker
              key={gym.id}
              coordinate={{
                latitude: gym.latitude,
                longitude: gym.longitude,
              }}>
              <Callout onPress={() => handleURLPress(gym.url)}>
                <Text>{gym.name}</Text>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchSection: {
    backgroundColor: '#f8f9fa',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  searchBarInputContainer: {
    backgroundColor: '#fff',
  },
  instructions: {
    marginVertical: 10,
  },
  searchButton: {
    backgroundColor: '#25a7da',
    marginVertical: 5,
    borderRadius: 10,
  },
  showAllButton: {
    backgroundColor: '#25a7da',
    borderRadius: 10,
  },
  map: {
    flex: 1,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

let gyms = [
  {
    name: 'Strathclyde Sport',
    id: 1,
    url: 'https://www.strath.ac.uk/strathclydesport/',
    latitude: 55.863339,
    longitude: -4.2421798,
  },
  {
    name: 'Extreme Gym Glasgow',
    id: 2,
    url: 'https://www.extreme-gym.co.uk/',
    latitude: 55.85279,
    longitude: -4.22709,
  },
  {
    name: 'Club Gym Wellness - City Centre ',
    id: 3,
    url: 'https://www.clubgymwellness.co.uk/city-centre/',
    latitude: 55.85857,
    longitude: -4.24546,
  },
  {
    name: 'ARC: Health and Fitness',
    id: 4,
    url: 'https://www.gcu.ac.uk/currentstudents/lifeoncampus/healthandfitness/arc',
    latitude: 55.86714,
    longitude: -4.24975,
  },
  {
    name: 'Crossfit Glasgow',
    id: 5,
    url: 'https://www.crossfitglasgow.com/',
    latitude: 55.85486,
    longitude: -4.25602,
  },
  {
    name: 'Improve Glasgow',
    id: 6,
    url: 'http://www.improveglasgow.com/',
    latitude: 55.85476,
    longitude: -4.26374,
  },
  {
    name: 'The Gym Group Glasgow Quay',
    id: 7,
    url: 'https://www.thegymgroup.com/find-a-gym/glasgow-gyms/glasgow-quay/?utm_source=google&utm_medium=organic&utm_campaign=gmb-listing&utm_content=Glasgow%20Quay',
    latitude: 55.85563,
    longitude: -4.27095,
  },
  {
    name: 'Iron Skull Gym',
    id: 8,
    url: 'http://www.ironskullgym.co.uk/',
    latitude: 55.85907,
    longitude: -4.2693,
  },
  {
    name: 'Hilton Glasgow Health & Fitness',
    id: 9,
    url: 'https://hghealthandfitness.com/',
    latitude: 55.86225,
    longitude: -4.2735,
  },
  {
    name: 'Nuffield Health Glasgow Minerva Fitness & Wellbeing Gym',
    id: 10,
    url: 'https://www.nuffieldhealth.com/gyms/glasgow-west-end?utm_source=google&utm_medium=local&utm_campaign=GoogleLocal-Glasgow-Minerva',
    latitude: 55.86408,
    longitude: -4.28192,
  },

  {
    name: 'Puregym Glasgow Charing Cross',
    id: 11,
    url: 'https://www.puregym.com/gyms/glasgow-charing-cross/?utm_source=local&utm_campaign=local_search-glasgow-charing-cross-&utm_medium=organic',
    latitude: 55.86954,
    longitude: -4.26497,
  },
  {
    name: '3d Health & Fitness - Gym Glasgow',
    id: 12,
    url: 'https://www.3dhealthandfitness.co.uk/glasgow/',
    latitude: 55.86704,
    longitude: -4.2593,
  },
  {
    name: 'Puregym Glasgow Bath Street',
    id: 13,
    url: 'https://www.puregym.com/gyms/glasgow-bath-street/?utm_source=local&utm_campaign=local_search-glasgow-bath-street-&utm_medium=organic',
    latitude: 55.8653,
    longitude: -4.26016,
  },
  {
    name: 'The Gym Group Glasgow Bothwell Street',
    id: 14,
    url: 'https://www.thegymgroup.com/find-a-gym/glasgow-gyms/glasgow-bothwell-street/?utm_source=google&utm_medium=organic&utm_campaign=gmb-listing&utm_content=Glasgow%20Bothwell%20Street',
    latitude: 55.86261,
    longitude: -4.26565,
  },
  {
    name: 'F45 Training Glasgow Central',
    id: 15,
    url: 'http://www.f45training.co.uk/glasgowcentral',
    latitude: 55.86362,
    longitude: -4.2623,
  },
  {
    name: 'Boxfit Glasgow',
    id: 16,
    url: 'https://boxfitglasgow.com/',
    latitude: 55.86246,
    longitude: -4.25261,
  },
  {
    name: 'Beat Theory Fitness',
    id: 17,
    url: 'https://beattheoryfitness.co.uk/glasgow-gym-bootcamp-group-personal-training-group-fitness/',
    latitude: 55.86328,
    longitude: -4.25904,
  },
  {
    name: 'Puregym Glasgow Hope Street',
    id: 18,
    url: 'https://www.puregym.com/gyms/glasgow-hope-street/?utm_source=local&utm_campaign=local_search-glasgow-hope-street-&utm_medium=organic',
    latitude: 55.85875,
    longitude: -4.25982,
  },
  {
    name: 'The Gym Group Glasgow City',
    id: 19,
    url: 'https://www.thegymgroup.com/find-a-gym/glasgow-gyms/glasgow-city/?utm_source=google&utm_medium=organic&utm_campaign=gmb-listing&utm_content=Glasgow%20City',
    latitude: 55.8589,
    longitude: -4.25312,
  },
  {
    name: 'Central Strength Gym Glasgow',
    id: 20,
    url: 'http://centralstrengthgym.com/',
    latitude: 55.85817,
    longitude: -4.26162,
  },
];
