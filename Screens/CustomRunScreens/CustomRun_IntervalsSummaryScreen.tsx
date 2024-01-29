import React, { useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";
// import Tts from "react-native-tts";
import * as Tts from "expo-speech";

import ScreenLinearBackground from "../../Constants/Styling/ScreenLinearBackground";
import PillCTAButton from "../../Components/CustomRun/Buttons/PillCTAButton";
import SquareCTAButton from "../../Components/CustomRun/Buttons/SquareCTAButton";
import useColorMaker from "../../Utils/Hooks/CustomRun/useColorMaker";
import useTitleMaker from "../../Utils/Hooks/CustomRun/useTitleMaker";

import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../Constants/General/DIMENSIONS";
import { OptionsContext } from "../../Context/CustomRunContext/OptionsContext";
import { BORDER_RADIUS } from "../../Constants/Styling/STYLES";
import { COLORS } from "../../Constants/General/COLORS";


const Item = ({ item }: { item: any }) => (

    <SquareCTAButton
        linearGradientColor1={item ? useColorMaker(item).color : COLORS.LIGHT_ORANGE}
        linearGradientColor2={item ? useColorMaker(item).color2 : COLORS.ORANGE}
        title={useTitleMaker(item)}
        emoji={''}
        overlayColor={''}
        onPress={() => { }}
        width={SCREEN_WIDTH * 0.95}
        height={SCREEN_HEIGHT / 10}
        emojiSize={25}
        titleSize={14}
        onLongPress={() => undefined}
    />
);

export default function CustomRun_IntervalsSummaryScreen({ navigation }) {
    Tts.stop();

    
    const { intervalsArr } = useContext(OptionsContext);
    console.log(intervalsArr)

    const renderItem = ({ item }: { item: any }) => <Item key={item.id} item={item} />
    const startInterval = <SquareCTAButton
        linearGradientColor1={COLORS.LIGHT_ORANGE}
        linearGradientColor2={COLORS.ORANGE}
        title={'START'}
        emoji={'📣'}
        overlayColor={''}
        onPress={() => { }}
        width={SCREEN_WIDTH * 0.95}
        height={SCREEN_HEIGHT / 10}
        emojiSize={25}
        titleSize={14}
        onLongPress={() => undefined}
    />
    const finishInterval = <View style={styles.finishButton}>
        <SquareCTAButton
        linearGradientColor1={COLORS.LIGHT_ORANGE}
        linearGradientColor2={COLORS.ORANGE}
        title={'FINISH'}
        emoji={'🏁'}
        overlayColor={''}
        onPress={() => { }}
        width={SCREEN_WIDTH * 0.95}
        height={SCREEN_HEIGHT / 10}
        emojiSize={25}
        titleSize={14}
        onLongPress={() => undefined}
        />
        <View style={styles.pillButtonWrapper}>
            <PillCTAButton onPress={()=>navigation.navigate('CustomRun_StartRunScreen')} color1={COLORS.LIGHT_ORANGE} color2={COLORS.ORANGE} title={"START"} />
        </View>
    </View>
    
    return (
        <ScreenLinearBackground>
            <View style={styles.itemswrapper}>
                <FlatList 
                data={intervalsArr} 
                renderItem={renderItem}
                ListHeaderComponent={startInterval}
                ListFooterComponent={finishInterval}               
                />
            </View>
        </ScreenLinearBackground>
    )
};

const styles = StyleSheet.create({
    itemswrapper:{
        alignItems: 'center',
        marginTop: 15
    },
    itemContainer: {
        padding: 5,
        margin: 5,
        borderRadius: BORDER_RADIUS,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: COLORS.LIGHT_GREY,
    },
    finishButton:{
        marginBottom: 250
    },
    pillButtonWrapper: {
        alignSelf: 'center'
    }
});