import { StyleSheet, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ({ navigation }) {
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
         
          navigation.replace('BottomTab');
        } else {
         
          navigation.replace('OnBoarding');
        }
      } catch (error) {
        console.log('Error checking auth:', error);
        navigation.replace('Login');
      }
    };
    setTimeout(checkAuth, 3000); 
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Image
        source={require('../Screens/Image/logo.png')} // update path if different
        style={styles.gif}
        resizeMode="contain"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f162b', // match your splash background
  },
  gif: {
    width: 300,
    height: 300,
  },
})
