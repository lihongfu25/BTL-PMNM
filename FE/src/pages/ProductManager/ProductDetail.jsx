import React from "react";
import clsx from "clsx";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { useForm } from "react-hook-form";
import { useParams, Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, IconButton, Typography } from "@mui/material";
import { FaTimes } from "react-icons/fa";
import { BsPlusLg, BsArrowLeftShort } from "react-icons/bs";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import styles from "./productDetail.module.scss";
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
const ProductDetail = () => {
    const { product_id } = useParams();
    const [isEdit, setIsEdit] = React.useState(false);
    const [product, setProduct] = React.useState({});
    const [colors, setColors] = React.useState([]);
    const [images, setImages] = React.useState([]);
    const [allSize, setAllSize] = React.useState([]);
    const [sizes, setSizes] = React.useState([]);
    const [colorImg, setColorImg] = React.useState();
    const [productImg, setProductImg] = React.useState();
    const [callApi, setCallApi] = React.useState(Math.random());
    const colorRef = React.useRef();
    const imgRef = React.useRef();

    React.useEffect(() => {
        async function getData() {
            const res = await Promise.all([
                axios.get(`//localhost:8000/api/sizes`),
                axios.get(`//localhost:8000/api/products/${product_id}`),
            ]);
            setAllSize(res[0].data.data);
            setProduct(res[1].data.data);
            setSizes(res[1].data.data.size);
            setImages(
                res[1].data.data.image.map((img) => ({
                    ...img,
                    url: "http://localhost:8000/" + img.url,
                })),
            );
            setColors(
                res[1].data.data.color.map((cr) => ({
                    ...cr,
                    url: "http://localhost:8000/" + cr.url,
                })),
            );
        }
        getData();
    }, [callApi]);

    document.title = product.name;

    React.useEffect(() => {
        if (colorImg) {
            const reader = new FileReader();
            async function createColor() {
                try {
                    const formData = new FormData();
                    formData.append("url", colorImg);
                    formData.append("product_id", product.id);
                    axios.post("//localhost:8000/api/colors", formData);
                    setCallApi(Math.random());
                } catch (err) {
                    console.log(err);
                }
            }
            createColor();
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
            async function createProductImg() {
                try {
                    const formData = new FormData();
                    formData.append("url", colorImg);
                    formData.append("product_id", product.id);
                    axios.post("//localhost:8000/api/images", formData);
                    setCallApi(Math.random());
                } catch (err) {
                    console.log(err);
                }
            }
            createProductImg();
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
        async function delColor() {
            try {
                await axios.delete(`//localhost:8000/api/colors/${id}`);
            } catch (err) {
                console.log(err);
            }
        }
        delColor();
    };
    const handleToggleSize = (value) => {
        if (isEdit === true)
            setSizes((prevState) => {
                if (
                    prevState.filter((size) => size.size_id === value.id)
                        .length !== 0
                ) {
                    async function delProductColor() {
                        try {
                            await axios.post(
                                `//localhost:8000/api/product-sizes/delete`,
                                {
                                    product_id: product.id,
                                    size_id: value.id,
                                },
                            );
                        } catch (err) {
                            console.log(err);
                        }
                    }
                    delProductColor();
                    return prevState.filter(
                        (size) => size.size_id !== value.id,
                    );
                } else {
                    async function addProductColor() {
                        try {
                            await axios.post(
                                `//localhost:8000/api/product-sizes`,
                                {
                                    product_id: product.id,
                                    size_id: value.id,
                                },
                            );
                        } catch (err) {
                            console.log(err);
                        }
                    }
                    addProductColor();
                    return [
                        ...prevState,
                        { product_id: product.id, size_id: value.id },
                    ];
                }
            });
    };
    const handleDeteleProductImg = (id) => {
        setImages((prevState) => prevState.filter((image) => image.id !== id));
        async function delProductImg() {
            try {
                await axios.delete(`//localhost:8000/api/images/${id}`);
            } catch (err) {
                console.log(err);
            }
        }
        delProductImg();
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
                                    value={product.description}
                                />
                            ) : (
                                <p
                                    className={styles.text}
                                    style={{
                                        overflowY: "scroll",
                                        maxHeight: "23.4rem",
                                    }}
                                >
                                    {product.description}
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
                                {allSize.map((size, index) => (
                                    <li
                                        key={index}
                                        className={clsx(styles.sizeItem, {
                                            [styles.active]:
                                                sizes.filter(
                                                    (field) =>
                                                        field.size_id ===
                                                        size.id,
                                                ).length !== 0,
                                        })}
                                    >
                                        <button
                                            onClick={() =>
                                                handleToggleSize(size)
                                            }
                                        >
                                            {size.description}
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
                    {!isEdit && (
                        <StyledButton
                            variant='text'
                            onClick={() => handleCancel(product.id)}
                        >
                            Xóa
                        </StyledButton>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default ProductDetail;
