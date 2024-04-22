import React, { useEffect, useState } from "react";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import Box from "@mui/material/Box";
import Period from "./Period";
import Status from "./Status";
import { Button, ButtonGroup, IconButton } from "@mui/material";
import { FilterList, ChevronLeft, ChevronRight } from "@mui/icons-material";
import Filters from "./Filters";
import { useNavigate } from "react-router-dom";
import './table.scss'

const sortFn = (row, columnId, filterValue) => {
    const sD = new Date(row.original.rep_beg_period);
    const eD = new Date(row.original.rep_end_period);
    return sD - eD;
};

const columns = [
    {
        accessorKey: "f_pers_young_spec_id",
        header: "Id",
        cell: (props) => <p>{props.getValue()}</p>,
        size: 30,
        enableSorting: false,
    },
    {
        accessorKey: "rep_beg_period",
        header: "За период",
        cell: Period,
        enableColumnFilter: true,
        filterFn: sortFn,
    },
    {
        accessorKey: "org_employee",
        header: "Организация",
        cell: (props) => <p>{props.getValue()}</p>,
        size: 550,
        enableColumnFilter: true,
        filterFn: "includesString",
    },
    {
        accessorKey: "rep_end_period",
        header: "Статус",
        cell: Status,
        size: 150,
        enableColumnFilter: true,
        filterFn: "datetime",
    },
];

const TableBox = (props) => {
    const { data } = props;
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const navigate = useNavigate();

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        columnResizeMode: "onChange",
        state: {
            columnFilters,
            columnVisibility,
        },
    });

    const linkHandler = (id) => {
        navigate(`/add_data/${id}`);
    };

    return (
        <Box>
            <Box className='header'>
                <Filters columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
                <Box className="columnFilter">
                    <Box className="filterItem">
                        <label>
                            <input
                                {...{
                                    type: "checkbox",
                                    checked: table.getIsAllColumnsVisible(),
                                    onChange: table.getToggleAllColumnsVisibilityHandler(),
                                }}
                            />{" "}
                            Toggle All
                        </label>
                    </Box>
                    {table.getAllLeafColumns().map((column) => {
                        return (
                            <Box key={column.id} className="filterItem">
                                <label>
                                    <input
                                        {...{
                                            type: "checkbox",
                                            checked: column.getIsVisible(),
                                            onChange: column.getToggleVisibilityHandler(),
                                        }}
                                    />{" "}
                                    {column.columnDef.header}
                                </label>
                            </Box>
                        );
                    })}
                </Box>
                <Button variant="contained" onClick={() => navigate("/add_data")}>
                    Добавить запись
                </Button>
            </Box>
            <Box className={"table"} width={table.getTotalSize()}>
                {table.getHeaderGroups().map((headerGroup) => (
                    <Box className={"tr"} key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <Box key={header.id} className={"th"} width={header.getSize()}>
                                {header.column.columnDef.header}
                                {header.column.getCanSort() && (
                                    <IconButton onClick={header.column.getToggleSortingHandler()}>
                                        <FilterList />
                                    </IconButton>
                                )}
                                <Box onMouseDown={header.getResizeHandler()} onTouchStart={header.getResizeHandler()} className={`resizer ${header.column.getIsResizing() ? "isResizing" : ""}`} />
                            </Box>
                        ))}
                    </Box>
                ))}
                {table.getRowModel().rows.map((row) => (
                    <Box className={"tr"} key={row.id} onClick={() => linkHandler(row.original.f_pers_young_spec_id)}>
                        {row.getVisibleCells().map((cell) => (
                            <Box className={"td"} key={cell.id} width={cell.column.getSize()}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </Box>
                        ))}
                    </Box>
                ))}
            </Box>
            <Box className={"pagination"}>
                <Box className={"count"}>
                    Page {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
                </Box>
                <ButtonGroup>
                    <Button variant="contained" startIcon={<ChevronLeft />} onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} />
                    <Button variant="contained" startIcon={<ChevronRight />} onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} />
                </ButtonGroup>
            </Box>
        </Box>
    );
};

export default TableBox;
