import React, {useCallback, useEffect, useState} from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Header from "../../components/Header.tsx";
import AbstractComponent from "../../components/AbstractComponent.tsx";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {useFocusEffect} from "@react-navigation/native";

type CategoryItem = {
    id: number;
    name: string;
    imageUrl: string;
};

const CategoryScreen = ({navigation}: any) => {
    const [category, setCategory] = useState<CategoryItem[]>([]);
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

    const AddCategory = () => {
        navigation.navigate('AddCategory');
    }

    const CategoryDeleteClick = async (id: number) => {
        try {
            const response = await fetch(`http://192.168.0.105:8888/api/v1/categorys/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (response.ok) {
                Alert.alert("Thông báo", data.message);
                // Cập nhật danh sách danh mục sau khi xóa thành công
                const updatedCategories = category.filter(category => category.id !== id);
                setCategory(updatedCategories);
            } else {
                Alert.alert("Thông báo", data.message);
            }
        } catch (error) {
            console.log(error);
            Alert.alert("Thông báo", "Có lỗi xảy ra!");
        }
    };

    const CategoryUpdateClick = (item: any) => {
        navigation.navigate('UpdateCategory', {item});
    };

    return (
        <View style={styles.container}>
            <Header/>
            <AbstractComponent title={"Danh sách thể loại món ăn"} textBTN={"Thêm"} onAddPress={AddCategory}/>
            <ScrollView>
                {isLoading ? (
                    <ActivityIndicator/>
                ) : (
                    <FlatList
                        scrollEnabled={false}
                        data={category}
                        renderItem={({item}: any) => (
                            <View style={styles.item}>
                                <Image source={{uri: item.imageUrl}} style={styles.image}/>
                                <Text style={styles.title}>{item.name}</Text>
                                <View style={styles.groupBTN}>
                                    <TouchableOpacity onPress={() => CategoryUpdateClick(item)}>
                                        <Icon name={'update'} style={styles.icon}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => CategoryDeleteClick(item.id)}>
                                        <Icon name={'delete'} style={styles.icon}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 5
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 2
    },
    image: {
        width: 80,
        height: 80
    },
    groupBTN: {
        flexDirection: 'row',

    },
    icon: {
        fontSize: 40
    },
    title: {
        fontSize: 25,
        color: 'black'
    }

})
export default CategoryScreen;
