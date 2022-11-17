import React from "react";
import { styled } from "@mui/material/styles";
import {
    FormControl,
    InputLabel,
    Select as MuiSelect,
    MenuItem,
    FormHelperText,
} from "@mui/material";
const StyledMenuItem = styled(MenuItem)({
    fontSize: "1.6rem",
});
const Select = ({ label, options, isError, errorMessage, field, ...props }) => {
    return (
        <FormControl
            {...props}
            fullWidth
            error={isError}
            sx={{
                "& .css-1yk1gt9-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                        borderColor: "#333",
                    },
                "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
                    fontSize: "1.6rem",
                    transform: "translate(1.2rem, 0.8rem)",
                },
                "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                    {
                        p: "1.2rem",
                        fontSize: "1.6rem",
                        minHeight: "0!important",
                    },
                "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root": {
                    fontSize: "1.6rem",
                    "&.Mui-focused": {
                        color: "#333",
                    },
                },
                "& .css-14lo706": {
                    fontSize: "1.2rem",
                },
                "& .css-1wc848c-MuiFormHelperText-root": {
                    fontSize: "1.2rem",
                },
                ...props.sx,
            }}
        >
            <InputLabel>{label}</InputLabel>
            <MuiSelect label={label} {...field}>
                <StyledMenuItem value=''>
                    <em>{label}</em>
                </StyledMenuItem>
                {options.map((option) => (
                    <StyledMenuItem
                        key={option.id || option.name}
                        value={option.id || option.name}
                    >
                        {option.name}
                    </StyledMenuItem>
                ))}
            </MuiSelect>
            {isError && <FormHelperText>{errorMessage}</FormHelperText>}
        </FormControl>
    );
};

export default Select;
