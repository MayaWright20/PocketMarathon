import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SCREEN_HEIGHT } from "../../../../Constants/DIMENSIONS";

export default function IntervalsList(){
    return(
        <View style={styles.container}>
            <Text>IntervalsList</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'yellow',
        marginTop: 20,
        height: SCREEN_HEIGHT / 13
    }
});