import { LoginLogoutLayout } from "../layout/LoginLogoutLayout";
import { HeaderFooterLayout } from "../layout/HeaderFooterLayout";
import { AccountLayout } from "../layout/AccountLayout";
import { Login } from "../screen/Login";
import { Register } from "../screen/Register";
import { ForgotPassword } from "../screen/ForgotPassword";
import { Home, Contact, Profile, Purchase, Search, Cart } from "../pages";

export const routes = [{
        path: "/login",
        element: ( <
            LoginLogoutLayout >
            <
            Login / >
            <
            /LoginLogoutLayout>
        ),
    },
    {
        path: "/register",
        element: ( <
            LoginLogoutLayout >
            <
            Register / >
            <
            /LoginLogoutLayout>
        ),
    },
    {
        path: "/forgot-password",
        element: ( <
            LoginLogoutLayout >
            <
            ForgotPassword / >
            <
            /LoginLogoutLayout>
        ),
    },
    {
        path: "/",
        element: ( <
            HeaderFooterLayout >
            <
            Home / >
            <
            /HeaderFooterLayout>
        ),
    },
    {
        path: "/men",
        element: ( <
            HeaderFooterLayout >
            <
            Search title = "Thời trang nam | 360 Store" / >
            <
            /HeaderFooterLayout>
        ),
    },
    {
        path: "/women",
        element: ( <
            HeaderFooterLayout >
            <
            Search title = "Thời trang nữ | 360 Store" / >
            <
            /HeaderFooterLayout>
        ),
    },
    {
        path: "/accessory",
        element: ( <
            HeaderFooterLayout >
            <
            Search title = "Phụ kiện | 360 Store" / >
            <
            /HeaderFooterLayout>
        ),
    },
    {
        path: "/contact",
        element: ( <
            HeaderFooterLayout >
            <
            Contact / >
            <
            /HeaderFooterLayout>
        ),
    },
    {
        path: "/user/cart",
        element: ( <
            HeaderFooterLayout >
            <
            Cart / >
            <
            /HeaderFooterLayout>
        ),
    },
    {
        path: "/account",
        element: ( <
            HeaderFooterLayout >
            <
            AccountLayout > < /AccountLayout> < /
            HeaderFooterLayout >
        ),
        children: [{
                path: "profile",
                element: < Profile / > ,
            },
            {
                path: "purchase",
                element: < Purchase / > ,
            },
        ],
    },
];