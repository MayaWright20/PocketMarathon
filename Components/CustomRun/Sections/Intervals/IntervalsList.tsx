import React, { useContext, memo, useCallback, useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import DraggableGridView from 'react-native-drag-sort-gridview';


import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../../Constants/DIMENSIONS";
import { OptionsContext } from "../../../../Context/CustomRunContext/OptionsContext";
import SquareCTAButton from "../../Buttons/SquareCTAButton";
import { HEADER_1 } from "../../../../Constants/Styling/STYLES";
import { COLORS } from "../../../../Constants/COLORS";

const emojiSize = 25;
const titleSize = 14;

function colorMaker(item: any) {

    let color = '';
    let color2 = '';

    if (item?.SPEED) {
        color = COLORS.MEDIUM_BLUE;
        if (item?.TIME) {
            color2 = COLORS.PINK;
        };

        if (item?.DISTANCE) {
            color2 = COLORS.GREEN;
        };

        return { color, color2 }
    };

    if (item?.TIME) {
        color = COLORS.PINK;
        if (item?.DISTANCE) {
            color2 = COLORS.GREEN;
        };
        return { color, color2 };
    };

    return { color, color2 };
};

function titleMaker(item: any) {

    let title = '';

    if (item?.SPEED) {
        title = `🏎️ ${item?.SPEED}\n`;
    };

    if (item?.TIME) {
        if (item?.TIME?.HOURS !== undefined) {
            title = title + `⏱️ ${item?.TIME?.HOURS}:`
        } else {
            title = title + '⏱️ 00:'
        };

        if (item?.TIME?.MINS !== undefined) {
            title = title + `${item?.TIME?.MINS}:`
        } else {
            title = title + '00:'
        };

        if (item?.TIME?.SECS !== undefined) {
            title = title + `${item?.TIME?.SECS}\n`
        } else {
            title = title + '00\n'
        };
    };

    if (item?.DISTANCE) {
        if (item?.DISTANCE?.MILES !== undefined) {
            title = title + `📏 ${item?.DISTANCE?.MILES}:`
        } else {
            title = title + '📏 00:'
        };

        if (item?.DISTANCE?.KMS !== undefined) {
            title = title + `${item?.DISTANCE?.KMS}:`
        } else {
            title = title + '00:'
        };

        if (item?.DISTANCE?.METRES !== undefined) {
            title = title + `${item?.DISTANCE?.METRES}\n`
        } else {
            title = title + '00\n'
        };

    };

    return title;

};

const Item = memo(({ item }: { item: any }) => (
        <SquareCTAButton
        linearGradientColor1={ item ? colorMaker(item).color : COLORS.LIGHT_ORANGE }
        linearGradientColor2={ item ? colorMaker(item).color2 : COLORS.ORANGE }
        title={titleMaker(item)}
        overlayColor={""}
        onPress={() => undefined}
        width={SCREEN_WIDTH / 4.7}
        height={SCREEN_WIDTH / 4.7}
        emojiSize={emojiSize}
        titleSize={titleSize}
    />
));

export default function IntervalsList() {

    const optionsCtx = useContext(OptionsContext);

    useEffect(() => {
        setData(optionsCtx.intervalsArr);
    }, [optionsCtx.intervalsArr]);

    const [ data, setData ] = useState(optionsCtx.intervalsArr);

    const onOrderChanged = useCallback((orderedData: Array<any>) => {
        setData(orderedData);
        optionsCtx.updateIntervalsArr(orderedData);
    }, []);

    const renderItem = ({ item }: { item: any }) => <Item key={item.id} item={item} />
    const keyExtractor = ({ id }: any) => `gridview-${id}`;
 
    return (
        <View>
            { data ?
        <ScrollView horizontal showsHorizontalScrollIndicator={ false } style={[ styles.container, { display: data.length < 1 ? 'none' : 'flex' }]}>
            <View style={[styles.startFinishIntervals, styles.startInterval]}>
                <SquareCTAButton
                    linearGradientColor1={COLORS.LIGHT_ORANGE}
                    linearGradientColor2={COLORS.ORANGE}
                    title={'START'}
                    emoji={'📣'}
                    overlayColor={""}
                    onPress={() => undefined}
                    width={SCREEN_WIDTH / 4.7}
                    height={SCREEN_WIDTH / 4.7}
                    emojiSize={emojiSize}
                    titleSize={titleSize}
                />
            </View>
            <DraggableGridView
                contentContainerStyle={[styles.draggableGridViewContainer, { width: data.length * SCREEN_WIDTH / 3 }]}
                isEditing={true}
                numColumns={data.length <= 3 ? 3 : data.length}
                data={data}
                shouldAnimOnRelease={true}
                keyExtractor={keyExtractor}
                onOrderChanged={onOrderChanged}
                renderItem={renderItem}
                horizontal={true}
                shouldVibrate={false}
                showsHorizontalScrollIndicator={false}
            />
            <View style={[styles.startFinishIntervals, styles.finishInterval]}>
                <SquareCTAButton
                    linearGradientColor1={COLORS.LIGHT_ORANGE}
                    linearGradientColor2={COLORS.ORANGE}
                    title={'FINISH'}
                    emoji={'🏁'}
                    overlayColor={""}
                    onPress={() => undefined}
                    width={SCREEN_WIDTH / 4.7}
                    height={SCREEN_WIDTH / 4.7}
                    emojiSize={emojiSize}
                    titleSize={titleSize}
                />
            </View>
        </ScrollView>
        : null}
        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        alignContent: 'center',
    },
    h1: HEADER_1,
    draggableGridViewContainer: {
        height: SCREEN_HEIGHT / 6,
        justifyContent: 'space-evenly',
        alignContent: 'center',
        // backgroundColor: 'pink'
    },
    startFinishIntervals: {
        alignSelf: 'center',
    },
    startInterval: {
        left: 30,
    },
    finishInterval: {
        right: 30
    }
});
