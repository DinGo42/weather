import { HourForecast } from "./hour";


const testArr = [1, 2, 3, 4, 5, 6,7,8,9];


export const HourList = ({ maxListItems,newsListWidth,newsListGap }: { maxListItems: number,newsListWidth:number,newsListGap:number }) => {
    const listWidthWithoutGap = newsListWidth-newsListGap*(maxListItems-1)
    const width = listWidthWithoutGap/maxListItems*100/newsListWidth
    return testArr.map((item) => <HourForecast key={item} itemWidth={width} id={item} />);
  };