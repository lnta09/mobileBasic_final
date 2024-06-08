import React, {useCallback} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import Header from "../components/Header.tsx";
import CategoryList from "./CategoryList.tsx";
import ProductList from "./ProductList.tsx";
import {useFocusEffect} from "@react-navigation/native";

const HomeScreen = ({navigation, route}: any) => {
    //const { userData } = route.params;

    return (
        <View style={styles.main}>
            <View>
                <Header/>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <CategoryList /*data={userData}*/ navigation={navigation}/>
                </View>
                <View>
                    <ProductList navigation={navigation}/>
                </View>
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "black",
        paddingHorizontal: 15,

    }
})

export default HomeScreen;
