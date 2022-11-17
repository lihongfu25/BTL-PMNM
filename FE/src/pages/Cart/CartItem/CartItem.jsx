import React from "react";
import { styled } from "@mui/material/styles";
import { BsDash, BsPlus } from "react-icons/bs";
import { Box, Button as MuiButton, Typography } from "@mui/material";
import { Button } from "../../../components/Button";
import { currencyFormat } from "../../../styles/GlobalStyles";
const StyledBox = styled(Box)({
    minWidth: "21rem",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});
const StyledTypography = styled(Typography)({
    color: "#495057",
    fontSize: "1.6rem",
});
const StyledButton = styled(MuiButton)({
    padding: 0,
    minWidth: 0,
    border: "1px solid rgba(204,204,204, 0.5)",
    ":hover": {
        border: "1px solid #ccc",
    },
});
const CartItem = ({ product }) => {
    const [quantity, setQuantity] = React.useState(product.quantity);

    const handleDeleteItemFromCart = () => {
        console.log("xoá");
    };
    return (
        <Box
            sx={{
                mt: "1.6rem",
                p: "1.6rem 2rem",
                borderRadius: "0.4rem",
                boxShadow: "0 0 2rem #e5e5e5",
                display: "flex",
            }}
        >
            <StyledBox
                className='productInfo'
                sx={{
                    flexGrow: 1,
                }}
            >
                <Box
                    sx={{
                        width: "8rem",
                        "& img": {
                            width: "100%",
                        },
                    }}
                >
                    <img alt='' src={product.img} />
                </Box>
                <Box
                    sx={{
                        flexGrow: 1,
                        ml: "1.6rem",
                        textAlign: "left",
                        alignSelf: "flex-start",
                        "& > h3": {
                            m: 0,
                            color: "#495057",
                            fontSize: "1.8rem",
                        },
                        "& > h6": {
                            m: "1rem 0 0",
                            display: "flex",
                            color: "#999",
                            fontWeight: 500,
                            fontSize: "1.4rem",
                            "& .product-size": {
                                ml: "0.8rem",
                                mr: "0.4rem",
                                fontWeight: 700,
                                color: "#495057",
                            },
                            "& .product-color": {
                                ml: "0.8rem",
                                width: "1.6rem",
                                height: "1.6rem",
                                display: "inline-block",
                                borderRadius: "50%",
                                backgroundImage: `url(${product.color.url})`,
                                backgroundPosition: "center",
                            },
                        },
                    }}
                >
                    <h3>{product.name}</h3>
                    <h6>
                        Size:
                        <span className='product-size'>{product.size}</span> /
                        Màu:<span className='product-color'></span>
                    </h6>
                </Box>
            </StyledBox>
            <StyledBox>
                <StyledTypography>
                    {currencyFormat(product.price)}
                </StyledTypography>
            </StyledBox>
            <StyledBox
                sx={{
                    position: "relative",
                    flexDirection: "column",
                    "& .quantityError": {
                        position: "absolute",
                        bottom: 0,
                        color: "#d32f2f",
                        fontSize: "1.4rem",
                        whiteSpace: "nowrap",
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        "& > button svg": {
                            fontSize: "2.8rem",
                            color: "#495057",
                        },
                        "& > button.Mui-disabled svg": {
                            fontSize: "2.8rem",
                            color: "#999",
                        },
                    }}
                >
                    <StyledButton
                        variant='outlined'
                        disabled={quantity === 1}
                        onClick={() =>
                            setQuantity((prevState) => prevState - 1)
                        }
                    >
                        <BsDash />
                    </StyledButton>
                    <StyledTypography
                        className='useFont-Nunito'
                        sx={{
                            mx: "1.2rem",
                            fontSize: "1.8rem",
                            alignSelf: "center",
                        }}
                    >
                        {quantity}
                    </StyledTypography>
                    <StyledButton
                        variant='outlined'
                        disabled={quantity === product.maxQuantity}
                        onClick={() =>
                            setQuantity((prevState) => prevState + 1)
                        }
                    >
                        <BsPlus />
                    </StyledButton>
                </Box>
                {quantity === product.maxQuantity && (
                    <span className='quantityError'>
                        Đã đạt đến giới hạn số lượng hàng có sẵn!
                    </span>
                )}
            </StyledBox>
            <StyledBox>
                <StyledTypography>
                    {currencyFormat(product.price * quantity)}
                </StyledTypography>
            </StyledBox>
            <Box
                sx={{
                    width: "15rem",
                    textAlign: "center",
                    alignSelf: "center",
                }}
            >
                <Button
                    onClick={handleDeleteItemFromCart}
                    variant='text'
                    sx={{
                        textTransform: "none",
                        p: "0 1.2rem",
                        "&.buttonText": {
                            color: "#d32f2f",
                            ":hover": {
                                color: "#fff",
                            },
                        },
                    }}
                >
                    Xóa
                </Button>
            </Box>
        </Box>
    );
};

export default React.memo(CartItem);
