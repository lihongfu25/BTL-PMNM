import { LoginLogoutLayout } from "../layout/LoginLogoutLayout";
import { HeaderFooterLayout } from "../layout/HeaderFooterLayout";
import { AccountLayout } from "../layout/AccountLayout";
import { ManagerLayout } from "../layout/ManagerLayout";
import { Login } from "../screen/Login";
import { Register } from "../screen/Register";
import { ForgotPassword } from "../screen/ForgotPassword";

import {
    Home,
    Contact,
    Profile,
    Purchase,
    Search,
    Cart,
    ProductDetail,
    Dashboard,
    CategoryManager,
    CarouselManager,
    ContactManager,
    MemberManager,
} from "../pages";
import { ProductManager, ProductDetailManager } from "../pages/ProductManager";
import { OrderManager, OrderDetail } from "../pages/OrderManager";

export const routes = [
    {
        path: "/login",
        element: (
            <LoginLogoutLayout>
                <Login />
            </LoginLogoutLayout>
        ),
    },
    {
        path: "/register",
        element: (
            <LoginLogoutLayout>
                <Register />
            </LoginLogoutLayout>
        ),
    },
    {
        path: "/forgot-password",
        element: (
            <LoginLogoutLayout>
                <ForgotPassword />
            </LoginLogoutLayout>
        ),
    },
    {
        path: "/",
        element: <HeaderFooterLayout></HeaderFooterLayout>,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "contact",
                element: <Contact />,
            },
            {
                path: "product/detail/:productId",
                element: <ProductDetail />,
            },
            {
                path: "user/cart",
                element: <Cart />,
            },
            {
                path: "user",
                element: <AccountLayout></AccountLayout>,
                children: [
                    {
                        path: "profile",
                        element: <Profile />,
                    },
                    {
                        path: "purchase",
                        element: <Purchase />,
                    },
                ],
            },
            {
                path: "men",
                element: <Search title='Thời trang nam | 360 Store' />,
            },
            {
                path: "women",
                element: <Search title='Thời trang nữ | 360 Store' />,
            },
            {
                path: "accessory",
                element: <Search title='Phụ kiện | 360 Store' />,
            },
            {
                path: "search",
                element: <Search />,
            },
        ],
    },
    {
        path: "/manager",
        element: <ManagerLayout></ManagerLayout>,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "carousels",
                element: <CarouselManager />,
            },
            {
                path: "categories",
                element: <CategoryManager />,
            },
            {
                path: "orders",
                children: [
                    {
                        index: true,
                        element: <OrderManager />,
                    },
                    {
                        path: ":id",
                        element: <OrderDetail />,
                    },
                ],
            },
            {
                path: "contacts",
                element: <ContactManager />,
            },
            {
                path: "members",
                element: <MemberManager />,
            },
            {
                path: "products",
                children: [
                    {
                        index: true,
                        element: <ProductManager />,
                    },
                    {
                        path: ":id",
                        element: <ProductDetailManager />,
                    },
                ],
            },
            {
                path: "user/profile",
                element: <Profile />,
            },
        ],
    },
];
