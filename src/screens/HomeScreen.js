import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';

const HomeScreen = () => {
  const handleImagePress = () => {
    console.log('Image pressed');
  };

  return (
    <View style={styles.container}>
      {/* Вставляем Header */}
      <Header />

      {/* Три маленькие пилюли */}
      <View style={styles.pillsContainer}>
        <TouchableOpacity style={styles.pill}>
          <Text style={styles.pillText}>Oil Refill</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pill}>
          <Text style={styles.pillText}>Gas Refill</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pill}>
          <Text style={styles.pillText}>Tire Change</Text>
        </TouchableOpacity>
      </View>

      {/* Большой прямоугольник с изображением */}
      <View style={styles.imageContainer}>
        <TouchableOpacity
          onPress={handleImagePress}
          style={styles.imageBackgroundWrapper}>
          <ImageBackground
            source={require('../../assets/images/main.png')}
            style={styles.imageBackground}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
    paddingTop: 50,
  },
  pillsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  pill: {
    backgroundColor: '#555A5D',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 47,
  },
  pillText: {
    color: '#fff',
    fontSize: 14,
  },
  imageContainer: {
    marginTop: 10,
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  imageBackgroundWrapper: {
    width: '100%',
    height: 450,
    borderRadius: 55,
    overflow: 'hidden',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default HomeScreen;
