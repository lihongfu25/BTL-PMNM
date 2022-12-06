import React from "react";
import axios from "axios";
import {
    useNavigate,
    useLocation,
    createSearchParams,
    useSearchParams,
} from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
    Box,
    Grid,
    FormControlLabel,
    Checkbox,
    FormGroup,
    Button,
    Typography,
    Pagination,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
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
        backgroundImage: "linear-gradient(45deg, #485563, #29323c)",
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
const Search = ({ title }) => {
    const [searchParams] = useSearchParams();
    document.title =
        title || 'Kết quả tìm kiếm "' + searchParams.get("keyword") + '"';

    const [data, setData] = React.useState([]);
    const [filterPrice, setFilterPrice] = React.useState({});
    const [filterCategory, setFilterCategory] = React.useState([]);
    const [sorting, setSorting] = React.useState("Liên Quan");
    const [page, setPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState();

    const { search } = useLocation();

    React.useEffect(() => {
        async function getData() {
            const res = await axios.post(
                `//localhost:8000/api/products/get-by-keyword`,
                {
                    keyword: searchParams.get("keyword"),
                    order_by: sorting,
                    category: filterCategory,
                    min_price: filterPrice.min,
                    max_price: filterPrice.max,
                    page: page,
                },
            );
            setData(res.data.data.data);
            setTotalPage(res.data.data.last_page);
        }
        getData();

        window.scrollTo(0, 0);
    }, [search, searchParams, page, sorting, filterCategory, filterPrice]);

    const handleChangePage = (e, value) => {
        setPage(value);
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
                                    fontSize: "1.6rem",
                                },
                                "& .filter-error": {
                                    color: "#d32f2f",
                                    fontSize: "1.3rem",
                                },
                            }}
                        >
                            <h5 className='textColor'>Khoảng giá</h5>
                            <Box
                                sx={{
                                    display: "flex",
                                    my: "1rem",
                                    "& > span": {
                                        width: "6rem",
                                        fontSize: "2rem",
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        alignSelf: "center",
                                    },
                                }}
                            >
                                <NumericFormat
                                    prefix='₫'
                                    placeholder='Từ'
                                    decimalSeparator=','
                                    thousandSeparator='.'
                                    value={filterPrice.min}
                                    customInput={StyledInput}
                                    onValueChange={(values) => {
                                        setFilterPrice((prevState) => ({
                                            ...prevState,
                                            min: values.floatValue,
                                        }));
                                    }}
                                />
                                <span className='textColor'>-</span>
                                <NumericFormat
                                    prefix='₫'
                                    placeholder='Đến'
                                    decimalSeparator=','
                                    thousandSeparator='.'
                                    value={filterPrice.max}
                                    customInput={StyledInput}
                                    onValueChange={(values) => {
                                        setFilterPrice((prevState) => ({
                                            ...prevState,
                                            max: values.floatValue,
                                        }));
                                    }}
                                />
                            </Box>
                            {filterPrice.min > filterPrice.max && (
                                <span className='filter-error'>
                                    Vui lòng điền khoảng giá phù hợp
                                </span>
                            )}
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
                        <Typography
                            className='useFont-Nunito'
                            sx={{
                                mb: "2rem",
                                fontSize: "1.6rem",
                            }}
                        >
                            Kết quả tìm kiếm cho từ khoá "
                            {searchParams.get("keyword")}"
                        </Typography>
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
                                onClick={(e) => {
                                    setSorting("Liên Quan");
                                }}
                            >
                                Liên Quan
                            </StyledButton>
                            <StyledButton
                                className={
                                    sorting === "Mới Nhất" ? "active" : ""
                                }
                                onClick={(e) => {
                                    setSorting("Mới Nhất");
                                }}
                            >
                                Mới Nhất
                            </StyledButton>
                            <StyledButton
                                className={
                                    sorting === "Bán Chạy" ? "active" : ""
                                }
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
                                            sorting === "ascending"
                                                ? "active"
                                                : ""
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
                                            sorting === "descending"
                                                ? "active"
                                                : ""
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
                            <Pagination
                                count={totalPage}
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
                </Grid>
            </Grid>
        </Box>
    );
};

export default Search;
