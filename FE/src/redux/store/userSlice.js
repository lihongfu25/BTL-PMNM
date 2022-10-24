import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        id: "1",
        name: "Nhóm 9",
        username: "",
        email: "nhom9@gmail.com",
        phone: "0123456789",
        address: "Q. Bắc Từ Liêm, Hà Nội",
        gender: "Nam",
        birthOfDate: "2001-01-01",
    },
    reducers: {
        userUpdateProfile: (state, action) => {
            state.name = action.payload.name;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.address = action.payload.address;
            state.gender = action.payload.gender;
            state.birthOfDate = action.payload.birthOfDate;
        },
        userLogout: (state) => {
            state.id = "";
            state.name = "Nhóm 9";
            state.username = "nhom9";
            state.email = "nhom9@gmail.com";
            state.phone = "0123456789";
            state.address = "Q. Bắc Từ Liêm; Hà Nội";
            state.gender = "Nam";
            state.birthOfDate = "2001-01-01";
        },
    },
});
export const { userUpdateProfile, userLogout } = userSlice.actions;
export default userSlice.reducer;
