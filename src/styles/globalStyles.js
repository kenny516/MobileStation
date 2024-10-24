import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa', // Light background color
    },
    text: {
        fontSize: 16,
        color: '#333', // Default text color
        fontFamily: 'Arial', // Use a default font
    },
    button: {
        backgroundColor: '#007bff', // Bootstrap blue
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default globalStyles;
