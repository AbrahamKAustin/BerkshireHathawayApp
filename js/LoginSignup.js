import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Dimensions,
  Image,
} from "react-native";
import logo2 from "../assets/logo2.png";

let deviceHeight = Dimensions.get("window").height;
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
      <View style={styles.borderCircle} />
      <View style={styles.largeCircle} />
      <View style={styles.smallCircle} />

      <Image style={styles.image} source={logo2} />
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} />
        <Button title="Signup" onPress={handleSignup} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: deviceHeight / 6,
    width: deviceWidth / 1.9,
    marginBottom: deviceWidth / 1.9,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  largeCircle: {
    position: "absolute",
    bottom: deviceHeight / 4,
    left: deviceWidth / 1.5,
    width: deviceWidth / 0.8,
    height: deviceWidth / 0.8,
    borderRadius: deviceWidth / 1.6,
    backgroundColor: "#913E7B",
  },
  smallCircle: {
    position: "absolute",
    top: deviceHeight / 8,
    right: deviceWidth / 4,
    width: deviceWidth / 1.6,
    height: deviceWidth / 1.6,
    borderRadius: deviceWidth / 3.2,
    backgroundColor: "#913E7B",
  },
  borderCircle: {
    position: "absolute",
    bottom: deviceHeight / 4,
    left: deviceWidth / 1.5,
    width: deviceWidth / 0.9,
    height: deviceWidth / 0.9,
    borderRadius: deviceWidth / 1.9,
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: "#913E7B",
  },
});

export default LoginSignup;
