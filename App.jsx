import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#1111', // Цвет фона
            borderRadius: 50, // Скругление для создания формы пилюли
            height: 100, // Высота панели
            position: 'absolute', // Для абсолютного позиционирования
            bottom: 40, // Отступ снизу
            left: '5%', // Отступ с левого края (для центрального позиционирования)
            right: '5%', // Отступ с правого края
            elevation: 10, // Поднятие панели
            paddingBottom: 60, // Отступ снизу
            width: '10px', // Ограничиваем ширину панели

          },
          tabBarIconStyle: {
            marginBottom: 5, // Отступ для иконок
          },
          tabBarLabelStyle: {
            display: 'none', // Убираем текстовые метки
          },
        }}
      >
        <Tab.Screen 
          name="Main" 
          component={HomeScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={30} />
            ),
          }} 
        />
        <Tab.Screen 
          name="Map" 
          component={HomeScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="map" color={color} size={30} />
            ),
          }} 
        />
        <Tab.Screen 
          name="Search" 
          component={HomeScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="search" color={color} size={30} />
            ),
          }} 
        />
        <Tab.Screen 
          name="Cart" 
          component={HomeScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="cart" color={color} size={30} />
            ),
          }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;