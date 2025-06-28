import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  PixelRatio,
  Platform,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
const scale = width / 375;
const normalize = (size) => {
  const newSize = size * scale;
  return Platform.OS === 'ios'
    ? Math.round(PixelRatio.roundToNearestPixel(newSize))
    : Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
};

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

const handleLogin = async () => {
  if (email.trim() === '' || password.trim() === '') {
    Alert.alert('Error', 'Please fill in all fields');
    return;
  }

  try {
    const response = await fetch('http://13.203.67.227:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log('Login Response:', data);

    if (response.ok) {
      const { token, player : user } = data;

      if (token && user) {
        await AsyncStorage.setItem('authToken', token);
        await AsyncStorage.setItem('userData', JSON.stringify(user));
          console.log("===================%%%%%%%%%%%%%%%%%%%"+AsyncStorage.getItem("userData") )
        Alert.alert('Success', 'Login successful', [
          { text: 'OK', onPress: () => navigation.navigate('BottomTab') },
        ]);
      } else {
        Alert.alert('Login Failed', 'Token or user data not received');
      }
    } else {
      Alert.alert('Login Failed', data.message || 'Invalid credentials');
    }
  } catch (error) {
    console.log('Login error:', error);
    Alert.alert('Error', 'Something went wrong. Please try again.');
  }
};

  return (
    <LinearGradient colors={['#0f162b', '#0f162b']} style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>

        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={normalize(20)} color="#94A3B8" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your Email"
            placeholderTextColor="#94A3B8"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={normalize(20)} color="#94A3B8" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your Password"
            placeholderTextColor="#94A3B8"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <MaterialIcons
              name={showPassword ? 'visibility' : 'visibility-off'}
              size={normalize(20)}
              color="#94A3B8"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => {

          navigation.navigate("GuessTheSign");
        }}>
          <Text style={styles.forgotPassword}>Recovery Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin
        }>
          <Text style={styles.loginButtonText}>Sign in</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton} onPress={() => Alert.alert('Info', 'Google login coming soon')}>
            <Image
              style={{ width: normalize(35), height: normalize(35) }}
              source={require('../Screens/Image/google.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} onPress={() => Alert.alert('Info', 'Facebook login coming soon')}>
            <Image
              style={{ width: normalize(35), height: normalize(35) }}
              source={require('../Screens/Image/facebook.png')}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
          activeOpacity={0.7}
        >
          <Text style={styles.registerText}>
            Not a member? <Text style={styles.registerLink}>Register now</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: width > 500 ? 500 : width * 0.9,
    padding: normalize(20),
  },
  input: {
  flex: 1,
  height: normalize(43),
  color: 'white',
  fontSize: normalize(16),
  paddingRight: normalize(10),
},
  title: {
    fontSize: normalize(32),
    fontWeight: '600',
    color: 'white',
    marginBottom: normalize(30),
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    marginBottom: normalize(15),
    paddingHorizontal: normalize(15),
  },
  inputIcon: {
    marginRight: normalize(10),
  },
  input: {
    flex: 1,
    height: normalize(43),
    color: 'white',
    fontSize: normalize(16),
  },
  forgotPassword: {
    color: '#94A3B8',
    textAlign: 'right',
    marginBottom: normalize(20),
    fontSize: normalize(14),
  },
  loginButton: {
    backgroundColor: '#FB923C',
    borderRadius: 50,
    height: normalize(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: normalize(20),
  },
  loginButtonText: {
    color: 'white',
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: normalize(20),
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#FFF',
  },
  dividerText: {
    color: '#94A3B8',
    paddingHorizontal: normalize(10),
    fontSize: normalize(14),
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: normalize(10),
  },
  socialButton: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(20),
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: width * 0.02,
  },
  registerText: {
    marginTop: normalize(30),
    color: '#94A3B8',
    textAlign: 'center',
    fontSize: normalize(14),
  },
  registerLink: {
    color: '#ff8c00',
  },
});
