import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/Orderpage/OrderPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import TypeproductPage from "../pages/TypeproductPage/TypeproductPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true
    },
    {
        path: '/products',
        page: ProductPage,
        isShowHeader: true
    },
    {
        path: '/:type',
        page: TypeproductPage,
        isShowHeader: true
    },
    {
        path: '/signin',
        page: SignInPage,
        isShowHeader: false
    },
    {
        path: '/signup',
        page: SignUpPage,
        isShowHeader: false
    },
    {
        path: '/product_detail',
        page: ProductDetailPage,
        isShowHeader: true
    },
    {
        path: '*',
        page: NotFoundPage
    },
]