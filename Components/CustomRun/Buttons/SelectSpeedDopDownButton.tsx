import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableHighlight,
    Pressable
} from "react-native";

import { AntDesign } from '@expo/vector-icons';
import { COLORS } from "../../../Constants/COLORS";
import { BORDER_RADIUS } from "../../../Constants/Styling/STYLES";


const DATA = [
    {
        id: '1',
        title: 'WALK',
    },
    {
        id: '2',
        title: 'JOG',
    },
    {
        id: '3',
        title: 'SPRINT',
    },
];

type ItemProps = { title: string };



export default function SelectSpeedDropDownButton() {
    const [showSpeeds, setShowSpeeds] = useState(false);
    const [selectTitle, setSelectTitle] = useState('Speed');

    const Item = ({ title }: ItemProps) => (
        <TouchableHighlight
            style={styles.speedButton}
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => setSelectTitle(title)}>
            <Text style={styles.title}>{title}</Text>
        </TouchableHighlight>
    );

    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => { setShowSpeeds(!showSpeeds) }}
                style={styles.titleWrapper}
            >
                <Text style={styles.title}>{selectTitle}</Text>
                <View style={styles.iconWraper}>
                    <AntDesign name={showSpeeds ? "up" : "down"} size={18} color={COLORS.LIGHT_BLUE} />
                </View>
            </Pressable>
            <View style={[
                { display: showSpeeds ? "flex" : "none" },
                styles.speedContainer
            ]}>
                <FlatList
                    data={DATA}
                    renderItem={({ item }) => <Item title={item.title} />}
                    keyExtractor={item => item.id}
                />
            </View>
            {/* <View style={styles.wordWrapper}>
                <Text style={styles.title}>for</Text>
            </View> */}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '50%',
        flexDirection: 'row'
    },
    wordWrapper:{
        // padding: 5
    },
    titleWrapper: {
        flexDirection: 'row',
        width: '100%',
        borderWidth: 2,
        borderTopLeftRadius: BORDER_RADIUS / 2,
        borderTopRightRadius: BORDER_RADIUS / 2,
        borderColor: COLORS.LIGHT_BLUE,
        padding: 5,
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
    },
    iconWraper: {
        alignSelf: 'center',
    },
    speedContainer: {
        position: 'absolute',
        top: 35,
        width: '100%',
        borderWidth: 2,
        borderBottomLeftRadius: BORDER_RADIUS / 2,
        borderBottomRightRadius: BORDER_RADIUS / 2,
        borderColor: COLORS.LIGHT_BLUE,
        overflow: 'hidden'
    },
    speedButton: {
        borderBottomWidth: 2,
        borderColor: COLORS.LIGHT_BLUE,
        paddingTop: 6,
        paddingBottom: 4,
        backgroundColor: COLORS.WHITE
    }
});