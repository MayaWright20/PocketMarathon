import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { Donut } from 'react-native-donut-chart';
import CustomiseRunPieChartText from "./CustomiseRunPieChartText";
import { COLORS } from "../../../../Constants/COLORS";

export interface IrunIntervalsData {
    readonly value: 1;
    color: string;
};

type Props = {
    runIntervalsData: Array<IrunIntervalsData>
};


export default function CustomiseRunPieChart({ runIntervalsData }: Props): JSX.Element {
    return (
        <View style={styles.container}>
            <Donut
                data={runIntervalsData}
                radius={180}
                fill={'transparent'}
                strokeWidth={25}
                strokeLinejoin={'round'}
                gap={Object.keys(runIntervalsData).length === undefined || Object.keys(runIntervalsData).length <= 1 ? 0 : 50 / Object.keys(runIntervalsData).length}
                bgStrokeColor={'transparent'}
            />
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
        marginTop: 15,
    },
    textContainer: {
        backgroundColor: 'yellow',
        position: 'absolute'
    },
    pieChartTextWrapper: {
        position: 'absolute'
    }
});