import React, {useEffect, useState} from "react";
import axios from "axios";
import Constants from "expo-constants";
import {
    FlatList,
    Platform,
    SafeAreaView, StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {Card} from "react-native-paper";
import {MaterialIcons} from "@expo/vector-icons";


const EtatStock = ({navigation})=>{
    const [stock,setStock] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    const data = [
        {
            id: "PRD004523",
            produit: {
                id: "PRD004523",
                val: "gouty",
                desce: "biscuit gouty",
                puAchat: 2000.0,
                puVente: 1500.0
            },
            dateDernierInventaire: "2024-10-20",
            quantite: 0.0,
            entree: 110.0,
            sortie: 97.0,
            reste: 13.0,
            puVente: 1500.0,
            idUnite: "STU000007152420",
            idUniteLib: "unite"
        },
        {
            id: "PRD004524",
            produit: {
                id: "PRD004523",
                val: "gouty",
                desce: "biscuit gouty",
                puAchat: 2000.0,
                puVente: 1500.0
            },
            dateDernierInventaire: "2024-10-20",
            quantite: 0.0,
            entree: 110.0,
            sortie: 97.0,
            reste: 13.0,
            puVente: 1500.0,
            idUnite: "STU000007152420",
            idUniteLib: "unite"
        },
        {
            id: "PRD004525",
            produit: {
                id: "PRD004523",
                val: "gouty",
                desce: "biscuit gouty",
                puAchat: 2000.0,
                puVente: 1500.0
            },
            dateDernierInventaire: "2024-10-20",
            quantite: 0.0,
            entree: 110.0,
            sortie: 97.0,
            reste: 13.0,
            puVente: 1500.0,
            idUnite: "STU000007152420",
            idUniteLib: "unite"
        },
    ];

    const apiKey = Constants.expoConfig.extra.API_KEY;
    // useEffect(()=>{
    //     const fetchData = async () => {
    //         setIsLoading(true);
    //         try {
    //             const stockResponse = await axios.get(`${apiKey}api/stocks`);
    //             setStock(stockResponse.data);
    //         }catch (error) {
    //             Alert.alert('Error', 'Failed to fetch stock data');
    //             console.error(error);
    //         }finally {
    //             setIsLoading(false);
    //         }
    //     };
    //     fetchData();
    // },[]);

    // if (isLoading) {
    //     return (
    //         <View style={styles.loadingContainer}>
    //             <ActivityIndicator size="large" color="#0066CC" />
    //             <Text style={styles.loadingText}>Loading sales data...</Text>
    //         </View>
    //     );
    // }

    const renderStockCard = ({item}) => {
        const stockValeur = (item.reste*item.produit.puVente).toFixed(2);
        return(
          <View>
            <Card style={styles.card}>
                <View style={styles.cardHeader}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.designationText}>PRODUIT: {item.produit.val}</Text>
                        <Text style={styles.dateText}>
                            Inventaire :
                            {new Date(item.dateDernierInventaire).toLocaleDateString()}
                        </Text>
                    </View>
                    <View style={styles.headerRight}>
                        <View style={[styles.statusBadge, { backgroundColor: '#4CAF50' }]}>
                            <Text style={styles.statusText}>reste :{item.reste}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.cardContent}>
                    <View style={styles.infoRow}>
                        <View style={styles.infoItem}>
                            <MaterialIcons name="download" size={16} color="#666" />
                            <Text style={styles.infoLabel}>{item.entree}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <MaterialIcons name="upload" size={16} color="#666" />
                            <Text style={styles.infoLabel}>{item.sortie}</Text>
                        </View>
                    </View>

                    <View style={styles.amountContainer}>
                        <View style={styles.amountItem}>
                            <Text style={styles.amountLabel}>PU ACHAT</Text>
                            <Text style={styles.amountValue}>€{item.produit.puAchat.toFixed(2)}</Text>
                        </View>
                        <View style={styles.amountItem}>
                            <Text style={styles.amountLabel}>PU VENTE</Text>
                            <Text style={styles.amountValue}>€{item.produit.puVente.toFixed(2)}</Text>
                        </View>
                        <View style={styles.amountItem}>
                            <Text style={styles.amountLabel}>Valeur</Text>
                            <Text style={[styles.amountValue,
                                {color: stockValeur > 3 ? '#ff6b6b' : '#4CAF50'}]}>
                                €{stockValeur}
                            </Text>
                        </View>
                    </View>
                </View>
            </Card>
          </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Stock Overview</Text>
            <FlatList
                data={data}
                renderItem={renderStockCard}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
            <TouchableOpacity style={styles.retourButton} onPress={() => navigation.navigate("Home")}>
                <Text style={styles.retourButtonText}>Retour</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
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

})

export default EtatStock;
