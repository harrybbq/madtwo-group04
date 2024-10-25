import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

export default function LoginScreen({navigation}) {
  return (
    <ImageBackground
      source={require('./StrathvaLogo.png')}
      style={styles.container}
      imageStyle={styles.backgroundImage}
      resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text}>Welcome to STRATHVA</Text>
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Your Name:"
          placeholderTextColor="#888"
          name="username"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Start Strathva!</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backgroundImage: {
    opacity: 0.2,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },

  header: {
    marginTop: -200,
    marginBottom: 130,
    alignItems: 'center',
  },
  text: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'fantasy',
    textAlign: 'center',
  },
  inputContainer: {
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  textInput: {
    height: 50,
    width: 300,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    height: 50,
    width: 300,
    backgroundColor: '#6495ED',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
