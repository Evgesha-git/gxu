import React, { useEffect, useState } from "react";
import { monts } from "../../utils/monts";

const Period = (props) => {
    const { row } = props;
    const [starDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const sD = new Date(row.original.rep_beg_period);
        const eD = new Date(row.original.rep_end_period);
        setStartDate(sD.getMonth());
        setEndDate(eD.getMonth())
    })

    return <p>{monts[starDate]} - {monts[endDate]}</p>;
};

export default Period;
