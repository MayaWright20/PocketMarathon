import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";

import { OptionsContext } from "../../../Context/CustomRunContext/OptionsContext";

import InputButton from "../../General/InputButton";
import { SCREEN_WIDTH } from "../../../Constants/General/DIMENSIONS";
import { COLORS } from "../../../Constants/General/COLORS";

export default function DistanceInputButton() {

    const inputButtonWidth = SCREEN_WIDTH / 4.7;
    const [ miles, setMiles ] = useState();
    const [ kms, setKms ] = useState();
    const [ metres, setMetres ] = useState();

    const optionsCtx = useContext(OptionsContext);
    const distance = { 'MILES': miles, 'KMS': kms, 'METRES': metres, 'END_ON_DISTANCE': optionsCtx.distanceCompletion };

    useEffect(() => {
        if( distance.MILES === undefined && distance.KMS === undefined && distance.METRES === undefined){
            return;
        }else{
            optionsCtx.makeIntervalHandler('DISTANCE', distance);   
        }
    }, [ miles, kms, metres, optionsCtx.distanceCompletion ]);

    return (
        <View style={styles.container}>
            {
                <InputButton
                    width={inputButtonWidth}
                    keyboardtype={"number-pad"}
                    maxLength={2}
                    borderColor={COLORS.GREEN}
                    placeholder={"MILES"}
                    value={ miles }
                    onChangeText={( m : any) => {
                        if(m === "" || undefined){
                            setMiles(undefined)
                        }
                        else if ( Number( m ) <= 50 ) {
                            setMiles( m );
                        }else{
                            setMiles(undefined)
                        }
                    }}
                />
            }
            <Text style={styles.semiColon}>:</Text>
            <InputButton
                width={inputButtonWidth}
                keyboardtype={"number-pad"}
                maxLength={2}
                borderColor={COLORS.GREEN}
                placeholder={"KMS"}
                value={ kms }
                onChangeText={( k: any) => {
                    if(k === "" || undefined){
                        setKms(undefined)
                    }
                    else if ( Number( k ) <= 10) {
                        setKms( k );
                    }else{
                        setKms(undefined)
                    }
                }}
            />
            <Text style={styles.semiColon}>:</Text>
            <InputButton
                width={inputButtonWidth}
                keyboardtype={"number-pad"}
                maxLength={2}
                borderColor={COLORS.GREEN}
                placeholder={"METRES"}
                value={ metres }
                onChangeText={( m: any) => {
                    if(m === ""){
                        setMetres(undefined)
                    }
                    else if (Number(m) <= 10) {
                        setMetres(m);
                    }else{
                        setMetres(undefined)
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
    semiColon:{ 
        color: COLORS.GREEN,
        fontWeight: '900' 
    }
});