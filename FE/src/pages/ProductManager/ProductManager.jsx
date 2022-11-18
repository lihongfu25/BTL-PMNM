import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Link, Pagination } from "@mui/material";
import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";
import { currencyFormat } from "../../styles/GlobalStyles";
import "../../styles/DataTable/dataTable.scss";
const columns = [
    { field: "id", headerName: "Mã sản phẩm", width: 100 },
    { field: "category", headerName: "Danh mục", width: 140 },
    { field: "name", headerName: "Tên sản phẩm", width: 200 },
    { field: "price", headerName: "Đơn giá", width: 140 },
    { field: "quantity", headerName: "Số lượng", width: 140 },
    { field: "discount", headerName: "Giảm giá", width: 100 },
];

const rows = [
    {
        id: "1",
        category: "Nam",
        name: "Sản phẩm 1",
        price: 123456,
        quantity: 1234,
        discount: 0,
    },
    {
        id: "2",
        category: "Nam",
        name: "Sản phẩm 2",
        price: 123456,
        quantity: 1234,
        discount: 10,
    },
    {
        id: "3",
        category: "Nam",
        name: "Sản phẩm 3",
        price: 123456,
        quantity: 1234,
        discount: 5,
    },
    {
        id: "4",
        category: "Nữ",
        name: "Sản phẩm 4",
        price: 123456,
        quantity: 1234,
        discount: 0,
    },
    {
        id: "5",
        category: "Nữ",
        name: "Sản phẩm 5",
        price: 123456,
        quantity: 1234,
        discount: 5,
    },
    {
        id: "6",
        category: "Phụ Kiện",
        name: "Sản phẩm 6",
        price: 123456,
        quantity: 1234,
        discount: 60,
    },
    {
        id: "7",
        category: "Nam",
        name: "Sản phẩm 7",
        price: 123456,
        quantity: 1234,
        discount: 90,
    },
    {
        id: "8",
        category: "Nam",
        name: "Sản phẩm 8",
        price: 123456,
        quantity: 1234,
        discount: 55,
    },
    {
        id: "9",
        category: "Nữ",
        name: "Sản phẩm 9",
        price: 123456,
        quantity: 1234,
        discount: 33,
    },
    {
        id: "10",
        category: "Phụ Kiện",
        name: "Sản phẩm 10",
        price: 123456,
        quantity: 1234,
        discount: 15,
    },
    {
        id: "11",
        category: "Nữ",
        name: "Sản phẩm 11",
        price: 123456,
        quantity: 1234,
        discount: 40,
    },
];
const ProductManager = () => {
    document.title = "Sản phẩm | 360 Store";
    const [page, setPage] = React.useState(1);
    const [search, setSearch] = React.useState("");
    const [data, setData] = React.useState([]);
    const [dataRemaining, setDataRemaining] = React.useState([]);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    React.useEffect(() => {
        setData(rows);
    }, []);
    React.useEffect(() => {
        setDataRemaining(
            data.filter(
                (row) =>
                    row.id.toLowerCase().includes(search.toLowerCase()) ||
                    row.category.toLowerCase().includes(search.toLowerCase()) ||
                    row.name.toLowerCase().includes(search.toLowerCase()),
            ),
        );
    }, [data, search]);
    const handleChangePage = (e, value) => {
        setPage(value);
    };
    const handleGoToDetail = (id) => {
        navigate(`${pathname}/${id}`);
    };
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                ".heading": {
                    color: "#495057",
                    fontSize: "2.8rem",
                },
            }}
        >
            <Typography className='heading useFont-Nunito'>Sản phẩm</Typography>
            <Box
                sx={{
                    p: "2rem",
                    mt: "2rem",
                    flexGrow: 1,
                    display: "flex",
                    borderRadius: "0.4rem",
                    backgroundColor: "#fff",
                    flexDirection: "column",
                    border: "1px solid #eaeaea",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Button
                        sx={{
                            minWidth: "16rem",
                            textTransform: "none",
                            p: "0.4rem 1.2rem",
                        }}
                    >
                        Thêm mới
                    </Button>
                    <TextField
                        label='Tìm kiếm'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{
                            minWidth: "28rem",
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        mt: "2rem",
                        flexGrow: 1,
                        width: "100%",
                    }}
                >
                    <table className='table'>
                        <thead className='table-head'>
                            <tr>
                                {columns.map((column) => (
                                    <th
                                        key={column.field}
                                        style={{
                                            width: column.width || "100%",
                                        }}
                                    >
                                        {column.headerName}
                                    </th>
                                ))}
                                <th
                                    style={{
                                        width: "10%",
                                    }}
                                ></th>
                            </tr>
                        </thead>
                        <tbody className='table-body'>
                            {dataRemaining.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={
                                            Object.keys(columns).length + 1
                                        }
                                        align='center'
                                    >
                                        Chưa có bản ghi nào
                                    </td>
                                </tr>
                            ) : (
                                dataRemaining
                                    .filter(
                                        (row, i) =>
                                            i >= 10 * (page - 1) &&
                                            i <= 10 * page - 1,
                                    )
                                    .map((row, index) => (
                                        <tr
                                            key={index}
                                            className={
                                                index % 2 === 0 ? "even" : "odd"
                                            }
                                        >
                                            <td>{row.id}</td>
                                            <td>{row.category}</td>
                                            <td>{row.name}</td>
                                            <td>{currencyFormat(row.price)}</td>
                                            <td>{row.quantity}</td>
                                            <td>{row.discount}</td>
                                            <td
                                                className='go-to-detail'
                                                align='center'
                                            >
                                                <Link
                                                    underline='hover'
                                                    sx={{
                                                        mr: "1rem",
                                                    }}
                                                    onClick={() =>
                                                        handleGoToDetail(row.id)
                                                    }
                                                >
                                                    Xem
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={Object.keys(columns).length + 1}>
                                    <Pagination
                                        count={
                                            Math.floor(
                                                dataRemaining.length / 10,
                                            ) + 1
                                        }
                                        variant='outlined'
                                        shape='rounded'
                                        page={page}
                                        onChange={handleChangePage}
                                    />
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </Box>
            </Box>
        </Box>
    );
};

export default ProductManager;
