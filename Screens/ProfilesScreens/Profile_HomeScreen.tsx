import React, {useEffect, useState} from "react";
import { Text, StyleSheet, Button } from "react-native";

import ScreenLinearBackground from "../../Constants/Styling/ScreenLinearBackground";
import Tts from "react-native-tts";

export default function Profile_HomeScreen() {
  const [isRunning, setIsRunning] = useState(true);
  const [counter, setCounter] = useState(3);
  const [num, setNum] = useState(0);
  
  let timer: any;
  let arr = [{ 1000: "this is one how are you today i hope youre having a good day"}, { 20000: "this is two"},{ 6000: "this is three" }];

useEffect(() => {
  if (!isRunning) {
     clearInterval(timer);
     Tts.pause();
     return;
  }else{
    Tts.resume();
  };
 
  timer = counter > 0 && setInterval(() => {
     Tts.speak(String(Object.values(arr[num])))
     setCounter(prevCounter => prevCounter - 1);
     setNum(prev => prev + 1);
     console.log('counter', counter, 'num', num, 'arr', arr[num]);
  }, Number(Object.keys(arr[num])));
 
  return () => {
     clearInterval(timer);
  };
 }, [counter, isRunning]);
 

  return (
    <ScreenLinearBackground>
      <Text>{counter}</Text>
      <Button title="Press" onPress={() => setIsRunning(!isRunning)}/>
    </ScreenLinearBackground>
  )
};

const styles = StyleSheet.create({

});