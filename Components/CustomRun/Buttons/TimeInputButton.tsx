import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";

import InputButton from "../../General/InputButton";

import { SCREEN_WIDTH } from "../../../Constants/General/DIMENSIONS";
import { COLORS } from "../../../Constants/General/COLORS";
import { OptionsContext } from "../../../Context/CustomRunContext/OptionsContext";


export default function TimeInputButton() {

    const inputButtonWidth = SCREEN_WIDTH / 4.7;
    const [hours, setHours] = useState();
    const [mins, setMins] = useState();
    const [secs, setSecs] = useState();

    const optionsCtx = useContext(OptionsContext);
    const time = { 'HOURS': hours, 'MINS': mins, 'SECS': secs };

    useEffect(() => {
        optionsCtx.makeIntervalHandler('TIME', time);

    }, [hours, mins, secs]);

    return (
        <View style={styles.container}>
            {
                <InputButton
                    width={inputButtonWidth}
                    keyboardtype={"number-pad"}
                    maxLength={2}
                    borderColor={"pink"}
                    placeholder={"HOURS"}
                    value={hours}
                    onChangeText={(hrs: any) => {
                        if (hrs === "" || undefined) {
                            setHours(undefined)
                        } else if (Number(hrs) <= 10) {
                            setHours(hrs);
                        } else {
                            setHours(undefined)
                        }
                    }}
                />
            }
            <Text style={styles.semiColon}>:</Text>
            <InputButton
                width={inputButtonWidth}
                keyboardtype={"number-pad"}
                maxLength={2}
                borderColor={"pink"}
                placeholder={"MINS"}
                value={mins}
                onChangeText={(mins: any) => {
                    if (mins === "" || undefined) {
                        setMins(undefined)
                    } else if (Number(mins) <= 59) {
                        setMins(mins);
                    } else {
                        setMins(undefined)
                    }
                }}
            />
            <Text style={styles.semiColon}>:</Text>
            <InputButton
                width={inputButtonWidth}
                keyboardtype={"number-pad"}
                maxLength={2}
                borderColor={"pink"}
                placeholder={"SECS"}
                value={secs}
                onChangeText={(secs: any) => {
                    if (secs === "" || undefined) {
                        setSecs(undefined)
                    } else if (Number(secs) <= 59) {
                        setSecs(secs);
                    } else {
                        setSecs(undefined)
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
    },
    semiColon: {
        color: 'pink',
        fontWeight: '900'
    }
});