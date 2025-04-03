import React, {useState, useRef} from 'react';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';

// Разрешаем анимации на Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Список сервисов
const services = [
  {
    title: 'Oil change',
    price: '7000 KZT',
    description:
      'The oil change service includes draining the old oil, replacing the oil filter, and filling the engine with new oil. This helps maintain optimal engine performance and overall functionality.',
  },
  {
    title: 'Refuel (Oil)',
    price: '7000 KZT',
    description:
      'High-quality oils that meet the manufacturer’s specifications for your vehicle are used. This procedure helps prevent wear and enhances engine performance.',
  },
  {
    title: 'Engine Cleaning',
    price: '12000 KZT',
    description:
      'A deep cleaning service to remove carbon deposits and ensure optimal engine performance.',
  },
];

const ServicesScreen = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const isAnimating = useRef(false); // Используем useRef, чтобы избежать конфликтов анимации

  // Функция для открытия/закрытия сервиса
  const toggleExpand = index => {
    if (isAnimating.current) return; // Не даём анимации запускаться повторно

    isAnimating.current = true; // Блокируем последующие клики
    InteractionManager.runAfterInteractions(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

      setTimeout(() => {
        setExpandedIndex(prevIndex => (prevIndex === index ? null : index));
        isAnimating.current = false; // Разблокируем после завершения
      }, 150);
    });
  };

  // Добавление в корзину
  const handleAddToCart = serviceTitle => {
    Alert.alert(
      'Added to cart',
      `You have added "${serviceTitle}" to the cart.`,
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      {/* Список сервисов */}
      <ScrollView contentContainerStyle={styles.servicesContainer}>
        {services.map((service, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <View key={service.title} style={styles.serviceBlock}>
              {/* Заголовок карточки */}
              <TouchableOpacity
                style={[
                  styles.serviceCard,
                  isExpanded && styles.serviceCardExpanded,
                ]}
                onPress={() => toggleExpand(index)}>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.servicePrice}>{service.price}</Text>
              </TouchableOpacity>

              {/* Разворачиваемая часть */}
              {isExpanded && (
                <View style={styles.descriptionContainer}>
                  <Text style={styles.descriptionText}>
                    {service.description}
                  </Text>
                  <TouchableOpacity
                    style={styles.toCartButton}
                    onPress={() => handleAddToCart(service.title)}>
                    <Text style={styles.toCartText}>To cart</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ServicesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
    paddingTop: 50,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  iconContainer: {
    padding: 10,
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    color: '#E1E1E1',
  },
  cityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E1E1E1',
  },

  servicesContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100, // Чтобы контент не накладывался на таб-бар
  },

  serviceBlock: {
    marginBottom: 15,
    overflow: 'hidden', // Анимация высоты
  },

  serviceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#555A5D',
    borderRadius: 45,
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  serviceCardExpanded: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  serviceTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  servicePrice: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  descriptionContainer: {
    backgroundColor: '#555A5D',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 20,
  },
  descriptionText: {
    color: '#ddd',
    fontSize: 14,
    marginBottom: 10,
  },
  toCartButton: {
    backgroundColor: '#298800',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  toCartText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
