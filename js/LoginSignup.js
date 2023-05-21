import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import logo2 from "../assets/logo2.png";
import { Font } from "expo";

let deviceWidth = Dimensions.get("window").width;

const LoginSignup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // TODO: Login the user
  };

  const handleSignup = () => {
    // TODO: Sign up the user
  };

  return (
    <View style={styles.container}>
      <View style={styles.circlesContainer}>
        <View style={styles.circle} />
        <View style={styles.borderCircle} />
      </View>
      <View style={styles.smallerCirclesContainer}>
        <View style={styles.smallerCircle} />
        <View style={styles.smallerBorderCircle} />
      </View>
      <View style={styles.logoContainer}>
        <Image style={styles.image} source={logo2} />
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
    marginBottom: "30%",
    width: "80%",
    height: "30%",
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
    color: "white",
    fontWeight: "bold",
  },
  signupButtonText: {
    color: "#670038",
    fontWeight: "bold",
  },
});

export default LoginSignup;
