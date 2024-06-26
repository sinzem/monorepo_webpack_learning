declare module '*.module.scss' {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
} /* (декларируем подключение модулей стилей, нужно для TS взято из интерента, должно показывать подсказки  с доступными классами) */

/* (декларируем изображения) */
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg' {
    import React from "react";
    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}

declare const __PLATFORM__: 'mobile' | 'desktop'; /* (декларируем возможные приходящие переменные среды для поля __PLATFORM__) */
declare const __ENV__: 'production' | 'development'; 

