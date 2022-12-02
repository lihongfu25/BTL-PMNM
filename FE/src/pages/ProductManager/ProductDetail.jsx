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

import { Button } from "../../components/Button";
import styles from "./productDetail.module.scss";
const StyledButton = styled(Button)({
    textTransform: "none",
    minWidth: "12rem",
    marginRight: "2rem",
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

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

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

    const onSubmit = (data) => {
        console.log(data);
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
                    mb: "1rem",
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
                    <Box
                        component='form'
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{
                            "& .form-group": {
                                display: "flex",
                                p: "0 2.4rem 0 1.2rem",
                                "& .form-label": {
                                    mr: "3rem",
                                    textAlign: "end",
                                    color: "#495057",
                                    minWidth: "12rem",
                                    fontSize: "1.6rem",
                                    lineHeight: "3.2rem",
                                },
                                "& .form-input": {
                                    resize: "none",
                                    outline: "none",
                                    color: "#495057",
                                    p: "0.6rem 1rem",
                                    fontSize: "1.6rem",
                                    fontFamily: "Nunito",
                                    borderRadius: "0.3rem",
                                    border: "1px solid #ccc",
                                },
                                "&.error .form-input": {
                                    borderColor: "#d32f2f",
                                    borderWidth: "2px",
                                    "::placeholder": {
                                        color: "#d32f2f",
                                        opacity: 1,
                                    },
                                },
                                "& .form-message": {
                                    mt: "0.2rem",
                                    ml: "1rem",
                                    color: "#d32f2f",
                                    fontSize: "1.4rem",
                                },
                            },
                        }}
                    >
                        <div className={styles.group}>
                            <label className={styles.label}>Tên sản phẩm</label>
                            {isEdit === true ? (
                                <div
                                    className={`form-group ${
                                        errors.name ? "error" : ""
                                    }`}
                                >
                                    <div
                                        style={{
                                            flexGrow: 1,
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <input
                                            className='form-input'
                                            placeholder='Tên sản phẩm'
                                            defaultValue={product.name}
                                            {...register("name", {
                                                required: true,
                                            })}
                                        />
                                        {errors?.name?.type === "required" && (
                                            <span className='form-message'>
                                                Vui lòng nhập vào tên sản phẩm
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <p className={styles.text}>{product.name}</p>
                            )}
                        </div>
                        <div className={styles.group}>
                            <label className={styles.label}>Danh mục</label>
                            {isEdit === true ? (
                                <div
                                    className={`form-group ${
                                        errors.category_id ? "error" : ""
                                    }`}
                                >
                                    <div
                                        style={{
                                            flexGrow: 1,
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <input
                                            className='form-input'
                                            placeholder='Tên sản phẩm'
                                            defaultValue={product.category_id}
                                            {...register("category_id", {
                                                required: true,
                                            })}
                                        />
                                        {errors?.category_id?.type ===
                                            "required" && (
                                            <span className='form-message'>
                                                Vui lòng nhập vào tên sản phẩm
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <p className={styles.text}>
                                    {product.category.name}
                                </p>
                            )}
                        </div>
                        <div className={styles.group}>
                            <label className={styles.label}>Đơn giá</label>
                            {isEdit === true ? (
                                <div
                                    className={`form-group ${
                                        errors.price ? "error" : ""
                                    }`}
                                >
                                    <div
                                        style={{
                                            flexGrow: 1,
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <input
                                            className='form-input'
                                            placeholder='Đơn giá'
                                            defaultValue={product.price}
                                            {...register("price", {
                                                required: true,
                                                pattern: /^\d+$/u,
                                            })}
                                        />
                                        {errors?.price?.type === "required" && (
                                            <span className='form-message'>
                                                Vui lòng nhập vào đơn giá của
                                                sản phẩm
                                            </span>
                                        )}
                                        {errors?.price?.type === "pattern" && (
                                            <span className='form-message'>
                                                Đơn giá của sản phẩm chỉ chứa số
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <p className={styles.text}>{product.price}</p>
                            )}
                        </div>
                        <div className={styles.group}>
                            <label className={styles.label}>Số lượng</label>
                            {isEdit === true ? (
                                <div
                                    className={`form-group ${
                                        errors.quantity ? "error" : ""
                                    }`}
                                >
                                    <div
                                        style={{
                                            flexGrow: 1,
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <input
                                            className='form-input'
                                            placeholder='Số lượng'
                                            defaultValue={product.quantity}
                                            {...register("quantity", {
                                                required: true,
                                                pattern: /^\d+$/u,
                                            })}
                                        />
                                        {errors?.quantity?.type ===
                                            "required" && (
                                            <span className='form-message'>
                                                Vui lòng nhập vào số lượng sản
                                                phẩm đang có
                                            </span>
                                        )}
                                        {errors?.quantity?.type ===
                                            "pattern" && (
                                            <span className='form-message'>
                                                Số lượng hàng chỉ chứa số
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <p className={styles.text}>
                                    {product.quantity}
                                </p>
                            )}
                        </div>
                        <div className={styles.group}>
                            <label className={styles.label}>Giảm giá</label>
                            {isEdit === true ? (
                                <div
                                    className={`form-group ${
                                        errors.discount ? "error" : ""
                                    }`}
                                >
                                    <div
                                        style={{
                                            flexGrow: 1,
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <input
                                            className='form-input'
                                            placeholder='Giảm giá'
                                            defaultValue={product.discount}
                                            {...register("discount", {
                                                pattern: /^[0-9.]+$/,
                                                min: 0,
                                                max: 100,
                                            })}
                                        />
                                        {errors?.discount?.type === "min" && (
                                            <span className='form-message'>
                                                Không có khuyến mãi vui lòng bỏ
                                                qua
                                            </span>
                                        )}
                                        {errors?.discount?.type === "max" && (
                                            <span className='form-message'>
                                                Mức ưu đãi lớn nhất có thể là
                                                100%
                                            </span>
                                        )}
                                        {errors?.discount?.type ===
                                            "pattern" && (
                                            <span className='form-message'>
                                                Nhập vào số phần trăm giảm giá
                                                là một số thực dương
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <p className={styles.text}>
                                    {product.discount}
                                </p>
                            )}
                        </div>
                        <div className={styles.group}>
                            <label className={styles.label}>Mô tả</label>
                            {isEdit === true ? (
                                <div
                                    className={`form-group ${
                                        errors.description ? "error" : ""
                                    }`}
                                >
                                    <div
                                        style={{
                                            flexGrow: 1,
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <textarea
                                            className='form-input'
                                            placeholder='Mô tả'
                                            rows='2'
                                            defaultValue={product.description}
                                            {...register("description", {
                                                required: true,
                                            })}
                                        />

                                        {errors?.description?.type ===
                                            "required" && (
                                            <span className='form-message'>
                                                Vui lòng nhập vào mô tả sản phẩm
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <p
                                    className={styles.text}
                                    style={{
                                        overflowY: "scroll",
                                        height: "4rem",
                                    }}
                                >
                                    {product.description}
                                </p>
                            )}
                        </div>
                        <Box
                            sx={{
                                mt: "4rem",
                            }}
                        >
                            <StyledButton type='submit' onClick={handleUpdate}>
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
            </Box>
        </Box>
    );
};

export default ProductDetail;
