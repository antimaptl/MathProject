import { BackHandler, Image, StyleSheet, Text, View, ToastAndroid, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import More from './More';
import Learn from './Learn';
import Puzzle from './Puzzle';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const { width, height } = Dimensions.get('window');

const BottomTab = () => {
  let lastBackPressTime = 0;

  useEffect(() => {
    const backAction = () => {
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - lastBackPressTime;
      if (timeDifference < 2000) {
        BackHandler.exitApp();
      } else {
        ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
        lastBackPressTime = currentTime;
        return true;
      }
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  const renderIcon = (source, label, focused) => (
    <View style={styles.iconContainer}>
      <Image
        source={source}
        style={[
          styles.icon,
          { tintColor: focused ? '#fff' : '#999' }
        ]}
        resizeMode="contain"
      />
      <Text style={[styles.label, { color: focused ? '#fff' : '#999' }]}>{label}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#0B1220',}}>
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: '#1E293B', borderTopLeftRadius: 20,height:60,paddingTop:9,
          borderTopRightRadius: 20,
          borderTopWidth: 0,},
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) =>
            renderIcon(require('../Screens/Image/Home.png'), 'Home', focused),
        }}
      />
      <Tab.Screen
        name="Puzzle"
        component={Puzzle}
        options={{
          tabBarIcon: ({ focused }) =>
            renderIcon(require('../Screens/Image/PuzzleIcon.png'), 'Puzzle', focused),
        }}
      />
      <Tab.Screen
        name="Learn"
        component={Learn}
        options={{
          tabBarIcon: ({ focused }) =>
            renderIcon(require('../Screens/Image/Learn.png'), 'Learn', focused),
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarIcon: ({ focused }) =>
            renderIcon(require('../Screens/Image/More.png'), 'More', focused),
        }}
      />
    </Tab.Navigator>
    </View>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: width * 0.06,   // smaller icon
    height: height * 0.035,
    marginBottom: 2,
  },
  label: {
    fontSize: 10,
    textAlign: 'center',
  },
});
