import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Link, Pagination } from "@mui/material";
import { TextField } from "../../components/TextField";
import { Select } from "../../components/Select";
import "../../styles/DataTable/dataTable.scss";

const columns = [
    { field: "id", headerName: "Mã đơn hàng", width: 120 },
    { field: "memberName", headerName: "Khách hàng", width: 200 },
    { field: "memberAddress", headerName: "Địa chỉ", width: 200 },
    { field: "date", headerName: "Ngày lập", width: 160 },
];
const rows = [
    {
        id: "1",
        memberName: "Nguyễn Văn A",
        memberAddress: "Hà Nội",
        date: "2022-10-20",
        status: "wait",
    },
    {
        id: "2",
        memberName: "Trần Văn B",
        memberAddress: "Hà Nội",
        date: "2022-10-21",
        status: "wait",
    },
    {
        id: "3",
        memberName: "Phạm Văn C",
        memberAddress: "Hà Nội",
        date: "2022-10-22",
        status: "prepare",
    },
    {
        id: "4",
        memberName: "Lê Văn D",
        memberAddress: "Hà Nội",
        date: "2022-10-29",
        status: "delivering",
    },
    {
        id: "5",
        memberName: "Vũ Văn E",
        memberAddress: "Hà Nội",
        date: "2022-11-20",
        status: "wait",
    },
    {
        id: "6",
        memberName: "Đoàn Văn F",
        memberAddress: "Hà Nội",
        date: "2022-10-22",
        status: "delivering",
    },
    {
        id: "7",
        memberName: "Nguyễn Thị G",
        memberAddress: "Hà Nội",
        date: "2022-09-20",
        status: "delivered",
    },
    {
        id: "8",
        memberName: "Trần Thị H",
        memberAddress: "Hà Nội",
        date: "2022-10-10",
        status: "delivered",
    },
    {
        id: "9",
        memberName: "Phạm Thị I",
        memberAddress: "Hà Nội",
        date: "2022-10-02",
        status: "request cancel",
    },
];
const statuses = [
    {
        id: "wait",
        name: "Chờ xác nhận",
    },
    {
        id: "prepare",
        name: "Chờ lấy hàng",
    },
    {
        id: "delivering",
        name: "Đang giao",
    },
    {
        id: "deliverd",
        name: "Đã giao",
    },
    {
        id: "request cancel",
        name: "Yêu cầu hủy",
    },
];

const OrderManager = () => {
    document.title = "Đơn hàng | 360 Store";
    const [page, setPage] = React.useState(1);
    const [search, setSearch] = React.useState("");
    const [filterStatus, setFilterStatus] = React.useState("wait");
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
                    row.status === filterStatus &&
                    (row.id.toLowerCase().includes(search.toLowerCase()) ||
                        row.memberName
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        row.memberAddress
                            .toLowerCase()
                            .includes(search.toLowerCase())),
            ),
        );
    }, [data, search, filterStatus]);
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
            <Typography className='heading useFont-Nunito'>Đơn hàng</Typography>
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
                    <Select
                        label='Trạng thái'
                        options={statuses}
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        disabledEmValue={true}
                        sx={{
                            width: "28rem",
                        }}
                    />
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
                                            <td>{row.memberName}</td>
                                            <td>{row.memberAddress}</td>
                                            <td>{row.date}</td>
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

export default OrderManager;
