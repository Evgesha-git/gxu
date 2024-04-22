import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAction } from "../../hooks/useAction";
import BaseForm from "./BaseForm";
import PatchForm from "./PatchForm";

const Form = () => {
    const { id } = useParams();
    const {loading, formData, error} = useSelector(state => state.form);
    const {getFormData} = useAction();

    useEffect(() => {
        getFormData();
    }, []);

    return (
        <Box className={'form'}>
            {!id && formData && <BaseForm formLines={formData}/>}
            {id && formData && <PatchForm formLines={formData} id={id}/>}
        </Box>
    )
};

export default Form;
