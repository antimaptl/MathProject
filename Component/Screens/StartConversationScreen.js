
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const users = [
  {
    id: '1',
    name: 'Jhon Doe',
    avatar: require('../Screens/Image/avater.png'), // replace with your local image
  },
  {
    id: '2',
    name: 'Jhon Doe',
    avatar: require('../Screens/Image/avater.png'), // replace with your local image
  },
];

const StartConversationScreen = () => {  
    const navigation = useNavigation();
  const renderItem = ({ item }) => (
    <View style={styles.userRow}>
      <View style={styles.userInfo}>
        <Image source={item.avatar} style={styles.avatar} />
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <TouchableOpacity 
      onPress={()=>{
        navigation.navigate('LastScreen')
      }}
      style={styles.addButton}>
        <Text style={styles.addText}>Add</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        placeholderTextColor="#A1A1AA"
      />
      <Text style={styles.label}>Start a conversation</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1120', // dark navy
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  searchInput: {
    backgroundColor: '#1E293B',
    borderRadius: 8,
    paddingHorizontal: 12,
    color: '#fff',
    height: 40,
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 16,
    fontWeight: '600',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  name: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#FB923C',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
});

export default StartConversationScreen;
