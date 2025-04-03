import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Animated,
  PanResponder,
  Alert,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';

const CartScreen = () => {
  const [confirmed, setConfirmed] = useState(false);
  const pan = useRef(new Animated.ValueXY()).current;
  const swipeThreshold = -220; // Увеличенный порог для полного свайпа

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, {dx: pan.x}], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (e, gesture) => {
      if (gesture.dx < swipeThreshold) {
        setConfirmed(true);
        Alert.alert('Order Confirmed', 'Your payment has been processed.');
        Animated.spring(pan, {
          toValue: {x: swipeThreshold, y: 0},
          useNativeDriver: false,
        }).start();
      } else {
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: false,
        }).start();
      }
    },
  });

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.serviceCard}>
        <Text style={styles.serviceTitle}>Oil change</Text>
        <Text style={styles.servicePrice}>7000 KZT</Text>
      </View>

      <View style={styles.serviceCard}>
        <Text style={styles.serviceTitle}>Tire Change</Text>
        <Text style={styles.servicePrice}>7000 KZT</Text>
      </View>

      <View style={styles.totalCard}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalAmount}>14000 KZT</Text>
      </View>

      <View style={styles.cardInputContainer}>
        <Text style={styles.inputLabel}>Card Number</Text>
        <TextInput style={styles.cardInput} keyboardType="numeric" />
        <View style={styles.cardDetailsRow}>
          <View style={styles.cardDetailInputWrapper}>
            <Text style={styles.inputLabel}>Date</Text>
            <TextInput style={styles.cardDetailInput} keyboardType="numeric" />
          </View>
          <View style={styles.cardDetailInputWrapper}>
            <Text style={styles.inputLabel}>PIN</Text>
            <TextInput
              style={styles.cardDetailInput}
              keyboardType="numeric"
              secureTextEntry
            />
          </View>
        </View>
      </View>

      <View style={styles.swipeContainer}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[styles.swipeCircle, {transform: [{translateX: pan.x}]}]}
        />
        <Text style={styles.swipeText}>
          {confirmed ? 'Confirmed' : 'Swipe to Confirm'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
  serviceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#555A5D',
    borderRadius: 50,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  serviceTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  servicePrice: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalCard: {
    backgroundColor: '#298800',
    borderRadius: 50,
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardInputContainer: {
    backgroundColor: '#555A5D',
    borderRadius: 50,
    padding: 20,
    marginBottom: 20,
  },
  inputLabel: {
    color: '#fff',
    marginBottom: 5,
  },
  cardInput: {
    backgroundColor: '#E1E1E1',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  cardDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardDetailInputWrapper: {
    width: '48%',
  },
  cardDetailInput: {
    backgroundColor: '#E1E1E1',
    borderRadius: 10,
    padding: 10,
  },
  swipeContainer: {
    backgroundColor: '#555A5D',
    borderRadius: 50,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relative',
    paddingHorizontal: 10,
  },
  swipeText: {
    color: '#A0A0A0',
    fontSize: 18,
  },
  swipeCircle: {
    position: 'absolute',
    left: 10,
    width: 90, // Размер больше, как граница пилюли
    height: 90, // Делаем больше
    backgroundColor: '#89AFCF',
    borderRadius: 50,
  },
});

export default CartScreen;
