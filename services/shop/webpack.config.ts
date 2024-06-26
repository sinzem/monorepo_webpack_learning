import path from "path"; 
import webpack from 'webpack';
import {BuildMode, BuildOptions, BuildPaths, BuildPlatform, buildWebpack} from '@packages/build-config'; /* (подключаем настройки вебпака) */
import packageJson from './package.json'; /* (для более точной настройки ленивой подгрузки подключаем package.json) */

interface EnvVariables {
  mode?: BuildMode;
  port?: number;
  analyzer?: boolean;
  platform?: BuildPlatform; 
}

export default (env: EnvVariables) => { 

    
    const paths: BuildPaths = {
      output: path.resolve(__dirname, "build"),
      entry: path.resolve(__dirname, "src", "index.tsx"),
      html: path.resolve(__dirname, "public", "index.html"),
      public: path.resolve(__dirname, 'public'), 
      src: path.resolve(__dirname, 'src'), 
    }

    const config: webpack.Configuration = buildWebpack({
      port: env.port ?? 3001,
      mode: env.mode ?? "development",
      paths,
      // analyzer: env.analyzer, 
      platform: env.platform ?? "desktop", 
    });

    config.plugins.push(new webpack.container.ModuleFederationPlugin({ /* (настройки подключения микрофронтенда - shop, как отдельного приложения) */
      name: 'shop', /* (имя приложения) */
      filename: 'remoteEntry.js', /* (имя файла для подключения(будет подключаться к host) - обычно называют remoteEntry) */
      exposes: {
        // './App: path.resolve(paths.src, 'components', 'App', 'Router.tsx'),
        './Router': './src/router/Router.tsx',
      }, /* (документ, который мы выставляем для подключения) */
      shared: { /* (указываем общие библиотеки, так как этот обьект будет одинаковый у всех микрофронтов, его можно вынести в отдельный документ и переподключать) */
        ...packageJson.dependencies, /* (из package.json будут все общими, но основные лучше указать отдельно(ниже), можно с версиями) */
        react: {
          eager: true, /* (флажок подгрузки(не ленивой - эти зависимости нужны сразу)) */
          requiredVersion: packageJson.dependencies['react'],
        },
        'react-router-dom': {
          eager: true,
           requiredVersion: packageJson.dependencies['react-router-dom'],
        },
        'react-dom': {
          eager: true,
           requiredVersion: packageJson.dependencies['react-dom'],
        }
      }
    }))
    
    return config;
}