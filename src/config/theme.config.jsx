import { createContext, useEffect, useState } from "react";

export const ThemeContext=createContext({
    theme:'',
    toggleTheme:()=>{},
})

export const ThemeProviders=({children})=>{
    const themes=localStorage.getItem('_tm')||null
    const [theme,setTheme]=useState(themes)
    useEffect(()=>{
        localStorage.setItem('_tm',theme);
    },[theme]);
    const toggleTheme=()=>{
        setTheme((prevTheme)=>(prevTheme==="light"?"dark":"light"));
    

    };
    
    return <ThemeContext.Provider value={{theme,toggleTheme:toggleTheme}}>{children}</ThemeContext.Provider>
    
}