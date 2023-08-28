import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AuthContext } from "./AuthContext";
import * as SecureStore from 'expo-secure-store';
import { LeaderboardContext } from "./LeaderboardContext";


let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const AnalyticsPage = ({ route, navigation }) => {
  const authContext = useContext(AuthContext);
  const userToken = authContext.userToken;
  const userId = userToken ? userToken.sub : null;
  const { post } = route.params;
  const [weeklyAnalytics, setWeeklyAnalytics] = useState(null);
  const [monthlyAnalytics, setMonthlyAnalytics] = useState(null);
  const { totalPoints, rank } = useContext(LeaderboardContext);


  useEffect(() => {
    SecureStore.getItemAsync('jwt').then(token => {
      fetch('https://goodchildappfunctions.azurewebsites.net/api/getAnalytics/'+ userId + '?code=YoTqDVnV1p8gA6obmLF1RjP6kwT2C6xC9xbPxp-qQKGKAzFu-szkzQ==', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
      .then(response => response.json())
      .then(data => {
        setWeeklyAnalytics(data.weekly);
        setMonthlyAnalytics(data.monthly);


      })
      .catch((error) => {
        console.error('Error:', error);
      });
    });
  }, []);


  console.log('Weekly Analytics', weeklyAnalytics);
  console.log('Monthly Analytics', monthlyAnalytics);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
      if (post.TeamId) {
          SecureStore.getItemAsync('jwt').then(token => {
              fetch('https://goodchildappfunctions.azurewebsites.net/api/team_tasks/' + post.TeamId + '?code=XzIMNOOQTjrYWXU5Stf00E9jaqtIy5YVycqEVeTeQVshAzFu2OF7-w==', {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                  }
              })
              .then(response => response.json())
              .then(data => {
                setTasks(data);                  
              })
              .catch((error) => {
                  console.error('Fetch error:', error);
              });
          });
      } else {
        setTasks([]);
      }
  }, [post.TeamId]);
  console.log('Task Data', tasks)
  const getWeeklyTotalForWeek = (taskName, weekStartDate) => {
    const analyticsEntry = weeklyAnalytics.find(item => item.TaskName === taskName && item.analytics.WeekStartDate === weekStartDate);
    return analyticsEntry ? analyticsEntry.analytics.WeeklyTotal : null;
  };
  
  const getMonthlyAverageForMonth = (taskName, monthStartDate) => {
    const analyticsEntry = monthlyAnalytics.find(item => item.TaskName === taskName && item.analytics.MonthStartDate === monthStartDate);
    return analyticsEntry ? analyticsEntry.analytics.MonthlyAverage : null;
  };

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
                    {post.TeamName}
                  </Text>

                </View>
            </View>
            <View style ={{width: '100%', height: deviceHeight/500, backgroundColor: 'white', marginTop: deviceHeight/60}}/>

            <View style = {styles.bottomOfCurvedContainer}>
              <View style = {styles.curveContainers}>
                <Text style = {styles.curvedText}> Total Points</Text>
                <Text style = {styles.curvedText}>{totalPoints}</Text>

              </View>
              <View style = {styles.curveContainers}>
                <Text style = {styles.curvedText}> Ranking</Text>
                <Text style = {styles.curvedText}> {rank}</Text>
              </View>
            </View>

          </View>
          <View style={styles.analyticsContainer}>
          {tasks.map((task, index) => {
            return (
              <View key={index} style={styles.normalSection}>
                <Text style={styles.analyticsTitle}>{task.TaskName}</Text>
                <View style={{width: '50%', height: deviceHeight/500, backgroundColor: '#b7b7b7', marginTop: deviceHeight/90}}/>
                <View style={styles.semiTitleContainer}>
                  <Text style={styles.semiAnalyticsTitle}>Past 4 weeks:</Text>
                </View>
                <View style={styles.statsContainer}>
                  {[...Array(4)].map((_, weekIndex) => {
                    const weekStartDate = new Date();
                    weekStartDate.setDate(weekStartDate.getDate() - (weekIndex * 7));  
                    const weeklyTotal = getWeeklyTotalForWeek(task.TaskName, weekStartDate.toISOString().split('T')[0]);
                    return (
                      <View key={weekIndex} style={styles.fourStatsContainer}>
                        <Text style={styles.weekMonthText}>{`W${weekIndex + 1}:`}</Text>
                        <Text style={styles.weekMonthStatsText}>{weeklyTotal ? weeklyTotal : 'N/A'}</Text>
                      </View>
                    );
                  })}
                </View>
                <View style={{flexDirection: 'row', marginTop: deviceHeight/30}}>
                  <Text style={styles.monthAvgTitle}>Monthly Average: </Text>
                  <Text style={styles.monthAvgStat}>{task.analytics && task.analytics.MonthlyAverage ? task.analytics.MonthlyAverage : 'N/A'}</Text>
                </View>
                <View style={{width: '35%', height: deviceHeight/500, backgroundColor: '#b7b7b7', marginTop: deviceHeight/90}}/>
                <View style={styles.semiTitleContainer}>
                  <Text style={styles.semiAnalyticsTitle}>Past 4 months:</Text>
                </View>
                <View style={styles.statsContainer}>
                  {[...Array(4)].map((_, monthIndex) => {
                    const monthStartDate = new Date();
                    monthStartDate.setMonth(monthStartDate.getMonth() - monthIndex);
                    monthStartDate.setDate(1);  
                    const monthlyAverage = getMonthlyAverageForMonth(task.TaskName, monthStartDate.toISOString().split('T')[0]); 
                    return (
                      <View key={monthIndex} style={styles.fourStatsContainer}>
                        <Text style={styles.weekMonthText}>{`M${monthIndex + 1}:`}</Text>
                        <Text style={styles.weekMonthStatsText}>{monthlyAverage ? monthlyAverage : 'N/A'}</Text>
                      </View>
                    );
                  })}
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
    borderBottomLeftRadius: 45, 
    borderBottomRightRadius: 45, 
    backgroundColor: '#670038', 
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
    fontFamily: "manrope-extra-light",
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
    fontFamily: "manrope-semi-bold",
    color: "white",
  },
  groupText: {
    fontSize: deviceHeight / 45,
    fontFamily: "manrope-light",
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
    fontFamily: "manrope-bold",
    color: "black",
  },
  semiAnalyticsTitle: {
    fontSize: deviceHeight/ 53 ,
    fontFamily: "manrope-semi-bold",
    color: "#7c7c7c",
  },  
  monthAvgTitle: {
    fontSize: deviceHeight/ 45 ,
    fontFamily: "manrope-semi-bold",
    color: "black",
  },
  monthAvgStat: {
    fontSize: deviceHeight/ 45 ,
    fontFamily: "manrope-medium",
    color: "#791248",
  },
  weekMonthText: {
    justifyContent: 'flex-end',
    fontSize: deviceHeight / 48,
    fontFamily: "manrope-semi-bold",
    color: "black", 
    marginTop: deviceHeight/70,
  },
  weekMonthStatsText: {
    fontSize: deviceHeight / 52,
    fontFamily: "manrope-regular",
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
