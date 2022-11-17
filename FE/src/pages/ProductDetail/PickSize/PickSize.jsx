import React from "react";
import { Box } from "@mui/material";
import "./pickSize.scss";
const PickSize = ({ sizes, value, setValue }) => {
    return (
        <Box className='product-Size useFont-Nunito'>
            <span>Kích cỡ:</span>
            <Box>
                {sizes.map((size) => (
                    <button
                        key={size.sizeId}
                        className={`size-item useFont-Nunito ${
                            size.sizeId === value.sizeId ? "selected" : ""
                        }`}
                        onClick={() => setValue(size)}
                    >
                        {size.desc}
                    </button>
                ))}
            </Box>
        </Box>
    );
};

export default React.memo(PickSize);
