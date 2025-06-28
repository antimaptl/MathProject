import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const RF = (size) => (size * width) / 375;

const slides = [
  {
    id: 1,
    image: require('./Image/Puzzles.png'),
    title: 'Puzzles',
    description:
      'Reference site about Lorem Ipsum, giving information on its origins as well as a random Lipsum generator.',
    buttonText: 'Skip',
  },
  {
    id: 2,
    image: require('./Image/Logich.png'),
    title: 'Logich',
    description:
      'Reference site about Lorem Ipsum, giving information on its origins as well as a random Lipsum generator.',
    buttonText: 'Next',
  },
  {
    id: 3,
    image: require('./Image/TimeLimit_Logo.png'),
    title: 'Time Limit',
    description:
      'Reference site about Lorem Ipsum, giving information on its origins as well as a random Lipsum generator.',
    buttonText: `Let's Play`,
  },
];

const dotColors = ['#FB923C', '#12CFF3', '#F87171'];

const OnBoarding = ({ navigation }) => {
  const swiperRef = useRef(null);
  const [index, setIndex] = useState(0);
  const insets = useSafeAreaInsets();

  // Animation refs
  const blinkAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const flipAnim = useRef(new Animated.Value(0)).current;
  const scaleBrainAnim = useRef(new Animated.Value(1)).current;
  const rotateBrainAnim = useRef(new Animated.Value(0)).current;
  const slideInAnim = useRef(new Animated.Value(-width)).current;

  useFocusEffect(
    React.useCallback(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(blinkAnim, { toValue: 0.3, duration: 500, useNativeDriver: true }),
          Animated.timing(blinkAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        ])
      ).start();

      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 360,
          duration: 2000,
          useNativeDriver: true,
        })
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(flipAnim, { toValue: 180, duration: 1000, useNativeDriver: true }),
          Animated.timing(flipAnim, { toValue: 0, duration: 1000, useNativeDriver: true }),
        ])
      ).start();

      Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(scaleBrainAnim, { toValue: 1.2, duration: 500, useNativeDriver: true }),
            Animated.timing(scaleBrainAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
          ]),
          Animated.timing(rotateBrainAnim, {
            toValue: 360,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, [])
  );

  useEffect(() => {
    slideInAnim.setValue(-width); // reset
    Animated.timing(slideInAnim, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [index]);

  const handleButtonPress = () => {
    if (index < slides.length - 1) {
      swiperRef.current.scrollBy(1);
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Swiper
        ref={swiperRef}
        loop={false}
        showsPagination={true}
        onIndexChanged={(i) => setIndex(i)}
        paginationStyle={styles.paginationContainer}
        dot={<></>}
        activeDot={<></>}
      >
        {slides.map((slide) => (
          <View key={slide.id} style={styles.slide}>
            <Animated.Image
              source={slide.image}
              style={[
                styles.image,
                {
                  opacity: blinkAnim,
                  transform: [
                    ...(slide.id === 1
                      ? [{ rotate: rotateAnim.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] }) }]
                      : []),
                    ...(slide.id === 2
                      ? [{ rotateY: flipAnim.interpolate({ inputRange: [0, 180], outputRange: ['0deg', '180deg'] }) }]
                      : []),
                    ...(slide.id === 3
                      ? [
                          { scale: scaleBrainAnim },
                          {
                            rotate: rotateBrainAnim.interpolate({
                              inputRange: [0, 360],
                              outputRange: ['0deg', '360deg'],
                            }),
                          },
                        ]
                      : []),
                  ],
                },
              ]}
              resizeMode="contain"
            />
            <Text style={styles.title}>{slide.title}</Text>
            <Animated.View style={{ transform: [{ translateX: slideInAnim }] }}>
              <Text style={styles.description}>{slide.description}</Text>
            </Animated.View>
          </View>
        ))}
      </Swiper>

      <View style={styles.paginationContainer}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dotStyle,
              {
                backgroundColor: dotColors[i],
                width: index === i ? RF(25) : RF(4),
              },
            ]}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>{slides[index].buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f162b',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: RF(20),
  },
  image: {
    width: width * 0.4,
    height: height * 0.25,
    marginBottom: RF(0),
    marginTop: RF(25),
  },
  title: {
    fontSize: RF(24),
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: RF(15),
  },
  description: {
    fontSize: RF(14),
    color: '#94A3B8',
    textAlign: 'center',
    paddingHorizontal: RF(40),
    lineHeight: RF(22),
    height: RF(66),
    justifyContent: 'center',
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    width: width * 0.75,
    height: RF(40),
    left: width * 0.15,
    top: height * 0.87,
    backgroundColor: '#FB923C',
    borderRadius: RF(50),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: RF(16),
    fontWeight: 'bold',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: RF(130),
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  dotStyle: {
    width: RF(4),
    height: RF(4),
    borderRadius: RF(3),
    marginHorizontal: RF(2),
  },
  activeDotStyle: {
    width: RF(25),
    height: RF(4),
    borderRadius: RF(3),
    marginRight: RF(2),
  },
});

export default OnBoarding;
