import 'react-native-gesture-handler';
import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Image, Animated } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 
import { ThemeProvider } from '@react-navigation/native';


// Импорт экранов
import HomeScreen from "./src/screens/HomeScreen";
import MapScreen from "./src/screens/MapScreen";
import ServicesScreen from "./src/screens/ServicesScreen";
import CartScreen from "./src/screens/CartScreen";
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState(state.index);
  const animatedValue = new Animated.Value(selectedIndex);

  const handlePress = (index, routeName) => {
    setSelectedIndex(index);
    Animated.timing(animatedValue, {
      toValue: index,
      duration: 300,
      useNativeDriver: false,
    }).start();
    navigation.navigate(routeName);
  };

  const icons = {
    Main: require("./assets/icons/home.png"),
    Map: require("./assets/icons/map.png"),
    Search: require("./assets/icons/search.png"),
    Cart: require("./assets/icons/cart.png"),
  };

  return (
    <View style={[styles.tabBarContainer, { paddingBottom: useSafeAreaInsets().bottom || 10 }]}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => handlePress(index, route.name)}
              style={[styles.tabButton]}
            >
              <Animated.View
                style={[
                  styles.iconContainer,
                  isFocused ? styles.iconActive : styles.iconInactive,
                ]}
              >
                
                <Image source={icons[route.name]} style={styles.icon} />
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const App = () => {
  return (
    <ThemeProvider>
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{ headerShown: false }}
          >
            <Tab.Screen name="Main" component={HomeScreen} />
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Search" component={ServicesScreen} />
            <Tab.Screen name="Cart" component={CartScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#555A5D",
    borderRadius: 50,
    height: 100,
    width: 370,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  iconInactive: {
    backgroundColor: "#202020",
  },
  iconActive: {
    backgroundColor: "#95BFC6",
    borderRadius: 30,
  },
  icon: {
    width: 35,
    height: 35,
    tintColor: "#fff",
  },
});

export default App;