import React from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
    Box,
    Button as MuiButton,
    Grid,
    Rating,
    Skeleton,
    Typography,
} from "@mui/material";
import { BsDash, BsPlus, BsCheck2 } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";
import { PickColor } from "./PickColor";
import { PickSize } from "./PickSize";
import { Button } from "../../components/Button";
import { ProductItem } from "../../components/ProductItem";
import { RatingItem } from "./RatingItem";
import { currencyFormat } from "../../styles/GlobalStyles";
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
const ProductDetail = () => {
    let { productId } = useParams();
    const [thumbsSwiper, setThumbsSwiper] = React.useState(null);
    const [product, setProduct] = React.useState();
    const [relateds, setRelateds] = React.useState();
    const [avgRating, setAvgRating] = React.useState(0);
    const [colorSelected, setColorSelected] = React.useState({});
    const [sizeSelected, setSizeSelected] = React.useState({});
    const [quantity, setQuantity] = React.useState(1);

    React.useEffect(() => {
        async function getProduct() {
            try {
                const res = await Promise.all([
                    axios.get(`//localhost:8000/api/products/get-limit/rating`),
                    axios.get(`//localhost:8000/api/products/${productId}`),
                ]);
                setRelateds(res[0].data.data);
                setProduct(res[1].data.data);
            } catch (err) {
                console.log(err);
            }
        }
        getProduct();
    }, [productId]);

    document.title = product?.name;

    React.useEffect(() => {
        setAvgRating((prevState) => {
            return product?.rating && product?.rating.length !== 0
                ? product.rating.reduce(
                      (total, rating) => total + rating.star,
                      0,
                  ) / product.rating.length
                : prevState;
        });
    }, [product]);

    const handleChooseColor = (color) => {
        setColorSelected(color);
    };
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
                    {product ? (
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
                            {product.image.map((img) => (
                                <SwiperSlide key={img.id}>
                                    <img
                                        alt=''
                                        src={"http://localhost:8000/" + img.url}
                                        style={{
                                            width: "100%",
                                        }}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <Skeleton
                            variant='rectangular'
                            sx={{
                                width: "100%",
                                height: "50rem",
                            }}
                        />
                    )}
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
                        {product
                            ? product.image.map((img) => (
                                  <SwiperSlide key={img.id}>
                                      <img
                                          alt=''
                                          src={
                                              "http://localhost:8000/" + img.url
                                          }
                                      />
                                  </SwiperSlide>
                              ))
                            : Array.from([1, 2, 3, 4, 5, 6]).map((i) => (
                                  <SwiperSlide key={i}>
                                      <Skeleton
                                          variant='rectangular'
                                          sx={{
                                              width: "100%",
                                              height: "13rem",
                                          }}
                                      />
                                  </SwiperSlide>
                              ))}
                    </Swiper>
                </Grid>
                <Grid item xs={2} sm={6}>
                    <Box className='product-Name useFont-Nunito'>
                        {product ? (
                            product.name
                        ) : (
                            <Skeleton
                                variant='rounded'
                                sx={{
                                    height: "4rem",
                                }}
                            />
                        )}
                    </Box>
                    <Box className='product-avgRating useFont-Nunito'>
                        {product ? (
                            <>
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
                            </>
                        ) : (
                            <Skeleton
                                variant='rounded'
                                sx={{
                                    height: "2rem",
                                    width: "40%",
                                }}
                            />
                        )}
                    </Box>
                    <Box className='product-Price useFont-Nunito'>
                        {product ? (
                            <>
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
                            </>
                        ) : (
                            <Skeleton
                                variant='rounded'
                                sx={{
                                    height: "4rem",
                                    width: "50%",
                                }}
                            />
                        )}
                    </Box>
                    {product ? (
                        <PickColor
                            colors={product.color}
                            value={colorSelected}
                            setValue={handleChooseColor}
                        />
                    ) : (
                        <Skeleton
                            variant='rounded'
                            sx={{
                                height: "2.4rem",
                            }}
                        />
                    )}
                    {product && product.size.length !== 0 && (
                        <PickSize
                            sizes={product.size}
                            value={sizeSelected}
                            setValue={handleChooseSize}
                        />
                    )}
                    {product ? (
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
                                        setQuantity(
                                            (prevState) => prevState - 1,
                                        )
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
                                    onClick={() =>
                                        setQuantity(
                                            (prevState) => prevState + 1,
                                        )
                                    }
                                >
                                    <BsPlus />
                                </StyledButton>
                            </Box>
                        </Box>
                    ) : (
                        <Skeleton variant='rounded' />
                    )}
                    {product ? (
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
                    ) : (
                        <>
                            <Skeleton
                                variant='text'
                                sx={{
                                    fontSize: "2rem",
                                }}
                            />
                            <Skeleton
                                variant='text'
                                sx={{
                                    fontSize: "2rem",
                                }}
                            />
                        </>
                    )}
                    <Box
                        sx={{
                            mt: "5rem",
                            display: "flex",
                        }}
                    >
                        {product ? (
                            <>
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
                            </>
                        ) : (
                            <>
                                <Skeleton variant='rounded' />
                            </>
                        )}
                    </Box>
                </Grid>
            </Grid>
            <div className='product-Desc'>
                {product ? (
                    <>
                        <h3 className='title'>Mô tả sản phẩm</h3>
                        <p className='detail'>{product.description}</p>
                    </>
                ) : (
                    <>
                        <Skeleton
                            variant='text'
                            sx={{
                                fontSize: "3rem",
                                width: "30%",
                            }}
                        />
                        <Skeleton
                            variant='rounded'
                            sx={{
                                height: "16rem",
                            }}
                        />
                    </>
                )}
            </div>
            <div className='product-Ratings'>
                {product ? (
                    <>
                        <h3 className='title'>Đánh giá sản phẩm</h3>
                        <div>
                            {product.rating.length === 0 ? (
                                <Typography
                                    className='useFont-Nunito textColor'
                                    sx={{
                                        fontSize: "1.6rem",
                                    }}
                                >
                                    Chưa có đánh giá nào
                                </Typography>
                            ) : (
                                product.rating.map((rating) => (
                                    <RatingItem key={rating.id} data={rating} />
                                ))
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <Skeleton variant='text' />
                        <Skeleton variant='rounded' />
                    </>
                )}
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
                        {relateds ? (
                            relateds.map((product) => (
                                <SwiperSlide key={product.id}>
                                    <ProductItem product={product} />
                                </SwiperSlide>
                            ))
                        ) : (
                            <Skeleton variant='rounded' />
                        )}
                    </Swiper>
                </Box>
            </div>
        </Box>
    );
};

export default ProductDetail;
