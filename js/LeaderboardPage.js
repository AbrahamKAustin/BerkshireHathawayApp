import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image, 
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const LeaderboardPage = ({ navigation }) => {
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


      const FloatingNavBar = ({ navigation }) => {
        return (
          <SafeAreaView style={styles.navBarContainer}>
            <TouchableOpacity
              style={styles.navBarButton}
              onPress={() => navigation.navigate("TasksPage")}>
              <Icon name="calendar" size={deviceHeight / 38} color="#670038" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.selectedNavBarButton}
              onPress={() => navigation.navigate("LeaderboardPage")}>
              <Icon name="podium" size={deviceHeight / 38} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navBarButton}
              onPress={() => navigation.navigate("AnalyticsPage")}>
              <Icon name="trending-up" size={deviceHeight / 38} color="#670038" />
            </TouchableOpacity>
          </SafeAreaView>
        );
      };
        
    let realtors = [];
    for(let i = 0; i < group.tasks.length; i++) {
        realtors.push(group.tasks[i]);
    }

  return (
    <View style = {styles.container}>
        <ScrollView style={styles.todoContainer}>
            <View style={styles.circlesContainer}>
                <View style={styles.circle} />
            </View>
            <View style={styles.topContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Home")}>
                <Icon name="arrow-back" size={deviceHeight / 38} color="white" />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                  <Text style={styles.titleText}>LEADERBOARD</Text>
                  <Text style={styles.groupText}>{group.name}</Text>
                </View>
            </View>


            <View style={styles.topThree}>
                <View style = {styles.twoContainer}>
                    <Image style={styles.avatar} source={require("../assets/suburbanhome.png")} />
                    <Text style= {styles.topThreeName}> Liz Goodchild</Text>
                    <Text style= {styles.topThreePoints}> 3780</Text>
                    <TouchableOpacity style = {styles.silverContainer}>
                        <Text style = {styles.twoText}>2</Text>

                    </TouchableOpacity>

                </View>
                <View style = {styles.oneContainer}>
                    <Image style={styles.avatar} source={require("../assets/suburbanhome.png")} />
                    <Text style= {styles.topThreeName}> Liz Goodchild</Text>
                    <Text style= {styles.topThreePoints}> 3780</Text>
                    <TouchableOpacity style = {styles.goldContainer}>
                        <Text style = {styles.oneText}>1</Text>
                    </TouchableOpacity>

                </View>
                <View style = {styles.threeContainer}>
                    <Image style={styles.avatar} source={require("../assets/suburbanhome.png")} />
                    <Text style= {styles.topThreeName}> Liz Goodchild</Text>
                    <Text style= {styles.topThreePoints}> 3780</Text>
                    <TouchableOpacity style = {styles.bronzeContainer}>
                        <Text style = {styles.threeText}>3</Text>

                    </TouchableOpacity>

                </View>

            </View>

            <View style={styles.normalRealtorsContainer}>
            {realtors.map((task) => {
                if (task.id >= 4) {

                    return (
                        <TouchableOpacity style = {styles.normalRealtor} onPress={() => navigation.navigate("Home")}>
                            <View style = {styles.top}>
                                <View width = '10%' marginRight = {deviceWidth/30}>
                                        <Text style = {styles.rankText}> {task.id}</Text>
                                </View>
                                <Image style={styles.avatar} source={require("../assets/suburbanhome.png")} />
                                <View width = '53%' marginLeft = {deviceWidth/30}>
                                    <Text style = {styles.normalNameText}> {task.task}</Text>
                                </View>
                                <Text style = {styles.normalPointsText}> {task.points}</Text>
                            </View>
                            <View style = {styles.bottom}>
                                <Text style = {styles.viewStatsText}>View stats</Text>
                                <View style={{flex: 2/3, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: deviceWidth/9.5}}>
                                    <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={require("../assets/niceArrow.png")} />
                                </View>

                            </View>       
                        </TouchableOpacity>                    
                    );
                }
            })}
            </View>
        </ScrollView>

        <FloatingNavBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    overflow:'hidden'
  },  
  circlesContainer: {
    position: "absolute",
    top: -(deviceWidth*1.85),
    alignItems: "center",
    width: "100%",
  },
  circle: {
    width: deviceWidth*3,
    height: deviceWidth*3,
    borderRadius: deviceWidth *20,
    backgroundColor: "#791248",
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
    bottom: '20%',
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
  todoContainer: {
    flex: 1,
    width: deviceWidth,
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#ddd",
  },
  topThree: {
    flexDirection: 'row',
    height: deviceHeight/2.8,
    paddingLeft: deviceWidth * .088,
    paddingRight: deviceWidth * .088,
  },
  threeContainer:{
    flexDirection: 'column',
    width: '33%',
    height: '100%',
    alignItems:'center',
    paddingTop: deviceHeight/8,
    overflow:'hidden'

  },
  twoContainer:{
    flexDirection: 'column',
    width: '33%',
    height: '100%',
    alignItems:'center',
    paddingTop: deviceHeight/10,
    overflow:'hidden'
  },
  oneContainer:{
    flexDirection: 'column',
    width: '33%',
    height: '100%',
    alignItems:'center',
    paddingTop: deviceHeight/17,
    overflow:'hidden',

  },
  topThreeName: {
    marginTop:deviceHeight/100,
    fontSize: deviceHeight / 60,
    fontFamily: "manrope",
    fontWeight: "bold",
    color: "white",


  },
  topThreePoints: {
    fontSize: deviceHeight / 45,
    fontFamily: "manrope",
    fontWeight: "bold",
    color:'white',
  },
  oneText: {
    fontSize: deviceHeight / 8,
    fontFamily: "manrope",
    fontWeight: "bold",
    color:'white',
  },
  twoText: {
    fontSize: deviceHeight / 12,
    fontFamily: "manrope",
    fontWeight: "bold",
    color:'white',
  },
  threeText: {
    fontSize: deviceHeight / 15,
    fontFamily: "manrope",
    fontWeight: "bold",
    color:'white',
  },
  avatar: {
    width: deviceWidth * 0.1,
    height: deviceWidth * 0.1,
    borderRadius: (deviceWidth * 0.12) / 2,
  },
  goldContainer:{
    borderTopRightRadius: deviceWidth/40,
    borderTopLeftRadius: deviceWidth/40,
    width:'100%',
    height:'57%',
    backgroundColor:'#FFD54B',
    marginTop: deviceHeight/50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  silverContainer:{
    borderTopRightRadius: deviceWidth/40,
    borderTopLeftRadius: deviceWidth/40,
    width:'100%',
    height:'49%',
    backgroundColor:'#8E8E8E',
    marginTop: deviceHeight/50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bronzeContainer:{
    borderTopRightRadius: deviceWidth/40,
    borderTopLeftRadius: deviceWidth/40,
    width:'100%',
    height:'43%',
    backgroundColor:'#96542F',
    marginTop: deviceHeight/50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  normalRealtorsContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginBottom: deviceHeight/6,
    alignItems: 'center',
  },
  normalRealtor: {
    backgroundColor: "white",
    height: deviceHeight/9,    
    width: deviceWidth/1.17,
    marginBottom: deviceHeight/60,
    padding: deviceHeight/80 ,
    borderRadius: deviceWidth/40,
    shadowColor: "#000",
    shadowOffset: {
        width: -10,
        height: 0,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.00,
  },
  top:{
    width: '100%',
    height: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottom:{
    width: '100%',
    //height: '20%',
    flexDirection: 'row',
  },
  normalNameText: {
    fontSize: deviceHeight / 50,
    fontFamily: "manrope",
    fontWeight: "bold",
    color: "black",
  },
  rankText: {
    fontSize: deviceHeight / 36,
    fontFamily: "manrope",
    fontWeight: "bold",
    color: "black",
  },
  normalPointsText: {
    justifyContent: 'flex-end',
    fontSize: deviceHeight / 43,
    fontFamily: "manrope",
    fontWeight: "bold",
    color: "#791248", 
    marginTop: deviceHeight/70,
  },
  viewStatsText: {
    fontSize: deviceHeight / 62,
    fontFamily: "manrope",
    color: "#B7B7B7", 
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

export default LeaderboardPage;
