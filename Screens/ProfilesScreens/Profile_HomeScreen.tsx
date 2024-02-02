import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import useDistanceTravelledLocation from '../../Utils/Hooks/General/useIsDistanceTravelledLocation';

export default function Profile_HomeScreen() {
const distance = useDistanceTravelledLocation({distanceInterval: 1});

  return (
    <Text>
      {JSON.stringify(distance)}
    </Text>
  );
};