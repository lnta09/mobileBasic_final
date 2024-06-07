import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const Header = () => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>nguyentronghau.vn</Text>
            </View>
            <View>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.image}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row', //nằm cùng 1 hàng
        justifyContent: 'space-between', //canh thuộc tính 2 bên
        alignItems: 'center',
    },

    title: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 20,
        textTransform: 'uppercase',
    },

    image: {
        width: 50, // Width you want
        height: 50, // Height you want
    },
});

export default Header;
