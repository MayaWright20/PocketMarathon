import React from "react";
import { View, StyleSheet, Text } from "react-native";
import InputButton from "../../General/InputButton";
import { SCREEN_WIDTH } from "../../../Constants/DIMENSIONS";
import { COLORS } from "../../../Constants/COLORS";

export default function TimeDistanceInputButton() {

    const inputButtonWidth = SCREEN_WIDTH / 5.5;
    
    return (
        <View style={styles.container}>
            {
            <InputButton 
                width={inputButtonWidth}
                keyboardtype={"number-pad"}
                maxLength={2}
                borderColor={"pink"}
                placeholder={"hrs"}              
                />
            }
            <Text style={{color: 'pink'}}>:</Text>
            <InputButton 
                width={inputButtonWidth}
                keyboardtype={"number-pad"}
                maxLength={2}
                borderColor={"pink"} 
                placeholder={"mins"}            
                />
            <Text style={{color: 'pink'}}>:</Text>
            <InputButton 
                width={inputButtonWidth}
                keyboardtype={"number-pad"}
                maxLength={2}
                borderColor={"pink"} 
                placeholder={"secs"}            
                />
            <Text></Text>
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