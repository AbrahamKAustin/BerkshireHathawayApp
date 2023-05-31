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

const TasksPage = ({ navigation }) => {
  const [group, setGroup] = useState("Battle of the Generations");
  const [tasks, setTasks] = useState([
    { id: 1, task: 'Meaningful Connections', isCompleted: false},
    { id: 2, task: 'Buyer Contract', isCompleted: true},
    { id: 3, task: 'Social Posts', isCompleted: true},
    { id: 4, task: 'Hours Prospecting', isCompleted: false},
    { id: 5, task: 'Direct Mail', isCompleted: false},
    { id: 6, task: 'Buyer Consultations', isCompleted: true},
    { id: 7, task: 'Prospecting Types', isCompleted: false},
    { id: 8, task: 'Leads', isCompleted: false},
    { id: 9, task: "Seller's Appointments", isCompleted: true},
    { id: 10, task: 'Listing Appointments', isCompleted: false},
    { id: 11, task: 'Buyer/Tenant Homes', isCompleted: true},
    { id: 12, task: 'Open House Attendees', isCompleted: false},
    ]);
    const [filter, setFilter] = useState('all');
    const [allTasksActive, setAllTasksActive] = useState(true);
    const [incompleteTasksActive, setIncompleteTasksActive] = useState(false);
    const highPriorityBackgroundColors = ["#EFE4DB", "#EADBEF", "#DBE5EF", "#EFEDDB", "#DBEFE7"];
    const icons = [
        "browsers",
        "book",
        "grid",
        "business",
        "map",
        "paper-plane",
        "clipboard",
      ];
      const highPriorityImages = [
        require("../assets/graph5.png"),
        require("../assets/graph1.png"),
        require("../assets/graph2.png"),
        require("../assets/graph3.png"),
        require("../assets/graph4.png"),
      ];
      const FloatingNavBar = ({ navigation }) => {
        return (
          <SafeAreaView style={styles.navBarContainer}>
            <TouchableOpacity
              style={styles.selectedNavBarButton}
              onPress={() => navigation.navigate("TasksPage")}>
              <Icon name="calendar" size={deviceHeight / 38} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navBarButton}
              onPress={() => navigation.navigate("Signup")}>
              <Icon name="podium" size={deviceHeight / 38} color="#670038" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navBarButton}
              onPress={() => navigation.navigate("Signup")}>
              <Icon name="trending-up" size={deviceHeight / 38} color="#670038" />
            </TouchableOpacity>
          </SafeAreaView>
        );
      };
      
    let incompleteTasksCount = tasks.filter(task => !task.isCompleted).length;
  
    let filteredTasks = [];
    for(let i = 0; i < tasks.length; i++) {
        if(filter === 'all') {
        filteredTasks.push(tasks[i]);
        } else if(filter === 'incomplete' && !tasks[i].isCompleted) {
        filteredTasks.push(tasks[i]);
        }
    }

  return (
    <View style = {styles.container}>
        <ScrollView style={styles.todoContainer}>
            <View style={styles.topContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={deviceHeight / 38} color="black" />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                <Text style={styles.titleText}>TASKS</Text>
                <Text style={styles.groupText}>{group}</Text>
                </View>
            </View>

            <View style={styles.filters}>
                <TouchableOpacity 
                    style={allTasksActive ? styles.filterButtonActive : styles.filterButton} 
                    onPress={() => {
                        setFilter('all');
                        setAllTasksActive(true);
                        setIncompleteTasksActive(false);
                    }}
                >
                    <Text style={allTasksActive ? styles.filterTextActive : styles.filterText}>ALL</Text>
                    <View style = {allTasksActive ? styles.filterNumberActive : styles.filterNumber} >
                        <Text style={allTasksActive ? styles.filterNumberTextActive : styles.filterNumberText}>{tasks.length}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={incompleteTasksActive ? styles.filterButtonActive : styles.filterButton} 
                    onPress={() => {
                        setFilter('incomplete');
                        setAllTasksActive(false);
                        setIncompleteTasksActive(true);
                    }}
                >
                    <Text style={incompleteTasksActive ? styles.filterTextActive : styles.filterText}>TO DO</Text>
                    <View style = {incompleteTasksActive ? styles.filterNumberActive : styles.filterNumber} >
                        <Text style={incompleteTasksActive ? styles.filterNumberTextActive : styles.filterNumberText}>{incompleteTasksCount}</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <Text style = {styles.highPriorityTitleText}>High Priority</Text>
            <View style={styles.highPriorityTasksContainer}>
                <ScrollView horizontal = {true} showsHorizontalScrollIndicator = {false}>
                    {filteredTasks.map((task) => {
                        if (task.id < 6) {
                            return (
                                <View style={[styles.highPriorityTask, {backgroundColor: highPriorityBackgroundColors[task.id % 5]}]}>
                                    <Image source = {highPriorityImages[task.id % 5]} style = {styles.image}/>
                                    <View style= {styles.textContainer}>
                                        <Text style ={styles.highPriorityText}>{task.task}</Text>
                                    </View> 
                                    <TouchableOpacity style = {styles.highPriorityButton} onPress={() => console.log(`Task ${task.id} pressed!`)}>
                                        <Text style ={styles.highPriorityButtonText}>Edit task</Text>
                                        <Icon name="create" size={deviceHeight / 40} color='#670038' />
                                    </TouchableOpacity>                               
                                </View>
                            );
                        }
                    })}
                </ScrollView>
            </View>

            <Text style = {styles.normalPriorityTitleText}>Tasks</Text>
            <View style={styles.normalTasksContainer}>
            {filteredTasks.map((task) => {
                if (task.id >= 6) {

                    return (
                        <View style={styles.normalTask}>
                            <View style={styles.taskLeftContainer}>
                                <Text style ={styles.normalText}>{task.task}</Text>
                                <TouchableOpacity style = {styles.normalButton} onPress={() => console.log(`Task ${task.id} pressed!`)}>
                                    <Text style ={styles.normalButtonText}>Edit task</Text>
                                    <Icon name="create" size={deviceHeight / 40} color='white' />
                                </TouchableOpacity>
                            </View>
        
                            <View style={styles.taskRightContainer}>
                                <Icon name={icons[task.id % icons.length]} size={deviceHeight / 15} color='#670038' />
                            </View>
        
                        </View>
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
    color: "black",
  },
  groupText: {
    fontSize: deviceHeight / 45,
    fontFamily: "manrope",
    fontWeight: "light",
    color: "black",
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
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: deviceWidth,
    padding: 10,
    marginBottom: deviceHeight/ 45,
  },
  filterButtonActive: {
    // style for active button
    borderColor:'#670038',
    borderWidth: deviceWidth / 300,
    borderRadius: deviceWidth / 20,
    marginTop: deviceHeight * 0.01,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: deviceWidth * 0.03,
    width: '38%',
    height: deviceHeight * .048,
    backgroundColor: '#670038',
  },
  filterButton: {
    //padding: 10,
    borderColor: '#670038',
    borderWidth: deviceWidth / 240,
    borderRadius: deviceWidth / 20,
    marginTop: deviceHeight * 0.01,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: deviceWidth * 0.03,
    width: '38%',
    height: deviceHeight * .048,
  },
  filterText: {
    fontSize: deviceHeight / 70,
    fontFamily: "manrope",
    color: "#670038",
  },
  filterTextActive: {
    fontSize: deviceHeight / 70,
    fontFamily: "manrope",
    color: "white",
  },
  filterNumber:{
    //borderWidth: deviceWidth / 300,
    borderRadius: deviceWidth / 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '28%',
    height: deviceHeight * .022,
    backgroundColor: "#670038",
  },
  filterNumberActive:{
    //borderWidth: deviceWidth / 300,
    borderRadius: deviceWidth / 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '28%',
    height: deviceHeight * .022,
    backgroundColor: 'white',
  },
  filterNumberText: {
    fontSize: deviceHeight / 70,
    fontFamily: "manrope",
    color: "white",
  },
  filterNumberTextActive: {
    fontSize: deviceHeight / 70,
    fontFamily: "manrope",
    color: "#670038",
  },
  highPriorityTitleText: {
    fontSize: deviceHeight / 48,
    fontFamily: "manrope",
    fontWeight: "light",
    color: "black",
    marginLeft: '6%',
  },
  normalPriorityTitleText: {
    fontSize: deviceHeight / 48,
    fontFamily: "manrope",
    fontWeight: "light",
    color: "black",
    marginLeft: '6%',
    marginTop: '5%',
    marginBottom: '3%',
  },
  highPriorityTasksContainer: {
    flexDirection: 'row',
    height: deviceHeight/3.35,
    justifyContent: 'space-around',
    marginLeft: '1.5%',
  },
  normalTasksContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginBottom: deviceHeight/6,
    alignItems: 'center',
  },
  highPriorityTask: {
    margin: 10,
    padding: 10,
    marginLeft: deviceWidth/30,
    borderRadius: deviceWidth/20,
    height: deviceHeight/3.6,    
    width: deviceWidth/2.1,
    overflow: 'hidden',
  },
  image: {
    borderRadius: deviceWidth/40,
    resizeMode: 'repeat',
    width: deviceWidth/1.2,
    overflow: 'hidden',
    position: 'absolute',
    top: '0%',
    right: '-190%',
    transform: [{ rotate: '-23deg' }],
    shadowColor: "#000",
    shadowOffset: {
        width: -10,
        height: 0,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.00,
  },
  textContainer: {
    width: "70%",
    numberOfLines: 2,
    ellipsizeMode: "tail",
    marginTop: '10%',
    marginLeft: '5%'
  },
  highPriorityText: {
    fontSize: deviceHeight / 52.5,
    fontFamily: "manrope",
    fontWeight: "bold",
    color: "#670038",
  },
  highPriorityButton: {
    borderRadius: deviceWidth / 35,
    marginTop: deviceHeight * 0.01,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: deviceWidth * 0.04,
    width: deviceWidth/2.5,
    height: deviceHeight * .055,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: '7%',
    left: '9%',
    shadowOffset: {
        width: 0,
        height: 2,
      },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  highPriorityButtonText: {
    fontSize: deviceHeight / 59,
    fontFamily: "manrope",
    color: "#670038",
    fontWeight: 'bold',
  },
  normalTask: {
    backgroundColor: "white",
    height: deviceHeight/6.5,    
    width: deviceWidth/1.17,
    flexDirection: "row",
    //justifyContent: "space-between",
    margin: 10,
    padding: 10,
    borderRadius: deviceWidth/40,
  },  
  taskLeftContainer: {
    width: '75%',
    height: '100%',
    flexDirection: "column",
    justifyContent: "center",
  },
  taskRightContainer: {
    width: '25%',
    height: '100%',
    alignItems: "center",
    justifyContent: "center",
  },
  normalText: {
    fontSize: deviceHeight / 52.5,
    fontFamily: "manrope",
    fontWeight: "bold",
    color: "black",
    position: 'absolute',
    top: '12%',
    left: '5%',
  },
  normalButton: {
    borderRadius: deviceWidth / 35,
    marginTop: deviceHeight * 0.01,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: deviceWidth * 0.04,
    width: deviceWidth/2.2,
    height: deviceHeight * .055,
    backgroundColor: '#670038',
    position: 'absolute',
    bottom: '13%',
    left: '5%',
    shadowOffset: {
        width: 0,
        height: 2,
      },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  normalButtonText: {
    fontSize: deviceHeight / 59,
    fontFamily: "manrope",
    color: "white",
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

export default TasksPage;
/* could be useful later
let taskStatus;
if(task.isCompleted) {
    taskStatus = 'Completed';
} else {
    taskStatus = 'Incomplete';
}

<Text>{taskStatus}</Text>
*/