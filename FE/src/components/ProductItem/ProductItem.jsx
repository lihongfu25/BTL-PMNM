import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { Box, Rating } from "@mui/material";
import { Button } from "../Button";
import { currencyFormat } from "../../styles/GlobalStyles";
const ProductItem = ({ product }) => {
    React.useEffect(() => {
        const img = document.querySelector(".product-img");
        img.style.height = img.clientWidth + "px";
    });
    return (
        <Box
            sx={{
                cursor: "pointer",
                overflow: "hidden",
                backgroundColor: "#fff",
                boxShadow:
                    "0 0 0.1rem 0 rgba(0, 0, 0, 0.1), 0 0 1rem 0 rgba(0, 0, 0, 0.1)",
                "& .product-img": {
                    width: "100%",
                    transition: "all 0.3s ease-in-out",
                },
                ":hover .product-img": {
                    transform: "scale(01.1)",
                },
                ":hover .product-actions": {
                    display: "flex",
                },
            }}
        >
            <Box
                sx={{
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <img className='product-img' alt='' src={product.img} />
                <Box
                    className='product-actions'
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "none",
                        alignItems: "center",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <Button
                        sx={{
                            p: "2rem",
                            fontSize: "2.4rem",
                            backgroundColor: "rgba(0, 0, 0, 0.4)",
                            "& > svg": {
                                color: "#fff",
                            },
                        }}
                    >
                        <FaCartPlus />
                    </Button>
                </Box>
            </Box>
            <Box
                sx={{
                    p: "1.2rem",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    borderBottomLeftRadius: "0.4rem",
                    borderBottomRightRadius: "0.4rem",
                    "& .product-name": {
                        m: 0,
                        fontSize: "1.8rem",
                    },
                    "& .product-price": {
                        my: "0.4rem",
                        fontSize: "1.4rem",
                        "& .new-price": {
                            color: "#333",
                            fontWeight: 700,
                        },
                        "& .old-price": {
                            textDecoration: "line-through",
                            color: "#b2b2b2",
                            mr: "0.4rem",
                        },
                    },
                }}
            >
                <h4 className='product-name'>{product.name}</h4>
                <p className='product-price'>
                    {product.discount !== 0 && (
                        <span className='old-price'>
                            {currencyFormat(product.price)}
                        </span>
                    )}
                    <span className='new-price'>
                        {product.discount !== 0
                            ? currencyFormat(
                                  (product.price * product.discount) / 100,
                              )
                            : currencyFormat(product.price)}
                    </span>
                </p>
                <Rating
                    className='product-rating'
                    value={product.rating}
                    precision={0.1}
                    readOnly
                />
            </Box>
        </Box>
    );
};

export default ProductItem;
