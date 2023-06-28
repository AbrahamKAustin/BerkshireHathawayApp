import React, { useState, useContext} from "react";
import { StyleSheet, View, Text, TextInput, Dimensions, Image, TouchableOpacity, ImageBackground,  } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import logo1 from "../assets/purplelogo.png";
import { AuthContext } from './AuthContext';
import * as SecureStore from 'expo-secure-store';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;



const Login = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);

  const handleLogin = () => {
    const opts = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "Email": email,
        "Password": password
      })
    }
  
    fetch('https://0e9a-2600-1008-a111-f162-d49a-55e7-7d52-16f6.ngrok-free.app/login', opts)
      .then(response => {
        if(response.status === 200) return response.json();
        else throw new Error("Login failed")
  
      })
      .then(data => {
        console.log(data);
        // Assuming the JWT token is inside data.access_token
        const jwt = data.access_token;
        if (jwt) {
          authContext.signIn(jwt);
          console.log('JWT saved successfully');
          navigation.navigate('Home');
        } else {
          console.log('No JWT received');
        }
      })
      .catch(error => {
        // Handle network errors and failed logins
        console.error('Error:', error);
      });
  };

  

  const handleForgotPassword = () => {
    // TODO: Handle forgot password functionality
  };

  const handleLoginWithGoogle = () => {
    // TODO: Handle login with Google functionality
  };

  return (
    <ImageBackground style={styles.container} source = {require('../assets/cityfamily1.jpg')}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={deviceHeight / 30} color="#552448" />
      </TouchableOpacity>
      <Image style={styles.image} source={logo1} />
      <View style={styles.inputContainer}>
        <View style={styles.iconInputContainer}>
          <Icon name="envelope" size={deviceHeight / 38} color="#ccc" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
            value = {email}
          />
        </View>
        <View style={styles.iconInputContainer}>
          <Icon name="lock" size={deviceHeight / 38} color="#ccc" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={setPassword}
            secureTextEntry={true}
            value = {password}
          />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>- or -</Text>
        <TouchableOpacity style={styles.loginWithGoogleButton} onPress={handleLoginWithGoogle}>
          <Icon name="google" size={deviceHeight / 48} color="#552448" style={styles.googleIcon} />
          <Text style={styles.googleText}>Login with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgotPasswordLink} onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#670038',
  },
  backButton: {
    position: 'absolute',
    color: 'white',
    top: '8%',
    left: '6%',
  },  
  image: {
    height: deviceHeight * 0.25,
    width: deviceWidth * 0.5,
    marginBottom: deviceHeight * 0.08,
    marginTop: deviceHeight * 0.2,
    borderRadius: deviceHeight/2
  },
  title: {
    fontSize: deviceHeight / 30,
    fontFamily: 'manrope',
    fontWeight: "bold",
    color: 'black',
    marginBottom: deviceHeight * 0.025,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  iconInputContainer: {
    position: 'relative',
    marginBottom: deviceHeight / 30,
    width: '78%',
    height: deviceHeight * .06,
  },
  inputIcon: {
    position: 'absolute',
    left: '5%',
    zIndex: 1,
    top: '25%',
  },
  input: {
    width: '100%',
    height: deviceHeight * .06,
    borderColor: "#ccc",
    borderWidth: deviceHeight / 1000,
    padding: "5%",
    paddingLeft: '15%',
    backgroundColor: 'white',
    borderRadius: deviceWidth / 40,
  },
  loginButton: {
    
    backgroundColor: 'white',
    borderRadius: deviceWidth / 10,
    marginTop: deviceHeight * 0.02,
    paddingVertical: deviceHeight * 0.018,
    paddingHorizontal: deviceWidth * 0.1,
    width: '35%',
    height: deviceHeight * .07,
  },
  buttonText: {
    color: '#670038',
    textAlign: 'center',
    fontSize: deviceHeight / 43,
    fontWeight: 'bold',
  },
  orText: {
    color: 'white',
    fontSize: deviceHeight / 50,
    marginTop: deviceHeight * 0.02,
  },
  googleText: {
    color: '#670038',
    textAlign: 'center',
    fontSize: deviceHeight / 70,
    marginLeft: deviceWidth * 0.01,
  },
  loginWithGoogleButton: {
    backgroundColor: 'white',
    borderRadius: deviceWidth / 45,
    marginTop: deviceHeight * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: deviceWidth * 0.03,
    width: '37%',
    height: deviceHeight * .05,
  },
  googleIcon: {
    marginRight: deviceWidth * 0.02,
  },
  forgotPasswordLink: {
    marginTop: deviceHeight * 0.02,
  },
  forgotPasswordText: {
    color: 'white',
    fontSize: deviceHeight / 50,
    textDecorationLine: 'underline',
  },
});

export default Login;
