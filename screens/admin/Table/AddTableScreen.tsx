import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";

const AddTableScreen = ({ navigation }: any) => {
    const [tableName, setTableName] = useState("");
    const [errorTableName, setErrorTableName] = useState("");

    const Submit = async () => {
        try {
            if (tableName === '') {
                setErrorTableName("Vui lòng nhập tên bàn");
                return;
            }
            setErrorTableName("");

            const response = await fetch('http://192.168.0.105:8888/api/v1/tables', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: tableName }),
            });

            const responseData = await response.json();

            if (response.status === 200) {
                ToastAndroid.showWithGravity(
                    'Thêm bàn thành công',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
                setTableName("");
            } else {
                ToastAndroid.showWithGravity(
                    responseData.message,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
            }
        } catch (error) {
            ToastAndroid.showWithGravity(
                "Đã xảy ra lỗi khi gửi request",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name={"arrow-back"} style={styles.backIcon} />
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <View style={styles.content}>
                <Text style={styles.title}>Thêm bàn</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Tên bàn:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={'Nhập vào tên bàn'}
                        value={tableName}
                        onChangeText={(value) => setTableName(value)}
                    />
                    <Text style={{ color: 'red' }}>{errorTableName}</Text>
                </View>
                <TouchableOpacity style={styles.btnAdd} onPress={Submit}>
                    <Text style={styles.titleBTN}>Thêm</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 15,
        padding: 10,
        width: '90%',
        alignItems: 'center',
    },
    title: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        marginTop: 10,
        width: '100%',
    },
    label: {
        color: 'black',
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        color: 'black',
        fontSize: 16,
        width: '100%',
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backIcon: {
        fontSize: 25,
        color: '#007BFF',
    },
    backButtonText: {
        fontSize: 16,
        color: '#007BFF',
        marginLeft: 5,
    },
    btnAdd: {
        borderWidth: 1,
        borderRadius: 5,
        width: 100,
        height: 30,
        marginTop: 10,
        backgroundColor: '#1bcdff'
    },
    titleBTN: {
        textAlign: 'center',
        fontSize: 20,
        color: 'black'
    }
});

export default AddTableScreen;
