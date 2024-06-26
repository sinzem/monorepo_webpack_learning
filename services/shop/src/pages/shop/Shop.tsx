
import {shopRoutes} from '@packages/shared/src/routes/shop';
import { Link } from 'react-router-dom';
/* (создаем страницу для примера, подключаем в ShopLazy.tsx для построения ленивой подгрузки) */
const Shop = () => {
    return (
        <>
            <h1>
                SHOP 
            </h1>
            <div>
                <Link to={shopRoutes.second}>Second page</Link>
            </div>
        </>
    );
};

export default Shop;