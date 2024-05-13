import React, {useEffect, useState} from 'react';
import { Text, StyleSheet, Image, View, Dimensions, ActivityIndicator, ScrollView  } from 'react-native'
import { router, useLocalSearchParams } from "expo-router";
import { Card } from '@rneui/themed';
import { getAlatMusikDetail } from '../request/request'
import { Button, Icon } from 'react-native-elements';
import { Audio } from 'expo-av';

const dimensions = Dimensions.get('screen');

export default  App = () => {
  const item = useLocalSearchParams();
  const id = item.id;
  const [alatMusik, setAlatMusik] = useState([]);
  const [errorStatus, setErrorStatus] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [sound, setSound] = useState(null);

  const getAlatMusikData = (id) => {
    return Promise.all([
      getAlatMusikDetail(id)
    ])
  }

  useEffect(() => {
    getAlatMusikData(id).then(([alatMusikDetail]) => {
      setAlatMusik(alatMusikDetail);
    }).catch((err) => {
      setErrorStatus(err.message);
    }).finally(() => {
      setLoaded(true);
    });

    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, []);

  const playSound = async () => {
    if (!sound) {
      const { sound } = await Audio.Sound.createAsync(
         { uri: `https://appdev161.000webhostapp.com/assets/uploads/${alatMusik.audio_mp3}` },
         { shouldPlay: true }
      );
      setSound(sound);
    }
    await sound.playAsync();
  };

  const pauseSound = async () => {
    if (sound) {
      await sound.pauseAsync();
    }
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
    }
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
                    pathname: `video`,
                    params: alatMusik
                  })}
                icon={
                    <Icon
                    name="play-arrow"
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
            <Card >
              <Card.Title style={styles.textStyle}>AUDIO</Card.Title>
              <Card.Divider />
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Button
                    icon={<Icon name="play-arrow" size={13} color="white" />}
                    buttonStyle={{ backgroundColor: 'blue', marginRight: 5 }}
                    onPress={playSound}
                  />
                  <Button
                    icon={<Icon name="pause" size={13} color="white" />}
                    buttonStyle={{ backgroundColor: 'orange', marginHorizontal: 5 }}
                    onPress={pauseSound}
                  />
                  <Button
                    icon={<Icon name="stop" size={13} color="white" />}
                    buttonStyle={{ backgroundColor: 'red', marginLeft: 5 }}
                    onPress={stopSound}
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
  
}
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
