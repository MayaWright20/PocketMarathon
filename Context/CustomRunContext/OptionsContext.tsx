import { createContext, useState, useEffect } from "react";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import * as Type from "../../Types/Types";
import { COLORS } from "../../Constants/General/COLORS";

const optionsCtxObj = {
    options: Array<Type.IOptions | undefined | null>(2),
    optionsHandler: ( opt: any ) => { },
    distanceIntervalCompletionHandler:(opt: boolean) => { },
    makeIntervalHandler: ( intervalType: Type.Option, intervalTypeData: Type.DISTANCE | Type.SPEED | Type.TIME ) => { },
    addIntervalHandler: () => { },
    cancelIntervalHandler: () => { },
    interval: {},
    intervalsArr: [] as Array<Type.IRunIntervalsData | undefined>,
    updateIntervalsArr: ( newArr : Array<Type.IRunIntervalsData> | undefined ) => { }
};

export const OptionsContext = createContext<{
    options: Array<Type.IOptions | undefined | null>;
    optionsHandler: ( opt: any ) => void;
    distanceCompletion: boolean;
    distanceIntervalCompletionHandler: (opt: boolean) => { };
    makeIntervalHandler: ( intervalType: Type.Option, intervalTypeData: Type.DISTANCE | Type.SPEED | Type.TIME ) => void;
    addIntervalHandler: () => void;
    cancelIntervalHandler: () => void;
    interval: {};
    intervalsArr: Array<Type.IRunIntervalsData | undefined>;
    updateIntervalsArr: ( newArr : Array<Type.IRunIntervalsData> ) => void;
}>(optionsCtxObj);

export default function OptionsContextProvider({ children }: any) {

    const [options, setOptions] = useState(Array<Type.IOptions | undefined | null>(2));
    const [interval, setInterval] = useState<Type.IRunIntervalsData | undefined>(undefined);
    const [intervalsArr, setIntervalsArr] = useState<Type.IRunIntervalsData[] |[]>([]);
    const [distanceCompletion, setDistanceCompletion] = useState<boolean | null>(null);

    useEffect(() => {
    }, [options, intervalsArr, interval]);

    function optionsHandler(opt: any) {
        setOptions(opt);
    };

    function makeIntervalHandler( intervalType: Type.Option, intervalTypeData: Type.DISTANCE | Type.SPEED | Type.TIME ) {
        setInterval(( prevInterval ) => ({
            ...prevInterval,
            [intervalType]: intervalTypeData,
        }));
    };

    function distanceIntervalCompletionHandler(opt: boolean){
        setDistanceCompletion(opt);
    };

    function addIntervalHandler() {
        //CAN ALL BE REFACTORED INTO FUNCTIONS
        const uuid = uuidv4(); 
      
        let newInterval = { ...interval };
      

        if((options[0]?.option === 'SPEED' || options[1]?.option === 'SPEED') && ( newInterval.SPEED === undefined || newInterval.SPEED === Type.SPEED["SELECT SPEED"] )) return;
        if((options[0]?.option === 'DISTANCE' || options[1]?.option === 'DISTANCE') && newInterval.DISTANCE === undefined || (newInterval.DISTANCE && (Object.values(newInterval.DISTANCE).length > 1 && Object.values(newInterval.DISTANCE).every((item)=> item === undefined)))) return;
        if((options[0]?.option === 'TIME' || options[1]?.option === 'TIME') && newInterval.TIME === undefined || (newInterval.TIME && (Object.values(newInterval.TIME).length > 1 && Object.values(newInterval.TIME).every((item)=> item === undefined)))) return;

        if (options[0]?.option !== 'TIME' && options[1]?.option !== 'TIME') {

            newInterval = {
                ...newInterval,
                id: uuid,
                color: [COLORS.MEDIUM_BLUE, COLORS.GREEN],
                'TIME': undefined,
                intervalType: Type.IntervalCombination.SPEED_DISTANCE,
                speak: 'speed and distance'
            };
            setDistanceCompletion(null)
        };

        if (options[0]?.option !== 'SPEED' && options[1]?.option !== 'SPEED') {
            newInterval = {
                ...newInterval,
                id: uuid,
                color: [COLORS.PINK, COLORS.GREEN],
                'SPEED': undefined,
                intervalType: Type.IntervalCombination.DISTANCE_TIME,
                speak: "distance and time"
            };
            setDistanceCompletion(null)
        };

        if (options[0]?.option !== 'DISTANCE' && options[1]?.option !== 'DISTANCE') {
            newInterval = {
                ...newInterval,
                id: uuid,
                color: [COLORS.MEDIUM_BLUE, COLORS.PINK],
                'DISTANCE': undefined,
                intervalType: Type.IntervalCombination.SPEED_TIME,
                speak: "speed and time"
            };
            setDistanceCompletion(null)
        };

        if(options[0] === undefined && options[1] === undefined){
            return;
        };

        setIntervalsArr((prevArray) => ([...prevArray, newInterval]));
        setInterval(newInterval);
        options[0] = undefined;
        options[1] = undefined;
        setOptions(() => ([options[0], options[1]]));
    };

    function updateIntervalsArr(newArr: Array<Type.IRunIntervalsData>){
        setIntervalsArr(newArr);
    };

    function cancelIntervalHandler(){
        options[0] = undefined;
        options[1] = undefined;
        setOptions(() => ([options[0], options[1]]));
    };

    const value = {
        options: options,
        optionsHandler: optionsHandler,
        distanceIntervalCompletionHandler : distanceIntervalCompletionHandler,
        distanceCompletion: distanceCompletion,
        makeIntervalHandler: makeIntervalHandler,
        addIntervalHandler: addIntervalHandler,
        interval: interval,
        intervalsArr: intervalsArr,
        cancelIntervalHandler: cancelIntervalHandler,
        updateIntervalsArr: updateIntervalsArr
    };

    return <OptionsContext.Provider value={value}>{children}</OptionsContext.Provider>
};

