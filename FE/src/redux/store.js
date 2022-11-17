import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./store/userSlice";
import managerReducer from "../layout/ManagerLayout/managerSlice";
const store = configureStore({
    reducer: {
        user: userReducer,
        manager: managerReducer,
    },
});

export default store;
