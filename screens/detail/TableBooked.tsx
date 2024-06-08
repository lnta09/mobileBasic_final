import React, {useEffect, useState} from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Waiting from "../components/Waiting.tsx";
import Header from "../components/Header.tsx";


const TableBooked = ({navigation}: any) => {

    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const getAPI = async () => {
        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
            const data = await response.json();
            setProducts(data.meals);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAPI();
    }, []);

    return (
        <ScrollView style={{backgroundColor: 'black'}}>
            <View>
                <Header/>
            </View>
            <View >
                <Image style={styles.image} source={{uri: 'https://windsoryyc.com/wp-content/uploads/2018/12/Pic3.jpeg'}}/>
            </View>
            <View>
                <View>
                    <Text style={styles.title}>Table booked</Text>
                </View>
                {isLoading ? <Waiting/> : (
                    <FlatList
                        data={products}
                        renderItem={({item}) =>
                            <View style={styles.item} >
                                <Text style={styles.text}>Stage: (1){item.stage}</Text>
                                <Text style={styles.text}>Area: (A or B){item.Area}</Text>
                                <Text style={styles.text}>Type: (8 person){item.stage}</Text>
                                <Text style={styles.text}>Table ID: (12) {item.ID}</Text>
                                <Text style={styles.text}>Serve meal: {item.strMeal}</Text>
                                <View>
                                    <TouchableOpacity style={styles.removeTable}>
                                        <Text style={styles.removeTitle}>Remove table</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }/>
                )}
                
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    item: {
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        alignItems: "center",
        backgroundColor: '#262626',
        borderRadius: 60,
        padding: 10
    },

    image: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 450,
        height: 280,
        resizeMode: 'cover',
        marginBottom: 12,
    },
    
    text: {
        textAlign: 'center',
        color: 'orangered',
        fontSize: 22,
        
    },
    
    title:{
        textAlign: 'center',
        color: 'lightgreen',
        fontSize: 25,
        fontWeight: 'bold',
        margin: 20
    },
    removeTable:{
        height: 60,
        margin: 10,
        width: 180,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    },
    removeTitle:{
        color: 'darkblue',
        fontSize: 24,
        fontWeight: 'bold'
    }
    
});

export default TableBooked;