import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet,Platform,StatusBar, SafeAreaView} from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.welcomeText}>Welcome to Mobile Station</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('CompteurLubrifiant')}
                >
                    <Text style={styles.buttonText}>Compteur lubrifiant</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('AchatLubrifiant')}
                >
                    <Text style={styles.buttonText}>Achat lubrifiant</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#2E8B57', // Darker green background
        paddingTop:Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff', // White text
        marginBottom: 40,
        textAlign: 'center',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center', // Center buttons horizontally
    },
    button: {
        backgroundColor: '#fff', // White background for buttons
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginVertical: 10,
        width: '80%', // Responsive width
        elevation: 3, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2E8B57', // Dark green text for buttons
        textAlign: 'center',
    },
});

export default HomeScreen;
