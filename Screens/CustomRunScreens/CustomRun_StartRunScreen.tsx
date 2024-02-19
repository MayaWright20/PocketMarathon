import React, { useContext, useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import { useTimer } from 'react-timer-hook';
import * as Location from 'expo-location';
import haversine from 'haversine-distance';
// import Tts from "react-native-tts";
import * as Tts from "expo-speech";
import ConfettiCannon from 'react-native-confetti-cannon';

import useTitleMaker from "../../Utils/Hooks/CustomRun/useTitleMaker";
import useColorMaker from "../../Utils/Hooks/CustomRun/useColorMaker";
import useIsDistanceTravelledLocation from "../../Utils/Hooks/General/location";

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
    let explosion: any = useRef(null);
    const { intervalsArr } = useContext(OptionsContext);

    // Tts.setDefaultVoice('com.apple.voice.compact.en-IE.Moira');
    // Tts.setDucking(true);
    // Tts.setIgnoreSilentSwitch(true);
    // const TtsOptions = {
    //     voice: "com.apple.voice.enhanced.en-GB.Malcolm"
    // }
    const TtsOptions = {
        voice: "com.apple.voice.compact.en-IE.Moira"
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
        speak: "SPEACH_INTRO",
        intervalType: 'START',
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
        speak: "SPEACH_OUTRO"
    }];

    const [isRunning, setIsRunning] = useState(true);
    const [counter, setCounter] = useState(0);
    const [hasSpoken, setHasSpoken] = useState(false);
    const [intervalHours, setIntervalHours] = useState(startRunIntervalsArr[counter]?.TIME?.HOURS === undefined ? 0 : Number(startRunIntervalsArr[counter]?.TIME?.HOURS));
    const [intervalMins, setIntervalMins] = useState(startRunIntervalsArr[counter]?.TIME?.MINS === undefined ? 0 : Number(startRunIntervalsArr[counter]?.TIME?.MINS));
    const [intervalSecs, setIntervalSecs] = useState(startRunIntervalsArr[counter]?.TIME?.SECS === undefined ? 0 : Number(startRunIntervalsArr[counter]?.TIME?.SECS));
    const [timeLeftForInterval, setTimeLeftForInterval] = useState(5 * 1000);
    const [distanceMiles, setDistanceMiles] = useState(0);
    const [distanceKms, setDistanceKms] = useState(0);
    const [distanceMetres, setDistanceMetres] = useState(0);
    const [distanceLeftForInterval, setDistanceLeftForInterval] = useState((distanceMiles * 1609.34) + (distanceKms * 1000) + distanceMetres);
    const [runComplete, setRunComplete] = useState(false);

    const [firstTimeDistanceSpeak, setFirstTimeDistanceSpeak] = useState(true);
    const [firstFinishSpeech, setFirstFinishSpeech] = useState(true);


    let timer: any;

    function setDistanceNextInterval() {
        setDistanceMiles(startRunIntervalsArr[counter + 1]?.DISTANCE?.MILES === undefined ? 0 : Number(startRunIntervalsArr[counter + 1]?.DISTANCE?.MILES));
        setDistanceKms(startRunIntervalsArr[counter + 1]?.DISTANCE?.KMS === undefined ? 0 : Number(startRunIntervalsArr[counter + 1]?.DISTANCE?.KMS));
        setDistanceMetres(startRunIntervalsArr[counter + 1]?.DISTANCE?.METRES === undefined ? 0 : Number(startRunIntervalsArr[counter + 1]?.DISTANCE?.METRES));
        setDistanceLeftForInterval((distanceMiles * 1609.34) + (distanceKms * 1000) + (distanceMetres));
    };
    function setTimeNextInterval() {
        setIntervalHours(startRunIntervalsArr[counter + 1]?.TIME?.HOURS === undefined ? 0 : Number(startRunIntervalsArr[counter + 1]?.TIME?.HOURS));
        setIntervalMins(startRunIntervalsArr[counter + 1]?.TIME?.MINS === undefined ? 0 : Number(startRunIntervalsArr[counter + 1]?.TIME?.MINS));
        setIntervalSecs(startRunIntervalsArr[counter + 1]?.TIME?.SECS === undefined ? 0 : Number(startRunIntervalsArr[counter + 1]?.TIME?.SECS));
        setTimeLeftForInterval((intervalHours * 60 * 60 * 1000) + (intervalMins * 60 * 1000) + (intervalSecs * 1000));
    };

    const [prevLocation, setPrevLocation] = useState<any>(null);
    const [pass, setPass] = useState<boolean>(false);
    const [watchPosition, setWatchPosition] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState<null | string>(null);
    const [distance, setDistance] = useState<number | null>(null);


    async function getCurrentPosition() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        };

        let location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.BestForNavigation,
        });

        if (!pass) {
            setPass(true);
            setWatchPosition({ longitude: location.coords.longitude, latitude: location.coords.latitude });
        } else {
            setPrevLocation(location && { longitude: location.coords.longitude, latitude: location.coords.latitude });
        };
    };

    function nextIntervalHandler() {
        setTimeNextInterval();
        setFirstTimeDistanceSpeak(true);
        setCounter(prev => prev + 1);
    };

    function endOnDistance() {
        //MIGHT WANT TO PUT THIS IN A REUSABLE FUNCTION
        getCurrentPosition();
        if (watchPosition && prevLocation) {
            setDistance(haversine(watchPosition, prevLocation));
        };

        if (distance && distance >= distanceLeftForInterval) {
            setDistance(null);
            setPass(false);
            setPrevLocation(null);
            setWatchPosition(null);
            nextIntervalHandler();
        };
        setTimeNextInterval();
        setDistanceNextInterval();
    };

    useEffect(() => {

        if (!isRunning) {
            clearTimeout(timer);
            Tts.pause();
            return;
        } else {
            Tts.resume();
        };

        const intervalType = startRunIntervalsArr[counter]?.intervalType;

        console.log('EOD',startRunIntervalsArr[counter]?.['DISTANCE']?.['END_ON_DISTANCE'])
        switch (intervalType) {
            case 'START':
                if (firstTimeDistanceSpeak) {
                    Tts.speak(String(startRunIntervalsArr[counter]?.speak), TtsOptions);
                    setFirstTimeDistanceSpeak(false);
                };
                timer = setTimeout(() => {
                    nextIntervalHandler();
                }, timeLeftForInterval)

                break;
            case 'SPEED_TIME':
                if (firstTimeDistanceSpeak) {
                    Tts.speak(String(startRunIntervalsArr[counter]?.speak), TtsOptions);
                    setFirstTimeDistanceSpeak(false);
                };
                timer = setTimeout(() => {
                    nextIntervalHandler();
                }, timeLeftForInterval);

                break;
            case 'SPEED_DISTANCE':
                //THIS WORKS
                if (firstTimeDistanceSpeak) {
                    Tts.speak(String(startRunIntervalsArr[counter]?.speak), TtsOptions);
                    setFirstTimeDistanceSpeak(false);
                };
                endOnDistance();
                break;
            case 'DISTANCE_TIME':
                if (firstTimeDistanceSpeak) {
                    Tts.speak(String(startRunIntervalsArr[counter]?.speak), TtsOptions);
                    setFirstTimeDistanceSpeak(false);
                };
                if(startRunIntervalsArr[counter]?.['DISTANCE']?.['END_ON_DISTANCE']){
                    clearTimeout(timer);
                    endOnDistance();
                }else{
                    timer = setTimeout(() => {
                        nextIntervalHandler();
                    }, timeLeftForInterval);
                };

                break;
            case 'FINISH':
                if (firstFinishSpeech) {
                    Tts.speak(String(startRunIntervalsArr[counter]?.speak), TtsOptions); // add final Tts.speak('bye') with timer set to 5 mins
                    clearTimeout(timer);
                    setFirstFinishSpeech(false);
                    setTimeout(() => {
                        explosion.current && explosion.current.start();
                        setRunComplete(true);
                        Tts.speak('Congratulations youve completed the run!')
                    }, 5000);
                };

                break;
            default:
                Tts.speak('DEFAULT', TtsOptions);
                console.log('default')
                break;
        };

        return () => {
            clearTimeout(timer);
        };

    }, [counter,
        isRunning,
        hasSpoken,
        runComplete,
        timeLeftForInterval,
        distance,
        watchPosition,
        prevLocation,

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
    } = useTimer({ expiryTimestamp, autoStart: true, onExpire: () => setRunTimeComplete(true) });

    function onPressPauseHandler() {
        if(runComplete){
            //go to save screen
        }else{
            totalIsRunning ? totalPause() : totalResume();
            setIsRunning(!isRunning);
        }
    };

    return (
        <ScreenLinearBackground>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[styles.confettiWrapper, { zIndex: runComplete ? 2 : -1 }]}>
                    <ConfettiCannon
                        count={runComplete ? 200 : 0}
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
                    <PillCTAButton onPress={onPressPauseHandler} color1={COLORS.LIGHT_ORANGE} color2={COLORS.ORANGE} title={totalIsRunning ? 'PAUSE' : runComplete ? 'SAVE' : 'RESUME'} />
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
        alignSelf: 'center',
        zIndex: 11
    },
    confettiWrapper: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        position: "absolute",
    }
});