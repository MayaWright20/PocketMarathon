import React from "react";
import { TouchableHighlight, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { COLORS } from "../../../Constants/COLORS";
import { SCREEN_WIDTH } from "../../../Constants/DIMENSIONS";
import { BORDER_RADIUS, HEADER_1 } from "../../../Constants/Styling/STYLES";

interface PillCTAButtonProps {
    onPress: () => any;
    color1: string;
    color2: string;
    title: string;
};

export default function PillCTAButton( props: PillCTAButtonProps) {
    return (
        <TouchableHighlight onPress={props.onPress} style={styles.ctaButtonWrapper}>
            <LinearGradient
                colors={[props.color1, props.color2]}
                style={styles.ctaButton}
            >
                <Text style={styles.h1}>{props.title}</Text>
            </LinearGradient>
        </TouchableHighlight>
    )
};

const styles = StyleSheet.create({
    ctaButtonWrapper: {
        overflow: 'hidden',
        backgroundColor: 'pink',
        width: SCREEN_WIDTH / 2.5,
        borderRadius: BORDER_RADIUS,
        borderColor: COLORS.LIGHT_GREY,
        borderWidth: 2
    },
    ctaButton: {
        padding: 15,
        width: '100%',
    },
    h1: {
        ...HEADER_1,
        textAlign: 'center'
    }
});