import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Alert,
    ActivityIndicator,
    Platform, StatusBar, SafeAreaView
} from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';

const SalesTable = ({navigation}) => {
    const [selectedId, setSelectedId] = useState(null);
    //const [salesData, setSalesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const apiKey = Constants.expoConfig.extra.API_KEY;

    // useEffect(() => {
    //     const fetchSalesData = async () => {
    //         try {
    //             const response = await axios.get(`${apiKey}/api/ventes`);
    //             setSalesData(response.data);
    //         } catch (error) {
    //             Alert.alert('Error', 'Failed to fetch sales data');
    //             console.error(error);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };
    //
    //     fetchSalesData();
    // }, []);
    //
    // if (isLoading) {
    //     return (
    //         <View style={styles.loadingContainer}>
    //             <ActivityIndicator size="large" color="#0066CC" />
    //             <Text style={styles.loadingText}>Loading sales data...</Text>
    //         </View>
    //     );
    // }
    const salesData = [
        {
            id: '1',
            designation: 'Sale 1',
            magasin: 'Store A',
            date: '2024-11-01T10:00:00Z',
            remarque: 'First sale',
            idClient: 'C001',
            nomClient: 'John Doe',
            montantTotal: 150.00,
            montantPaye: 100.00,
            resteAPayer: 50.00,
            avoir: 0.00,
        },
        {
            id: '2',
            designation: 'Sale 1',
            magasin: 'Store A',
            date: '2024-11-01T10:00:00Z',
            remarque: 'First sale',
            idClient: 'C001',
            nomClient: 'John Doe',
            montantTotal: 150.00,
            montantPaye: 100.00,
            resteAPayer: 50.00,
            avoir: 0.00,
        },
        {
            id: '3',
            designation: 'Sale 1',
            magasin: 'Store A',
            date: '2024-11-01T10:00:00Z',
            remarque: 'First sale',
            idClient: 'C001',
            nomClient: 'John Doe',
            montantTotal: 150.00,
            montantPaye: 100.00,
            resteAPayer: 0.00,
            avoir: 0.00,
        },
        {
            id: '4',
            designation: 'Sale 1',
            magasin: 'Store A',
            date: '2024-11-01T10:00:00Z',
            remarque: 'First sale',
            idClient: 'C001',
            nomClient: 'John Doe',
            montantTotal: 150.00,
            montantPaye: 100.00,
            resteAPayer: 0.00,
            avoir: 0.00,
        },
        // ... other sales data
    ];

    const renderSaleCard = ({ item }) => {
        const isSelected = item.id === selectedId;
        const backgroundColor = isSelected ? '#f0f8ff' : '#ffffff';
        const paymentStatus = item.resteAPayer > 0 ? 'Pending' : 'Paid';
        const paymentStatusColor = item.resteAPayer > 0 ? '#ffa500' : '#4CAF50';

        return (
            <TouchableOpacity
                onPress={() => setSelectedId(item.id)}
                activeOpacity={0.7}
            >
                <Card style={[styles.card, { backgroundColor }]}>
                    <View style={styles.cardHeader}>
                        <View style={styles.headerLeft}>
                            <Text style={styles.designationText}>{item.designation}</Text>
                            <Text style={styles.dateText}>
                                {new Date(item.date).toLocaleDateString()}
                            </Text>
                        </View>
                        <View style={styles.headerRight}>
                            <View style={[styles.statusBadge, { backgroundColor: paymentStatusColor }]}>
                                <Text style={styles.statusText}>{paymentStatus}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.cardContent}>
                        <View style={styles.infoRow}>
                            <View style={styles.infoItem}>
                                <MaterialIcons name="store" size={16} color="#666" />
                                <Text style={styles.infoLabel}>{item.magasin}</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <MaterialIcons name="person" size={16} color="#666" />
                                <Text style={styles.infoLabel}>{item.nomClient}</Text>
                            </View>
                        </View>

                        <View style={styles.amountContainer}>
                            <View style={styles.amountItem}>
                                <Text style={styles.amountLabel}>Total</Text>
                                <Text style={styles.amountValue}>€{item.montantTotal.toFixed(2)}</Text>
                            </View>
                            <View style={styles.amountItem}>
                                <Text style={styles.amountLabel}>Paid</Text>
                                <Text style={styles.amountValue}>€{item.montantPaye.toFixed(2)}</Text>
                            </View>
                            <View style={styles.amountItem}>
                                <Text style={styles.amountLabel}>Remaining</Text>
                                <Text style={[styles.amountValue,
                                    {color: item.resteAPayer > 0 ? '#ff6b6b' : '#4CAF50'}]}>
                                    €{item.resteAPayer.toFixed(2)}
                                </Text>
                            </View>
                        </View>

                        {isSelected && (
                            <View style={styles.expandedContent}>
                                <Text style={styles.remarqueText}>{item.remarque}</Text>
                                <View style={styles.additionalInfo}>
                                    <Text style={styles.additionalInfoText}>
                                        Client ID: {item.idClient}
                                    </Text>
                                    {item.avoir > 0 && (
                                        <Text style={styles.additionalInfoText}>
                                            Credit: €{item.avoir.toFixed(2)}
                                        </Text>
                                    )}
                                </View>
                            </View>
                        )}
                    </View>
                </Card>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Sales Overview</Text>
            <FlatList
                data={salesData}
                renderItem={renderSaleCard}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
            <TouchableOpacity style={styles.retourButton} onPress={() => navigation.navigate("Home")}>
                <Text style={styles.retourButtonText}>Retour</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        color: '#666',
    },
    container: {
        marginLeft:10,
        marginRight:10,
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    listContainer: {
        paddingBottom: 16,
    },
    card: {
        marginBottom: 12,
        borderRadius: 12,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    headerLeft: {
        flex: 1,
    },
    headerRight: {
        justifyContent: 'center',
    },
    designationText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    dateText: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    statusText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    cardContent: {
        padding: 16,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoLabel: {
        marginLeft: 8,
        color: '#666',
        fontSize: 14,
    },
    amountContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f8f9fa',
        padding: 12,
        borderRadius: 8,
    },
    amountItem: {
        alignItems: 'center',
    },
    amountLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    amountValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    expandedContent: {
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    remarqueText: {
        fontSize: 14,
        color: '#666',
        fontStyle: 'italic',
    },
    additionalInfo: {
        marginTop: 8,
    },
    additionalInfoText: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
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

export default SalesTable;