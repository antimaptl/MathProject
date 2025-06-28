import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  PixelRatio,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const { width, height } = Dimensions.get('window');
const scaleFont = (size) => size * PixelRatio.getFontScale();

// ✅ Extended NumPad with extra buttons
const numPad = [
  ['7', '8', '9', '-'],
  ['4', '5', '6', '.'],
  ['1', '2', '3', 'na'],
  ['Clear', '0', '⌫', 'skip'],
];

const getMathSymbol = (word) => {
  const symbolMap = {
    Sum: '+',
    Difference: '-',
    Product: '*',
    Quotient: '/',
    Modulus: '%',
    Exponent: '^',
  };
  return symbolMap[word] || word;
};

const MathInputScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { difficulty, digit, symbol, timer, qm } = route.params;

  const [input, setInput] = useState('');
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [minutes, setMinutes] = useState(Math.floor(timer / 60));
  const [seconds, setSeconds] = useState(timer % 60);

  const totalTimeRef = useRef(timer);
  const scoreRef = useRef(0);
  const correctAnswersRef = useRef(0);
  const skippedCountRef = useRef(0);
  const incorrectCountRef = useRef(0);

  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [skippedCount, setSkippedCount] = useState(0);
  const [qmState, setQmState] = useState(parseInt(qm));

  const fetchQuestion = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        setQuestion('Authorization token missing');
        return;
      }

      const queryParams = new URLSearchParams();
      queryParams.append('difficulty', difficulty);
      queryParams.append('symbol', symbol);
      queryParams.append('qm', qmState.toString());
      const url = `http://13.203.67.227:3000/api/question?${queryParams.toString()}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      const q = data?.question;
      const mathSymbol = getMathSymbol(q.symbol);

      setQuestion(`${q.input1} ${mathSymbol} ${q.input2}`);
      setCorrectAnswer(String(q.answer));
    } catch (error) {
      setQuestion('Failed to load question.');
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  useEffect(() => {
    fetchQuestion();
    const interval = setInterval(() => {
      if (!isPaused) {
        totalTimeRef.current -= 1;
        const mins = Math.floor(totalTimeRef.current / 60);
        const secs = totalTimeRef.current % 60;
        setMinutes(mins);
        setSeconds(secs);

        if (totalTimeRef.current <= 0) {
          clearInterval(interval);
          const incorrectCount = incorrectCountRef.current;
          const attempted = correctAnswersRef.current + incorrectCount;
          const correctPercentage =
            attempted > 0
              ? Math.round((correctAnswersRef.current / attempted) * 100)
              : 0;

          navigation.replace('WellDoneScreen', {
            totalScore: scoreRef.current,
            correctCount: correctAnswersRef.current,
            inCorrectCount: incorrectCount,
            skippedQuestions: skippedCountRef.current,
            correctPercentage,
            difficulty,
          });
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handlePress = (value) => {
    if (isPaused || totalTimeRef.current <= 0) return;

    const key = value.toLowerCase();

    if (key === 'clear') {
      setInput('');
    } else if (key === '⌫') {
      setInput((prev) => prev.slice(0, -1));
    } else if (key === 'skip') {
      setSkippedCount((prev) => {
        const updated = prev + 1;
        skippedCountRef.current = updated;
        return updated;
      });
      fetchQuestion();
    } else {
      const newInput = input + value;
      setInput(newInput);

      if (newInput.length >= correctAnswer.length) {
        const isCorrect = newInput === correctAnswer;

        setTimeout(() => {
          if (isCorrect) {
            const updatedScore = scoreRef.current + 2;
            const updatedQm = qmState + 2;
            scoreRef.current = updatedScore;
            setScore(updatedScore);
            correctAnswersRef.current += 1;
            setCorrectAnswers(correctAnswersRef.current);
            setQmState(updatedQm);
          } else {
            const updatedScore = scoreRef.current - 1;

            let updatedQm = qmState;
            if (
              (difficulty === 'easy' && qmState > 0) ||
              (difficulty === 'medium' && qmState > 6) ||
              (difficulty === 'hard' && qmState > 18)
            ) {
              updatedQm = qmState - 1;
            }

            scoreRef.current = updatedScore;
            setScore(updatedScore);
            incorrectCountRef.current += 1;
            setQmState(updatedQm);
          }

          fetchQuestion();
        }, 500);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Icon name="chevron-back" size={scaleFont(18)} color="#000" />
        </TouchableOpacity>

        <View style={styles.timerContainer}>
          <Image source={require('../Screens/Image/Stopwatch.png')} style={styles.timerIcon} />
          <Text style={styles.timerText}>
            {`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
          </Text>
        </View>

        <TouchableOpacity onPress={() => setIsPaused(!isPaused)} style={styles.iconButton1}>
          <Icon name={isPaused ? 'play-skip-forward' : 'pause'} size={scaleFont(16)} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={styles.question}>{loading ? 'Loading...' : question}</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: height * 0.04 }}>
        <View style={styles.answerBox}>
          <Text style={styles.answerText}>{input}</Text>
        </View>
      </View>

      <View style={styles.keypadContainer}>
        {numPad.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.keypadRow}>
            {row.map((item, index) => {
              const isSpecial = item.toLowerCase() === 'clear' || item === '⌫';
              const isSkip = item.toLowerCase() === 'skip';

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handlePress(item)}
                  style={[styles.keyButton, isSpecial ? styles.specialKey : null]}
                >
                  {isSkip ? (
                    // ✅ Skip button with icon
                    <LinearGradient colors={['#FFAD90', '#FF4500']} style={[styles.gradientButton ,{opacity:0.8}]}>
                      <View style={{ alignItems: 'center',flexDirection:"row" }}>
                       <Text style={[styles.keyText, { fontSize: scaleFont(14) }]}>Skip</Text>
                        <MaterialIcons name="skip-next" size={25} color="#fff" />
                      </View>
                    </LinearGradient>
                  ) : !isSpecial ? (
                    <LinearGradient colors={['#595CFF', '#87AEE9']} style={styles.gradientButton}>
                      <Text style={styles.keyText}>{item.toUpperCase()}</Text>
                    </LinearGradient>
                  ) : (
                    <Text style={[styles.keyText, { color: '#fff' }]}>{item}</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>

    </View>
  );
};

export default MathInputScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B1220' },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.02,
    marginBottom: height * 0.05,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
  },
  iconButton: {
    width: width * 0.06,
    height: width * 0.06,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton1: {
    width: width * 0.07,
    height: width * 0.07,
    backgroundColor: '#000',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerContainer: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  timerText: { color: '#fff', fontSize: scaleFont(13), fontWeight: '600', opacity: 0.7 },
  timerIcon: { width: 14, height: 14, tintColor: '#fff' },
  question: {
    fontSize: scaleFont(22),
    color: '#fff',
    textAlign: 'center',
    marginTop: height * 0.05,
    marginBottom: height * 0.02,
    fontWeight: 'bold',
  },
  answerBox: {
    width: width * 0.6,
    height: height * 0.06,
    backgroundColor: '#1E293B',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: "27%"
  },
  answerText: { fontSize: scaleFont(18), color: '#fff', fontWeight: '600' },
  keypadContainer: { width: '100%' },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.02,
    paddingHorizontal: width * 0.05,
  },
  keyButton: {
    width: width * 0.2,
    height: height * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#1C2433',
  },
  specialKey: { backgroundColor: '#1C2433' },
  gradientButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  keyText: { fontSize: scaleFont(18), color: '#fff', fontWeight: '600' },
});
