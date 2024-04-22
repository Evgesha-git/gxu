import { TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";

const ComposeTextField = (props) => {
    const { name, id, ...restProps } = props;
    const [field] = useField(name);
    const {
        setFieldValue,
        values: { data },
    } = useFormikContext();

    useEffect(() => {
        const item = data.find((item) => item.nsi_pers_young_spec_id === id)
        setFieldValue(name, +item.distribution_count + +item.target_count);
    }, [data.find((item) => item.nsi_pers_young_spec_id === id).distribution_count, data.find((item) => item.nsi_pers_young_spec_id === id).target_count]);


    return <TextField {...restProps} onChange={(e) => setFieldValue(name, e.target.value)} value={field.value} />;
};

export default ComposeTextField;
