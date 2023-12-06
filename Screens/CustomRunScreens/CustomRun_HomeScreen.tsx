import React, { useReducer } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import ScreenLinearBackground from "../../Constants/Styling/ScreenLinearBackground";
import SquareCTAButton from "../../Components/Buttons/SquareCTAButton";
import { COLORS } from "../../Constants/COLORS";
import { BORDER_RADIUS, HEADER_1 } from "../../Constants/Styling/STYLES";
import CustomiseRunPieChart from "../../Components/CustomiseRunPieChart";
import { IrunIntervalsData } from "../../Components/CustomiseRunPieChart";
import { SCREEN_WIDTH } from "../../Constants/DIMENSIONS";
import { LinearGradient } from "expo-linear-gradient";

//REDUCER NEEDS A MASSIVE REFACTOR
function reducer(state: {

    overlayColor1: boolean;
    overlayColor2: boolean;
    overlayColor3: boolean;
    option1: string | undefined;
    option1Color: string | undefined;
    h1And: string;
    option2: string | undefined;
    option2Color: string | undefined;

}, action: { type: string; }): any {

    if (action.type === 'TIME') {
        if (state.overlayColor2 === true && state.overlayColor3 === true){
            return{
                ...state
            }
        }
            if (state.option1 === 'TIME' && state.option2 === undefined) {
                return {
                    overlayColor1: state.overlayColor1 = !state.overlayColor1,
                    overlayColor2: state.overlayColor2 = state.overlayColor2,
                    overlayColor3: state.overlayColor3 = state.overlayColor3,
                    option1: state.option1 = undefined,
                    h1And: state.h1And = '',
                    option2: state.option2 = state.option2,
                    option1Color: state.option1Color = undefined,
                    option2Color: state.option2Color = state.option2Color

                }
            } else if (state.option2 === 'TIME') {
                return {
                    overlayColor1: state.overlayColor1 = !state.overlayColor1,
                    overlayColor2: state.overlayColor2 = state.overlayColor2,
                    overlayColor3: state.overlayColor3 = state.overlayColor3,
                    option1: state.option1 = state.option1,
                    h1And: state.h1And = ' and ',
                    option2: state.option2 = undefined,
                    option1Color: state.option1Color = state.option1Color,
                    option2Color: state.option2Color = undefined

                }
            } else if (state.option1 === 'TIME' && state.option2 !== undefined) {
                return {
                    overlayColor1: state.overlayColor1 = !state.overlayColor1,
                    overlayColor2: state.overlayColor2 = state.overlayColor2,
                    overlayColor3: state.overlayColor3 = state.overlayColor3,
                    option1: state.option1 = state.option2,
                    h1And: state.h1And = ' and ',
                    option2: state.option2 = undefined,
                    option1Color: state.option1Color = state.option2Color,
                    option2Color: state.option2Color = undefined
                }
            } else if (state.option1 === undefined && state.option2 === undefined) {
                return {
                    
                    overlayColor1: state.overlayColor1 = !state.overlayColor1,
                    overlayColor2: state.overlayColor2 = state.overlayColor2,
                    overlayColor3: state.overlayColor3 = state.overlayColor3,
                    option1: state.option1 = 'TIME',
                    h1And: state.h1And = ' and ',
                    option2: state.option2 = state.option2,
                    option1Color: state.option1Color = COLORS.PINK,
                    option2Color: state.option2Color = state.option2
                }
            } else if (state.option1 !== 'TIME' && state.option2 !== 'TIME') {
                return {
                    
                    overlayColor1: state.overlayColor1 = !state.overlayColor1,
                    overlayColor2: state.overlayColor2 = state.overlayColor2,
                    overlayColor3: state.overlayColor3 = state.overlayColor3,
                    option1: state.option1 = state.option1,
                    h1And: state.h1And = ' and ',
                    option2: state.option2 = 'TIME',
                    option1Color: state.option1Color = state.option1Color,
                    option2Color: state.option2Color = COLORS.PINK
                }
            } else {
                console.log('WARNING TIME')
            }
    };





    if (action.type === 'SPEED') {
        if (state.overlayColor1 === true && state.overlayColor3 === true){
            return{
                ...state
            }
        }
        if (state.option1 === 'SPEED' && state.option2 === undefined) {
            return {
                overlayColor1: state.overlayColor1 = state.overlayColor1,
                overlayColor2: state.overlayColor2 = !state.overlayColor2,
                overlayColor3: state.overlayColor3 = state.overlayColor3,
                option1: state.option1 = undefined,
                h1And: state.h1And = '',
                option2: state.option2 = state.option2,
                option1Color: state.option1Color = undefined,
                option2Color: state.option2Color = state.option2
            }
        } else if (state.option2 === 'SPEED') {
            return {
                overlayColor1: state.overlayColor1 = state.overlayColor1,
                overlayColor2: state.overlayColor2 = !state.overlayColor2,
                overlayColor3: state.overlayColor3 = state.overlayColor3,
                option1: state.option1 = state.option1,
                h1And: state.h1And = ' and ',
                option2: state.option2 = undefined,
                option1Color: state.option1Color = state.option1Color,
                option2Color: state.option2Color = undefined
            }
        } else if (state.option1 === 'SPEED' && state.option2 !== undefined) {
            return {
                overlayColor1: state.overlayColor1 = state.overlayColor1,
                overlayColor2: state.overlayColor2 = !state.overlayColor2,
                overlayColor3: state.overlayColor3 = state.overlayColor3,
                option1: state.option1 = state.option2,
                h1And: state.h1And = ' and ',
                option2: state.option2 = undefined,
                option1Color: state.option1Color = state.option2Color,
                option2Color: state.option2Color = undefined
            }
        } else if (state.option1 === undefined && state.option2 === undefined) {
            return {
                overlayColor1: state.overlayColor1 = state.overlayColor1,
                overlayColor2: state.overlayColor2 = !state.overlayColor2,
                overlayColor3: state.overlayColor3 = state.overlayColor3,
                option1: state.option1 = 'SPEED',
                h1And: state.h1And = ' and ',
                option2: state.option2 = state.option2,
                option1Color: state.option1Color = COLORS.MEDIUM_BLUE,
                option2Color: state.option2Color = state.option2Color
            }
        } else if (state.option1 !== 'SPEED' && state.option2 !== 'SPEED') {
            return {
                overlayColor1: state.overlayColor1 = state.overlayColor1,
                overlayColor2: state.overlayColor2 = !state.overlayColor2,
                overlayColor3: state.overlayColor3 = state.overlayColor3,
                option1: state.option1 = state.option1,
                h1And: state.h1And = ' and ',
                option2: state.option2 = 'SPEED',
                option1Color: state.option1Color = state.option1Color,
                option2Color: state.option2Color = COLORS.MEDIUM_BLUE
            }
        } else {
            console.log('WARNING SPEED')
        }
    };


    if (action.type === 'DISTANCE') {

        if(state.overlayColor1 === true && state.overlayColor2 === true){
            return{
                ...state
            }
        }
            
        if (state.option1 === 'DISTANCE' && state.option2 === undefined) {
            return {
                overlayColor1: state.overlayColor1 = state.overlayColor1,
                overlayColor2: state.overlayColor2 = state.overlayColor2,
                overlayColor3: state.overlayColor3 = !state.overlayColor3,
                option1: state.option1 = undefined,
                h1And: state.h1And = '',
                option2: state.option2 = state.option2,
                option1Color: state.option1Color = undefined,
                option2Color: state.option2Color = state.option2Color
            }
        } else if (state.option2 === 'DISTANCE') {
            return {
                overlayColor1: state.overlayColor1 = state.overlayColor1,
                overlayColor2: state.overlayColor2 = state.overlayColor2,
                overlayColor3: state.overlayColor3 = !state.overlayColor3,
                option1: state.option1 = state.option1,
                h1And: state.h1And = ' and ',
                option2: state.option2 = undefined,
                option1Color: state.option1Color = state.option1,
                option2Color: state.option2Color = undefined
            }
        } else if (state.option1 === 'DISTANCE' && state.option2 !== undefined) {
            return {
                overlayColor1: state.overlayColor1 = state.overlayColor1,
                overlayColor2: state.overlayColor2 = state.overlayColor2,
                overlayColor3: state.overlayColor3 = !state.overlayColor3,
                option1: state.option1 = state.option2,
                h1And: state.h1And = ' and ',
                option2: state.option2 = undefined,
                option1Color: state.option1Color = state.option2Color,
                option2Color: state.option2Color = undefined
            }
        } else if (state.option1 === undefined && state.option2 === undefined) {
            return {
                overlayColor1: state.overlayColor1 = state.overlayColor1,
                overlayColor2: state.overlayColor2 = state.overlayColor2,
                overlayColor3: state.overlayColor3 = !state.overlayColor3,
                option1: state.option1 = 'DISTANCE',
                h1And: state.h1And = ' and ',
                option2: state.option2 = state.option2,
                option1Color: state.option1Color = COLORS.GREEN,
                option2Color: state.option2Color = state.option2Color
            }
        } else if (state.option1 !== 'DISTANCE' && state.option2 !== 'DISTANCE') {
            return {
                overlayColor1: state.overlayColor1 = state.overlayColor1,
                overlayColor2: state.overlayColor2 = state.overlayColor2,
                overlayColor3: state.overlayColor3 = !state.overlayColor3,
                option1: state.option1 = state.option1,
                h1And: state.h1And = ' and ',
                option2: state.option2 = 'DISTANCE',
                option1Color: state.option1Color = state.option1Color,
                option2Color: state.option2Color = COLORS.GREEN
            }
        } else {
            console.log('WARNING DISTANCE')
        }
    };
};

export default function CustomRun_HomeScreen() {

    function addIntervalHandler(){
        console.log('add')
    }

    function clearIntervalHandler(){
        console.log('clear')
    }

    const [state, dispatch] = useReducer(
        reducer, {
        overlayColor1: false,
        overlayColor2: false,
        overlayColor3: false,
        option1: undefined,
        option1Color: undefined,
        h1And: '',
        option2: undefined,
        option2Color: undefined
    });

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
                <Text style={[styles.h1, styles.option1, {color: state.option1Color}]}>{state.option1}</Text>
                <Text style={styles.h1}>{state.h1And}</Text>
                <Text style={[styles.h1, styles.option1, {color: state.option2Color}]}>{state.option2}</Text>
            </View>
            <View style={styles.optionsButtonContainer}>
                <SquareCTAButton
                    linearGradientColor1={COLORS.ORANGE}
                    linearGradientColor2={COLORS.PINK}
                    onPress={() => { dispatch({ type: 'TIME' }) }}
                    emoji={`⏱️`}
                    title={"TIME"}
                    overlayColor={state.overlayColor1 === false ? 'transparent' : COLORS.DARK_GREY}
                />
                <SquareCTAButton
                    linearGradientColor1={COLORS.LIGHT_BLUE}
                    linearGradientColor2={COLORS.MEDIUM_BLUE}
                    onPress={() => { dispatch({ type: 'SPEED' }) }}
                    emoji={`🏎️`}
                    title={"SPEED"}
                    overlayColor={state.overlayColor2 === false ? 'transparent' : COLORS.DARK_GREY}
                />
                <SquareCTAButton
                    linearGradientColor1={COLORS.MINT_GREEN}
                    linearGradientColor2={COLORS.GREEN}
                    onPress={() => { dispatch({ type: 'DISTANCE' }) }}
                    emoji={`📏`}
                    title={"DISTANCE"}
                    overlayColor={state.overlayColor3 === false ? 'transparent' : COLORS.DARK_GREY}
                />
            </View>

            <CustomiseRunPieChart runIntervalsData={runIntervalsData}/>

            <View style={styles.CTAButtonContainer}>

                <TouchableHighlight
                    style={styles.CTAButtonWrapper}
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                    onPress={addIntervalHandler}
                    >
                        <LinearGradient
                        colors={[COLORS.LIGHT_ORANGE, COLORS.ORANGE]}
                        style={styles.CTAButton}
                        >
                            <Text>Add</Text>
                        </LinearGradient>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.CTAButtonWrapper}
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                    onPress={clearIntervalHandler}
                    >
                        <LinearGradient
                        colors={[COLORS.LIGHT_GREY, COLORS.MEDIUM_GREY]}
                        style={styles.CTAButton}
                        >
                            <Text>Add</Text>
                        </LinearGradient>
                </TouchableHighlight>
            </View>
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

