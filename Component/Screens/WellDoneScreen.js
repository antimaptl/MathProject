import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Dimensions,
  PixelRatio, ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ConfettiCannon from 'react-native-confetti-cannon';

const { width, height } = Dimensions.get('window');
const scale = (size) => (width / 375) * size;
const scaleFont = (size) => size * PixelRatio.getFontScale();

const WellDoneScreen = ({ route }) => {
  const navigation = useNavigation();
  const {
    totalScore,
    correctCount,
    inCorrectCount,
    skippedQuestions,
    correctPercentage,
    difficulty,
  } = route.params;

  console.log('+++++++++++++++params', JSON.stringify(route.params, null, 2));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ConfettiCannon count={150} origin={{ x: width / 2, y: 0 }} fadeOut autoStart fallSpeed={4000} />

      <Text style={styles.title}>Well Done</Text>

      <View style={styles.scoreBox}><Text style={styles.label}>Total Score</Text><Text style={styles.value}>{totalScore}</Text></View>
      <View style={styles.scoreBox}><Text style={styles.label}>Correct Count</Text><Text style={styles.value}>{correctCount}</Text></View>
      <View style={styles.scoreBox}><Text style={styles.label}>Incorrect Count</Text><Text style={styles.value}>{inCorrectCount}</Text></View>
      <View style={styles.scoreBox}><Text style={styles.label}>Skipped Questions</Text><Text style={styles.value}>{skippedQuestions}</Text></View>
      <View style={styles.scoreBox}><Text style={styles.label}>Correct Percentage</Text><Text style={styles.value}>{correctPercentage}%</Text></View>

      <TouchableOpacity onPress={() => navigation.navigate("PlayGame", { difficulty })} style={styles.newGameBtn}>
        <Text style={styles.newGameText}>New Game</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.homeBtn}>
        <Text style={styles.homeText}>Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default WellDoneScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0B1220',
    alignItems: 'center',
    paddingVertical: height * 0.08,
  },
  title: {
    fontSize: scaleFont(30),
    color: '#fff',
    fontWeight: '700',
    marginBottom: height * 0.1,
    marginTop: height * 0.1,
  },
  scoreBox: {
    width: '80%',
    backgroundColor: '#1E293B',
    borderRadius: scale(12),
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.015,
  },
  label: {
    color: '#B0BEC5',
    fontSize: scaleFont(14),
    fontWeight: '600',
  },
  value: {
    color: '#fff',
    fontSize: scaleFont(16),
    fontWeight: '700',
  },
  newGameBtn: {
    width: '60%',
    backgroundColor: '#F7931E',
    borderRadius: scale(30),
    paddingVertical: height * 0.012,
    alignItems: 'center',
    marginTop: height * 0.06,
  },
  newGameText: {
    color: '#fff',
    fontSize: scaleFont(16),
    fontWeight: 'bold',
  },
  homeBtn: {
    width: '60%',
    backgroundColor: '#fff',
    borderRadius: scale(30),
    paddingVertical: height * 0.015,
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  homeText: {
    color: '#0B1220',
    fontSize: scaleFont(16),
    fontWeight: 'bold',
  },
});
