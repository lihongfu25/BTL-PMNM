import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { v4 as uuidv4 } from "uuid";
// import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
    Box,
    Button as MuiButton,
    Grid,
    Rating,
    Typography,
} from "@mui/material";
import { BsDash, BsPlus, BsCheck2 } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";
import { PickColor } from "./PickColor";
import { PickSize } from "./PickSize";
import { Button } from "../../components/Button";
import { ProductItem } from "../../components/ProductItem";
import { RatingItem } from "./RatingItem";
import { compactNumber, currencyFormat } from "../../styles/GlobalStyles";
import productImg from "../../assets/img/demo_porduct.jpg";
import productImg2 from "../../assets/img/7.jpg";
import avatar from "../../assets/img/user.png";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./productDetail.scss";
const StyledButton = styled(MuiButton)({
    padding: 0,
    minWidth: 0,
    border: "1px solid rgba(204,204,204, 0.5)",
    ":hover": {
        border: "1px solid #ccc",
    },
});
const StyledTypography = styled(Typography)({
    display: "flex",
    color: "#495057",
    fontSize: "1.6rem",
    alignItems: "center",
    lineHeight: "3.2rem",
    "& > svg": {
        color: "#54B435",
        fontSize: "2rem",
        marginRight: "1.2rem",
    },
    "& > span": {
        color: "#333",
        fontWeight: 700,
        margin: "0 0.6rem",
    },
});
const product = {
    id: 1,
    name: "Áo thun hình vớ vẩn, Áo thun hình vớ va vớ vẩn",
    ratings: [
        {
            ratingId: 1,
            username: "nguyenvana",
            avatar: avatar,
            star: 5,
            date: "20/10/2022 20:10",
            desc: "10 điểm",
        },
        {
            ratingId: 2,
            username: "tranvanb",
            avatar: avatar,
            star: 4,
            date: "20/10/2022 20:10",
            desc: "10 điểm",
        },
        {
            ratingId: 3,
            username: "levanc",
            avatar: avatar,
            star: 5,
            date: "20/10/2022 20:10",
            desc: "10 điểm",
        },
        {
            ratingId: 4,
            username: "phamvand",
            avatar: avatar,
            star: 5,
            date: "20/10/2022 20:10",
            desc: "10 điểm",
        },
    ],
    price: 123000,
    colors: [
        {
            colorId: 1,
            url: "https://wallpapercave.com/wp/wp2552423.jpg",
        },
        {
            colorId: 2,
            url: "https://i.pinimg.com/originals/f9/11/d3/f911d38579709636499618b6b3d9b6f6.jpg",
        },
    ],
    sizes: [
        {
            sizeId: 1,
            desc: "S",
        },
        {
            sizeId: 2,
            desc: "M",
        },
        {
            sizeId: 3,
            desc: "L",
        },
    ],
    imgs: [
        {
            imgId: 1,
            url: productImg,
        },
        {
            imgId: 2,
            url: productImg2,
        },
        {
            imgId: 3,
            url: productImg,
        },
        {
            imgId: 4,
            url: productImg2,
        },
        {
            imgId: 5,
            url: productImg,
        },
        {
            imgId: 6,
            url: productImg2,
        },
        {
            imgId: 7,
            url: productImg,
        },
        {
            imgId: 8,
            url: productImg2,
        },
    ],
    sold: 100000,
    discount: 20,
    desc: "Đây là đoạn mô tả đây là đoạn mô tả đây là đoạn mô tả đây là đoạn mô tả đây là đoạn mô tả đây là đoạn mô tả đây là đoạn mô tả đây là đoạn mô tả đây là đoạn mô tả đây là đoạn mô tả",
};
const related = [
    {
        productId: 1,
        name: "Sản phẩm 1",
        price: 123000,
        discount: 45,
        rating: 4.7,
        img: productImg,
    },
    {
        productId: 2,
        name: "Sản phẩm 1",
        price: 123000,
        discount: 0,
        rating: 4.5,
        img: productImg,
    },
    {
        productId: 3,
        name: "Sản phẩm 1",
        price: 123000,
        discount: 30,
        rating: 4.3,
        img: productImg,
    },
    {
        productId: 4,
        name: "Sản phẩm 1",
        price: 123000,
        discount: 0,
        rating: 4.8,
        img: productImg,
    },
    {
        productId: 5,
        name: "Sản phẩm 1",
        price: 123000,
        discount: 60,
        rating: 5,
        img: productImg,
    },
    {
        productId: 6,
        name: "Sản phẩm 1",
        price: 123000,
        discount: 0,
        rating: 5,
        img: productImg,
    },
    {
        productId: 7,
        name: "Sản phẩm 1",
        price: 123000,
        discount: 60,
        rating: 5,
        img: productImg,
    },
    {
        productId: 8,
        name: "Sản phẩm 1",
        price: 123000,
        discount: 0,
        rating: 5,
        img: productImg,
    },
];
const ProductDetail = () => {
    document.title = product.name;
    // let { productId } = useParams();
    const [thumbsSwiper, setThumbsSwiper] = React.useState(null);
    const [avgRating, setAvgRating] = React.useState(0);
    const [colorSelected, setColorSelected] = React.useState({});
    const [sizeSelected, setSizeSelected] = React.useState({});
    const [quantity, setQuantity] = React.useState(1);

    React.useEffect(() => {
        setAvgRating(
            product.ratings.reduce((total, rating) => total + rating.star, 0) /
                product.ratings.length,
        );
    }, []);
    const handleChooseColor = (color) => {
        setColorSelected(color);
    };
    console.log(uuidv4());
    const handleChooseSize = (size) => {
        setSizeSelected(size);
    };
    return (
        <Box
            className='grid-wide'
            sx={{
                my: "6rem",
                flexGrow: 1,
            }}
        >
            <Grid
                className='product-Info'
                container
                spacing={{ xs: 4, md: 6 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
            >
                <Grid item xs={2} sm={6}>
                    <Swiper
                        style={{
                            "--swiper-navigation-color": "#333",
                        }}
                        loop={true}
                        spaceBetween={10}
                        navigation={true}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className='mySwiper2'
                    >
                        {product.imgs.map((img) => (
                            <SwiperSlide key={img.imgId}>
                                <img
                                    alt=''
                                    src={img.url}
                                    style={{
                                        width: "100%",
                                    }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <Swiper
                        loop={true}
                        freeMode={true}
                        spaceBetween={10}
                        slidesPerView={4}
                        centeredSlides={true}
                        watchSlidesProgress={true}
                        onSwiper={setThumbsSwiper}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className='mySwiper'
                    >
                        {product.imgs.map((img) => (
                            <SwiperSlide key={img.imgId}>
                                <img alt='' src={img.url} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Grid>
                <Grid item xs={2} sm={6}>
                    <Box className='product-Name useFont-Nunito'>
                        {product.name}
                    </Box>
                    <Box className='product-avgRating useFont-Nunito'>
                        {avgRating}
                        <Rating
                            value={avgRating}
                            precision={0.1}
                            readOnly
                            sx={{
                                ml: "1rem",
                                alignSelf: "center",
                            }}
                        />
                        <span>|</span>
                        Đã bán: {compactNumber(product.sold)}
                    </Box>
                    <Box className='product-Price useFont-Nunito'>
                        {product.discount !== 0 && (
                            <span className='old-price'>
                                {currencyFormat(product.price)}
                            </span>
                        )}
                        <span className='new-price'>
                            {product.discount !== 0
                                ? currencyFormat(
                                      (product.price *
                                          (100 - product.discount)) /
                                          100,
                                  )
                                : currencyFormat(product.price)}
                        </span>
                    </Box>
                    <PickColor
                        colors={product.colors}
                        value={colorSelected}
                        setValue={handleChooseColor}
                    />
                    <PickSize
                        sizes={product.sizes}
                        value={sizeSelected}
                        setValue={handleChooseSize}
                    />
                    <Box className='product-Quantity useFont-Nunito'>
                        <span>Số lượng:</span>
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
                            <Typography
                                className='useFont-Nunito'
                                sx={{
                                    mx: "1.4rem",
                                    fontSize: "1.8rem",
                                    alignSelf: "center",
                                }}
                            >
                                {quantity}
                            </Typography>
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
                    </Box>
                    <Box className='product-Service'>
                        <StyledTypography className='useFont-Nunito'>
                            <BsCheck2 />
                            Miễn phí giao hàng Cho đơn hàng từ
                            <span>499.000đ</span>
                        </StyledTypography>
                        <StyledTypography className='useFont-Nunito'>
                            <BsCheck2 />
                            Đổi trả miễn phí trong vòng
                            <span>7 ngày</span>
                            kể từ ngày mua
                        </StyledTypography>
                    </Box>
                    <Box
                        sx={{
                            mt: "5rem",
                            display: "flex",
                        }}
                    >
                        <Button
                            sx={{
                                marginRight: "4rem",
                            }}
                        >
                            <FaCartPlus
                                style={{
                                    marginRight: "1rem",
                                    fontSize: "1.8rem",
                                }}
                            />
                            Thêm vào giỏ hàng
                        </Button>
                        <Button>Mua ngay</Button>
                    </Box>
                </Grid>
            </Grid>
            <div className='product-Desc'>
                <h3 className='title'>Mô tả sản phẩm</h3>
                <p className='detail'>{product.desc}</p>
            </div>
            <div className='product-Ratings'>
                <h3 className='title'>Đánh giá sản phẩm</h3>
                <div>
                    {product.ratings.map((rating) => (
                        <RatingItem key={rating.ratingId} data={rating} />
                    ))}
                </div>
            </div>
            <div className='product-Related'>
                <h3 className='title'>Có thể bạn cũng thích</h3>
                <Box
                    sx={{
                        m: "2rem",
                    }}
                >
                    <Swiper
                        style={{
                            "--swiper-navigation-color": "#333",
                        }}
                        slidesPerView={5}
                        spaceBetween={30}
                        navigation={true}
                        modules={[FreeMode, Navigation]}
                    >
                        {related.map((product) => (
                            <SwiperSlide key={product.productId}>
                                <ProductItem product={product} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Box>
            </div>
        </Box>
    );
};

export default ProductDetail;
