import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import haversine from 'haversine-distance';

export default function useIsDistanceTravelledLocation() {
  const [prevLocation, setPrevLocation] = useState<any>(null);
  const [pass, setPass] = useState<boolean>(false);
  const [watchPosition, setWatchPosition] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  
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

  getCurrentPosition();

  let distance = 0;
  if (watchPosition && prevLocation) distance = haversine(watchPosition, prevLocation);
  return distance;
};

// import { useEffect, useState } from 'react';
// import * as Location from 'expo-location';
// import haversine from 'haversine-distance';

// export default function useIsDistanceTravelledLocation() {
//   const [prevLocation, setPrevLocation] = useState<any>(null);
//   const [pass, setPass] = useState<boolean>(false);
//   const [watchPosition, setWatchPosition] = useState<any>(null);
//   const [errorMsg, setErrorMsg] = useState<null | string>(null);


//   async function getCurrentPosition() {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== 'granted') {
//       setErrorMsg('Permission to access location was denied');
//       return;
//     };

//     let location = await Location.getCurrentPositionAsync({
//       accuracy: Location.Accuracy.BestForNavigation,
//     });

//     if (!pass) {
//       setPass(true);
//       setWatchPosition({ longitude: location.coords.longitude, latitude: location.coords.latitude });
//     } else {
//       setPrevLocation(location && { longitude: location.coords.longitude, latitude: location.coords.latitude });
//     };
//   };

//   getCurrentPosition();

//   let distance = 0;
//   if (watchPosition && prevLocation) distance = haversine(watchPosition, prevLocation);
//   return distance;
// };
