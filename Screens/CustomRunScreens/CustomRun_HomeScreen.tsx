import React, { useReducer } from "react";
import { View, Text, StyleSheet } from "react-native";
import ScreenLinearBackground from "../../Constants/Styling/ScreenLinearBackground";
import SquareCTAButton from "../../Components/Buttons/SquareCTAButton";
import { COLORS } from "../../Constants/COLORS";
import { HEADER_1 } from "../../Constants/Styling/STYLES";
import CustomiseRunPieChart from "../../Components/CustomiseRunPieChart";
import { IrunIntervalsData } from "../../Components/CustomiseRunPieChart";

function reducer(state: {

    overlayColor1: boolean;
    overlayColor2: boolean;
    overlayColor3: boolean;
    option1: string | undefined;
    h1And: string;
    option2: string | undefined;

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
                    option2: state.option2 = state.option2
                }
            } else if (state.option2 === 'TIME') {
                return {
                    overlayColor1: state.overlayColor1 = !state.overlayColor1,
                    overlayColor2: state.overlayColor2 = state.overlayColor2,
                    overlayColor3: state.overlayColor3 = state.overlayColor3,
                    option1: state.option1 = state.option1,
                    h1And: state.h1And = ' and ',
                    option2: state.option2 = undefined
                }
            } else if (state.option1 === 'TIME' && state.option2 !== undefined) {
                return {
                    overlayColor1: state.overlayColor1 = !state.overlayColor1,
                    overlayColor2: state.overlayColor2 = state.overlayColor2,
                    overlayColor3: state.overlayColor3 = state.overlayColor3,
                    option1: state.option1 = state.option2,
                    h1And: state.h1And = ' and ',
                    option2: state.option2 = undefined
                }
            } else if (state.option1 === undefined && state.option2 === undefined) {
                return {
                    overlayColor1: state.overlayColor1 = !state.overlayColor1,
                    overlayColor2: state.overlayColor2 = state.overlayColor2,
                    overlayColor3: state.overlayColor3 = state.overlayColor3,
                    option1: state.option1 = 'TIME',
                    h1And: state.h1And = ' and ',
                    option2: state.option2 = state.option2
                }
            } else if (state.option1 !== 'TIME' && state.option2 !== 'TIME') {
                return {
                    overlayColor1: state.overlayColor1 = !state.overlayColor1,
                    overlayColor2: state.overlayColor2 = state.overlayColor2,
                    overlayColor3: state.overlayColor3 = state.overlayColor3,
                    option1: state.option1 = state.option1,
                    h1And: state.h1And = ' and ',
                    option2: state.option2 = 'TIME'
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
                option2: state.option2 = state.option2
            }
        } else if (state.option2 === 'SPEED') {
            return {
                overlayColor1: state.overlayColor1 = state.overlayColor1,
                overlayColor2: state.overlayColor2 = !state.overlayColor2,
                overlayColor3: state.overlayColor3 = state.overlayColor3,
                option1: state.option1 = state.option1,
                h1And: state.h1And = ' and ',
                option2: state.option2 = undefined
            }
        } else if (state.option1 === 'SPEED' && state.option2 !== undefined) {
            return {
                overlayColor1: state.overlayColor1 = state.overlayColor1,
                overlayColor2: state.overlayColor2 = !state.overlayColor2,
                overlayColor3: state.overlayColor3 = state.overlayColor3,
                option1: state.option1 = state.option2,
                h1And: state.h1And = ' and ',
                option2: state.option2 = undefined
            }
        } else if (state.option1 === undefined && state.option2 === undefined) {
            return {
                overlayColor1: state.overlayColor1 = state.overlayColor1,
                overlayColor2: state.overlayColor2 = !state.overlayColor2,
                overlayColor3: state.overlayColor3 = state.overlayColor3,
                option1: state.option1 = 'SPEED',
                h1And: state.h1And = ' and ',
                option2: state.option2 = state.option2
            }
        } else if (state.option1 !== 'SPEED' && state.option2 !== 'SPEED') {
            return {
                overlayColor1: state.overlayColor1 = state.overlayColor1,
                overlayColor2: state.overlayColor2 = !state.overlayColor2,
                overlayColor3: state.overlayColor3 = state.overlayColor3,
                option1: state.option1 = state.option1,
                h1And: state.h1And = ' and ',
                option2: state.option2 = 'SPEED'
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
                option2: state.option2 = state.option2
            }
        } else if (state.option2 === 'DISTANCE') {
            return {
                overlayColor1: state.overlayColor1 = state.overlayColor1,
                overlayColor2: state.overlayColor2 = state.overlayColor2,
                overlayColor3: state.overlayColor3 = !state.overlayColor3,
                option1: state.option1 = state.option1,
                h1And: state.h1And = ' and ',
                option2: state.option2 = undefined
            }
        } else if (state.option1 === 'DISTANCE' && state.option2 !== undefined) {
            return {
                overlayColor1: state.overlayColor1 = state.overlayColor1,
                overlayColor2: state.overlayColor2 = state.overlayColor2,
                overlayColor3: state.overlayColor3 = !state.overlayColor3,
                option1: state.option1 = state.option2,
                h1And: state.h1And = ' and ',
                option2: state.option2 = undefined
            }
        } else if (state.option1 === undefined && state.option2 === undefined) {
            return {
                overlayColor1: state.overlayColor1 = state.overlayColor1,
                overlayColor2: state.overlayColor2 = state.overlayColor2,
                overlayColor3: state.overlayColor3 = !state.overlayColor3,
                option1: state.option1 = 'DISTANCE',
                h1And: state.h1And = ' and ',
                option2: state.option2 = state.option2
            }
        } else if (state.option1 !== 'DISTANCE' && state.option2 !== 'DISTANCE') {
            return {
                overlayColor1: state.overlayColor1 = state.overlayColor1,
                overlayColor2: state.overlayColor2 = state.overlayColor2,
                overlayColor3: state.overlayColor3 = !state.overlayColor3,
                option1: state.option1 = state.option1,
                h1And: state.h1And = ' and ',
                option2: state.option2 = 'DISTANCE'
            }
        } else {
            console.log('WARNING DISTANCE')
        }
    };
};

export default function CustomRun_HomeScreen() {

    const [state, dispatch] = useReducer(
        reducer, {
        overlayColor1: false,
        overlayColor2: false,
        overlayColor3: false,
        option1: undefined,
        h1And: '',
        option2: undefined
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
                <Text style={[styles.h1, styles.option1]}>{state.option1}</Text>
                <Text style={styles.h1}>{state.h1And}</Text>
                <Text style={[styles.h1, styles.option1]}>{state.option2}</Text>
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
        color: COLORS.MEDIUM_BLUE,
        fontWeight: "600"
    },
    h1Wrapper: {
        flexDirection: 'row'
    }
});

