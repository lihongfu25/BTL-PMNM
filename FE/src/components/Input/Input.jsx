import React from "react";
import { Box, InputBase } from "@mui/material";

const Input = ({ startIcon, sx, ...props }) => {
    const Icon = startIcon;
    return (
        <InputBase
            {...props}
            sx={{
                border: "1px solid #ccc",
                borderRadius: 1,
                fontSize: "1.6rem",
                "& input": {
                    px: "1.2rem",
                    py: "0.8rem",
                },
                ...sx,
            }}
        />
    );
};

export default React.memo(Input);
