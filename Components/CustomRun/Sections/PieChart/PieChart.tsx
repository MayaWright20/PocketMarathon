import GradientPath from 'react-native-svg-path-gradient';
import { Svg } from 'react-native-svg';
import { Text, View } from 'react-native';
import { COLORS } from '../../../../Constants/COLORS';
import { SCREEN_WIDTH } from '../../../../Constants/DIMENSIONS';

export default function PieChart() {
    return (
        <View style={{ width: SCREEN_WIDTH * 1.1, height: SCREEN_WIDTH / 1, alignItems: 'center', backgroundColor: 'transparent'}}>
            <Svg
                height={'90%'}
                width={'90%'}
                viewBox={`0 0 200 200 `}>
                <Svg height="100%" width="100%" viewBox="-2 -2 295 256">
                <GradientPath
                        d={
                            'M55.5,237.2c-23.5-23.3-38.1-55.6-38.1-91.3C17.3,75,74.8,17.5,145.7,17.5C216.5,17.5,274,75,274,145.9  c0,35.7-14.6,68-38.1,91.3'
                        }
                        colors={[COLORS.LIGHT_GREY ]}
                        strokeWidth={20}
                        roundedCorners
                    />
                    <GradientPath
                        d={
                            'M55.5,237.2c-23.5-23.3-38.1-55.6-38.1-91.3C17.3,75,74.8,17.5,145.7,17.5C216.5,17.5,274,75,274,145.9  c0,35.7-14.6,68-38.1,91.3'
                        }
                        colors={[COLORS.MEDIUM_BLUE]}
                        strokeWidth={15}
                        roundedCorners
                        percent={0.5}
                    />
                    <GradientPath
                        d={
                            'M55.5,237.2c-23.5-23.3-38.1-55.6-38.1-91.3C17.3,75,74.8,17.5,145.7,17.5C216.5,17.5,274,75,274,145.9  c0,35.7-14.6,68-38.1,91.3'
                        }
                        colors={[COLORS.PINK, COLORS.PURPLE, ]}
                        strokeWidth={15}
                        roundedCorners
                        percent={0.5}
                    />
                    <GradientPath
                        d={
                            'M55.5,237.2c-23.5-23.3-38.1-55.6-38.1-91.3C17.3,75,74.8,17.5,145.7,17.5C216.5,17.5,274,75,274,145.9  c0,35.7-14.6,68-38.1,91.3'
                        }
                        colors={[COLORS.GREEN, COLORS.MINT_GREEN]}
                        strokeWidth={15}
                        roundedCorners
                        percent={0.1}
                    />
                    
                </Svg>
            </Svg>
        </View>
    )
};
