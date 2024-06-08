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
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian');
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
                        <TouchableOpacity style={styles.item} onPress={() => (/*Alert.alert("oke")*/handleAddPress)}>
                            <Image style={styles.image} source={{uri: item.strMealThumb}}/>
                            <Text style={styles.title}>{item.strMeal}</Text>
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
        marginBottom: 40,
        alignItems: "center",
        backgroundColor: '#262626',
        borderRadius: 40
    },

    image: {
        width: 185,
        height: 180,
        resizeMode: 'cover',
        margin: 1,
        borderRadius: 40
    },

    title: {
        textAlign: 'center',
        color: 'orangered',
        fontSize: 22,
        
    },
    row: {
        flex: 1,
        justifyContent: 'space-around'
    }

});

export default ProductList;
