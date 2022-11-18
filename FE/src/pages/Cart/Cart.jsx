import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { CartItem } from "./CartItem";
import { currencyFormat } from "../../styles/GlobalStyles";
import productImg from "../../assets/img/demo_porduct.jpg";

const StyledTypography = styled(Typography)({
    fontWeight: 700,
    color: "#495057",
    fontSize: "1.6rem",
    fontFamily: "Nunito",
});
const StyledBox = styled(Box)({
    minWidth: "21rem",
    textAlign: "center",
});
const StyledButton = styled(Button)({
    textTransform: "none",
    minWidth: "12rem",
});
const carts = [
    {
        id: 1,
        name: "Sản phẩm 1",
        img: productImg,
        size: "M",
        color: {
            colorId: 1,
            url: "https://wallpapercave.com/wp/wp2552423.jpg",
        },
        price: 123000,
        quantity: 1,
    },
    {
        id: 2,
        name: "Sản phẩm 1",
        img: productImg,
        size: "M",
        color: {
            colorId: 1,
            url: "https://wallpapercave.com/wp/wp2552423.jpg",
        },
        price: 123000,
        quantity: 1,
    },
    {
        id: 3,
        name: "Sản phẩm 1",
        img: productImg,
        size: "M",
        color: {
            colorId: 1,
            url: "https://wallpapercave.com/wp/wp2552423.jpg",
        },
        price: 123000,
        quantity: 1,
    },
];
const Cart = () => {
    document.title = "Giỏ hàng | 360 Store";
    return (
        <Box
            className='grid-wide'
            sx={{
                my: "6rem",
                flexGrow: 1,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "3rem",
                        "& > h3": {
                            m: 0,
                        },
                    }}
                >
                    <h3 className='textColor'>360 Store</h3>
                    <Box
                        sx={{
                            mx: "3rem",
                            width: "0.4rem",
                            height: "3.6rem",
                            borderRadius: "0.4rem",
                            backgroundImage:
                                "linear-gradient(45deg, #485563, #29323c)",
                        }}
                    ></Box>
                    <h3 className='textColor'>Cart</h3>
                </Box>
            </Box>
            <Box
                sx={{
                    mt: "4rem",
                    p: "1rem 2rem",
                    display: "flex",
                    borderRadius: "0.4rem",
                    boxShadow: "0 0 20px 1px #e5e5e5",
                }}
            >
                <StyledBox
                    sx={{
                        flexGrow: 1,
                    }}
                >
                    <StyledTypography
                        sx={{
                            textAlign: "left",
                        }}
                    >
                        Sản phẩm
                    </StyledTypography>
                </StyledBox>
                <StyledBox>
                    <StyledTypography>Đơn giá</StyledTypography>
                </StyledBox>
                <StyledBox>
                    <StyledTypography>Số lượng</StyledTypography>
                </StyledBox>
                <StyledBox>
                    <StyledTypography>Số tiền</StyledTypography>
                </StyledBox>
                <Box
                    sx={{
                        width: "15rem",
                    }}
                ></Box>
            </Box>
            {carts.map((cartItem) => (
                <CartItem key={cartItem.id} product={cartItem} />
            ))}
            <Box
                sx={{
                    p: "2rem 4rem",
                    mt: "1.6rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    boxShadow: "0 0 20px 1px #e5e5e5",
                }}
            >
                <Typography
                    sx={{
                        color: "#495057",
                        fontSize: "2rem",
                        fontFamily: "Nunito",
                        "& .total-Count,& .total-Price": {
                            fontWeight: 700,
                        },
                    }}
                >
                    Tổng thanh toán(
                    <span className='total-Count'>{carts.length}</span> sản
                    phẩm):{" "}
                    <span className='total-Price'>
                        {currencyFormat(
                            carts.reduce(
                                (total, cartItem) =>
                                    total + cartItem.price * cartItem.quantity,
                                0,
                            ),
                        )}
                    </span>
                </Typography>
                <StyledButton>Đặt hàng</StyledButton>
            </Box>
        </Box>
    );
};

export default Cart;
