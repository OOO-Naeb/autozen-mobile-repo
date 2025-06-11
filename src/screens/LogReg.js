import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
  UIManager,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import qs from 'qs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://172.20.10.2:8001';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const LogReg = () => {
  const [isLogin, setIsLogin] = useState(true);
  const heightAnim = useRef(new Animated.Value(250)).current;
  const navigation = useNavigation();

  const [form, setForm] = useState({
    phone_number: '',
    password: '',
    confirm_password: '',
    first_name: '',
    last_name: '',
    middle_name: '',
    email: '',
  });

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: isLogin ? 220 : 540,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [isLogin]);

  const handleChange = (key, value) => {
    setForm(prev => ({...prev, [key]: value}));
  };

  const handleSubmit = async () => {
    if (isLogin) {
      try {
        const data = qs.stringify({
          username: form.phone_number,
          password: form.password,
          grant_type: 'password',
        });

        const response = await axios.post(`${BASE_URL}/login`, data, {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        });

        const accessToken = response.data.access_token;
        console.log(response.data);
        const userId = response.data.user_id;

        await AsyncStorage.setItem('token', accessToken);
        await AsyncStorage.setItem('userId', userId);

        Alert.alert('Login success', 'Welcome!');
        navigation.replace('Tabs');
      } catch (error) {
        const msg =
          error.response?.data?.detail ||
          JSON.stringify(error.response?.data) ||
          'Login failed';
        Alert.alert('Login failed', msg);
      }
    } else {
      if (form.password !== form.confirm_password) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }

      try {
        const payload = {
          first_name: form.first_name,
          last_name: form.last_name,
          middle_name: form.middle_name,
          phone_number: form.phone_number,
          email: form.email,
          password: form.password,
          is_active: true,
        };
        console.log('Register payload:', payload);

        await axios.post(`${BASE_URL}/users/register`, payload);

        Alert.alert('Registration successful', 'Now you can log in!');
        setIsLogin(true);
      } catch (error) {
        const msg =
          error.response?.data?.detail ||
          JSON.stringify(error.response?.data) ||
          'Registration failed';
        Alert.alert('Registration failed', msg);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.switchRow}>
        <TouchableOpacity onPress={() => setIsLogin(true)}>
          <Text style={[styles.switchText, isLogin && styles.activeText]}>
            Login
          </Text>
        </TouchableOpacity>
        <Text style={{color: '#444', fontSize: 28, fontWeight: '600'}}>or</Text>
        <TouchableOpacity onPress={() => setIsLogin(false)}>
          <Text style={[styles.switchText, !isLogin && styles.activeText]}>
            Register
          </Text>
        </TouchableOpacity>
      </View>

      <Animated.View style={[styles.formContainer, {height: heightAnim}]}>
        <View style={styles.formInner}>
          {!isLogin && (
            <>
              <TextInput
                placeholder="First name"
                style={styles.input}
                placeholderTextColor="#bbb"
                value={form.first_name}
                onChangeText={v => handleChange('first_name', v)}
              />
              <TextInput
                placeholder="Last name"
                style={styles.input}
                placeholderTextColor="#bbb"
                value={form.last_name}
                onChangeText={v => handleChange('last_name', v)}
              />
              <TextInput
                placeholder="Middle name"
                style={styles.input}
                placeholderTextColor="#bbb"
                value={form.middle_name}
                onChangeText={v => handleChange('middle_name', v)}
              />
              <TextInput
                placeholder="Phone"
                style={styles.input}
                placeholderTextColor="#bbb"
                value={form.phone_number}
                onChangeText={v => handleChange('phone_number', v)}
              />
              <TextInput
                placeholder="Email"
                style={styles.input}
                placeholderTextColor="#bbb"
                value={form.email}
                onChangeText={v => handleChange('email', v)}
              />
            </>
          )}

          {isLogin && (
            <TextInput
              placeholder="Phone"
              style={styles.input}
              placeholderTextColor="#bbb"
              value={form.phone_number}
              onChangeText={v => handleChange('phone_number', v)}
            />
          )}

          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#bbb"
            value={form.password}
            onChangeText={v => handleChange('password', v)}
          />

          {!isLogin && (
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry
              style={styles.input}
              placeholderTextColor="#bbb"
              value={form.confirm_password}
              onChangeText={v => handleChange('confirm_password', v)}
            />
          )}

          <TouchableOpacity style={styles.confirmBtn} onPress={handleSubmit}>
            <Text style={styles.confirmText}>
              {isLogin ? 'Enter' : 'Register'}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
    paddingTop: 200,
    alignItems: 'center',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 30,
  },
  switchText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#444',
    marginHorizontal: 4,
  },
  activeText: {
    color: '#A5D6D3',
    fontSize: 32,
  },
  formContainer: {
    width: '90%',
    backgroundColor: '#50575B',
    borderRadius: 50,
    overflow: 'hidden',
  },
  formInner: {
    padding: 20,
  },
  input: {
    backgroundColor: '#E1E1E1',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 14,
    fontSize: 16,
    color: '#000',
    marginBottom: 14,
    fontWeight: '600',
  },
  confirmBtn: {
    backgroundColor: 'green',
    borderRadius: 30,
    paddingVertical: 14,
    marginTop: 10,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default LogReg;
