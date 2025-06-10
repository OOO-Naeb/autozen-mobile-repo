import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const CustomTabBar = ({state, navigation}) => {
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
    Main: require('../../assets/icons/home.png'),
    Map: require('../../assets/icons/map.png'),
    Search: require('../../assets/icons/search.png'),
    Cart: require('../../assets/icons/cart.png'),
  };

  const insets = useSafeAreaInsets();

  return (
    <View
      style={[styles.tabBarContainer, {paddingBottom: insets.bottom || 10}]}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => handlePress(index, route.name)}
              style={styles.tabButton}>
              <Animated.View
                style={[
                  styles.iconContainer,
                  isFocused ? styles.iconActive : styles.iconInactive,
                ]}>
                <Image source={icons[route.name]} style={styles.icon} />
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#555A5D',
    borderRadius: 50,
    height: 100,
    width: 370,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 4},
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconInactive: {
    backgroundColor: '#202020',
  },
  iconActive: {
    backgroundColor: '#95BFC6',
    borderRadius: 30,
  },
  icon: {
    width: 35,
    height: 35,
    tintColor: '#fff',
  },
});

export default CustomTabBar;
