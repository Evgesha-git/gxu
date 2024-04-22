import { TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";
import React from "react";

const FormikTextField = (props) => {
    const { name, ...restProps } = props;
    const [field] = useField(name);
    const { setFieldValue } = useFormikContext();

    return <TextField {...restProps} onChange={(e) => {
        setFieldValue(name, e.target.value)
    }} value={field.value} />;
};

export default FormikTextField;