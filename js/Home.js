import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";


let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const Home = ({ navigation }) => {
  const [points, setPoints] = useState(0);
  const [rank, setRank] = useState('Beginner');

  const [post, setPost] = useState({
    name: 'Liz Goodchild',
    groupName: 'Battle of the Generations',
    posterName: 'Poster Name',
    posterAvatar: require('../assets/lgoodchild.png'),
    postImage: require('../assets/books.png'),
    startDate: '05/23'
  });

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Home</Text>
        <View style={styles.pointContainer}>
          <Text style={styles.pointText}>{'Points:\t'} {points}{'\t|\tRank:\t'} {rank}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.groupContainer}>
        <View style={styles.topGroupContainer}>
          <Image
            style={styles.avatar}
            source={post.posterAvatar}
          />
          <View justifyContent ={'center'} padding = '2%'>
            <Text style={styles.name}>{post.name}</Text>
            <Text style={styles.greyName}>{'Posted by'}</Text>
          </View>
        </View>
        <View style = {styles.midGroupContainer}>
          <View style = {styles.textContainer}>
            <Text style={styles.groupName} numberOfLines={2} ellipsizeMode="tail">
              {post.groupName}
            </Text>
          </View>
          <View justifyContent ={'center'} >
            <Text style={styles.name}>{post.startDate}</Text>
            <Text style={styles.greyName}>{'Start Date'}</Text>
          </View>
        </View>
        <Image
          style={styles.postImage}
          source={post.postImage}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    alignItems: "center",
    //justifyContent: "center",
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: deviceWidth,
    height: deviceHeight * 0.17,
    padding: deviceWidth * 0.05,
  },
  titleText: {
    fontSize: deviceHeight / 30,
    fontFamily: 'manrope',
    fontWeight: "bold",
    color: 'black',
  },
  pointContainer: {
    backgroundColor: '#670038',
    borderRadius: 50,  // Gives the oval shape
    width: '45%',
    height: deviceHeight/22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointText: {
    fontSize: deviceHeight / 80,
    fontFamily: 'manrope',
    color: 'white',
  },
  groupContainer: {
    flexDirection: 'column',
    //justifyContent: 'center',
    //alignItems: 'center',
    padding: deviceWidth * 0.05,
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: deviceHeight * 0.05,
    width: '87%',
   // flexWrap: 'wrap',
    height: '40%',
  },
  topGroupContainer:{
    //backgroundColor: '#eee',
    //borderRadius: 50,  // Gives the oval shape
    //width: '45%',
    flexDirection: 'row',
    height: deviceHeight/18,
    alignItems: 'center',
    marginBottom: '5%',
    //padding: deviceWidth/1,
    //justifyContent: 'center',
  },
  avatar: {
    width: deviceWidth * 0.1,
    height: deviceWidth * 0.1,
    borderRadius: (deviceWidth * 0.1) / 2,
  },
  name:{
    marginLeft: deviceWidth/30,
    marginTop: deviceHeight/80,
    fontSize: deviceHeight / 53,
    fontFamily: 'manrope',
    fontWeight: 'bold',
    color: 'black',
  },  
  greyName: {
    marginLeft: deviceWidth/30,
    fontSize: deviceHeight / 80,
    fontFamily: 'manrope',
    color: 'grey',
  },
  midGroupContainer:{
    //backgroundColor: '#eee',
    //borderRadius: 50,  // Gives the oval shape
    //width: '45%',
    flexDirection: 'row',
    height: deviceHeight/13,
    alignItems: 'center',
    marginBottom: '5%',
    justifyContent: 'space-around',
  },
  textContainer: {
    width: '60%', // Or any value that suits your design
    // Add other styles as needed
  },  
  groupName: {
    fontSize: deviceHeight / 30,
    fontFamily: 'manrope',
    color: 'black',
  },
  postImage: {
    width: '100%',
    borderRadius: deviceHeight/ 50,
    height: deviceHeight * 0.15,
    marginTop: deviceHeight * 0.02,
  },
  startDate: {
    fontSize: deviceHeight / 50,
    fontFamily: 'manrope',
    color: 'grey',
    marginTop: deviceHeight * 0.02,
  },
  
});

export default Home;
