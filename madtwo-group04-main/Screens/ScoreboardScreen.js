import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';

export default function ScoreboardScreen({navigation, route}) {
  const scoreboardFiller = generateScoreboardScores();
  const [totalDistance, setTotalDistance] = useState(0);
  const [userScore, setUserScore] = useState(0);

  useEffect(() => {
    if (route.params && route.params.distance) {
      const distance = route.params.distance;
      setTotalDistance(prevDistance => prevDistance + distance);
      setUserScore(totalDistance);
    }
  }, [route.params]);

  scoreboardFiller.push({player: 'You', distance: userScore});
  scoreboardFiller.sort((a, b) => b.distance - a.distance);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SCOREBOARD</Text>
      <View style={styles.scoreboard}>
        <FlatList
          data={scoreboardFiller}
          renderItem={({item}) => (
            <View
              style={[
                styles.scoreItem,
                item.player === 'You' ? styles.userScoreItem : {},
              ]}>
              <Text style={styles.score}>
                {item.player}: {item.distance} km
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.homeButtonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const generateScoreboardScores = () => {
  const entries = [
    {player: 'Jim', distance: 80},
    {player: 'Peter', distance: 75},
    {player: 'Snail', distance: 1},
    {player: 'Rocket', distance: 266},
    {player: 'Bolt', distance: 103},
    {player: 'Jeremy', distance: 42},
    {player: 'Meteor', distance: 311},
    {player: 'Connor', distance: 67},
  ];
  return entries;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 32,
    backgroundColor: '#f0f7fc', // Light background color for contrast
  },
  title: {
    fontSize: 40, // Increased font size
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'fantasy',
    color: 'black',
  },
  scoreboard: {
    width: '90%',
    padding: 20,
    backgroundColor: '#3bb0de',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scoreItem: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  userScoreItem: {
    backgroundColor: '#D3D3D3',
  },
  score: {
    fontSize: 18,
  },

  homeButton: {
    marginTop: 110,
    backgroundColor: '#6495ED',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  homeButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
