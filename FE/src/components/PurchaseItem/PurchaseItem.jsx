import React from "react";
import { Box, Divider } from "@mui/material";
const PurchaseItem = ({ value }) => {
    return (
        <>
            <Box
                sx={{
                    pl: "2rem",
                    py: "1rem",
                    mb: "0.1rem",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "0.6rem",
                    boxSizing: "border-box",
                    "& > img": {
                        width: "7rem",
                        height: "7rem",
                        objectFit: "cover",
                    },
                    "& > p": {
                        color: "#495057",
                        minWidth: "20rem",
                        fontSize: "1.6rem",
                        fontFamily: "Nunito",
                        textAlign: "center",
                    },
                }}
            >
                <img alt='' src={value.img} />
                <Box
                    sx={{
                        ml: "1.2rem",
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        "& > h3": {
                            m: 0,
                            color: "#495057",
                            fontSize: "1.6rem",
                            fontFamily: "Nunito",
                            overflowWrap: "break-word",
                        },
                        "& > p": {
                            m: "0.4rem 0 0",
                            color: "#888",
                            fontSize: "1.2rem",
                            fontFamily: "Nunito",
                            "& span": {
                                position: "absolute",
                                display: "inline-block",
                                ml: "0.8rem",
                                width: "1.4rem",
                                height: "1.4rem",
                                border: "1px solid #ccc",
                                borderRadius: "50%",
                                backgroundColor: `${value.color}`,
                            },
                        },
                    }}
                >
                    <h3>{value.name}</h3>
                    <p>
                        Size {value.size} / Màu <span></span>
                    </p>
                    <p>x{value.quantity}</p>
                </Box>
                <p>₫ {value.price * value.quantity}</p>
            </Box>
            <Divider
                sx={{
                    borderColor: "rgba(0, 0, 0, 0.08)",
                }}
            />
        </>
    );
};

export default React.memo(PurchaseItem);
