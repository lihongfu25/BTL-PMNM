import React from "react";
import { Box } from "@mui/material";
import "./pickColor.scss";
const PickColor = ({ colors, value, setValue }) => {
    return (
        <Box className='product-Color useFont-Nunito'>
            <span>Màu:</span>
            <Box>
                {colors.map((color) => (
                    <span
                        key={color.colorId}
                        className={`color-item ${
                            color.colorId === value.colorId ? "selected" : ""
                        }`}
                        onClick={() => setValue(color)}
                        style={{
                            backgroundImage: `url(${color.url})`,
                        }}
                    ></span>
                ))}
            </Box>
        </Box>
    );
};

export default React.memo(PickColor);
