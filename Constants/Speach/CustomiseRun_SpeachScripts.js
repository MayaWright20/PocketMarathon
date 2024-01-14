import Tts from 'react-native-tts';
import { runIntervals } from "../../Context/CustomRunContext/OptionsContext";

export const CustomiseRun_SpeachIntroduction = {
    0: "Hi, I am Maya. I will be your coach for this run",
    1: "Well done for making it to run 2. You are doing well",
    2: "Hey, its Maya. Welcome back.",
};

export const CustomiseRun_SpeachFinishing = {
    0: "Well done!, You have done amazing! Remember to stay hydrated.",
    1: "Well done for completing run 2.",
    2: "Welcome back to run 3",
};

export function CustomiseRun_SpeachSpeachCreator( speachIntroction, speachEnding ){

    let runIntervalsWithIntroductionArr = runIntervals.unshift(["Today we will start the run by doing a 5 minute walk to increase your heart rate. Dont worry I will tell you when you need to run, at what speed, what distance you need to do and what time you need to run for when the time comes. To start, We are going to do a 5 minute walk. This should be fast enough to get your heart rate up. Are you ready. 3, 2, 1. Go!", speachIntroction]);

    runIntervalsWithIntroductionArr.push(speachEnding);

    return runIntervalsWithIntroductionArr;
};

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

export async function speak() {
    const COMMA = sleep(1200);
    const FULLSTOP = sleep(2400);
        
    Tts.setDucking(true);
    Tts.setDefaultPitch(1.2);
    Tts.setIgnoreSilentSwitch("ignore");

    Tts.speak("Hello", {
        iosVoiceId: 'com.apple.ttsbundle.Moira-compact',
        rate: 0.5,
    });
    
    await COMMA;
};
