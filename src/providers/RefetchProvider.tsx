
import React,{useState,createContext} from 'react';

export const ReFetchContext = createContext(null)
const RefetchProvider = ({children}) => {
    const [dataRefetch,setDataRefetch]  = useState(true)
    const RefetchValue = {
        dataRefetch, setDataRefetch
    }
    return (
        <ReFetchContext.Provider value={RefetchValue}>
            {children}
        </ReFetchContext.Provider>
    );
};

export default RefetchProvider;