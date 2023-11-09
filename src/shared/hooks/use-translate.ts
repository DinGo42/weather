'use client';
import { useState } from 'react';
export enum Translates {
  ENG = 'ENG',
  UA = 'UA',
  RU = 'RU',
}
export const useTranslate = () => {
  const [translate, setTranslate] = useState(Translates.ENG);
  const setToEng = () => setTranslate(Translates.ENG);
  const setToUA = () => setTranslate(Translates.UA);
  const setToRu = () => setTranslate(Translates.RU);
  return { translate, setToEng, setToUA, setToRu };
};
