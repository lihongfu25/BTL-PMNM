import React from "react";
import { BsTelephoneFill, BsEnvelopeFill } from "react-icons/bs";
import {
    FaFacebookSquare,
    FaYoutube,
    FaInstagram,
    FaTiktok,
} from "react-icons/fa";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { styled } from "@mui/material/styles";
import { Box, InputBase, Typography, Link } from "@mui/material";
const StyledBox = styled(Box)({
    color: "#fff",
    "& .heading": {
        fontWeight: 500,
        fontSize: "2rem",
        margin: "0 0 1.5rem",
    },
    "& .content": {
        display: "grid",
        gap: "1rem",
    },
});
const StyledTypography = styled(Typography)({
    color: "#a5a5a5",
    display: "flex",
    alignItems: "center",
    fontSize: "1.4rem",
    "& .text": {
        margin: 0,
        marginLeft: "1.2rem",
    },
});
const StyledLink = styled(Link)({
    color: "#a5a5a5",
    cursor: "pointer",
    fontSize: "1.4rem",
    textDecoration: "none",
    "&:hover": {
        color: "#fff",
    },
});
const Footer = () => {
    return (
        <>
            <Box
                sx={{
                    backgroundColor: "#333",
                    width: "100%",
                }}
            >
                <Box
                    className='whiteTextColor grid-wide'
                    sx={{
                        py: "2rem",
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: "3rem",
                    }}
                >
                    <Box
                        className='whiteTextColor'
                        sx={{
                            display: "grid",
                            gap: "1rem",
                        }}
                    >
                        <Typography
                            className='useFont-Nunito'
                            sx={{
                                fontSize: "2rem",
                                fontWeight: 500,
                            }}
                        >
                            360 Store
                        </Typography>
                        <StyledTypography className='useFont-Nunito'>
                            <LocationOnRoundedIcon />
                            <span className='text'>Q. B???c T??? Li??m, H?? N???i</span>
                        </StyledTypography>
                        <StyledTypography className='useFont-Nunito'>
                            <BsTelephoneFill />
                            <span className='text'>0123 456 789</span>
                        </StyledTypography>
                        <StyledTypography className='useFont-Nunito'>
                            <BsEnvelopeFill />
                            <span className='text'>360.store@gmail.com</span>
                        </StyledTypography>
                        <Box>
                            <Typography
                                className='useFont-Nunito'
                                sx={{
                                    fontSize: "1.3rem",
                                    my: "1.5rem",
                                    color: "#a5a5a5",
                                }}
                            >
                                ????ng k?? ????? ???????c nh???n th??ng tin khuy???n m??i m???t
                                c??ch nhanh ch??ng.
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    p: "0.2rem",
                                    mr: "3rem",
                                    borderRadius: "0.2rem",
                                    backgroundColor: "#fff",
                                    "& button": {
                                        color: "#fff",
                                        cursor: "pointer",
                                        border: "none",
                                        minWidth: "5rem",
                                        borderRadius: "0.2rem",
                                        backgroundColor: "#333",
                                    },
                                }}
                            >
                                <InputBase
                                    placeholder='Email c???a b???n'
                                    fullWidth
                                    sx={{
                                        px: "1.2rem",
                                        fontSize: "1.3rem",
                                    }}
                                />
                                <button>G???i</button>
                            </Box>
                        </Box>
                    </Box>
                    <StyledBox>
                        <Typography className='useFont-Nunito heading'>
                            Danh m???c
                        </Typography>
                        <Box className='content'>
                            <StyledLink className='useFont-Nunito'>
                                Th???i trang nam
                            </StyledLink>
                            <StyledLink className='useFont-Nunito'>
                                Th???i trang n???
                            </StyledLink>
                            <StyledLink className='useFont-Nunito'>
                                Ph??? ki???n
                            </StyledLink>
                        </Box>
                    </StyledBox>
                    <StyledBox>
                        <Typography className='useFont-Nunito heading'>
                            G??c Kh??ch H??ng
                        </Typography>
                        <Box className='content'>
                            <StyledLink className='useFont-Nunito'>
                                ??i???u ki???n & ??i???u kho???n
                            </StyledLink>
                            <StyledLink className='useFont-Nunito'>
                                Quy???n ri??ng t??
                            </StyledLink>
                            <StyledLink className='useFont-Nunito'>
                                Ch??nh s??ch b???o m???t th??ng tin
                            </StyledLink>
                            <StyledLink className='useFont-Nunito'>
                                ?? ki???n kh??ch h??ng
                            </StyledLink>
                            <StyledLink className='useFont-Nunito'>
                                Ph????ng th???c thanh to??n
                            </StyledLink>
                        </Box>
                    </StyledBox>
                    <StyledBox>
                        <Typography className='useFont-Nunito heading'>
                            Theo d??i ch??ng t??i
                        </Typography>
                        <Typography
                            className='useFont-Nunito'
                            sx={{
                                fontSize: "1.3rem",
                                my: "1.5rem",
                                color: "#a5a5a5",
                            }}
                        >
                            Theo d??i ch??ng t??i ????? c???p nh???t th??ng tin khuy???n m??i
                            m???t c??ch nhanh ch??ng nh???t.
                        </Typography>
                        <Box
                            sx={{
                                "& a": {
                                    mr: "3rem",
                                    color: "#f1f1f1",
                                    fontSize: "3rem",
                                },
                            }}
                        >
                            <a href='http://facebook.com'>
                                <FaFacebookSquare />
                            </a>
                            <a href='http://youtube.com'>
                                <FaYoutube />
                            </a>
                            <a href='http://instagram.com'>
                                <FaInstagram />
                            </a>
                            <a href='http://tiktok.com'>
                                <FaTiktok />
                            </a>
                        </Box>
                    </StyledBox>
                </Box>
            </Box>
            <Typography
                className='useFont-Nunito'
                sx={{
                    width: "100%",
                    color: "#a5a5a5",
                    fontSize: "1.6rem",
                    textAlign: "center",
                    backgroundColor: "#000",
                    p: "2rem 0",
                }}
            >
                ?? All rights reserved. <strong>Nh??m 9</strong>
            </Typography>
        </>
    );
};

export default Footer;
