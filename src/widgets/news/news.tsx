'use client';
import { FC, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NewsList } from './news-item';
import { screeTypes, useCarusel, useScreenType } from '@weather/shared';
import { NewsItem } from './news-item/news-item';
const maxListItems = 1;
  const newsListGap = 16




  const maxListItemsForScreen = {
    phoneS: 1,
    phoneSPlus:1,
    phoneM: 2,
    tabletS: 3,
    tabletM: 4,
    dectopS: 3,
    dectopM: 4
  }
export const News: FC = () => {
  const newsListRef = useRef<HTMLDivElement | null>(null);
  const newsList = newsListRef.current;
  // const screenType = useScreenType()
  // const maxListItems = maxListItemsForScreen[screenType];


  ///rm


  enum screeTypes  {
    PHONE_S='phoneS',
    PHONE_S_PLUS='phoneSPlus',
    PHONE_M='phoneM',
    TABLET_S='tabletS',
    TABLET_M='tabletM',
    DECTOP_S='dectopS',
    DECTOP_M='dectopM',
}

  const [screenType,setScreenType] = useState<screeTypes>(screeTypes.PHONE_S)
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

  const maxListItems = maxListItemsForScreen[screenType];

  useLayoutEffect(()=>windowResizeHandler())
  useEffect(()=>{
      document.addEventListener('resize',windowResizeHandler)
      return ()=>window.removeEventListener('resize',windowResizeHandler)
  },[windowResizeHandler])

















  type createItemsListProps = {
    data:any[]
    maxListItems: number,
    itemConstructor:({itemWidth,key,...props}:{itemWidth:number,key:number,props:any})=>JSX.Element
  }


  const [scrollLeft, setScrollLeftWidth] = useState(0);
  const [shownPage,setShownPage] = useState(0)
  const caruselHandler = useCallback((L: boolean = true) => {
    if (!newsList) return;
    const scrollMaxWidth = newsList.scrollWidth - newsList.clientWidth;
    newsList.style.gap = newsListGap.toString()
      const newScrollLeft = L
        ? scrollLeft - newsList.clientWidth-newsListGap
        : scrollLeft + newsList.clientWidth+newsListGap;
      setScrollLeftWidth(() =>
        newScrollLeft < 0
          ? 0
          : newScrollLeft > scrollMaxWidth
          ? scrollMaxWidth
          : newScrollLeft)
      },[newsList,scrollLeft])

  const nextPage = useCallback(()=>{
      caruselHandler();
      setShownPage(prev=>prev+1)},[])
   
  const prevPage = useCallback(()=>{caruselHandler(false);setShownPage(prev=>prev-1)},[])


  const createItemsList = ({itemConstructor,data,maxListItems}:createItemsListProps) => {
    if (!newsList) return;

    const scrollMaxWidth = newsList.clientWidth;

    const listWidthWithoutGap = scrollMaxWidth-newsListGap*(maxListItems-1)
    const itemWidth = listWidthWithoutGap/maxListItems*100/scrollMaxWidth
    return data.map((item,index) => itemConstructor({itemWidth,key:index,...item}));

  }
  useLayoutEffect(() => {
    if(!newsList)return 
    newsList.scrollLeft = scrollLeft;
    }, [newsList, scrollLeft]);


/////



  return (
    <div className="w-full h-96 rounded-3xl border-2 border-blue-450 p-3 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Weather News</h1>
        <div className="flex gap-5">
          <button
            className="bg-blue-500 rounded-full w-9 h-9 rotate-180 text-center"
            onClick={nextPage}
          >
            ➤
          </button>
          <button
            className="bg-blue-500 rounded-full w-9 h-9 text-center"
            onClick={prevPage}
          >
            ➤
          </button>
        </div>
      </div>
      <div
        ref={newsListRef}
        style={{gap:newsListGap + 'px'}}
        className="flex w-full h-full overflow-hidden"
      >
        {createItemsList({
          data:[{id:1}, {id:2}, {id:3}, {id:4}, {id:5}, {id:6}],
          maxListItems,
          itemConstructor:({itemWidth,key,...props})=><NewsItem key={key} itemWidth={itemWidth} {...props}/>

        })}
      </div>
    </div>
  );
};
