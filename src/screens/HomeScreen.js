import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Header from '../components/Header';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Body from '../../assets/images/Body.svg';
import Elements from '../../assets/images/Elements.svg';
import Wheels from '../../assets/images/Wheels.svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';

const ORDER_BASE_URL = 'http://172.20.10.2:8087';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [carColor, setCarColor] = useState('#D9D9D9');
  const [serviceStatus, setServiceStatus] = useState('in_progress'); // заглушка
  const [daysUntilTO, setDaysUntilTO] = useState(75); // заглушка
  const [userName, setUserName] = useState('User');
  const TO_INTERVAL_MINUTES = 1;

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const userId = await AsyncStorage.getItem('userId');
        if (!token || !userId) return;

        const res = await axios.get(
          `${ORDER_BASE_URL}/api/v1/orders/user/${userId}`,
          {
            headers: {Authorization: `Bearer ${token}`},
          },
        );

        if (res.data.length > 0) {
          setServiceStatus(res.data[0].orderStatus || 'waiting');
        } else {
          setServiceStatus(null); // если нет заказов
        }
      } catch (err) {
        console.error('❌ Failed to fetch order status:', err.message);
        setServiceStatus(null);
      }
    };

    fetchOrderStatus();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        const savedColor = await AsyncStorage.getItem('carBodyColor');
        const savedTODate = await AsyncStorage.getItem('lastTODate');
        const savedName = await AsyncStorage.getItem('userName');
        if (savedColor) setCarColor(savedColor);
        if (savedName) setUserName(savedName);

        if (savedTODate) {
          const lastDate = new Date(savedTODate);
          const now = new Date();
          const diffMinutes = Math.floor((now - lastDate) / (1000 * 60));
          setDaysUntilTO(Math.max(TO_INTERVAL_MINUTES - diffMinutes, 0));
        }
      };
      loadData();
    }, []),
  );

  const handleResetTO = () => {
    Alert.alert(
      'Reset TO Date',
      'Are you sure you want to reset the TO timer?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Yes',
          onPress: async () => {
            await AsyncStorage.setItem('lastTODate', new Date().toISOString());
            setDaysUntilTO(90);
          },
        },
      ],
    );
  };

  const renderServiceStatus = () => {
    if (!serviceStatus) return 'No Current Service';
    return `Service: ${serviceStatus.replace('_', ' ').toUpperCase()}`;
  };

  const renderTOProgress = () => {
    const progress = (TO_INTERVAL_MINUTES - daysUntilTO) / TO_INTERVAL_MINUTES;
    return (
      <TouchableOpacity onPress={handleResetTO} style={styles.toContainer}>
        <Text style={styles.toText}>Service Recommended Time</Text>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, {flex: progress}]} />
          <View style={{flex: 1 - progress}} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header onProfilePress={() => navigation.navigate('Profile')} />

        <View style={styles.pillContainer}>
          <TouchableOpacity
            style={styles.pill}
            onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.pillText}>{renderServiceStatus()}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <View style={styles.imageBackgroundWrapper}>
            <Text style={styles.welcomeText}>
              Welcome to your page {userName}
            </Text>
            <View style={styles.carSvgWrapper}>
              <Body
                width={420}
                height={180}
                fill={carColor}
                style={{position: 'absolute', top: -150, left: -300}}
              />
              <Elements
                width={380}
                height={180}
                style={{position: 'absolute', top: -150, left: -290}}
              />
              <Wheels
                width={394}
                height={180}
                style={{position: 'absolute', top: -114, left: -294}}
              />
            </View>
            {renderTOProgress()}
          </View>
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
  pillContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  pill: {
    backgroundColor: '#555A5D',
    paddingVertical: 16,
    paddingHorizontal: 115,
    borderRadius: 47,
  },
  pillText: {
    color: '#fff',
    fontSize: 14,
  },
  imageContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  imageBackgroundWrapper: {
    width: 360,
    height: 460,
    borderRadius: 55,
    backgroundColor: '#50575B',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
    position: 'relative',
  },
  welcomeText: {
    position: 'absolute',
    top: 35,
    left: 50,
    fontSize: 35,
    fontWeight: '600',
    color: '#9ECEDB',
  },
  carSvgWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  toText: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 5,
  },
  toContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center', // <-- фикс: центрирование
    width: 260,
    alignItems: 'center',
  },
  progressBarBackground: {
    height: 10, // меньше по высоте
    width: '100%',
    borderRadius: 16,
    backgroundColor: '#ccc',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  progressBarFill: {
    backgroundColor: '#57A6E6',
    height: '100%',
  },
});

export default HomeScreen;
