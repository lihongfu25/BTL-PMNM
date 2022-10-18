import { LoginLogoutLayout } from "../layout/LoginLogoutLayout";
import { Login } from "../screen/Login";
import { Register } from "../screen/Register";
import { ForgotPassword } from "../screen/ForgotPassword";

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
];
