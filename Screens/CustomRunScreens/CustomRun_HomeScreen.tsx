import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, TouchableHighlight, ScrollView } from "react-native";
import ScreenLinearBackground from "../../Constants/Styling/ScreenLinearBackground";
import { COLORS } from "../../Constants/COLORS";

import { IRunIntervalsData } from "../../Types/Types";

import CustomiseRunPieChart from "../../Components/CustomRun/Sections/PieChart/CustomiseRunPieChart";
import ChooseOptionsSection from "../../Components/CustomRun/Sections/ChooseOptions/ChooseOptionsSection";
import { OptionsContext } from "../../Context/CustomRunContext/OptionsContext";
import { BORDER_RADIUS, HEADER_1 } from "../../Constants/Styling/STYLES";
import { LinearGradient } from "expo-linear-gradient";
import { SCREEN_WIDTH } from "../../Constants/DIMENSIONS";
import IntervalsList from "../../Components/CustomRun/Sections/Intervals/IntervalsList";

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

    function startRunHandler(){
        console.log('start run handler');
    };

    return (
        <ScreenLinearBackground>
            <ScrollView style={styles.container}>
                <View style={styles.horizontalPadding}>
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
                </View>
            <IntervalsList/>
            <TouchableHighlight onPress={startRunHandler} style={[styles.ctaButtonWrapper, styles.startButton]}>
                    <LinearGradient
                        colors={[COLORS.ORANGE, COLORS.PINK]}
                        style={styles.ctaButton}
                    >
                        <Text style={styles.h1}>START</Text>
                    </LinearGradient>
                </TouchableHighlight>
            </ScrollView>
        </ScreenLinearBackground>
    )
};

const styles = StyleSheet.create({
    container:{
        paddingVertical: 15
    },
    horizontalPadding:{
        paddingHorizontal: 15
    },
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
    },
    startButton:{
        alignSelf: 'center',
        marginBottom: 250
    }
});

