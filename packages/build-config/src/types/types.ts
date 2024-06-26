// /* (типизация для путей) */
export interface BuildPaths {
    entry: string;
    html: string;
    output: string;
    public: string; /* (добавляем участок пути для примера работы с иконками) */
    src: string; /* (в д.с создаем типизацию для алиаса) */
}

/* (типизация режима разработки) */
export type BuildMode = "production" | "development";
export type BuildPlatform = "mobile" | "desktop"; /* (типизация приходящей переменной для определения типа устройства) */

/* (типизация опций сборки, отдельный тип для запуска анализа бандла) */
export interface BuildOptions {
    port: number;
    paths: BuildPaths;
    mode: BuildMode;
    platform: BuildPlatform;
    analyzer?: boolean;
}