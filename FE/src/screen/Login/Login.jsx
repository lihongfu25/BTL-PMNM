import React from "react";
import { Link } from "react-router-dom";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { styled } from "@mui/material/styles";
import {
    Box,
    InputAdornment,
    IconButton,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import "../../styles/LoginLogoutStyles/LoginLogoutStyles.scss";
const StyledInput = styled(Input)({
    backgroundColor: "#fff",
    width: "100%",
    margin: "1rem 0",
});
const Login = () => {
    document.title = "Đăng nhập | 360 Store";

    const [showPassword, setShowPassword] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = (e) => {
        console.log({ username, password });
        e.preventDefault();
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
            <h6 className='heading whiteTextColor useFont-Nunito'>Đăng nhập</h6>
            <StyledInput
                placeholder='Tên đăng nhập/Email/SĐT'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <StyledInput
                placeholder='Mật khẩu'
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                    <InputAdornment
                        position='end'
                        sx={{
                            position: "absolute",
                            right: 0,
                        }}
                    >
                        <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
                        </IconButton>
                    </InputAdornment>
                }
            />
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
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
                    label='Ghi nhớ mật khẩu'
                    sx={{
                        alignSelf: "flex-start",
                        "& .css-ahj2mt-MuiTypography-root": {
                            fontSize: "1.4rem",
                            fontFamily: "Nunito",
                        },
                    }}
                />
                <Link
                    to='/forgot-password'
                    className='linkUnderlineHover whiteTextColor'
                    style={{
                        fontSize: "1.4rem",
                    }}
                >
                    Quên mật khẩu ?
                </Link>
            </Box>
            <Button
                onClick={handleSubmit}
                sx={{
                    width: "100%",
                    mt: "1rem",
                }}
            >
                Đăng nhập
            </Button>
            <h6 className='navLink whiteTextColor useFont-Nunito'>
                Bạn chưa có tài khoản ?{" "}
                <Link
                    className='linkNoneUnderline'
                    to='/register'
                    style={{
                        color: "#AF0171",
                    }}
                >
                    Đăng ký ngay
                </Link>
            </h6>
        </Box>
    );
};

export default Login;
