import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { BORDER_RADIUS } from "../../../Constants/Styling/STYLES";
import { COLORS } from "../../../Constants/General/COLORS";
import { LinearGradient } from "expo-linear-gradient";
import { SCREEN_HEIGHT } from "../../../Constants/General/DIMENSIONS";

interface RectangularCTAButtonProps {
    colors: string[];
    emoji: string;
    children: any;
};

export default function RectagularCTAButton(props: RectangularCTAButtonProps) {
    return (
        <LinearGradient
            colors={props.colors}
            style={styles.linearGradient}
        >
                <Text style={styles.emoji}>{props.emoji}</Text>
            <View style={styles.childrenWrapper}>
                {props.children}
            </View>
        </LinearGradient>
    )
};

const styles = StyleSheet.create({
    linearGradient: {
        borderRadius: BORDER_RADIUS,
        borderWidth: 2,
        borderColor: COLORS.LIGHT_GREY,
        height: SCREEN_HEIGHT / 10,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
    },
    emoji: {
        fontSize: 40,
        paddingHorizontal: 25
    },
    childrenWrapper:{
        height: '100%',
        width: '100%',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    }
});