import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./store/userSlice";
import tokenReducer from "./store/tokenSlice";
import managerReducer from "../layout/ManagerLayout/managerSlice";
const store = configureStore({
    reducer: {
        user: userReducer,
        token: tokenReducer,
        manager: managerReducer,
    },
});

export default store;
