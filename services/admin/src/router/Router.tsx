import { createBrowserRouter } from "react-router-dom";
import { App } from "@/components/App/App";
import { Suspense } from "react";
import { LazyAbout } from "@/pages/about/About.lazy";

const routes = [
    {
        path: "/admin",
        element: <App />, /* (как главный элемент подключаем страницу App, остальные пока как дочерние на ней же) */
        children: [ /* (к каждой странице подключаем Suspense(из реакта), передаем в него сообщение, которое будет выводиться во время загрузки) */
            {
                path: '/admin/about',
                // element: <About />, /* (при обычной загрузке все страницы собираются в один скрипт, это замедляет загрузку) */
                element: <Suspense fallback={"Loading..."}><LazyAbout /></Suspense>, /* (при ленивой загрузке(создаем модуль в папке со страницей) скрипт делится на несколько частей и нужная страница подгружается только при переходе на нее) */
            }
        ]
    }
];

export const router = createBrowserRouter(routes);

export default routes;