import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import FastImage from 'react-native-fast-image';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  PixelRatio,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');
const scale = (size) => (width / 375) * size;
const scaleFont = (size) => size * PixelRatio.getFontScale();

const MathInputScreenSecond = () => {
  const navigation = useNavigation();
  const [input, setInput] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // success image state
  const timer = '1:28';

  const equation = { left: '?', right: 5, result: 45 }; // Example: ? * 5 = 45

  const handlePress = (val) => {
    if (val === 'Clear') {
      setInput('');
    } else if (val === 'Del') {
      setInput((prev) => prev.slice(0, -1));
    } else {
      const newInput = input + val;
      setInput(newInput);

      if (parseInt(newInput) * equation.right === equation.result) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigation.navigate('MathInputScreenThrid');
        }, 2000); // show image for 2 seconds
      }
    }
  };

  const numberPad = ['7', '8', '9', '4', '5', '6', '1', '2', '3', 'Clear', '0', 'Del'];

  return (
    <View style={styles.container}>
      {/* Success Image Popup */}
      {showSuccess && (
        <View style={styles.successOverlay}>
          <FastImage
            source={require('../Screens/Image/tickbuttonunscreen.gif')}
            style={styles.successImage}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      )}

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("GuessTheSignScreen");
          }}
          style={styles.iconButton}>
          <Icon name="chevron-back" size={scaleFont(18)} color="#000" />
        </TouchableOpacity>

        <View style={[styles.timerContainer, isPaused && styles.timerPausedBox]}>
          <Image
            source={require('../Screens/Image/Stopwatch.png')}
            style={styles.timerIcon}
          />
          <Text style={[styles.timerText, isPaused && styles.timerPausedText]}>
            {timer}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.iconButton1}
          onPress={() => setIsPaused(!isPaused)}
        >
          <Icon
            name={isPaused ? 'play-skip-forward' : 'pause'}
            size={scaleFont(16)}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>CORRECT ANSWER</Text>

      {/* Equation */}
      <View style={styles.equationContainer}>
        <View style={styles.questionMarkBox}>
          <Text style={styles.questionText}>{input || '?'}</Text>
        </View>
        <Text style={styles.equationText}>
          {' '}* {equation.right} = {equation.result}
        </Text>
      </View>

      {/* Number Pad */}
      <View style={styles.padContainer}>
        {numberPad.map((item, index) => {
          const isSpecial = item === 'Clear' || item === 'Del';
          return (
            <TouchableOpacity key={index} style={styles.button} onPress={() => handlePress(item)}>
              {isSpecial ? (
                <View style={styles.specialButton}>
                  <Text style={styles.specialText}>
                    {item === 'Del' ? '⌫' : item}
                  </Text>
                </View>
              ) : (
                <LinearGradient
                  colors={['#595CFF', '#87AEE9']}
                  style={styles.gradientButton}
                >
                  <Text style={styles.numberText}>{item}</Text>
                </LinearGradient>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default MathInputScreenSecond;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1220',
  },
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
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  timerText: {
    color: '#fff',
    fontSize: scaleFont(13),
    fontWeight: '600',
    opacity: 0.7,
  },
  timerIcon: {
    width: 14,
    height: 14,
    tintColor: '#fff',
  },
  timerPausedBox: {
    backgroundColor: '#F7931E',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  timerPausedText: {
    color: '#fff',
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    marginBottom: height * 0.03,
    marginTop: height * -0.02,
  },
  equationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.2,
  },
  questionMarkBox: {
    backgroundColor: '#1E293B',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  questionText: {
    color: '#fff',
    fontSize: scaleFont(20),
  },
  equationText: {
    color: '#fff',
    fontSize: scaleFont(20),
    marginLeft: 8,
  },
  padContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: width * 0.05,
  },
  button: {
    width: '28%',
    marginBottom: height * 0.02,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientButton: {
    flex: 1,
    width: '100%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    color: '#fff',
    fontSize: scaleFont(20),
    fontWeight: 'bold',
  },
  specialButton: {
    flex: 1,
    width: '100%',
    backgroundColor: '#1E293B',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  specialText: {
    color: '#fff',
    fontSize: scaleFont(16),
  },

  // 🎉 Success Popup Styles
  successOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
     backgroundColor: 'rgba(22, 21, 21, 0.94)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    
  },
  successImage: {
    width: width * 0.4,
    height: width * 0.4,
  },
});
