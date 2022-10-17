import React from "react";
import { Box, Typography } from "@mui/material";
import { Input } from "../../components/Input";
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
                background: "linear-gradient(to right, #eacda3, #d6ae7b)",
            }}
        >
            <Box
                sx={{
                    alignSelf: "center",
                    width: "70%",
                    height: "80%",
                    mx: "auto",
                    borderRadius: "0.4rem",
                    backgroundColor: "#fff",
                    display: "flex",
                }}
            >
                <img
                    src=''
                    alt=''
                    style={{
                        width: "70%",
                    }}
                />
                <Box
                    sx={{
                        flexGrow: 1,
                        p: "1.5rem",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <Typography
                        variant='h6'
                        className='textColor'
                        sx={{
                            fontSize: "1.25rem",
                        }}
                    >
                        Đăng nhập
                    </Typography>
                    <Input label='Tài khoản' />
                </Box>
            </Box>
        </Box>
    );
};

export default LoginLogoutLayout;
