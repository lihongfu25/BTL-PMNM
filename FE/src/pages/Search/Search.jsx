import React from "react";
import { styled } from "@mui/material/styles";
import {
    Box,
    Grid,
    FormControlLabel,
    Checkbox,
    FormGroup,
    Button,
} from "@mui/material";
import { BsCaretDownFill } from "react-icons/bs";
import { ProductItem } from "../../components/ProductItem";
import { Input } from "../../components/Input";
import productImg from "../../assets/img/demo_porduct.jpg";
const StyledFormControlLable = styled(FormControlLabel)({
    "& .css-ahj2mt-MuiTypography-root": {
        color: "#777",
        fontSize: "1.4rem",
        fontFamily: "Nunito",
        marginBottom: "-0.2rem",
    },
    "& .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root": {
        padding: "0.6rem",
        "& .css-i4bv87-MuiSvgIcon-root": {
            fontSize: "2rem",
        },
    },
});
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
        backgroundColor: "#ee4d2d",
    },
});
const StyledInput = styled(Input)({
    fontSize: "1.4rem",
    "& input": {
        padding: "0.4rem 0.8rem",
    },
});
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
const Search = () => {
    const [filterCategory, setFilterCategory] = React.useState([]);
    const [filterPrice, setFilterPrice] = React.useState({ min: "", max: "" });
    const [sorting, setSorting] = React.useState("Liên Quan");

    const handleChangeFilterPrice = (event) => {
        setFilterPrice();
    };
    const handleSortPrice = (e) => {
        setSorting(e.target.value);
    };
    return (
        <Box
            className='grid-wide'
            sx={{
                my: "6rem",
            }}
        >
            <Grid
                container
                spacing={{ xs: 2, md: 4 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
            >
                <Grid item xs={2}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            "& > h3": {
                                m: 0,
                                color: "#333",
                                fontWeight: 700,
                                fontSize: "1.8rem",
                            },
                        }}
                    >
                        <h3>BỘ LỌC TÌM KIẾM</h3>
                        <Box
                            sx={{
                                mt: "2rem",
                                "& > h5": {
                                    m: 0,
                                    fontWeight: 500,
                                    color: "#495057",
                                    fontSize: "1.6rem",
                                },
                            }}
                        >
                            <h5>Theo danh mục</h5>
                            <FormGroup
                                sx={{
                                    ml: "0.4rem",
                                }}
                            >
                                <StyledFormControlLable
                                    control={<Checkbox />}
                                    label='Nam'
                                    onChange={(e) =>
                                        setFilterCategory((prevState) => {
                                            if (!prevState.includes("Nam"))
                                                return [...prevState, "Nam"];
                                            else
                                                return prevState.filter(
                                                    (element) =>
                                                        element !== "Nam",
                                                );
                                        })
                                    }
                                />
                                <StyledFormControlLable
                                    control={<Checkbox />}
                                    label='Nữ'
                                    onChange={(e) =>
                                        setFilterCategory((prevState) => {
                                            if (!prevState.includes("Nữ"))
                                                return [...prevState, "Nữ"];
                                            else
                                                return prevState.filter(
                                                    (element) =>
                                                        element !== "Nữ",
                                                );
                                        })
                                    }
                                />
                                <StyledFormControlLable
                                    control={<Checkbox />}
                                    label='Phụ Kiện'
                                    onChange={(e) =>
                                        setFilterCategory((prevState) => {
                                            if (!prevState.includes("Phụ Kiện"))
                                                return [
                                                    ...prevState,
                                                    "Phụ Kiện",
                                                ];
                                            else
                                                return prevState.filter(
                                                    (element) =>
                                                        element !== "Phụ Kiện",
                                                );
                                        })
                                    }
                                />
                            </FormGroup>
                        </Box>
                        <Box
                            sx={{
                                mt: "2rem",
                                "& > h5": {
                                    m: 0,
                                    fontWeight: 500,
                                    color: "#495057",
                                    fontSize: "1.5rem",
                                },
                                "& > p": {
                                    fontSize: "1.4rem",
                                    color: "#495057",
                                },
                                "& .filter-price": {
                                    ml: "0.8rem",
                                    color: "#ee4d2d",
                                    fontSize: "1.3rem",
                                    fontWeight: 700,
                                },
                            }}
                        >
                            <h5>Khoảng giá</h5>
                            <Box
                                sx={{
                                    display: "flex",
                                    "& > span": {
                                        width: "6rem",
                                        fontSize: "2rem",
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        alignSelf: "center",
                                    },
                                }}
                            >
                                <StyledInput placeholder='Từ' />
                                <span className='textColor'>-</span>
                                <StyledInput placeholder='Đến' />
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={10}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
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
                                className={
                                    sorting === "Liên Quan" ? "active" : ""
                                }
                                onClick={(e) => setSorting("Liên Quan")}
                            >
                                Liên Quan
                            </StyledButton>
                            <StyledButton
                                className={
                                    sorting === "Mới Nhất" ? "active" : ""
                                }
                                onClick={(e) => setSorting("Mới Nhất")}
                            >
                                Mới Nhất
                            </StyledButton>
                            <StyledButton
                                className={
                                    sorting === "Bán Chạy" ? "active" : ""
                                }
                                onClick={(e) => setSorting("Bán Chạy")}
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
                                    fontWeight: 500,
                                    minWidth: "16rem",
                                    fontSize: "1.4rem",
                                    position: "relative",
                                    lineHeight: "3.25rem",
                                    borderRadius: "0.4rem",
                                    backgroundColor: "#fff",
                                    "&.active .sort-value": {
                                        color: "#ee4d2d",
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
                                        overflow: "hidden",
                                        borderRadius: "0.4rem",
                                        backgroundColor: "#fff",
                                        boxShadow: "0 1px 10px 1px #eaeaea",
                                        "& option": {
                                            px: "1.2rem",
                                            cursor: "pointer",
                                            fontSize: "1.4rem",
                                            fontFamily: "Nunito",
                                            "&:hover": {
                                                backgroundColor: "#f5f5f5",
                                            },
                                            "&.active": {
                                                color: "#ee4d2d",
                                            },
                                        },
                                        display: "none",
                                    }}
                                >
                                    <option
                                        className={
                                            sorting === "ascending"
                                                ? "active"
                                                : ""
                                        }
                                        value='ascending'
                                        onClick={handleSortPrice}
                                    >
                                        Giá: Thấp đến Cao
                                    </option>
                                    <option
                                        className={
                                            sorting === "descending"
                                                ? "active"
                                                : ""
                                        }
                                        value='descending'
                                        onClick={handleSortPrice}
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
                            {products.map((product) => (
                                <Grid xs={2} sm={3} key={product.id} item>
                                    <ProductItem product={product} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Search;
