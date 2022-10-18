import React from "react";
import { Box, InputBase } from "@mui/material";

const Input = ({ startIcon, sx, ...props }) => {
    const Icon = startIcon;
    if (Icon) return <Box>asds</Box>;
    else
        return (
            <InputBase
                {...props}
                sx={{
                    ...sx,
                    border: "1px solid #ccc",
                    borderRadius: 1,
                    fontSize: "1.6rem",
                    "& input": {
                        px: "1.2rem",
                        py: "0.8rem",
                    },
                }}
            />
        );
};

export default React.memo(Input);
