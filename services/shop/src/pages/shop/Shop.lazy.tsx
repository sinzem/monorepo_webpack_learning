import {lazy} from "react";

/* (подключаем страницу через функцию lazу, этот модуль подключаем в index.ts, теперь при билде страницы будут подгружаться отдельно от всего скрипта) */
export const LazyShop = lazy(() => import('./Shop'))