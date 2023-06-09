import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const ProfilePage = ({ navigation }) => {
  const [points, setPoints] = useState(0);
  const [rank, setRank] = useState("Beginner");

  const [post, setPost] = useState({
    name: "Liz Goodchild",
    groupName: "Battle of the Generations",
    posterName: "Poster Name",
    posterAvatar: require("../assets/lgoodchild.png"),
    postImage: require("../assets/books.png"),
    startDate: "05/23",
  });

  const FloatingNavBar = ({ navigation }) => {
    return (
      <SafeAreaView style={styles.navBarContainer}>
        <TouchableOpacity
          style={styles.navBarButton}
          onPress={() => navigation.navigate("Home")}>
          <Icon name="home" size={deviceHeight / 38} color="#670038" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.selectedNavBarButton}
          onPress={() => navigation.navigate("Signup")}>
          <Icon name="person" size={deviceHeight / 38} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  const handleContinue = () => {
    navigation.navigate('TasksPage');
  };

  return (
    <View style={styles.container}>

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Profile</Text>
        <View alignItems={"flex-end"} marginLeft={deviceWidth/4} padding="2%">
          <Text style={styles.name}>{post.name}</Text>
          <Text style={styles.roleText}>{"Admin"}</Text>
        </View>
        <Image style={styles.avatar} source={post.posterAvatar} />
      </View>

      <View style={styles.profileContainer}>
        <ImageBackground style={styles.imageBackground} source={require("../assets/suburbanhome.png")}>
          <View style={styles.topProfileContainer}>
            <TouchableOpacity style={styles.editButton} onPress={handleContinue}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.midProfileContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.profileName} > Elizabeth Goodchild </Text>
              <Text style={styles.emailText} > lgoodchild@starckre.com </Text>
            </View>
          </View>
          <View style={styles.profileStats}>
            <View style ={styles.statsColumns}>
              <Text style={styles.profileStatsTitle} > Total Points </Text>
              <Text style={styles.profileStatsText} > 432 </Text>
            </View>
            <View style ={styles.statsColumns}>
              <Text style={styles.profileStatsTitle} > Rank: </Text>
              <Text style={styles.profileStatsText} > Diamond </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
      <Text style = {styles.groupsText}>
        Groups
      </Text>

      <View style={styles.group1}>
        <Text style={styles.group1Text}>{post.groupName}</Text>
        <View style={styles.group1StatsContainer}>
          <Text style={styles.group1StatsTitle}>Continue</Text>
          <Icon name="arrow-forward" size={deviceHeight / 40} color="white" />
        </View>
      </View>
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
  roleText: {
    marginLeft: deviceWidth / 30,
    fontSize: deviceHeight / 80,
    fontFamily: "manrope",
    color: "grey",
  },
  profileContainer: {
    borderRadius: 15,
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
    marginBottom: deviceHeight * 0.03,

  },
  imageBackground: {
    flex: 1,
    flexDirection: 'column',
    //justifyContent: 'space-between',
    padding: deviceWidth * 0.05,
  },
  topProfileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'flex-end',
  },
  editButton: {
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 50,
    width: deviceWidth/7,
    height: deviceHeight / 28,
    alignItems: "center",
    justifyContent: "center",
  },
  editText: {
    fontSize: deviceHeight / 70,
    fontFamily: "manrope",
    color: "white",
  },
  midProfileContainer: {
    //alignItems: 'center',
    flexDirection: "column",
    //height: deviceHeight / 13,
  },
  textContainer: {
    width: "80%",
    numberOfLines: 2,
    ellipsizeMode: "tail",
  },
  profileName: {
    fontSize: deviceHeight / 30,
    fontFamily: "manrope",
    color: "white",
  },
  emailText: {
    fontSize: deviceHeight / 45,
    fontFamily: "manrope",
    color: "white",
  },
  profileStats: {
    width: "100%",
    borderRadius: deviceHeight / 60,
    height: deviceHeight * 0.13,
    marginTop: deviceHeight * 0.07,
    backgroundColor: '#f4f4f4',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statsColumns: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '50%',
  },
  profileStatsTitle: {
    fontSize: deviceHeight / 47,
    fontFamily: "manrope",
    color: "#918A7B",
    fontWeight: 'bold',
  },
  profileStatsText: {
    fontSize: deviceHeight / 50,
    fontFamily: "manrope",
    color: "#A59E8F",
    marginTop: '1.5%'
  },
  groupsText: {
    fontSize: deviceHeight / 48,
    fontFamily: "manrope",
    fontWeight: "light",
    color: "black",
    marginLeft: '6%',
  },
  group1: {
    backgroundColor: "#fff",
    padding: deviceWidth * 0.05,
    borderRadius: 15,
    marginTop: deviceHeight * 0.025,
    marginBottom: deviceHeight * 0.02,
    width: "87%",
    height: "23%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  group1Text: {
    fontSize: deviceHeight / 40,
    fontFamily: "manrope",
    color: "black",
    fontWeight: "bold",
    marginTop: '2%'
  },
  group1StatsContainer: {
    flexDirection: "row", // added this to layout text and icon horizontally
    justifyContent: "center", // added this to give space between text and icon
    backgroundColor: "#670038",
    borderRadius: 14,
    padding: deviceWidth * 0.02,
    paddingHorizontal: deviceWidth * 0.04,
    marginTop: "9%",
    width: "87%",
    height: "50%",
    alignItems: "center", // added this to align text and icon vertically
  },

  group1StatsTitle: {
    fontSize: deviceHeight / 60,
    fontFamily: "manrope",
    color: "white",
  },
  group1StatsColumns: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 3
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

export default ProfilePage;
