import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useLocalSearchParams } from "expo-router";

const LoadingText = ({ isLoading }) => {
  if (!isLoading) return null;
  return <Text style={{ color: 'white' }}>Membuka video...</Text>; // Mengatur warna teks menjadi putih
};

const App = () => {
    const source = useLocalSearchParams().video;

    console.log(`https://appdev161.000webhostapp.com/assets/uploads/${source}`);

    if (!source) {
        return <Text>Loading...</Text>; // Atau komponen lain untuk menangani state loading atau error
    }
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true); // Set isPlaying to true to autoplay
    const [isLoading, setIsLoading] = useState(true); // Add a new state for loading
    const [videoStatus, setVideoStatus] = useState({});
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const togglePlay = () => {
        isPlaying ? videoRef.current.pauseAsync() : videoRef.current.playAsync();
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const handlePlaybackStatusUpdate = (status) => {
        setIsPlaying(status.isPlaying);
        setIsLoading(!status.isLoaded); // Update isLoading based on isLoaded status
        setVideoStatus(status);
    };

    const seekVideo = (value) => {
        videoRef.current.setPositionAsync(value * videoStatus.durationMillis);
    };

    const handleFullscreen = () => {
        if (!isFullscreen) {
            videoRef.current.presentFullscreenPlayer();
        } else {
            videoRef.current.dismissFullscreenPlayer();
        }
        setIsFullscreen(!isFullscreen);
    };

    return (
        <View style={styles.contentContainer}>
            <Video
                ref={videoRef}
                style={styles.video}
                source={{ uri: `https://appdev161.000webhostapp.com/assets/uploads/${source}` }}
                resizeMode="cover"
                isLooping
                isMuted={isMuted}
                shouldPlay={isPlaying} // Set shouldPlay to isPlaying to autoplay
                allowsPictureInPicture
                onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
            />
            <LoadingText isLoading={isLoading} />
            <Slider
                style={{ width: 300, height: 40 }}
                minimumValue={0}
                maximumValue={1}
                value={videoStatus.positionMillis / videoStatus.durationMillis}
                onValueChange={seekVideo}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
            />
            <View style={styles.controlsContainer}>
                <TouchableOpacity onPress={togglePlay}>
                    <MaterialIcons name={isPlaying ? 'pause' : 'play-arrow'} size={40} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleMute}>
                    <MaterialIcons name={isMuted ? 'volume-off' : 'volume-up'} size={40} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleFullscreen}>
                    <MaterialIcons name={!isFullscreen ? 'fullscreen' : 'fullscreen-exit'} size={40} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 50,
        backgroundColor: 'black',
    },
    video: {
        width: 350,
        height: 275,
    },
    controlsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
});

export default App
