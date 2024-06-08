import React, {useCallback, useEffect, useState} from "react";
import {ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Header from "../../components/Header.tsx";
import AbstractComponent from "../../components/AbstractComponent.tsx";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/Ionicons";
import {useFocusEffect} from "@react-navigation/native";
//import DeleteTable from "./DeleteTable.tsx";

// Define the type for table items
type TableItem = {
    id: number;
    name: string;
};

const TableScreen = ({navigation}: any) => {
    const [table, setTable] = useState<TableItem[]>([]);
    const [isLoading, setLoading] = useState(true);

    const getAPI = async () => {
        try {
            const response = await fetch('http://192.168.0.105:8888/api/v1/tables');
            const data = await response.json();
            setTable(data.data);
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

    const onDeleteSuccess = () => {
        getAPI(); // Refresh the table list after deletion
    };

    const AddTableClick = () => {
        navigation.navigate('AddTable');
    }

    const ButtonUpdateClick = (item: any) => {
        navigation.navigate('UpdateTable', {item});
    };

    return (
        <View style={styles.container}>
            <Header/>
            <AbstractComponent title={"Danh sách bàn ăn"} textBTN={"Thêm"} onAddPress={AddTableClick}/>
            <ScrollView>
                {isLoading ? (
                    <ActivityIndicator/>
                ) : (
                    <FlatList
                        scrollEnabled={false}
                        data={table}
                        renderItem={({item}: any) => (
                            <View style={styles.item}>
                                <Icons name={"tablet-landscape"} style={styles.ItemImage}/>
                                <Text style={styles.title}>{item.name}</Text>
                                <View style={styles.groupBTN}>
                                    <TouchableOpacity onPress={() => ButtonUpdateClick(item)}>
                                        <Icon name={'update'} style={styles.icon}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <DeleteTable tableId={item.id} onDeleteSuccess={onDeleteSuccess}/>
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
    border: {
        justifyContent: 'center'
    },
    ItemImage: {
        fontSize: 50
    },
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

export default TableScreen;
