import { createContext, useState } from "react";

export interface IOptions {
    overlay: boolean | undefined;
    option: string | undefined;
    optionColor: string;
};

const optionsCtxObj = {
    arr: Array<IOptions | undefined | null>(2),
    optionsHandler: (opt: any) => {}
};

export const OptionsContext = createContext<{
    arr: Array<IOptions | undefined | null>;
    optionsHandler: (opt: any) => void;
}>(optionsCtxObj);

export default function OptionsContextProvider({ children }: any){
    const [ options, setOptions ] = useState(Array<IOptions | undefined | null>(2));

    function optionsHandler(opt: any){
        setOptions(opt);
    };

    const value = {
        arr: options,
        optionsHandler: optionsHandler
    }

    return <OptionsContext.Provider value={value}>{children}</OptionsContext.Provider>
};

