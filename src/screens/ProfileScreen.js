import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ImageBackground,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URL = 'http://172.20.10.2:8001';
const ORDER_BASE_URL = 'http://172.20.10.2:8087';

const ProfileScreen = () => {
  const [companyNames, setCompanyNames] = useState({});
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [modelNames, setModelNames] = useState({});
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [carForm, setCarForm] = useState({
    model_id: '',
    year_of_production: '',
    vin: '',
    plate_number: '',
    mileage: '',
  });
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCompanyNames = async () => {
      const token = await AsyncStorage.getItem('token');
      const headers = {Authorization: `Bearer ${token}`};

      const names = {};

      for (const order of orders) {
        try {
          const res = await axios.get(
            `http://localhost:8086/api/v1/company/${order.companyId}`,
            {headers},
          );
          names[order.companyId] = res.data.name;
        } catch (err) {
          console.warn('Failed to fetch company name for:', order.companyId);
          names[order.companyId] = 'Unknown';
        }
      }

      setCompanyNames(names);
    };

    if (orders.length > 0) {
      fetchCompanyNames();
    }
  }, [orders]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('token');
        const userId = await AsyncStorage.getItem('userId');
        if (!token || !userId) return;

        const headers = {Authorization: `Bearer ${token}`};

        try {
          const userRes = await axios.get(`${BASE_URL}/users/${userId}`, {
            headers,
          });
          setUser(userRes.data);
        } catch (err) {
          console.error('Failed to fetch user:', err.message);
          setUser(null);
        }

        try {
          const ordersRes = await axios.get(
            `${ORDER_BASE_URL}/api/v1/orders/user/${userId}`,
            {headers},
          );
          setOrders(ordersRes.data);
        } catch (err) {
          setOrders([]);
        }

        try {
          console.log('🧾 userId:', userId);
          console.log(typeof userId, typeof limit, typeof page);
          const carsRes = await axios.get(
            `${BASE_URL}/users/cars/?user_id=${userId}`,
            {
              headers: {Authorization: `Bearer ${token}`},
              params: {
                user_id: userId,
              },
            },
          );
          setCars(carsRes.data);
        } catch (err) {
          console.error('Failed to fetch cars:', err.message);
          setCars([]);
        }

        try {
          const modelsRes = await axios.get(`${BASE_URL}/cars/models`, {
            headers,
          });
          const modelMap = {};
          modelsRes.data.forEach(model => {
            modelMap[model.id] = model.name;
          });
          setModelNames(modelMap);
        } catch (err) {
          console.error('Failed to fetch models:', err.message);
          setModelNames({});
        }
      } catch (outerErr) {
        console.error('Unexpected error in fetchData:', outerErr.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchBrands = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      setBrands([]);
      const res = await axios.get(`${BASE_URL}/cars/brands`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      setBrands(res.data);
    } catch (err) {
      console.error('Failed to fetch brands', err);
    }
  };

  const fetchModelsByBrand = async brandId => {
    try {
      const token = await AsyncStorage.getItem('token');
      setModels([]);
      const res = await axios.get(`${BASE_URL}/cars/models`, {
        headers: {Authorization: `Bearer ${token}`},
        params: {brand_id: brandId},
      });
      setModels(res.data);
    } catch (err) {
      console.error('Failed to fetch models by brand', err);
    }
  };

  const handleAddCar = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');

      const payload = {
        ...carForm,
        //unfortunately this is not final and is for testing
        engine_type: 'gasoline',
        engine_capacity: 1.8,
        transmission_type: 'automatic',
        description: 'User added',
      };

      await axios.post(`${BASE_URL}/users/cars/`, payload, {
        headers: {Authorization: `Bearer ${token}`},
      });

      Alert.alert('Success', 'Car added');
      setModalVisible(false);
      setCarForm({
        model_id: '',
        year_of_production: '',
        vin: '',
        plate_number: '',
        mileage: '',
      });

      const carsRes = await axios.get(
        `${BASE_URL}/users/cars/?user_id=${userId}`,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );

      setCars(carsRes.data);
    } catch (err) {
      Alert.alert('Error', 'Failed to add car');
      console.error(err.response?.data || err.message);
    }
  };

  const handleDeleteCar = async carId => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.delete(`${BASE_URL}/users/cars/${carId}`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      setCars(prev => prev.filter(car => car.id !== carId));
    } catch (err) {
      Alert.alert('Error', 'Failed to delete car');
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageWrapper}>
        <ImageBackground
          source={require('../../assets/images/profile.png')}
          style={styles.backgroundImage}
          resizeMode="cover">
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => {
              if (navigation.canGoBack()) navigation.goBack();
              else navigation.replace('Tabs');
            }}>
            <Image
              source={require('../../assets/icons/left-chevron.png')}
              style={styles.chevron}
            />
          </TouchableOpacity>
          <View style={styles.locationBlock}>
            <Text style={styles.locationLabel}>Your location</Text>
            <Text style={styles.city}>Almaty, KZ</Text>
          </View>
          <Text style={styles.title}>
            {loading ? '...' : user?.first_name || 'Alimkhan'}
          </Text>
        </ImageBackground>
      </View>

      <View style={styles.contentBlock}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.card}>
            <Text style={styles.cardText}>Your cars</Text>
            {cars.length === 0 ? (
              <Text>No cars</Text>
            ) : (
              cars.map(car => (
                <View key={car.id} style={{marginBottom: 10}}>
                  <Text>
                    {modelNames[car.model_id]}, {car.plate_number},{' '}
                    {car.year_of_production}
                  </Text>
                  <TouchableOpacity
                    style={{marginTop: 4}}
                    onPress={() => handleDeleteCar(car.id)}>
                    <Text style={{color: 'red'}}>Delete</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
            <TouchableOpacity
              style={styles.addCarButton}
              onPress={() => {
                setModalVisible(true);
                fetchBrands();
                setModels([]);
                setSelectedBrandId(null);
                setCarForm({
                  model_id: '',
                  year_of_production: '',
                  vin: '',
                  plate_number: '',
                  mileage: '',
                });
              }}>
              <Text style={styles.addCarText}>Add Car</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardText}>Active orders</Text>
            {orders.length === 0 ? (
              <Text>No orders</Text>
            ) : (
              orders.map(order => (
                <View key={order.id} style={styles.ordercontainer}>
                  <Text>
                    Company: {companyNames[order.companyId] || order.companyId}
                  </Text>
                  <Text>Status: {order.orderStatus}</Text>
                  <Text>Payment: {order.paymentType}</Text>
                  <Text>Cost: {order.cost} ₸</Text>
                  <Text>
                    Date: {new Date(order.orderDate).toLocaleDateString()}
                  </Text>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </View>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Car</Text>
            <ScrollView>
              <Text style={styles.label}>Select Brand:</Text>
              {brands.map(brand => (
                <TouchableOpacity
                  key={brand.id}
                  onPress={() => {
                    setSelectedBrandId(brand.id);
                    fetchModelsByBrand(brand.id);
                  }}
                  style={[
                    styles.optionBtn,
                    selectedBrandId === brand.id && styles.optionActive,
                  ]}>
                  <Text>{brand.name}</Text>
                </TouchableOpacity>
              ))}

              {models.length > 0 && (
                <>
                  <Text style={styles.label}>Select Model:</Text>
                  {models.map(model => (
                    <TouchableOpacity
                      key={model.id}
                      onPress={() =>
                        setCarForm({...carForm, model_id: model.id})
                      }
                      style={[
                        styles.optionBtn,
                        carForm.model_id === model.id && styles.optionActive,
                      ]}>
                      <Text>{model.name}</Text>
                    </TouchableOpacity>
                  ))}
                </>
              )}

              <TextInput
                style={styles.input}
                placeholder="Year"
                keyboardType="numeric"
                value={carForm.year_of_production}
                onChangeText={v =>
                  setCarForm({...carForm, year_of_production: v})
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Mileage"
                keyboardType="numeric"
                value={carForm.mileage}
                onChangeText={v => setCarForm({...carForm, mileage: v})}
              />
              <TextInput
                style={styles.input}
                placeholder="VIN (17 chars)"
                value={carForm.vin}
                onChangeText={v => setCarForm({...carForm, vin: v})}
              />
              <TextInput
                style={styles.input}
                placeholder="Plate Number"
                value={carForm.plate_number}
                onChangeText={v => setCarForm({...carForm, plate_number: v})}
              />
            </ScrollView>
            <TouchableOpacity style={styles.saveBtn} onPress={handleAddCar}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#202020'},
  imageWrapper: {height: 300, overflow: 'hidden'},
  backgroundImage: {flex: 1, justifyContent: 'flex-start'},
  backBtn: {
    marginTop: 20,
    marginLeft: 20,
    backgroundColor: '#3A3A3A',
    padding: 10,
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
  },
  chevron: {width: 26, height: 26, tintColor: '#fff'},
  locationBlock: {alignItems: 'center', marginTop: -43},
  locationLabel: {fontSize: 14, color: '#ccc'},
  city: {fontSize: 18, color: '#fff', fontWeight: 'bold'},
  contentBlock: {
    flex: 1,
    backgroundColor: '#50575B',
    borderTopLeftRadius: 60,
    borderRadius: 60,
    padding: 24,
    marginTop: -40,
  },
  scroll: {paddingBottom: 100},
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 140,
    marginLeft: 20,
  },
  ordercontainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#cccfce',
    borderRadius: 20,
  },
  card: {
    backgroundColor: '#E1E1E1',
    borderRadius: 35,
    padding: 24,
    marginBottom: 16,
  },
  cardText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  addCarButton: {
    marginTop: 10,
    backgroundColor: '#298800',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  addCarText: {
    color: '#fff',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 20,
    width: '90%',
    maxHeight: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    marginTop: 10,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
    marginVertical: 8,
  },
  optionBtn: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ddd',
    marginVertical: 4,
  },
  optionActive: {
    backgroundColor: '#A5D6D3',
  },
  saveBtn: {
    backgroundColor: '#298800',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancel: {
    marginTop: 10,
    color: '#666',
    textAlign: 'center',
  },
});

export default ProfileScreen;
