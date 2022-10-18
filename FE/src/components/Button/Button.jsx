import React from "react";
import { styled } from "@mui/material/styles";
import { Button as MuiBtn } from "@mui/material";
const StyledButton = styled(MuiBtn)({
    fontSize: "1.6rem",
    background: "#29323c",
    color: "#fff",
    transition: "0.6s all ease",
    "::before": {
        background: "linear-gradient(to right, #859398, #283048)",
        content: "''",
        width: "0",
        height: "100%",
        position: "absolute",
        top: "50%",
        left: 0,
        transform: "translateY(-50%)",
        zIndex: "-1",
        transition: "all 0.6s ease",
        borderRadius: "inherit",
    },
    ":hover::before": {
        width: "100%",
    },
});
const Button = ({ children, className, ...props }) => {
    return (
        <StyledButton className={`${className} useFont-Nunito`} {...props}>
            {children}
        </StyledButton>
    );
};

export default React.memo(Button);
