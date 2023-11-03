'use client'
import { useState, useCallback, useEffect } from "react";

type WrapperProps = {
    wrapperRef:HTMLDivElement
    wrapperGap:number
}
type createItemsListProps = {
  data:any[]
  maxListItems: number,
  itemConstructor:({itemWidth,key,...props}:{key:number,itemWidth:number,props?:any})=>JSX.Element
}
export const useCarusel = ({wrapperRef,wrapperGap=0}:WrapperProps) => {
    const [scrollLeft, setScrollLeftWidth] = useState(0);
    const [shownPage,setShownPage] = useState(0)
    const scrollMaxWidth = wrapperRef.scrollWidth - wrapperRef.clientWidth;
    wrapperRef.style.gap = wrapperGap.toString()
    const caruselHandler = useCallback((L: boolean = true) => {
        const newScrollLeft = L
          ? scrollLeft - wrapperRef.clientWidth-wrapperGap
          : scrollLeft + wrapperRef.clientWidth+wrapperGap;
        setScrollLeftWidth(() =>
          newScrollLeft < 0
            ? 0
            : newScrollLeft > scrollMaxWidth
            ? scrollMaxWidth
            : newScrollLeft)
        },[wrapperRef,scrollLeft])

    const nextPage = useCallback(()=>{
        caruselHandler();
        setShownPage(prev=>prev+1)},[])
     
    const prevPage = useCallback(()=>{caruselHandler(false);setShownPage(prev=>prev-1)},[])


    const createItemsList = ({itemConstructor,data,maxListItems}:createItemsListProps) => {
      const caruselWidth = wrapperRef.clientWidth;
      const listWidthWithoutGap = caruselWidth-wrapperGap*(maxListItems-1)
      const itemWidth = listWidthWithoutGap/maxListItems*100/caruselWidth
      return data.map((item,index) => itemConstructor({...item,key:index,itemWidth}));
    }
    useEffect(() => {
        wrapperRef.scrollLeft = scrollLeft;
      }, [wrapperRef, scrollLeft]);
  
  return {nextPage,prevPage,shownPage,createItemsList}
}