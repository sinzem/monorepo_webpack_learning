import path from "path"; 
import webpack from 'webpack';
import {BuildMode, BuildOptions, BuildPaths, BuildPlatform, buildWebpack} from '@packages/build-config';
import packageJson from './package.json'; /* (для более точной настройки ленивой подгрузки подключаем package.json) */

interface EnvVariables {
  mode?: BuildMode;
  port?: number;
  analyzer?: boolean;
  platform?: BuildPlatform; 
  SHOP_REMOTE_URL?: string;
  ADMIN_REMOTE_URL?: string;
} /* (типизируем пути подключения микрофронтов) */

export default (env: EnvVariables) => { 
  
    const paths: BuildPaths = {
      output: path.resolve(__dirname, "build"),
      entry: path.resolve(__dirname, "src", "index.tsx"),
      html: path.resolve(__dirname, "public", "index.html"),
      public: path.resolve(__dirname, 'public'), 
      src: path.resolve(__dirname, 'src'), 
    }

    /* (создаем переменные для подключения микрофронтов, должны приходить с .env, но также проставляем по-умолчанию) */
    const SHOP_REMOTE_URL = env.SHOP_REMOTE_URL ?? 'http://localhost:3001';
    const ADMIN_REMOTE_URL = env.ADMIN_REMOTE_URL ?? 'http://localhost:3002';

    const config: webpack.Configuration = buildWebpack({
      port: env.port ?? 3000,
      mode: env.mode ?? "development",
      paths,
      // analyzer: env.analyzer, 
      platform: env.platform ?? "desktop", 
    });

    config.plugins.push(new webpack.container.ModuleFederationPlugin({ /* (настройки подключения микрофронтенда - host, как отдельного приложения(в д.с к хосту подключаем shop и admin)) */
      name: 'host', /* (имя приложения) */
      filename: 'remoteEntry.js', /* (имя файла для подключения) */
      /* exposes */remotes: {
        shop: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`,
        admin: `admin@${ADMIN_REMOTE_URL}/remoteEntry.js`
      }, /* (настраиваем подключения - прописываем пути к remoteEntry подключаемых микрофронтов) */
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