import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import HeaderBack from '../components/HeaderBack';
import {createOrder} from '../api/orderApi';
import {useCart} from '../screens/CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConfirmBookingScreen = ({route, navigation}) => {
  const {selectedService, selectedSubService, selectedTime, selectedTimeObj} =
    route.params || {};
  const {addToCart} = useCart();
  const [statusMessage, setStatusMessage] = useState('');
  const handleConfirm = async () => {
    if (!selectedService || !selectedSubService || !selectedTimeObj) {
      Alert.alert('Ошибка', 'Данные бронирования неполные.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const userId =
        (await AsyncStorage.getItem('userId')) ||
        '99c3191c-1e0e-420c-890b-9bf9f56d08da';

      const orderPayload = {
        companyId:
          selectedService.companyId ||
          selectedService.company?.id ||
          '43f65cec-13c6-44ba-92c1-971202091f44',
        sessionId: selectedSubService.id,
        sessionDateId: selectedTimeObj.id,
        userId: userId,
        cost: 7000,
        paymentType: 'online',
      };

      console.log('📦 ORDER PAYLOAD:', JSON.stringify(orderPayload, null, 2));
      setStatusMessage('📤 Sending order...');

      const response = await createOrder(orderPayload, token);

      console.log('✅ Order response:', response);
      setStatusMessage('✅ Order created');

      addToCart({
        name: selectedSubService.name,
        description: selectedSubService.description,
        price: 7000,
      });

      Alert.alert('Confirmed', 'Your order was successfully created.');
      navigation.navigate('Home');
    } catch (error) {
      console.error('❌ Order failed:', error.response?.data || error.message);
      setStatusMessage(
        `❌ Error: ${error.message || 'Failed to create order'}`,
      );
      Alert.alert('Error', 'Failed to create order.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack />
      <View style={styles.debugBanner}>
        <Text style={styles.debugText}>{statusMessage}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.station}>{selectedService.title}</Text>
        <Text style={styles.subtitle}>{selectedSubService.name}</Text>
        <Text style={styles.description}>{selectedSubService.description}</Text>
        <Text style={styles.rating}>⭐ {selectedService.rating}</Text>
        <View style={styles.row}>
          <View>
            <Text style={styles.address}>{selectedService.adress}</Text>
            <Text style={styles.duration}>Approx. 30 min</Text>
          </View>
          <View style={styles.timeBox}>
            <Text style={styles.time}>{selectedTime}</Text>
          </View>
        </View>
        <TextInput
          placeholder="Enter Promocode"
          placeholderTextColor="#ccc"
          style={styles.input}
        />
        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
          <Text style={styles.confirmText}>Yes, confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
  },
  debugBanner: {
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  debugText: {
    color: '#eee',
    fontSize: 12,
  },
  card: {
    backgroundColor: '#555A5D',
    margin: 20,
    borderRadius: 40,
    padding: 25,
  },
  station: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  rating: {
    color: '#6CFF99',
    fontSize: 16,
    marginTop: 4,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 13,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#eee',
    lineHeight: 20,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  address: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  duration: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 4,
  },
  timeBox: {
    backgroundColor: '#A5D6D3',
    paddingVertical: 16,
    paddingHorizontal: 22,
    borderRadius: 12,
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  input: {
    backgroundColor: '#eee',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 18,
    fontSize: 16,
    color: '#000',
    marginBottom: 20,
  },
  confirmBtn: {
    backgroundColor: '#298800',
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ConfirmBookingScreen;
