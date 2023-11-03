'use client'
import { useEffect, useLayoutEffect, useState } from "react";

export enum screeTypes  {
    PHONE_S='phoneS',
    PHONE_S_PLUS='phoneSPlus',
    PHONE_M='phoneM',
    TABLET_S='tabletS',
    TABLET_M='tabletM',
    DECTOP_S='dectopS',
    DECTOP_M='dectopM',
}

export const useScreenType = () => {
    const [screenType,setScreenType] = useState<screeTypes>(screeTypes.PHONE_M)
    const windowResizeHandler = () => {
        const currentScreenWidth = window.innerWidth;
        if(currentScreenWidth>1440){
            // screenType.dectopM = true
            setScreenType(screeTypes.DECTOP_M)
        }
        else if(currentScreenWidth>1280){
            // screenType.dectopS = true
            setScreenType(screeTypes.DECTOP_S)
        }
        else if(currentScreenWidth>1024){
            // screenType.tabletM = true
            setScreenType(screeTypes.TABLET_M)
        }
        else if(currentScreenWidth>768){
            // screenType.tabletS = true
            setScreenType(screeTypes.TABLET_S)
        }
        else if(currentScreenWidth>480){
            // screenType.phoneM = true
            setScreenType(screeTypes.PHONE_M)
        }
        else if(currentScreenWidth>320){
            // screenType.phoneS = true
            setScreenType(screeTypes.PHONE_S)

        }
    }


    useLayoutEffect(()=>windowResizeHandler())
    useEffect(()=>{
        document.addEventListener('resize',windowResizeHandler)
        return ()=>window.removeEventListener('resize',windowResizeHandler)
    },[windowResizeHandler])
    
    return screenType
}