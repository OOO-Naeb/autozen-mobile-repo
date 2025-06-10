import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {/* Иконка профиля */}
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Profile')}>
        <Image
          source={require('../../assets/icons/profile.png')}
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* Локация */}
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>Your Location</Text>
        <Text style={styles.cityText}>Almaty, KZ</Text>
      </View>

      {/* Иконка настроек */}
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Settings')}>
        <Image
          source={require('../../assets/icons/setting.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#202020',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  iconContainer: {
    padding: 10,
  },
  icon: {
    width: 26,
    height: 26,
    tintColor: '#fff',
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
});

export default Header;
