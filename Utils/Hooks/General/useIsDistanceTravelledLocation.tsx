import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

function useDistanceTravelled(loc1: any, loc2: any) {
  if(!loc1 || !loc2){
    return;
  }
    const R = 6371e3; // metres
    const φ1 = loc1.coords.latitude * Math.PI / 180; // φ, λ in radians
    const φ2 = loc2.coords.latitude * Math.PI / 180;
    const Δφ = (loc2.coords.latitude - loc1.coords.latitude) * Math.PI / 180;
    const Δλ = (loc2.coords.longitude - loc1.coords.longitude) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres
    return d;
}

export default function useDistanceTravelledLocation({distanceInterval}) {
  const [prevLocation, setPrevLocation] = useState(null);
  const [pass, setPass] = useState(false);
  const [watchPosition, setWatchPosition] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

 async function getCurrentPosition(){
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      if(!pass){
        setPass(true);
        setPrevLocation(location);
      }else{
        setWatchPosition(location);
      }
    }
    getCurrentPosition()

    const distance = useDistanceTravelled(prevLocation, watchPosition);
    const distanceMoreThanlocationTravelled = distance >= distanceInterval


    return distanceMoreThanlocationTravelled;



//   let text = 'Waiting..';
//   if (errorMsg) {
//     text = errorMsg;
//   } else if (prevLocation) {
//     text = JSON.stringify(prevLocation);
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.paragraph}>{text}</Text>
//       <Text style={styles.paragraph}>{JSON.stringify(watchPosition)}</Text>
//       <Text style={styles.paragraph}>hi{JSON.stringify(distance)}</Text>
//       <Text>distanceMoreThanlocationTravelled {JSON.stringify(distanceMoreThanlocationTravelled)}</Text>
//     </View>
//   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});
