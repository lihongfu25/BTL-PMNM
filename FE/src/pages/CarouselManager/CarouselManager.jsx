import React from "react";
import { Controller, useForm } from "react-hook-form";
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
    { field: "carousel_id", headerName: "Mã slide", width: 130 },
    { field: "title", headerName: "Tiêu đề", width: 160 },
    { field: "category", headerName: "Danh mục", width: 160 },
    { field: "status", headerName: "Trạng thái", width: 160 },
    { field: "date", headerName: "Ngày tạo", width: 160 },
];
const rows = [
    {
        id: 1,
        title: "Tiêu đề 1",
        category: "Nam",
        status: "Đang hoạt động",
        date: "2022-10-20",
        image: "https://img3.thuthuatphanmem.vn/uploads/2019/10/14/anh-lookbook-thoi-trang_113854100.jpg",
    },
    {
        id: 2,
        title: "Tiêu đề 2",
        category: "Nữ",
        status: "Đang hoạt động",
        date: "2022-10-21",
        image: "https://img3.thuthuatphanmem.vn/uploads/2019/10/14/anh-lookbook-thoi-trang_113854100.jpg",
    },
    {
        id: 3,
        title: "Tiêu đề 3",
        category: "Nam",
        status: "Đang tắt",
        date: "2022-10-22",
        image: "https://img3.thuthuatphanmem.vn/uploads/2019/10/14/anh-lookbook-thoi-trang_113854100.jpg",
    },
    {
        id: 4,
        title: "Tiêu đề 4",
        category: "Phụ Kiện",
        status: "Đang tắt",
        date: "2022-10-29",
        image: "https://img3.thuthuatphanmem.vn/uploads/2019/10/14/anh-lookbook-thoi-trang_113854100.jpg",
    },
    {
        id: 5,
        title: "Tiêu đề 5",
        category: "Nam",
        status: "Đang hoạt động",
        date: "2022-11-20",
        image: "https://img3.thuthuatphanmem.vn/uploads/2019/10/14/anh-lookbook-thoi-trang_113854100.jpg",
    },
    {
        id: 6,
        title: "Tiêu đề 6",
        category: "Nữ",
        status: "Đang tắt",
        date: "2022-10-22",
        image: "https://img3.thuthuatphanmem.vn/uploads/2019/10/14/anh-lookbook-thoi-trang_113854100.jpg",
    },
    {
        id: 7,
        title: "Tiêu đề 7",
        category: "Nữ",
        status: "Đang hoạt động",
        date: "2022-09-20",
        image: "https://img3.thuthuatphanmem.vn/uploads/2019/10/14/anh-lookbook-thoi-trang_113854100.jpg",
    },
    {
        id: 8,
        title: "Tiêu đề 8",
        category: "Phụ Kiện",
        status: "Đang tắt",
        date: "2022-10-10",
        image: "https://img3.thuthuatphanmem.vn/uploads/2019/10/14/anh-lookbook-thoi-trang_113854100.jpg",
    },
    {
        id: 9,
        title: "Tiêu đề 9",
        category: "Nam",
        status: "Đang hoạt động",
        date: "2022-10-02",
        image: "https://img3.thuthuatphanmem.vn/uploads/2019/10/14/anh-lookbook-thoi-trang_113854100.jpg",
    },
];
const options = [
    {
        id: 1,
        name: "Nam",
    },
    {
        id: 2,
        name: "Nữ",
    },
    {
        id: 3,
        name: "Phụ Kiện",
    },
];
const statuses = [
    {
        name: "Đang hoạt động",
    },
    {
        name: "Đang tắt",
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
const ContactManager = () => {
    document.title = "Carousel | 360 Store";
    const [page, setPage] = React.useState(1);
    const [search, setSearch] = React.useState("");
    const [data, setData] = React.useState([]);
    const [dataRemaining, setDataRemaining] = React.useState([]);
    const [openAddForm, setOpenAddForm] = React.useState(false);
    const [openDelForm, setOpenDelForm] = React.useState(false);
    const [openUpdateForm, setOpenUpdateForm] = React.useState(false);
    const [delId, setDelId] = React.useState();
    const [updateId, setUpdateId] = React.useState();
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
        setValue,
    } = useForm();
    React.useEffect(() => {
        setData(rows);
    }, []);
    React.useEffect(() => {
        setDataRemaining(
            data.filter(
                (row) =>
                    row.title.toLowerCase().includes(search.toLowerCase()) ||
                    row.category.toLowerCase().includes(search.toLowerCase()) ||
                    row.status.toLowerCase().includes(search.toLowerCase()),
            ),
        );
    }, [data, search]);
    const handleChangePage = (e, value) => {
        setPage(value);
    };

    const handleOpenAddForm = () => {
        setOpenAddForm(true);
        setValue("title", "");
        setValue("category", "");
        setValue("image", undefined);
    };
    const handleOpenUpdateForm = (row) => {
        const c_id = options.filter(
            (category) => category.name === row.category,
        )[0].id;
        setOpenUpdateForm(true);
        setUpdateId(row.id);
        setValue("title", row.title);
        setValue("category", c_id);
        setValue("status", row.status);
        setValue("image", row.image);
    };
    const handleOpenDelForm = (value) => {
        setOpenDelForm(true);
        setDelId(value);
    };

    const handleCloseAddForm = () => {
        setOpenAddForm(false);
        clearErrors();
    };
    const handleCloseUpdateForm = () => {
        setOpenUpdateForm(false);
        clearErrors();
    };

    const onDel = () => {
        console.log(delId);
        setOpenDelForm(false);
    };
    const onAdd = (data) => {
        console.log({ ...data, image: data.image[0].name });
        setOpenAddForm(false);
    };
    const onUpdate = (data) => {
        console.log({ id: updateId, ...data });
        setOpenUpdateForm(false);
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
            <Typography className='heading useFont-Nunito'>Carousel</Typography>
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
                    <StyledButton
                        onClick={handleOpenAddForm}
                        sx={{
                            py: "0.4rem",
                            minWidth: "16rem",
                        }}
                    >
                        Thêm mới
                    </StyledButton>

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
                                            <td>{row.title}</td>
                                            <td>{row.category}</td>
                                            <td
                                                className={
                                                    row.status === "Đang tắt"
                                                        ? "error"
                                                        : "success"
                                                }
                                            >
                                                {row.status}
                                            </td>
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
                                                        handleOpenUpdateForm(
                                                            row,
                                                        )
                                                    }
                                                >
                                                    Sửa
                                                </Link>
                                                <Link
                                                    underline='hover'
                                                    onClick={() =>
                                                        handleOpenDelForm(
                                                            row.id,
                                                        )
                                                    }
                                                >
                                                    Xóa
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
            <StyledDialog
                className='del-form'
                open={openDelForm}
                onClose={() => setOpenDelForm(false)}
                sx={{
                    "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
                        maxWidth: "40rem",
                    },
                    "& .mess": {
                        m: 0,
                        fontSize: "1.6rem",
                        textAlign: "center",
                    },
                }}
            >
                <DialogTitle>Xóa slide</DialogTitle>
                <DialogContent>
                    <p className='mess'>
                        Hành động này không thể hoàn tác, vẫn tiếp tục xóa slide{" "}
                        {delId} ?
                    </p>
                </DialogContent>
                <DialogActions>
                    <StyledButton variant='text' onClick={onDel}>
                        Đồng ý
                    </StyledButton>
                    <StyledButton
                        variant='text'
                        onClick={() => setOpenDelForm(false)}
                    >
                        Hủy
                    </StyledButton>
                </DialogActions>
            </StyledDialog>
            <StyledDialog
                className='add-form'
                open={openAddForm}
                onClose={handleCloseAddForm}
                sx={{
                    "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
                        width: "50rem",
                    },
                }}
            >
                <Box component='form' noValidate onSubmit={handleSubmit(onAdd)}>
                    <DialogTitle>Thêm slide</DialogTitle>
                    <DialogContent
                        sx={{
                            pt: "2rem!important",
                            flexDirection: "column",
                        }}
                    >
                        <Controller
                            name='title'
                            control={control}
                            rules={{
                                required: "Vui lòng nhập trường này!",
                            }}
                            render={({ field }) => {
                                return (
                                    <TextField
                                        label='Tiêu đề'
                                        sx={{
                                            mb: "1.5rem",
                                            width: "100%",
                                        }}
                                        error={Boolean(errors.title)}
                                        helperText={
                                            errors?.title
                                                ? errors.title.message
                                                : ""
                                        }
                                        {...field}
                                    />
                                );
                            }}
                        />
                        <Controller
                            name='category'
                            control={control}
                            rules={{
                                required: "Vui lòng nhập trường này!",
                            }}
                            render={({ field }) => (
                                <Select
                                    label='Danh mục'
                                    options={options}
                                    isError={Boolean(errors.category)}
                                    errorMessage={errors.category?.message}
                                    field={field}
                                />
                            )}
                        />
                        <Box
                            sx={{
                                "& > p": {
                                    mb: "0.8rem",
                                    fontWeight: 500,
                                    fontSize: "1.6rem",
                                },
                                "& .error-message": {
                                    mt: "0.8rem",
                                    ml: "1.2rem",
                                    display: "block",
                                    color: "#d32f2f",
                                    fontSize: "1.2rem",
                                },
                            }}
                        >
                            <p>Hình ảnh</p>
                            <input
                                type='file'
                                accept='image/*'
                                {...register("image", {
                                    required: {
                                        value: true,
                                        message: "Vui lòng thêm một hình ảnh!",
                                    },
                                })}
                            />
                            {errors.image && (
                                <span className='error-message'>
                                    {errors.image.message}
                                </span>
                            )}
                        </Box>
                    </DialogContent>
                    <DialogActions
                        sx={{
                            px: "2.4rem",
                        }}
                    >
                        <StyledButton variant='text' type='submit'>
                            Thêm
                        </StyledButton>
                        <StyledButton
                            variant='text'
                            onClick={handleCloseAddForm}
                        >
                            Hủy
                        </StyledButton>
                    </DialogActions>
                </Box>
            </StyledDialog>
            <StyledDialog
                className='update-form'
                open={openUpdateForm}
                onClose={handleCloseUpdateForm}
                sx={{
                    "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
                        width: "50rem",
                    },
                }}
            >
                <Box
                    component='form'
                    noValidate
                    onSubmit={handleSubmit(onUpdate)}
                >
                    <DialogTitle>Cập nhật slide</DialogTitle>
                    <DialogContent
                        sx={{
                            pt: "2rem!important",
                            flexDirection: "column",
                        }}
                    >
                        <Controller
                            name='title'
                            control={control}
                            rules={{
                                required: "Vui lòng nhập trường này!",
                            }}
                            render={({ field }) => {
                                return (
                                    <TextField
                                        label='Tiêu đề'
                                        sx={{
                                            mb: "1.5rem",
                                            width: "100%",
                                        }}
                                        error={Boolean(errors.title)}
                                        helperText={
                                            errors?.title
                                                ? errors.title.message
                                                : ""
                                        }
                                        {...field}
                                    />
                                );
                            }}
                        />
                        <Controller
                            name='category'
                            control={control}
                            rules={{
                                required: "Vui lòng chọn danh mục!",
                            }}
                            render={({ field }) => (
                                <Select
                                    label='Danh mục'
                                    options={options}
                                    isError={Boolean(errors.category)}
                                    errorMessage={errors.category?.message}
                                    field={field}
                                />
                            )}
                        />
                        <Controller
                            name='status'
                            control={control}
                            rules={{
                                required: "Vui lòng chọn trạng thái!",
                            }}
                            render={({ field }) => (
                                <Select
                                    sx={{
                                        mt: "1.5rem",
                                    }}
                                    label='Trạng thái'
                                    options={statuses}
                                    isError={Boolean(errors.status)}
                                    errorMessage={errors.status?.message}
                                    field={field}
                                />
                            )}
                        />
                        <Box
                            sx={{
                                "& > p": {
                                    mb: "0.8rem",
                                    fontWeight: 500,
                                    fontSize: "1.6rem",
                                },
                                "& > img": {
                                    width: "100%",
                                },
                            }}
                        >
                            <p>Hình ảnh</p>
                            {updateId && (
                                <img
                                    alt=''
                                    src={
                                        data.filter(
                                            (row) => row.id === updateId,
                                        )[0].image || undefined
                                    }
                                />
                            )}
                        </Box>
                    </DialogContent>
                    <DialogActions
                        sx={{
                            px: "2.4rem",
                        }}
                    >
                        <StyledButton variant='text' type='submit'>
                            Cập nhật
                        </StyledButton>
                        <StyledButton
                            variant='text'
                            onClick={handleCloseUpdateForm}
                        >
                            Hủy
                        </StyledButton>
                    </DialogActions>
                </Box>
            </StyledDialog>
        </Box>
    );
};

export default ContactManager;
