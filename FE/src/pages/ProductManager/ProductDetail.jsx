import React from "react";
import clsx from "clsx";
import { v4 as uuid } from "uuid";
import { useParams, Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, IconButton, Typography } from "@mui/material";
import { FaTimes } from "react-icons/fa";
import { BsPlusLg, BsArrowLeftShort } from "react-icons/bs";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import styles from "./productDetail.module.scss";
import productImg1 from "../../assets/img/demo_porduct.jpg";
import productImg2 from "../../assets/img/7.jpg";
const product = {
    id: 1,
    name: "Áo thun hình vớ vẩn, Áo thun hình vớ va vớ vẩn",
    price: 123000,
    colors: [
        {
            id: 1,
            url: "https://wallpapercave.com/wp/wp2552423.jpg",
        },
        {
            id: 2,
            url: "https://i.pinimg.com/originals/f9/11/d3/f911d38579709636499618b6b3d9b6f6.jpg",
        },
    ],
    sizes: [
        {
            id: 1,
            desc: "S",
        },
        {
            id: 2,
            desc: "M",
        },
        {
            id: 3,
            desc: "L",
        },
    ],
    imgs: [
        {
            id: 1,
            url: productImg1,
        },
        {
            id: 2,
            url: productImg2,
        },
        {
            id: 3,
            url: productImg1,
        },
        {
            id: 4,
            url: productImg2,
        },
        {
            id: 5,
            url: productImg1,
        },
        {
            id: 6,
            url: productImg2,
        },
        {
            id: 7,
            url: productImg1,
        },
        {
            id: 8,
            url: productImg2,
        },
    ],
    discount: 20,
    desc: "Đây là đoạn mô tả đây là đoạn mô tả đây là đoạn mô tả đây là đoạn mô tả đây là đoạn mô tả đây là đoạn mô tả đây là đoạn mô tả đây là đoạn mô tả đây là đoạn mô tả đây là đoạn mô tả",
};
const StyledButton = styled(Button)({
    textTransform: "none",
    minWidth: "12rem",
    marginRight: "2rem",
});
const StyledInput = styled(Input)({
    "& > input": {
        padding: "0.6rem 1.2rem",
    },
});
const allSizes = [
    {
        id: 1,
        desc: "S",
    },
    {
        id: 2,
        desc: "M",
    },
    {
        id: 3,
        desc: "L",
    },
    {
        id: 4,
        desc: "XL",
    },
    {
        id: 5,
        desc: "XXL",
    },
];
const ProductDetail = () => {
    const { id } = useParams();
    console.log(id);
    const [isEdit, setIsEdit] = React.useState(false);
    const [desc, setDesc] = React.useState(product.desc);
    const [colors, setColors] = React.useState(product.colors);
    const [images, setImages] = React.useState(product.imgs);
    const [sizes, setSizes] = React.useState(product.sizes);
    const [colorImg, setColorImg] = React.useState();
    const [productImg, setProductImg] = React.useState();
    const colorRef = React.useRef();
    const imgRef = React.useRef();
    React.useEffect(() => {
        if (colorImg) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setColors((prevState) => [
                    ...prevState,
                    { id: uuid(), url: reader.result },
                ]);
            };
            reader.readAsDataURL(colorImg);
        }
        if (productImg) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImages((prevState) => [
                    ...prevState,
                    { id: uuid(), url: reader.result },
                ]);
            };
            reader.readAsDataURL(productImg);
        }

        return () => {
            setColorImg(null);
            setProductImg(null);
        };
    }, [colorImg, productImg]);
    const handleUpdate = () => {
        if (!isEdit) setIsEdit(true);
        else {
            setIsEdit(false);
        }
    };
    const handleCancel = (id) => {
        if (!isEdit) console.log("Xóa: ", id);
        else {
            setIsEdit(false);
        }
    };
    const handleDeteleColor = (id) => {
        setColors((prevState) => prevState.filter((color) => color.id !== id));
    };
    const handleToggleSize = (value) => {
        if (isEdit === true)
            setSizes((prevState) => {
                if (
                    prevState.filter((size) => size.id === value.id).length !==
                    0
                )
                    return prevState.filter((size) => size.id !== value.id);
                else return [...prevState, value];
            });
    };
    const handleDeteleProductImg = (id) => {
        setImages((prevState) => prevState.filter((image) => image.id !== id));
    };

    return (
        <Box
            sx={{
                display: "flex",
                position: "relative",
                flexDirection: "column",
                ".heading": {
                    color: "#495057",
                    fontSize: "2.8rem",
                    mb: "2rem",
                },
                ".prevButton": {
                    fontSize: "4rem",
                    position: "absolute",
                    top: "-3rem",
                    right: 0,
                    color: "#333",
                },
            }}
        >
            <Link
                to='/manager/products'
                className='prevButton navLink linkNoneUnderline'
            >
                <BsArrowLeftShort />
            </Link>
            <Typography className='heading useFont-Nunito'>
                Chi tiết sản phẩm
            </Typography>
            <Box
                sx={{
                    borderRadius: "0.4rem",
                    backgroundColor: "#fff",
                    p: "2rem",
                }}
            >
                <Box className={styles.infor}>
                    <div>
                        <div className={styles.group}>
                            <label className={styles.label}>Mã sản phẩm</label>
                            <p className={styles.text}>{product.id}</p>
                        </div>
                        <div className={styles.group}>
                            <label className={styles.label}>Tên sản phẩm</label>
                            {isEdit === true ? (
                                <StyledInput value={product.name} />
                            ) : (
                                <p className={styles.text}>{product.name}</p>
                            )}
                        </div>
                        <div className={styles.group}>
                            <label className={styles.label}>Đơn giá</label>
                            {isEdit === true ? (
                                <StyledInput value={product.price} />
                            ) : (
                                <p className={styles.text}>{product.price}</p>
                            )}
                        </div>
                        <div className={styles.group}>
                            <label className={styles.label}>Giảm giá</label>
                            {isEdit === true ? (
                                <StyledInput value={product.discount} />
                            ) : (
                                <p className={styles.text}>
                                    {product.discount}
                                </p>
                            )}
                        </div>
                        <div className={styles.group}>
                            <label className={styles.label}>Mô tả</label>
                            {isEdit === true ? (
                                <textarea
                                    rows={10}
                                    className={styles.textarea}
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                />
                            ) : (
                                <p
                                    className={styles.text}
                                    style={{
                                        overflowY: "scroll",
                                        maxHeight: "23.4rem",
                                    }}
                                >
                                    {product.desc}
                                </p>
                            )}
                        </div>
                    </div>
                    <div>
                        <div className={clsx(styles.group, styles.color)}>
                            <label className={styles.label}>Màu sắc</label>
                            <ul className={styles.colorList}>
                                {colors.map((color, index) => (
                                    <li
                                        key={index}
                                        className={styles.colorItem}
                                    >
                                        <span
                                            style={{
                                                backgroundImage: `url(${color.url})`,
                                            }}
                                        ></span>
                                        {isEdit && (
                                            <IconButton
                                                className={styles.delColor}
                                                onClick={() =>
                                                    handleDeteleColor(color.id)
                                                }
                                            >
                                                <FaTimes />
                                            </IconButton>
                                        )}
                                    </li>
                                ))}
                                {isEdit && (
                                    <Box
                                        className={styles.addContainer}
                                        sx={{
                                            "& input": {
                                                display: "none",
                                            },
                                        }}
                                    >
                                        <button
                                            className={styles.addBtn}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                colorRef.current.click();
                                            }}
                                        >
                                            <BsPlusLg />
                                        </button>
                                        <input
                                            type='file'
                                            ref={colorRef}
                                            accept='image/*'
                                            onChange={(e) => {
                                                const newImg =
                                                    e.target.files[0];
                                                if (newImg) setColorImg(newImg);
                                            }}
                                        />
                                    </Box>
                                )}
                            </ul>
                        </div>
                        <div className={clsx(styles.group, styles.size)}>
                            <label className={styles.label}>Kích cỡ</label>
                            <ul className={styles.sizeList}>
                                {allSizes.map((size, index) => (
                                    <li
                                        key={index}
                                        className={clsx(styles.sizeItem, {
                                            [styles.active]:
                                                sizes.filter(
                                                    (field) =>
                                                        field.desc ===
                                                        size.desc,
                                                ).length !== 0,
                                        })}
                                    >
                                        <button
                                            onClick={() =>
                                                handleToggleSize(size)
                                            }
                                        >
                                            {size.desc}
                                        </button>
                                    </li>
                                ))}
                                {isEdit && (
                                    <Box
                                        className={styles.addContainer}
                                        sx={{
                                            "& input": {
                                                display: "none",
                                            },
                                        }}
                                    >
                                        <button
                                            className={styles.addBtn}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                colorRef.current.click();
                                            }}
                                        >
                                            <BsPlusLg />
                                        </button>
                                        <input
                                            type='file'
                                            ref={colorRef}
                                            accept='image/*'
                                            onChange={(e) => {
                                                const newImg =
                                                    e.target.files[0];
                                                if (newImg) setColorImg(newImg);
                                            }}
                                        />
                                    </Box>
                                )}
                            </ul>
                        </div>
                        <div className={clsx(styles.group, styles.image)}>
                            <label className={styles.label}>Hình ảnh</label>
                            <ul className={styles.imgList}>
                                {images.map((img, index) => (
                                    <li key={index} className={styles.imgItem}>
                                        <img alt='' src={img.url} />
                                        {isEdit && (
                                            <IconButton
                                                className={styles.delProductImg}
                                                onClick={() =>
                                                    handleDeteleProductImg(
                                                        img.id,
                                                    )
                                                }
                                            >
                                                <FaTimes />
                                            </IconButton>
                                        )}
                                    </li>
                                ))}
                                {isEdit && (
                                    <Box
                                        className={styles.addContainer}
                                        sx={{
                                            mt: "2.5rem",
                                            "& input": {
                                                display: "none",
                                            },
                                        }}
                                    >
                                        <button
                                            className={styles.addBtn}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                imgRef.current.click();
                                            }}
                                        >
                                            <BsPlusLg />
                                        </button>
                                        <input
                                            type='file'
                                            ref={imgRef}
                                            accept='image/*'
                                            onChange={(e) => {
                                                const newImg =
                                                    e.target.files[0];
                                                if (newImg)
                                                    setProductImg(newImg);
                                            }}
                                        />
                                    </Box>
                                )}
                            </ul>
                        </div>
                    </div>
                </Box>
                <Box>
                    <StyledButton onClick={handleUpdate}>
                        {isEdit === true ? "Cập nhật" : "Sửa"}
                    </StyledButton>
                    <StyledButton
                        variant='text'
                        onClick={() => handleCancel(product.id)}
                    >
                        {isEdit === true ? "Hủy" : "Xóa"}
                    </StyledButton>
                </Box>
            </Box>
        </Box>
    );
};

export default ProductDetail;
