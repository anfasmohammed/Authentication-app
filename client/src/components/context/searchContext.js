import { createContext, useState } from "react";

const SearchContext=createContext();
export const SearchContextProvider=({children})=>{
    const[auth,setAuth]=useState({keyword:"",results:[]})
    return(
        <SearchContext.Provider value={[auth,setAuth]}>{children}</SearchContext.Provider>
    )
}
export default SearchContext