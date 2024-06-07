import React, {useState} from "react";
import {
    Alert,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {launchImageLibrary} from 'react-native-image-picker';

const AddCategoryScreen = ({navigation}: any) => {
    const [categoryName, setCategoryName] = useState("");
    const [imageUri, setImageUri] = useState(null);

    const [errorCategoryName, setErrorCategoryName] = useState("");

    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleImagePicker = () => {
        launchImageLibrary({mediaType: 'photo'}, (response: any) => {
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

    const submit = async () => {
        try {
            if (categoryName === '') {
                setErrorCategoryName("Vui lòng nhập tên loại món ăn");
                return;
            }
            setErrorCategoryName("");


            // Tạo một đối tượng FormData để gửi dữ liệu lên server
            const formData = new FormData();
            formData.append('name', categoryName);
            if (imageUri) {
                // Chuyển đổi đường dẫn của hình ảnh thành một đối tượng file để thêm vào FormData
                // @ts-ignore
                const filename = imageUri.split('/').pop();
                const match = /\.(\w+)$/.exec(filename);
                const type = match ? `image/${match[1]}` : 'image';
                formData.append('image', {uri: imageUri, name: filename, type});
            }
            // Gửi request POST tới địa chỉ cần
            const response = await fetch('http://192.168.0.105:8888/api/v1/categorys', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data', // Định dạng dữ liệu là form data
                },
            });

            const responseData = await response.json();

            // Kiểm tra mã trạng thái của response
            if (response.status === 200) {
                //const responseData = await response.json();
                //console.log('Thêm loại món ăn thành công:', responseData);
                // Xử lý phản hồi từ server (nếu cần)
                ToastAndroid.showWithGravity(
                    'Thêm loại món ăn thành công',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
                setCategoryName("");
                setImageUri(null);
            } else {
                // Xử lý lỗi nếu có
                //Alert.alert('Đã xảy ra lỗi khi thêm loại món ăn');
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
            /*console.error('Lỗi khi gửi request:', error);
            Alert.alert('Đã xảy ra lỗi khi gửi request');*/
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                <Icon name={"arrow-back"} style={styles.backIcon}/>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <View style={styles.content}>
                <Text style={styles.title}>Thêm mới loại món ăn</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Loại món ăn:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={'Nhập vào tên loại món ăn'}
                        value={categoryName}
                        onChangeText={(value) => setCategoryName(value)}
                    />
                    <Text style={{color: 'red'}}>{errorCategoryName}</Text>
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

export default AddCategoryScreen;
