import React, { useReducer, useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, TouchableHighlight, Pressable } from "react-native";
import ScreenLinearBackground from "../../Constants/Styling/ScreenLinearBackground";
import { COLORS } from "../../Constants/COLORS";

import { IrunIntervalsData } from "../../Components/CustomRun/Sections/PieChart/CustomiseRunPieChart";

import CustomiseRunPieChart from "../../Components/CustomRun/Sections/PieChart/CustomiseRunPieChart";
import ChooseOptionsSection from "../../Components/CustomRun/Sections/ChooseOptions/ChooseOptionsSection";
import OptionsContextProvider, { OptionsContext, IOptions } from "../../Context/CustomRunContext/OptionsContext";

export default function CustomRun_HomeScreen() {

    const optionsCtx = useContext(OptionsContext);
    // const [ ints, setInts ] = useState();
    // const [ intArr, setIntArr ] = useState<IntervalObjType[]>([]);

    function addInterval(){
        //
    };

    const runIntervalsData = [
        {
            value: 1,
            color: COLORS.LIGHT_GREY
        }
    ];

    return (
        <ScreenLinearBackground>
            <OptionsContextProvider>
                <ChooseOptionsSection />
                <CustomiseRunPieChart runIntervalsData={runIntervalsData} />
                <Pressable onPress={addInterval}>
                    <Text>Add interval</Text>
                </Pressable>
            </OptionsContextProvider>
        </ScreenLinearBackground>
    )
};

const styles = StyleSheet.create({
});

