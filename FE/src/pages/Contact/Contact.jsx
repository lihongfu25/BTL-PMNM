import React from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import contactUs from "../../assets/img/contact_us.jpg";
const StyledInput = styled(Input)({
    marginBottom: "1rem",
    width: "100%",
    border: "none",
    backgroundColor: "#fff",
});
const Contact = () => {
    const userId = useSelector((state) => state.user.id);
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [message, setMessage] = React.useState("");
    const handleSubmit = () => {
        console.log({ userId, name, email, phone, message });
    };
    return (
        <>
            <iframe
                title='map'
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.4737883168514!2d105.73291811485473!3d21.053730985984767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345457e292d5bf%3A0x20ac91c94d74439a!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBIw6AgTuG7mWk!5e0!3m2!1svi!2s!4v1652166330367!5m2!1svi!2s'
                style={{
                    border: 0,
                    width: "100%",
                    height: "50vh",
                }}
                allowFullScreen=''
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
            <Box
                className='grid-wide'
                sx={{
                    my: "4rem",
                    display: "flex",
                    "& img": {
                        width: "50%",
                    },
                }}
            >
                <img alt='' src={contactUs} />
                <Box
                    sx={{
                        p: "4rem 6rem",
                        ml: "3rem",
                        flexGrow: 1,
                        display: "flex",
                        position: "relative",
                        borderRadius: "0.4rem",
                        flexDirection: "column",
                        backgroundColor: "rgba(168, 192, 255, 0.5)",
                        "& textarea": {
                            p: "1.2rem",
                            width: "100%",
                            resize: "none",
                            border: "none",
                            outline: "none",
                            color: "#495057",
                            fontSize: "1.6rem",
                            borderRadius: "0.4rem",
                            boxSizing: "border-box",
                        },
                    }}
                >
                    <Typography
                        sx={{
                            mb: "2rem",
                            color: "#495057",
                            fontWeight: 700,
                            fontSize: "2.8rem",
                            fontFamily: "Nunito",
                            textAlign: "center",
                        }}
                    >
                        Liên hệ
                    </Typography>
                    <StyledInput
                        placeholder='Họ tên'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <StyledInput
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <StyledInput
                        placeholder='Số điện thoại'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <textarea
                        placeholder='Nội dung'
                        rows='5'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button
                        onClick={handleSubmit}
                        sx={{
                            textTransform: "none",
                            position: "absolute",
                            bottom: "4rem",
                            right: "10rem",
                            minWidth: "12rem",
                        }}
                    >
                        Gửi
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default Contact;
