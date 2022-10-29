import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { styled } from "@mui/material/styles";
import { Box, IconButton, Link, Menu, MenuItem } from "@mui/material";
import { userLogout } from "../../redux/store/userSlice";
import logo from "../../assets/img/logo.png";
import userAvatar from "../../assets/img/user.png";
import "./header.scss";
const StyledIconButton = styled(IconButton)({
    fontSize: "2.4rem",
    marginLeft: "2rem",
    color: "#666",
    "&:hover": {
        backgroundColor: "inherit",
    },
});
const StyledLink = styled(Link)({
    color: "#495057",
    fontSize: "1.6rem",
    textDecoration: "none",
});
const Header = () => {
    const isLogin = useSelector((state) => state.user.id !== "");
    const [checked, setChecked] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [anchorEl, setAnchorEl] = React.useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const reactLocation = useLocation();

    React.useEffect(() => {
        const handleListenKeyPress = (e) => {
            if (e.key === "Enter") {
                console.log(search);
                setSearch("");
            }
        };
        if (checked && search !== "")
            window.addEventListener("keypress", handleListenKeyPress);

        return () => {
            window.removeEventListener("keypress", handleListenKeyPress);
        };
    }, [search, checked]);
    const handleClickUser = (e) => {
        setAnchorEl(e.target);
    };
    const handleLogout = () => {
        setAnchorEl(null);
        dispatch(userLogout());
        if (reactLocation.pathname.includes("account")) navigate("/login");
        else navigate(reactLocation.pathname);
    };
    return (
        <Box
            sx={{
                p: "1rem 6rem",
                display: "flex",
                alignItems: "center",
                boxShadow: "0 0 1rem #e5e5e5",
            }}
        >
            <Link href='/'>
                <img
                    src={logo}
                    alt='logo'
                    style={{
                        width: "8rem",
                    }}
                />
            </Link>
            <Box
                sx={{
                    display: "flex",
                    flexGrow: 1,
                    ml: "20rem",
                    "& a": {
                        display: "block",
                        color: "#495057",
                        p: "1.5rem 3rem",
                        minWidth: "14rem",
                        fontWeight: 700,
                        fontSize: "1.8rem",
                        textAlign: "center",
                        textDecoration: "none",
                        boxSizing: "border-box",
                        borderRadius: "0.2rem",
                        "&:hover": {
                            color: "#f1f1f1",
                            backgroundColor: "#333",
                        },
                    },
                }}
            >
                <Link href='/'>Trang chủ</Link>
                <Link href='/men'>Nam</Link>
                <Link href='/women'>Nữ</Link>
                <Link href='/accessory'>Phụ Kiện</Link>
                <Link href='/contact'>Liên Hệ</Link>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <input
                    type='checkbox'
                    id='checkbox'
                    checked={checked}
                    readOnly
                />
                <Box className='search-box search'>
                    <label
                        className='search-label'
                        onClick={() => setChecked((prevState) => !prevState)}
                    >
                        <BsSearch />
                    </label>
                    <input
                        className='search-input'
                        placeholder='Tìm kiếm...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Box>
                <StyledLink
                    href='/cart'
                    sx={{
                        color: "#666",
                        fontSize: "2.4rem",
                        ml: "1.4rem",
                    }}
                >
                    <FaShoppingCart />
                </StyledLink>
                <StyledIconButton onClick={handleClickUser}>
                    <img
                        src={userAvatar}
                        alt='user'
                        style={{
                            width: "3.2rem",
                            borderRadius: "50%",
                        }}
                    />
                </StyledIconButton>
                {!isLogin ? (
                    <Menu
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={() => setAnchorEl(null)}
                        sx={{
                            ml: "-2rem",
                            mt: "1rem",
                            "& li": {
                                minWidth: "14rem",
                            },
                        }}
                    >
                        <MenuItem>
                            <StyledLink href='/login'>Đăng nhập</StyledLink>
                        </MenuItem>
                        <MenuItem>
                            <StyledLink href='/register'>Đăng ký</StyledLink>
                        </MenuItem>
                    </Menu>
                ) : (
                    <Menu
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={() => setAnchorEl(null)}
                        sx={{
                            ml: "-2rem",
                            mt: "1rem",
                            "& li": {
                                minWidth: "14rem",
                            },
                        }}
                    >
                        <MenuItem>
                            <StyledLink href='/account/profile'>
                                Tài khoản của tôi
                            </StyledLink>
                        </MenuItem>
                        <MenuItem>
                            <StyledLink href='/account/purchase'>
                                Đơn mua
                            </StyledLink>
                        </MenuItem>
                        <MenuItem>
                            <StyledLink onClick={handleLogout}>
                                Đăng xuất
                            </StyledLink>
                        </MenuItem>
                    </Menu>
                )}
            </Box>
        </Box>
    );
};

export default Header;
