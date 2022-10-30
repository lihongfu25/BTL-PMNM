import React from "react";
import { Box } from "@mui/material";
import { Input } from "../../components/Input";
const Cart = () => {
	return (
		<Box
			className="grid-wide"
			sx={{
				mt: "6rem",
			}}
		>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<Box
					sx={{
						display: "flex",
						fontSize: "3rem",
						"& > h3": {
							m: 0,
						},
					}}
				>
					<h3 className="textColor">360 Store</h3>
					<Box
						sx={{
							mx: "3rem",
							width: "0.4rem",
							height: "100%",
							borderRadius: "0.4rem",
							backgroundImage: "linear-gradient(45deg, #485563, #29323c)",
						}}
					></Box>
					<h3 className="textColor">Cart</h3>
				</Box>
				<Box>
					<Input
						className="textColor"
						placeholder="Tìm kiếm"
						sx={{
							height: "100%",
							minWidth: "40rem",
							fontSize: "1.6rem",
						}}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default Cart;
