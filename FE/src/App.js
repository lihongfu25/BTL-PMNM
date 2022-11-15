import React from "react";
import { useSelector } from "react-redux";
import { useRoutes, useLocation, useNavigate } from "react-router-dom";
import { routes } from "./route";
function App() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const appRoutes = useRoutes(routes);
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
        // if (user.role === 0) navigate("/manager");
    }, [pathname, user]);

    return <div>{appRoutes}</div>;
}

export default App;
