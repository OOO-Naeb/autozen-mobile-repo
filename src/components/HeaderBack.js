import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const HeaderBack = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          } else {
            navigation.navigate('Tabs');
          }
        }}>
        <Image
          source={require('../../assets/icons/left-chevron.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>Your Location</Text>
        <Text style={styles.cityText}>Almaty, KZ</Text>
      </View>
      <View style={{width: 30}} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#202020',
  },
  locationContainer: {
    alignItems: 'center',
  },
  locationText: {
    color: '#ccc',
    fontSize: 14,
  },
  cityText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    width: 26,
    height: 26,
    tintColor: '#fff',
  },
});

export default HeaderBack;
