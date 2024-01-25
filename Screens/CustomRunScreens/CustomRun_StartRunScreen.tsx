import React, { useContext, useState, useLayoutEffect } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import { useTimer } from 'react-timer-hook';
import Tts from "react-native-tts";
import ConfettiCannon from 'react-native-confetti-cannon';


import PieChart from "../../Components/CustomRun/Sections/PieChart/PieChart";
import ScreenLinearBackground from "../../Constants/Styling/ScreenLinearBackground";
import SquareCTAButton from "../../Components/CustomRun/Buttons/SquareCTAButton";
import PillCTAButton from "../../Components/CustomRun/Buttons/PillCTAButton";
import RectagularCTAButton from "../../Components/CustomRun/Buttons/RectangularCTAButton";
import useTitleMaker from "../../utils/CustomRun/useTitleMaker";
import useColorMaker from "../../utils/CustomRun/useColorMaker";

import { OptionsContext } from "../../Context/CustomRunContext/OptionsContext";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../Constants/General/DIMENSIONS";
import { HEADER_1 } from "../../Constants/Styling/STYLES";
import { COLORS } from "../../Constants/General/COLORS";
import { SPEACH_INTRO, speakText } from "../../Constants/Speach/CustomRun/SpeachMaker";

export default function CustomRun_StartRunScreen() {

    const { intervalsArr } = useContext(OptionsContext);
    let startRunIntervalsArr = [{
        color: [COLORS.LIGHT_ORANGE, COLORS.ORANGE],
        title: `START WARM UP WALK`,
        emoji: "📣",
    }, ...intervalsArr,
    {
        color: [COLORS.LIGHT_ORANGE, COLORS.ORANGE],
        title: 'FINISH',
        emoji: "🏁",
    }];



















    const renderItem = ({ item, index }: { item: any, index: number }) => {

        if (index === 0) {
            return;

        } else if (index === startRunIntervalsArr.length - 1) {

            return (
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
            )
        } else {
            return (
                <SquareCTAButton
                    linearGradientColor1={useColorMaker(item).color}
                    linearGradientColor2={useColorMaker(item).color2}
                    title={useTitleMaker(item)}
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

    const speedStatisticsItemRender = ({ item, index }: { item: any, index: number }) => {
        return (
            <View style={styles.statisticsWrapper}>
                <Text style={styles.h1Timer}>{item?.SPEED}</Text>
            </View>
        )
    };

    let hours = 0;
    let mins = 0;
    let secs = 0;

    //this should be made into numbers in context
    startRunIntervalsArr.forEach((item) => {

        if (item?.TIME) {
            if (item?.TIME.HOURS !== undefined) {
                hours += Number(item?.TIME.HOURS)
            };

            if (item?.TIME.MINS !== undefined) {
                mins += Number(item?.TIME.MINS)
            };

            if (item?.TIME.SECS !== undefined) {
                secs += Number(item?.TIME.SECS)
            };
        };
    });

    const totalIntervalSeconds = (hours * 60 * 60) + (mins * 60) + secs
    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + totalIntervalSeconds);


    //for the total remaining time component
    const [runTimeComplete, setRunTimeComplete] = useState(false);
    const {
        seconds: totalSecondsLeft,
        minutes: totalMinutesLeft,
        hours: totalHoursLeft,
        isRunning: totalIsRunning,
        pause: totalPause,
        resume: totalResume,
    } = useTimer({ expiryTimestamp, autoStart: false, onExpire: () => setRunTimeComplete(true) });

    function onPressPauseHandler() {
        totalIsRunning ? totalPause() : totalResume();

        if (speaking) {
            Tts.pause();
            setSpeaking(false);
        } else {
            Tts.resume();
            setSpeaking(true);
        };
    };

    return (
        <ScreenLinearBackground>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* <View style={styles.confettiWrapper}>
                    <ConfettiCannon
                        count={runComplete ? 200 : 0}
                        origin={{ x: -10, y: 0 }}
                        autoStart={runComplete}
                        colors={Object.values(COLORS)}
                    />
                </View> */}
                <View style={styles.pieChartFlatlistWrapper}>
                    <PieChart />
                    <View style={styles.currentInterval}>
                        <SquareCTAButton
                            linearGradientColor1={startRunIntervalsArr[0]?.color[0]}
                            linearGradientColor2={startRunIntervalsArr[0]?.color[1]}
                            title={useTitleMaker(startRunIntervalsArr[0]) || startRunIntervalsArr[0]['title'] || undefined}
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
                        ListHeaderComponent={<View style={{ width: SCREEN_WIDTH / 2, height: SCREEN_WIDTH / 3 }}>
                        </View>}
                    />
                </View>
                <View style={styles.statisticsContainer}>
                    <Text style={[styles.h1, styles.title]}>TOTAL REMAINING</Text>
                    <RectagularCTAButton colors={[COLORS.ORANGE, COLORS.PINK]} emoji={"⏱️"}>
                        <View style={styles.statisticsWrapper}>
                            <Text style={styles.h1Timer}>
                                {
                                    !runTimeComplete ? `${totalHoursLeft} : ${totalMinutesLeft} : ${totalSecondsLeft}` :
                                        'COMPLETE'
                                }
                            </Text>
                        </View>
                    </RectagularCTAButton>
                    <RectagularCTAButton colors={[COLORS.LIGHT_BLUE, COLORS.MEDIUM_BLUE]} emoji={"🏎️"}>
                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            data={startRunIntervalsArr.filter((item) => item?.['SPEED'])}
                            renderItem={speedStatisticsItemRender}
                        />
                    </RectagularCTAButton>
                    <RectagularCTAButton colors={[COLORS.MINT_GREEN, COLORS.GREEN]} emoji={"📏"}>
                        <Text>THIS WILL CONTAINER A TIMER LIKE TIME</Text>
                    </RectagularCTAButton>
                </View>
                <View style={styles.pillCTAButtonWrapper}>
                    <PillCTAButton onPress={onPressPauseHandler} color1={COLORS.LIGHT_ORANGE} color2={COLORS.ORANGE} title={totalIsRunning ? 'PAUSE' : 'RESUME'} />
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
    h1Timer: {
        fontSize: 35,
        color: COLORS.DARK_GREY,
        fontWeight: "500"
    },
    statisticsWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 20
    },
    title: {
        marginBottom: 5
    },
    flatlistWrapper: {
        top: -50,
        height: '15%',
    },
    statisticsContainer: {
        top: -130,
        marginHorizontal: 10,
        height: SCREEN_HEIGHT / 2.7,
        justifyContent: 'space-between'
    },
    pillCTAButtonWrapper: {
        top: -120,
        marginBottom: 150,
        alignSelf: 'center'
    },
    confettiWrapper: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        position: "absolute"
    }
});