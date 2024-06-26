import { BuildOptions } from "../types/types";
import { removeDataTestIdBabelPlugin } from "./removeDataTestIdBabelPlugin";

export function buildBabelLoader(options: BuildOptions) {

    const isDev = options.mode === "development"; 
    const isProd = options.mode === "production";

    const plugins = [];

    if (isProd) { /* (если прод-сборка, подключаем плагин, передаем в него пропсы с названием нод, которые нужно удалить) */
        plugins.push([
            removeDataTestIdBabelPlugin,
            {
                props: ['data-testid']
            }
        ])
    } /* (подключаем в return) */

    return {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: [
                    '@babel/preset-env',
                    '@babel/preset-typescript',
                    ['@babel/preset-react', {
                        runtime: isDev ? 'automatic' : 'classic',
                    }]
                ],
                plugins: plugins.length ? plugins : undefined, /* (подключаем плагины(если они есть)) */
            } 
        }
    }
}