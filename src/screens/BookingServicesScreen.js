// src/screens/BookingServiceScreen.js
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderBack from '../components/HeaderBack';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getSessionsByCompanyId} from '../api/sessionApi';

const BookingServiceScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {selectedService} = route.params;
  const [subServices, setSubServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const companyId =
          selectedService?.companyId || '43f65cec-13c6-44ba-92c1-971202091f44';
        const data = await getSessionsByCompanyId(companyId);

        const mapped = data.map(session => ({
          id: session.id,
          name: session.name,
          price: 'от 7000 KZT',
          description: session.description,
        }));

        setSubServices(mapped);
      } catch (error) {
        console.error('Ошибка загрузки подуслуг:', error);
        setSubServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [selectedService]);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack />
      {loading ? (
        <ActivityIndicator size="large" color="#aaa" style={{marginTop: 50}} />
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          {subServices.map(subService => (
            <TouchableOpacity
              key={subService.id}
              style={styles.item}
              onPress={() =>
                navigation.navigate('BookingTime', {
                  selectedService: {
                    ...selectedService,
                    companyId: selectedService.company?.id,
                  },
                  selectedSubService: subService,
                })
              }>
              <View>
                <Text style={styles.name}>{subService.name}</Text>
                <Text style={styles.price}>{subService.price}</Text>
              </View>
              <Image
                source={require('../../assets/icons/left-chevron.png')}
                style={styles.chevron}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
  },
  list: {
    padding: 20,
    paddingBottom: 120,
  },
  item: {
    backgroundColor: '#555A5D',
    borderRadius: 40,
    paddingVertical: 20,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    color: '#ccc',
    fontSize: 13,
    marginTop: 4,
  },
  chevron: {
    width: 20,
    height: 20,
    transform: [{rotate: '180deg'}],
    tintColor: '#ccc',
  },
});

export default BookingServiceScreen;
