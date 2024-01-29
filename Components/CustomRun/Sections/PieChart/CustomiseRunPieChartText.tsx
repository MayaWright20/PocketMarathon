import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import SelectSpeedDropDownButton from "../../Buttons/SelectSpeedDopDownButton";
import TimeInputButton from "../../Buttons/TimeInputButton";
import { OptionsContext } from "../../../../Context/CustomRunContext/OptionsContext";
import DistanceInputButton from "../../Buttons/DistanceInputButton";
import { HEADER_1 } from "../../../../Constants/Styling/STYLES";
import { COLORS } from "../../../../Constants/General/COLORS";

export default function CustomiseRunPieChartText() {

    const [optionText, setOptionsText] = useState<React.ReactNode>();
    const options = useContext(OptionsContext);
    const option1 = options.options[0];
    const option2 = options.options[1];
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    useEffect(() => {
        if ((option1?.option === 'SPEED' || option2?.option === 'SPEED') && (option1?.option === 'TIME' || option2?.option === 'TIME')) {
            setOptionsText(<View style={styles.optionsContainer}>
                <Text style={styles.h1}>I want to</Text>
                <SelectSpeedDropDownButton />
                <Text style={styles.h1}>for</Text>
                <TimeInputButton />
            </View>)
        };

        if ((option1?.option === 'SPEED' || option2?.option === 'SPEED') && (option1?.option === 'DISTANCE' || option2?.option === 'DISTANCE')) {
            setOptionsText(<View style={styles.optionsContainer}>
                <Text style={styles.h1}>I want to</Text>
                <SelectSpeedDropDownButton />
                <Text style={styles.h1}>for</Text>
                <DistanceInputButton />
            </View>)
        };

        if ((option1?.option === 'TIME' || option2?.option === 'TIME') && (option1?.option === 'DISTANCE' || option2?.option === 'DISTANCE')) {
            
            setOptionsText(<View style={styles.optionsContainer}>
                <Text style={styles.h1}>I want to run</Text>
                <DistanceInputButton />
                <Text style={styles.h1}>in</Text>
                <TimeInputButton />
                <View style={styles.switchContainer}>
                    <Text style={styles.h1}>End on</Text>
                    <View style={styles.container}>
                        <Switch
                            trackColor={{ false: COLORS.PINK, true: COLORS.GREEN }}
                            thumbColor={isEnabled ? '#ffffff' : '#ffffff'}
                            ios_backgroundColor={COLORS.PINK}
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                    <Text style={styles.h1}>Completion</Text>
                </View>
            </View>)
        };

        options.distanceIntervalCompletionHandler(isEnabled)
        if ((option1?.option === undefined || option2?.option === undefined) && (option1?.option === undefined || option2?.option === undefined)) {
            setOptionsText(<View>
                <Text style={styles.h1}>Pick 2 options</Text>
            </View>)
        };

    }, [option1, option2, isEnabled])

    return (
        <View>
            {optionText}
        </View>
    )
};

const styles = StyleSheet.create({
    optionsContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    h1: HEADER_1,
    switchContainer: {
        flexDirection: 'row',
        margin: 15
    },
    container: {
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5
    },
});