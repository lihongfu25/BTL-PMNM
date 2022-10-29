import { LoginLogoutLayout } from "../layout/LoginLogoutLayout";
import { HeaderFooterLayout } from "../layout/HeaderFooterLayout";
import { AccountLayout } from "../layout/AccountLayout";
import { Login } from "../screen/Login";
import { Register } from "../screen/Register";
import { ForgotPassword } from "../screen/ForgotPassword";
import { Home, Contact, Profile, Purchase, Search } from "../pages";

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
        element: (
            <HeaderFooterLayout>
                <Home />
            </HeaderFooterLayout>
        ),
    },
    {
        path: "/men",
        element: (
            <HeaderFooterLayout>
                <Search />
            </HeaderFooterLayout>
        ),
    },
    {
        path: "/contact",
        element: (
            <HeaderFooterLayout>
                <Contact />
            </HeaderFooterLayout>
        ),
    },
    {
        path: "/account",
        element: (
            <HeaderFooterLayout>
                <AccountLayout></AccountLayout>
            </HeaderFooterLayout>
        ),
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
];
