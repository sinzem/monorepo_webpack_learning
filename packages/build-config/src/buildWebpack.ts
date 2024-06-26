import webpack from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types/types';

/* (создаем собирающий модуль, подключаем модули, разнесенные по функционалу и типы) */
export function buildWebpack(options: BuildOptions): webpack.Configuration {

    const {mode, paths} = options; /* (декомпозируем пришедшие из опций пути и режим разработки) */
    const isDev = mode === "development"; /* (переменная для определения режима разработки) */

    return { 
        mode: mode ?? 'development',  /* (режим будет приходить как аргумент, по умолчанию проставили development, запускаем командами npm run build:dev или build:prod) */
        entry: paths.entry, /* (подключааем пути из опций) */
        output: {
            path: paths.output,  /* (подключааем пути из опций) */
            filename: '[name].[contenthash].js', /* (имя файла после компиляции - создаст автоматически из слова(main) и хеша - подробнее о настройке имен в документации) */
            clean: true /* (очистка папки перед компиляцией - будет удалять и перезаписывать все лишнее) */
        },
        plugins: buildPlugins(options), /* (подключаем модуль с плагинами) */
        module: {
            rules: buildLoaders(options), /* (подключаем модуль с лоадерами) */
          },
          resolve: buildResolvers(options), /* (подключаем модуль с разрешениями) */
          devtool: isDev ? 'inline-source-map' : false, /* (составление карты исходников в dev-режиме - нужно для отслеживания ошибок) */
          devServer: isDev ? buildDevServer(options) : undefined /* (подключаем сервер для отслеживания изменений в режиме разработки) */
    } 
}