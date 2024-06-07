import React, {useState} from "react";
import {
    ImageBackground,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from "react-native";

import Icon from "react-native-vector-icons/Fontisto";
import axios from "axios";

const RegisterScreen = ({navigation}: any) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [address, setAddress] = useState("");
    const [checkEmail, setCheckEmail] = useState(true);
    const [errorPassword, setErrorPassword] = useState('');
    const [errorFullName, setErrorFullName] = useState('');
    const [errorAddress, setErrorAddress] = useState('');

    const onSubmit = async () => {
        // Reset error messages
        setErrorPassword('');
        setErrorFullName('');
        setErrorAddress('');
        setCheckEmail(true);

        // Xử lý dữ liệu khi nhấn nút Đăng ký
        let formData = {
            username: username,
            password: password,
            fullname: fullname,
            address: address,
        };

        let emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

        if (!emailRegex.test(formData.username)) {
            setCheckEmail(false);
        }

        if (formData.password === '') {
            setErrorPassword('Vui lòng nhập Password');
        }

        if (formData.fullname === '') {
            setErrorFullName('Vui lòng nhập FullName');
        }

        if (formData.address === '') {
            setErrorAddress('Vui lòng nhập Address');
        }

        if (emailRegex.test(formData.username) && formData.password !== '' && formData.fullname !== '' && formData.address !== '') {
            try {
                const response = await axios.post('http://192.168.0.12:8888/api/v1/user/register', formData);
                if (response.status === 200) {
                    // Xử lý đăng nhập thành công
                    ToastAndroid.showWithGravity(
                        'Đăng kí tài khoản thành công',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                    );

                    const userData = response.data.data;

                    // Điều hướng tới màn hình home
                    navigation.navigate('LoginScreen');
                } else {
                    ToastAndroid.showWithGravity(
                        'Vui lòng nhập đầy đủ thông tin',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                    );
                }
            } catch (error) {
                ToastAndroid.showWithGravity(
                    'Đăng kí thất bại! Có lỗi xảy ra vui lòng thử lại',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
            }
        }
    }


    const backClick = () => {
        navigation.goBack();
    };

    return (
        <View style={{flex: 1}}>
            <ImageBackground
                source={require("../../assets/images/background_lg.jpg")} // Thay đổi đường dẫn đến ảnh của bạn
                style={styles.background}
            >
                <SafeAreaView style={styles.container}>
                    <StatusBar
                        backgroundColor={"#ffffff"}
                        barStyle={"dark-content"}
                    ></StatusBar>
                    <View style={styles.title}>
                        <Text style={{fontWeight: "bold", fontSize: 40, color: "black"}}>
                            Register
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.group}>
                            <Icon name="person" style={styles.icon}/>
                            <TextInput
                                placeholder="Username"
                                style={styles.input}
                                onChangeText={(value) => setUsername(value)}
                            ></TextInput>
                            <Text style={{color: 'red'}}>{!checkEmail ? 'Sai định dạng Email' : ''}</Text>
                        </View>
                        <View style={styles.group}>
                            <Icon name="locked" style={styles.icon}/>
                            <TextInput
                                secureTextEntry={true}
                                placeholder="Password"
                                style={styles.input}
                                onChangeText={(value) => setPassword(value)}
                            ></TextInput>
                            <Text style={{color: 'red'}}>{errorPassword}</Text>
                        </View>
                        <View style={styles.group}>
                            <Icon name="person" style={styles.icon}/>
                            <TextInput
                                placeholder="Full Name"
                                style={styles.input}
                                onChangeText={(value) => setFullname(value)}
                            ></TextInput>
                            <Text style={{color: 'red'}}>{errorFullName}</Text>
                        </View>
                        <View style={styles.group}>
                            <Icon name="home" style={styles.icon}/>
                            <TextInput
                                placeholder="Address"
                                style={styles.input}
                                onChangeText={(value) => setAddress(value)}
                            ></TextInput>
                            <Text style={{color: 'red'}}>{errorAddress}</Text>
                        </View>

                        <View style={styles.groupBTN}>
                            <TouchableOpacity style={styles.btn} onPress={() => backClick()}>
                                <Text
                                    style={{
                                        color: "black",
                                        fontSize: 20,
                                        fontWeight: "500",
                                        padding: 5,
                                    }}
                                >
                                    Back
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btn} onPress={() => onSubmit()}>
                                <Text
                                    style={{
                                        color: "black",
                                        fontSize: 20,
                                        fontWeight: "500",
                                        padding: 5,
                                    }}
                                >
                                    Register
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: "center",
    },

    title: {
        alignItems: "center",
        marginTop: 30,
    },

    form: {
        marginTop: 5,
        padding: 15,
        borderWidth: 1,
        borderRadius: 10,
    },

    group: {
        marginTop: 15,
    },

    input: {
        borderBottomWidth: 1,
        borderColor: "gray",
        backgroundColor: "white",
        paddingStart: 30,
        paddingBottom: 2,
    },

    icon: {
        fontSize: 25,
        position: "absolute",
        top: 10,
        zIndex: 1000,
    },

    btn: {
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "#1bcdff",
        width: 100,
        height: 40,
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center",
    },

    groupBTN: {
        justifyContent: "space-between",
        flexDirection: "row",
        marginHorizontal: 15,
    },

    background: {
        flex: 1,
        resizeMode: "cover", // Chọn kiểu scale cho ảnh là 'cover' để nó trải đều trên toàn bộ màn hình
        justifyContent: "center",
    },
});

export default RegisterScreen;
