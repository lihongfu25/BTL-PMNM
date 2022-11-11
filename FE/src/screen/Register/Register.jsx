import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, FormControlLabel, Checkbox } from "@mui/material";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import "../../styles/LoginLogoutStyles/LoginLogoutStyles.scss";

const StyledInput = styled(Input)({
    backgroundColor: "#fff",
    width: "100%",
    margin: "1rem 0",
});
const Register = () => {
    document.title = "Đăng ký | 360 Store";

    const [fullname, setFullname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ fullname, email, password });
    };

    return (
        <Box
            sx={{
                flexGrow: 1,
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <h6 className='heading whiteTextColor useFont-Nunito'>Đăng ký</h6>
            <StyledInput
                placeholder='Họ tên'
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
            />
            <StyledInput
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <StyledInput
                placeholder='Mật khẩu'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
                className='whiteTextColor useFont-Nunito'
                control={
                    <Checkbox
                        color='default'
                        sx={{
                            "& .MuiSvgIcon-root": {
                                fontSize: "1.8rem",
                            },
                        }}
                    />
                }
                label='Đồng ý với các điều khoản'
                sx={{
                    alignSelf: "flex-start",
                    "& .css-ahj2mt-MuiTypography-root": {
                        fontSize: "1.4rem",
                        fontFamily: "Nunito",
                    },
                }}
            />
            <Button
                onClick={handleSubmit}
                sx={{
                    width: "100%",
                    mt: "1rem",
                }}
            >
                Đăng ký
            </Button>
            <h6 className='navLink whiteTextColor useFont-Nunito'>
                Bạn đã có tài khoản ?{" "}
                <Link
                    className='linkNoneUnderline'
                    to='/auth/login'
                    style={{
                        color: "#AF0171",
                    }}
                >
                    Đăng nhập ngay
                </Link>
            </h6>
        </Box>
    );
};

export default Register;
