import React from "react";
import { Link } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import { Box } from "@mui/material";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import "../../styles/LoginLogoutStyles/LoginLogoutStyles.scss";

const ForgotPassword = () => {
    document.title = "Quên mật khẩu | 360 Store";
    const [sended, setSended] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const handleResetPass = () => {
        setSended(true);
        console.log(email);
    };
    const handleBackLoginForm = () => {
        setSended(false);
        setEmail("");
    };
    return (
        <Box
            sx={{
                flexGrow: 1,
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                mb: "3rem",
            }}
        >
            <Link
                to='/login'
                className='navLink-Icon navLink whiteTextColor linkNoneUnderline'
                onClick={handleBackLoginForm}
            >
                <BsArrowLeftShort />
            </Link>
            <h6 className='heading whiteTextColor useFont-Nunito'>
                Đặt lại mật khẩu
            </h6>
            <Box
                sx={{
                    width: "100%",
                    backgroundColor: "#cdf7ec",
                    border: "1px solid #cdf7ec",
                    borderRadius: "0.4rem",
                    mb: "2rem",
                }}
            >
                <p className='notifyMessage'>
                    {sended
                        ? "Kiểm tra Email của bạn và đặt lại mật khẩu."
                        : "Nhập Email của bạn và hướng dẫn sẽ được gửi cho bạn!"}
                </p>
            </Box>
            <Input
                fullWidth
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                    backgroundColor: "#fff",
                    my: "1rem",
                }}
            />
            <Button
                onClick={handleResetPass}
                disabled={email === ""}
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
