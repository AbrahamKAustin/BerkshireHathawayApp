import React, { useState } from "react";
import { View, Text, Button, TextInput, Modal, StyleSheet, Dimensions, TouchableOpacity,
ScrollView, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import lgoodchild from "../assets/lgoodchild.png";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;
const TaskModal = ({ isVisible, task, onClose }) => {
  // Assume each task may have multiple questions
  const [answers, setAnswers] = useState(
    task.questions ? task.questions.map(q => q.answer) : []
  );

  const handleInputChange = (text, index) => {
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[index] = text;
      return newAnswers;
    });
  };

  const handleSubmit = () => {
    console.log(`Answers for task ${task.id}: `, answers);
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="slide">
        <View style = {styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, margin: deviceWidth/18}}>

                <View style = {styles.topContainer}>
                    <TouchableOpacity onPress={onClose}>
                        <Icon name="arrow-down" size={deviceHeight / 28} color="black" marginTop = {deviceHeight/80}/>
                    </TouchableOpacity>
                </View>
                <View style = {styles.titleContainer}>
                    <Text style = {styles.titleText}>{task.task}</Text>
                </View>
                <View style= {styles.dateContainer}>
                    <View >
                        <Text style={styles.dateText}>Date</Text>
                        <Text style={styles.descriptionText}>May 15, 2023</Text>
                    </View>
                    <View alignItems= {'center'}>
                        <Text style = {styles.dateText}>
                            Assignee
                        </Text>
                        <Image style={styles.avatar} source={lgoodchild} />
                    </View>
                </View>
                {task.questions && task.questions.map((question, i) => (
                <View key={i}>
                    <Text>{question.text}</Text>
                    <TextInput 
                    value={answers[i]} 
                    onChangeText={text => handleInputChange(text, i)}
                    placeholder={`Answer ${i + 1}`}
                    />
                </View>
                ))}
                <Button title="Submit" onPress={handleSubmit} />
            </ScrollView>
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#EADBEF",
      alignItems: "center",
      
    },
    topContainer: {
        width: deviceWidth/1.2,
        height: deviceHeight * 0.1,
        //padding: deviceWidth * 0.075,
        //backgroundColor: 'white',
    },

    titleContainer: {
        width: "70%",
        numberOfLines: 2,
        ellipsizeMode: "tail",
        marginBottom: deviceHeight/40
    },
    titleText: {
        fontSize: deviceHeight / 27,
        fontFamily: "manrope",
        fontWeight: "bold",
        color: "black",
    },
    dateContainer: {
        width: deviceWidth*.86,
        height: deviceHeight * 0.08,
        //backgroundColor: 'white',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: deviceHeight/18,
    },
    dateText:{
        //marginLeft: deviceWidth / 30,
        fontSize: deviceHeight / 65,
        fontFamily: "manrope",
        color: "grey",
    },
    descriptionText:{
        marginTop: deviceHeight / 50,
        fontSize: deviceHeight / 50,
        fontFamily: "manrope",
        color: "black",
    },
    avatar:{
        marginTop: deviceWidth/50,
        width: deviceWidth * 0.1,
        height: deviceWidth * 0.1,
        borderRadius: (deviceWidth * 0.1) / 2,
    }


});
export default TaskModal;
