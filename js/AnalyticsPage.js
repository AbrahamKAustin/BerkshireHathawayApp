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

const AnalyticsPage = ({ route, navigation }) => {
  const { post } = route.params;
  const [group, setGroup] = useState({
    name: "Battle of the Generations",
    tasks: [
      { 
        id: 1, 
        task: 'Meaningful Connections', 
        points: 234
      },
      { 
        id: 2, 
        task: 'Buyer Contract', 

      },
      { 
        id: 3, 
        task: 'Social Posts', 

      },
      { 
        id: 4, 
        task: 'Hours Prospecting', 
        points:2345
      },
      { 
        id: 5, 
        task: 'Direct Mail', 

      },
      { 
        id: 6, 
        task: 'Buyer Consultations', 

      },
      { 
        id: 7, 
        task: 'Prospecting Types', 

      },
      { 
        id: 8, 
        task: 'Leads', 

      },
      { 
        id: 9, 
        task: "Seller's Appointments", 

      },
      { 
        id: 10, 
        task: 'Listing Appointments', 

      },
      { 
        id: 11, 
        task: 'Buyer/Tenant Homes', 

      },
      { 
        id: 12, 
        task: 'Open House Attendees', 

      },
    ],
  });

  let realtors = [];
  for(let i = 0; i < group.tasks.length; i++) {
      realtors.push(group.tasks[i]);
  }

  const FloatingNavBar = ({ navigation }) => {
    return (
      <SafeAreaView style={styles.navBarContainer}>
        <TouchableOpacity
          style={styles.navBarButton}
          onPress={() => navigation.navigate("TasksPage", {post})}>
          <Icon name="calendar" size={deviceHeight / 38} color="#670038" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navBarButton}
          onPress={() => navigation.navigate("LeaderboardPage", {post})}>
          <Icon name="podium" size={deviceHeight / 38} color="#670038" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.selectedNavBarButton}
          onPress={() => navigation.navigate("AnalyticsPage", {post})}>
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
            <View style ={{width: '100%', height: deviceHeight/500, backgroundColor: 'white', marginTop: deviceHeight/60}}/>

            <View style = {styles.bottomOfCurvedContainer}>
              <View style = {styles.curveContainers}>
                <Text style = {styles.curvedText}> Buyer Contracts</Text>
                <Text style = {styles.curvedText}> 6</Text>

              </View>
              <View style = {styles.curveContainers}>
                <Text style = {styles.curvedText}> Seller's Appointments</Text>
                <Text style = {styles.curvedText}> 12</Text>
              </View>
            </View>

          </View>
          <View style={styles.analyticsContainer}>
            {realtors.map((task) => {
               

                    return (
                        <View style = {styles.normalSection}>
                            <Text style = {styles.analyticsTitle}>{task.task}</Text>
                            <View style ={{width: '50%', height: deviceHeight/500, backgroundColor: '#b7b7b7', marginTop: deviceHeight/90}}/>
                            <View style = {styles.semiTitleContainer}>
                              <Text style = {styles.semiAnalyticsTitle}>Past 4 weeks:</Text>
                            </View>
                            <View style = {styles.statsContainer}>
                              <View style = {styles.fourStatsContainer}>
                                <Text style = {styles.weekMonthText}>W1:</Text>
                                <Text style = {styles.weekMonthStatsText}>12</Text>
                              </View>
                              <View style ={styles.smallLine}/>
                              <View style = {styles.fourStatsContainer}>
                                <Text style = {styles.weekMonthText}>W2:</Text>
                                <Text style = {styles.weekMonthStatsText}>17</Text>
                              </View>
                              <View style ={styles.smallLine}/>
                              <View style = {styles.fourStatsContainer}>
                                <Text style = {styles.weekMonthText}>W3:</Text>
                                <Text style = {styles.weekMonthStatsText}>9</Text>
                              </View>
                              <View style ={styles.smallLine}/>
                              <View style = {styles.fourStatsContainer}>
                                <Text style = {styles.weekMonthText}>W4:</Text>
                                <Text style = {styles.weekMonthStatsText}>14</Text>
                              </View>
                            </View>

                            <View style = {{flexDirection: 'row', marginTop: deviceHeight/30}}>
                              <Text style = {styles.monthAvgTitle}>Monthly Average: </Text>
                              <Text style = {styles.monthAvgStat}>48</Text>
                            </View>
                            <View style ={{width: '35%', height: deviceHeight/500, backgroundColor: '#b7b7b7', marginTop: deviceHeight/90}}/>

                            <View style = {styles.semiTitleContainer}>
                              <Text style = {styles.semiAnalyticsTitle}>Past 4 months:</Text>
                            </View>

                            <View style = {styles.statsContainer}>
                              <View style = {styles.fourStatsContainer}>
                                <Text style = {styles.weekMonthText}>M1:</Text>
                                <Text style = {styles.weekMonthStatsText}>52</Text>
                              </View>
                              <View style ={styles.smallLine}/>
                              <View style = {styles.fourStatsContainer}>
                                <Text style = {styles.weekMonthText}>M2:</Text>
                                <Text style = {styles.weekMonthStatsText}>46</Text>
                              </View>
                              <View style ={styles.smallLine}/>
                              <View style = {styles.fourStatsContainer}>
                                <Text style = {styles.weekMonthText}>M3:</Text>
                                <Text style = {styles.weekMonthStatsText}>33</Text>
                              </View>
                              <View style ={styles.smallLine}/>
                              <View style = {styles.fourStatsContainer}>
                                <Text style = {styles.weekMonthText}>M4:</Text>
                                <Text style = {styles.weekMonthStatsText}>67</Text>
                              </View>
                            </View>
                        </View>                    
                    );
                
            })}
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
    height:deviceHeight/3.9,
    width: deviceWidth,
    borderBottomLeftRadius: 45, // adjust the value as needed
    borderBottomRightRadius: 45, // adjust the value as needed
    backgroundColor: '#670038', // or any other color
    marginBottom:deviceHeight/25,
  },
  topContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: deviceWidth,
    height: deviceHeight * 0.14,
    padding: deviceWidth * 0.05,
  },
  bottomOfCurvedContainer: {
    flexDirection: 'row',
    width: deviceWidth,
    height: deviceHeight * 0.093,
    padding: deviceWidth * 0.05,
  },
  curveContainers:{
    alignItems: "center",
    justifyContent: "center",
    width: '50%',
    height: '100%',
  },
  curvedText: {
    fontSize: deviceHeight / 50,
    fontFamily: "manrope",
    //fontWeight: "bold",
    color: "white",
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
  avatar: {
    width: deviceWidth * 0.1,
    height: deviceWidth * 0.1,
    borderRadius: (deviceWidth * 0.12) / 2,
  },
  analyticsContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginBottom: deviceHeight/6,
    alignItems: 'center',
  },
  normalSection: {
    backgroundColor: "white",
    alignItems: 'center',
    //justifyContent: 'center',
    height: deviceHeight/2.6,    
    width: deviceWidth/1.17,
    marginBottom: deviceHeight/60,
    padding: deviceHeight/50 ,
    borderRadius: deviceWidth/40,
    shadowColor: "#000",
    shadowOffset: {
        width: -10,
        height: 0,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.00,
  },
  semiTitleContainer:{
    width: '100%', 
    height: deviceHeight/30, 
    justifyContent: 'center', 
    margin: deviceWidth/ 100,
  },
  statsContainer:{
    width: '100%', 
    height: deviceHeight/20, 
    flexDirection: 'row'
  },
  fourStatsContainer:{
    width: '25%',
    height: '100%',
    alignItems:'center',
    justifyContent: 'center',
  },
  smallLine:{
    width: deviceWidth/300, 
    height: '70%', 
    backgroundColor: '#b7b7b7', 
    marginTop: deviceHeight/60
  },
  analyticsTitle: {
    marginTop: deviceHeight/ 150,
    fontSize: deviceHeight / 40,
    fontFamily: "manrope",
    fontWeight: "bold",
    color: "black",
  },
  semiAnalyticsTitle: {
    fontSize: deviceHeight/ 53 ,
    fontFamily: "manrope",
    color: "#7c7c7c",
  },  
  monthAvgTitle: {
    fontSize: deviceHeight/ 45 ,
    fontFamily: "manrope",
    fontWeight: "bold",
    color: "black",
  },
  monthAvgStat: {
    fontSize: deviceHeight/ 45 ,
    fontFamily: "manrope",
    fontWeight: "bold",
    color: "#791248",
  },
  weekMonthText: {
    justifyContent: 'flex-end',
    fontSize: deviceHeight / 48,
    fontFamily: "manrope",
    fontWeight: "bold",
    color: "black", 
    marginTop: deviceHeight/70,
  },
  weekMonthStatsText: {
    fontSize: deviceHeight / 48,
    fontFamily: "manrope",
    color: "#791248", 
    marginLeft: deviceWidth/68
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
