import Tts from "react-native-tts";

export const SPEACH_INTRO = 'Welcome to your running journey with Pocket Marathon! As always, you will begin your run today with a 5 minute walk. This initial warm-up period is crucial to prepare your body for the run ahead and prevent injuries. It is also a great opportunity to get comfortable with your stride and feel the rhythm of your breathing. Dont worry I will talk you through each stage of your run, ensuring you stay on track. Get ready to enjoy your run with Pocket Marathon! Lets start the 5 minute warm up walk in 3. 2. 1. GO!';

export function speakText(element){
    Tts.speak(element);
};