import React, {useEffect, useState} from "react";
import AbstractComponent from "../components/AbstractComponent.tsx";
import {Alert, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Waiting from "../components/Waiting.tsx";
import AddProductScreen from "../admin/AddProductScreen.tsx";
import Header from "../components/Header.tsx";


const MealOfCateScreen = ({navigation}: any) => {

    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const getAPI = async () => {
        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood');
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
        <ScrollView style={{backgroundColor: 'black'}}>
            <View>
                <Header/>
            </View>
            <View>
                <View >
                    <Text style={styles.categoryTitle}>Sea food {}</Text>
                    <Image style={styles.categoryImage} source={{uri: 'https://www.themealdb.com/images/category/seafood.png'}}/>
                </View>
                <AbstractComponent title="Các món theo danh mục" onAddPress={handleAddPress} />
                {isLoading ? <Waiting/> : (
                    <FlatList
                        data={products}
                        renderItem={({item}) =>
                            <TouchableOpacity style={styles.item} onPress={() => (/*Alert.alert("oke")*/handleAddPress)}>
                                <Image style={styles.image} source={{uri: item.strMealThumb}}/>
                                <Text style={styles.title}>{item.strMeal}</Text>
                            </TouchableOpacity>
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

    categoryImage: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 450,
        height: 280,
        resizeMode: 'cover',
        marginBottom: 12,
        
    },
    
    title: {
        textAlign: 'center',
        color: 'orangered',
        fontSize: 22,
        
    },
    image:{
        width: 340,
        height: 230,
        resizeMode: 'cover',
        margin: 1,
        borderRadius: 40
    },
    categoryTitle:{
        textAlign: 'center',
        color: 'lightgreen',
        fontSize: 25,
        fontWeight: 'bold',
    },
    
});

export default MealOfCateScreen;