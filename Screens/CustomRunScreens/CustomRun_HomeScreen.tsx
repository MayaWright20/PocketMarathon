import React, { useReducer, useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, TouchableHighlight, Pressable, Button } from "react-native";
import ScreenLinearBackground from "../../Constants/Styling/ScreenLinearBackground";
import { COLORS } from "../../Constants/COLORS";

import { IRunIntervalsData } from "../../Types/Types";

import CustomiseRunPieChart from "../../Components/CustomRun/Sections/PieChart/CustomiseRunPieChart";
import ChooseOptionsSection from "../../Components/CustomRun/Sections/ChooseOptions/ChooseOptionsSection";
import { OptionsContext } from "../../Context/CustomRunContext/OptionsContext";
import { BORDER_RADIUS, HEADER_1 } from "../../Constants/Styling/STYLES";
import { LinearGradient } from "expo-linear-gradient";
import { SCREEN_WIDTH } from "../../Constants/DIMENSIONS";

export default function CustomRun_HomeScreen() {

    const optionsCtx = useContext(OptionsContext);

    const [runIntervalsData, setRunIntervalsData] = useState<IRunIntervalsData[]>(optionsCtx.intervalsArr as IRunIntervalsData[]);

    useEffect(() => {
        setRunIntervalsData(optionsCtx.intervalsArr as IRunIntervalsData[]);
    }, [runIntervalsData, optionsCtx.intervalsArr]);

    function addIntervalHandler() {
        optionsCtx.addIntervalHandler();
    };

    function cancelIntervalHandler(){
        optionsCtx.cancelIntervalHandler();
    };

    return (
        <ScreenLinearBackground>
            <ChooseOptionsSection />
            <CustomiseRunPieChart runIntervalsData={runIntervalsData} />
            <View style={styles.ctaButtonContainer}>
                <TouchableHighlight onPress={addIntervalHandler} style={styles.ctaButtonWrapper}>
                    <LinearGradient
                        colors={[COLORS.LIGHT_ORANGE, COLORS.ORANGE]}
                        style={styles.ctaButton}
                    >
                        <Text style={styles.h1}>ADD</Text>
                    </LinearGradient>
                </TouchableHighlight>
                <TouchableHighlight onPress={cancelIntervalHandler} style={styles.ctaButtonWrapper}>
                    <LinearGradient
                        colors={[COLORS.LIGHT_GREY, COLORS.MEDIUM_GREY]}
                        style={styles.ctaButton}
                    >
                        <Text style={styles.h1}>CANCEL</Text>
                    </LinearGradient>
                </TouchableHighlight>
            </View>
        </ScreenLinearBackground>
    )
};

const styles = StyleSheet.create({
    h1: {
        ...HEADER_1,
        textAlign: 'center'
    },
    ctaButtonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    ctaButtonWrapper: {
        overflow: 'hidden',
        backgroundColor: 'pink',
        width: SCREEN_WIDTH / 2.5,
        borderRadius: BORDER_RADIUS,
        borderColor: COLORS.MEDIUM_GREY,
        borderWidth: 2
    },
    ctaButton: {
        padding: 15,
        width: '100%',
    }
});

