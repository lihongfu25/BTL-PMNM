import React from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { styled } from "@mui/material/styles";
import {
    Box,
    Typography,
    Link,
    Pagination,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Snackbar,
    Alert,
    LinearProgress,
} from "@mui/material";
import { useDebounce } from "../../hook";
import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";
import "../../styles/DataTable/dataTable.scss";

const columns = [
    { field: "id", headerName: "Mã Danh Mục", width: 120 },
    { field: "name", headerName: "Tên Danh Mục", width: 160 },
    { field: "slug", headerName: "Slug", width: 120 },
];

const StyledButton = styled(Button)({
    textTransform: "none",
    padding: "0.2rem 1.2rem",
});
const TextFieldFull = styled(TextField)({
    width: "100%",
});
const StyledDialog = styled(Dialog)({
    "& .css-bdhsul-MuiTypography-root-MuiDialogTitle-root": {
        fontSize: "2rem",
    },
    "& .css-qfso29-MuiTypography-root-MuiDialogContentText-root": {
        fontSize: "1.6rem",
    },
});

const CategoryManager = () => {
    document.title = "Danh mục | 360 Store";
    const [totalPage, setTotalPage] = React.useState();
    const [page, setPage] = React.useState(1);
    const [search, setSearch] = React.useState("");
    const debounceSearch = useDebounce(search, 1000);
    const [data, setData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [openAddForm, setOpenAddForm] = React.useState(false);
    const [openDelForm, setOpenDelForm] = React.useState(false);
    const [openUpdateForm, setOpenUpdateForm] = React.useState(false);
    const [delId, setDelId] = React.useState();
    const [updateId, setUpdateId] = React.useState();
    const [snackbar, setSnackbar] = React.useState({
        isOpen: false,
        type: "",
        message: "",
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        setError,
        clearErrors,
    } = useForm();

    React.useEffect(() => {
        async function getData() {
            setIsLoading(true);
            const res = await axios.get(
                `//localhost:8000/api/categories?keyword=${debounceSearch}&page=${page}`,
            );
            setData(res.data.data.data);
            setPage(res.data.data.current_page);
            setTotalPage(res.data.data.last_page);
            setIsLoading(false);
        }
        getData();
    }, [page, debounceSearch]);

    const MuiAlert = React.forwardRef(function MuiAlert(props, ref) {
        return <Alert elevation={6} ref={ref} variant='filled' {...props} />;
    });
    const handleChangePage = (e, value) => {
        setPage(value);
    };

    const handleCloseSnackbar = (e, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbar((prev) => ({ ...prev, isOpen: false }));
    };
    const handleOpenAddForm = () => {
        setOpenAddForm(true);
        setValue("name", "");
        setValue("slug", "");
    };
    const handleCloseAddForm = () => {
        setOpenAddForm(false);
        clearErrors();
    };
    const handleOpenUpdateForm = (row) => {
        setUpdateId(row.id);
        setValue("name", row.name);
        setValue("slug", row.slug);
        setOpenUpdateForm(true);
    };
    const handleCloseUpdateForm = () => {
        setOpenUpdateForm(false);
        clearErrors();
    };
    const handleOpenDelForm = (value) => {
        setOpenDelForm(true);
        setDelId(value);
    };
    const onDel = () => {
        setOpenDelForm(false);
        async function delCategory() {
            try {
                const res = await axios.delete(
                    `//localhost:8000/api/categories/${delId}`,
                    {
                        ...data,
                    },
                );
                setSnackbar({
                    isOpen: true,
                    type: "success",
                    message: res.data.message,
                });
                setData(res.data.data.data);
                setPage(res.data.data.current_page);
                setTotalPage(res.data.data.last_page);
                setOpenUpdateForm(false);
            } catch (err) {
                console.log(err);
            }
        }
        delCategory();
    };

    const onUpdate = (data) => {
        setOpenUpdateForm(false);
        async function updateCategory() {
            try {
                const res = await axios.put(
                    `//localhost:8000/api/categories/${updateId}`,
                    {
                        ...data,
                    },
                );
                setSnackbar({
                    isOpen: true,
                    type: "success",
                    message: res.data.message,
                });
                setData(res.data.data.data);
                setPage(res.data.data.current_page);
                setTotalPage(res.data.data.last_page);
            } catch (err) {
                console.log(err);
            }
        }
        updateCategory();
    };
    const onAdd = (data) => {
        async function createCategory() {
            try {
                const res = await axios.post(
                    `//localhost:8000/api/categories`,
                    {
                        ...data,
                    },
                );
                setSnackbar({
                    isOpen: true,
                    type: "success",
                    message: res.data.message,
                });
                setData(res.data.data.data);
                setPage(res.data.data.current_page);
                setTotalPage(res.data.data.last_page);
                setOpenAddForm(false);
            } catch (err) {
                if (err.response.data.messageName) {
                    setSnackbar({
                        isOpen: true,
                        type: "error",
                        message: err.response.data.messageName,
                    });
                    setError("name", err.response.data.messageName);
                }
                if (err.response.data.messageSlug) {
                    setSnackbar({
                        isOpen: true,
                        type: "error",
                        message: err.response.data.messageSlug,
                    });
                    setError("slug", err.response.data.messageSlug);
                }
            }
        }
        createCategory();
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
            <Typography className='heading useFont-Nunito'>Danh mục</Typography>
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
                            {isLoading ? (
                                <tr>
                                    <td
                                        colSpan={
                                            Object.keys(columns).length + 1
                                        }
                                        align='center'
                                    >
                                        <LinearProgress color='inherit' />
                                    </td>
                                </tr>
                            ) : data.length === 0 ? (
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
                                data.map((row, index) => (
                                    <tr
                                        key={index}
                                        className={
                                            index % 2 === 0 ? "even" : "odd"
                                        }
                                    >
                                        {Object.values(row).map(
                                            (value, index) => (
                                                <td key={index}>{value}</td>
                                            ),
                                        )}
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
                                                    handleOpenUpdateForm(row)
                                                }
                                            >
                                                Sửa
                                            </Link>
                                            <Link
                                                underline='hover'
                                                onClick={() =>
                                                    handleOpenDelForm(row.id)
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
                                        count={totalPage}
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
                    <DialogTitle>Xóa danh mục</DialogTitle>
                    <DialogContent>
                        <p className='mess'>
                            Hành động này không thể hoàn tác, vẫn tiếp tục xóa
                            danh mục {delId} ?
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
                    className='update-form'
                    open={openUpdateForm}
                    onClose={handleCloseUpdateForm}
                >
                    <Box
                        component='form'
                        onSubmit={handleSubmit(onUpdate)}
                        noValidate
                    >
                        <DialogTitle>Cập nhật danh mục</DialogTitle>
                        <DialogContent
                            sx={{
                                pt: "2rem!important",
                                flexDirection: "column",
                            }}
                        >
                            <Controller
                                name='name'
                                control={control}
                                rules={{
                                    required: "Vui lòng nhập trường này!",
                                }}
                                render={({ field }) => (
                                    <TextFieldFull
                                        label='Tên danh mục'
                                        error={Boolean(errors.name)}
                                        helperText={
                                            errors?.name
                                                ? errors.name.message
                                                : ""
                                        }
                                        {...field}
                                    />
                                )}
                            />
                            <Controller
                                name='slug'
                                control={control}
                                rules={{
                                    required: "Vui lòng nhập trường này!",
                                    pattern: {
                                        value: /^[a-z-]+$/u,
                                        message:
                                            "Slug chỉ chứa chữ cái thường và dấu (-)",
                                    },
                                }}
                                render={({ field }) => {
                                    return (
                                        <TextFieldFull
                                            label='Slug'
                                            sx={{
                                                mt: "1.5rem",
                                            }}
                                            error={Boolean(errors.slug)}
                                            helperText={
                                                errors?.slug
                                                    ? errors.slug.message
                                                    : ""
                                            }
                                            {...field}
                                        />
                                    );
                                }}
                            />
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
                <StyledDialog
                    className='add-form'
                    open={openAddForm}
                    onClose={handleCloseAddForm}
                >
                    <Box
                        component='form'
                        onSubmit={handleSubmit(onAdd)}
                        noValidate
                    >
                        <DialogTitle>Thêm danh mục</DialogTitle>
                        <DialogContent
                            sx={{
                                pt: "2rem!important",
                                flexDirection: "column",
                            }}
                        >
                            <Controller
                                name='name'
                                control={control}
                                rules={{
                                    required: "Vui lòng nhập trường này!",
                                }}
                                render={({ field }) => (
                                    <TextFieldFull
                                        label='Tên danh mục'
                                        error={Boolean(errors.name)}
                                        helperText={
                                            errors?.name
                                                ? errors.name.message
                                                : ""
                                        }
                                        {...field}
                                    />
                                )}
                            />
                            <Controller
                                name='slug'
                                control={control}
                                rules={{
                                    required: "Vui lòng nhập trường này!",
                                    pattern: {
                                        value: /^[a-z-]+$/u,
                                        message:
                                            "Slug chỉ chứa chữ cái viết thường không dấu và dấu (-)",
                                    },
                                }}
                                render={({ field }) => {
                                    return (
                                        <TextFieldFull
                                            label='Slug'
                                            sx={{
                                                mt: "1.5rem",
                                            }}
                                            error={Boolean(errors.slug)}
                                            helperText={
                                                errors?.slug
                                                    ? errors.slug.message
                                                    : ""
                                            }
                                            {...field}
                                        />
                                    );
                                }}
                            />
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
            </Box>
            <Snackbar
                open={snackbar.isOpen}
                autoHideDuration={5000}
                onClose={handleCloseSnackbar}
            >
                <MuiAlert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.type}
                    sx={{
                        width: "100%",
                        fontSize: "1.6rem",
                    }}
                >
                    {snackbar.message}
                </MuiAlert>
            </Snackbar>
        </Box>
    );
};

export default CategoryManager;
