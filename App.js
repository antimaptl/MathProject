import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Component/Screens/Login';
import SignUp from './Component/Screens/SignUp';
import SkipScreen from './Component/Screens/SkipScreen';
import BottomTab from './Component/Screens/BottomTab';
import PlayGame from './Component/Screens/PlayGame';
import Home from './Component/Screens/Home';
import MathInputScreen from './Component/Screens/MathInputScreen';
import GuessTheSignScreen from './Component/Screens/GuessTheSignScreen';
import MathInputScreenSecond from './Component/Screens/MathInputScreenSecond';
import MathInputScreenThrid from './Component/Screens/MathInputScreenThrid';
import WellDoneScreen from './Component/Screens/WellDoneScreen';
import QuitScreen from './Component/Screens/QuitScreen';
import RestartScreen from './Component/Screens/RestartScreen';
import FireworksAnimation from './Component/Screens/FireworksAnimation';
import Profile from './Component/Screens/Profile';
import Leaderboard from './Component/Screens/Leaderboard';
import EndlessLeaderboard from './Component/Screens/EndlessLeaderboard';
import Store from './Component/Screens/Store';
import Dashboard from './Component/Screens/Dashboard';
import EmailVerification from './Component/Screens/EmailVerification';
import OnBoarding from './Component/Screens/OnBoarding';
import Splash from './Component/Screens/Splash';
import GuessTheSign from './Component/Screens/GuessTheSign';
import StartConversationScreen from './Component/Screens/StartConversationScreen';
import ChangeDifficultyScreen from './Component/Screens/ChangeDifficultyScreen';
import LastScreen from './Component/Screens/LastScreen';
import MathPuzzleScreen from './Component/Screens/MathPuzzleScreen';
import DataScreen from './Component/Screens/DataScreen';
import StateData from './Component/Screens/StateData';
import Lobby from './Component/Screens/Lobby';
import MultiPlayerGame from './Component/Screens/MultiPlayerGame';
import { Socket } from './Context/Socket';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
  <Socket>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SkipScreen" component={SkipScreen} />
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen name="PlayGame" component={PlayGame} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MathInputScreen" component={MathInputScreen} />
        <Stack.Screen name="GuessTheSignScreen" component={GuessTheSignScreen} />
        <Stack.Screen name="MathInputScreenSecond" component={MathInputScreenSecond} />
        <Stack.Screen name="MathInputScreenThrid" component={MathInputScreenThrid} />
        <Stack.Screen name="WellDoneScreen" component={WellDoneScreen} />
        <Stack.Screen name="QuitScreen" component={QuitScreen} />
        <Stack.Screen name="RestartScreen" component={RestartScreen} />
        <Stack.Screen name="FireworksAnimation" component={FireworksAnimation} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Leaderboard" component={Leaderboard} />
        <Stack.Screen name="EndlessLeaderboard" component={EndlessLeaderboard} />
        <Stack.Screen name="Store" component={Store} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="EmailVerification" component={EmailVerification} />
        <Stack.Screen name="GuessTheSign" component={GuessTheSign} />
        <Stack.Screen name="StartConversationScreen" component={StartConversationScreen} />
        <Stack.Screen name="ChangeDifficultyScreen" component={ChangeDifficultyScreen} />
        <Stack.Screen name="LastScreen" component={LastScreen} />
        <Stack.Screen name="MathPuzzleScreen" component={MathPuzzleScreen} />
        <Stack.Screen name="DataScreen" component={DataScreen} />
        <Stack.Screen name="StateData" component={StateData} />
         <Stack.Screen name="Lobby" component={Lobby} />
          <Stack.Screen name="MultiPlayerGame" component={MultiPlayerGame} />
           
      </Stack.Navigator>
    </NavigationContainer>
    </Socket>
  )
}
const styles = StyleSheet.create({})

export default App