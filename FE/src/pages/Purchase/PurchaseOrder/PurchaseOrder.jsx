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
    Rating,
} from "@mui/material";
import { PurchaseItem } from "../PurchaseItem";
import { Button } from "../../../components/Button";
import { TextField } from "../../../components/TextField";
import { currencyFormat } from "../../../styles/GlobalStyles";
const StyledButton = styled(Button)({
    textTransform: "none",
    padding: "0.4rem 1.2rem",
    minWidth: "12rem",
});
const StyledDialog = styled(Dialog)({
    "& .css-bdhsul-MuiTypography-root-MuiDialogTitle-root": {
        fontSize: "2rem",
    },
    "& .css-qfso29-MuiTypography-root-MuiDialogContentText-root": {
        fontSize: "1.6rem",
    },
});
const PurchaseOrder = ({ value }) => {
    const [openRequestCancel, setOpenRequestCancel] = React.useState(false);
    const [openRatingForm, setOpenRatingForm] = React.useState(false);
    const [isReceived, setIsReceived] = React.useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
        clearErrors,
        setValue,
    } = useForm();
    const handleOpenRequestCancel = () => {
        setOpenRequestCancel(true);
        setValue("reason", "");
    };
    const handleCloseRequestCancel = () => {
        setOpenRequestCancel(false);
        clearErrors();
    };
    const handleOpenRatingForm = () => {
        setOpenRatingForm(true);
        setValue("star", "5");
        setValue("description", "");
    };
    const handleCloseRatingForm = () => {
        setOpenRatingForm(false);
        clearErrors();
    };
    const onRequestCancel = (data) => {
        setOpenRequestCancel(false);
        console.log({ id: value.id, ...data });
    };
    const onSendRating = (data) => {
        setOpenRatingForm(false);
        console.log({ id: value.id, ...data });
    };
    const onReceived = () => {
        console.log(value.id);
        setIsReceived(false);
    };
    return (
        <Box
            key={value.id}
            sx={{
                mt: "1.6rem",
                width: "100%",
                overflow: "hidden",
                borderRadius: "0.8rem",
                boxShadow: "0 0 2rem #e5e5e5",
            }}
        >
            {value.products.map((product) => (
                <PurchaseItem value={product} key={product.id} />
            ))}
            <Typography
                sx={{
                    width: "100%",
                    p: "1rem 2.8rem",
                    color: "#495057",
                    fontSize: "1.6rem",
                    fontFamily: "Nunito",
                    boxSizing: "border-box",
                    borderRadius: "0.4rem",
                    textAlign: "right",
                    "& span": {
                        fontWeight: 700,
                    },
                }}
            >
                Tổng số tiền:{" "}
                <span>
                    {currencyFormat(
                        value.products.reduce(
                            (total, product) => total + product.price,
                            0,
                        ),
                    )}
                </span>
            </Typography>
            <Box
                sx={{
                    pb: "1.2rem",
                    mr: "2rem",
                    display: "flex",
                    justifyContent: "flex-end",
                }}
            >
                {value.status === "wait" && (
                    <StyledButton
                        variant='text'
                        onClick={handleOpenRequestCancel}
                    >
                        Hủy
                    </StyledButton>
                )}
                {value.status === "delivering" && (
                    <StyledButton onClick={() => setIsReceived(true)}>
                        Đã nhận được hàng
                    </StyledButton>
                )}
                {value.status === "delivered" && (
                    <StyledButton onClick={handleOpenRatingForm}>
                        Đánh giá
                    </StyledButton>
                )}
            </Box>
            <StyledDialog
                className='del-form'
                open={isReceived}
                onClose={() => setIsReceived(false)}
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
                <DialogTitle>Đã nhận được hàng</DialogTitle>
                <DialogContent>
                    <p className='mess'>
                        Xác nhận đã nhận được hàng và thanh toán{" "}
                        {currencyFormat(
                            value.products.reduce(
                                (total, product) => total + product.price,
                                0,
                            ),
                        )}{" "}
                        cho nhân viên giao hàng ?
                    </p>
                </DialogContent>
                <DialogActions>
                    <StyledButton variant='text' onClick={onReceived}>
                        Đồng ý
                    </StyledButton>
                    <StyledButton
                        variant='text'
                        onClick={() => setIsReceived(false)}
                    >
                        Hủy
                    </StyledButton>
                </DialogActions>
            </StyledDialog>
            <StyledDialog
                className='request-cancel-form'
                open={openRequestCancel}
                onClose={handleCloseRequestCancel}
                sx={{
                    "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
                        width: "40rem",
                    },
                }}
            >
                <Box
                    component='form'
                    onSubmit={handleSubmit(onRequestCancel)}
                    noValidate
                >
                    <DialogTitle>Hủy đơn hàng</DialogTitle>
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
                            onClick={handleCloseRequestCancel}
                        >
                            Hủy
                        </StyledButton>
                    </DialogActions>
                </Box>
            </StyledDialog>
            <StyledDialog
                className='rating-form'
                open={openRatingForm}
                onClose={handleCloseRatingForm}
                sx={{
                    "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
                        width: "40rem",
                    },
                }}
            >
                <Box
                    component='form'
                    onSubmit={handleSubmit(onSendRating)}
                    noValidate
                >
                    <DialogTitle>Đánh giá sản phẩm</DialogTitle>
                    <DialogContent
                        sx={{
                            flexDirection: "column",
                            textAlign: "center",
                        }}
                    >
                        <Controller
                            name='star'
                            control={control}
                            rules={{
                                required: "Vui lòng đưa ra lý do từ chối!",
                            }}
                            render={({ field }) => (
                                <Rating
                                    {...field}
                                    precision={1}
                                    sx={{
                                        fontSize: "2.4rem",
                                    }}
                                />
                            )}
                        />
                        <Controller
                            name='description'
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    label='Nội dung'
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
                            Gửi
                        </StyledButton>
                        <StyledButton
                            variant='text'
                            onClick={handleCloseRatingForm}
                        >
                            Hủy
                        </StyledButton>
                    </DialogActions>
                </Box>
            </StyledDialog>
        </Box>
    );
};

export default React.memo(PurchaseOrder);
