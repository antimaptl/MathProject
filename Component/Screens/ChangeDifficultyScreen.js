// ChangeDifficultyScreen.js
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const ChangeDifficultyScreen = () => {
  const navigation = useNavigation();

  const handleSelect = (difficulty) => {
    navigation.navigate('PlayGame', { selectedDifficulty: difficulty });
  };

  return (
    <ImageBackground
      source={require('../Screens/Image/backGroundImage.png')}
      style={styles.background}
    >
      <View style={styles.modalWrapper}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.title}>Change Difficulty</Text>
          </View>

          {['easy', 'medium', 'hard'].map((level) => (
            <TouchableOpacity
              key={level}
              onPress={() => handleSelect(level)}
              style={styles.buttonWrapper}
            >
              <View style={styles.difficultyBtnWrapper}>
                <LinearGradient colors={['#EFA347', '#FF0F7B']} style={styles.difficultyBtn}>
                  <Text style={styles.difficultyText}>{level.toUpperCase()}</Text>
                </LinearGradient>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.8,
    backgroundColor: 'rgba(17, 16, 16, 0.5)',
    borderRadius: 12,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonWrapper: {
    marginBottom: 12,
  },
  difficultyBtnWrapper: {
    width: '100%',
  },
  difficultyBtn: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  difficultyText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});

export default ChangeDifficultyScreen;
