import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation(); // Получаем объект навигации

  return (
    <View style={styles.header}>
      {/* Иконка профиля (переход на ProfileScreen) */}
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Profile')}>
        <Icon name="account-circle" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Центральный блок с текстом */}
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>Your Location</Text>
        <Text style={styles.cityText}>Almaty, KZ</Text>
      </View>

      {/* Иконка настроек */}
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Settings')}>
        <Icon name="settings" size={30} color="#fff" />
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
