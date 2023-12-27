import React from "react";
import { View, StyleSheet, TextInput, KeyboardTypeOptions } from "react-native";

import { DissmissKeyboard } from "./KeyboardDissmiss";

import { COLORS } from "../../Constants/COLORS";
import { BORDER_RADIUS } from "../../Constants/Styling/STYLES";

type InputButtonProps = {
    width: number;
    keyboardtype: KeyboardTypeOptions;
    maxLength: number;
    borderColor: string;
    placeholder: string;
    value?: any;
    onChangeText?: any;
};

export default function InputButton(props: InputButtonProps): JSX.Element {
    return (
        <DissmissKeyboard>
            <TextInput
            style={[styles.textInputWrapper, { width: props.width, borderColor: props.borderColor }]}
            keyboardType={props.keyboardtype}
            maxLength={props.maxLength}
            placeholder={props.placeholder}
            value={props.value}
            onChangeText={props.onChangeText}
        />
        </DissmissKeyboard>
    )
};

const styles = StyleSheet.create({
    textInputWrapper: {
        borderWidth: 2,
        borderRadius: BORDER_RADIUS,
        padding: 15,
        margin: 5,
        textAlign: 'center',
        backgroundColor: COLORS.WHITE
    }
});