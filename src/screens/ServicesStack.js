import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ServicesScreen from '../screens/ServicesScreen';
import ServiceDetailScreen from '../screens/ServicesDetailScreen';
import BookingServicesScreen from './BookingServicesScreen';
import BookingTimeScreen from './BookingTimeScreen';
import ConfirmBookingScreen from './ConfirmBookingScreen';

const Stack = createNativeStackNavigator();

const ServicesStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ServicesScreen" component={ServicesScreen} />
      <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
      <Stack.Screen name="BookingService" component={BookingServicesScreen} />
      <Stack.Screen name="BookingTime" component={BookingTimeScreen} />
      <Stack.Screen name="ConfirmBooking" component={ConfirmBookingScreen} />
    </Stack.Navigator>
  );
};

export default ServicesStack;
