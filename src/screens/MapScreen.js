import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MapView, {Marker} from 'react-native-maps'; // Импорт карты и маркера
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';

const MapScreen = () => {
  const handleMapPress = () => {
    console.log('Map pressed');
  };

  return (
    <View style={styles.container}>
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

      {/* Карта */}
      <View style={styles.mapContainer}>
        <TouchableOpacity
          onPress={handleMapPress}
          style={styles.mapBackgroundWrapper}>
          <MapView
            style={styles.mapBackground}
            initialRegion={{
              latitude: 43.222,
              longitude: 76.8512,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              coordinate={{latitude: 43.222, longitude: 76.8512}}
              title="Almaty"
            />
          </MapView>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
    justifyContent: 'center',
    paddingTop: 50,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  iconContainer: {
    padding: 10,
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    color: '#E1E1E1',
  },
  cityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E1E1E1',
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
  mapContainer: {
    marginTop: 10,
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  mapBackgroundWrapper: {
    width: '100%',
    height: 400,
    borderRadius: 55,
    overflow: 'hidden',
  },
  mapBackground: {
    flex: 1,
  },
});

export default MapScreen;
