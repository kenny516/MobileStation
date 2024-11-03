import React, {useEffect, useState} from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Alert,
    View,
    ActivityIndicator,
    Button
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import Constants from 'expo-constants';
import {MaterialIcons} from '@expo/vector-icons';

const CompteurCarbu = ({navigation}) => {
    const [pompistes, setPompistes] = useState([]);
    const [pompes, setPompes] = useState([]);
    const [compteur,setCompteur] = useState('');
    const [quantite, setQuantite] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedPompiste, setSelectedPompiste] = useState('');
    const [selectedPompe, setSelectedPompe] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const apiKey = Constants.expoConfig.extra.API_KEY;

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const pompisteResponse = await axios.get(`${apiKey}api/pompistes`);
                setPompistes(pompisteResponse.data);

                const pompeResponse = await axios.get(`${apiKey}api/pompes`);
                setPompes(pompeResponse.data);
            } catch (error) {
                Alert.alert('Error', 'Failed to fetch pompistes data');
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async () => {
        if (!quantite || !selectedPompiste) {
            Alert.alert('Validation Error', 'Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);
        const formData = {
            fuelCounte:compteur,
            lubrifiantCount: quantite,
            dateHeure: date.toISOString(), // Ensure date is in ISO format
            Idpompiste: selectedPompiste,
            pompe: selectedPompe,
        };
        console.log('Form Data:', formData);

        try {
            const response = await axios.post(`${apiKey}/api/endpoint`, formData);
            if (response.status === 200) {
                Alert.alert(
                    'Success',
                    'Data submitted successfully',
                    [{text: 'OK', onPress: () => navigation.navigate('Home')}]
                );
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

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0066CC"/>
                <Text style={styles.loadingText}>Loading data...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <View style={styles.headerContainer}>
                    <MaterialIcons name="oil-barrel" size={24} color="#0066CC"/>
                    <Text style={styles.title}>Fuel Counter</Text>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Fuel</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={compteur}
                        onChangeText={setCompteur}
                        placeholder="Enter quantity"
                        placeholderTextColor="#666"
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>LUBRIFIANT</Text>
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
                    <Text style={styles.label}>POMPISTE</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedPompiste}
                            style={styles.picker}
                            onValueChange={(itemValue) => setSelectedPompiste(itemValue)}
                        >
                            <Picker.Item label="Select a pompiste" value=""/>
                            {pompistes.map((pompiste) => (
                                <Picker.Item
                                    key={pompiste.reference}
                                    label={pompiste.nom}
                                    value={pompiste.reference}
                                />
                            ))}
                        </Picker>
                    </View>
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
                        <ActivityIndicator color="#FFF"/>
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
        zIndex: 2, // Higher value than other elements
    },
    pickerContainer: {
        position: 'relative',
        zIndex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    picker: {
        height: 50,
        width: '100%',
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

export default CompteurCarbu;
