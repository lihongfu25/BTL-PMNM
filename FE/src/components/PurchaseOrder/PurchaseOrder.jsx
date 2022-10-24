import React from "react";
import { Box, Typography } from "@mui/material";
import { PurchaseItem } from "../PurchaseItem";
const PurchaseOrder = ({ value }) => {
    return (
        <Box
            key={value.id}
            sx={{
                mt: "1.6rem",
                width: "100%",
                overflow: "hidden",
                borderRadius: "0.8rem",
                boxShadow: "0 0 2rem #e5e5e5",
            }}
        >
            {value.products.map((product) => (
                <PurchaseItem value={product} key={product.id} />
            ))}
            <Typography
                sx={{
                    width: "100%",
                    p: "1rem 2.8rem",
                    color: "#495057",
                    fontSize: "1.6rem",
                    fontFamily: "Nunito",
                    boxSizing: "border-box",
                    borderRadius: "0.4rem",
                    textAlign: "right",
                    "& span": {
                        fontWeight: 700,
                    },
                }}
            >
                Tổng số tiền:{" "}
                <span>
                    ₫
                    {value.products.reduce(
                        (total, product) => total + product.price,
                        0,
                    )}
                </span>
            </Typography>
        </Box>
    );
};

export default React.memo(PurchaseOrder);
