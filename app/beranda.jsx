import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity,TouchableHighlight, Alert, SafeAreaView, Dimensions, Linking } from 'react-native';
import { router } from "expo-router";

const Separator = () => <View style={styles.separator} />;
const windowWidth = Dimensions.get('window').width/3;

export default class App extends React.Component {
  render() {
    return (
      <ImageBackground
        source={require('../assets/images/bg2.png')}
        style={styles.background}
      >
        <SafeAreaView style={styles.container}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          >
          </Image>
          <Text style={styles.text}>ALAT MUSIK TRADISONAL DAYAK</Text>

          <TouchableOpacity 
            onPress={() => router.push("menu")
          }
        >
            <Text style={styles.signup}>Alat Musik Tradisional Dayak</Text>
          </TouchableOpacity>
                  <View style={styles.bottomView}>

          <TouchableHighlight onPress={() => Linking.openURL('mailto:denzkiizooeden@gmail.com')}>
          <Image
            style={styles.tinyLogo}
            source={require('../assets/images/003-email.png')
          }
          />
        </TouchableHighlight>
        <Separator/>
        <TouchableHighlight onPress={() => Linking.openURL('whatsapp://send?text=Hello&phone=0895337907745')}>
          <Image
            style={styles.tinyLogo}
            source={require('../assets/images/001-whatsapp.png')}
          />
        </TouchableHighlight>
         <Separator/>
         <TouchableHighlight onPress={() => Linking.openURL("fb://profile/100003860259753")}>
          <Image
            style={styles.tinyLogo}
            source={require('../assets/images/002-facebook.png')}
          />
        </TouchableHighlight>
         <Separator/>
         <TouchableHighlight onPress={() => Linking.openURL('instagram://user?username=Edentrii')}>
          <Image
            style={styles.tinyLogo}
            source={require('../assets/images/004-instagram.png')}
          />
          </TouchableHighlight>
          
        </View>

        </SafeAreaView>
        <Text style={styles.textVersion}>Beta Version 0.1</Text>

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
    background: {
      width: '100%',
      height: '100%'
    },
    container:{
      alignItems: 'center',
    },
    logo:{
      width: 280,
      height: 280,
      marginTop: '10%'
    },
    text: {
      color: 'black', 
      fontSize: 20, // Increased font size for better visibility
      fontWeight: 'bold',
      marginTop: '-25%',
    },
    textVersion: {
      color: 'blue',
      position: 'absolute', //Here is the trick
      bottom: 0, //Here is the trick,
      marginLeft: windowWidth
    },
    signup: {
      backgroundColor: 'white',
      color: 'black',
      width: "75%",
      borderRadius: 25,
      textAlign: 'center',
      fontWeight: 'bold',
      padding: "4%",
      fontSize:  17,
      marginTop: '70%'
    },
    separator: {
      marginHorizontal: 5,
    },
    tinyLogo: {
      width: 30,
      height: 30,
    },
    bottomView: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute', //Here is the trick
      bottom: -70, //Here is the trick
      flexDirection:'row',
      flexWrap:'wrap',

    },
});
