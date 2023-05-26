import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const TasksPage = ({ navigation }) => {
  const [group, setGroup] = useState("Battle of the Generations");
  const [tasks, setTasks] = useState([
    { id: 1, task: 'High priority Task 1', isCompleted: false},
    { id: 2, task: 'High priority Task 1', isCompleted: true},
    { id: 3, task: 'High priority Task 1', isCompleted: true},
    { id: 4, task: 'High priority Task 1', isCompleted: false},
    { id: 5, task: 'High priority Task 1', isCompleted: false},
    { id: 6, task: 'High priority Task 1', isCompleted: false},
    { id: 7, task: 'High priority Task 1', isCompleted: false},
    { id: 8, task: 'High priority Task 1', isCompleted: false},
    { id: 9, task: 'High priority Task 1', isCompleted: false},
    { id: 10, task: 'High priority Task 1', isCompleted: false},
    { id: 11, task: 'High priority Task 1', isCompleted: false},
    { id: 12, task: 'High priority Task 1', isCompleted: false},
    { id: 13, task: 'High priority Task 1', isCompleted: false},
    { id: 14, task: 'High priority Task 1', isCompleted: false},
    { id: 15, task: 'High priority Task 1', isCompleted: false},
    ]);
    const [filter, setFilter] = useState('all');
    const [allTasksActive, setAllTasksActive] = useState(true);
    const [incompleteTasksActive, setIncompleteTasksActive] = useState(false);
    const highPriorityBackgroundColors = ["#EFE4DB", "#EADBEF", "#DBE5EF", "#EFEDDB", "#DBEFE7"];

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

            <Text style = {styles.highPriorityText}>High Priority</Text>
            <View style={styles.highPriorityTasksContainer}>
                <ScrollView horizontal = {true} showsHorizontalScrollIndicator = {false}>
                    {filteredTasks.map((task) => {
                        if (task.id < 6) {
                            let taskStatus;
                            if(task.isCompleted) {
                                taskStatus = 'Completed';
                            } else {
                                taskStatus = 'Incomplete';
                            }

                            return (
                                <TouchableOpacity activeOpacity={0.5} onPress={() => console.log(`Task ${task.id} pressed!`)}>
                                <View style={[styles.highPriorityTask, {backgroundColor: highPriorityBackgroundColors[task.id % 5]}]}>
                                    <Text>{task.task}</Text>
                                    <Text>{taskStatus}</Text>
                                </View>
                                </TouchableOpacity>
                            );
                        }
                    })}
                </ScrollView>
            </View>

            <View style={styles.normalTasksContainer}>
            {filteredTasks.map((task) => {
                if (task.id >= 6) {
                let taskStatus;
                if(task.isCompleted) {
                    taskStatus = 'Completed';
                } else {
                    taskStatus = 'Incomplete';
                }

                return (
                    <View style={styles.normalTask}>
                        <Text>{task.task}</Text>
                        <Text>{taskStatus}</Text>
                    </View>
                );
                }
            })}
            </View>
        </ScrollView>
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
  highPriorityText: {
    fontSize: deviceHeight / 52,
    fontFamily: "manrope",
    fontWeight: "light",
    color: "black",
    marginLeft: '6%',
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
  },
  normalTask: {
    backgroundColor: "white",
    height: deviceHeight/7,    
    width: deviceWidth/1.17,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    padding: 10,
    borderRadius: deviceWidth/40,
  },
});

export default TasksPage;
