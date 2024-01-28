import React, { useContext, memo, useCallback, useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import DraggableGridView from 'react-native-drag-sort-gridview';

import useColorMaker from "../../../../Utils/Hooks/CustomRun/useColorMaker";
import useTitleMaker from "../../../../Utils/Hooks/CustomRun/useTitleMaker";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../../Constants/General/DIMENSIONS";
import { OptionsContext } from "../../../../Context/CustomRunContext/OptionsContext";
import SquareCTAButton from "../../Buttons/SquareCTAButton";
import { HEADER_1 } from "../../../../Constants/Styling/STYLES";
import { COLORS } from "../../../../Constants/General/COLORS";


const emojiSize = 25;
const titleSize = 14;

function squareCTAButtonOnPress(showBin: boolean, setShowBin: { (value: React.SetStateAction<boolean>): void; (arg0: boolean): void; }, editable: boolean, item: { id: any; }, optionsCtx: { intervalsArr: any; updateIntervalsArr: (arg0: any[]) => void; }) {
   
    if (showBin === true) {
        
        let arr = [...optionsCtx.intervalsArr];
        let index = arr.findIndex(arrItem => arrItem.id === item.id);
        if (index !== -1) {
            arr.splice(index, 1);
            optionsCtx.updateIntervalsArr(arr);
        };
        setShowBin((show)=> !show);
    };

    if (showBin === false && editable === false) {
        setShowBin(true);
        return;
    };
};

function squareCTAButtonOnLongPress(item, data, setEditable) {
    if(data.length <=1)return;
    setEditable((edit: boolean) => !edit);
};

const Item = memo(({ item, editable, setEditable,data,  showBin, setShowBin, optionsCtx }: { item: any, data:any, editable: boolean, setEditable: React.Dispatch<React.SetStateAction<boolean>>, showBin: boolean, setShowBin: React.Dispatch<React.SetStateAction<boolean>>, optionsCtx: any }) => (

    <SquareCTAButton
        linearGradientColor1={item ? useColorMaker(item).color : COLORS.LIGHT_ORANGE}
        linearGradientColor2={item ? useColorMaker(item).color2 : COLORS.ORANGE}
        title={showBin ? 'Delete' : useTitleMaker(item)}
        emoji={showBin ? '🗑️' : ''}
        overlayColor={''}
        onPress={!editable ? () => squareCTAButtonOnPress(showBin, setShowBin, editable, item,  optionsCtx) : () => { }}
        width={SCREEN_WIDTH / 4.7}
        height={SCREEN_WIDTH / 4.7}
        emojiSize={emojiSize}
        titleSize={titleSize}
        onLongPress={() => squareCTAButtonOnLongPress(item, data, setEditable)}
    />
));

export default function IntervalsList() {

    const optionsCtx = useContext(OptionsContext);
    function vibrationHandler(){
        if( editable === true ){
            return true;
        }else{
            return false;
        }
    };

    useEffect(() => {
        setData(optionsCtx.intervalsArr);
    }, [optionsCtx.intervalsArr, vibrationHandler]);

    const [data, setData] = useState(optionsCtx.intervalsArr);

   

    const onOrderChanged = useCallback((orderedData: Array<any>) => {
        setData(orderedData);
        optionsCtx.updateIntervalsArr(orderedData);
        setEditable(false);
        vibrationHandler()
    }, []);

    const [editable, setEditable] = useState(false);
    const [showBin, setShowBin] = useState(false);
    const renderItem = ({ item }: { item: any }) => <Item key={item.id} item={item} editable={editable} setEditable={setEditable} data={data} showBin={showBin} setShowBin={setShowBin} optionsCtx={optionsCtx}/>
    const keyExtractor = ({ id }: any) => `gridview-${id}`;

    

    return (
        <View>
            { data ?
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.container, { display: data.length < 1 ? 'none' : 'flex' }]}>
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
                        contentContainerStyle={[ styles.draggableGridViewContainer, { width: data.length * SCREEN_WIDTH / 3 } ]}
                        isEditing={editable}
                        numColumns={data.length <= 3 ? 3 : data.length}
                        data={data}
                        shouldAnimOnRelease={true}
                        keyExtractor={keyExtractor}
                        onOrderChanged={onOrderChanged}
                        renderItem={renderItem}
                        horizontal={true}
                        shouldVibrate={vibrationHandler}
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
                : null }
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
