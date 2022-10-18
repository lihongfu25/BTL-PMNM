import React from "react";
import { Box } from "@mui/material";
import logo from "../../assets/img/logo.png";
import bg from "../../assets/img/bg-loginlogout.jpg";
const LoginLogoutLayout = ({ children }) => {
    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${bg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}
        >
            <Box
                sx={{
                    alignSelf: "center",
                    width: "30rem",
                    mx: "auto",
                    px: "6rem",
                    pt: "3rem",
                    pb: "4rem",
                    borderRadius: "0.4rem",
                    backgroundColor: "rgba(0, 0, 0, 0.15)",
                    boxShadow: "0 0 10px 1px #888",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    position: "relative",
                }}
            >
                <img
                    alt=''
                    src={logo}
                    style={{
                        width: "10rem",
                    }}
                />
                {children}
            </Box>
        </Box>
    );
};

export default LoginLogoutLayout;
