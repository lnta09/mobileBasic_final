import React, { useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { launchImageLibrary } from "react-native-image-picker";

const UpdateCategoryScreen = ({ route, navigation }: any) => {
    const { item } = route.params;
    const [categoryName, setCategoryName] = useState(item.name);
    const [imageUri, setImageUri] = useState(null);
    const [errorCategoryName, setErrorCategoryName] = useState("");

    const handleImagePicker = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response: any) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const uri = response.assets[0].uri;
                setImageUri(uri);
            }
        });
    };

    const Submit = async () => {
        try {
            if (categoryName === '') {
                setErrorCategoryName("Vui lòng nhập tên loại món ăn");
                return;
            }
            setErrorCategoryName("");

            // Create a FormData object to send data to the server
            const formData = new FormData();
            formData.append('name', categoryName);
            if (imageUri) {
                // Convert the image path to a file object to add to FormData
                // @ts-ignore
                const filename = imageUri.split('/').pop();
                const match = /\.(\w+)$/.exec(filename);
                const type = match ? `image/${match[1]}` : 'image';
                formData.append('image', { uri: imageUri, name: filename, type });
            }

            // Send PUT request to the specified URL
            const response = await fetch(`http://192.168.0.105:8888/api/v1/categorys/${item.id}`, {
                method: 'PUT',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data', // Specify the data format as form data
                },
            });

            const responseData = await response.json();

            // Check the response status code
            if (response.status === 200) {
                ToastAndroid.showWithGravity(
                    responseData.message,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
                setCategoryName("");
                setImageUri(null);
                navigation.goBack();
            } else {
                // Handle any errors
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

    const ButtonBackClick = () => {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={ButtonBackClick}>
                <Icon name={"arrow-back"} style={styles.backIcon} />
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <View style={styles.content}>
                <Text style={styles.title}>Cập nhật loại món ăn</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Loại món ăn:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={categoryName}
                        value={categoryName}
                        onChangeText={(value) => setCategoryName(value)}
                    />
                    <Text style={{ color: 'red' }}>{errorCategoryName}</Text>
                </View>
                <TouchableOpacity style={styles.imagePicker} onPress={handleImagePicker}>
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.image} />
                    ) : (
                        <Text style={styles.imagePickerText}>Chọn hình ảnh</Text>
                    )}
                </TouchableOpacity>
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

export default UpdateCategoryScreen;
