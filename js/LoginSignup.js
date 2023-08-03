import React, { useState, useEffect} from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import LoadingScreen from "./LoadingScreen";



let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const LoginSignup = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  const fetchFonts = () => {
    return Font.loadAsync({
      'manrope-regular': require('../assets/fonts/Manrope/static/Manrope-Regular.ttf'),
    });
  };

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await fetchFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setFontLoaded(true);
        SplashScreen.hideAsync();
      }
    }
  
    prepare();
  }, []);
  if (!fontLoaded) { 
    return <LoadingScreen/>; 
  }

  const handleLogin = () => {
    navigation.navigate('Login');
  }; 

  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <View style={styles.circlesContainer}>
        <Image style={styles.circle} source = {{uri: 'https://storage.googleapis.com/berkshirehathawaytestbucket/city1.jpg'}}/>
        <View style={styles.borderCircle} />
      </View>
      <View style={styles.smallerCirclesContainer}>
        <Image style={styles.smallerCircle} source = {{uri: 'https://storage.googleapis.com/berkshirehathawaytestbucket/city2.png'}}/>
        <View style={styles.smallerBorderCircle} />
      </View>
      <View style={styles.logoContainer}>
        <Image style={styles.image} source={{uri: 'https://storage.googleapis.com/berkshirehathawaytestbucket/logo2.png'}} />
        <Image style = {styles.goodchildimage} source={{uri: 'https://storage.googleapis.com/berkshirehathawaytestbucket/thegoodchildteam.png'}} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.signupButton]}
          onPress={handleSignup}
        >
          <Text style={styles.signupButtonText}>Create an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: "2%",
  },
  circlesContainer: {
    position: "absolute",
    right: "50%",
    bottom: "-45%",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  circle: {
    position: "absolute",
    width: deviceWidth * 1,
    height: deviceWidth * 1,
    borderRadius: deviceWidth * 1,
    backgroundColor: "#791248",
  },
  borderCircle: {
    position: "absolute",
    width: deviceWidth * 1.2,
    height: deviceWidth * 1.2,
    borderRadius: deviceWidth * 2,
    borderWidth: 3,
    borderColor: "#791248",
    backgroundColor: "transparent",
  },
  smallerCirclesContainer: {
    position: "absolute",
    bottom: "50%",
    left: "50%",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  smallerCircle: {
    position: "absolute",
    width: deviceWidth * 0.6,
    height: deviceWidth * 0.6,
    borderRadius: deviceWidth * 1.2,
    backgroundColor: "#791248",
  },
  smallerBorderCircle: {
    position: "absolute",
    width: deviceWidth * 0.8,
    height: deviceWidth * 0.8,
    borderRadius: deviceWidth * 1.6,
    borderWidth: 3,
    borderColor: "#791248",
    backgroundColor: "transparent",
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  image: {
    width: "80%",
    height: "30%",
  },
  goodchildimage:{
    marginTop: deviceHeight/25,
    height: deviceHeight/30,
    width: deviceWidth/1.6,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    fontSize: 16,
    width: "80%",
    paddingVertical: "5%",
    marginBottom: "4%",
    borderRadius: 9,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3.62,
    elevation: 4,
  },
  loginButton: {
    backgroundColor: "#670038",
  },
  signupButton: {
    marginBottom: "15%",
    backgroundColor: "white",
  },
  loginButtonText: {
    fontFamily: 'manrope-regular',
    color: "white",
    fontWeight: "bold",
  },
  signupButtonText: {
    fontFamily: 'manrope-regular',
    color: "#670038",
    fontWeight: "bold",
  },
});

export default LoginSignup;