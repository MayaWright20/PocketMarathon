import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { SCREEN_HEIGHT } from "../../../../Constants/DIMENSIONS";
import { OptionsContext } from "../../../../Context/CustomRunContext/OptionsContext";
import SquareCTAButton from "../../Buttons/SquareCTAButton";
import { HEADER_1 } from "../../../../Constants/Styling/STYLES";
import { ScrollView } from "react-native-gesture-handler";
import { COLORS } from "../../../../Constants/COLORS";

export default function IntervalsList() {
    const optionsCtx = useContext(OptionsContext);

    return (
        <ScrollView horizontal>
            <View style={styles.container}>
            <SquareCTAButton emoji={'📣'} linearGradientColor1={COLORS.LIGHT_GREY} linearGradientColor2={COLORS.MEDIUM_GREY} title={"START"} overlayColor={""} onPress={() => undefined} />
            <View style={styles.intervalListWrapper}>
                {optionsCtx.intervalsArr.map((item, index) =>
                <Pressable key={index} onPress={()=> console.log('press')}>
                    <SquareCTAButton
                        linearGradientColor1={item?.color}
                        linearGradientColor2={"green"}
                        title={""}
                        overlayColor={""}
                        onPress={() => undefined}
                    />
                </Pressable>
                )}
            </View>
            <SquareCTAButton emoji={'🏁'} linearGradientColor1={COLORS.LIGHT_GREY} linearGradientColor2={COLORS.MEDIUM_GREY} title={"FINISH"} overlayColor={""} onPress={() => undefined} />
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    h1: HEADER_1,
    intervalListWrapper:{
        flexDirection: 'row',
    }
});