import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView,
    Image,
    PixelRatio,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const scaleFont = (size) => size * PixelRatio.getFontScale();

const PlayGame = ({ route }) => {
    const navigation = useNavigation();
    const { gametype } = route.params || {};

    const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
    const [selectedTimer, setSelectedTimer] = useState('30 sec');
    const [selectedSymbol, setSelectedSymbol] = useState('(+), (-), (x) and (/)');

    const renderOption = (label, selected, onPress) => (
        <TouchableOpacity onPress={onPress}>
            {selected ? (
                <LinearGradient colors={["#595CFF", "#87AEE9"]} style={styles.selectedOptionButton}>
                    <Text style={styles.selectedOptionText}>{label}</Text>
                </LinearGradient>
            ) : (
                <View style={styles.optionButton}>
                    <Text style={styles.optionText}>{label}</Text>
                </View>
            )}
        </TouchableOpacity>
    );

    const handlePlayPress = async () => {
        try {
            let timerInSeconds = 30;
            if (selectedTimer === '1 Minute') timerInSeconds = 60;
            else if (selectedTimer === '3 Minute') timerInSeconds = 180;

            let symbolValue = 'sum,difference';
            if (selectedSymbol === '(+), (-), (x) and (/)') {
                symbolValue = 'sum,difference,product,quotient';
            }

            let storedQm = '0';
            if (selectedDifficulty === 'medium') {
                storedQm = '6';
            } else if (selectedDifficulty === 'hard') {
                storedQm = '18';
            }

            await AsyncStorage.setItem('qm', storedQm);

            const params = {
                difficulty: selectedDifficulty,
                symbol: symbolValue,
                qm: parseInt(storedQm),
                timer: timerInSeconds,
            };

            console.log("🚀 Navigating to MathInputScreen with params:", params);
            navigation.navigate(gametype === 'play' ? "MathInputScreen" : "Lobby", params);
        } catch (error) {
            console.error("❌ Error during handlePlayPress:", error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={{ flexDirection: "row", gap: width * 0.025 }}>
            <TouchableOpacity onPress={() => {
                navigation.navigate("CommingSoon")
            }}>
                <Image style={styles.icon} source={require('../Screens/Image/funcation.png')} />
                </TouchableOpacity>
                <TouchableOpacity 
                 onPress={() => {
                navigation.navigate("CommingSoon")
            }}>
                <Image style={styles.icon} source={require('../Screens/Image/profile.png')} />
                </TouchableOpacity>
                <TouchableOpacity 
                 onPress={() => {
                navigation.navigate("CommingSoon")
            }}>
                <Image style={[styles.icon, { marginStart: width * 0.50 }]} source={require('../Screens/Image/Mic.png')} />
                </TouchableOpacity>
                <TouchableOpacity 
                 onPress={() => {
                navigation.navigate("CommingSoon")
            }}>
                <Image style={styles.icon} source={require('../Screens/Image/setting.png')} />
                </TouchableOpacity>
            </View>

            <Text style={styles.heading}>Play Game</Text>

            {/* Difficulty Section */}
            <Text style={styles.sectionTitle}>Select Difficulty</Text>
            <View style={styles.row}>
                {renderOption('Easy', selectedDifficulty === 'easy', () => setSelectedDifficulty('easy'))}
                {renderOption('Medium', selectedDifficulty === 'medium', () => setSelectedDifficulty('medium'))}
                {renderOption('Hard', selectedDifficulty === 'hard', () => setSelectedDifficulty('hard'))}
            </View>

            {/* Timer Section */}
            <Text style={styles.sectionTitle}>Timer</Text>
            <View style={styles.row}>
                {renderOption('30 sec', selectedTimer === '30 sec', () => setSelectedTimer('30 sec'))}
                {renderOption('1 Minute', selectedTimer === '1 Minute', () => setSelectedTimer('1 Minute'))}
                {renderOption('3 Minute', selectedTimer === '3 Minute', () => setSelectedTimer('3 Minute'))}
            </View>

            {/* Symbol Section */}
            <Text style={styles.sectionTitle}>Symbol</Text>
            <View style={styles.row1}>
                {renderOption('(+) and (-)', selectedSymbol === '(+) and (-)', () => setSelectedSymbol('(+) and (-)'))}
                {renderOption('(+), (-), (x) and (/)', selectedSymbol === '(+), (-), (x) and (/)', () => setSelectedSymbol('(+), (-), (x) and (/)'))}
            </View>

            {/* Play Button */}
            <TouchableOpacity style={styles.playButton} onPress={handlePlayPress}>
                <Text style={styles.playButtonText}>Play</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default PlayGame;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#0B1220',
        padding: width * 0.07,
        paddingBottom: height * 0.07,
    },
    heading: {
        fontSize: scaleFont(33),
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: height * 0.04,
        marginTop: height * 0.05,
        fontFamily: "jaro",
    },
    sectionTitle: {
        fontSize: scaleFont(16),
        color: '#fff',
        marginBottom: height * 0.012,
        fontWeight: '600',
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: width * 0.025,
        marginBottom: height * 0.015,
        justifyContent: "space-between",
    },
    row1: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: width * 0.025,
        marginBottom: height * 0.015,
    },
    optionButton: {
        backgroundColor: '#1E293B',
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.052,
        borderRadius: 0,
        marginRight: width * 0.025,
        marginTop: height * 0.01,
    },
    optionText: {
        color: '#ccc',
        fontSize: scaleFont(14),
    },
    selectedOptionButton: {
        paddingVertical: height * 0.014,
        paddingHorizontal: width * 0.040,
        borderRadius: 0,
        marginRight: width * 0.025,
        marginTop: height * 0.01,
    },
    selectedOptionText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: scaleFont(14),
    },
    playButton: {
        marginTop: height * 0.05,
        backgroundColor: '#FB923C',
        paddingVertical: height * 0.015,
        borderRadius: 20,
        width: width * 0.6,
        alignSelf: 'center',
        alignItems: 'center',
    },
    playButtonText: {
        color: '#fff',
        fontSize: scaleFont(16),
        fontWeight: '700',
    },
    icon: {
        width: width * 0.08,
        height: width * 0.08,
        resizeMode: 'contain',
        marginBottom: height * 0.015,
    },
});