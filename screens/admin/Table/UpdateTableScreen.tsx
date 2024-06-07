import React, {useState} from "react";
import {SafeAreaView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const UpdateTableScreen = ({route, navigation}: any) => {
    const {item} = route.params;
    const [tableName, setTableName] = useState(item.name);
    const [errorTableName, setErrorTableName] = useState("");

    const Submit = async () => {
        //console.log("Submit function called"); // Log to check if function is called
        try {
            if (tableName === '') {
                setErrorTableName("Vui lòng nhập tên bàn");
                return;
            }
            setErrorTableName("");

            // Create JSON object to send data to the server
            const data = {
                name: tableName,
            };

            // Send PUT request to the specified URL
            const response = await fetch(`http://192.168.0.105:8888/api/v1/tables/${item.id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const responseData = await response.json();

            if (response.status === 200) {
                ToastAndroid.showWithGravity(
                    "Cập nhật thành công",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
                setTableName("");
                navigation.goBack();
            } else {
                ToastAndroid.showWithGravity(
                    responseData.message || "Cập nhật thất bại",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
            }
        } catch (error) {
            //console.error("Error during the update request:", error);
            ToastAndroid.showWithGravity(
                "Đã xảy ra lỗi khi gửi request",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }
    };


    const ButtonBackClick = () => {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={ButtonBackClick}>
                <Icon name={"arrow-back"} style={styles.backIcon}/>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <View style={styles.content}>
                <Text style={styles.title}>Cập nhật tên bàn ăn</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Tên bàn:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={tableName}
                        value={tableName}
                        onChangeText={(value) => setTableName(value)}
                    />
                    <Text style={{color: 'red'}}>{errorTableName}</Text>
                </View>

                <TouchableOpacity style={styles.btnAdd} onPress={Submit}>
                    <Text style={styles.titleBTN}>Cập nhật</Text>
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
    imagePicker: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 200,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
    },
    imagePickerText: {
        color: '#007BFF',
        fontSize: 16,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
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

export default UpdateTableScreen;
