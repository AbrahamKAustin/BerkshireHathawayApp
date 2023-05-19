import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button, Dimensions } from "react-native";

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

const Login = ({ navigation }) => {
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
      <Text style={styles.title}>Login or Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
      />
    </View>
  );
  }
  const styles = StyleSheet.create({
    container: {
      height: deviceHeight,
      width: deviceWidth,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f4f4f4',
    
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
    },
    input: {
      width: 300,
      height: 40,
      borderColor: "#ccc",
      borderWidth: 1,
      padding: 10,
    },
});

export default Login;