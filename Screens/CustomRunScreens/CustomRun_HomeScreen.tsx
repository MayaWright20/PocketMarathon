import React, { useReducer, useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import ScreenLinearBackground from "../../Constants/Styling/ScreenLinearBackground";
import { COLORS } from "../../Constants/COLORS";

import { IrunIntervalsData } from "../../Components/CustomRun/Sections/PieChart/CustomiseRunPieChart";

import CustomiseRunPieChart from "../../Components/CustomRun/Sections/PieChart/CustomiseRunPieChart";
import ChooseOptionsSection from "../../Components/CustomRun/Sections/ChooseOptions/ChooseOptionsSection";
import OptionsContextProvider from "../../Context/CustomRunContext/OptionsContext";

export default function CustomRun_HomeScreen() {

    //give type
    const runIntervalsData = [
        {
            value: 1,
            color: COLORS.LIGHT_GREY,
        },
    ];

    return (
        <ScreenLinearBackground>
            <OptionsContextProvider>
                <ChooseOptionsSection />
                <CustomiseRunPieChart runIntervalsData={runIntervalsData} />
            </OptionsContextProvider>
        </ScreenLinearBackground>
    )
};

const styles = StyleSheet.create({


});

