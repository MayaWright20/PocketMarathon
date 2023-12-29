import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";

import ScreenLinearBackground from "../../Constants/Styling/ScreenLinearBackground";
import { OptionsContext } from "../../Context/CustomRunContext/OptionsContext";
import PieChart from "../../Components/CustomRun/Sections/PieChart/PieChart";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../Constants/DIMENSIONS";
import SquareCTAButton from "../../Components/CustomRun/Buttons/SquareCTAButton";
import { HEADER_1 } from "../../Constants/Styling/STYLES";
import PillCTAButton from "../../Components/CustomRun/Buttons/PillCTAButton";
import { COLORS } from "../../Constants/COLORS";
import RectagularCTAButton from "../../Components/CustomRun/Buttons/RectangularCTAButton";
import TitleMaker from "../../utils/CustomRun/TitleMaker";
import ColorMaker from "../../utils/CustomRun/ColorMaker";


export default function CustomRun_StartRunScreen() {
    const { intervalsArr } = useContext(OptionsContext);
    console.log('intervalsArr', intervalsArr)
    let startRunIntervalsArr = [{
        color: [COLORS.LIGHT_ORANGE, COLORS.ORANGE],
        title: 'START',
        emoji: "📣",
    }, ...intervalsArr, 
    {
        color: [COLORS.LIGHT_ORANGE, COLORS.ORANGE],
        title: 'FINISH',
        emoji: "🏁",
    }];


    const renderItem = ({ item, index }: { item: any, index: number }) => {

        if( index === 0 ){
            return;

        } else if ( index === startRunIntervalsArr.length -1 ){

            return(
                <SquareCTAButton
                linearGradientColor1={COLORS.LIGHT_ORANGE}
                linearGradientColor2={COLORS.ORANGE}
                emoji={'🏁'}
                title={"FINISH"}
                overlayColor={""}
                onPress={() => undefined}
                width={SCREEN_WIDTH / 5}
                height={SCREEN_WIDTH / 5}
                emojiSize={30}
                titleSize={0}
            />
        )} else {
            return (
                <SquareCTAButton
                    linearGradientColor1={ColorMaker(item).color}
                    linearGradientColor2={ColorMaker(item).color2}
                    title={TitleMaker(item)}
                    overlayColor={""}
                    onPress={() => undefined}
                    width={SCREEN_WIDTH / 5}
                    height={SCREEN_WIDTH / 5}
                    emojiSize={0}
                    titleSize={0}
                />
            )
        }
    };



    // do {
    //     setTimeout(()=>{
    //         console.log('j', startRunIntervalsArr)
    //         startRunIntervalsArr.shift();
    //         console.log('j3', startRunIntervalsArr)
    //     }, 3000);
    // } while (startRunIntervalsArr.length > 1);

    return (
        <ScreenLinearBackground>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.pieChartFlatlistWrapper}>
                    <PieChart />
                    <View style={styles.currentInterval}>
                        <SquareCTAButton
                            linearGradientColor1={startRunIntervalsArr[0]?.color[0]}
                            linearGradientColor2={startRunIntervalsArr[0]?.color[1]}
                            title={startRunIntervalsArr[0]['title']}
                            emoji={startRunIntervalsArr[0]['emoji']}
                            overlayColor={""}
                            onPress={() => undefined}
                            width={SCREEN_WIDTH / 2}
                            height={SCREEN_WIDTH / 2}
                            emojiSize={30}
                            titleSize={0}
                        />
                    </View>
                </View>
                <View style={styles.flatlistWrapper}>
                    <FlatList
                        data={startRunIntervalsArr}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={renderItem}
                        ListHeaderComponent={<View style={{ width: SCREEN_WIDTH / 2, height: SCREEN_WIDTH / 3 }}></View>}
                    />
                </View>

                <View style={styles.statisticsContainer}>
                <Text style={[styles.h1, styles.title]}>STATISTICS</Text>
                    <RectagularCTAButton colors={[COLORS.ORANGE, COLORS.PINK]} emoji={"⏱️"}>
                        <Text>PUT TIMER HERE TIME</Text>
                    </RectagularCTAButton>
                    <RectagularCTAButton colors={[COLORS.LIGHT_BLUE, COLORS.MEDIUM_BLUE]} emoji={"🏎️"}>
                        <Text>PUT TIMER HERE SPEED</Text>
                    </RectagularCTAButton>
                    <RectagularCTAButton colors={[COLORS.MINT_GREEN, COLORS.GREEN]} emoji={"📏"}>
                        <Text>PUT TIMER HERE DISTANCE</Text>
                    </RectagularCTAButton>
                </View>
               
                <View style={styles.pillCTAButtonWrapper}>
                    <PillCTAButton onPress={() => undefined} color1={COLORS.LIGHT_ORANGE} color2={COLORS.ORANGE} title={"PAUSE"} />
                </View>
            </ScrollView>
        </ScreenLinearBackground>
    )
};

const styles = StyleSheet.create({
    pieChartFlatlistWrapper: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    currentInterval: {
        position: 'absolute',
    },
    h1: {
        ...HEADER_1,
    },
    title:{
        marginBottom: 5
    },
    flatlistWrapper: {
        top: -50,
        height: '15%',
    },
    statisticsContainer: {
        top: -130,
        marginHorizontal: 10,
        height: SCREEN_HEIGHT / 2.7 ,
        justifyContent: 'space-between'
    },
    pillCTAButtonWrapper: {
        top: -120,
        marginBottom: 150,
        alignSelf: 'center'
    }
});