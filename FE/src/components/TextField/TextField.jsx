import React from "react";
import { styled } from "@mui/material/styles";
import { TextField as MUI } from "@mui/material";
const StyledTextField = styled(MUI)({
    "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
        padding: "0.8rem 1.2rem",
        fontSize: "1.6rem",
    },
    "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
        fontSize: "1.6rem",
        transform: "translate(1.2rem, 0.8rem)!important",
    },
    "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root": {
        fontSize: "1.6rem",
    },
    "& .css-14lo706": {
        fontSize: "1.2rem",
    },
    "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
        color: "#333",
        zIndex: 100,
        fontSize: "1.6rem",
    },
    "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
        {
            borderColor: "#333",
        },
    "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-error": {
        color: "#d32f2f",
    },
    "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
        {
            borderColor: "#d32f2f",
        },
    "& .css-1wc848c-MuiFormHelperText-root": {
        fontSize: "1.2rem",
    },
    "& .css-1sqnrkk-MuiInputBase-input-MuiOutlinedInput-input": {
        fontSize: "1.6rem",
        lineHeight: "2.3rem",
        padding: "0.8rem 1.2rem",
    },
    "& .css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root": {
        padding: 0,
    },
    "& .css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
        {
            borderColor: "#333",
        },
    "& .css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
        {
            borderColor: "#d32f2f",
        },
});
const TextField = ({ ...props }) => {
    return <StyledTextField {...props} />;
};

export default React.memo(TextField);
