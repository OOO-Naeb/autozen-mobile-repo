import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
  Alert,
  InteractionManager,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import {getSessionsByTime} from '../api/sessionApi';
import dayjs from 'dayjs';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ServicesScreen = () => {
  const [services, setServices] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const isAnimating = useRef(false);
  const navigation = useNavigation();

  useEffect(() => {
    const loadServices = async () => {
      try {
        const startDate = dayjs().format('YYYY-MM-DD');
        const endDate = dayjs().add(7, 'day').format('YYYY-MM-DD');
        const companyId = '43f65cec-13c6-44ba-92c1-971202091f44';

        const raw = await getSessionsByTime(startDate, endDate, companyId);
        const mappedServices = raw.map(item => ({
          id: item.id,
          sname: item.name || 'Service',
          title: item.company?.name || 'No Name',
          adress: item.company?.address || 'Unknown',
          description: item.description,
          rating: '4.5',
          price: 'от 7000 KZT',
        }));

        setServices(mappedServices);
      } catch (e) {
        console.error(
          'Ошибка при получении сессий:',
          e?.response?.data || e.message,
        );
        Alert.alert('Ошибка', 'Не удалось загрузить список сервисов');
      }
    };

    loadServices();
  }, []);

  const toggleExpand = index => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        setExpandedIndex(prev => (prev === index ? null : index));
        isAnimating.current = false;
      }, 150);
    });
  };

  const filteredServices =
    selectedFilter === 'All'
      ? services
      : services.filter(s => s.sname === selectedFilter);

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.searchFilterBlock}>
        <View style={styles.searchRow}>
          <View style={styles.searchInput}>
            <Text style={styles.searchPlaceholder}>Search here...</Text>
          </View>
          <TouchableOpacity style={styles.filterIcon}>
            <Image
              source={require('../../assets/icons/filter.png')}
              style={{width: 24, height: 24, tintColor: '#fff'}}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.filterButtons}>
          {['All', 'Tire Replacement', 'Oil Change'].map(filter => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                selectedFilter === filter && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter(filter)}>
              <Text
                style={
                  selectedFilter === filter
                    ? styles.filterTextActive
                    : styles.filterText
                }>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.servicesContainer}
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 120}}>
        {filteredServices.map((service, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <View key={service.id} style={styles.serviceBlock}>
              <TouchableOpacity
                style={[
                  styles.serviceCard,
                  isExpanded && styles.serviceCardExpanded,
                ]}
                onPress={() => toggleExpand(index)}>
                <View>
                  <Text style={styles.serviceType}>{service.sname}</Text>
                  <Text style={styles.stationName}>{service.title}</Text>
                  <Text style={styles.address}>{service.adress}</Text>
                </View>
                <View>
                  <Text style={styles.rating}>⭐ {service.rating}</Text>
                  <Text style={styles.price}>{service.price}</Text>
                </View>
              </TouchableOpacity>

              {isExpanded && (
                <View style={styles.descriptionContainer}>
                  <Text style={styles.descriptionText}>
                    {service.description}
                  </Text>
                  <TouchableOpacity
                    style={styles.toCartButton}
                    onPress={() =>
                      navigation.navigate('ServiceDetail', {service})
                    }>
                    <Text style={styles.toCartText}>Order now</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>

      <LinearGradient
        colors={['#20202000', '#202020']}
        style={styles.bottomFade}
        pointerEvents="none"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#202020'},
  searchFilterBlock: {paddingHorizontal: 20, marginBottom: 10},
  searchRow: {flexDirection: 'row', alignItems: 'center', marginBottom: 10},
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#2D2D2D',
    borderRadius: 20,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  searchPlaceholder: {color: '#aaa', fontSize: 14},
  filterIcon: {
    marginLeft: 10,
    backgroundColor: '#2D2D2D',
    padding: 10,
    borderRadius: 20,
  },
  filterButtons: {flexDirection: 'row', gap: 10},
  filterButton: {paddingVertical: 20, paddingHorizontal: 18, borderRadius: 20},
  filterButtonActive: {backgroundColor: '#A5B0AA'},
  filterText: {color: '#E1E1E1'},
  filterTextActive: {color: '#202020', fontWeight: '600'},
  servicesContainer: {paddingHorizontal: 20, paddingBottom: 240},
  serviceBlock: {marginBottom: 15, overflow: 'hidden'},
  serviceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#555A5D',
    borderRadius: 45,
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  serviceCardExpanded: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  serviceType: {color: '#fff', fontSize: 14},
  stationName: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
  address: {color: '#ccc', fontSize: 12},
  rating: {color: '#fff', fontSize: 14, textAlign: 'right'},
  price: {color: '#fff', fontSize: 14, textAlign: 'right'},
  descriptionContainer: {
    backgroundColor: '#555A5D',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  descriptionText: {color: '#ddd', fontSize: 14, marginBottom: 10},
  toCartButton: {
    backgroundColor: '#298800',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  toCartText: {color: '#fff', fontWeight: '600', fontSize: 14},
  bottomFade: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    height: 150,
    zIndex: 100,
  },
});

export default ServicesScreen;
