import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableHighlight, Text, StyleSheet, View } from "react-native";

import { SCREEN_WIDTH } from "../Constants/DIMENSIONS";
import { COLORS } from "../Constants/COLORS";
import { BORDER_RADIUS, BORDER_WIDTH } from "../Constants/Styling/STYLES";


type SquareCTAButtonProps = {
    linearGradientColor1: string;
    linearGradientColor2: string;
    emoji: string;
    title: string;
    overlayColor: string;
    onPress: () => any;
};

export default function SquareCTAButton(props: SquareCTAButtonProps): JSX.Element {


    return (
        <TouchableHighlight style={styles.container} onPress={props.onPress}>
            <LinearGradient
                colors={[
                    props.linearGradientColor1,
                    props.linearGradientColor2]}
                style={styles.linearGradient}>
                <View style={[styles.overlay, { backgroundColor: props.overlayColor }]}>
                    <Text style={styles.emoji}>{props.emoji}</Text>
                    <Text style={styles.title}>{props.title}</Text>
                </View>
            </LinearGradient>
        </TouchableHighlight>
    )
};

const styles = StyleSheet.create({
    container: {
        borderWidth: BORDER_WIDTH,
        borderColor: COLORS.LIGHT_GREY,
        width: SCREEN_WIDTH / 4,
        height: SCREEN_WIDTH / 4,
        borderRadius: BORDER_RADIUS,
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    linearGradient: {
        width: SCREEN_WIDTH / 4,
        height: SCREEN_WIDTH / 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        width: SCREEN_WIDTH / 4,
        height: SCREEN_WIDTH / 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emoji: {
        fontSize: 50,
        fontWeight: '500'
    },
    title: {
        fontSize: 16
    }
});