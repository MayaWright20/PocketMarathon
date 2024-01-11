import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
// import Tts from 'react-native-tts';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import { fetchAudio } from "../../utils/General/fetchAudio";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../Constants/DIMENSIONS";

import ScreenLinearBackground from "../../Constants/Styling/ScreenLinearBackground";
import { writeAudioToFile } from "../../utils/General/writeAudioFile";
import { playFromPath } from "../../utils/General/playFromPath";



export default function PreviousRuns_HomeScreen() {

    // function onPressHandler(){
    //     Tts.setDucking(true);
    //     Tts.setDefaultRate(0.6);
    //     Tts.setDefaultPitch(1.5);
    //     Tts.speak('Hello,dfds world!', {
    //         iosVoiceId: 'com.apple.ttsbundle.Moira-compact',
    //         rate: 0.5,
    //       });
    //     console.log('pressed button for text to speech')
    // }


    return (
        <ScreenLinearBackground>
            <Text>PreviousRuns_HomeScreen</Text>
            {/* <Button title="Send message" onPress={onPressHandler} /> */}
        </ScreenLinearBackground>
    )
};

const styles = StyleSheet.create({

});