import React from "react";
import { useParams } from "react-router-dom";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { styled } from "@mui/material/styles";
import { Box, Grid, Button, Pagination as MuiPagination } from "@mui/material";

import slideImg from "../../assets/img/demo_slide.jpg";
import productImg from "../../assets/img/demo_porduct.jpg";
import { BsCaretDownFill } from "react-icons/bs";
import { ProductItem } from "../../components/ProductItem";

import "swiper/css";
import "swiper/css/pagination";
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
const StyledButton = styled(Button)({
    fontWeight: 500,
    color: "#495057",
    fontSize: "1.4rem",
    fontFamily: "Nunito",
    marginLeft: "1.2rem",
    textTransform: "none",
    backgroundColor: "#fff",
    padding: "0.4rem 1.2rem",
    "&.active": {
        color: "#fff",
        backgroundImage: "linear-gradient(45deg, #485563, #29323c)",
    },
});
const products = [
    {
        id: "1",
        name: "Sản phẩm 1",
        price: 115000,
        discount: 45,
        sold: 60,
        description: "abc xyz",
        rating: 4.7,
        img: productImg,
        date: "2022/11/02",
        category: "Nam",
    },
    {
        id: "2",
        name: "Sản phẩm 2",
        price: 100000,
        discount: 0,
        sold: 50,
        description: "abc xyz",
        rating: 4.5,
        img: productImg,
        date: "2022/11/21",
        category: "Nữ",
    },
    {
        id: "3",
        name: "Sản phẩm 3",
        price: 112000,
        discount: 30,
        sold: 65,
        description: "abc xyz",
        rating: 4.3,
        img: productImg,
        date: "2022/11/20",
        category: "Nam",
    },
    {
        id: "4",
        name: "Sản phẩm 4",
        price: 152000,
        discount: 0,
        sold: 110,
        description: "abc xyz",
        rating: 4.8,
        img: productImg,
        date: "2022/10/24",
        category: "Phụ Kiện",
    },
    {
        id: "5",
        name: "Sản phẩm 5",
        price: 120000,
        discount: 60,
        sold: 3,
        description: "abc xyz",
        rating: 5,
        img: productImg,
        date: "2022/10/25",
        category: "Nữ",
    },
    {
        id: "6",
        name: "Sản phẩm 6",
        price: 123000,
        discount: 0,
        sold: 12,
        description: "abc xyz",
        rating: 5,
        img: productImg,
        date: "2022/10/23",
        category: "Phụ Kiện",
    },
    {
        id: "7",
        name: "Sản phẩm 7",
        price: 123000,
        discount: 60,
        sold: 100,
        description: "abc xyz",
        rating: 5,
        img: productImg,
        date: "2022/10/21",
        category: "Nam",
    },
    {
        id: "8",
        name: "Sản phẩm 8",
        price: 132000,
        discount: 0,
        sold: 120,
        description: "abc xyz",
        rating: 5,
        img: productImg,
        date: "2022/10/22",
        category: "Nam",
    },
];
const Category = () => {
    const { slug } = useParams();
    const title =
        slug === "men"
            ? "Thời trang Nam"
            : slug === "women"
            ? "Thời trang Nữ"
            : "Phụ kiện";
    document.title = title + " - 360 Store";
    const [page, setPage] = React.useState(1);
    const [data, setData] = React.useState([]);
    const [sorting, setSorting] = React.useState("Liên Quan");

    React.useEffect(() => {
        setData(products);
    }, []);

    React.useEffect(() => {
        const slideImgs = document.querySelectorAll(".swiper-slide-img");
        Array.from(slideImgs).forEach(
            (slideImg) =>
                (slideImg.style.height = slideImg.clientWidth * 0.4 + "px"),
        );
    });
    const handleChangePage = (e, value) => {
        setPage(value);
    };
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
                    slidesPerView={1}
                    spaceBetween={30}
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
            <Box
                className='grid-wide'
                sx={{
                    my: "6rem",
                }}
            >
                <Box
                    sx={{
                        p: "1rem 3rem",
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "0.4rem",
                        backgroundColor: "rgba(0, 0, 0, 0.03)",
                        "& > p": {
                            color: "#495057",
                            fontSize: "1.6rem",
                            m: 0,
                        },
                    }}
                >
                    <p>Sắp xếp theo:</p>
                    <StyledButton
                        className={sorting === "Liên Quan" ? "active" : ""}
                        onClick={(e) => {
                            setSorting("Liên Quan");
                        }}
                    >
                        Liên Quan
                    </StyledButton>
                    <StyledButton
                        className={sorting === "Mới Nhất" ? "active" : ""}
                        onClick={(e) => {
                            setSorting("Mới Nhất");
                        }}
                    >
                        Mới Nhất
                    </StyledButton>
                    <StyledButton
                        className={sorting === "Bán Chạy" ? "active" : ""}
                        onClick={(e) => {
                            setSorting("Bán Chạy");
                        }}
                    >
                        Bán Chạy
                    </StyledButton>
                    <Box
                        className={`${
                            (sorting === "ascending" ||
                                sorting === "descending") &&
                            "active"
                        } textColor`}
                        sx={{
                            px: "1.2rem",
                            ml: "1.2rem",
                            zIndex: 11,
                            fontWeight: 500,
                            minWidth: "16rem",
                            fontSize: "1.4rem",
                            position: "relative",
                            lineHeight: "3.25rem",
                            borderRadius: "0.4rem",
                            backgroundColor: "#fff",
                            "&.active": {
                                backgroundImage:
                                    "linear-gradient(45deg,#485563, #29323c)",
                                "& .sort-value": {
                                    color: "#fff",
                                },
                                "& .icon": {
                                    color: "#fff",
                                },
                            },
                            "& .icon": {
                                position: "absolute",
                                top: "50%",
                                right: "1rem",
                                transform: "translateY(-40%)",
                            },
                            "&::before": {
                                position: "absolute",
                                left: 0,
                                bottom: "-1rem",
                                content: "''",
                                width: "100%",
                                height: "50%",
                            },
                            "&:hover .sortPrice-list": {
                                display: "block",
                            },
                        }}
                    >
                        <span className='sort-value'>
                            {sorting === "ascending"
                                ? "Giá: Thấp đến Cao"
                                : sorting === "descending"
                                ? "Giá: Cao đến Thấp"
                                : "Giá"}
                        </span>
                        <span className='icon'>
                            <BsCaretDownFill />
                        </span>
                        <Box
                            className='sortPrice-list'
                            sx={{
                                position: "absolute",
                                left: 0,
                                top: "110%",
                                py: "0.6rem",
                                width: "100%",
                                zIndex: "10 ",
                                overflow: "hidden",
                                borderRadius: "0.4rem",
                                backgroundColor: "#fff",
                                boxShadow: "0 1px 10px 1px #eaeaea",
                                "& option": {
                                    px: "1.2rem",
                                    color: "#999",
                                    cursor: "pointer",
                                    fontSize: "1.4rem",
                                    fontFamily: "Nunito",
                                    "&:hover": {
                                        backgroundColor: "#fafafa",
                                    },
                                    "&.active": {
                                        color: "#485563",
                                    },
                                },
                                display: "none",
                            }}
                        >
                            <option
                                className={
                                    sorting === "ascending" ? "active" : ""
                                }
                                value='ascending'
                                onClick={(e) => {
                                    setSorting(e.target.value);
                                }}
                            >
                                Giá: Thấp đến Cao
                            </option>
                            <option
                                className={
                                    sorting === "descending" ? "active" : ""
                                }
                                value='descending'
                                onClick={(e) => {
                                    setSorting(e.target.value);
                                }}
                            >
                                Giá: Cao đến Thấp
                            </option>
                        </Box>
                    </Box>
                </Box>
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                    sx={{
                        mt: "0rem!important",
                    }}
                >
                    {data.map((product) => (
                        <Grid xs={2} sm={3} key={product.id} item>
                            <ProductItem product={product} />
                        </Grid>
                    ))}
                </Grid>
                <Box
                    sx={{
                        mt: "2.4rem",
                        width: "100%",
                        display: "flex",
                        p: "1.2rem 3rem",
                        borderRadius: "0.4rem",
                        boxSizing: "border-box",
                        justifyContent: "center",
                        boxShadow: "0 0 1rem #eaeaea",
                    }}
                >
                    <MuiPagination
                        count={10}
                        variant='outlined'
                        shape='rounded'
                        page={page}
                        onChange={handleChangePage}
                        sx={{
                            "& .css-19xm0h7-MuiButtonBase-root-MuiPaginationItem-root":
                                {
                                    fontSize: "1.4rem",
                                },
                            "& .css-g2z002-MuiSvgIcon-root-MuiPaginationItem-icon":
                                {
                                    width: "2rem",
                                    height: "2rem",
                                },
                            "& .css-19xm0h7-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected":
                                {
                                    color: "#fff",
                                    backgroundImage:
                                        "linear-gradient(to right, #666, #283048)",
                                },
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Category;
