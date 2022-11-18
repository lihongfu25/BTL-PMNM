import React from "react";
import { styled } from "@mui/material/styles";
import {
    Box,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Link,
    Pagination,
} from "@mui/material";
import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";
import { Select } from "../../components/Select";
import "../../styles/DataTable/dataTable.scss";

const columns = [
    { field: "id", headerName: "Mã thành viên", width: 100 },
    { field: "name", headerName: "Họ tên", width: 200 },
    { field: "email", headerName: "Email", width: 160 },
    { field: "phone", headerName: "Số điện thoại", width: 160 },
    { field: "address", headerName: "Địa chỉ", width: 260 },
];
const rows = [
    {
        id: "1",
        name: "Nguyễn Văn 1",
        email: "nguyenvan1@gmail.com",
        phone: "0123456789",
        address: "Hà Nội",
        username: "nguyenvan1",
        password: "@Ten1234",
        role: "Khách Hàng",
    },
    {
        id: "2",
        name: "Nguyễn Văn 2",
        email: "nguyenvan2@gmail.com",
        phone: "0123456789",
        address: "Hà Nội",
        username: "nguyenvan2",
        password: "@Ten1234",
        role: "Quản Trị Viên",
    },
    {
        id: "3",
        name: "Nguyễn Văn 3",
        email: "nguyenvan3@gmail.com",
        phone: "0123456789",
        address: "Hà Nội",
        username: "nguyenvan3",
        password: "@Ten1234",
        role: "Khách Hàng",
    },
    {
        id: "4",
        name: "Nguyễn Văn 4",
        email: "nguyenvan4@gmail.com",
        phone: "0123456789",
        address: "Hà Nội",
        username: "nguyenvan4",
        password: "@Ten1234",
        role: "Khách Hàng",
    },
    {
        id: "5",
        name: "Nguyễn Văn 5",
        email: "nguyenvan5@gmail.com",
        phone: "0123456789",
        address: "Hà Nội",
        username: "nguyenvan5",
        password: "@Ten1234",
        role: "Quản Trị Viên",
    },
    {
        id: "6",
        name: "Nguyễn Văn 6",
        email: "nguyenvan6@gmail.com",
        phone: "0123456789",
        address: "Hà Nội",
        username: "nguyenvan6",
        password: "@Ten1234",
        role: "Khách Hàng",
    },
    {
        id: "7",
        name: "Nguyễn Văn 7",
        email: "nguyenvan7@gmail.com",
        phone: "0123456789",
        address: "Hà Nội",
        username: "nguyenvan7",
        password: "@Ten1234",
        role: "Khách Hàng",
    },
    {
        id: "8",
        name: "Nguyễn Văn 8",
        email: "nguyenvan8@gmail.com",
        phone: "0123456789",
        address: "Hà Nội",
        username: "nguyenvan8",
        password: "@Ten1234",
        role: "Khách Hàng",
    },
    {
        id: "9",
        name: "Nguyễn Văn 9",
        email: "nguyenvan9@gmail.com",
        phone: "0123456789",
        address: "Hà Nội",
        username: "nguyenvan9",
        password: "@Ten1234",
        role: "Khách Hàng",
    },
    {
        id: "10",
        name: "Nguyễn Văn 10",
        email: "nguyenvan1@gmail.com",
        phone: "0123456789",
        address: "Hà Nội",
        username: "nguyenvan10",
        password: "@Ten1234",
        role: "Khách Hàng",
    },
    {
        id: "11",
        name: "Nguyễn Văn 11",
        email: "nguyenvan11@gmail.com",
        phone: "0123456789",
        address: "Hà Nội",
        username: "nguyenvan11",
        password: "@Ten1234",
        role: "Khách Hàng",
    },
];
const roles = [
    {
        name: "Khách Hàng",
    },
    {
        name: "Quản Trị Viên",
    },
];
const StyledButton = styled(Button)({
    textTransform: "none",
    padding: "0.2rem 1.2rem",
    marginLeft: "2rem!important",
});
const StyledTextField = styled(TextField)({
    width: "100%",
    margin: "0.8rem 0",
});
const MemberManager = () => {
    document.title = "Thành viên | 360 Store";
    const [page, setPage] = React.useState(1);
    const [search, setSearch] = React.useState("");
    const [data, setData] = React.useState([]);
    const [dataRemaining, setDataRemaining] = React.useState([]);
    const [openDetail, setOpenDetail] = React.useState(false);
    const [memberInfor, setMemberInfor] = React.useState({});

    React.useEffect(() => {
        setData(rows);
    }, []);
    React.useEffect(() => {
        setDataRemaining(
            data.filter(
                (row) =>
                    row.id.toLowerCase().includes(search.toLowerCase()) ||
                    row.name.toLowerCase().includes(search.toLowerCase()) ||
                    row.email.toLowerCase().includes(search.toLowerCase()),
            ),
        );
    }, [data, search]);
    const handleChangePage = (e, value) => {
        setPage(value);
    };
    const handleOpenDetail = (row) => {
        setOpenDetail(true);
        setMemberInfor(row);
    };
    const handleCloseDetail = () => {
        setOpenDetail(false);
    };
    const handleUpdateMember = () => {
        console.log(memberInfor);
        setOpenDetail(false);
    };
    const handleDeleteMember = () => {
        console.log(memberInfor.id);
        setOpenDetail(false);
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
            <Typography className='heading useFont-Nunito'>
                Thành viên
            </Typography>
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
                        justifyContent: "flex-end",
                    }}
                >
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
                                            <td>{row.name}</td>
                                            <td>{row.email}</td>
                                            <td>{row.phone}</td>
                                            <td>{row.address}</td>
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
                                                        handleOpenDetail(row)
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
            <Dialog
                className='feedback-form'
                open={openDetail}
                onClose={handleCloseDetail}
                sx={{
                    "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
                        width: "50rem",
                    },
                    "& .css-bdhsul-MuiTypography-root-MuiDialogTitle-root": {
                        fontSize: "2rem",
                    },
                    "& .css-qfso29-MuiTypography-root-MuiDialogContentText-root":
                        {
                            fontSize: "1.6rem",
                        },
                }}
            >
                <Box
                    component='form'
                    noValidate
                    // onSubmit={handleSubmit(onSubmit)}
                >
                    <DialogTitle>Thông tin thành viên</DialogTitle>
                    <DialogContent
                        sx={{
                            pt: "1rem!important",
                            flexDirection: "column",
                        }}
                    >
                        <StyledTextField
                            label='Mã thành viên'
                            value={memberInfor.id}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <StyledTextField
                            label='Họ tên'
                            value={memberInfor.name}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <StyledTextField
                            label='Email'
                            value={memberInfor.email}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <StyledTextField
                            label='Số điện thoại'
                            value={memberInfor.phone}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <StyledTextField
                            label='Địa chỉ'
                            value={memberInfor.address}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <StyledTextField
                            label='Tên đăng nhập'
                            value={memberInfor.username}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <StyledTextField
                            label='Mật khẩu'
                            value={memberInfor.password}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <Select
                            label='Quyền'
                            options={roles}
                            value={memberInfor.role}
                            onChange={(e) =>
                                setMemberInfor((prev) => ({
                                    ...prev,
                                    role: e.target.value,
                                }))
                            }
                            disabledEmValue={true}
                            sx={{
                                mt: "0.8rem",
                            }}
                        />
                    </DialogContent>
                    <DialogActions
                        sx={{
                            px: "2.4rem",
                        }}
                    >
                        <StyledButton
                            variant='text'
                            onClick={handleUpdateMember}
                        >
                            Cập nhật
                        </StyledButton>
                        <StyledButton
                            variant='text'
                            onClick={handleDeleteMember}
                        >
                            Xóa
                        </StyledButton>
                        <StyledButton
                            variant='text'
                            onClick={handleCloseDetail}
                        >
                            Đóng
                        </StyledButton>
                    </DialogActions>
                </Box>
            </Dialog>
        </Box>
    );
};

export default MemberManager;
