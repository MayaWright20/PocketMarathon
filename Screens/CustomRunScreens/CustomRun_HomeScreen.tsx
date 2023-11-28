import React, { useReducer } from "react";
import { View, Text, StyleSheet } from "react-native";
import ScreenLinearBackground from "../../Constants/Styling/ScreenLinearBackground";
import SquareCTAButton from "../../Components/SquareCTAButton";
import { COLORS } from "../../Constants/COLORS";
import { HEADER_1 } from "../../Constants/Styling/STYLES";

function reducer(state: { overlayColor1: string; overlayColor2: string; overlayColor3: string; }, action: { type: string; }): any {
    if (action.type === 'TIME') {
        console.log('time');
        return {
            overlayColor1: state.overlayColor1 = COLORS.DARK_GREY
        }
    } else if (action.type === 'SPEED') {
        console.log('speed');
        return {
            overlayColor2: state.overlayColor2 = COLORS.DARK_GREY
        }
    } else {
        console.log('distance');
        return {
            overlayColor3: state.overlayColor3 = COLORS.DARK_GREY
        }
    }
};

export default function CustomRun_HomeScreen() {

    const [state, dispatch] = useReducer(reducer, { overlayColor1: 'transparent', overlayColor2: 'transparent', overlayColor3: 'transparent' });

    return (
        <ScreenLinearBackground>
            <Text style={styles.h1}>Customise run by</Text>
            <View style={styles.optionsButtonContainer}>
                <SquareCTAButton
                    linearGradientColor1={COLORS.ORANGE}
                    linearGradientColor2={COLORS.PINK}
                    onPress={() => { dispatch({ type: 'TIME' }) }}
                    emoji={`⏱️`}
                    title={"TIME"}
                    overlayColor={state.overlayColor1}
                />
                <SquareCTAButton
                    linearGradientColor1={COLORS.LIGHT_BLUE}
                    linearGradientColor2={COLORS.MEDIUM_BLUE}
                    onPress={() => { dispatch({ type: 'SPEED' }) }}
                    emoji={`🏎️`}
                    title={"SPEED"}
                    overlayColor={state.overlayColor2}
                />
                <SquareCTAButton
                    linearGradientColor1={COLORS.MINT_GREEN}
                    linearGradientColor2={COLORS.GREEN}
                    onPress={() => { dispatch({ type: 'DISTANCE' }) }}
                    emoji={`📏`}
                    title={"DISTANCE"}
                    overlayColor={state.overlayColor3}
                />
            </View>
        </ScreenLinearBackground>
    )
};

const styles = StyleSheet.create({
    optionsButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    h1: HEADER_1
});