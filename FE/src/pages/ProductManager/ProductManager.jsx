import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
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
    FormControl,
    InputLabel,
    Select as MuiSelect,
    OutlinedInput,
    MenuItem,
    Checkbox,
    ListItemText,
    FormHelperText,
} from "@mui/material";
import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";
import { Select } from "../../components/Select";
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
const categoryList = [
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
const sizeList = [
    {
        id: 1,
        name: "S",
    },
    {
        id: 2,
        name: "M",
    },
    {
        id: 3,
        name: "L",
    },
    {
        id: 4,
        name: "XL",
    },
    {
        id: 5,
        name: "XXL",
    },
];
const StyledButton = styled(Button)({
    textTransform: "none",
    padding: "0.2rem 1.2rem",
});
const ProductManager = () => {
    document.title = "Sản phẩm | 360 Store";
    const [page, setPage] = React.useState(1);
    const [search, setSearch] = React.useState("");
    const [data, setData] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [sizes, setSizes] = React.useState([]);
    const [sizesSelected, setSizesSelected] = React.useState([]);
    const [dataRemaining, setDataRemaining] = React.useState([]);
    const [openAddForm, setOpenAddForm] = React.useState(false);

    const { pathname } = useLocation();
    const navigate = useNavigate();
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
        setValue,
        setError,
    } = useForm();
    React.useEffect(() => {
        setData(rows);
        setCategories(categoryList);
        setSizes(sizeList);
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
    const handleOpenAddForm = () => {
        setOpenAddForm(true);
        setValue("name", "");
        setValue("category", "");
        setValue("price", "");
        setValue("quantity", "");
        setValue("discount", "");
        setValue("description", "");
        setSizesSelected([]);
    };
    const handleCloseAddForm = () => {
        setOpenAddForm(false);
        setSizesSelected([]);
        clearErrors();
    };
    const handleSelectSize = (event) => {
        const {
            target: { value },
        } = event;
        setSizesSelected(typeof value === "string" ? value.split(",") : value);
        if (sizesSelected.length !== 0) clearErrors("size");
    };
    const handleGoToDetail = (id) => {
        navigate(`${pathname}/${id}`);
    };
    const onAdd = (data) => {
        data.size = sizes
            .filter((size) => sizesSelected.includes(size.name))
            .map((size) => size.id);
        console.log(data);
        setOpenAddForm(false);
        setSizesSelected([]);
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
                    <StyledButton
                        sx={{
                            minWidth: "16rem",
                            p: "0.4rem 1.2rem",
                        }}
                        onClick={handleOpenAddForm}
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
                <Dialog
                    className='add-form'
                    open={openAddForm}
                    onClose={handleCloseAddForm}
                    sx={{
                        "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
                            width: "50rem",
                        },
                        "& .css-bdhsul-MuiTypography-root-MuiDialogTitle-root":
                            {
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
                        onSubmit={handleSubmit(onAdd)}
                    >
                        <DialogTitle>Thêm sản phẩm</DialogTitle>
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
                                render={({ field }) => {
                                    return (
                                        <TextField
                                            label='Tên sản phẩm'
                                            sx={{
                                                mb: "1.5rem",
                                                width: "100%",
                                            }}
                                            error={Boolean(errors.name)}
                                            helperText={
                                                errors?.name
                                                    ? errors.name.message
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
                                        options={categories}
                                        isError={Boolean(errors.category)}
                                        errorMessage={errors.category?.message}
                                        field={field}
                                    />
                                )}
                            />
                            <Controller
                                name='price'
                                control={control}
                                rules={{
                                    required: "Vui lòng nhập trường này!",
                                    pattern: {
                                        value: /^\d+$/u,
                                        message: "Đơn giá chỉ chứa số!",
                                    },
                                    min: {
                                        value: 1,
                                        message: "Đơn giá phải lớn hơn 0!",
                                    },
                                }}
                                render={({ field }) => {
                                    return (
                                        <TextField
                                            label='Đơn giá'
                                            sx={{
                                                mt: "1.5rem",
                                                width: "100%",
                                            }}
                                            error={Boolean(errors.price)}
                                            helperText={
                                                errors?.price
                                                    ? errors.price.message
                                                    : ""
                                            }
                                            {...field}
                                        />
                                    );
                                }}
                            />
                            <Controller
                                name='quantity'
                                control={control}
                                rules={{
                                    required: "Vui lòng nhập trường này!",
                                    pattern: {
                                        value: /^\d+$/u,
                                        message: "Số lượng chỉ chứa số!",
                                    },
                                    min: {
                                        value: 1,
                                        message: "Số lượng phải lớn hơn 0!",
                                    },
                                }}
                                render={({ field }) => {
                                    return (
                                        <TextField
                                            label='Số lượng'
                                            sx={{
                                                mt: "1.5rem",
                                                width: "100%",
                                            }}
                                            error={Boolean(errors.quantity)}
                                            helperText={
                                                errors?.quantity
                                                    ? errors.quantity.message
                                                    : ""
                                            }
                                            {...field}
                                        />
                                    );
                                }}
                            />
                            <Controller
                                name='discount'
                                control={control}
                                rules={{
                                    pattern: {
                                        value: /^[0-9.]+$/,
                                        message:
                                            "Nhập vào số phần trăm giảm giá là một số thực dương!",
                                    },
                                    min: {
                                        value: 0,
                                        message:
                                            "Không có giảm giá vui lòng bỏ qua!",
                                    },
                                    max: {
                                        value: 100,
                                        message:
                                            "Mức ưu đãi lớn nhất có thể là 100%!",
                                    },
                                }}
                                render={({ field }) => {
                                    return (
                                        <TextField
                                            label='Giảm giá'
                                            sx={{
                                                mt: "1.5rem",
                                                width: "100%",
                                            }}
                                            error={Boolean(errors.discount)}
                                            helperText={
                                                errors?.discount
                                                    ? errors.discount.message
                                                    : ""
                                            }
                                            {...field}
                                        />
                                    );
                                }}
                            />
                            <Controller
                                name='description'
                                control={control}
                                rules={{
                                    required: "Vui lòng nhập trường này!",
                                }}
                                render={({ field }) => {
                                    return (
                                        <TextField
                                            label='Mô tả'
                                            sx={{
                                                mt: "1.5rem",
                                                width: "100%",
                                            }}
                                            multiline
                                            error={Boolean(errors.description)}
                                            helperText={
                                                errors?.description
                                                    ? errors.description.message
                                                    : ""
                                            }
                                            {...field}
                                        />
                                    );
                                }}
                            />
                            <FormControl
                                error={errors.size}
                                sx={{
                                    mt: "1.5rem",
                                    width: "100%",
                                    "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                        {
                                            borderColor: "#333",
                                        },
                                    "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                                        {
                                            fontSize: "1.6rem",
                                            transform:
                                                "translate(1.2rem, 0.8rem)",
                                        },
                                    "& .css-10hburv-MuiTypography-root": {
                                        fontSize: "1.6rem",
                                    },
                                    "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                                        {
                                            p: "1.2rem",
                                            fontSize: "1.4rem",
                                            minHeight: "0!important",
                                        },
                                    "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root":
                                        {
                                            fontSize: "1.6rem",
                                            "&.Mui-focused": {
                                                color: "#333",
                                            },
                                        },
                                    "& .css-14lo706": {
                                        fontSize: "1.2rem",
                                    },
                                    "& .css-1wc848c-MuiFormHelperText-root": {
                                        fontSize: "1.2rem",
                                    },
                                }}
                            >
                                <InputLabel>Kích cỡ</InputLabel>
                                <MuiSelect
                                    multiple
                                    value={sizesSelected}
                                    onChange={handleSelectSize}
                                    onBlur={() => {
                                        if (sizesSelected.length !== 0)
                                            clearErrors("size");
                                    }}
                                    input={<OutlinedInput label='Kích cỡ' />}
                                    renderValue={(selected) =>
                                        selected.join(", ")
                                    }
                                >
                                    {sizes.map((size) => (
                                        <MenuItem
                                            key={size.id}
                                            value={size.name}
                                        >
                                            <Checkbox
                                                checked={
                                                    sizesSelected.indexOf(
                                                        size.name,
                                                    ) > -1
                                                }
                                            />
                                            <ListItemText primary={size.name} />
                                        </MenuItem>
                                    ))}
                                </MuiSelect>
                                {errors.size && (
                                    <FormHelperText>
                                        {errors.size.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
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
                                        fontSize: "1.3rem",
                                    },
                                }}
                            >
                                <p>Hình ảnh</p>
                                <input
                                    type='file'
                                    accept='image/*'
                                    multiple
                                    {...register("image", {
                                        required: {
                                            value: true,
                                            message:
                                                "Vui lòng thêm một hình ảnh!",
                                        },
                                    })}
                                />
                                {errors.image && (
                                    <span className='error-message'>
                                        {errors.image.message}
                                    </span>
                                )}
                            </Box>
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
                                        fontSize: "1.3rem",
                                    },
                                }}
                            >
                                <p>Màu sắc</p>
                                <input
                                    type='file'
                                    accept='image/*'
                                    multiple
                                    {...register("color", {
                                        required: {
                                            value: true,
                                            message:
                                                "Vui lòng thêm một hình ảnh!",
                                        },
                                    })}
                                />
                                {errors.color && (
                                    <span className='error-message'>
                                        {errors.color.message}
                                    </span>
                                )}
                            </Box>
                        </DialogContent>
                        <DialogActions
                            sx={{
                                px: "2.4rem",
                            }}
                        >
                            <StyledButton
                                variant='text'
                                type='submit'
                                onClick={() => {
                                    if (sizesSelected.length === 0)
                                        setError("size", {
                                            type: "required",
                                            message: "Vui lòng chọn kích cỡ!",
                                        });
                                }}
                            >
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
                </Dialog>
            </Box>
        </Box>
    );
};

export default ProductManager;
