import React from "react";
import { View, StyleSheet } from "react-native";
import GradientPath from 'react-native-svg-path-gradient';
import {Svg} from 'react-native-svg';
import { Donut } from 'react-native-donut-chart';
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


{/* <Donut
                data={runIntervalsData}
                radius={200}
                fill={'transparent'}
                strokeWidth={25}
                strokeLinejoin={'round'}
                gap={Object.keys(runIntervalsData).length === undefined || Object.keys(runIntervalsData).length <= 1 ? 0 : 50 / Object.keys(runIntervalsData).length}
                bgStrokeColor={'transparent'}
            /> */}