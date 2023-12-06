import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SelectSpeedDropDownButton from "./Buttons/SelectSpeedDopDownButton";
import TimeDistanceInputButton from "./Buttons/TimeDistanceInputButton";

export default function CustomiseRunPieChartText(): JSX.Element {

    const [ forIn, setForIn ] = useState('for in');

    return (
        <View style={styles.container}>
            {/* <View style={styles.textWrapper}> */}
                <Text style={styles.text}>I want to </Text>
                <Text style={[styles.text, styles.forIn]}>{forIn}</Text>
                <TimeDistanceInputButton/>
                {/* <SelectSpeedDropDownButton /> */}
                
            {/* </View> */}
            
           
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'pink',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
    },
    forIn:{
        top: 60
    },
    speedcontainer: {
    },
    textContainer: {

    }
});