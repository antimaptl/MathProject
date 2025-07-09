import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CommingSoon = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back Button with Icon */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back-circle" size={34} color="#fff" />
      </TouchableOpacity>

      {/* Background Image */}
      <Image
        style={styles.fullImage}
        source={require('../Screens/Image/comingsoonpng.jpg')}
      />
    </View>
  );
};

export default CommingSoon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    padding: 5,
  },
});
