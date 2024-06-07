import React, { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import AbstractComponent from "../components/AbstractComponent.tsx";
import { useFocusEffect } from "@react-navigation/native";

const CategoryList = ({ data, navigation }: any) => {
    const [category, setCategory] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const getAPI = async () => {
        try {
            const response = await fetch('http://192.168.0.105:8888/api/v1/categorys');
            const data = await response.json();
            setCategory(data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAPI();
    }, []);

    useFocusEffect(
        useCallback(() => {
            setLoading(true);  // Show loading indicator while fetching data
            getAPI();
        }, [])
    );

    const handleAddPress = () => {
        navigation.navigate('AddCategoryScreen');
    };

    return (
        <View>
            <View>
                <AbstractComponent title="Danh mục"/>
            </View>
            <View style={styles.categoryList}>
                <View style={{ alignItems: 'center' }}>
                    {isLoading ? (
                        <ActivityIndicator />
                    ) : (
                        <FlatList
                            horizontal={true}
                            scrollEnabled={true}
                            data={category}
                            contentContainerStyle={styles.flatListContent}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.category}
                                    onPress={() => Alert.alert('Làm mới lại trang theo Category')}
                                >
                                    <Image source={{ uri: item.imageUrl }} style={styles.item} />
                                    <Text style={styles.title}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    )}
                </View>
                {/*{data.roleId === 1 ? (
                    <TouchableOpacity
                        style={styles.category}
                        onPress={handleAddPress}
                    >
                        <Image source={require('../../assets/images/categorys/add.png')} style={styles.item} />
                        <Text style={styles.title}>Thêm</Text>
                    </TouchableOpacity>
                ) : null}*/}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    item: {
        overflow: 'hidden',
        width: 65,
        height: 65,
        padding: 10,
    },
    category: {
        alignItems: 'center',
        marginEnd: 15,
    },
    title: {
        color: 'black',
        fontSize: 20,
        paddingTop: 5,
    },
    categoryList: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    flatListContent: {
        justifyContent: 'center',
        flexGrow: 1,
    },
});

export default CategoryList;
