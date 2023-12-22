import React from "react";
import { View, StyleSheet } from "react-native";
import CustomiseRunPieChartText from "./CustomiseRunPieChartText";
import { IRunIntervalsData } from "../../../../Types/Types";
import PieChart from "./PieChart";

type Props = {
    runIntervalsData: Array<IRunIntervalsData>;
};

export default function CustomiseRunPieChart({ runIntervalsData }: Props): JSX.Element {
    return (
        <View style={styles.container}>
            <PieChart/>
            <View style={styles.pieChartTextWrapper}>
                <CustomiseRunPieChartText />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    pieChartTextWrapper: {
        position: 'absolute',
    }
});