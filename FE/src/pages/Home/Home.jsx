import React from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";
import { Recommend } from "../../components/Recommend";
import productImg from "../../assets/img/demo_porduct.jpg";
import slideImg from "../../assets/img/demo_slide.jpg";
const slides = [
    {
        id: 1,
        img: slideImg,
    },
    {
        id: 2,
        img: slideImg,
    },
    {
        id: 3,
        img: slideImg,
    },
    {
        id: 4,
        img: slideImg,
    },
    {
        id: 5,
        img: slideImg,
    },
    {
        id: 6,
        img: slideImg,
    },
];
const products = [
    {
        id: "1",
        name: "Sản phẩm 1",
        price: 123000,
        discount: 45,
        sold: "12k",
        description: "abc xyz",
        rating: 4.7,
        img: productImg,
    },
    {
        id: "2",
        name: "Sản phẩm 1",
        price: 123000,
        discount: 0,
        sold: "12k",
        description: "abc xyz",
        rating: 4.5,
        img: productImg,
    },
    {
        id: "3",
        name: "Sản phẩm 1",
        price: 123000,
        discount: 30,
        sold: "12k",
        description: "abc xyz",
        rating: 4.3,
        img: productImg,
    },
    {
        id: "4",
        name: "Sản phẩm 1",
        price: 123000,
        discount: 0,
        sold: "12k",
        description: "abc xyz",
        rating: 4.8,
        img: productImg,
    },
    {
        id: "5",
        name: "Sản phẩm 1",
        price: 123000,
        discount: 60,
        sold: "12k",
        description: "abc xyz",
        rating: 5,
        img: productImg,
    },
    {
        id: "6",
        name: "Sản phẩm 1",
        price: 123000,
        discount: 0,
        sold: "12k",
        description: "abc xyz",
        rating: 5,
        img: productImg,
    },
    {
        id: "7",
        name: "Sản phẩm 1",
        price: 123000,
        discount: 60,
        sold: "12k",
        description: "abc xyz",
        rating: 5,
        img: productImg,
    },
    {
        id: "8",
        name: "Sản phẩm 1",
        price: 123000,
        discount: 0,
        sold: "12k",
        description: "abc xyz",
        rating: 5,
        img: productImg,
    },
];
const Home = () => {
    const slideSettings = {
        dots: true,
        speed: 2000,
        arrows: false,
        autoplay: true,
        pauseOnHover: false,
        focusOnSelect: true,
        autoplaySpeed: 10000,
    };
    React.useEffect(() => {
        const slideImgs = document.querySelectorAll(".slick-slide-img");
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
                <Slider {...slideSettings}>
                    {slides.map((slide) => (
                        <img
                            className='slick-slide-img'
                            alt=''
                            src={slide.img}
                            key={slide.id}
                        />
                    ))}
                </Slider>
            </Box>
            <Recommend title='Sản phẩm mới' products={products} />
            <Recommend title='Sản phẩm hot' products={products} />
            <Recommend title='Đang giảm giá' products={products} />
        </Box>
    );
};

export default Home;
