import React, { useContext, memo, useCallback, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import DraggableGridView from 'react-native-drag-sort-gridview'

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
}

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
    <View style={styles.item}>
        <SquareCTAButton
            linearGradientColor1={COLORS.LIGHT_ORANGE}
            linearGradientColor2={item ? colorMaker(item).color2 : 'yellow'}
            title={titleMaker(item)}
            overlayColor={""}
            onPress={() => undefined}
            width={SCREEN_WIDTH / 4.7} 
            height={SCREEN_WIDTH / 4.7} 
            emojiSize={emojiSize}
            titleSize={titleSize}
        />
    </View>
));
  
export default function IntervalsList() {
    
    const optionsCtx = useContext(OptionsContext);
    useEffect(() => {
        setData(optionsCtx.intervalsArr);
    }, [optionsCtx.intervalsArr]);

    const [data, setData] = useState(optionsCtx.intervalsArr);
    
    
    const onOrderChanged = useCallback((orderedData: Array<any>) => {
        setData(orderedData);
    }, []);

    const renderItem = ({ item }: { item: any }) => <Item item={item} />
    const keyExtractor = ({ id }: any) => `gridview-${id}`;

    

    return (
        <View style={styles.container}>
            {/* <SquareCTAButton
            linearGradientColor1={COLORS.LIGHT_ORANGE}
            linearGradientColor2={COLORS.ORANGE}
            title={'START'}
            emoji={'📣'}
            overlayColor={""}
            onPress={() => undefined}
            width={SCREEN_WIDTH / 4.2} 
            height={SCREEN_WIDTH / 4.2} 
            emojiSize={emojiSize}
            titleSize={titleSize}
        /> */}
        <DraggableGridView
            // style={styles.bg}
            contentContainerStyle={[styles.draggableGridViewContainer, { width: data.length <= 3 ?  SCREEN_WIDTH : SCREEN_WIDTH + (SCREEN_WIDTH * data.length / 10)   }]}
            // itemContainerStyle={styles.itemContainer}
            isEditing={true}
            numColumns={20}
            // itemHeight={50}
            data={data}
            shouldAnimOnRelease={true}
            keyExtractor={keyExtractor}
            onOrderChanged={onOrderChanged}
            renderItem={renderItem}
            horizontal={true}
            shouldVibrate={false}
            showsHorizontalScrollIndicator={false}
            // shouldAnimOnRelease={true}
        />
        {/* <SquareCTAButton
            linearGradientColor1={COLORS.LIGHT_ORANGE}
            linearGradientColor2={COLORS.ORANGE}
            title={'FINISH'}
            emoji={'🏁'}
            overlayColor={""}
            onPress={() => undefined}
            width={SCREEN_WIDTH / 4.2} 
            height={SCREEN_WIDTH / 4.2} 
            emojiSize={emojiSize}
            titleSize={titleSize}
        /> */}
        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        // marginVertical: 50,
        // marginBottom: 300,
        // marginHorizontal: 50,
        // paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    h1: HEADER_1,
    draggableGridViewContainer:{
        marginTop: 10,
        marginBottom: 30,
        // backgroundColor: 'green',
        // width: SCREEN_WIDTH * data,
        height: SCREEN_HEIGHT /6,
        justifyContent: 'space-evenly',
        alignContent: 'center',
    },
    item:{
        // backgroundColor : 'yellow',
    }
});
