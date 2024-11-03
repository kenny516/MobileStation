import React, { useState } from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Alert,
    View,
    ActivityIndicator
} from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';

const SortiePompiste = ({ navigation, route }) => {
    const { refPompiste, IdPompe } = route.params; // Assuming you're passing params through navigation
    const [montant, setMontant] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const apiKey = Constants.expoConfig.extra.API_KEY; // Make sure your API key is set

    const handleSubmit = async () => {
        if (!montant) {
            Alert.alert('Validation Error', 'Please enter a montant value');
            return;
        }

        setIsSubmitting(true);
        const formData = {
            montant,
            refPompiste,
            IdPompe,
        };
        console.log('Form Data:', formData);

        try {
            const response = await axios.post(`${apiKey}/api/sortie`, formData);
            if (response.status === 200) {
                Alert.alert('Success', 'Montant submitted successfully', [
                    { text: 'OK', onPress: () => navigation.navigate('Home') }
                ]);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to submit montant. Please try again.');
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Sortie Pompiste</Text>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>MONTANT</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={montant}
                        onChangeText={setMontant}
                        placeholder="Enter montant"
                        placeholderTextColor="#666"
                    />
                </View>

                <TouchableOpacity
                    style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                        <Text style={styles.submitButtonText}>Submit</Text>
                    )}
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.retourButton} onPress={() => navigation.navigate("Home")}>
                <Text style={styles.retourButtonText}>Retour</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: StatusBar.currentHeight,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        margin: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        marginBottom: 8,
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    submitButton: {
        backgroundColor: '#0066CC',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    submitButtonDisabled: {
        backgroundColor: '#999',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    retourButton: {
        backgroundColor: '#0066CC',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    retourButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default SortiePompiste;
