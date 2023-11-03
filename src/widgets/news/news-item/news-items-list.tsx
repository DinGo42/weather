import { NewsItem } from './news-item';

const testArr = [1, 2, 3, 4, 5, 6];

export const NewsList = ({ maxListItems,newsListWidth,newsListGap }: { maxListItems: number,newsListWidth:number,newsListGap:number }) => {
  const listWidthWithoutGap = newsListWidth-newsListGap*(maxListItems-1)
  const width = listWidthWithoutGap/maxListItems*100/newsListWidth
  return testArr.map((item) => <NewsItem key={item} itemWidth={width} id={item} />);
};
