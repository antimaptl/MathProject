import { useRoute, useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

const { width } = Dimensions.get('window');
const scale = width / 375;
const normalize = (size) => Math.round(scale * size);

export default function EmailVerification() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);
  const route = useRoute();
  const navigation = useNavigation();
  const { userData } = route.params;

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (key, index) => {
    if (key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const userEnteredOtp = otp.join('');

    console.log('User data from route:', userData);
    console.log('OTP entered:', userEnteredOtp);

    if (
      !userData.userName?.trim() ||
      !userData.email?.trim() ||
      !userData.password?.trim() ||
      !userData.gender?.trim() ||
      !userData.age?.toString().trim() ||
      !userData.location?.trim() ||
      !userEnteredOtp.trim()
    ) {
      Alert.alert('Error', 'Please fill all fields before submitting.');
      return;
    }

    const payload = {
      userName: userData.userName.trim(),
      email: userData.email.trim(),
      password: userData.password.trim(),
      gender: userData.gender.trim(),
      age: Number(userData.age),
      location: userData.location.trim(),
      otp: userEnteredOtp.trim(),
    };

    console.log('📦 Payload being sent:', JSON.stringify(payload, null, 2));

    try {
      const registerResponse = await fetch(
        'http://43.204.148.176:8000/api/v1/auth/register/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      const registerData = await registerResponse.json();
      console.log('Register response data:', registerData);

      if (!registerResponse.ok) {
        throw new Error(registerData.message || 'Registration failed');
      }

      Alert.alert('Success', 'Registration successful!');
      navigation.navigate('Login');
    } catch (error) {
      console.log('Registration error:', error);
      Alert.alert('Error', error.message || 'Something went wrong');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Verify Email</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) =>
              handleBackspace(nativeEvent.key, index)
            }
          />
        ))}
      </View>

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOtp}>
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f162b',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: normalize(20),
  },
  title: {
    fontSize: normalize(24),
    color: 'white',
    marginBottom: normalize(60),
    fontWeight: 'bold',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: normalize(30),
    marginTop: normalize(50),
  },
  otpInput: {
    width: normalize(40),
    height: normalize(50),
    borderRadius: normalize(5),
    backgroundColor: '#1e293b',
    textAlign: 'center',
    color: 'white',
    fontSize: normalize(18),
    marginHorizontal: normalize(5),
  },
  verifyButton: {
    backgroundColor: '#FB923C',
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(95),
    borderRadius: normalize(25),
  },
  verifyText: {
    color: 'white',
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
});
