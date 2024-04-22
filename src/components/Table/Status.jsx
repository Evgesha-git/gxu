import React, { useEffect, useState } from "react";
import { monts } from "../../utils/monts";

const Status = (props) => {
    const { row } = props;
    const [status, setStatus] = useState('');


    useEffect(() => {
        const statusDate = new Date(row.original.rep_end_period);
        const now = new Date();
        setStatus(statusDate < now);
    });


    return <p className={`status ${status ? 'active' : 'end'}`}>{status ? 'В работе' : 'Завершён'}</p>;
};

export default Status;