import React, { useContext, useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableHighlight,
    Pressable
} from "react-native";

import { OptionsContext } from "../../../Context/CustomRunContext/OptionsContext";

import { AntDesign } from '@expo/vector-icons';
import { COLORS } from "../../../Constants/General/COLORS";
import { BORDER_RADIUS } from "../../../Constants/Styling/STYLES";
import { SPEED } from "../../../Types/Types";

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

type ItemProps = { title: SPEED };

export default function SelectSpeedDropDownButton() {
    const [ showSpeeds, setShowSpeeds ] = useState(false);
    const [ selectTitle, setSelectTitle ] = useState<SPEED | 'SELECT SPEED'>('SELECT SPEED');

    const optionsCtx = useContext( OptionsContext );
    
    useEffect(() => {
        if( selectTitle === undefined || selectTitle === 'SELECT SPEED' ){
            return;
        }else{
            optionsCtx.makeIntervalHandler("SPEED", selectTitle);
        }
    }, [ selectTitle ]);

    function setSpeedHandler( speed: ItemProps){
        setSelectTitle(speed.title);
    };

    const Item = ({ title }: ItemProps) => (
        <TouchableHighlight
            style={styles.speedButton}
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => setSpeedHandler({title}) }>
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
                    renderItem={({ item }) => <Item title={item.title as SPEED} />}
                    keyExtractor={item => item.id}
                    scrollEnabled={false}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '60%',
        flexDirection: 'row',
        zIndex: 1,
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
        overflow: 'hidden',
        backgroundColor: COLORS.WHITE,
    },
    speedButton: {
        borderBottomWidth: 2,
        borderColor: COLORS.LIGHT_BLUE,
        paddingTop: 6,
        paddingBottom: 4,
    }
});