import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
    Box,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { Input } from "../../components/Input";
import { userUpdateProfile } from "../../redux/store/userSlice";
import avatar from "../../assets/img/user.png";
import { Button } from "../../components/Button";
const StyledBox = styled(Box)({
    display: "grid",
    gap: "1.5rem",
});
const StyledTypography = styled(Typography)({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    fontFamily: "Nunito!important",
    fontSize: "1.4rem",
    color: "#495057",
});
const StyledInput = styled(Input)({
    fontSize: "1.4rem",
    width: "80%",
});
const ChangePassInput = styled(Input)({
    width: "100%",
    marginBottom: "1rem",
});
const StyledButton = styled(Button)({
    minWidth: "8rem",
    textTransform: "none",
});
const Profile = () => {
    document.title = "Hồ sơ của tôi | 360 Store";
    const user = useSelector((state) => state.user);
    const [image, setImage] = React.useState();
    const [preview, setPreview] = React.useState(avatar);
    const [userInfo, setUserInfo] = React.useState(user);
    const [openChangePass, setOpenChangePass] = React.useState(false);
    const [password, setPassword] = React.useState({
        oldPass: "",
        newPass: "",
        repeatPass: "",
    });
    const avatarRef = React.useRef();

    const dispatch = useDispatch();
    const handleSubmitProfile = () => {
        dispatch(userUpdateProfile(userInfo));
    };
    const handleChangePass = () => {
        setOpenChangePass(false);
        console.log(password);
    };
    React.useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(image);
        } else {
            setPreview(avatar);
        }
    }, [image]);
    return (
        <Box
            sx={{
                p: "2.4rem",
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    color: "#495057",
                    borderBottom: "2px solid #e5e5e5",
                    "& h3": {
                        fontSize: "3rem",
                        fontWeight: 500,
                    },
                    "& p": {
                        fontSize: "1.8rem",
                        my: "0.8rem",
                    },
                    "& a": {
                        fontSize: "1.6rem",
                        position: "absolute",
                        right: "2rem",
                        bottom: "2rem",
                    },
                }}
            >
                <Typography variant='h3' className='useFont-Nunito'>
                    Hồ Sơ Của Tôi
                </Typography>
                <Typography className='useFont-Nunito'>
                    Quản lý thông tin hồ sơ để bảo mật tài khoản
                </Typography>
                <Link onClick={() => setOpenChangePass(true)}>
                    Đổi mật khẩu
                </Link>
            </Box>
            <Dialog
                open={openChangePass}
                onClose={() => setOpenChangePass(false)}
                sx={{
                    transform: "translatey(-10rem)",
                    "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
                        minWidth: "40rem",
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        color: "#495057",
                        fontSize: "2.4rem",
                        fontFamily: "Nunito",
                    }}
                >
                    Thay đổi mật khẩu
                </DialogTitle>
                <DialogContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        pb: "1rem",
                    }}
                >
                    <ChangePassInput
                        placeholder='Mật khẩu cũ'
                        value={password.oldPass}
                        onChange={(e) =>
                            setPassword((prevState) => ({
                                ...prevState,
                                oldPass: e.target.value,
                            }))
                        }
                    />
                    <ChangePassInput
                        placeholder='Mật khẩu mới'
                        value={password.newPass}
                        onChange={(e) =>
                            setPassword((prevState) => ({
                                ...prevState,
                                newPass: e.target.value,
                            }))
                        }
                    />
                    <ChangePassInput
                        placeholder='Nhập lại mật khẩu mới'
                        value={password.repeatPass}
                        onChange={(e) =>
                            setPassword((prevState) => ({
                                ...prevState,
                                repeatPass: e.target.value,
                            }))
                        }
                    />
                </DialogContent>
                <DialogActions
                    sx={{
                        pb: "2rem",
                        px: "2.4rem",
                        "& button:not(:first-of-type)": {
                            ml: "2rem",
                        },
                    }}
                >
                    <StyledButton onClick={handleChangePass}>Lưu</StyledButton>
                    <StyledButton onClick={() => setOpenChangePass(false)}>
                        Hủy
                    </StyledButton>
                </DialogActions>
            </Dialog>
            <Box
                sx={{
                    display: "flex",
                    position: "relative",
                }}
            >
                <Box
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        borderRight: "1px solid #e5e5e5",
                        m: "2.4rem",
                    }}
                >
                    <StyledBox
                        sx={{
                            float: "right",
                        }}
                    >
                        <StyledTypography>Tên đăng nhập</StyledTypography>
                        <StyledTypography>Họ tên</StyledTypography>
                        <StyledTypography>Email</StyledTypography>
                        <StyledTypography>Số điện thoại</StyledTypography>
                        <StyledTypography>Địa chỉ</StyledTypography>
                        <StyledTypography>Giới tính</StyledTypography>
                        <StyledTypography>Ngày sinh</StyledTypography>
                    </StyledBox>
                    <StyledBox
                        sx={{
                            flexGrow: 1,
                            ml: "3rem",
                        }}
                    >
                        {user.username !== "" ? (
                            <Typography
                                className='useFont-Nunito'
                                sx={{
                                    fontSize: "1.4rem",
                                    color: "#495057",
                                    p: "0.8rem 1.2rem",
                                }}
                            >
                                {user.username}
                            </Typography>
                        ) : (
                            <StyledInput
                                placeholder='Tên đăng nhập'
                                value={userInfo.username}
                                onChange={(e) =>
                                    setUserInfo((prevState) => ({
                                        ...prevState,
                                        username: e.target.value,
                                    }))
                                }
                            />
                        )}
                        <StyledInput
                            placeholder='Họ tên'
                            value={userInfo.name}
                            onChange={(e) =>
                                setUserInfo((prevState) => ({
                                    ...prevState,
                                    name: e.target.value,
                                }))
                            }
                        />
                        <StyledInput
                            placeholder='Email'
                            value={userInfo.email}
                            onChange={(e) =>
                                setUserInfo((prevState) => ({
                                    ...prevState,
                                    email: e.target.value,
                                }))
                            }
                        />
                        <StyledInput
                            placeholder='Số điện thoại'
                            value={userInfo.phone}
                            onChange={(e) =>
                                setUserInfo((prevState) => ({
                                    ...prevState,
                                    phone: e.target.value,
                                }))
                            }
                        />
                        <StyledInput
                            placeholder='Địa chỉ'
                            value={userInfo.address}
                            onChange={(e) =>
                                setUserInfo((prevState) => ({
                                    ...prevState,
                                    address: e.target.value,
                                }))
                            }
                        />
                        <RadioGroup
                            row
                            value={userInfo.gender}
                            onChange={(e) =>
                                setUserInfo((prevState) => ({
                                    ...prevState,
                                    gender: e.target.value,
                                }))
                            }
                            sx={{
                                width: "80%",
                                "& .MuiSvgIcon-root": {
                                    fontSize: "1.8rem",
                                },
                                "& .MuiTypography-root": {
                                    fontSize: "1.4rem",
                                    color: "#495057",
                                },
                            }}
                        >
                            <FormControlLabel
                                value='Nam'
                                control={<Radio />}
                                label='Nam'
                            />
                            <FormControlLabel
                                value='Nữ'
                                control={<Radio />}
                                label='Nữ'
                            />
                            <FormControlLabel
                                value='Khác'
                                control={<Radio />}
                                label='Khác'
                            />
                        </RadioGroup>
                        <StyledInput
                            placeholder='Ngày sinh'
                            type='date'
                            value={userInfo.birthOfDate}
                            onChange={(e) =>
                                setUserInfo((prevState) => ({
                                    ...prevState,
                                    birthOfDate: e.target.value,
                                }))
                            }
                        />
                    </StyledBox>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        width: "20rem",
                        "& input[type='file']": {
                            display: "none",
                        },
                        "& button": {
                            mt: "1rem",
                            cursor: "pointer",
                            p: "0.8rem 1.6rem",
                            backgroundColor: "#fff",
                            borderRadius: "0.4rem",
                            border: "1px solid #ccc",
                        },
                        "& img": {
                            mt: "4rem",
                            width: "12rem",
                            height: "12rem",
                            borderRadius: "50%",
                            objectFit: "cover",
                        },
                    }}
                >
                    <img src={preview} alt='' />
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            avatarRef.current.click();
                        }}
                    >
                        Chọn Ảnh
                    </button>
                    <input
                        type='file'
                        ref={avatarRef}
                        accept='image/*'
                        onChange={(e) => {
                            const newAvatar = e.target.files[0];
                            if (newAvatar) setImage(newAvatar);
                        }}
                    />
                </Box>
            </Box>
            <Button
                sx={{
                    minWidth: "10rem",
                    textTransform: "none",
                    ml: "15rem",
                }}
                onClick={handleSubmitProfile}
            >
                Lưu
            </Button>
        </Box>
    );
};

export default Profile;
