import React from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

const HeaderFooterLayout = ({ children }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <Header />
            {children}
            <Footer />
        </Box>
    );
};

export default React.memo(HeaderFooterLayout);
