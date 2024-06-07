import React, {useState} from "react";
import {Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {launchImageLibrary} from "react-native-image-picker";
import {Picker} from "@react-native-picker/picker";

const AddProductScreen = ({navigation}: any) => {
    const [dishName, setDishName] = useState('');
    const [price, setPrice] = useState(0.0);
    const [imageUri, setImageUri] = useState(null);
    const [errorDishName, setErrorDishName] = useState('');

    const [selectedCategory, setSelectedCategory] = useState("");

    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleImagePicker = () => {
        launchImageLibrary({mediaType: 'photo'}, (response) => {
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

    const submit = () => {

    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                <Icon name={"arrow-back"} style={styles.backIcon}/>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <View style={styles.content}>
                <Text style={styles.title}>Thêm mới món ăn</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Tên món ăn:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={'Nhập vào tên món ăn'}
                        value={dishName}
                        onChangeText={(value) => setDishName(value)}
                    />
                    <Text style={{color: 'red'}}>{errorDishName}</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Giá:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={'Nhập vào giá tiền'}
                        value={dishName}
                        onChangeText={(value) => setDishName(value)}
                        keyboardType="numeric"
                    />
                    <Text style={{color: 'red'}}>{errorDishName}</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Loại món ăn:</Text>
                    <Picker
                        style={styles.input}
                        selectedValue={selectedCategory}
                        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                    >
                        {category.map((category) => (
                            <Picker.Item
                                key={category.id}
                                label={category.name}
                                value={category.id}
                            />
                        ))}
                    </Picker>
                </View>
                <TouchableOpacity style={styles.imagePicker} onPress={handleImagePicker}>
                    {imageUri ? (
                        <Image source={{uri: imageUri}} style={styles.image}/>
                    ) : (
                        <Text style={styles.imagePickerText}>Chọn hình ảnh</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnAdd} onPress={() => submit()}>
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

export default AddProductScreen;
