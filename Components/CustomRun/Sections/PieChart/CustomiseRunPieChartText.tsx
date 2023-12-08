import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import SelectSpeedDropDownButton from "../../Buttons/SelectSpeedDopDownButton";
import TimeDistanceInputButton from "../../Buttons/TimeDistanceInputButton";
import { OptionsContext } from "../../../../Context/CustomRunContext/OptionsContext";


export default function CustomiseRunPieChartText(): JSX.Element {

    const [forIn, setForIn] = useState('for in');
    
    const options = useContext(OptionsContext);

    return (
        <View style={styles.container}>
                {/* <View style={styles.textWrapper}> */}
                <Text style={styles.text}>I want to </Text>
                <Text style={[styles.text, styles.forIn]}>{forIn}</Text>
                
                <TimeDistanceInputButton />
                {/* <SelectSpeedDropDownButton /> */}

                {/* </View> */}
                {/* <Pressable onPress={()=>{console.log('options1', options.arr[0], '\noptions2', options.arr[1])}}>
                    <Text>Press</Text>
                </Pressable> */}
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
    forIn: {
        top: 60
    },
    speedcontainer: {
    },
    textContainer: {

    }
});