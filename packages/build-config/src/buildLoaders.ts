import { ModuleOptions } from "webpack"; /* (подключаем встроенный модуль для типизации) */
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/types";
import ReactRefreshTypeScript from "react-refresh-typescript";
import { buildBabelLoader } from "./babel/buildBabelLoader";

/* (модуль для подключения лоадеров) */
export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] { /* (типизируем с помощью встроенных типов вебпака) */

    const isDev = options.mode === "development"; /* (переменная для определения режима разработки) */

    const assetloader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    } /* (лоадер для работы с изображениями) */

    /* (отдельно лоадер для работы с svg(npm i @svgr/webpack), позволит работать с изображениями как с компонентами, из предыдущего лоадера убираем значение svg, иначе до этого обработка не дойдет) */
    const svgrLoader = {
        test: /\.svg$/i,
        use: [{
            loader: '@svgr/webpack',
            options: {
                icon: true,
                svgoConfig: {
                    plugins: [
                        {
                            name: 'convertColors',
                            params: {
                                currentColor: true,
                            }
                        }
                    ]
                }
            },
        }],
    }

    /* (создаем переменную с настройками подключения лоадера для стилей - активируем модули и добавляем динамическое построение имени при разных режимах разработки - в dev будет прописывать путь и имя из модуля, в prod - генерировать имя из хеша, чтобы имена не пересекались, если повторяются в модулях - подробнее о генерации имен в документации webpack) */
    const cssLoaderWithModules = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
            }
        },
    }

    const scssLoader = {
        /* (подключаем обработку scss) */
        test: /\.s[ac]ss$/i,
        use: [/* 'style-loader', */
                isDev ? 'style-loader' : MiniCssExtractPlugin.loader, /* (подключаем для экспорта стилей в отдельный файл вместо style-loader в режиме production) */
            //  'css-loader', /* (заменяем на loader с подключенными модулями) */
                cssLoaderWithModules,
                'sass-loader'] /* (соблюдаем порядок подключения лоадеров, иначе будет ошибка) */
    };

    // const tsLoader = {
    //     /* (правила для работы с TS, также может обрабатывать jsx - далее работаем с реакт, поэтому если не подключаем ts, нужно ставить лоадер для реакта) */
    //     test: /\.tsx?$/, /* (регулярное выражение для отслеживания файлов с разрешениями ts и tsx в названии) */
    //     use: 'ts-loader', /* (подключенный модуль для обработки) */
    //     exclude: /node_modules/, /* (исключения) */
    // }
    const tsLoader = { /* (лоадер с настройками для игнорирования правил ts(сильно замедляют компилирование)) */
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: [{
            loader: 'ts-loader',
            options: {
                transpileOnly: true,
                getCustomTransformers: () => ({
                    before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
                }) /* (функция-настройка для автоматического обновления страницы без перезагрузки при внесении изменений в код при работе с реактом) */
            }
        }]
    }

    // const babelLoader = {
    //     test: /\.tsx?$/,
    //     exclude: /node_modules/,
    //     use: {
    //         loader: "babel-loader",
    //         // options: {
    //         //     presets: [
    //         //         '@babel/preset-env',
    //         //         '@babel/preset-typescript',
    //         //         ['@babel/preset-react', {
    //         //             runtime: isDev ? 'automatic' : 'classic',
    //         //         }]
    //         //     ]
    //         // } /* (обьект с опциями выносим в babel.config.json, дополнительных подключений и настроек не требуется(только кавычки приводим к json-формату)) */
    //     }
    // } /* (создаем и настраиваем bavel-loader, устанавливаем и добавляем необходимые пресеты - для реакта(добавляем опцию runtime) и ts, описание установки в description.js) */

    /* (для более удобной работы и настройки выносим babelLoader в config/build/babel/buildBabelLoader.ts, а здесь подключаем получившуюся функцию) */
    // const babelLoader = buildBabelLoader(options);

    return [
        assetloader,
        scssLoader,
        tsLoader, 
        // babelLoader,
        svgrLoader,
    ]
}