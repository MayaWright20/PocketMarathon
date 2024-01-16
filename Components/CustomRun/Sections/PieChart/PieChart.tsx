import React, { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import GradientPath from 'react-native-svg-path-gradient';
import { Svg } from 'react-native-svg';

import { COLORS } from '../../../../Constants/General/COLORS';
import { SCREEN_WIDTH } from '../../../../Constants/General/DIMENSIONS';
import { OptionsContext } from '../../../../Context/CustomRunContext/OptionsContext';

export default function PieChart() {

    const optionsContext = useContext(OptionsContext);
    const intervalsArr = optionsContext.intervalsArr;
    
    let intervalsArrColors: string[] = [];

    useEffect(()=>{
        
    },[intervalsArr])

    intervalsArr.map((item) => {
        if (item?.color) {
            intervalsArrColors = intervalsArrColors.concat(item.color);
        };
    });

    return (
        <View style={styles.container}>
            <Svg
                height={'100%'}
                width={'100%'}
                viewBox={`0 0 200 200 `}>
                <Svg  height="105%" width="105%" viewBox="1 1 305 300">
                <GradientPath
                        d={
                            'M55.5,237.2c-23.5-23.3-38.1-55.6-38.1-91.3C17.3,75,74.8,17.5,145.7,17.5C216.5,17.5,274,75,274,145.9  c0,35.7-14.6,68-38.1,91.3'
                        }
                        colors={[COLORS.LIGHT_GREY]}
                        strokeWidth={16}
                        roundedCorners
                    />
                    
                <GradientPath
                        d={
                            'M55.5,237.2c-23.5-23.3-38.1-55.6-38.1-91.3C17.3,75,74.8,17.5,145.7,17.5C216.5,17.5,274,75,274,145.9  c0,35.7-14.6,68-38.1,91.3'
                        }
                        colors={intervalsArrColors.length === 0 ? [ COLORS.LIGHT_GREY ] : intervalsArrColors}
                        strokeWidth={13}
                        roundedCorners
                        // percent={.9}
                />
                </Svg>
            </Svg>
        </View>
    )
};

const styles = StyleSheet.create({
    container: { 
        width: SCREEN_WIDTH , 
        height: SCREEN_WIDTH,
    },
});
