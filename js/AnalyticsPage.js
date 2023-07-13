import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const AnalyticsPage = ({ navigation }) => {

  
  const FloatingNavBar = ({ navigation }) => {
    return (
      <SafeAreaView style={styles.navBarContainer}>
        <TouchableOpacity
          style={styles.navBarButton}
          onPress={() => navigation.navigate("TasksPage")}>
          <Icon name="calendar" size={deviceHeight / 38} color="#670038" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navBarButton}
          onPress={() => navigation.navigate("LeaderboardPage")}>
          <Icon name="podium" size={deviceHeight / 38} color="#670038" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.selectedNavBarButton}
          onPress={() => navigation.navigate("AnalyticsPage")}>
          <Icon name="trending-up" size={deviceHeight / 38} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  const [userData, setUserData] = useState({ groups: [] });

  useEffect(() => {
    fetchUserDataFromDatabase();
  }, []);

  const fetchUserDataFromDatabase = () => {
    const dataFromDatabase = {
      groups: [
        {
          groupName: "Battle of the Generations",
        },
      ],
    };

    setUserData(dataFromDatabase);
  };
 
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', }}>
          <View style = {styles.curvedContainer}>
            <View style={styles.topContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Home")}>
                <Icon name="arrow-back" size={deviceHeight / 38} color="white" />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                  <Text style={styles.titleText}>ANALYTICS</Text>
                  <Text style={styles.groupText}>
                    {userData.groups && userData.groups[0] ? userData.groups[0].groupName : ''}
                  </Text>

                </View>
            </View>
          </View>
          <View style ={styles.midContainer}>
            <View style ={styles.statsContainer1}>
        

            </View>
            <View style ={styles.statsContainer2}>
            

            </View>

          </View>
      </ScrollView>
      <FloatingNavBar navigation={navigation} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    overflow: "hidden",
  },
  curvedContainer:{
    height:deviceHeight/2,
    width: deviceWidth,
    borderBottomLeftRadius: 45, // adjust the value as needed
    borderBottomRightRadius: 45, // adjust the value as needed
    backgroundColor: '#670038', // or any other color
  },
  topContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: deviceWidth,
    height: deviceHeight * 0.14,
    padding: deviceWidth * 0.05,
  },
  backButton: {
    position: 'absolute',
    left: '8%',
    top: '90%',
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: 'absolute',
    bottom: '0%',
  },
  titleText: {
    fontSize: deviceHeight / 30,
    fontFamily: "manrope",
    fontWeight: "semi-bold",
    color: "white",
  },
  groupText: {
    fontSize: deviceHeight / 45,
    fontFamily: "manrope",
    fontWeight: "light",
    color: "white",
  },
  midContainer:{
    height:deviceHeight/2.3,
    width: deviceWidth,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'

  },
  statsContainer1: {
    height:deviceHeight/3.2,
    width: deviceWidth/2.3,
    backgroundColor: '#670038', 
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: deviceWidth/20,
  },
  statsContainer2: {
    height:deviceHeight/3.2,
    width: deviceWidth/2.3,
    backgroundColor: '#EAE3D4', 
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: deviceWidth/20,
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
    width: deviceWidth/5,
  },
  selectedNavBarButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor:'#670038',
    borderRadius: deviceHeight/54,
    width: deviceWidth/5,
  },

  
});

export default AnalyticsPage;
