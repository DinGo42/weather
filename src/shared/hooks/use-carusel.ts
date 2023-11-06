'use client';
import { useState, useCallback, useEffect } from 'react';
import { useScreenSize } from '.';

type WrapperProps = {
  wrapperRef: HTMLDivElement | null;
  wrapperGap: number;
};
export type createItemsListProps = {
  data: any[];
  maxListItems: number;
  itemConstructor: ({
    itemWidth,
    key,
    ...props
  }: {
    key: number;
    itemWidth: number;
    props?: any;
  }) => JSX.Element;
};
export const useCarusel = ({ wrapperRef, wrapperGap = 0 }: WrapperProps) => {
  const [scrollMaxWidth, setScrollMaxWidth] = useState(0);
  const [scrollLeft, setScrollLeftWidth] = useState(0);
  const [shownPage, setShownPage] = useState(0);
  const { screenWidth } = useScreenSize();
  useEffect(() => {
    if (!wrapperRef) return;
    setScrollMaxWidth(wrapperRef.scrollWidth - screenWidth);
    wrapperRef.style.gap = wrapperGap.toString();
  }, []);
  const caruselHandler = useCallback(
    (L: boolean = true) => {
      const newScrollLeft = L
        ? scrollLeft - screenWidth - wrapperGap
        : scrollLeft + screenWidth + wrapperGap;
      setScrollLeftWidth(() =>
        newScrollLeft < 0
          ? 0
          : newScrollLeft > scrollMaxWidth
          ? scrollMaxWidth
          : newScrollLeft
      );
    },
    [wrapperRef, scrollLeft]
  );

  const nextPage = useCallback(() => {
    caruselHandler();
    setShownPage((prev) => prev + 1);
  }, []);

  const prevPage = useCallback(() => {
    caruselHandler(false);
    setShownPage((prev) => prev - 1);
  }, []);

  const createItemsList = ({
    itemConstructor,
    data,
    maxListItems,
  }: createItemsListProps) => {
    const caruselWidth = screenWidth;
    const listWidthWithoutGap = caruselWidth - wrapperGap * (maxListItems - 1);
    const itemWidth =
      ((listWidthWithoutGap / maxListItems) * 100) / caruselWidth;
    return data.map((item, index) =>
      itemConstructor({ ...item, key: index, itemWidth })
    );
  };
  useEffect(() => {
    if (!wrapperRef) return;
    wrapperRef.scrollLeft = scrollLeft;
  }, [wrapperRef, scrollLeft]);

  return { nextPage, prevPage, shownPage, createItemsList };
};
