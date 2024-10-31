import React, { useEffect, useState } from 'react';
import { Text, TextInput, Button, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Constants from 'expo-constants';

const CompteurLubrifiant = () => {
    const [pompistes, setPompistes] = useState([]);
    const [quantite, setQuantite] = useState('');
    const [date, setDate] = useState(new Date());
    const [selectedPompiste, setSelectedPompiste] = useState('');

    useEffect(() => {
        // Fetch pompistes data
        const fetchPompistes = async () => {
            try {
                const apiKey = Constants.expoConfig.extra.API_KEY;
                const response = await axios.get(`${apiKey}/client`);
                setPompistes(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPompistes();
    }, []);

    const handleSubmit = () => {
        const formData = {
            compteur: quantite,
            date,
            pompiste: selectedPompiste,
        };
        console.log(formData);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Insertion Compteur Form</Text>

            <Text>LUBRIFIANT:</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={quantite}
                onChangeText={setQuantite}
                required
            />

            <Text>Date:</Text>
            <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                showTimeSelect
                dateFormat="Pp"
                className={styles.input}
            />

            <Text>Pompiste:</Text>
            <Picker
                selectedValue={selectedPompiste}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedPompiste(itemValue)}
                required
            >
                {pompistes.map((pompiste) => (
                    <Picker.Item key={pompiste.id} label={pompiste.nom} value={pompiste.id} />
                ))}
            </Picker>

            <Button title="Submit" onPress={handleSubmit} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
    },
    picker: {
        height: 50,
        width: '25%',
        marginBottom: 20,
    },
});

export default CompteurLubrifiant;
