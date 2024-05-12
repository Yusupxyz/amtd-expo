import { router, useLocalSearchParams } from "expo-router";
import React, {useEffect, useState} from 'react';
import { Text, StyleSheet, Image, View, Dimensions, ActivityIndicator, ScrollView  } from 'react-native'
import { Card } from '@rneui/themed';
import { getAlatMusikDetail } from './request/request'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Sound from 'react-native-sound';

const dimensions = Dimensions.get('screen');
Sound.setCategory('Playback', true); 

const App = () => {
  const local = useLocalSearchParams();
  console.log("Local:", local.id);
  const [alatMusik, setAlatMusik] = useState([]);
  const [errorStatus, setErrorStatus] = useState(null);
  const [loaded, setLoaded] = useState(false);
  
  const getAlatMusikData = (id) => {
    return Promise.all([
      getAlatMusikDetail(id)
    ])
  }

  useEffect(() => {
    getAlatMusikData(id).then(([alatMusikDetail]) => {
      console.log(alatMusikDetail);
      setAlatMusik(alatMusikDetail);
      ding.setVolume(1);
    }).catch((err) => {
        setErrorStatus(err.message);
    }).finally(() => {
      setLoaded(true);
      ding.release();
    })
  }, [])
  var ding = new Sound(`https://appdev161.000webhostapp.com/assets/uploads/${alatMusik.audio_mp3}`, '', (error) => {
      if (error) {
        console.log(`failed to load the sound${alatMusik.audio_mp3}`, error);
        return;
      }
      // when loaded successfully
      console.log('duration in seconds: ' + ding.getDuration() + 'number of channels: ' + ding.getNumberOfChannels());
    });
  const play = () => {
      ding.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    };

    const pause = () => {
      ding.pause(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    };

    const stop = () => {
      ding.stop(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    };

  return (
    <>
    {!errorStatus && loaded && (
    <ScrollView style={styles.scrollSet}>

      <Image style={styles.image} 
                    source={{uri: `https://appdev161.000webhostapp.com/assets/uploads/${alatMusik.gambar}`}}
                    ></Image>
      <View style={styles.containerMain}>
        <View style={styles.containerDesc}>
          <View style={styles.titlePad}>
            <Text style={styles.title}>{alatMusik.nama_alat_musik}</Text>
          <Text style={styles.description}>
              
          {alatMusik.isi}
          
          </Text>
          </View>

        </View>
        <View style={styles.card}>
          <Card>
            <Card.Title style={styles.textStyle}>VIDEO</Card.Title>
            <Card.Divider />
            
            <Button

              onPress={() => 
                  router.push({
                      pathname: "video",
                      params: {source: alatMusik.video}
                  })}
              icon={
                  <Icon
                  name="play"
                  size={15}
                  color="white"
                  />
              }
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
                backgroundColor: 'black'
              }}
            />
          </Card>
          <Card>
            <Card.Title style={styles.textStyle}>AUDIO</Card.Title>
            <Card.Divider />
              <View style={styles.containerMain}>
            <Button
            buttonStyle={{color:'black'}}
              containerStyle={{marginHorizontal:3}}
              buttonStyle2={{
                  borderRadius: 0,
                  backgroundColor: 'black'
                }}
            onPress={play}
              icon={
                  <Icon
                  name="play"
                  size={13}
                  color="white"
                  />
              }
              
              />
              <Button
                              containerStyle={{marginHorizontal:3}}
                              buttonStyle={{
                                  borderRadius: 0,
                                  backgroundColor: 'black'
                                }}
            onPress={pause}
              icon={
                  <Icon
                  name="pause"
                  size={13}
                  color="white"
                  />
              }
              />
              <Button
                              containerStyle={{marginHorizontal:3}}
                              buttonStyle={{
                                  borderRadius: 0,
                                  backgroundColor: 'black'
                                }}
            onPress={stop}
              icon={
                  <Icon
                  name="stop"
                  size={13}
                  color="white"
                  />
              }
              />
              </View>
          </Card>
        </View>
      </View>
      
    </ScrollView>
  )}
  {!loaded && (
    <ActivityIndicator size={'large'} style={{opacity:1}} color={'#999999'}/>
  )}
  {errorStatus && <Error errorMessage={errorStatus} />}
  </>
  );
};

const styles = StyleSheet.create({
container:{
  justifyContent: 'center',
  flex : 1,
  alignItems: 'center'
},
containerMain: {
  flexDirection: 'row',
},
scrollSet:{
  backgroundColor:'#d8d0ad'
},
containerDesc: {
  width: dimensions.width / 1.7
},
title: {
  fontSize: 17,
  fontWeight: 'bold',
  color: '#1c1c1c',
  padding: 10,
  backgroundColor: 'white',
  textAlign:'center'
},
image: {
  height: dimensions.height / 2.5,
  width: dimensions.width-20,
  margin: 10,
},
description: {
  padding: 10,
  color: '#1c1c1c',
  backgroundColor: 'white',
},
card: {
  width:dimensions.width / 2.3,
},
textStyle: {
  fontSize:15
},
cardImage : {
  height:70,
  padding: 0
},
titlePad: {
  marginLeft: 10,
  paddingTop: 15
},

text: {
  color: 'black',
  fontFamily: 'Cochin',
  fontSize: 25,
  fontWeight: 'bold',
  marginLeft: 10
},
});

export default App;

