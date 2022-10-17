import React from "react";
import { InputBase } from "@mui/material";

const Input = ({ sx, ...props }) => {
    return (
        <InputBase
            fullWidth
            {...props}
            sx={{
                border: "1px solid #ccc",
                borderRadius: 1,
                fontSize: "1.2rem",
                px: "0.8rem",
                py: "0.2rem",
            }}
        />
    );
};

export default React.memo(Input);
