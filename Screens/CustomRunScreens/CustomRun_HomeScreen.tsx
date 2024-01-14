import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, TouchableHighlight, ScrollView } from "react-native";
import ScreenLinearBackground from "../../Constants/Styling/ScreenLinearBackground";
import { COLORS } from "../../Constants/General/COLORS";

import { IRunIntervalsData } from "../../Types/Types";

import PillCTAButton from "../../Components/CustomRun/Buttons/PillCTAButton";
import CustomiseRunPieChart from "../../Components/CustomRun/Sections/PieChart/CustomiseRunPieChart";
import ChooseOptionsSection from "../../Components/CustomRun/Sections/ChooseOptions/ChooseOptionsSection";
import { OptionsContext } from "../../Context/CustomRunContext/OptionsContext";
import IntervalsList from "../../Components/CustomRun/Sections/Intervals/IntervalsList";

export default function CustomRun_HomeScreen({navigation}) {

    const optionsCtx = useContext(OptionsContext);

    const [ runIntervalsData, setRunIntervalsData ] = useState<IRunIntervalsData[]>(optionsCtx.intervalsArr as IRunIntervalsData[]);

    useEffect(() => {
        setRunIntervalsData(optionsCtx.intervalsArr as IRunIntervalsData[]);
    }, [runIntervalsData, optionsCtx.intervalsArr]);

    function addIntervalHandler() {
        optionsCtx.addIntervalHandler();
    };

    function cancelIntervalHandler() {
        optionsCtx.cancelIntervalHandler();
    };

    function nextIntervalsSummaryScreenHandler() {
        navigation.navigate('CustomRun_IntervalsSummaryScreen');
    };

    return (
        <ScreenLinearBackground>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.horizontalPadding}>
                    <ChooseOptionsSection />
                    <CustomiseRunPieChart runIntervalsData={runIntervalsData} />
                    <View style={styles.ctaButtonContainer}>
                        <PillCTAButton onPress={addIntervalHandler} color1={COLORS.LIGHT_ORANGE} color2={COLORS.ORANGE} title={"ADD"}/>    
                        <PillCTAButton onPress={cancelIntervalHandler} color1={COLORS.LIGHT_GREY} color2={COLORS.MEDIUM_GREY} title={"CANCEL"}/>
                    </View>
                </View>
                <IntervalsList />
                <View style={[{ display:  optionsCtx.intervalsArr.length < 1 ? 'none' : 'flex' }, styles.startButton]}>
                    <PillCTAButton onPress={nextIntervalsSummaryScreenHandler} color1={COLORS.LIGHT_ORANGE} color2={COLORS.ORANGE} title={"NEXT"}/>
                </View>
            </ScrollView>
        </ScreenLinearBackground>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15
    },
    horizontalPadding: {
        paddingHorizontal: 15
    },
    ctaButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        top: -25
    },
    startButton: {
        alignSelf: 'center',
        marginBottom: 250
    }
});

