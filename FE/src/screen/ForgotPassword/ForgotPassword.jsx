import React from "react";
import { Link } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import { useForm, Controller } from "react-hook-form";
import { Box } from "@mui/material";

import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";
import "../../styles/LoginLogoutStyles/LoginLogoutStyles.scss";

const ForgotPassword = () => {
    document.title = "Quên mật khẩu | 360 Store";
    const [sended, setSended] = React.useState(false);
    const [notExist, setNotExist] = React.useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        // setSended(true);
        setNotExist(true);
    };
    const handleBackLoginForm = () => {
        setSended(false);
        setNotExist(false);
    };

    return (
        <Box
            component='form'
            sx={{
                flexGrow: 1,
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                mb: "3rem",
            }}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
        >
            <Link
                to='/auth/login'
                className='navLink-Icon navLink textColor linkNoneUnderline'
                onClick={handleBackLoginForm}
            >
                <BsArrowLeftShort />
            </Link>
            <h6 className='heading textColor useFont-Nunito'>
                Đặt lại mật khẩu
            </h6>
            <Box
                sx={{
                    width: "100%",
                }}
            >
                <p className={`notifyMessage ${notExist && "error"}`}>
                    {sended
                        ? "Kiểm tra Email của bạn và đặt lại mật khẩu."
                        : notExist
                        ? `Không tìm thấy tài khoản liên kết với email đã nhập`
                        : "Nhập Email của bạn và hướng dẫn sẽ được gửi cho bạn!"}
                    {}
                </p>
            </Box>
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
                    <TextField
                        label='Email'
                        error={Boolean(errors.email)}
                        helperText={errors?.email ? errors.email.message : ""}
                        {...field}
                        sx={{
                            width: "100%",
                            my: "1rem",
                        }}
                    />
                )}
            />
            <Button
                type='submit'
                sx={{
                    width: "100%",
                    mt: "1rem",
                }}
            >
                Tiếp theo
            </Button>
        </Box>
    );
};

export default ForgotPassword;
