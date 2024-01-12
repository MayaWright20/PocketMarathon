import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Tts from 'react-native-tts';
import * as FileSystem from 'expo-file-system';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import { fetchAudio } from "../../utils/General/fetchAudio";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../Constants/DIMENSIONS";

import ScreenLinearBackground from "../../Constants/Styling/ScreenLinearBackground";
import { writeAudioToFile } from "../../utils/General/writeAudioFile";
import { playFromPath } from "../../utils/General/playFromPath";


// Audio.setAudioModeAsync({
//     allowsRecordingIOS: false,
//     staysActiveInBackground: true,
//     playsInSilentModeIOS: true,
//     shouldDuckAndroid: true,
//     playThroughEarpieceAndroid: false
// });

export default function PreviousRuns_HomeScreen() {

    // function onPressHandler(){
    //     Speech.speak('hellow')
    //     // Tts.setDucking(true);
    //     // Tts.setDefaultPitch(1.5);
    //     // Tts.speak('Hello, you world!', {
    //     //     iosVoiceId: 'com.apple.ttsbundle.Moira-compact',
    //     //     rate: 0.5,
    //     //   });
    //     //   Tts.voices().then(voices => console.log('voices',voices));
    // };

   

      async function speak(){
        // const thingToSay = '1 for every no thing today hi';
        // Speech.speak(thingToSay);
        // console.log(await Speech.isSpeakingAsync())
        Tts.setDucking(true);
        Tts.setDefaultPitch(1.2);
        Tts.speak('Hello, you world!', {
            iosVoiceId: 'com.apple.ttsbundle.Moira-compact',
            rate: 0.5,
          });
      }

       
    
    // Tts.speak('Hello, world!');

    return (
        <ScreenLinearBackground>
            <Text>PreviousRuns_HomeScreen hi</Text>
            <Button title="Send message" onPress={speak} />
        </ScreenLinearBackground>
    )
};

const styles = StyleSheet.create({

});