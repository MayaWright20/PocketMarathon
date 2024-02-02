import React, { useContext, useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import { useTimer } from 'react-timer-hook';
// import Tts from "react-native-tts";
import * as Tts from "expo-speech";
import * as Location from 'expo-location';
import ConfettiCannon from 'react-native-confetti-cannon';

import useTitleMaker from "../../Utils/Hooks/CustomRun/useTitleMaker";
import useColorMaker from "../../Utils/Hooks/CustomRun/useColorMaker";

import PieChart from "../../Components/CustomRun/Sections/PieChart/PieChart";
import ScreenLinearBackground from "../../Constants/Styling/ScreenLinearBackground";
import SquareCTAButton from "../../Components/CustomRun/Buttons/SquareCTAButton";
import PillCTAButton from "../../Components/CustomRun/Buttons/PillCTAButton";
import RectagularCTAButton from "../../Components/CustomRun/Buttons/RectangularCTAButton";


import { OptionsContext } from "../../Context/CustomRunContext/OptionsContext";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../Constants/General/DIMENSIONS";
import { HEADER_1 } from "../../Constants/Styling/STYLES";
import { COLORS } from "../../Constants/General/COLORS";
import { SPEACH_INTRO, SPEACH_OUTRO } from "../../Constants/Speach/CustomRun/SpeachMaker";


export default function CustomRun_StartRunScreen() {
    let explosion: any = useRef();
    const { intervalsArr } = useContext(OptionsContext);

    // Tts.setDefaultVoice('com.apple.voice.compact.en-IE.Moira');
    // Tts.setDucking(true);
    // Tts.setIgnoreSilentSwitch(true);
    const TtsOptions = {
        voice: "com.apple.voice.enhanced.en-GB.Malcolm"
    }

    let startRunIntervalsArr = [{
        color: [COLORS.LIGHT_ORANGE, COLORS.ORANGE],
        title: `START WARM UP WALK`, //if interval isnt showing the correct color look at the useColorMaker hook or useTitleMake for title
        emoji: `📣`,
        "TIME": {
            "HOURS": undefined,
            "MINS": undefined,
            "SECS": "5"
        },
        speak: "SPEACH_INTRO"
    }, ...intervalsArr,
    {
        color: [COLORS.LIGHT_ORANGE, COLORS.ORANGE],
        title: 'FINISH', //if interval isnt showing the correct color look at the useColorMaker hook or useTitleMake for title
        emoji: "🏁",
        "TIME": {
            "HOURS": undefined,
            "MINS": undefined,
            "SECS": "5"
        },
        intervalType: 'FINISH',
        speak: SPEACH_OUTRO
    }];

    const [isRunning, setIsRunning] = useState(true);
    const [counter, setCounter] = useState(0);
    const [hasSpoken, setHasSpoken] = useState(false);
    const [intervalHours, setIntervalHours] = useState(startRunIntervalsArr[counter]?.TIME?.HOURS === undefined ? 0 : Number(startRunIntervalsArr[counter]?.TIME?.HOURS));
    const [intervalMins, setIntervalMins] = useState(startRunIntervalsArr[counter]?.TIME?.MINS === undefined ? 0 : Number(startRunIntervalsArr[counter]?.TIME?.MINS));
    const [intervalSecs, setIntervalSecs] = useState(startRunIntervalsArr[counter]?.TIME?.SECS === undefined ? 0 : Number(startRunIntervalsArr[counter]?.TIME?.SECS));
    const [timeLeftForInterval, setTimeLeftForInterval] = useState((intervalHours * 60 * 1000) + (intervalMins * 60 * 1000) + (intervalSecs * 1000));
    const [distanceMiles, setDistanceMiles] = useState(0);
    const [distanceKms, setDistanceKms] = useState(0);
    const [distanceMetres, setDistanceMetres] = useState(0);
    const [distanceLeftForInterval, setDistanceLeftForInterval] = useState((distanceMiles * 1609.34) + (distanceKms * 1000) + distanceMetres);
    const [runComplete, setRunComplete] = useState(false);


    const [location, setLocation] = useState<any>();
    const [prevLocation, setPrevLocation] = useState<any>(null);
    const [distanceComplete, setDistanceComplete] = useState(false);

    let timer: any;

    function setDistanceNextInterval(){
        setDistanceMiles(startRunIntervalsArr[counter + 1]?.DISTANCE?.MILES === undefined ? 0 : Number(startRunIntervalsArr[counter + 1]?.DISTANCE?.MILES));
        setDistanceKms(startRunIntervalsArr[counter + 1]?.DISTANCE?.KMS === undefined ? 0 : Number(startRunIntervalsArr[counter + 1]?.DISTANCE?.KMS));
        setDistanceMetres(startRunIntervalsArr[counter + 1]?.DISTANCE?.METRES === undefined ? 0 : Number(startRunIntervalsArr[counter + 1]?.DISTANCE?.METRES));
        setDistanceLeftForInterval((distanceMiles * 1609.34) + (distanceKms * 1000) + (distanceMetres));
    };
    function setTimeNextInterval(){
        setIntervalHours(startRunIntervalsArr[counter + 1]?.TIME?.HOURS === undefined ? 0 : Number(startRunIntervalsArr[counter + 1]?.TIME?.HOURS));
        setIntervalMins(startRunIntervalsArr[counter + 1]?.TIME?.MINS === undefined ? 0 : Number(startRunIntervalsArr[counter + 1]?.TIME?.MINS));
        setIntervalSecs(startRunIntervalsArr[counter + 1]?.TIME?.SECS === undefined ? 0 : Number(startRunIntervalsArr[counter + 1]?.TIME?.SECS));
        setTimeLeftForInterval((intervalHours * 60 * 60 * 1000) + (intervalMins * 60 * 1000) + (intervalSecs * 1000));     
    };

    useEffect(() => {


        if (!isRunning) {
            clearTimeout(timer);
            Tts.pause();
            return;
        } else {
            Tts.resume();
        };

        //speaks the start interval
        if (!hasSpoken) {
            Tts.speak(String(startRunIntervalsArr[counter]?.speak), TtsOptions);
            setTimeNextInterval();
            setDistanceNextInterval();
            setHasSpoken(true);
        };

        if (counter === startRunIntervalsArr.length - 1) {
            setRunComplete(true);
            explosion.current && explosion.current.start();
        };

       

        

        timer = counter < startRunIntervalsArr.length - 1 && startRunIntervalsArr[counter]?.['DISTANCE']?.['END_ON_DISTANCE'] !== true && setTimeout(() => {

            Tts.speak(String(startRunIntervalsArr[counter + 1]?.speak), TtsOptions);

            let intervalType = startRunIntervalsArr[counter]?.intervalType;
            switch(intervalType){
                case 'SPEED_TIME':
                    intervalType = setTimeNextInterval();
                    setCounter(prevCounter => prevCounter + 1);
                    break;
                case 'SPEED_DISTANCE':
                    if(startRunIntervalsArr[counter + 1 ]?.['DISTANCE']?.['END_ON_DISTANCE'] === true){
                        intervalType = setDistanceNextInterval();
                        setCounter(prevCounter => prevCounter + 1);
                        //promise for the distance calculator
                        //wait for the distance calculator to be true
                        // set the password to false (new promise)
                        
                    }else{
                        intervalType = console.log('end on distance = false');
                        setDistanceNextInterval();
                        setDistanceNextInterval();
                        setTimeNextInterval();
                        setCounter(prevCounter => prevCounter + 1);
                        //something to show if the distance has been made or not (tts.speak(distance made))
                    };
                    console.log('hi');
                    break;
                case 'DISTANCE_TIME':
                    setDistanceNextInterval();
                    setTimeNextInterval();
                    setCounter(prevCounter => prevCounter + 1);
                    //something to show if the distance has been made or not (tts.speak(distance made))
                    break;
                case 'FINSIH':
                    setTimeout(()=> Tts.speak('Work out complete! See you again next time!'), 5 * 60 * 1000);
                    setDistanceComplete(false);
                default:
                    console.log('Error');
                    setCounter(prevCounter => prevCounter + 1);
            };

            
        }, timeLeftForInterval);

    

        return () => {
            clearTimeout(timer);
        };

    }, [counter,
        isRunning,
        hasSpoken,
        runComplete,
        timeLeftForInterval,
        distanceComplete,
        location,
    ]);

    const renderItem = ({ item, index }: { item: any, index: number }) => {

        if (index === 0) {
            return;
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
        setIsRunning(!isRunning);
    };

    return (
        <ScreenLinearBackground>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[styles.confettiWrapper, { zIndex: runComplete ? 2 : -1 }]}>
                    <ConfettiCannon
                        count={runComplete ? 250 : 0}
                        origin={{ x: 10, y: 0 }}
                        autoStart={false}
                        colors={Object.values(COLORS)}
                        ref={explosion}
                    />
                </View>
                <View style={styles.pieChartFlatlistWrapper}>
                    <PieChart />
                    <View style={styles.currentInterval}>
                        <SquareCTAButton
                            linearGradientColor1={startRunIntervalsArr[counter]?.color[0]}
                            linearGradientColor2={startRunIntervalsArr[counter]?.color[1]}
                            title={useTitleMaker(startRunIntervalsArr[counter]) || undefined}
                            emoji={startRunIntervalsArr[counter]?.['emoji']}
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
                        data={startRunIntervalsArr.slice(counter)}
                        showsHorizontalScrollIndicator={false}
                        horizontal
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
        position: "absolute",
    }
});