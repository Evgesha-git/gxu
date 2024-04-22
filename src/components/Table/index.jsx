import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAction } from "../../hooks/useAction";
import { Box } from "@mui/material";
import TableBox from "./TableBox";

const Table = () => {
    const { loading, lineData, error } = useSelector((state) => state.lines);
    const { getLinesData } = useAction();

    useEffect(() => {
        getLinesData();
    }, []);

    return (
        <Box >
            {lineData && <TableBox data={lineData}/>}
        </Box>
    )
}

export default Table;