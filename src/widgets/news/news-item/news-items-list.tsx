import { NewsItem } from './news-item';

const testArr = [1, 2, 3, 4, 5, 6, 7, 8];

export const NewsList = ({ maxListItems }: { maxListItems: number }) => {
  return testArr.map((item) => (
    <NewsItem key={item} itemWidth={maxListItems} />
  ));
};
