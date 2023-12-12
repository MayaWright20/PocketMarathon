import React, { useState, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";

import { COLORS } from "../../../../Constants/COLORS";
import { HEADER_1 } from "../../../../Constants/Styling/STYLES";
import SquareCTAButton from "../../Buttons/SquareCTAButton";

import { OptionsContext } from "../../../../Context/CustomRunContext/OptionsContext";

export interface IOptions {
    overlay: boolean | undefined;
    option: string | undefined;
    optionColor: string;
};

export default function ChooseOptionsSection() {

    const optionsCtx = useContext( OptionsContext );
    const [ optionsArr, setOptionsArr ] = useState(Array<IOptions | undefined | null>(2));

    const timeOption: IOptions = {
        overlay: optionsArr[0]?.overlay || optionsArr[1]?.overlay,
        option: 'TIME',
        optionColor: COLORS.PINK,
    };

    const speedOption: IOptions = {
        overlay: optionsArr[0]?.overlay || optionsArr[1]?.overlay,
        option: 'SPEED',
        optionColor: COLORS.MEDIUM_BLUE,
    };

    const distanceOption: IOptions = {
        overlay: optionsArr[0]?.overlay || optionsArr[1]?.overlay,
        option: 'DISTANCE',
        optionColor: COLORS.GREEN,
    };

    function setOptionHandler(option: IOptions) {

        if (optionsArr[0]?.option === undefined && optionsArr[1]?.option === undefined) {
            setOptionsArr(() => {
                let arr = [...optionsArr];
                arr[0] = option;
                arr[1] = undefined;
                optionsCtx.optionsHandler(arr);
                return arr;
            });
        };

        if (optionsArr[0]?.option === option?.option) {
            setOptionsArr(() => {
                let arr = [...optionsArr];
                arr[0] = arr[1];
                arr[1] = undefined;
                optionsCtx.optionsHandler(arr);
                return arr;
            });
        };

        if (optionsArr[1]?.option === option?.option) {
            setOptionsArr(() => {
                let arr = [...optionsArr];
                arr[0] = arr[0];
                arr[1] = undefined;
                optionsCtx.optionsHandler(arr);
                return arr;
            });
        };

        if (optionsArr[0] !== undefined && optionsArr[1] !== undefined) {
            return;
        };

        if (optionsArr[0]?.option !== undefined && optionsArr[0].option !== option?.option) {
            setOptionsArr(() => {
                let arr = [...optionsArr];
                arr[0] = arr[0];
                arr[1] = option;
                optionsCtx.optionsHandler(arr);
                return arr;
            });
        };
    };

    return (
        <View>
                <View style={styles.h1Wrapper}>
                    <Text style={styles.h1}>Customise run by </Text>
                    <Text style={[styles.h1, styles.option1, { color: optionsArr[0]?.optionColor }]}>{optionsArr[0]?.option}</Text>
                    <Text style={styles.h1}>{optionsArr[0] !== undefined ? ' and ' : ''}</Text>
                    <Text style={[styles.h1, styles.option1, { color: optionsArr[1]?.optionColor }]}>{optionsArr[1]?.option}</Text>
                </View>
                <View style={styles.squareCTAButtonWrapper}>
                    <SquareCTAButton
                        linearGradientColor1={COLORS.ORANGE}
                        linearGradientColor2={COLORS.PINK}
                        onPress={() => { setOptionHandler(timeOption) }}
                        emoji={`⏱️`}
                        title={"TIME"}
                        overlayColor={optionsArr[0]?.option === 'TIME' || optionsArr[1]?.option === 'TIME' ? COLORS.MEDIUM_GREY : 'transparent'}
                    />
                    <SquareCTAButton
                        linearGradientColor1={COLORS.LIGHT_BLUE}
                        linearGradientColor2={COLORS.MEDIUM_BLUE}
                        onPress={() => { setOptionHandler(speedOption) }}
                        emoji={`🏎️`}
                        title={"SPEED"}
                        overlayColor={optionsArr[0]?.option === 'SPEED' || optionsArr[1]?.option === 'SPEED' ? COLORS.MEDIUM_GREY : 'transparent'}
                    />
                    <SquareCTAButton
                        linearGradientColor1={COLORS.MINT_GREEN}
                        linearGradientColor2={COLORS.GREEN}
                        onPress={() => { setOptionHandler(distanceOption) }}
                        emoji={`📏`}
                        title={"DISTANCE"}
                        overlayColor={optionsArr[0]?.option === 'DISTANCE' || optionsArr[1]?.option === 'DISTANCE' ? COLORS.MEDIUM_GREY : 'transparent'}
                    />
                </View>
        </View>
    )
};

const styles = StyleSheet.create({
    h1: HEADER_1,
    option1: {
        fontWeight: "600"
    },
    h1Wrapper: {
        flexDirection: 'row'
    },
    squareCTAButtonWrapper: {
        flexDirection: 'row'
    }
});