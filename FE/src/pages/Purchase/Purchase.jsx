import React from "react";
import { Box } from "@mui/material";
import NoOrders from "./NoOrders";
import { PurchaseOrder } from "./PurchaseOrder";
const datas = [
    {
        id: "1",
        status: "wait",
        products: [
            {
                id: "1",
                name: "Sản phẩm 1",
                size: "L",
                color: "red",
                quantity: 1,
                price: 123456,
                img: "https://bizweb.dktcdn.net/thumb/large/100/415/697/products/ed27fa4d-1f51-4593-9f94-a7f2c15e162c-fd991ced-c148-42e8-86b9-a89e92f5d39b.jpg?v=1660306346000",
            },
            {
                id: "2",
                name: "Sản phẩm 1",
                size: "L",
                color: "red",
                quantity: 1,
                price: 123456,
                img: "https://bizweb.dktcdn.net/thumb/large/100/415/697/products/ed27fa4d-1f51-4593-9f94-a7f2c15e162c-fd991ced-c148-42e8-86b9-a89e92f5d39b.jpg?v=1660306346000",
            },
        ],
    },
    {
        id: "2",
        status: "delivering",
        products: [
            {
                id: "1",
                name: "Sản phẩm 1",
                size: "L",
                color: "red",
                quantity: 1,
                price: 123456,
                img: "https://bizweb.dktcdn.net/thumb/large/100/415/697/products/ed27fa4d-1f51-4593-9f94-a7f2c15e162c-fd991ced-c148-42e8-86b9-a89e92f5d39b.jpg?v=1660306346000",
            },
            {
                id: "2",
                name: "Sản phẩm 1",
                size: "L",
                color: "red",
                quantity: 1,
                price: 123456,
                img: "https://bizweb.dktcdn.net/thumb/large/100/415/697/products/ed27fa4d-1f51-4593-9f94-a7f2c15e162c-fd991ced-c148-42e8-86b9-a89e92f5d39b.jpg?v=1660306346000",
            },
        ],
    },
    {
        id: "3",
        status: "wait",
        products: [
            {
                id: "1",
                name: "Sản phẩm 1",
                size: "L",
                color: "red",
                quantity: 1,
                price: 123456,
                img: "https://bizweb.dktcdn.net/thumb/large/100/415/697/products/ed27fa4d-1f51-4593-9f94-a7f2c15e162c-fd991ced-c148-42e8-86b9-a89e92f5d39b.jpg?v=1660306346000",
            },
            {
                id: "2",
                name: "Sản phẩm 1",
                size: "L",
                color: "red",
                quantity: 1,
                price: 123456,
                img: "https://bizweb.dktcdn.net/thumb/large/100/415/697/products/ed27fa4d-1f51-4593-9f94-a7f2c15e162c-fd991ced-c148-42e8-86b9-a89e92f5d39b.jpg?v=1660306346000",
            },
        ],
    },
    {
        id: "4",
        status: "wait",
        products: [
            {
                id: "1",
                name: "Sản phẩm 1",
                size: "L",
                color: "red",
                quantity: 1,
                price: 123456,
                img: "https://bizweb.dktcdn.net/thumb/large/100/415/697/products/ed27fa4d-1f51-4593-9f94-a7f2c15e162c-fd991ced-c148-42e8-86b9-a89e92f5d39b.jpg?v=1660306346000",
            },
            {
                id: "2",
                name: "Sản phẩm 1",
                size: "L",
                color: "red",
                quantity: 1,
                price: 123456,
                img: "https://bizweb.dktcdn.net/thumb/large/100/415/697/products/ed27fa4d-1f51-4593-9f94-a7f2c15e162c-fd991ced-c148-42e8-86b9-a89e92f5d39b.jpg?v=1660306346000",
            },
        ],
    },
    {
        id: "5",
        status: "prepare",
        products: [
            {
                id: "1",
                name: "Sản phẩm 1",
                size: "L",
                color: "red",
                quantity: 1,
                price: 123456,
                img: "https://bizweb.dktcdn.net/thumb/large/100/415/697/products/ed27fa4d-1f51-4593-9f94-a7f2c15e162c-fd991ced-c148-42e8-86b9-a89e92f5d39b.jpg?v=1660306346000",
            },
            {
                id: "2",
                name: "Sản phẩm 1",
                size: "L",
                color: "red",
                quantity: 1,
                price: 123456,
                img: "https://bizweb.dktcdn.net/thumb/large/100/415/697/products/ed27fa4d-1f51-4593-9f94-a7f2c15e162c-fd991ced-c148-42e8-86b9-a89e92f5d39b.jpg?v=1660306346000",
            },
        ],
    },
];
const tabs = [
    {
        value: "wait",
        label: "Chờ xác nhận",
    },
    {
        value: "prepare",
        label: "Chờ lấy hàng",
    },
    {
        value: "delivering",
        label: "Đang giao",
    },
    {
        value: "delivered",
        label: "Đã giao",
    },
    {
        value: "canceled",
        label: "Đã hủy",
    },
];
const Purchase = () => {
    document.title = "Đơn mua | 360 Store";
    const [currentTab, setCurrentTab] = React.useState("wait");

    const handleChangeTab = (e) => {
        setCurrentTab(e.target.getAttribute("value"));
    };
    React.useEffect(() => {
        const tabActive = document.querySelector(".tab.active");
        const line = document.querySelector(".line");
        line.style.left = tabActive.offsetLeft + "px";
    }, [currentTab]);
    return (
        <Box
            sx={{
                p: "2.4rem",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    pb: "0.4rem",
                    width: "100%",
                    display: "flex",
                    overflow: "hiden",
                    position: "relative",
                    borderRadius: "0.4rem",
                    boxShadow:
                        "-1rem -1rem 4rem #edeff1, 1rem 1rem 4rem #edeff1",
                    "& .line": {
                        width: "20%",
                        py: "0.2rem",
                        bottom: "0",
                        position: "absolute",
                        borderRadius: "0.4rem",
                        transition: "all 0.5s ease",
                        background:
                            "linear-gradient(to right, #859398, #283048)",
                    },
                    "& .tab": {
                        m: 0,
                        py: "1.2rem",
                        width: "20%",
                        border: "none",
                        color: "#999",
                        fontWeight: 700,
                        cursor: "pointer",
                        fontSize: "1.6rem",
                        textAlign: "center",
                        textDecoration: "none",
                        borderRadius: "0.2rem",
                        "&:hover": {
                            color: "#495057",
                        },
                    },
                    "& .tab.active": {
                        color: "#495057",
                    },
                }}
            >
                {tabs.map((tab) => (
                    <label
                        value={tab.value}
                        key={tab.value}
                        onClick={handleChangeTab}
                        className={
                            tab.value === currentTab ? "tab active" : "tab"
                        }
                    >
                        {tab.label}
                    </label>
                ))}
                <div className='line'></div>
            </Box>
            {datas.filter((data) => data.status === currentTab).length === 0 ? (
                <NoOrders />
            ) : (
                datas
                    .filter((data) => data.status === currentTab)
                    .map((data) => <PurchaseOrder value={data} key={data.id} />)
            )}
        </Box>
    );
};

export default Purchase;
