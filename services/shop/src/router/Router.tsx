import { createBrowserRouter } from 'react-router-dom';
import {App} from '@/components/App/App';
import { Suspense } from 'react';
import { Shop } from '@/pages/shop';
import {UserCard} from '@packages/shared/src/components/UserCard';

const routes = [
    {
        path: "/shop",
        element: <App />, 
        children: [ 
            {
                path: '/shop/main',
                element: <Suspense fallback={"Loading..."}><Shop /></Suspense>, /* (Suspense выведет заданную надпись, пока будет грузиться Shop) */
            },
            {
                path: '/shop/second',
                element: <Suspense fallback={"Loading..."}>
                    <div style={{color: "red"}}>
                        <h1>Second page</h1>
                        <UserCard username={'From SHOP'}/>
                    </div>
                </Suspense>, /* (Suspense выведет заданную надпись, пока будет грузиться Shop) */
            }
        ]
    }
]

export const router = createBrowserRouter(routes);

export default routes; /* (подключаем в bootstrap.tsx) */