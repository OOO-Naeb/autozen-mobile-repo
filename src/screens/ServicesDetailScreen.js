import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderBack from '../components/HeaderBack';
import {useNavigation} from '@react-navigation/native';

const ServiceDetailScreen = ({route}) => {
  const {service} = route.params;
  const navigation = useNavigation();

  const imageMap = {
    '0076ed3c-2dd2-4ffb-a9af-c0c288d5dbb0': require('../../assets/images/BrakeInspection.jpg'),
    '3bc4a9db-2b90-4935-89cd-7dd065b050c4': require('../../assets/images/TireReplacement.png'),
    '931c7ba6-7cb7-4975-a68e-90b1b22183e0': require('../../assets/images/BatteryCheck.jpg'),
    'dba9a502-6b6d-47f5-a128-93b5b13a7239': require('../../assets/images/EngineCheck.jpg'),
    'f15bbd94-1bfd-4d2d-8529-6c53840bec8e': require('../../assets/images/AirService.jpg'),
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderBack />

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Image
            source={imageMap[service.id]}
            style={styles.image}
            resizeMode="cover"
          />

          <View style={styles.content}>
            <Text style={styles.serviceName}>{service.sname}</Text>
            <Text style={styles.title}>{service.title}</Text>
            <Text style={styles.rating}>⭐ {service.rating}</Text>
            <Text style={styles.price}>{service.price}</Text>
            <Text style={styles.description}>{service.description}</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate('BookingService', {
                  selectedService: {
                    ...service,
                    companyId: service.companyId || service.company?.id,
                  },
                })
              }>
              <Text style={styles.buttonText}>Book now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#202020',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#2D2D2D',
    borderRadius: 30,
    overflow: 'hidden',
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: 220,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#298800',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  serviceName: {
    color: '#fff',
    fontWeight: 'light',
    fontSize: 16,
  },
});

export default ServiceDetailScreen;
