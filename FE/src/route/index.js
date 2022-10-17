import { LoginLogoutLayout } from "../layout/LoginLogoutLayout";
import { Login } from "../screen/Login";
export const routes = [
    {
        path: "/",
        element: (
            <LoginLogoutLayout>
                <Login />
            </LoginLogoutLayout>
        ),
    },
];
