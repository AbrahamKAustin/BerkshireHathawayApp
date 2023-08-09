import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
} from "react-native";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const LoadingScreen = ({ navigation }) => {


  return (
    <View style={styles.container}>

      <View style={styles.logoContainer}>
        <Image style={styles.image} source={{uri: 'https://storage.googleapis.com/berkshirehathawaytestbucket/logo2.png'}} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  image: {
    width: "80%",
    height: "50%",
  },
});

export default LoadingScreen;

