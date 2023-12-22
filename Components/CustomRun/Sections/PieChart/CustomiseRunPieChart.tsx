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
            {/* <Svg height="100%" width="100%" viewBox="-2 -2 295 256">
                <GradientPath
                    d={
                        'M55.5,237.2c-23.5-23.3-38.1-55.6-38.1-91.3C17.3,75,74.8,17.5,145.7,17.5C216.5,17.5,274,75,274,145.9  c0,35.7-14.6,68-38.1,91.3'
                    }
                    colors={['#A35AFF', '#5AF5FF']}
                    strokeWidth={35}
                    roundedCorners
                />
            </Svg> */}
            <View>
            <PieChart/>
            </View>
            
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
        marginTop: 5,
        marginBottom: 5
    },
    pieChartTextWrapper: {
        position: 'absolute'
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