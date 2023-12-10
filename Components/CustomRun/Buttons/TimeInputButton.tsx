import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";

import InputButton from "../../General/InputButton";

import { SCREEN_WIDTH } from "../../../Constants/DIMENSIONS";
import { COLORS } from "../../../Constants/COLORS";
import { OptionsContext } from "../../../Context/CustomRunContext/OptionsContext";


export default function TimeInputButton() {

    const inputButtonWidth = SCREEN_WIDTH / 5.5;
    const [ hours, setHours ] = useState();
    const [ mins, setMins ] = useState();
    const [ secs, setSecs ] = useState();

    const optionsCtx = useContext(OptionsContext);
    const time = { 'HOURS': hours, 'MINS': mins, 'SECS': secs };

    useEffect(()=>{
        optionsCtx.makeIntervalHandler('TIME', time );
    },[ hours, mins, secs ]);

    return (
        <View style={styles.container}>
            {
            <InputButton 
            width={inputButtonWidth}
            keyboardtype={"number-pad"}
            maxLength={2}
            borderColor={"pink"}
            placeholder={"hrs"} 
            value={hours}       
            onChangeText={(hrs: any) => {
                if (Number(hrs) <= 10) {
                    setHours(hrs);
                }
            }}      
        />
            }
            <Text style={{color: 'pink'}}>:</Text>
            <InputButton 
                width={inputButtonWidth}
                keyboardtype={"number-pad"}
                maxLength={2}
                borderColor={"pink"} 
                placeholder={"mins"}  
                value={mins}       
                onChangeText={(mins: any) => {
                    if (Number(mins) <= 59) {
                        setMins(mins);
                    }
                }}         
                />
            <Text style={{color: 'pink'}}>:</Text>
            <InputButton 
                width={inputButtonWidth}
                keyboardtype={"number-pad"} 
                maxLength={2}
                borderColor={"pink"} 
                placeholder={"secs"}  
                value={secs}       
                onChangeText={(secs: any) => {
                    if (Number(secs) <= 59) {
                        setSecs(secs);
                    }
                }}           
                />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        color: COLORS.DARK_GREY
    }
});