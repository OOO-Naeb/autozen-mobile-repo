import React from 'react';
import {View, Text, StyleSheet, TextInput, Alert} from 'react-native';
import Header from '../components/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useCart} from '../screens/CartContext';

const CartScreen = () => {
  const {cartItems, clearCart} = useCart();

  const total = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

  const handlePay = () => {
    Alert.alert('Order Confirmed', 'Your payment has been processed.');
    clearCart();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.containercart}>
        <View style={styles.section}>
          {cartItems.map((item, idx) => (
            <View key={idx} style={styles.serviceCard}>
              <Text style={styles.serviceTitle}>{item.name}</Text>
              <Text style={styles.servicePrice}>{item.price} KZT</Text>
            </View>
          ))}

          <View style={styles.totalCard}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalAmount}>{total} KZT</Text>
          </View>
        </View>

        <View style={styles.paymentCard}>
          <Text style={styles.inputLabel}>Card Number</Text>
          <TextInput style={styles.inputField} keyboardType="numeric" />

          <View style={styles.cardRow}>
            <View style={{flex: 1}}>
              <Text style={styles.inputLabel}>Date</Text>
              <TextInput style={styles.inputField} keyboardType="numeric" />
            </View>
            <View style={{width: 20}} />
            <View style={{flex: 1}}>
              <Text style={styles.inputLabel}>PIN</Text>
              <TextInput
                style={styles.inputField}
                keyboardType="numeric"
                secureTextEntry
              />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.payPill} onPress={handlePay}>
          <Text style={styles.payText}>Pay</Text>
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
  containercart: {
    flex: 1,
    backgroundColor: '#202020',
    paddingHorizontal: 24,
  },
  section: {
    marginTop: 10,
    gap: 12,
  },
  serviceCard: {
    backgroundColor: '#555A5D',
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  servicePrice: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalCard: {
    backgroundColor: '#198800',
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalAmount: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentCard: {
    backgroundColor: '#555A5D',
    borderRadius: 30,
    padding: 20,
    marginTop: 20,
    gap: 12,
  },
  inputLabel: {
    color: '#fff',
    marginBottom: 4,
    fontSize: 13,
  },
  inputField: {
    backgroundColor: '#E1E1E1',
    borderRadius: 10,
    padding: 10,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  payPill: {
    backgroundColor: '#89AFCF',
    borderRadius: 50,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 30,
  },
  payText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
  },
});
export default CartScreen;
