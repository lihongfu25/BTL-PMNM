import React from "react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { styled } from "@mui/material/styles";
import { Box, FormControlLabel, Checkbox } from "@mui/material";
import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";
import "../../styles/LoginLogoutStyles/LoginLogoutStyles.scss";
const StyledTextField = styled(TextField)({
    width: "100%",
    margin: "1rem 0",
});
const Login = () => {
    document.title = "Đăng nhập | 360 Store";

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => console.log(data);

    return (
        <Box
            component='form'
            sx={{
                flexGrow: 1,
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
        >
            <h6 className='heading textColor useFont-Nunito'>Đăng nhập</h6>
            <Controller
                name='username'
                control={control}
                rules={{
                    required: "Vui lòng nhập tên tài khoản",
                }}
                render={({ field }) => (
                    <StyledTextField
                        label='Tên đăng nhập/Email/SĐT'
                        error={Boolean(errors.username)}
                        helperText={
                            errors?.username ? errors.username.message : ""
                        }
                        {...field}
                    />
                )}
            />
            <Controller
                name='password'
                control={control}
                rules={{
                    required: "Vui lòng nhập mật khẩu",
                }}
                render={({ field }) => (
                    <StyledTextField
                        label='Mật khẩu'
                        type='password'
                        error={Boolean(errors.password)}
                        helperText={
                            errors?.password ? errors.password.message : ""
                        }
                        {...field}
                    />
                )}
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
                    className='textColor useFont-Nunito'
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
                    to='/auth/forgot-password'
                    className='linkUnderlineHover textColor'
                    style={{
                        fontSize: "1.4rem",
                    }}
                >
                    Quên mật khẩu ?
                </Link>
            </Box>
            <Button
                type='submit'
                sx={{
                    width: "100%",
                    mt: "1rem",
                }}
            >
                Đăng nhập
            </Button>
            <h6 className='navLink textColor useFont-Nunito'>
                Bạn chưa có tài khoản ?{" "}
                <Link
                    className='linkNoneUnderline'
                    to='/auth/register'
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
