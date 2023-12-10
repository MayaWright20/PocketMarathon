import { createContext, useState, useEffect } from "react";

export interface IOptions {
    overlay: boolean | undefined;
    option: string | undefined;
    optionColor: string;
};

type IntervalType = 'SPEED' | 'TIME' | 'DISTANCE';

type IntervalObjType = {
    TIME: undefined | { hours: string; mins: string; secs: string };
    SPEED: undefined | string;
    DISTANCE: undefined | { miles: string; kms: string; metres: string };
};
  
const optionsCtxObj = {
    arr: Array<IOptions | undefined | null>(2),
    optionsHandler: (opt: any) => {},
    makeIntervalHandler : ( intervalType: IntervalType, intervalData: any ) => {},
    addIntervalHandler: () => {},
    interval: {},
    intervalsArr: [] as IntervalObjType[]
};

export const OptionsContext = createContext<{
    arr: Array<IOptions | undefined | null>;
    optionsHandler : (opt: any) => void;
    makeIntervalHandler : ( intervalType: IntervalType, intervalData: any ) => void;
    addIntervalHandler: () => void,
    interval: {},
    intervalsArr: IntervalObjType[]
}>(optionsCtxObj);

export default function OptionsContextProvider({ children }: any){

    const [ options, setOptions ] = useState(Array<IOptions | undefined | null>(2));
    const [ interval, setInterval ] = useState({'SPEED': undefined, 'TIME': undefined, 'DISTANCE': undefined});
    const [ intervalsArr, setIntervalsArr ] = useState<IntervalObjType[]>([]);

    function optionsHandler(opt: any){    
        setOptions(opt);
    };

    const value = {
        arr: options,
        optionsHandler: optionsHandler,
        makeIntervalHandler: makeIntervalHandler,
        addintervalHandler: addintervalHandler,
        intervalsArr: intervalsArr
    };

    function makeIntervalHandler( intervalType: IntervalType, intervalData: any ){
        let intervalObj;
        setInterval(() => {
            intervalObj = {...interval};
            intervalObj[intervalType] = intervalData;
            return intervalObj;
        });
        return intervalObj;
    };


    function addintervalHandler(){
    //    let intervalObj : IntervalObjType;

    //    if( options[0]?.option === 'TIME' || options[1]?.option === 'TIME' ){
    //     return;
    //    }else{
    //     setInterval(prevState => {
    //         console.log('prevState', prevState);
    //         return {
    //             ...prevState,
    //             'TIME': undefined,
    //         };
    //     });
    //    };

    //    if( options[0]?.option === 'SPEED' || options[1]?.option === 'SPEED'){
    //     return;
    //    }else{
    //     setInterval(prevState => {
    //         return {
    //             ...prevState,
    //             'SPEED': undefined
    //         };
    //     });
    //    };

    //    if( options[0]?.option === 'DISTANCE' || options[1]?.option === 'DISTANCE'){
    //     return;
    //    }else{
    //     setInterval(prevState => {
    //         return {
    //             ...prevState,
    //             'DISTANCE': undefined
    //         };
    //     });
    //    };

    //    setIntervalsArr(()=>{
    //     let arr = [ ...intervalsArr, interval ];
    //     return arr;
    //    });
       
    //    return console.log('intervalsArr', ...intervalsArr)
    };

   

    return <OptionsContext.Provider value={value}>{children}</OptionsContext.Provider>
};

