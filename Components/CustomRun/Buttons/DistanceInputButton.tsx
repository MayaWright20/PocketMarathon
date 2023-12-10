import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";

import { OptionsContext } from "../../../Context/CustomRunContext/OptionsContext";

import InputButton from "../../General/InputButton";
import { SCREEN_WIDTH } from "../../../Constants/DIMENSIONS";
import { COLORS } from "../../../Constants/COLORS";

export default function DistanceInputButton() {

    const inputButtonWidth = SCREEN_WIDTH / 5.5;
    const [ miles, setMiles ] = useState();
    const [ kms, setKms ] = useState();
    const [ metres, setMetres ] = useState();

    const optionsCtx = useContext(OptionsContext);
    const distance = { 'MILES': miles, 'KMS': kms, 'METRES': metres };

    useEffect(() => {
        optionsCtx.makeIntervalHandler('DISTANCE', distance);
    }, [ miles, kms, metres ]);

    return (
        <View style={styles.container}>
            {
                <InputButton
                    width={inputButtonWidth}
                    keyboardtype={"number-pad"}
                    maxLength={2}
                    borderColor={COLORS.GREEN}
                    placeholder={"miles"}
                    value={ miles }
                    onChangeText={( m : any) => {
                        if ( Number( m ) <= 50 ) {
                            setMiles( m );
                        }
                    }}
                />
            }
            <Text style={{ color: COLORS.GREEN }}>:</Text>
            <InputButton
                width={inputButtonWidth}
                keyboardtype={"number-pad"}
                maxLength={2}
                borderColor={COLORS.GREEN}
                placeholder={"kms"}
                value={ kms }
                onChangeText={( k: any) => {
                    if ( Number( k ) <= 10) {
                        setKms( k );
                    }
                }}
            />
            <Text style={{ color: COLORS.GREEN }}>:</Text>
            <InputButton
                width={inputButtonWidth}
                keyboardtype={"number-pad"}
                maxLength={2}
                borderColor={COLORS.GREEN}
                placeholder={"metres"}
                value={ metres }
                onChangeText={( m: any) => {
                    if (Number(m) <= 10) {
                        setMetres(m);
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