import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderBack from '../components/HeaderBack';
import dayjs from 'dayjs';
import {getSessionDatesBySessionId} from '../api/sessionApi';

const generateWeekDates = () => {
  const today = dayjs();
  return Array.from({length: 7}, (_, i) => today.add(i, 'day'));
};

const generateTimeSlots = () => [
  '9:00',
  '9:30',
  '10:00',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
];

const BookingTimeScreen = ({route, navigation}) => {
  const {selectedService, selectedSubService} = route.params || {};
  const sessionId = selectedSubService?.id;
  const weekDates = generateWeekDates();
  const [selectedDate, setSelectedDate] = useState(
    weekDates[0].format('YYYY-MM-DD'),
  );
  const [availableTimes, setAvailableTimes] = useState([]);
  const [debugMessage, setDebugMessage] = useState('');
  const timeSlots = generateTimeSlots();

  useEffect(() => {
    const loadAvailableSlots = async () => {
      if (!sessionId) {
        setDebugMessage('sessionId is undefined');
        return;
      }

      try {
        const raw = await getSessionDatesBySessionId(sessionId);
        setAvailableTimes(raw);
        setDebugMessage(`Loaded slots: ${raw.length}`);
      } catch (e) {
        const msg = e?.response?.data?.message || e.message;
        setDebugMessage(`Error API: ${msg}`);
      }
    };
    loadAvailableSlots();
  }, [sessionId]);

  const handleSelectTime = time => {
    const selectedTimeObj = availableTimes.find(s => {
      const sessionDate = dayjs(s.sessionDate);
      return (
        sessionDate.isSame(selectedDate, 'day') &&
        sessionDate.format('H:mm') === time
      );
    });

    if (!selectedTimeObj) {
      Alert.alert('Error', 'Cannot accept chosen time.');
      return;
    }

    navigation.navigate('ConfirmBooking', {
      selectedService,
      selectedSubService,
      selectedTime: `${selectedDate} ${time}`,
      selectedTimeObj,
    });
  };

  const normalizeTime = t => {
    const [h, m] = t.split(':');
    return `${parseInt(h, 10)}:${m.padStart(2, '0')}`;
  };

  const isTimeAvailable = slot => {
    const normalizedSlot = normalizeTime(slot);

    return availableTimes.some(s => {
      if (!s?.sessionDate) return false;

      const sessionDate = dayjs(s.sessionDate);
      const sessionDay = sessionDate.format('YYYY-MM-DD');
      const sessionTime = normalizeTime(sessionDate.format('H:mm'));

      const match =
        sessionDay === selectedDate &&
        sessionTime === normalizedSlot &&
        s.isAvailable &&
        s.amountOfSessions > 0;

      if (match) {
        console.log('MATCH:', {
          selectedDate,
          slot,
          sessionTime,
          sessionDate: s.sessionDate,
        });
      } else {
        console.log('NO MATCH:', {
          selectedDate,
          slot,
          sessionTime,
          sessionDate: s.sessionDate,
        });
      }

      return match;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack />
      <Text style={styles.monthLabel}>
        {dayjs(selectedDate).format('MMMM YYYY')}
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.datesRow}>
        {weekDates.map(date => {
          const isActive = date.format('YYYY-MM-DD') === selectedDate;
          return (
            <TouchableOpacity
              key={date.format('DD-MM')}
              style={[styles.dateItem, isActive && styles.dateItemActive]}
              onPress={() => setSelectedDate(date.format('YYYY-MM-DD'))}>
              <Text style={[styles.dayLabel, isActive && styles.textActive]}>
                {date.format('ddd')}
              </Text>
              <Text style={[styles.dateLabel, isActive && styles.textActive]}>
                {date.format('D')}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.timeGrid}>
        {timeSlots.map((slot, index) => {
          const available = isTimeAvailable(slot);
          return (
            <View key={slot + index} style={styles.slotWrapper}>
              <TouchableOpacity
                disabled={!available}
                style={[
                  styles.slotButton,
                  {backgroundColor: available ? '#F0F0F0' : '#3A3A3A'},
                ]}
                onPress={() => handleSelectTime(slot)}>
                <Text
                  style={[
                    styles.slotText,
                    {color: available ? '#000' : '#666'},
                  ]}>
                  {slot}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#202020'},
  debugBanner: {
    color: '#fff',
    backgroundColor: '#444',
    padding: 6,
    fontSize: 12,
    textAlign: 'center',
  },
  monthLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 20,
    marginBottom: 10,
  },
  datesRow: {flexDirection: 'row', paddingHorizontal: 20, marginBottom: 10},
  dateItem: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateItemActive: {backgroundColor: '#A5D6D3'},
  dayLabel: {color: '#333', fontSize: 14, fontWeight: '600'},
  dateLabel: {fontSize: 20, fontWeight: '700', color: '#333'},
  textActive: {color: '#202020'},
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingBottom: 100,
    justifyContent: 'space-between',
  },
  slotWrapper: {width: '30%', marginBottom: 16},
  slotButton: {
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  slotText: {fontWeight: '600'},
});

export default BookingTimeScreen;
