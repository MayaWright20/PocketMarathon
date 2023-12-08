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
    overlayColor : boolean;
    option: string | undefined;
    optionColor: string;
};


export default function CustomRun_HomeScreen() {
// can refactor again
   const [ optionsArr, setOptionsArr ] = useState(Array<IOptions | undefined>(2));
   const [ overlay, setOverlay ] = useState({time: false, speed: false, distance: false});
   
    const timeOption: IOptions = {
        overlayColor: overlay.time,
        option: 'TIME',
        optionColor: COLORS.PINK,
    };

    const speedOption: IOptions = {
        overlayColor: false,
        option: 'SPEED',
        optionColor: COLORS.PINK,
    };

    const distanceOption: IOptions = {
        overlayColor: false,
        option: 'DISTANCE',
        optionColor: COLORS.PINK,
    };

    function setOptionHandler( option: IOptions ){
        //can refactor more into a switch statement
        
        if( optionsArr[0]?.option === undefined &&  optionsArr[1]?.option === undefined){
            setOverlay((prevState) => {
                let opt = option.option?.toLowerCase();
                console.log(opt, 'opt')
                let obj = {...prevState};
                console.log(obj[opt as keyof typeof obj], 'obj.opt')
                obj[opt as keyof typeof obj] = !obj[opt as keyof typeof obj]
                return obj;
            });
            
            setOptionsArr(()=>{
                let arr = [...optionsArr];
                arr[0] = option;
                arr[1] = undefined;
                return arr;
            });
        };

        if( optionsArr[0]?.option === option?.option ){
            setOverlay((prevState) => {
                let opt = option.option?.toLowerCase();
                console.log(opt, 'opt')
                let obj = {...prevState};
                console.log(obj[opt as keyof typeof obj], 'obj.opt')
                obj[opt as keyof typeof obj] = !obj[opt as keyof typeof obj]
                return obj;
            });
            setOptionsArr(()=>{
                let arr = [...optionsArr];
                arr[0] = arr[1];
                arr[1] = undefined;
                return arr;
            });
        };

        if( optionsArr[1]?.option === option?.option ){
            setOverlay((prevState) => {
                let opt = option.option?.toLowerCase();
                console.log(opt, 'opt')
                let obj = {...prevState};
                console.log(obj[opt as keyof typeof obj], 'obj.opt')
                obj[opt as keyof typeof obj] = !obj[opt as keyof typeof obj]
                return obj;
            });
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
            setOverlay((prevState) => {
                let opt = option.option?.toLowerCase();
                console.log(opt, 'opt')
                let obj = {...prevState};
                console.log(obj[opt as keyof typeof obj], 'obj.opt')
                obj[opt as keyof typeof obj] = !obj[opt as keyof typeof obj]
                return obj;
            });
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
                <Text style={[styles.h1, styles.option1]}>{optionsArr[0]?.option}</Text>
                <Text style={styles.h1}>{optionsArr[0] !== undefined ? ' and ' : ''}</Text>
                <Text style={[styles.h1, styles.option1, ]}>{optionsArr[1]?.option}</Text>
            </View>
            <View style={styles.optionsButtonContainer}>
                <SquareCTAButton
                    linearGradientColor1={COLORS.ORANGE}
                    linearGradientColor2={COLORS.PINK}
                    onPress={() => { setOptionHandler(timeOption)}}
                    emoji={`⏱️`}
                    title={"TIME"}
                    overlayColor={ overlay.time === false ?  'transparent' : COLORS.MEDIUM_GREY}
                />
                <SquareCTAButton
                    linearGradientColor1={COLORS.LIGHT_BLUE}
                    linearGradientColor2={COLORS.MEDIUM_BLUE}
                    onPress={() => { setOptionHandler(speedOption)}}
                    emoji={`🏎️`}
                    title={"SPEED"}
                    overlayColor={overlay.speed === false ?  'transparent' : COLORS.MEDIUM_GREY}
                />
                <SquareCTAButton
                    linearGradientColor1={COLORS.MINT_GREEN}
                    linearGradientColor2={COLORS.GREEN}
                    onPress={() => { setOptionHandler(distanceOption)}}
                    emoji={`📏`}
                    title={"DISTANCE"}
                    overlayColor={overlay.distance === false ?  'transparent' : COLORS.MEDIUM_GREY}
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

