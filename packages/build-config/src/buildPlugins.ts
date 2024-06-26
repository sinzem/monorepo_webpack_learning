import webpack, { Configuration, DefinePlugin } from 'webpack';
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from './types/types';
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
// import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

/* (модуль для подключения плагинов) */
export function buildPlugins({mode, paths, analyzer, platform}: BuildOptions): Configuration['plugins'] { /* (типизируем с помощью встроенных вебпаковских типов Configuration) */

    /* (переменные для определения режима разработки) */
    const isDev = mode === "development";
    const isProd = mode === "production";

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({
            template: paths.html, 
            favicon: path.resolve(paths.public, 'favicon.ico'),
            publicPath: "/"
        }), /* (подключаем плагин, указываем путь к компилируемому файлу(index.html - приходит из опций), в папке build создаст такой же, но с подключенным скриптом из проекта, динамически отслеживает название скрипта, также подключаем фавиконку) */
        new DefinePlugin({
            __PLATFORM__: JSON.stringify(platform),
            __ENV__: JSON.stringify(mode),
        }), /* (плагин для подмены глобальных переменных на переданные при запуске - в д.с при билде будем передавать версию - desctop или mobile) */
    ]

    if(isDev) {
        plugins.push(new webpack.ProgressPlugin()); /* (для показа прогресса сборки в процентах в терминале в режиме разработки, рекоммендуется его не подключать - тормозит сборку) */
        // plugins.push(new ForkTsCheckerWebpackPlugin()); /* (плагин для проверки TS - идет отдельным процессом(при билде отключена в лоадерах)) */
        plugins.push(new ReactRefreshWebpackPlugin()); /* (плагин для автообновления страницы без перезагрузки при изменениях в коде при работе с реакт) */
    }

    if(isProd) {
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        })); /* (будет стили css собирать в отдельный файл(без него все идет в js)) */
        plugins.push(new CopyPlugin({
            patterns: [
                {from: path.resolve(paths.public, 'locales'), to: path.resolve(paths.output, 'locales')}
            ]
        })) /* (добавляем плагин для копирования документов без изменений(json в д.с), указываем откуда и куда) */
    }

    if (analyzer) {
        plugins.push(new BundleAnalyzerPlugin()); /* (подключаем плагин для контроля за бандлом, для запуска сборки с аналайзером npm run build:prod -- --env analyzer)  */
    }

    return plugins;
}