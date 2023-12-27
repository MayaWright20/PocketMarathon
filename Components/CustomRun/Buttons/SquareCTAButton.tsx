import React from "react";
import { LinearGradient } from "expo-linear-gradient";

import { Text, StyleSheet, View, Pressable } from "react-native";
import { SCREEN_WIDTH } from "../../../Constants/DIMENSIONS";
import { COLORS } from "../../../Constants/COLORS";
import { BORDER_RADIUS, BORDER_WIDTH } from "../../../Constants/Styling/STYLES";

type SquareCTAButtonProps = {
    linearGradientColor1: string;
    linearGradientColor2: string;
    emoji ?: string;
    title: string;
    overlayColor: string;
    onPress: () => void;
    onLongPress?: () => void;
    width: number;
    height: number;
    emojiSize: number;
    titleSize: number;
};

export default function SquareCTAButton( props: SquareCTAButtonProps ): JSX.Element {

    return (
        <Pressable style={[styles.container, {width: props.width, height: props.height}]} onPress={props.onPress} onLongPress={props.onLongPress}>
            <LinearGradient
                colors={[
                    props.linearGradientColor1,
                    props.linearGradientColor2]}
                style={styles.linearGradient}>
                <View style={[styles.overlay, { backgroundColor: props.overlayColor }]}>
                    <Text style={{fontSize: props.emojiSize}}>{props.emoji}</Text>
                    <Text style={{fontSize: props.titleSize}}>{props.title}</Text>
                </View>
            </LinearGradient>
        </Pressable>
    )
};

const styles = StyleSheet.create({
    container: {
        borderWidth: BORDER_WIDTH,
        borderColor: COLORS.LIGHT_GREY,
        borderRadius: BORDER_RADIUS,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    linearGradient: {
        width: SCREEN_WIDTH / 4,
        height: SCREEN_WIDTH / 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        width: SCREEN_WIDTH / 4,
        height: SCREEN_WIDTH / 4,
        justifyContent: 'center',
        alignItems: 'center',
    }
});