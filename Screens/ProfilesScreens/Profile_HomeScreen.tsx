import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import useIsDistanceTravelledLocation from '../../Utils/Hooks/General/location';

export default function Profile_HomeScreen() {
const distance = useIsDistanceTravelledLocation();

const hi = distance >= 2;

  return (
    <Text>
      {JSON.stringify(hi)}
    </Text>
  );
};