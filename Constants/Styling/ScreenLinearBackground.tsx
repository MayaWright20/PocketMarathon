import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../COLORS";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../DIMENSIONS";

export default function ScreenLinearBackground({ children }: any) {
    return (
        <LinearGradient
            style={styles.linearbackground}
            colors={[COLORS.WHITE, COLORS.WHITE, COLORS.DARK_BLUE]}
        >
            {children}
        </LinearGradient>

    )
};

const styles = StyleSheet.create({
    linearbackground: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT
    }
});