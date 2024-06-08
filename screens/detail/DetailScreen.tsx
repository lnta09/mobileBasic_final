import React, {useEffect, useState} from "react";
import AbstractComponent from "../components/AbstractComponent.tsx";
import { FlatList, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import Waiting from "../components/Waiting.tsx";
import Header from "../components/Header.tsx";


const DetailScreen = ({navigation}: any) => {

    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const getAPI = async () => {
        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772');
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
                <AbstractComponent title="Giới thiệu" onAddPress={handleAddPress} />
                <View >
                    <Image style={styles.image} source={{uri: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg'}}/>
                    <Text style={styles.ingredientTitle}>Thành phần</Text>
                </View>
                {isLoading ? <Waiting/> : (
                    <FlatList
                        horizontal
                        data={products}
                        renderItem={({item}) =>
                            <View style={styles.item} onPress={() => (/*Alert.alert("oke")*/handleAddPress)}>
                                <Image style={styles.ingredient} source={{uri: 'https://www.themealdb.com/images/ingredients/soy sauce.png'}}/>
                                <Text style={styles.title}>{item.strIngredient2}</Text>
                            </View>
                        }/>
                )}
                
                <View>
                    <Text style={styles.constructorTitle}>Công thức</Text>
                </View>
                <View >
                    <Text style={styles.construct}>Preheat oven to 350° F. Spray a 9x13-inch baking pan with non-stick spray.\r\nCombine soy sauce, ½ cup water, brown sugar, ginger and garlic in a small saucepan and cover. Bring to a boil over medium heat.</Text>
                </View>
                
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
        marginBottom: 40,
        marginLeft: 10,
        alignItems: "center",
        borderColor: 'lightyellow',
        borderWidth: 0.5,
        borderRadius: 20
    },

    image: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 450,
        height: 280,
        resizeMode: 'cover',
        marginBottom: 16,
        
    },
    
    title: {
        textAlign: 'center',
        color: 'orangered',
        fontSize: 22,
        
    },
    ingredient:{
        width: 130,
        height: 150,
        resizeMode: 'cover',
        margin: 1,
        borderRadius: 40
    },
    ingredientTitle:{
        textAlign: 'center',
        color: 'lightgreen',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8
    },
    constructorTitle:{
        color: 'pink',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 5
    },
    construct:{
        textAlign: 'center',
        color: 'white',
        fontSize: 21,
    },
});

export default DetailScreen;