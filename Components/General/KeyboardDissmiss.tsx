import React from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

export const DissmissKeyboard = ({ children }: any) => (
    <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);