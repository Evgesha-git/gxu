import { Box,  Input } from "@mui/material";
import Search from "@mui/icons-material/Search";
import React from "react";
import './filters.scss';

const Filters = ({columnFilters, setColumnFilters}) => {

    const onFilterChange = (id, value) => {
        setColumnFilters((prev) => prev.filter(f => f.id !== id).concat({id, value}))
    }

    return (
        <Box className={'filter'}>
            <div className="filterContent">
                <Input onChange={(e) => onFilterChange('org_employee', e.target.value)} startAdornment={<Search/>}/> 
            </div>
        </Box>
    )
}

export default Filters