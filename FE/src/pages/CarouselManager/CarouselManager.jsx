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
} from "@mui/material";
import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";
import { Select } from "../../components/Select";
import { DataTable } from "../../components/DataTable";

const columns = [
    { field: "carousel_id", headerName: "Mã slide", width: 130 },
    { field: "category", headerName: "Danh mục", width: 160 },
    { field: "date", headerName: "Ngày tạo", width: 160 },
    { field: "state", headerName: "Trạng thái", width: 160 },
];
const rows = [
    { id: 1, category: "Nam", date: "2022-10-20", state: "Đang hoạt động" },
    { id: 2, category: "Nữ", date: "2022-10-21", state: "Đang hoạt động" },
    { id: 3, category: "Nam", date: "2022-10-22", state: "Đang tắt" },
    { id: 4, category: "Phụ Kiện", date: "2022-10-29", state: "Đang tắt" },
    { id: 5, category: "Nam", date: "2022-11-20", state: "Đang hoạt động" },
    { id: 6, category: "Nữ", date: "2022-10-22", state: "Đang tắt" },
    { id: 7, category: "Nữ", date: "2022-09-20", state: "Đang hoạt động" },
    { id: 8, category: "Phụ Kiện", date: "2022-10-10", state: "Đang tắt" },
    { id: 9, category: "Nam", date: "2022-10-02", state: "Đang hoạt động" },
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
const StyledButton = styled(Button)({
    textTransform: "none",
    padding: "0.2rem 1.2rem",
});
const CarouselManager = () => {
    document.title = "Carousel - 360 Store";
    const [search, setSearch] = React.useState("");
    const [data, setData] = React.useState([]);
    const [openAddForm, setOpenAddForm] = React.useState(false);

    React.useEffect(() => {
        setData(rows);
    }, []);
    const {
        control,
        handleSubmit,
        formState: { errors },
        clearErrors,
        setValue,
    } = useForm();

    const handleOpenAddForm = () => {
        setOpenAddForm(true);
        setValue("title", "");
        setValue("category", "");
        setValue("image", undefined);
    };
    const handleCloseAddForm = () => {
        setOpenAddForm(false);
        clearErrors();
    };

    const onAdd = (data) => {
        console.log(data.image);
        setOpenAddForm(false);
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
                    <Button
                        onClick={handleOpenAddForm}
                        sx={{
                            py: "0.4rem",
                            minWidth: "16rem",
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
                    <DataTable
                        columns={columns}
                        data={data.filter(
                            (row) =>
                                row.category
                                    .toLowerCase()
                                    .includes(search.toLowerCase()) ||
                                row.state
                                    .toLowerCase()
                                    .includes(search.toLowerCase()),
                        )}
                    />
                </Box>
            </Box>
            <Dialog
                open={openAddForm}
                onClose={handleCloseAddForm}
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
                        <Controller
                            name='image'
                            control={control}
                            rules={{
                                required: "Vui lòng thêm một hình ảnh!",
                            }}
                            render={({ field }) => (
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
                                        {...field}
                                    />
                                    {errors.image && (
                                        <span className='error-message'>
                                            {errors.image.message}
                                        </span>
                                    )}
                                </Box>
                            )}
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
            </Dialog>
        </Box>
    );
};

export default CarouselManager;
