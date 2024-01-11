import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
<<<<<<< HEAD
// import Tts from 'react-native-tts';
=======
>>>>>>> parent of 7e54dff (added text to speech native plugin and no longer using expo)
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import { fetchAudio } from "../../utils/General/fetchAudio";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../Constants/DIMENSIONS";

import ScreenLinearBackground from "../../Constants/Styling/ScreenLinearBackground";
import { writeAudioToFile } from "../../utils/General/writeAudioFile";
import { playFromPath } from "../../utils/General/playFromPath";


Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    staysActiveInBackground: true,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    playThroughEarpieceAndroid: false
});

export default function PreviousRuns_HomeScreen() {

<<<<<<< HEAD
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
=======
    async function onPressHandler(text: string) {
>>>>>>> parent of 7e54dff (added text to speech native plugin and no longer using expo)

        if (!text) return;

        try{
            console.log('inside try block')
            const audioBlob = await fetchAudio(text);
            console.log('inside try block fetchAudio complete')
            const reader = new FileReader();

            reader.onload = async (e) => {
                if( e.target && typeof e.target.result === "string"){
                    const audioData = e.target.result.split(",")[1];

                    //save data
                    const path = await writeAudioToFile(audioData);

                    //play audio
                    await playFromPath(path);
                    
                }
            };

            reader.readAsDataURL(audioBlob);

        }catch(error){
            console.error(error);
            console.log('ERROR HAS HAPPENED')
        }
    };

    return (
        <ScreenLinearBackground>
            <Text>PreviousRuns_HomeScreen</Text>
<<<<<<< HEAD
            {/* <Button title="Send message" onPress={onPressHandler} /> */}
=======
            <Button title="Send message" onPress={() => onPressHandler("hi test hi hihow are you! Great day aye. I'm Maya and I just got the google API working. HOW EXCITING!!! SHAME it sounds like a robot still. All this work for it to just sound like a bloody robot!")} />
>>>>>>> parent of 7e54dff (added text to speech native plugin and no longer using expo)
        </ScreenLinearBackground>
    )
};

const styles = StyleSheet.create({

});