import React from "react";
import { View, Text } from "react-native";
import ScreenLinearBackground from "../../Constants/Styling/ScreenLinearBackground";
import { PacmanIndicator } from 'react-native-indicators';

export default function GamesScreen_HomeScreen() {
    return (
        <ScreenLinearBackground>
            <Text>Game Screen Home Screen</Text>
                <PacmanIndicator color={'orange'}/>
        </ScreenLinearBackground>
    )
}