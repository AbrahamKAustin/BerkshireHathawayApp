import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Dimensions, Image, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import logo1 from "../assets/logo1.png";

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const TriangleShape = ({ color }) => {
  return (
    <View style={[styles.triangle, { borderBottomColor: color }]}>
      <View style={styles.triangleInner} />
    </View>
  );
};

const Login = ({navigation}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleLogin = () => {
    // TODO: Login the user
  };

  const handleSignUp = () => {
    navigation.navigate('Home');
  };

  const handleForgotPassword = () => {
    // TODO: Handle forgot password functionality
  };

  const handleLoginWithGoogle = () => {
    // TODO: Handle login with Google functionality
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={deviceHeight / 38} color="#fff" />
      </TouchableOpacity>
      <TriangleShape color="#79124A" />
      <Image style={styles.image} source={logo1} />
      <Text style={styles.title}>Create an account</Text>
      <View style={styles.inputContainer}>
        <View style={styles.iconInputContainer}>
          <Icon name="user" size={deviceHeight / 48} color="#ccc" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={setName}
          />
        </View>
        <View style={styles.iconInputContainer}>
          <Icon name="envelope" size={deviceHeight / 48} color="#ccc" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.iconInputContainer}>
          <Icon name="lock" size={deviceHeight / 48} color="#ccc" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={setPassword}
            secureTextEntry={true} // for password fields
          />
        </View>
        <View style={styles.iconInputContainer}>
          <Icon name="lock" size={deviceHeight / 48} color="#ccc" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            onChangeText={setConfirm}
            secureTextEntry={true} // for password fields
          />
        </View>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginWithGoogleButton} onPress={handleLoginWithGoogle}>
          <Icon name="google" size={deviceHeight / 48} color="#552448" style={styles.googleIcon} />
          <Text style={styles.googleText}>Sign Up with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgotPasswordLink} onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    top: '6%',
    left: '4%',
  },
  triangle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '40%',
    height: '60%',
    borderBottomWidth: deviceHeight * 0.7,
    borderBottomColor: 'transparent',
    borderRightWidth: deviceHeight * 0.5,
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    borderTopColor: 'transparent',
    overflow: 'hidden',
  },
  triangleInner: {
    width: '100%',
    height: '100%',
    backgroundColor: '#79124A',
    transform: [{ rotate: '-90deg' }],
  },
  image: {
    height: deviceHeight * 0.25,
    width: deviceWidth * 0.5,
    marginBottom: deviceHeight * 0.010,
    marginTop: deviceHeight * 0.07,
  },
  title: {
    fontSize: deviceHeight / 30,
    fontFamily: 'Manrope-Bold',
    fontWeight: "bold",
    color: 'white',
    marginBottom: deviceHeight * 0.04,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  iconInputContainer: {
    position: 'relative',
    marginBottom: deviceHeight / 22,
    width: '78%',
    height: deviceHeight * .06,
  },
  inputIcon: {
    position: 'absolute',
    left: '5%',
    zIndex: 1,
    top: '30%',
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
  signUpButton: {
    backgroundColor: 'white',
    borderRadius: deviceWidth / 10,
    //marginTop: deviceHeight * 0.02,
    paddingVertical: deviceHeight * 0.018,
    //paddingHorizontal: deviceWidth * 0.1,
    width: '35%',
    height: deviceHeight * .07,
  },
  buttonText: {
    color: '#552448',
    textAlign: 'center',
    fontSize: deviceHeight / 43,
    fontWeight: 'bold',
  },
  googleText: {
    color: 'white',
    textAlign: 'center',
    fontSize: deviceHeight / 70,
    marginLeft: deviceWidth * 0.01,
  },
  loginWithGoogleButton: {
   // backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: deviceWidth / 300,
    borderRadius: deviceWidth / 20,
    marginTop: deviceHeight * 0.035,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: deviceWidth * 0.03,
    width: '40%',
    height: deviceHeight * .04,
  },
  googleIcon: {   
    color: 'white',
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
