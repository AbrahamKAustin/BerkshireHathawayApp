import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;
import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import { useEffect } from "react";
import avatar from "../assets/lgoodchild.png";
import banner from "../assets/books.png";
import * as SecureStore from 'expo-secure-store';
import { LeaderboardContext } from './LeaderboardContext';



const Home = ({ navigation }) => {
  const [post, setPost] = useState([]);
  const authContext = useContext(AuthContext);
  const userToken = authContext.userToken;
  const userId = userToken ? userToken.sub : null;
  useEffect(() => {
    SecureStore.getItemAsync('jwt').then(token => {
      fetch('https://1c02-2600-1008-a111-a297-c1ef-aa97-3d94-7dd4.ngrok-free.app/user_teams/' + userId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
      .then(response => response.json())
      .then(data => {
        setPost(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    });
  }, []);
  const { totalPoints, rank } = useContext(LeaderboardContext);


  const FloatingNavBar = ({ navigation }) => {
    return (
      <SafeAreaView style={styles.navBarContainer}>
        <TouchableOpacity
          style={styles.selectedNavBarButton}
          onPress={() => navigation.navigate("Home")}>
          <Icon name="home" size={deviceHeight / 38} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navBarButton}
          onPress={() => navigation.navigate("ProfilePage")}>
          <Icon name="person" size={deviceHeight / 38} color="#670038" />
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  const handleContinue = (post) => {
    navigation.navigate('TasksPage', {post});
  };

  return (
    <View style={styles.container}>
      <View style={styles.half1CircleContainer}>
        <View style={styles.halfCircle} />
      </View>
      <View style={styles.half2CircleContainer}>
        <View style={styles.halfCircle} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Home</Text>
        <View style={styles.pointContainer}>
          <Text style={styles.pointText}>
            {"Points:"} {totalPoints}
            {" | Rank:"} {rank}
          </Text>
        </View>
      </View>
      
      {post && post.map((post, index) => (

        <TouchableOpacity style={styles.groupContainer} onPress={() => handleContinue(post)}>
          <View style={styles.smallerCirclesContainer}>
            <View style={styles.smallerCircle} />
          </View>
          <View style={styles.biggerCirclesContainer}>
            <View style={styles.biggerCircle} />
          </View>
          <View style={styles.topGroupContainer}>
            <Image style={styles.avatar} source={avatar} />
            <View justifyContent={"center"} padding="2%">
              <Text style={styles.name}>{post.Publisher}</Text>
              <Text style={styles.greyName}>{"Posted by"}</Text>
            </View>
          </View>
          <View style={styles.midGroupContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.groupName} >
                {post.TeamName}
              </Text>
            </View>
            <View justifyContent={"center"}>
              <Text style={styles.name}>
                {`${(new Date(post.DatePublished).getMonth() + 1).toString().padStart(2, '0')}/${new Date(post.DatePublished).getFullYear().toString().substr(-2)}`}
              </Text>              
              <Text style={styles.greyName}>{"Start Date"}</Text>
            </View>
          </View>
          <Image style={styles.postImage} source={banner} />
        </TouchableOpacity>
        ))}
      {post.length > 0 && (

      <View style={styles.smallRectangle}>
        <Text style={styles.rectangleText}>{post[post.length - 1].TeamName}</Text>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueText}>Continue</Text>
          <Icon name="arrow-forward" size={deviceHeight / 40} color="white" />
        </TouchableOpacity>
      </View>
      )}
      <FloatingNavBar navigation={navigation} />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    overflow: "hidden",
  },
  half1CircleContainer: {
    position: "absolute",
    bottom: "-54%",
    right: "-50%",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  half2CircleContainer: {
    position: "absolute",
    bottom: "-60%",
    left: "-40%",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  halfCircle: {
    width: deviceWidth * 1.4,
    height: deviceWidth * 1.4,
    borderRadius: deviceWidth * 1.2,
    backgroundColor: "#791248",
    opacity: 0.16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: deviceWidth,
    height: deviceHeight * 0.17,
    padding: deviceWidth * 0.05,
  },
  titleText: {
    fontSize: deviceHeight / 30,
    fontFamily: "manrope",
    fontWeight: "bold",
    color: "black",
  },
  pointContainer: {
    backgroundColor: "#670038",
    borderRadius: 50,
    width: "45%",
    height: deviceHeight / 22,
    alignItems: "center",
    justifyContent: "center",
  },
  pointText: {
    fontSize: deviceHeight / 80,
    fontFamily: "manrope",
    color: "white",
  },
  groupContainer: {
    flexDirection: "column",
    padding: deviceWidth * 0.05,
    backgroundColor: "white",
    borderRadius: 15,
    marginTop: deviceHeight * 0.05,
    width: "87%",
    height: "36%",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  smallerCirclesContainer: {
    position: "absolute",
    top: "-45%",
    right: "-35%",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  smallerCircle: {
    position: "absolute",
    width: deviceWidth * 0.22,
    height: deviceWidth * 0.22,
    borderRadius: deviceWidth * 1.2,
    backgroundColor: "#791248",
  },
  biggerCirclesContainer: {
    position: "absolute",
    bottom: "-22%",
    left: "-28%",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  biggerCircle: {
    position: "absolute",
    width: deviceWidth * 0.41,
    height: deviceWidth * 0.41,
    borderRadius: deviceWidth * 1.2,
    backgroundColor: "#791248",
  },
  topGroupContainer: {
    flexDirection: "row",
    height: deviceHeight / 18,
    alignItems: "center",
    marginBottom: "5%",
  },
  avatar: {
    width: deviceWidth * 0.1,
    height: deviceWidth * 0.1,
    borderRadius: (deviceWidth * 0.1) / 2,
  },
  name: {
    marginLeft: deviceWidth / 30,
    marginTop: deviceHeight / 80,
    fontSize: deviceHeight / 53,
    fontFamily: "manrope",
    fontWeight: "bold",
    color: "black",
  },
  greyName: {
    marginLeft: deviceWidth / 30,
    fontSize: deviceHeight / 80,
    fontFamily: "manrope",
    color: "grey",
  },
  midGroupContainer: {
    flexDirection: "row",
    height: deviceHeight / 13,
    alignItems: "center",
    marginBottom: "5%",
    justifyContent: "space-around",
  },
  textContainer: {
    width: "60%",
    numberOfLines: 2,
    ellipsizeMode: "tail"
  },
  groupName: {
    fontSize: deviceHeight / 30,
    fontFamily: "manrope",
    color: "black",
  },
  postImage: {
    width: "100%",
    borderRadius: deviceHeight / 50,
    height: deviceHeight * 0.13,
    marginTop: deviceHeight * 0.02,
  },
  startDate: {
    fontSize: deviceHeight / 50,
    fontFamily: "manrope",
    color: "grey",
    marginTop: deviceHeight * 0.02,
  },
  smallRectangle: {
    backgroundColor: "#fff",
    padding: deviceWidth * 0.05,
    borderRadius: 15,
    marginTop: deviceHeight * 0.05,
    marginBottom: deviceHeight * 0.02,
    width: "87%",
    height: "14%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rectangleText: {
    fontSize: deviceHeight / 40,
    fontFamily: "manrope",
    color: "black",
    fontWeight: "bold",
  },
  continueButton: {
    flexDirection: "row", // added this to layout text and icon horizontally
    justifyContent: "space-between", // added this to give space between text and icon
    backgroundColor: "#670038",
    borderRadius: 8,
    padding: deviceWidth * 0.02,
    paddingHorizontal: deviceWidth * 0.04,
    marginTop: "5%",
    width: "47%",
    height: "45%",
    alignItems: "center", // added this to align text and icon vertically
  },

  continueText: {
    fontSize: deviceHeight / 60,
    fontFamily: "manrope",
    color: "white",
  },
  navBarContainer: {
    flexDirection: "row",
    borderRadius: deviceHeight/40,
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: '5%',
    left: '7%',
    right: '7%',
    height: deviceHeight/10,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e8e8e8",
    paddingHorizontal: 15,
    //zIndex: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3.62,
    elevation: 4,
  },
  navBarButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: deviceHeight/54,
    width: deviceWidth/3.5,
  },
  selectedNavBarButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor:'#670038',
    borderRadius: deviceHeight/54,
    width: deviceWidth/3.5,
  },
});

export default Home;