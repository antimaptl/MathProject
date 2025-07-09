import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  PixelRatio
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');
const scaleFont = (size) => size * PixelRatio.getFontScale();

const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
    {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity> */}
      {/* Top Area with 2x2 icons */}
      <View style={styles.iconGrid}>
        {/* Left Column */}
          
           <View style={styles.iconColumn}>
            <TouchableOpacity onPress={()=>{
              navigation.navigate("CommingSoon")
            }}>  
          <Image
            source={require('../Screens/Image/funcation.png')}
            style={styles.gridIcon}
          />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Profile");
            }}>
            <Image
              source={require('../Screens/Image/profile.png')}
              style={styles.gridIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Right Column */}
        <View style={styles.iconColumn}>
         <TouchableOpacity onPress={()=>{
              navigation.navigate("CommingSoon")
            }}>  
          <Image
            source={require('../Screens/Image/setting.png')}
            style={styles.gridIcon}
          />
           </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
              navigation.navigate("CommingSoon")
            }}>  
          <Image
            source={require('../Screens/Image/Mic.png')}
            style={styles.gridIcon}
          />
          </TouchableOpacity>
        </View>
      </View>

      {/* Center Button */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("PlayGame",{gametype:"play"})
        }}
        style={styles.newButton1} >
        <Image
          source={require('../Screens/Image/pluse.png')}
          style={styles.ticketIcon}
        />
        <Text style={styles.newText}>Play</Text>
      </TouchableOpacity>
       <TouchableOpacity
        onPress={() => {
          navigation.navigate("PlayGame",{gametype:"playOnline"})
        }}
        style={styles.newButton} >
        <Image
          source={require('../Screens/Image/pluse.png')}
          style={styles.ticketIcon}
        />
        <Text style={styles.newText}>Play Online</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
   backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
    // borderRadius: 20,
    // padding: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#0B1220',
    paddingHorizontal: width * 0.04,
    paddingTop: height * 0.04,
  },
  iconGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // top:5
  },
  iconColumn: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: height * 0.12,
  },
  gridIcon: {
    width: width * 0.08,
    height: width * 0.08,
    resizeMode: 'contain',
    marginBottom: height * 0.015,
  },
  newButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#FB923C',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.12,
    marginTop: height * 0.02,
    width: width * 0.70,          // ~292px on standard 375px width screen
    height: height * 0.07,        // ~55px on standard 812px height screen
    borderRadius: width * 0.053,  // ~20px
    justifyContent: "center"

  },
  newButton1: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#FB923C',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.12,
    marginTop: height * 0.3,
    width: width * 0.70,          
    height: height * 0.07,        
    borderRadius: width * 0.053,  
    justifyContent: "center"

  },
  ticketIcon: {
    width: width * 0.07,
    height: width * 0.07,
    resizeMode: 'contain',
    marginRight: width * 0.03,
  },
  newText: {
    fontSize: scaleFont(16),
    color: '#fff',
    fontWeight: '700',

  },
});
