import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SelectSpeedDropDownButton from "./Buttons/SelectSpeedDopDownButton";

export default function CustomiseRunPieChartText(): JSX.Element {

    return (
        <View style={styles.container}>
            <View style={styles.textWrapper}>
                <Text style={styles.text}>I want to </Text>
            </View>
            {
                <SelectSpeedDropDownButton />
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        height: '100%'
    },
    textWrapper:{
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
        paddingTop: 5
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
    },
    speedcontainer: {
    },
    textContainer: {

    }
});