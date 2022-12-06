import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useRoutes, useLocation, useNavigate } from "react-router-dom";
import { routes } from "./route";
import { userUpdateProfile } from "./redux/store/userSlice";
import { setCart } from "./pages/Cart/cartSlice";
function App() {
    const appRoutes = useRoutes(routes);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const { pathname } = useLocation();
    React.useEffect(() => {
        const getUser = async () => {
            axios
                .get("//localhost:8000/api/user", {
                    headers: {
                        Authorization: "Bearer " + token.authToken,
                    },
                })
                .then((res) => {
                    dispatch(userUpdateProfile(res.data));
                    axios
                        .get(
                            `//localhost:8000/api/carts?member_id=${res.data.id}`,
                        )
                        .then((res) => dispatch(setCart(res.data.data)));
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        if (token.authToken) getUser();
    }, []);
    React.useEffect(() => {
        window.scrollTo(0, 0);

        if (
            !token.authToken &&
            (pathname.includes("/user") || pathname.includes("/manager"))
        )
            navigate("/login");
    }, [pathname, token, navigate]);

    return <div>{appRoutes}</div>;
}

export default App;
