import React, { useState } from "react";
import { View, Text, Button, TextInput, Modal, StyleSheet, Dimensions, TouchableOpacity,
ScrollView, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import lgoodchild from "../assets/lgoodchild.png";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;
const TaskModal = ({ isVisible, task, onClose, onCompleteTask }) => {
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
    onCompleteTask(task.id);
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="slide">
        <View style = {styles.container}>
            <View style = {styles.borderCircle1}/> 
            <View style = {styles.borderCircle2}/>
            <View style = {styles.borderCircle3}/>
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
                        <Text style={styles.pfpText}>May 15, 2023</Text>
                    </View>
                    <View alignItems= {'center'}>
                        <Text style = {styles.dateText}>
                            Assignee
                        </Text>
                        <Image style={styles.avatar} source={lgoodchild} />
                    </View>
                </View>
                <View>
                    <Text style = {styles.dateText}>Description</Text>
                    <Text style = {styles.descriptionText}>{task.description}</Text>
                </View>
                <View marginTop = {deviceHeight/35} marginBottom = {deviceHeight/35}>
                    <Text style = {styles.dateText}>Point Total</Text>
                    <Text style = {styles.descriptionText}>{task.points}</Text>
                </View>
                {(!task.questions || task.questions.length === 0) ? (
                    <View marginBottom = {deviceHeight/45}>
                        <TextInput 
                        style = {styles.oneInput}
                        value={answers[0]} 
                        onChangeText={text => handleInputChange(text, 0)}
                        placeholder={`Your Answer`}
                        keyboardType="numeric"
                        />
                    </View>
                    ) : (
                    task.questions.map((question, i) => (
                        <View key={i} marginBottom = {deviceHeight/45}>
                        <Text style = {styles.inputText}>{question.text}</Text>
                        <TextInput 
                            style = {styles.input}
                            value={answers[i]} 
                            onChangeText={text => handleInputChange(text, i)}
                            placeholder={`Your Answer`}
                            keyboardType="numeric"
                        />
                        </View>
                    ))
                )}
                
                <View alignItems = {'center'} justifyContent = {'center'}>
                    <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
                <View height = {deviceHeight/8.5}/>
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
    borderCircle1: {
        position: "absolute",
        top: "-4%",
        right: "-6%",
        width: deviceWidth * 0.5,
        height: deviceWidth * 0.5,
        borderRadius: deviceWidth * 1.6,
        borderWidth: 3.5,
        borderColor: "#670038",
        backgroundColor: "transparent",
      },
      borderCircle2: {
        position: "absolute",
        top: "-2%",
        right: "-25%",
        width: deviceWidth * 0.5,
        height: deviceWidth * 0.5,
        borderRadius: deviceWidth * 1.6,
        borderWidth: 3.5,
        borderColor: "#670038",
        backgroundColor: "transparent",
      },
      borderCircle3: {
        position: "absolute",
        top: "-16%",
        right: "-7%",
        width: deviceWidth * 0.5,
        height: deviceWidth * 0.5,
        borderRadius: deviceWidth * 1.6,
        borderWidth: 3.5,
        borderColor: "#670038",
        backgroundColor: "transparent",
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
        fontSize: deviceHeight / 55,
        fontFamily: "manrope",
        color: "grey",
    },
    pfpText:{
        marginTop: deviceHeight / 35,
        fontSize: deviceHeight / 50,
        fontFamily: "manrope",
        color: "black",
    },
    avatar:{
        marginTop: deviceWidth/50,
        width: deviceWidth * 0.13,
        height: deviceWidth * 0.13,
        borderRadius: (deviceWidth * 0.1),
    },
    descriptionText:{
        marginTop: (deviceHeight / 100),
        fontSize: deviceHeight / 50,
        fontFamily: "manrope",
        color: "black",
    },
    inputText:{
        marginBottom: (deviceHeight / 65),
        fontSize: deviceHeight / 55,
        fontFamily: "manrope",
        color: "black",
    },
    oneInput: {
        alignItems: 'flex-start',
        //width: '50%',
        height: deviceHeight * .22,
        borderColor: "#ccc",
        borderWidth: deviceHeight / 1000,
        padding: "5%",
        //paddingLeft: '15%',
        backgroundColor: 'white',
        borderRadius: deviceWidth / 40,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 3.62,
        elevation: 4,
    },
    input: {
        //width: '50%',
        height: deviceHeight * .06,
        borderColor: "#ccc",
        borderWidth: deviceHeight / 1000,
        padding: "5%",
        //paddingLeft: '15%',
        backgroundColor: 'white',
        borderRadius: deviceWidth / 40,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 3.62,
        elevation: 4,
    },
    loginButton: {
        backgroundColor: '#552448',
        borderRadius: deviceWidth / 30,
        marginTop: deviceHeight/28,
        justifyContent: 'center',
        alignItems: 'center',
        width: deviceWidth/1.6,
        height: deviceHeight/18,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 3.62,
        elevation: 4,
      },
      buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: deviceHeight / 50,
      },


});
export default TaskModal;
// could be useful
//                    placeholder={`Answer ${i + 1}`}