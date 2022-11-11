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
    ProductManager,
} from "../pages";

export const routes = [
    {
        path: "/auth",
        element: <LoginLogoutLayout></LoginLogoutLayout>,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />,
            },
        ],
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
                path: "/men",
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
                children: [
                    {
                        index: true,
                        element: <ProductManager />,
                    },
                    {
                        path: ":id",
                        element: <ProductManager />,
                    },
                ],
            },
            {
                path: "categories",
                element: <ProductManager />,
            },
            {
                path: "orders",
                element: <ProductManager />,
            },
            {
                path: "contacts",
                element: <ProductManager />,
            },
            {
                path: "members",
                element: <ProductManager />,
            },
            {
                path: "products",
                element: <ProductManager />,
            },
            {
                path: "user/profile",
                element: <ProductManager />,
            },
        ],
    },
];
