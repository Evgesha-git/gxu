import React from "react";
import { Field, ErrorMessage, useField, useFormikContext } from "formik";
import { DatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import dayjs from "dayjs";

const MyDatePicker = (props) => {
    const { name, ...restProps } = props;
    const [field] = useField(name);
    const { setFieldValue } = useFormikContext();

    return <DatePicker {...restProps} value={dayjs(field.value)} onChange={(val) => setFieldValue(name, val)} />;
};

export default MyDatePicker;
