import React, { useEffect, useState } from "react";
import * as Location from 'expo-location';

interface distanceCoords {
    longitude: number,
    latitude: number,
    speed: number | null
};

export default function Profile_HomeScreen() {

    const [location, setLocation] = useState<distanceCoords | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
    useEffect(() => {
      (async () => {
  
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied!');
          return;
        };
  
  
        let location = await Location.getCurrentPositionAsync({ accuracy: 5 });
        setLocation({
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
          speed: location.coords.speed
        });
      })();
    }, [location]);
  
    let text = 'Waiting..';
  
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    };
};