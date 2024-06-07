import React, {useState} from "react";
import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Alert,
    Button,
    ImageBackground, ToastAndroid
} from "react-native";

import Icon from 'react-native-vector-icons/Fontisto';
import CheckBox from '@react-native-community/checkbox';
import axios from "axios";
import Toast from "react-native-toast-message";

const LoginScrenn = ({navigation}: any) => {
    const [isCheck, setIsCheck] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkEmail, setCheckEmail] = useState(true);
    const [errorPassword, setErrorPassword] = useState('');

    const onSubmit = async () => {
        let formData = {
            username: email,
            password: password,
            _checkBox: isCheck,
        }
        //Định dạng email
        let emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

        if (!emailRegex.test(formData.username)) {
            setCheckEmail(false);
        } else {
            setCheckEmail(true);
        }

        formData.password === '' ? setErrorPassword('Vui lòng nhập Password') : setErrorPassword('');

        try {
            const response = await axios.post('http://192.168.0.105:8888/api/v1/user/login', formData);
            if (response.status === 200) {
                // Xử lý đăng nhập thành công
                ToastAndroid.showWithGravity(
                    'Đăng nhập thành công',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );

                const userData = response.data.data;

                // Điều hướng tới màn hình home theo role
                if (userData.roleId === 1) {
                    navigation.navigate('AdminHomeScreen', {userData});
                } else if (userData.roleId === 2) {
                    navigation.navigate('HomeScreen', {userData});
                }


            } else {
                ToastAndroid.showWithGravity(
                    'Đăng nhập thất bại! Email hoặc Password không đúng',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
            }
        } catch (error) {
            ToastAndroid.showWithGravity(
                'Đăng nhập thất bại! Có lỗi xảy ra vui lòng thử lại',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <ImageBackground
                source={require('../../assets/images/background_lg.jpg')} // Thay đổi đường dẫn đến ảnh của bạn
                style={styles.background}
            >
                <View style={styles.container}>
                    <StatusBar backgroundColor={"#ffffff"} barStyle={"dark-content"}></StatusBar>
                    <View style={styles.title}>
                        <Text style={{fontWeight: 'bold', fontSize: 40, color: 'black'}}>Login</Text>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.group}>
                            <Icon name="email" style={styles.icon}/>
                            <TextInput placeholder="Email address" style={styles.input}
                                       onChangeText={(value) => setEmail(value)}></TextInput>
                            <Text style={{color: 'red'}}>{!checkEmail ? 'Sai định dạng Email' : ''}</Text>
                        </View>
                        <View style={styles.group}>
                            <Icon name="locked" style={styles.icon}/>
                            <TextInput secureTextEntry={true} placeholder="Password" style={styles.input}
                                       onChangeText={(value) => setPassword(value)}></TextInput>
                            <Text style={{color: 'red'}}>{errorPassword}</Text>
                        </View>

                        <View style={styles.group1}>
                            <View style={styles.savePass}>
                                <CheckBox
                                    disabled={false}
                                    value={isCheck}
                                    onValueChange={(newValue) => setIsCheck(newValue)}
                                    tintColors={{true: 'blue'}}
                                />
                                <Text>Remember Password</Text>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => Alert.alert('oke')}>
                                    <Text style={{color: 'blue', paddingEnd: 10}}>Forgot password</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.groupBTN}>
                            <TouchableOpacity style={styles.btn} onPress={() => onSubmit()}>
                                <Text style={{color: 'black', fontSize: 20, fontWeight: '500', padding: 5}}>Login</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('RegisterScreen')}>
                                <Text style={{
                                    color: 'black',
                                    fontSize: 20,
                                    fontWeight: '500',
                                    padding: 5
                                }}>Register</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'center',
    },

    title: {
        alignItems: 'center',
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
        borderColor: 'gray',
        backgroundColor: 'white',
        paddingStart: 30,
        paddingBottom: 2
    },

    icon: {
        fontSize: 25,
        position: 'absolute',
        top: 10,
        zIndex: 1000,
    },
    group1: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 5,
    },
    savePass: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    btn: {
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#1bcdff',
        width: 100,
        height: 40,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    groupBTN: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    background: {
        flex: 1,
        resizeMode: 'cover', // Chọn kiểu scale cho ảnh là 'cover' để nó trải đều trên toàn bộ màn hình
        justifyContent: 'center',
    },
});

export default LoginScrenn;
