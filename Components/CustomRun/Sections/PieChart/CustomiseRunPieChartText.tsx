import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import SelectSpeedDropDownButton from "../../Buttons/SelectSpeedDopDownButton";
import TimeInputButton from "../../Buttons/TimeInputButton";
import { OptionsContext } from "../../../../Context/CustomRunContext/OptionsContext";
import DistanceInputButton from "../../Buttons/DistanceInputButton";


export default function CustomiseRunPieChartText(): JSX.Element {

    const [ optionText, setOptionsText ] = useState<React.ReactNode>();
    const options = useContext(OptionsContext);
    const option1 = options.arr[0];
    const option2 = options.arr[1];

    useEffect(()=>{
        if( (option1?.option === 'SPEED'  || option2?.option === 'SPEED') && (option1?.option === 'TIME'  || option2?.option === 'TIME')){
            setOptionsText(<View style={styles.optionsContainer}>
                <Text>I want to</Text>
                <SelectSpeedDropDownButton/>
                <Text>for</Text>
                <TimeInputButton/>
            </View>)
        };

        if( (option1?.option === 'SPEED'  || option2?.option === 'SPEED') && (option1?.option === 'DISTANCE'  || option2?.option === 'DISTANCE')){
            
            setOptionsText(<View style={styles.optionsContainer}>
                <Text>I want to</Text>
                <SelectSpeedDropDownButton/>
                <Text>for</Text>
                <DistanceInputButton/>
            </View>)
        };

        if( (option1?.option === 'TIME'  || option2?.option === 'TIME') && (option1?.option === 'DISTANCE'  || option2?.option === 'DISTANCE')){
            
            setOptionsText(<View style={styles.optionsContainer}>
                <Text>I want to run</Text>
                <TimeInputButton/>
                <Text>in</Text>
                <DistanceInputButton/>
            </View>)
        };

        if( (option1?.option === undefined  || option2?.option === undefined) && (option1?.option === undefined || option2?.option === undefined)){
            
            setOptionsText(<View>
                <Text>Pick 2 options</Text>
            </View>)
        };

    },[option1, option2])
    

    return (
        <View style={styles.container}>
                { optionText }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'pink',
    },
    optionsContainer:{
        justifyContent: 'center',
        alignItems: 'center'
    }
});