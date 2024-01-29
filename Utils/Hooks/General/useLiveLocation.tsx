import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';

//background permissions need to be granted
export default function useLiveLocation() {
    const [location, setLocation] = useState<any>();

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            };

            let watchId = await Location.watchPositionAsync({
                accuracy: 6,
                distanceInterval: 1,
                timeInterval: 1000 // Update every 1 seconds
            }, (newLocation) => {
                setLocation(newLocation);
            });

            return () => {
                Location.removeWatchAsync(watchId);
            };
        })();
    }, []);

    return location;
};