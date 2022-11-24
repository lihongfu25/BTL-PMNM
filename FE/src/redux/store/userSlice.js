import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    id: "1",
    name: "Nhóm 9",
    email: "nhom9@gmail.com",
    phone: "0123456789",
    address: "Q. Bắc Từ Liêm, Hà Nội",
    gender: "Nam",
    birthOfDate: "2001-01-01",
    username: "",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbvaBdtJ4GaN7m79jU-Y47NqT3Grvxd7qIZ9VKUZKyU1ynYKxoNdlQCixTRDnliBE62os&usqp=CAU",
    role: 0,
};

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
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
            state.name = "";
            state.username = "";
            state.email = "";
            state.phone = "";
            state.address = "";
            state.gender = "";
            state.birthOfDate = "";
            state.role = 1;
        },
    },
});
export const { userUpdateProfile, userLogout } = userSlice.actions;
export default userSlice.reducer;
