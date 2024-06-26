import type {Configuration as DevServerConfiguration} from "webpack-dev-server"; /* (типизация для сервера, отслеживающего изменения) */
import { BuildOptions } from "./types/types"; /* (типизация опций) */

/* (создаем модуль с настройками для сервера, отслеживающего изменения в процессе разработки) */
export function buildDevServer(options: BuildOptions): DevServerConfiguration {
    return {
        port: options.port ?? 3000,
        open: true,
        historyApiFallback: true, /* (для навигации, работает только в dev, если планируем раздавать статику через nginx, нужно делать проксирование на Index.html) */
        hot: true, /* (динамическое внесение изменений без перезагрузки страницы - встроенное, но при работе с реактом лучше установит плагин react-refresh - подробнее в description.js) */ 
    }
}