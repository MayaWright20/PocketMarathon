import { createContext, useState, useEffect } from "react";

import * as Type from "../../Types/Types";
import { COLORS } from "../../Constants/COLORS";

const optionsCtxObj = {
    arr: Array<Type.IOptions | undefined | null>(2),
    optionsHandler: (opt: any) => { },
    makeIntervalHandler: (intervalType: Type.Option, intervalTypeData: Type.DISTANCE | Type.SPEED | Type.TIME) => { },
    addIntervalHandler: () => { },
    interval: {},
    intervalsArr: [] as Array<Type.IRunIntervalsData | undefined>
};

export const OptionsContext = createContext<{
    arr: Array<Type.IOptions | undefined | null>;
    optionsHandler: (opt: any) => void;
    makeIntervalHandler: (intervalType: Type.Option, intervalTypeData: Type.DISTANCE | Type.SPEED | Type.TIME) => void;
    addIntervalHandler: () => void;
    interval: {};
    intervalsArr: Array<Type.IRunIntervalsData | undefined>;
}>(optionsCtxObj);

export default function OptionsContextProvider({ children }: any) {

    const [options, setOptions] = useState(Array<Type.IOptions | undefined | null>(2));
    const [interval, setInterval] = useState<Type.IRunIntervalsData>({ value: 2 as const, color: 'green', 'DISTANCE': undefined, 'SPEED': undefined, 'TIME': undefined });
    // const [ intervalsArr, setIntervalsArr ] = useState<Type.IRunIntervalsData[]>([{ value: 2, color: COLORS.LIGHT_GREY }]);
    const [intervalsArr, setIntervalsArr] = useState<Type.IRunIntervalsData[]>([interval]);


    useEffect(() => {
        //updated all the time

        console.log('useEffect CTx: intervalsArr', intervalsArr);
    }, [options, intervalsArr, interval]);

    function optionsHandler(opt: any) {
        setOptions(opt);
    };

    function makeIntervalHandler(intervalType: Type.Option, intervalTypeData: Type.DISTANCE | Type.SPEED | Type.TIME) {
        setInterval((prevInterval) => ({
            ...prevInterval,
            [intervalType]: intervalTypeData,
        }));
    };

    function addIntervalHandler() {
        
        let newInterval = { ...interval };

        if (options[0]?.option !== 'TIME' && options[1]?.option !== 'TIME') {
            newInterval = {
                ...newInterval,
                color: 'red',
                'TIME': undefined
            };
        };

        if (options[0]?.option !== 'SPEED' && options[1]?.option !== 'SPEED') {
            newInterval = {
                ...newInterval,
                color: '#00ff15',
                'SPEED': undefined
            };
        };

        if (options[0]?.option !== 'DISTANCE' && options[1]?.option !== 'DISTANCE') {
            newInterval = {
                ...newInterval,
                color: '#00eeff',
                'DISTANCE': undefined
            };
        };

        setIntervalsArr((prevArray) => ([...prevArray, newInterval]));
        setInterval(newInterval);
    };

    const value = {
        arr: options,
        optionsHandler: optionsHandler,
        makeIntervalHandler: makeIntervalHandler,
        addIntervalHandler: addIntervalHandler,
        interval: interval,
        intervalsArr: intervalsArr
    };

    return <OptionsContext.Provider value={value}>{children}</OptionsContext.Provider>
};

