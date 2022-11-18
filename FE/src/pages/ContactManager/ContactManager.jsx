import React from "react";
import { useForm } from "react-hook-form";
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
import "../../styles/DataTable/dataTable.scss";

const columns = [
    { field: "id", headerName: "Mã liên hệ", width: 100 },
    { field: "name", headerName: "Danh xưng", width: 160 },
    { field: "email", headerName: "Email", width: 160 },
    { field: "phone", headerName: "Số điện thoại", width: 160 },
    { field: "content", headerName: "Nội dung", width: 280 },
];
const rows = [
    {
        id: "1",
        name: "Nguyễn Văn 1",
        email: "nguyenvan1@gmail.com",
        phone: "0123456789",
        content: "Tôi cần hỗ trợ",
        isFeedback: false,
    },
    {
        id: "2",
        name: "Nguyễn Văn 2",
        email: "nguyenvan2@gmail.com",
        phone: "0123456789",
        content: "Tôi cần hỗ trợ",
        isFeedback: true,
    },
    {
        id: "3",
        name: "Nguyễn Văn 3",
        email: "nguyenvan3@gmail.com",
        phone: "0123456789",
        content: "Tôi cần hỗ trợ",
        isFeedback: false,
    },
    {
        id: "4",
        name: "Nguyễn Văn 4",
        email: "nguyenvan4@gmail.com",
        phone: "0123456789",
        content: "Tôi cần hỗ trợ",
        isFeedback: false,
    },
    {
        id: "5",
        name: "Nguyễn Văn 5",
        email: "nguyenvan5@gmail.com",
        phone: "0123456789",
        content: "Tôi cần hỗ trợ",
        isFeedback: true,
    },
    {
        id: "6",
        name: "Nguyễn Văn 6",
        email: "nguyenvan6@gmail.com",
        phone: "0123456789",
        content: "Tôi cần hỗ trợ",
        isFeedback: false,
    },
    {
        id: "7",
        name: "Nguyễn Văn 7",
        email: "nguyenvan7@gmail.com",
        phone: "0123456789",
        content: "Tôi cần hỗ trợ",
        isFeedback: true,
    },
    {
        id: "8",
        name: "Nguyễn Văn 8",
        email: "nguyenvan8@gmail.com",
        phone: "0123456789",
        content: "Tôi cần hỗ trợ",
        isFeedback: true,
    },
    {
        id: "9",
        name: "Nguyễn Văn 9",
        email: "nguyenvan9@gmail.com",
        phone: "0123456789",
        content: "Tôi cần hỗ trợ",
        isFeedback: false,
    },
    {
        id: "10",
        name: "Nguyễn Văn 8",
        email: "nguyenvan8@gmail.com",
        phone: "0123456789",
        content: "Tôi cần hỗ trợ",
        isFeedback: true,
    },
    {
        id: "11",
        name: "Nguyễn Văn 9",
        email: "nguyenvan9@gmail.com",
        phone: "0123456789",
        content: "Tôi cần hỗ trợ",
        isFeedback: false,
    },
];
const StyledButton = styled(Button)({
    textTransform: "none",
    padding: "0.2rem 1.2rem",
});
const StyledDialog = styled(Dialog)({
    "& .css-bdhsul-MuiTypography-root-MuiDialogTitle-root": {
        fontSize: "2rem",
    },
    "& .css-qfso29-MuiTypography-root-MuiDialogContentText-root": {
        fontSize: "1.6rem",
    },
});
const CarouselManager = () => {
    document.title = "Liên hệ | 360 Store";
    const [page, setPage] = React.useState(1);
    const [search, setSearch] = React.useState("");
    const [data, setData] = React.useState([]);
    const [dataRemaining, setDataRemaining] = React.useState([]);
    const [openFeedbackForm, setOpenFeedbackForm] = React.useState(false);
    const [feedbackId, setFeedbackId] = React.useState();
    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
    } = useForm();
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
    const handleOpenFeedbackForm = (row) => {
        setOpenFeedbackForm(true);
        setFeedbackId(row.id);
    };
    const handleCloseFeedbackForm = () => {
        setOpenFeedbackForm(false);
        clearErrors();
    };
    const onSubmit = (data) => {
        console.log({ id: feedbackId, ...data });
        setOpenFeedbackForm(false);
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
            <Typography className='heading useFont-Nunito'>Liên hệ</Typography>
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
                                            <td>{row.content}</td>
                                            <td
                                                className='go-to-detail'
                                                align='center'
                                            >
                                                {!row.isFeedback && (
                                                    <Link
                                                        underline='hover'
                                                        sx={{
                                                            mr: "1rem",
                                                        }}
                                                        onClick={() =>
                                                            handleOpenFeedbackForm(
                                                                row,
                                                            )
                                                        }
                                                    >
                                                        Phản hồi
                                                    </Link>
                                                )}
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
            <StyledDialog
                className='feedback-form'
                open={openFeedbackForm}
                onClose={handleCloseFeedbackForm}
                sx={{
                    "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
                        width: "50rem",
                    },
                }}
            >
                <Box
                    component='form'
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <DialogTitle>Phản hồi</DialogTitle>
                    <DialogContent
                        sx={{
                            pt: "2rem!important",
                            flexDirection: "column",
                        }}
                    >
                        <Box
                            sx={{
                                width: "100%",
                                "& label": {
                                    mb: "0.8rem",
                                    display: "block",
                                    fontSize: "1.6rem",
                                },
                                "& textarea": {
                                    resize: "none",
                                    width: "100%",
                                    boxSizing: "border-box",
                                    fontSize: "1.6rem",
                                    p: "0.8rem 1.2rem",
                                    borderRadius: "0.4rem",
                                },
                                "& .error-message": {
                                    fontSize: "1.2rem",
                                    color: "#d32f2f",
                                    m: "0.4rem 0 0 1.2rem",
                                },
                            }}
                        >
                            <label htmlFor='content'>Nội dung:</label>
                            <textarea
                                id='content'
                                rows={10}
                                {...register("content", {
                                    required: {
                                        value: true,
                                        message: "Vui lòng nhập trường này!",
                                    },
                                })}
                            />
                            {errors.content && (
                                <p className='error-message'>
                                    {errors.content.message}
                                </p>
                            )}
                        </Box>
                    </DialogContent>
                    <DialogActions
                        sx={{
                            px: "2.4rem",
                        }}
                    >
                        <StyledButton variant='text' type='submit'>
                            Gửi
                        </StyledButton>
                        <StyledButton
                            variant='text'
                            onClick={handleCloseFeedbackForm}
                        >
                            Hủy
                        </StyledButton>
                    </DialogActions>
                </Box>
            </StyledDialog>
        </Box>
    );
};

export default CarouselManager;
