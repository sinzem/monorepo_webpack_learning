import { Configuration } from "webpack";
import { BuildOptions } from "./types/types";


export function buildResolvers(options: BuildOptions): Configuration['resolve'] {
    return {
        /* (указываем разрешения исходных файлов) */
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@': options.paths.src,
        } /* (cоздаем алиас - сокращение для пути - в д.с вместо приходящего из опций src будет @(в реальных проектах пути могут быть намного длиннее)) */
    }
}

