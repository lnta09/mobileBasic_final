import React, {useEffect, useState} from "react";
import AbstractComponent from "../components/AbstractComponent.tsx";
import {Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Waiting from "../components/Waiting.tsx";
import AddProductScreen from "../admin/AddProductScreen.tsx";

const ProductList = ({navigation}: any) => {

    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const getAPI = async () => {
        try {
            const response = await fetch('http://192.168.0.105:8888/api/v1/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAPI();
    }, []);

    const handleAddPress = () => {
        navigation.navigate('AddProductScreen');
    };

    return (
        <View>
            <AbstractComponent title="Món ăn" onAddPress={handleAddPress} />
            {isLoading ? <Waiting/> : (
                <FlatList
                    scrollEnabled={false}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    data={products}
                    renderItem={({item}) =>
                        <TouchableOpacity style={styles.item} onPress={() => (Alert.alert("oke"))}>
                            <Image style={styles.image} source={{uri: item.image}}/>
                            <Text style={styles.title}>{item.name}</Text>
                        </TouchableOpacity>
                    }/>
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    item: {
        marginVertical: 15,
        alignItems: "center",
    },

    image: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
    },

    title: {
        textAlign: 'center',
        color: 'black',
        fontSize: 20,
    },
    row: {
        flex: 1,
        justifyContent: "space-between",
    }

});

export default ProductList;
