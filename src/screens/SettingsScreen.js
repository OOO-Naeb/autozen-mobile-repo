import React, {useState, useEffect} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

const colorMap = {
  White: '#D9D9D9',
  Black: '#1a1a1a',
  Silver: '#B0B0B0',
  Red: '#FF4C4C',
  Yellow: '#FFD700',
  Blue: '#4A90E2',
};

const SettingsScreen = () => {
  const [selectedLang, setSelectedLang] = useState('ENG');
  const [isCarColorOpen, setCarColorOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('White');

  const carColors = ['White', 'Black', 'Silver', 'Red', 'Yellow', 'Blue'];

  useEffect(() => {
    const loadSettings = async () => {
      const savedHex = await AsyncStorage.getItem('carBodyColor');
      const match = Object.keys(colorMap).find(
        key => colorMap[key] === savedHex,
      );
      if (match) setSelectedColor(match);

      const savedLang = await AsyncStorage.getItem('appLanguage');
      if (savedLang) setSelectedLang(savedLang);
    };
    loadSettings();
  }, []);

  const handleColorSelect = async color => {
    await AsyncStorage.setItem('carBodyColor', colorMap[color]);
    setSelectedColor(color);
    setCarColorOpen(false);
  };

  const handleLanguageSelect = async lang => {
    await AsyncStorage.setItem('appLanguage', lang);
    setSelectedLang(lang);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderBack />

      <View style={styles.container}>
        {/* Car Color Dropdown */}
        <TouchableOpacity onPress={() => setCarColorOpen(!isCarColorOpen)}>
          <View style={styles.pill}>
            <View style={styles.rowBetween}>
              <Text>{selectedColor}</Text>
              <Image
                source={require('../../assets/icons/left-chevron.png')}
                style={[
                  styles.icon,
                  {transform: [{rotate: isCarColorOpen ? '90deg' : '-90deg'}]},
                ]}
              />
            </View>
          </View>
        </TouchableOpacity>

        {isCarColorOpen && (
          <View style={styles.dropdownGrid}>
            {carColors.map(color => (
              <TouchableOpacity
                key={color}
                onPress={() => handleColorSelect(color)}
                style={styles.dropdownItem}>
                <Text style={styles.dropdownText}>{color}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Language Switcher */}
        <View style={styles.pill}>
          <View style={{flexDirection: 'row', flex: 1}}>
            {['ENG', 'KAZ', 'RUS'].map(lang => (
              <TouchableOpacity
                key={lang}
                onPress={() => handleLanguageSelect(lang)}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 40,
                  backgroundColor:
                    selectedLang === lang ? '#353535' : '#E0E1DD',
                }}>
                <Text
                  style={{color: selectedLang === lang ? '#AABBC2' : '#000'}}>
                  {lang}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Static Settings Pills */}
        {['Location', 'FAQ', 'Contact Us'].map((item, index) => (
          <TouchableOpacity key={item}>
            <View style={index === 2 ? styles.lastpill : styles.pill}>
              <View style={styles.rowBetween}>
                <Text>{item}</Text>
                <Image
                  source={require('../../assets/icons/left-chevron.png')}
                  style={styles.icon}
                />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#202020',
  },
  container: {
    alignSelf: 'center',
    width: 359,
    backgroundColor: '#50575B',
    borderRadius: 60,
    paddingVertical: 20,
  },
  pill: {
    height: 88,
    width: 325,
    backgroundColor: '#E0E1DD',
    alignSelf: 'center',
    borderRadius: 40,
    marginBottom: 10,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  lastpill: {
    height: 88,
    width: 325,
    backgroundColor: '#E0E1DD',
    alignSelf: 'center',
    borderRadius: 40,
    marginBottom: 0,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#000',
  },
  dropdownItem: {
    width: 90,
    height: 44,
    backgroundColor: '#E0E1DD',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
  },
  dropdownGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  dropdownText: {
    color: '#000',
  },
});

export default SettingsScreen;
