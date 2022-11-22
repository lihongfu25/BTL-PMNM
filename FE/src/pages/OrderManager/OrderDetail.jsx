import React from "react";
import { useParams, Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import {
    Box,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { BsArrowLeftShort } from "react-icons/bs";

import productImg from "../../assets/img/demo_porduct.jpg";
import styles from "./orderDetail.module.scss";
import "../../styles/DataTable/dataTable.scss";
import { currencyFormat } from "../../styles/GlobalStyles";
import { TextField } from "../../components/TextField";
const order = {
    orderId: "1",
    orderDate: "2022-10-20",
    orderStatus: "wait",
    memberName: "Nguyên Văn A",
    memberAddress: "Minh Khai, Từ Liêm, Hà Nội",
    memberPhone: "0123456875",
    products: [
        {
            id: "1",
            name: "Sản phẩm 1",
            price: 123000,
            color: "https://wallpapercave.com/wp/wp2552423.jpg",
            size: "L",
            quantity: 1,
            discount: 20,
        },
        {
            id: "2",
            name: "Sản phẩm 2",
            price: 123000,
            color: "https://wallpapercave.com/wp/wp2552423.jpg",
            size: "L",
            quantity: 1,
            discount: 10,
            img: productImg,
        },
    ],
};
const columns = [
    { field: "id", headerName: "Mã sản phẩm", width: 100 },
    { field: "name", headerName: "Tên sản phẩm", width: 200 },
    { field: "color", headerName: "Màu sắc", width: 80 },
    { field: "size", headerName: "Kích thước", width: 80 },
    { field: "quantity", headerName: "Số lượng", width: 80 },
];
const StyledButton = styled(Button)({
    fontSize: "1.6rem",
    fontFamily: "Nunito",
    textTransform: "none",
    padding: "0.2rem 1.2rem",
    minWidth: "12rem",
});
const OrderDetail = () => {
    const { id } = useParams();
    const [data, setData] = React.useState(order);
    const [cancelForm, setCancelForm] = React.useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        clearErrors,
        setValue,
    } = useForm();
    React.useEffect(() => {
        setData(order);
        console.log(id);
    }, []);
    const handleOpenCancelForm = () => {
        setCancelForm(true);
        setValue("reason", "");
    };
    const handleCloseCancelForm = () => {
        setCancelForm(false);
        clearErrors();
    };
    const handleUpdateStatus = () => {
        const newStatus =
            data.orderStatus === "wait"
                ? "prepare"
                : data.orderStatus === "prepare"
                ? "delivering"
                : "canceled";
        console.log(newStatus);
    };
    const onCancel = (data) => {
        setData((prev) => ({ ...prev, orderStatus: "canceled" }));
        setCancelForm(false);
    };
    return (
        <Box
            sx={{
                display: "flex",
                position: "relative",
                flexDirection: "column",
                ".heading": {
                    color: "#495057",
                    fontSize: "2.8rem",
                    mb: "2rem",
                },
                ".prevButton": {
                    fontSize: "4rem",
                    position: "absolute",
                    top: "-3rem",
                    right: 0,
                    color: "#333",
                },
            }}
        >
            <Link
                to='/manager/orders'
                className='prevButton navLink linkNoneUnderline'
            >
                <BsArrowLeftShort />
            </Link>
            <Typography className='heading useFont-Nunito'>
                Chi tiết đơn hàng
            </Typography>
            <Box
                sx={{
                    flexDirection: "column",
                }}
            >
                <div className={styles.infor}>
                    <Box
                        className={styles.container}
                        sx={{
                            flexDirection: "column",
                        }}
                    >
                        <div className={styles.group}>
                            <label className={styles.label}>Mã đơn hàng</label>
                            <p className={styles.text}>{data.orderId}</p>
                        </div>
                        <div className={styles.group}>
                            <label className={styles.label}>Ngày lập</label>
                            <p className={styles.text}>{data.orderDate}</p>
                        </div>
                        <div className={styles.group}>
                            <label className={styles.label}>Khách hàng</label>
                            <p className={styles.text}>{data.memberName}</p>
                        </div>
                        <div className={styles.group}>
                            <label className={styles.label}>Địa chỉ</label>
                            <p className={styles.text}>{data.memberAddress}</p>
                        </div>
                        <div className={styles.group}>
                            <label className={styles.label}>
                                Số điện thoại
                            </label>
                            <p className={styles.text}>{data.memberPhone}</p>
                        </div>
                        <div className={styles.group}>
                            <label className={styles.label}>
                                Tổng thanh toán
                            </label>
                            <p className={styles.text}>
                                {currencyFormat(
                                    data.products.reduce(
                                        (total, product) =>
                                            total +
                                            product.price *
                                                (1 - product.discount / 100) *
                                                product.quantity,
                                        0,
                                    ),
                                )}
                            </p>
                        </div>
                    </Box>

                    <div className={styles.container}>
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
                                </tr>
                            </thead>
                            <tbody className='table-body'>
                                {data.products.map((product, index) => (
                                    <tr
                                        key={index}
                                        className={
                                            index % 2 === 0 ? "even" : "odd"
                                        }
                                    >
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td align='center'>
                                            <span
                                                className={styles.productColor}
                                                style={{
                                                    backgroundImage: `url(${product.color})`,
                                                }}
                                            ></span>
                                        </td>
                                        <td align='center'>{product.size}</td>
                                        <td align='center'>
                                            {product.quantity}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Box
                    sx={{
                        mt: "2rem",
                    }}
                >
                    {(data.orderStatus === "wait" ||
                        data.orderStatus === "prepare" ||
                        data.orderStatus === "request cancel") && (
                        <StyledButton
                            variant='contained'
                            color='success'
                            disableElevation
                            sx={{
                                mr: "4rem",
                            }}
                            onClick={handleUpdateStatus}
                        >
                            {data.orderStatus === "prepare"
                                ? "Tiếp theo"
                                : "Xác nhận"}
                        </StyledButton>
                    )}
                    {data.orderStatus === "wait" && (
                        <StyledButton
                            variant='contained'
                            color='error'
                            disableElevation
                            onClick={handleOpenCancelForm}
                        >
                            Từ chối
                        </StyledButton>
                    )}
                </Box>
            </Box>
            <Dialog
                className='del-form'
                open={cancelForm}
                onClose={handleCloseCancelForm}
                sx={{
                    "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
                        width: "40rem",
                    },
                    "& .css-bdhsul-MuiTypography-root-MuiDialogTitle-root": {
                        fontSize: "2rem",
                    },
                    "& .css-qfso29-MuiTypography-root-MuiDialogContentText-root":
                        {
                            fontSize: "1.6rem",
                        },
                    "& .mess": {
                        m: 0,
                        fontSize: "1.6rem",
                        textAlign: "center",
                    },
                }}
            >
                <Box
                    component='form'
                    onSubmit={handleSubmit(onCancel)}
                    noValidate
                >
                    <DialogTitle>Từ chối đơn hàng</DialogTitle>
                    <DialogContent
                        sx={{
                            flexDirection: "column",
                        }}
                    >
                        <Controller
                            name='reason'
                            control={control}
                            rules={{
                                required: "Vui lòng đưa ra lý do từ chối!",
                            }}
                            render={({ field }) => (
                                <TextField
                                    label='Lý do'
                                    sx={{
                                        mt: "1.5rem",
                                        width: "100%",
                                    }}
                                    multiline
                                    error={Boolean(errors.reason)}
                                    helperText={
                                        errors?.reason
                                            ? errors.reason.message
                                            : ""
                                    }
                                    {...field}
                                />
                            )}
                        />
                    </DialogContent>
                    <DialogActions
                        sx={{
                            "& button": {
                                color: "#495057",
                            },
                        }}
                    >
                        <StyledButton variant='text' type='submit'>
                            Đồng ý
                        </StyledButton>
                        <StyledButton
                            variant='text'
                            onClick={handleCloseCancelForm}
                        >
                            Hủy
                        </StyledButton>
                    </DialogActions>
                </Box>
            </Dialog>
        </Box>
    );
};

export default OrderDetail;
