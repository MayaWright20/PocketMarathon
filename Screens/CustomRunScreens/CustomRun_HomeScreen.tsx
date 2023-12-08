import React, { useReducer, useState } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import ScreenLinearBackground from "../../Constants/Styling/ScreenLinearBackground";
import SquareCTAButton from "../../Components/Buttons/SquareCTAButton";
import { COLORS } from "../../Constants/COLORS";
import { BORDER_RADIUS, HEADER_1 } from "../../Constants/Styling/STYLES";
import CustomiseRunPieChart from "../../Components/CustomiseRunPieChart";
import { IrunIntervalsData } from "../../Components/CustomiseRunPieChart";
import { SCREEN_WIDTH } from "../../Constants/DIMENSIONS";


interface IOptions {
    overlay : boolean | undefined;
    option: string | undefined;
    optionColor: string;
};


export default function CustomRun_HomeScreen() {
// can refactor again
   const [ optionsArr, setOptionsArr ] = useState(Array<IOptions | undefined>(2));
   
    const timeOption: IOptions = {
        overlay: optionsArr[0]?.overlay || optionsArr[1]?.overlay,
        option: 'TIME',
        optionColor: COLORS.PINK,
    };

    const speedOption: IOptions = {
        overlay: optionsArr[0]?.overlay || optionsArr[1]?.overlay,
        option: 'SPEED',
        optionColor: COLORS.MEDIUM_BLUE,
    };

    const distanceOption: IOptions = {
        overlay: optionsArr[0]?.overlay || optionsArr[1]?.overlay,
        option: 'DISTANCE',
        optionColor: COLORS.GREEN,
    };

    function setOptionHandler( option: IOptions ){
        
        if( optionsArr[0]?.option === undefined &&  optionsArr[1]?.option === undefined){
            setOptionsArr(()=>{
                let arr = [...optionsArr];
                arr[0] = option;
                arr[1] = undefined;
                return arr;
            });
        };

        if( optionsArr[0]?.option === option?.option ){
            setOptionsArr(()=>{
                let arr = [...optionsArr];
                arr[0] = arr[1];
                arr[1] = undefined;
                return arr;
            });
        };

        if( optionsArr[1]?.option === option?.option ){
            setOptionsArr(()=>{
                let arr = [...optionsArr];
                arr[0] = arr[0];
                arr[1] = undefined;
                return arr;
            });
        };

        if( optionsArr[0] !== undefined && optionsArr[1] !== undefined  ){
            return;
        };

        if( optionsArr[0]?.option !== undefined && optionsArr[0].option !== option?.option ){
            setOptionsArr(()=>{
                let arr = [...optionsArr];
                arr[0] = arr[0];
                arr[1] = option;
                return arr;
            });
        };
        
    };

    





    const runIntervalsData: Array<IrunIntervalsData> = [
        {
            value: 1,
            color: COLORS.LIGHT_GREY,
        },
    ];

    return (
        <ScreenLinearBackground>
            <View style={styles.h1Wrapper}>
                <Text style={styles.h1}>Customise run by </Text>
                <Text style={[styles.h1, styles.option1, {color: optionsArr[0]?.optionColor}]}>{optionsArr[0]?.option}</Text>
                <Text style={styles.h1}>{optionsArr[0] !== undefined ? ' and ' : ''}</Text>
                <Text style={[styles.h1, styles.option1, {color: optionsArr[1]?.optionColor}]}>{optionsArr[1]?.option}</Text>
            </View>
            <View style={styles.optionsButtonContainer}>
                <SquareCTAButton
                    linearGradientColor1={COLORS.ORANGE}
                    linearGradientColor2={COLORS.PINK}
                    onPress={() => { setOptionHandler(timeOption)}}
                    emoji={`⏱️`}
                    title={"TIME"}
                    overlayColor={optionsArr[0]?.option === 'TIME' || optionsArr[1]?.option === 'TIME' ? COLORS.MEDIUM_GREY : 'transparent'}
                />
                <SquareCTAButton
                    linearGradientColor1={COLORS.LIGHT_BLUE}
                    linearGradientColor2={COLORS.MEDIUM_BLUE}
                    onPress={() => { setOptionHandler(speedOption)}}
                    emoji={`🏎️`}
                    title={"SPEED"}
                    overlayColor={optionsArr[0]?.option === 'SPEED' || optionsArr[1]?.option === 'SPEED' ? COLORS.MEDIUM_GREY : 'transparent'}
                />
                <SquareCTAButton
                    linearGradientColor1={COLORS.MINT_GREEN}
                    linearGradientColor2={COLORS.GREEN}
                    onPress={() => { setOptionHandler(distanceOption)}}
                    emoji={`📏`}
                    title={"DISTANCE"}
                    overlayColor={optionsArr[0]?.option === 'DISTANCE' || optionsArr[1]?.option === 'DISTANCE' ? COLORS.MEDIUM_GREY : 'transparent'}
                />
            </View>

            
                    
            <CustomiseRunPieChart runIntervalsData={runIntervalsData}/>
             
            
            

            
        </ScreenLinearBackground>
    )
};

const styles = StyleSheet.create({
    optionsButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    h1: HEADER_1,
    option1: {
        fontWeight: "600"
    },
    h1Wrapper: {
        flexDirection: 'row'
    },
    CTAButtonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    CTAButtonWrapper: {
        overflow: 'hidden',
        width: SCREEN_WIDTH /3,
        borderRadius: BORDER_RADIUS,
        borderWidth: 2,
        borderColor: COLORS.LIGHT_GREY
    },
    CTAButton: {
        alignItems: 'center',
        padding: 15,
    }
});

