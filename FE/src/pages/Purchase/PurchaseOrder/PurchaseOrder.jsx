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
    Snackbar,
} from "@mui/material";

import axiosClient from "../../../api/axiosClient";
import { PurchaseItem } from "../PurchaseItem";
import { Alert } from "../../../components/Alert";
import { Button } from "../../../components/Button";
import { TextField } from "../../../components/TextField";
import { currencyFormat } from "../../../styles/GlobalStyles";
const StyledButton = styled(Button)({
    textTransform: "none",
    padding: "0.4rem 1.2rem",
    minWidth: "12rem",
});
const StyledDialog = styled(Dialog)({
    "& .MuiTypography-root.MuiDialogTitle-root": {
        fontSize: "2rem",
    },
    "& .MuiTypography-root.MuiDialogContentText-root": {
        fontSize: "1.6rem",
    },
});
const PurchaseOrder = ({ value, reCall }) => {
    const [openRequestCancel, setOpenRequestCancel] = React.useState(false);
    const [openRatingForm, setOpenRatingForm] = React.useState(false);
    const [isReceived, setIsReceived] = React.useState(false);
    const [cancelRC, setCancelRC] = React.useState(false);
    const [snackbar, setSnackbar] = React.useState({
        isOpen: false,
        type: "",
        message: "",
    });
    const {
        control,
        handleSubmit,
        formState: { errors },
        clearErrors,
        setValue,
    } = useForm();
    const handleCloseSnackbar = (e, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbar((prev) => ({ ...prev, isOpen: false }));
    };
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
        async function requestCancel() {
            try {
                const res = await axiosClient.post(
                    `/orders/request-cancel/${value.id}`,
                    {
                        status: "request cancel",
                        reason: data.reason,
                    },
                );
                setSnackbar({
                    isOpen: true,
                    type: "success",
                    message: res.data.message,
                });
                reCall(Math.random());
                setOpenRequestCancel(false);
            } catch (err) {
                console.log(err);
            }
        }
        requestCancel();
    };
    const onSendRating = (data) => {
        async function sendRating() {
            try {
                const res = await axiosClient.post(
                    `/orders/rating/${value.id}`,
                    {
                        ...data,
                    },
                );
                setSnackbar({
                    isOpen: true,
                    type: "success",
                    message: res.data.message,
                });
                setOpenRatingForm(false);
                reCall(Math.random());
            } catch (err) {
                console.log(err);
            }
        }
        sendRating();
    };
    const onReceived = () => {
        async function received() {
            try {
                const res = await axiosClient.post(
                    `/orders/status/${value.id}`,
                    {
                        status: "delivered",
                    },
                );
                setSnackbar({
                    isOpen: true,
                    type: "success",
                    message: res.data.message,
                });
                setIsReceived(false);
                reCall(Math.random());
            } catch (err) {
                console.log(err);
            }
        }
        received();
    };
    const onCancelRequestCancel = () => {
        async function cancelRC() {
            try {
                const res = await axiosClient.post(
                    `/orders/status/${value.id}`,
                    {
                        status: "wait",
                    },
                );
                setSnackbar({
                    isOpen: true,
                    type: "success",
                    message: res.data.message,
                });
                reCall(Math.random());
                setCancelRC(false);
            } catch (err) {
                console.log(err);
            }
        }
        cancelRC();
    };
    return (
        <Box
            sx={{
                mt: "1.6rem",
                width: "100%",
                overflow: "hidden",
                borderRadius: "0.8rem",
                boxShadow: "0 0 2rem #e5e5e5",
            }}
        >
            {value.order_detail.map((detail, index) => (
                <PurchaseItem value={detail} key={index} />
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
                T???ng s??? ti???n:{" "}
                <span>
                    {currencyFormat(
                        value.order_detail.reduce(
                            (total, detail) => total + detail.total_price,
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
                        sx={{
                            "&.buttonText": {
                                color: "#ee4f2f",
                            },
                        }}
                        onClick={handleOpenRequestCancel}
                    >
                        H???y
                    </StyledButton>
                )}
                {value.status === "request cancel" && (
                    <StyledButton
                        variant='text'
                        sx={{
                            "&.buttonText": {
                                color: "#ee4f2f",
                            },
                        }}
                        onClick={() => setCancelRC(true)}
                    >
                        Ch??? x??c nh???n h???y
                    </StyledButton>
                )}
                {value.status === "delivering" && (
                    <StyledButton onClick={() => setIsReceived(true)}>
                        ???? nh???n ???????c h??ng
                    </StyledButton>
                )}
                {value.status === "delivered" && !value.is_rated && (
                    <StyledButton onClick={handleOpenRatingForm}>
                        ????nh gi??
                    </StyledButton>
                )}
            </Box>
            <StyledDialog
                className='form'
                open={isReceived}
                onClose={() => setIsReceived(false)}
                sx={{
                    "& .MuiPaper-root": {
                        maxWidth: "40rem",
                    },
                    "& .mess": {
                        m: 0,
                        fontSize: "1.6rem",
                        textAlign: "center",
                    },
                }}
            >
                <DialogTitle>???? nh???n ???????c h??ng</DialogTitle>
                <DialogContent>
                    <p className='mess'>
                        X??c nh???n ???? nh???n ???????c h??ng v?? thanh to??n{" "}
                        {currencyFormat(
                            value.order_detail.reduce(
                                (total, detail) => total + detail.total_price,
                                0,
                            ),
                        )}{" "}
                        cho nh??n vi??n giao h??ng ?
                    </p>
                </DialogContent>
                <DialogActions>
                    <StyledButton variant='text' onClick={onReceived}>
                        ?????ng ??
                    </StyledButton>
                    <StyledButton
                        variant='text'
                        onClick={() => setIsReceived(false)}
                    >
                        H???y
                    </StyledButton>
                </DialogActions>
            </StyledDialog>
            <StyledDialog
                className='form'
                open={cancelRC}
                onClose={() => setCancelRC(false)}
                sx={{
                    "& .MuiPaper-root": {
                        maxWidth: "40rem",
                    },
                    "& .mess": {
                        m: 0,
                        fontSize: "1.6rem",
                        textAlign: "center",
                    },
                }}
            >
                <DialogTitle>H???y y??u c???u h???y ????n h??ng</DialogTitle>
                <DialogContent>
                    <p className='mess'>
                        X??c nh???n h???y y??u c???u h???y ????n h??ng c?? m??{" "}
                        <strong>{value.id}</strong> ?
                    </p>
                </DialogContent>
                <DialogActions>
                    <StyledButton
                        variant='text'
                        onClick={onCancelRequestCancel}
                    >
                        ?????ng ??
                    </StyledButton>
                    <StyledButton
                        variant='text'
                        onClick={() => setCancelRC(false)}
                    >
                        H???y
                    </StyledButton>
                </DialogActions>
            </StyledDialog>
            <StyledDialog
                className='request-cancel-form'
                open={openRequestCancel}
                onClose={handleCloseRequestCancel}
                sx={{
                    "& .MuiPaper-root": {
                        width: "40rem",
                    },
                }}
            >
                <Box
                    component='form'
                    onSubmit={handleSubmit(onRequestCancel)}
                    noValidate
                >
                    <DialogTitle>H???y ????n h??ng</DialogTitle>
                    <DialogContent
                        sx={{
                            flexDirection: "column",
                        }}
                    >
                        <Controller
                            name='reason'
                            control={control}
                            rules={{
                                required: "Vui l??ng ????a ra l?? do t??? ch???i!",
                            }}
                            render={({ field }) => (
                                <TextField
                                    label='L?? do'
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
                            ?????ng ??
                        </StyledButton>
                        <StyledButton
                            variant='text'
                            onClick={handleCloseRequestCancel}
                        >
                            H???y
                        </StyledButton>
                    </DialogActions>
                </Box>
            </StyledDialog>
            <StyledDialog
                className='rating-form'
                open={openRatingForm}
                onClose={handleCloseRatingForm}
                sx={{
                    "& .MuiPaper-root": {
                        width: "40rem",
                    },
                }}
            >
                <Box
                    component='form'
                    onSubmit={handleSubmit(onSendRating)}
                    noValidate
                >
                    <DialogTitle>????nh gi?? s???n ph???m</DialogTitle>
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
                                required: "Vui l??ng ????a ra l?? do t??? ch???i!",
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
                                    label='N???i dung'
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
                            G???i
                        </StyledButton>
                        <StyledButton
                            variant='text'
                            onClick={handleCloseRatingForm}
                        >
                            H???y
                        </StyledButton>
                    </DialogActions>
                </Box>
            </StyledDialog>
            <Snackbar
                open={snackbar.isOpen}
                autoHideDuration={5000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.type}
                    sx={{
                        width: "100%",
                        fontSize: "1.6rem",
                    }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default React.memo(PurchaseOrder);
