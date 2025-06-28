import React from 'react';
import {
  Dimensions,
  PixelRatio,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const scale = (size) => (width / 375) * size;
const scaleFont = (size) => size * PixelRatio.getFontScale();

const menuItems = [
    { icon: 'person-circle-outline', label: 'PROFILE', route: 'ProfileScreen' },
    { icon: 'trophy-outline', label: 'ACHIEVEMENTS', route: 'Leaderboard' },
    { icon: 'time-outline', label: 'HISTORY', route: 'HistoryScreen' },
    { icon: 'bar-chart-outline', label: 'DASHBOARD', route: 'Dashboard' },
    { icon: 'cart-outline', label: 'STORE', route: 'Store' },
    { icon: 'color-palette-outline', label: 'THEME', route: 'ThemeScreen' },
    { icon: 'chatbubble-ellipses-outline', label: 'LANGUAGE', route: 'LanguageScreen' },
];
const Profile = () => {
const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
      <TouchableOpacity onPress={() =>{
        navigation.navigate("Home")
      }}>
        <Ionicons name="arrow-back" size={scale(24)} color="#808080"/>
        </TouchableOpacity>
        <Text style={styles.menuTitle}>Menu</Text>
      </View>
      <ScrollView contentContainerStyle={styles.menuList}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.route)}
          >
            <Ionicons name={item.icon} size={scale(20)} color="#fff" style={styles.icon} />
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingHorizontal: width * 0.06,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.05,
    marginBottom: height * 0.05,
  },
  menuTitle: {
    color: '#fff',
    fontSize: scaleFont(16),
    fontWeight: '600',
    marginLeft: width * 0.30,
    opacity:0.8,
  },
  menuList: {
    flexGrow: 1,
    // marginTop:30
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height * 0.025,
  },
  icon: {
    marginRight: width * 0.04,
  },
  menuText: {
    color: '#fff',
    fontSize: scaleFont(14),
    fontWeight: '500',
    opacity:0.8,
  },
  logoutButton: {
    backgroundColor: '#FB923C',
    paddingVertical: height * 0.015,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: height * 0.09,
  },
  logoutText: {
    color: '#fff',
    fontSize: scaleFont(14),
    fontWeight: 'bold',
  },
});

export default Profile;
