import React from "react";
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
} from "@mui/material";
import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";
import "../../components/DataTable/dataTable.scss";

const columns = [
    { field: "id", headerName: "Mã Danh Mục", width: 120 },
    { field: "name", headerName: "Tên Danh Mục", width: 160 },
    { field: "slug", headerName: "Slug", width: 120 },
];

const rows = [
    { id: 1, name: "Nam", slug: "men" },
    { id: 2, name: "Nữ", slug: "women" },
    { id: 3, name: "Phụ Kiện", slug: "accessory" },
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
    document.title = "Danh mục - 360 Store";
    const [page, setPage] = React.useState(1);
    const [search, setSearch] = React.useState("");
    const [openAddForm, setOpenAddForm] = React.useState(false);
    const [openDelForm, setOpenDelForm] = React.useState(false);
    const [openUpdateForm, setOpenUpdateForm] = React.useState(false);
    const [delId, setDelId] = React.useState();
    const [updateId, setUpdateId] = React.useState();
    const handleChangePage = (e, value) => {
        setPage(value);
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
    const handleSubmitDelReq = () => {
        console.log(delId);
    };
    const {
        control,
        handleSubmit,
        formState: { errors },
        clearErrors,
        setValue,
    } = useForm();
    const onUpdate = (data) => {
        setOpenUpdateForm(false);
        console.log({ id: updateId, ...data });
    };
    const onAdd = (data) => {
        setOpenAddForm(false);
        console.log({ ...data });
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
                            {rows
                                .filter((row) =>
                                    row.name
                                        .toLowerCase()
                                        .includes(search.toLowerCase()),
                                )
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
                                ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={Object.keys(columns).length + 1}>
                                    <Pagination
                                        count={Math.floor(rows.length / 10) + 1}
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
                        <StyledButton
                            variant='text'
                            onClick={handleSubmitDelReq}
                        >
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
        </Box>
    );
};

export default CategoryManager;
