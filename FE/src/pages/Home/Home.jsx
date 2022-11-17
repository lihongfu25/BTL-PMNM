import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import { Box } from "@mui/material";
import { Recommend } from "../../components/Recommend";
import productImg from "../../assets/img/demo_porduct.jpg";
import slideImg from "../../assets/img/demo_slide.jpg";
import "swiper/css";
import "swiper/css/pagination";
import "./slider.scss";
const slides = [
    {
        id: 1,
        image: slideImg,
    },
    {
        id: 2,
        image: slideImg,
    },
    {
        id: 3,
        image: slideImg,
    },
    {
        id: 4,
        image: slideImg,
    },
    {
        id: 5,
        image: slideImg,
    },
    {
        id: 6,
        image: slideImg,
    },
];
const products = [
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
const Home = () => {
    document.title = "360 Store";
    React.useEffect(() => {
        const slideImgs = document.querySelectorAll(".swiper-slide-img");
        Array.from(slideImgs).forEach(
            (slideImg) =>
                (slideImg.style.height = slideImg.clientWidth * 0.4 + "px"),
        );
    });
    return (
        <Box>
            <Box
                sx={{
                    width: "100%",
                    boxSizing: "border-box",
                    "& .slick-dots": {
                        bottom: "1.6rem",
                        "li button:before": {
                            fontSize: "1.4rem",
                        },
                    },
                }}
            >
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 10000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Autoplay, Pagination]}
                    className='mySwiper2'
                >
                    {slides.map((img) => (
                        <SwiperSlide key={img.id}>
                            <img
                                className='swiper-slide-img'
                                alt=''
                                src={img.image}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
            <Recommend title='Sản phẩm mới' products={products} />
            <Recommend title='Sản phẩm hot' products={products} />
            <Recommend title='Đang giảm giá' products={products} />
        </Box>
    );
};

export default Home;
