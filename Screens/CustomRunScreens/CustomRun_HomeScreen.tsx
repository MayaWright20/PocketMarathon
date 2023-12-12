import React, { useReducer, useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, TouchableHighlight, Pressable, Button } from "react-native";
import ScreenLinearBackground from "../../Constants/Styling/ScreenLinearBackground";
import { COLORS } from "../../Constants/COLORS";

import { IRunIntervalsData } from "../../Types/Types";

import CustomiseRunPieChart from "../../Components/CustomRun/Sections/PieChart/CustomiseRunPieChart";
import ChooseOptionsSection from "../../Components/CustomRun/Sections/ChooseOptions/ChooseOptionsSection";
import { OptionsContext } from "../../Context/CustomRunContext/OptionsContext";

export default function CustomRun_HomeScreen() {

    const optionsCtx = useContext(OptionsContext);

    const [ runIntervalsData, setRunIntervalsData ] = useState<IRunIntervalsData[]>(optionsCtx.intervalsArr as IRunIntervalsData[]);

    useEffect(()=>{
        setRunIntervalsData( optionsCtx.intervalsArr as IRunIntervalsData[] );
    },[ runIntervalsData, optionsCtx.intervalsArr]);

    function addInterval(){
        console.log('add')
        optionsCtx.addIntervalHandler();
        // setRunIntervalsData( optionsCtx.intervalsArr as IRunIntervalsData[] );
        // setRunIntervalsData(optionsCtx.intervalsArr.filter(interval => interval !== undefined) as IRunIntervalsData[]);
    };

    return (
        <ScreenLinearBackground>
                <ChooseOptionsSection />
                <CustomiseRunPieChart runIntervalsData={runIntervalsData} />
                <Pressable onPress={addInterval}>
                    <Text>Add interval</Text>
                </Pressable>
        </ScreenLinearBackground>
    )
};

const styles = StyleSheet.create({
});

