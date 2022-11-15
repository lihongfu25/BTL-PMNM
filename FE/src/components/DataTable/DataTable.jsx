import React from "react";
import { Link, Pagination } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import "./dataTable.scss";
const DataTable = ({ columns, data, className }) => {
    const [page, setPage] = React.useState(1);
    const navigate = useNavigate();
    const path = useLocation().pathname;
    const handleGoToDetail = (id) => {
        navigate(path + "/" + id);
    };
    const handleChangePage = (e, value) => {
        setPage(value);
    };
    return (
        <table className={`table ${className}`}>
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
                {data
                    .filter(
                        (row, i) => i >= 10 * (page - 1) && i <= 10 * page - 1,
                    )
                    .map((row, index) => (
                        <tr
                            key={index}
                            className={index % 2 === 0 ? "even" : "odd"}
                        >
                            {Object.values(row).map((value, index) => (
                                <td key={index}>{value}</td>
                            ))}
                            <td className='go-to-detail' align='center'>
                                <Link
                                    underline='hover'
                                    onClick={() => handleGoToDetail(row.id)}
                                >
                                    Xem
                                </Link>
                            </td>
                        </tr>
                    ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={Object.keys(columns).length + 1}>
                        <Pagination
                            count={Math.floor(data.length / 10) + 1}
                            variant='outlined'
                            shape='rounded'
                            page={page}
                            onChange={handleChangePage}
                        />
                    </td>
                </tr>
            </tfoot>
        </table>
    );
};

export default DataTable;
