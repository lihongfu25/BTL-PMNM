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
const Register = () => {
    document.title = "Đăng ký | 360 Store";

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
            onSubmit={handleSubmit(onSubmit)}
            noValidate
        >
            <h6 className='heading textColor useFont-Nunito'>
                Đăng ký thành viên
            </h6>
            <Controller
                name='name'
                control={control}
                defaultValue=''
                rules={{
                    required: "Vui lòng nhập trường này",
                    pattern: {
                        value: /^[\p{L} .'-]+$/u,
                        message: "Họ tên chỉ chứa chữa cái",
                    },
                }}
                render={({ field }) => (
                    <StyledTextField
                        label='Họ tên'
                        error={Boolean(errors.name)}
                        helperText={errors?.name ? errors.name.message : ""}
                        {...field}
                    />
                )}
            />
            <Controller
                name='email'
                control={control}
                defaultValue=''
                rules={{
                    required: "Vui lòng nhập trường này",
                    pattern: {
                        value: /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/,
                        message: "Vui lòng nhập vào email của bạn",
                    },
                }}
                render={({ field }) => (
                    <StyledTextField
                        label='Email'
                        error={Boolean(errors.email)}
                        helperText={errors?.email ? errors.email.message : ""}
                        {...field}
                    />
                )}
            />
            <Controller
                name='address'
                control={control}
                defaultValue=''
                rules={{
                    required: "Vui lòng nhập trường này",
                }}
                render={({ field }) => (
                    <StyledTextField
                        label='Địa chỉ'
                        error={Boolean(errors.address)}
                        helperText={
                            errors?.address ? errors.address.message : ""
                        }
                        {...field}
                    />
                )}
            />
            <Controller
                name='phone'
                control={control}
                defaultValue=''
                rules={{
                    required: "Vui lòng nhập trường này",
                    pattern: {
                        value: /^\d+$/,
                        message: "Số điện thoại chỉ chưa số",
                    },
                    maxLength: {
                        value: 10,
                        message: "Có vẻ bạn đã nhập sai số điện thoại",
                    },
                }}
                render={({ field }) => (
                    <StyledTextField
                        label='Số điện thoại'
                        error={Boolean(errors.phone)}
                        helperText={errors?.phone ? errors.phone.message : ""}
                        {...field}
                    />
                )}
            />
            <Controller
                name='password'
                control={control}
                defaultValue=''
                rules={{
                    required: "Vui lòng nhập trường này",
                    pattern: {
                        value: /^(?=.*[a-zA-Z])(?=.*[@$!%*#?&])(?=.*[0-9])[A-Za-z0-9@$!%*#?&]{8,}$/,
                        message:
                            "Mật khẩu phải bao gồm chữ cái, chữ số và ký tự đặc biệt",
                    },
                    minLength: {
                        value: 8,
                        message: "Mật khẩu phải có tối thiểu 8 ký tự",
                    },
                }}
                render={({ field }) => (
                    <StyledTextField
                        label='Mật khẩu'
                        error={Boolean(errors.password)}
                        helperText={
                            errors?.password ? errors.password.message : ""
                        }
                        {...field}
                    />
                )}
            />

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
                type='submit'
                sx={{
                    width: "100%",
                    mt: "1rem",
                }}
            >
                Đăng ký
            </Button>
            <h6 className='navLink textColor useFont-Nunito'>
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
