import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');
const scale = width / 375;
const normalize = (size) => Math.round(scale * size);

export default function SignUp() {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
    if (!userName || !email || !password || !gender || !age || !location) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      const response = await fetch('http://13.203.67.227:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userName,
          email: email,
          password: password,
          country: location,
          dateOfBirth: calculateDOBFromAge(age),
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        Alert.alert('Success', 'Signup successful!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]);
      } else {
        Alert.alert('Signup Failed', data.message || 'Please try again');
      }
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={normalize(20)}
    >
      <LinearGradient colors={['#0f162b', '#0f162b']} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.formContainer}>
            <Text style={styles.title}>Register</Text>

            <InputField icon={require('../Screens/Image/gender.png')} placeholder="Username" value={userName} onChangeText={setUserName} />
            <InputField icon={require('../Screens/Image/face.png')} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />

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

            <InputField icon={require('../Screens/Image/gender.png')} placeholder="Gender" value={gender} onChangeText={setGender} />
            <InputField icon={require('../Screens/Image/Cake.png')} placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" />
            <InputField icon={require('../Screens/Image/location.png')} placeholder="Location" value={location} onChangeText={setLocation} />

            <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
              <Text style={styles.loginButtonText}>Sign up</Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.divider} />
            </View>

            <View style={styles.socialContainer}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => Alert.alert('Coming Soon', 'Google login coming soon')}>
                <Image style={styles.socialIcon} source={require('../Screens/Image/google.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => Alert.alert('Coming Soon', 'Facebook login coming soon')}>
                <Image style={styles.socialIcon} source={require('../Screens/Image/facebook.png')} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.registerText}>
                Already a member? <Text style={styles.registerLink}>Login here</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

// Convert age to YYYY-MM-DD string
const calculateDOBFromAge = (age) => {
  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - parseInt(age);
  return `${birthYear}-01-01`; // Defaulting to Jan 1
};

const InputField = ({ icon, ...props }) => (
  <View style={styles.inputContainer}>
    <Image style={styles.inputIcon} source={icon} />
    <TextInput style={styles.input} placeholderTextColor="#94A3B8" {...props} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: normalize(50),
  },
  formContainer: {
    width: width > 500 ? 500 : width * 0.9,
    alignSelf: 'center',
    padding: normalize(20),
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
    marginBottom: normalize(10),
    paddingHorizontal: normalize(15),
  },
  inputIcon: {
    marginRight: normalize(10),
    height: normalize(20),
    width: normalize(20),
  },
  input: {
    flex: 1,
    height: normalize(40),
    color: 'white',
    fontSize: normalize(16),
  },
  loginButton: {
    backgroundColor: '#FB923C',
    borderRadius: 50,
    height: normalize(45),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: normalize(20),
    marginTop: normalize(20),
  },
  loginButtonText: {
    color: 'white',
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: normalize(10),
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
    marginBottom: normalize(0),
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
  socialIcon: {
    width: normalize(37),
    height: normalize(37),
  },
  registerText: {
    marginTop: normalize(10),
    color: '#94A3B8',
    textAlign: 'center',
    fontSize: normalize(14),
  },
  registerLink: {
    color: '#ff8c00',
    fontSize: normalize(14),
  },
});




// const handleSignUp = async () => {
  //   console.log('🧭 navigation object:', navigation);

  //   if (!userName || !email || !password || !gender || !age || !location) {
  //     Alert.alert('Missing Fields', 'Please fill all fields!');
  //     return;
  //   }

  //   try {
  //     console.log('➡️ Sending OTP to:', email);

  //     const response = await fetch('http://43.204.148.176:8000/api/v1/auth/sendotp', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email }),
  //     });

  //     console.log('📬 Response status:', response.status);

  //     const data = await response.json();
  //     console.log('📨 Response data:', JSON.stringify(data, null, 2));

  //     if (data.success === true) {
  //       console.log('🧾 Full userData going to EmailVerification:', {
  //         userName,
  //         email,
  //         password,
  //         gender,
  //         age,
  //         location,
  //         otpServer: data.otp,
  //       });

  //       Alert.alert(
  //         'Success',
  //         'OTP sent successfully!',
  //         [
  //           {
  //             text: 'OK',
  //             onPress: () => {
  //               console.log('✅ Navigating to EmailVerification...');
  //               navigation.navigate('EmailVerification', {
  //                 userData: {
  //                   userName,
  //                   email,
  //                   password,
  //                   gender,
  //                   age,
  //                   location,
  //                   otpServer: data.otp,
  //                 },
  //               });
  //             },
  //           },
  //         ],
  //         { cancelable: false }
  //       );
  //     }
  //     else {
  //       console.log('⚠️ OTP send failed:', data.message);
  //       Alert.alert('Error', data.message || 'OTP send failed');
  //     }
  //   } catch (error) {
  //     console.log('❌ Error while sending OTP:', error);
  //     Alert.alert('Error', 'Something went wrong!');
  //   }
  // };
