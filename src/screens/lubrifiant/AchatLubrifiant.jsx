import React, { useEffect, useState } from 'react';
import {
    Text,
    TextInput,
    Button,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Alert,
    TouchableOpacity,
    ActivityIndicator,
    View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';

const AchatCarburant = ({ navigation }) => {
    const [fournisseurs, setFournisseurs] = useState([]);
    const [pompes, setPompes] = useState([]);
    const [quantite, setQuantite] = useState('');
    const [date, setDate] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedFournisseur, setSelectedFournisseur] = useState('');
    const [selectedPompe, setSelectedPompe] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const apiKey = Constants.expoConfig.extra.API_KEY;

    // Fetch fournisseurs and pompes when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Fetch fournisseurs
                const fournisseursResponse = await axios.get(`${apiKey}/fournissuers`);
                setFournisseurs(fournisseursResponse.data);

                // Fetch pompes
                const pompesResponse = await axios.get(`${apiKey}api/pompes`);
                setPompes(pompesResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                Alert.alert('Error', 'Failed to load data. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array to run once on mount

    // Handle form submission
    const handleSubmit = async () => {
        if (!quantite || !selectedFournisseur || !selectedPompe) {
            Alert.alert('Validation Error', 'Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);
        const formData = {
            quantite,
            date: date.toISOString(),
            refFournisseur: selectedFournisseur,
            pompe: selectedPompe,
        };
        console.log('Form Data:', formData);

        try {
            const response = await axios.post(`${apiKey}/achat`, formData);
            if (response.status === 200) {
                Alert.alert('Success', 'Data submitted successfully');
                navigation.navigate('Home');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to submit data. Please try again.');
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios'); // Keep the picker open only on iOS
        setDate(currentDate);
    };

    // Loading state
    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0066CC" />
                <Text style={styles.loadingText}>Loading data...</Text>
            </View>
        );
    }

    // Render the component
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <View style={styles.headerContainer}>
                    <MaterialIcons name="local-gas-station" size={24} color="#0066CC" />
                    <Text style={styles.title}>Achat Carburant</Text>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Quantité</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={quantite}
                        onChangeText={setQuantite}
                        placeholder="Enter quantity"
                        placeholderTextColor="#666"
                    />
                </View>

                <View style={[styles.formGroup, styles.datePickerWrapper]}>
                    <Text style={styles.label}>DATE & TIME</Text>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
                        <Text style={styles.datePickerText}>{date.toLocaleString()}</Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Fournisseur</Text>
                    <Picker
                        selectedValue={selectedFournisseur}
                        style={styles.picker}
                        onValueChange={(itemValue) => setSelectedFournisseur(itemValue)}
                    >
                        <Picker.Item label="Select fournisseur" value="" />
                        {fournisseurs.map((fournisseur) => (
                            <Picker.Item key={fournisseur.id} label={fournisseur.nom} value={fournisseur.id} />
                        ))}
                    </Picker>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Pompe</Text>
                    <Picker
                        selectedValue={selectedPompe}
                        style={styles.picker}
                        onValueChange={(itemValue) => setSelectedPompe(itemValue)}
                    >
                        <Picker.Item label="Select pompe" value="" />
                        {pompes.map((pompe) => (
                            <Picker.Item key={pompe.id} label={pompe.val} value={pompe.id} />
                        ))}
                    </Picker>
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
    // Your styles remain unchanged
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        color: '#666',
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
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 10,
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
    datePickerWrapper: {
        position: 'relative',
        zIndex: 2,
    },
    picker: {
        height: 50,
        width: '100%',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    datePickerButton: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    datePickerText: {
        fontSize: 16,
        color: '#333',
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
        margin: 15,
        backgroundColor: '#2E8B57',
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

export default AchatCarburant;
