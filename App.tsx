import React from 'react';
import {StyleSheet} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CategoryScreen from "./screens/admin/Category/CategoryScreen.tsx";
import AddCategoryScreen from "./screens/admin/Category/AddCategoryScreen.tsx";
import AdminHomeScreen from "./screens/admin/HomeScreen/HomeScreen.tsx";
import HomeScreen from "./screens/home/HomeScreen.tsx";
import {NavigationContainer} from "@react-navigation/native";
import RegisterScreen from "./screens/register/RegisterScreen.tsx";
import AddProductScreen from "./screens/admin/AddProductScreen.tsx";
import LoginScreen from "./screens/login/LoginScreen.tsx";

/*const Home = ({navigation}: any) => {
    return (
        <View style={styles.container}>
            <Text>Home Srceen</Text>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Detail", {
                name: "Nguyễn Văn A",
                obj: {id: 1, name: "Iphone 15", price: 15000000}
            })}>
                <Text style={styles.textBTN}>Chuyển trang</Text>
            </TouchableOpacity>
        </View>
    );
}

const Detail = ({route, navigation}: any) => {
    const {name, obj} = route.params;
    console.log(obj);

    return (
        <View style={{flex: 1}}>
            <View style={styles.nav}>
                <TouchableOpacity style={styles.btnNav} onPress={() => {
                    navigation.goBack()
                }}>
                    <Icon name="arrow-back-circle-outline" style={styles.icon}/>
                </TouchableOpacity>

                <TouchableOpacity style={{margin: 10}}>
                    <Icon name="notifications-outline" style={styles.icon}/>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <Text>Họ tên: {name}</Text>
                <Text>ID: {obj.id}</Text>
                <Text>Name: {obj.name}</Text>
                <Text>Price: {obj.price}</Text>
            </View>
        </View>
    );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
    return (
        /!*<NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={"Home"} component={Home} options={{headerShown: false}}/>
                <Stack.Screen name={"Detail"} component={Detail} options={{headerShown: false}}/>
                <Stack.Screen name={"Login"} component={LoginScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>*!/
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName: any;

                        if (route.name === 'Home') {
                            iconName = focused
                                ? 'home'
                                : 'home-outline';
                        } else if (route.name === 'Login') {
                            iconName = focused ? 'settings' : 'settings-outline';
                        }

                        // You can return any component that you like here!
                        return <Icon name={iconName} size={size} color={color}/>;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false
                })}
            >
                <Tab.Screen name={"Home"} component={HomeScreen}/>
                <Tab.Screen name={"Login"} component={LoginScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
};*/
const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LoginScreen">
                <Stack.Screen name={"HomeScreen"} component={HomeScreen} options={{headerShown: false}}/>
                <Stack.Screen name={"AdminHomeScreen"} component={AdminHomeScreen} options={{headerShown: false}}/>
                <Stack.Screen name={"AddCategoryScreen"} component={AddCategoryScreen} options={{headerShown: false}}/>
                <Stack.Screen name={"AddProductScreen"} component={AddProductScreen} options={{headerShown: false}}/>
                <Stack.Screen name={"RegisterScreen"} component={RegisterScreen} options={{headerShown: false}}/>
                <Stack.Screen name={"LoginScreen"} component={LoginScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    btn: {
        width: 150,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "blue"
    },

    textBTN: {
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: "center"
    },

    icon: {
        fontSize: 40
    },

    nav: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "blue"
    },
    btnNav: {margin: 10}
});

export default App;
