// import React in our code
import React, { useEffect, useState } from 'react';
import { router } from "expo-router";
import { LogBox } from 'react-native';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { getAlatMusik } from './request/request'
import { FlatGrid } from 'react-native-super-grid';
const placeholderImage = require('../assets/images/placeholder.png')
const logoImage = require('../assets/images/logo.png'); // Pastikan Anda memiliki gambar logo di path yang benar
LogBox.ignoreAllLogs(); // Ini akan menonaktifkan semua peringatan

const App = () => {
  const [id, setId] = useState([]);
  const [errorStatus, setErrorStatus] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [pressedId, setPressedId] = useState(null); // State to track pressed item

  useEffect(() => {
    getAlatMusik().then((datas) => {
      const dataJadi = datas.data.map(item => [
        item.id_alat_musik,
        item.nama_alat_musik,
        item.gambar
      ]);
      setId(dataJadi);
    }).catch((err) => {
      setErrorStatus(err.message);
      console.log(err);
    }).finally(() => {
      setLoaded(true);
    })
  })

  return (
    <>
      {!errorStatus && loaded && (
        <SafeAreaView style={styles.container}>
          {/* AppBar */}
          <View style={styles.appBar}>
            <Image source={logoImage} style={styles.appBarLogo} />
            <Text style={styles.appBarTitle}>Alat Mustik Tradisional Dayak</Text>
          </View>
          <FlatGrid
            itemDimension={130}
            data={id}
            style={styles.gridView}
            // staticDimension={300}
            // fixed
            spacing={10}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <TouchableOpacity
                  onPressIn={() => setPressedId(item[0])}
                  onPressOut={() => setPressedId(null)}
                  onPress={() =>
                    router.push({
                      pathname: `detail/${item[0]}`,
                      params: item
                    })}
                  activeOpacity={0.7}
                  style={{ transform: [{ scale: pressedId === item[0] ? 0.96 : 1 }] }}
                >
                  <Image
                    style={styles.imageThumbnail}
                    source={item[2]
                      ? {
                        uri: 'https://appdev161.000webhostapp.com/assets/uploads/' + item[2]
                      }
                      : placeholderImage
                    }
                  />
                  <Text style={styles.itemCode}>{item[1]}</Text>

                </TouchableOpacity>
              </View>
            )}
          />
        </SafeAreaView>
      )}
      {!loaded && (
        <ActivityIndicator size={'large'} style={{ opacity: 1 }} color={'#999999'} />
      )}
      {errorStatus && <Error errorMessage={errorStatus} />}
    </>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f8f4e1',
  },
  appBar: {
    height: 60,
    backgroundColor: '#d8d0ad',
    alignItems: 'center',
    justifyContent: 'left',
    flexDirection: 'row',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  appBarLogo: {
    width: 50,
    height: 50,
    marginRight: 10,
    paddingHorizontal: 50
  },
  appBarTitle: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,

  },
  text: {
    color: 'black',
    fontFamily: 'Cochin',
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10
  },
  gridView: {
    marginTop: 5,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#d8d0ad',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 16,
    color: '#1c1c1c',
    textAlign: 'center'
  },
});
