import 'dotenv/config';
import React, {useEffect, useState} from 'react';
import {Text, TextInput, Button, StyleSheet, SafeAreaView, Platform, StatusBar} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from "axios";


const CompteurForm = () => {
    const [pompistes, setPompistes] = useState([]);
    const [pompes, setPompes] = useState([]);
    const [quantite, setQuantite] = useState('');
    const [date, setDate] = useState('');
    const [selectedPompiste, setSelectedPompiste] = useState('');
    const [selectedPompe, setSelectedPompe] = useState('');

    useEffect(() => {
        // Fetch pompistes data
        const fetchPompistes = async () => {
            try {
                const response = await axios.get(`${process.env.API_BASE_URL}/client`);
                setPompistes(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        // Fetch pompes data
        const fetchPompes = async () => {
            try {
                const response = await axios.get(`${process.env.API_BASE_URL}/client`);
                setPompes(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPompistes();
        fetchPompes();
    }, []);

    const handleSubmit = () => {
        // Handle form submission
        const formData = {
            compteur: quantite,
            date,
            pompiste: selectedPompiste,
            pompe: selectedPompe,
        };
        console.log(formData); // Replace with your submit logic
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Insertion Compteur Form</Text>

            <Text>Compteur:</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={quantite}
                onChangeText={setQuantite}
                required
            />

            <Text>Date:</Text>
            <TextInput
                style={styles.input}
                value={date}
                onChangeText={setDate}
                placeholder="YYYY-MM-DDTHH:mm"
                required
            />

            <Text>Pompiste:</Text>
            <Picker
                selectedValue={selectedPompiste}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedPompiste(itemValue)}
                required
            >
                {pompistes.map((pompiste) => (
                    <Picker.Item key={pompiste.id} label={pompiste.nom} value={pompiste.id}/>
                ))}
            </Picker>

            <Text>Pompe:</Text>
            <Picker
                selectedValue={selectedPompe}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedPompe(itemValue)}
                required
            >
                {pompes.map((pompe) => (
                    <Picker.Item key={pompe.id} label={pompe.libelle} value={pompe.id}/>
                ))}
            </Picker>

            <Button title="Submit" onPress={handleSubmit}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
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
        width: '100%',
        marginBottom: 20,
    },
});

export default CompteurForm;
