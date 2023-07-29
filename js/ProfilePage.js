import React, { useState, useEffect, useCallback } from "react";
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
import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import { LeaderboardContext } from './LeaderboardContext';
import { UserContext, isLoading } from './UserContext';
import * as SecureStore from 'expo-secure-store';

import {LoadingScreen} from './LoadingScreen';
let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const ProfilePage = ({ navigation }) => {
  console.log('ProfilePage component rendering');
  const [post, setPost] = useState([]);
  const authContext = useContext(AuthContext);
  const userToken = authContext.userToken;
  const userId = userToken ? userToken.sub : null;
  const { totalPoints, rank, groupRankings} = useContext(LeaderboardContext)
  const [userTeams, setUserTeams] = useState([]); 
  const { userData, isLoading, userRole} = useContext(UserContext);
  console.log('groupRankings', groupRankings);
  console.log('userTeams', userTeams);
  console.log('userData', userData);

  if (isLoading) {
    return <LoadingScreen />; 
  }
  useEffect(() => {
    console.log('useEffect component rendering');
    if (!userId) return;
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
    }, [userId]);
    console.log('post', post);

const [oldRanks, setOldRanks] = useState({});
const [teamsWithCHG, setTeamsWithCHG] = useState([]); // to store teams with their change in rank

useEffect(() => {
  if (post && groupRankings) {
    // Save the current ranks before updating
    setOldRanks(groupRankings.reduce((acc, ranking) => ({...acc, [ranking.userId]: ranking.rank}), {}));
    const teamsWithRankAndPoints = groupRankings.map(ranking => {
      const team = post.find(p => String(p.TeamId) === String(ranking.TeamId));
      return { ...ranking, TeamName: team ? team.TeamName : null };
    });
    setUserTeams(teamsWithRankAndPoints);
  }
}, [post, groupRankings]);

useEffect(() => {
  if (userTeams.length > 0) {
    const computedTeamsWithCHG = userTeams.map(team => ({
      ...team,
      CHG: oldRanks[team.userId] ? oldRanks[team.userId] - team.rank : 0
    }));
    setTeamsWithCHG(computedTeamsWithCHG);
  }
}, [oldRanks, userTeams]);

    
    

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
          onPress={() => navigation.navigate("ProfilePage")}>
          <Icon name="person" size={deviceHeight / 38} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    );
  };


  const handleLogout = () => {
    authContext.signOut().then(() => {
      navigation.navigate('LoginSignup');
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', }}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Profile</Text>
          <View alignItems={"flex-end"} marginLeft={deviceWidth/4} padding="2%">
            <Text style={styles.name}>{userData.Name}</Text>
            <Text style={styles.roleText}>{userRole}</Text>
          </View>
          <Image style={styles.avatar} source={require('../assets/lgoodchild.png')} />
        </View>

        <View style={styles.profileContainer}>
          <ImageBackground style={styles.imageBackground} source={require("../assets/suburbanhome.png")}>
      
            <View style = {styles.profileBorderCircle1}/> 
            <View style = {styles.profileBorderCircle2}/>
            <View style = {styles.profileBorderCircle3}/>

            <View style={styles.topProfileContainer}>
              <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate("EditPage")}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.midProfileContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.profileName}>{userData.Name}</Text>
                <Text style={styles.emailText}>{userData.Email}</Text>
              </View>
            </View>
            <View style={styles.profileStats}>
              <View style={styles.statsColumns}>
                <Text style={styles.profileStatsTitle}>Total Points</Text>
                <Text style={styles.profileStatsText}>{totalPoints}</Text>
              </View>
              <View style={styles.statsColumns}>
                <Text style={styles.profileStatsTitle}>Rank</Text>
                <Text style={styles.profileStatsText}>{rank}</Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.groupsTextContainer}>
          <Text style={styles.groupsText}>Groups</Text>
        </View>
        
        
        {teamsWithCHG.map((team, index) => (
          <View key={index} style={index % 2 === 0 ? styles.group1 : styles.group2}>
            <View style = {index % 2 === 0 ? styles.group1BorderCircle1 : styles.group2BorderCircle1}/> 
            <View style = {index % 2 === 0 ? styles.group1BorderCircle2 : styles.group2BorderCircle2}/>
            <View style = {index % 2 === 0 ? styles.group1BorderCircle3 : styles.group2BorderCircle3}/>
            <Text style={index % 2 === 0 ? styles.group1Text : styles.group2Text}>{team.TeamName}</Text>
            <View style={index % 2 === 0 ? styles.group1StatsContainer : styles.group2StatsContainer}>
              <View style={styles.groupStatsColumns}>
                <Text style={index % 2 === 0 ? styles.group1StatsTitle : styles.group2StatsTitle}>PTS</Text>
                <Text style={index % 2 === 0 ? styles.group1StatsText : styles.group2StatsText}>{team.points}</Text>
              </View>
              <View style={styles.groupStatsColumns}>
                <Text style={index % 2 === 0 ? styles.group1StatsTitle : styles.group2StatsTitle}>POS</Text>
                <Text style={index % 2 === 0 ? styles.group1StatsText : styles.group2StatsText}>{team.rank}</Text>
              </View>

              <View style={styles.groupStatsColumns}>
                <Text style={index % 2 === 0 ? styles.group1StatsTitle : styles.group2StatsTitle}>CHG</Text>
                <Text style={index % 2 === 0 ? styles.group1StatsText : styles.group2StatsText}>{team.CHG}</Text>
              </View>
            </View>
          </View>
        ))}
        
        <TouchableOpacity  style = {styles.button} onPress={handleLogout}>
          <Text style ={styles.buttonText}>Log out</Text>
          <Icon name="log-out" size={deviceHeight / 40} color='#670038' />
        </TouchableOpacity>
        <View height = {deviceHeight/5.5}/>
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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
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
    width: deviceWidth * 0.095,
    height: deviceWidth * 0.095,
    borderRadius: (deviceWidth * 0.1) / 2,
  },
  
  name: {
    marginTop: deviceHeight / 80,
    fontSize: deviceHeight / 53,
    fontFamily: "manrope",
    fontWeight: "bold",
    color: "black",
  },
  roleText: {
    fontSize: deviceHeight / 80,
    fontFamily: "manrope",
    color: "grey",
  },
  profileContainer: {
    borderRadius: 15,
    width: deviceWidth/1.15,
    height: deviceHeight/2.78,
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

  profileBorderCircle1: {
    position: "absolute",
    bottom: "4%",
    left: "10%",
    width: deviceWidth * 0.4,
    height: deviceWidth * 0.4,
    borderRadius: deviceWidth * 1.6,
    borderWidth: 3,
    borderColor: "white",
    backgroundColor: "transparent",
  },
  profileBorderCircle2: {
    position: "absolute",
    bottom: "4%",
    left: "-15%",
    width: deviceWidth * 0.4,
    height: deviceWidth * 0.4,
    borderRadius: deviceWidth * 1.6,
    borderWidth: 3,
    borderColor: "white",
    backgroundColor: "transparent",
  },
  profileBorderCircle3: {
    position: "absolute",
    bottom: "-15%",
    left: "-2.5%",
    width: deviceWidth * 0.4,
    height: deviceWidth * 0.4,
    borderRadius: deviceWidth * 1.6,
    borderWidth: 3,
    borderColor: "white",
    backgroundColor: "transparent",
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
    flex: 2,
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
  groupsTextContainer:{
    width: '100%',
    marginLeft: '18%',

  },
  groupsText: {
    fontSize: deviceHeight / 38,
    fontFamily: "manrope",
    fontWeight: "light",
    color: "black",
  },
  group1: {
    backgroundColor: "#fff",
    padding: deviceWidth * 0.05,
    borderRadius: 15,
    marginTop: deviceHeight * 0.025,
    marginBottom: deviceHeight * 0.02,
    width: deviceWidth/1.15,
    height: deviceHeight/4.34,
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
    overflow: 'hidden',
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
  group1BorderCircle1: {
    position: "absolute",
    bottom: "4%",
    right: "7%",
    width: deviceWidth * 0.25,
    height: deviceWidth * 0.25,
    borderRadius: deviceWidth * 1.6,
    borderWidth: 3,
    borderColor: "#670038",
    backgroundColor: "transparent",
  },
  group1BorderCircle2: {
    position: "absolute",
    bottom: "4%",
    right: "-15%",
    width: deviceWidth * 0.25,
    height: deviceWidth * 0.25,
    borderRadius: deviceWidth * 1.6,
    borderWidth: 3,
    borderColor: "#670038",
    backgroundColor: "transparent",
  },
  group1BorderCircle3: {
    position: "absolute",
    bottom: "-20%",
    right: "-3.5%",
    width: deviceWidth * 0.25,
    height: deviceWidth * 0.25,
    borderRadius: deviceWidth * 1.6,
    borderWidth: 3,
    borderColor: "#670038",
    backgroundColor: "transparent",
  },
  group1StatsTitle: {
    fontSize: deviceHeight / 52,
    fontFamily: "manrope",
    color: "white",
  },
  group1StatsText: {
    fontSize: deviceHeight / 52,
    fontFamily: "manrope",
    color: "#f1f1f1",
    marginTop: '1.5%'
  },
  groupStatsColumns: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 3
  },
  group2: {
    backgroundColor: "#670038",
    padding: deviceWidth * 0.05,
    borderRadius: 15,
    marginTop: deviceHeight * 0.025,
    marginBottom: deviceHeight * 0.02,
    width: deviceWidth/1.15,
    height: deviceHeight/4.34,
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
    overflow: 'hidden',
  },
  group2BorderCircle1: {
    position: "absolute",
    bottom: "4%",
    right: "7%",
    width: deviceWidth * 0.25,
    height: deviceWidth * 0.25,
    borderRadius: deviceWidth * 1.6,
    borderWidth: 3,
    borderColor: "white",
    backgroundColor: "transparent",
  },
  group2BorderCircle2: {
    position: "absolute",
    bottom: "4%",
    right: "-15%",
    width: deviceWidth * 0.25,
    height: deviceWidth * 0.25,
    borderRadius: deviceWidth * 1.6,
    borderWidth: 3,
    borderColor: "white",
    backgroundColor: "transparent",
  },
  group2BorderCircle3: {
    position: "absolute",
    bottom: "-20%",
    right: "-3.5%",
    width: deviceWidth * 0.25,
    height: deviceWidth * 0.25,
    borderRadius: deviceWidth * 1.6,
    borderWidth: 3,
    borderColor: "white",
    backgroundColor: "transparent",
  },
  group2Text: {
    fontSize: deviceHeight / 40,
    fontFamily: "manrope",
    color: "white",
    fontWeight: "bold",
    marginTop: '2%'
  },
  group2StatsContainer: {
    flexDirection: "row", // added this to layout text and icon horizontally
    justifyContent: "center", // added this to give space between text and icon
    backgroundColor: "white",
    borderRadius: 14,
    padding: deviceWidth * 0.02,
    paddingHorizontal: deviceWidth * 0.04,
    marginTop: "9%",
    width: "87%",
    height: "50%",
    alignItems: "center", // added this to align text and icon vertically
  },

  group2StatsTitle: {
    fontSize: deviceHeight / 52,
    fontFamily: "manrope",
    color: "#670038",
  },
  group2StatsText: {
    fontSize: deviceHeight / 52,
    fontFamily: "manrope",
    color: "#7C7C7C",
    marginTop: '1.5%'
  },
  button: {
    borderRadius: deviceWidth / 35,
    marginTop: deviceHeight * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: deviceWidth * 0.04,
    width: deviceWidth/1.8,
    height: deviceHeight * .07,
    backgroundColor: 'white',
    shadowOffset: {
        width: 0,
        height: 2,
      },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: deviceHeight / 59,
    fontFamily: "manrope",
    color: "#670038",
    fontWeight: 'bold',
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
