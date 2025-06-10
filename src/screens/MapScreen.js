import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import {SafeAreaView} from 'react-native-safe-area-context';

const MapScreen = () => {
  const handleMapPress = () => {
    console.log('Map pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header />
        <View style={styles.pillsContainer}>
          //these buttons are not working btw
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
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
    marginTop: 30,
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  mapBackgroundWrapper: {
    width: '100%',
    height: 460,
    borderRadius: 55,
    overflow: 'hidden',
  },
  mapBackground: {
    flex: 1,
  },
});

export default MapScreen;
