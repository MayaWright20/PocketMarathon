import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { SCREEN_WIDTH } from "../../../../Constants/DIMENSIONS";
import { OptionsContext } from "../../../../Context/CustomRunContext/OptionsContext";
import SquareCTAButton from "../../Buttons/SquareCTAButton";
import { HEADER_1 } from "../../../../Constants/Styling/STYLES";
import { ScrollView } from "react-native-gesture-handler";
import { COLORS } from "../../../../Constants/COLORS";

export default function IntervalsList() {
    const optionsCtx = useContext(OptionsContext);
    const intervalsArr = optionsCtx.intervalsArr.slice(1);
    const buttonDimensions = SCREEN_WIDTH / 4.2;
    const emojiSize = 25;
    const titleSize = 14;
    console.log('j')

    function colorMaker(item: any){
        let color = '';
        let color2 = '';
        if(item?.SPEED){
            color = COLORS.MEDIUM_BLUE;
            if(item?.TIME){
                color2 = COLORS.PINK;
            };

            if(item?.DISTANCE){
                color2 = COLORS.GREEN;
            };

            return {color, color2}
        };

        if(item?.TIME){
            color = COLORS.PINK;
            if(item?.DISTANCE){
                color2 = COLORS.GREEN;
            };
            return {color, color2};
        };

       return {color, color2};
    }

    function titleMaker(item: any) {

        console.log('item', item)
        let title = '';
        if (item?.SPEED) {
            title = `🏎️ ${item?.SPEED}\n`;
        }

        if (item?.TIME) {
            if (item?.TIME?.HOURS !== undefined) {
                title = title + `⏱️ ${item?.TIME?.HOURS}:`
            } else {
                title = title + '⏱️ 00:'
            }

            if (item?.TIME?.MINS !== undefined) {
                title = title + `${item?.TIME?.MINS}:`
            } else {
                title = title + '00:'
            }

            if (item?.TIME?.SECS !== undefined) {
                title = title + `${item?.TIME?.SECS}\n`
            } else {
                title = title + '00\n'
            }
        }

        if (item?.DISTANCE) {
            if (item?.DISTANCE?.MILES !== undefined) {
                title = title + `📏 ${item?.DISTANCE?.MILES}:`
            } else {
                title = title + '📏 00:'
            }

            if (item?.DISTANCE?.KMS !== undefined) {
                title = title + `${item?.DISTANCE?.KMS}:`
            } else {
                title = title + '00:'
            }

            if (item?.DISTANCE?.METRES !== undefined) {
                title = title + `${item?.DISTANCE?.METRES}\n`
            } else {
                title = title + '00\n'
            }

        }
        return title;

    };

    return (
        <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ display: optionsCtx.intervalsArr.length < 2 ? 'none' : 'flex' }}>
            <View style={styles.container}>
                <SquareCTAButton
                    emoji={'📣'}
                    linearGradientColor1={COLORS.LIGHT_ORANGE}
                    linearGradientColor2={COLORS.ORANGE}
                    title={"START"}
                    overlayColor={""}
                    onPress={() => undefined}
                    width={buttonDimensions}
                    height={buttonDimensions}
                    emojiSize={emojiSize}
                    titleSize={titleSize}
                />
                <View style={styles.intervalListWrapper}>
                    {intervalsArr.map((item, index) =>
                        // key={index} needs to change
                        <View key={index}>
                            <SquareCTAButton
                                linearGradientColor1={item ? colorMaker(item).color : 'yellow'}
                                linearGradientColor2={item ? colorMaker(item).color2 : 'blue'}
                                title={titleMaker(item)}
                                overlayColor={""}
                                onPress={() => undefined}
                                width={buttonDimensions}
                                height={buttonDimensions}
                                emojiSize={emojiSize}
                                titleSize={titleSize}
                            />
                        </View>
                    )}
                </View>
                <SquareCTAButton
                    emoji={'🏁'}
                    linearGradientColor1={COLORS.LIGHT_ORANGE}
                    linearGradientColor2={COLORS.ORANGE}
                    title={"FINISH"} overlayColor={""}
                    onPress={() => undefined}
                    width={buttonDimensions}
                    height={buttonDimensions}
                    emojiSize={emojiSize}
                    titleSize={titleSize}
                />
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
    intervalListWrapper: {
        flexDirection: 'row',
    }
});