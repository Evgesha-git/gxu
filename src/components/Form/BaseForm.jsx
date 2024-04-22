import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik, Form, Field, FieldArray } from "formik";
import { object, string, date } from "yup";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MyDatePicker from "./MyDatePiker";
import FormikTextField from "./FormikTextField";
import ComposeTextField from "./ComposeTextField";
import { useAction } from "../../hooks/useAction";
import dayjs from "dayjs";


const BaseForm = ({ formLines }) => {
    const formValidate = object().shape({
        insert_date: date().default(() => new Date()),
        insert_user: string().min(2, "Минимум 2 символа").max(50, "Максимум 50 символов").required("Обязательное поле"),
        org_employee: string()
            .min(5, "Поле должно содержать минимум 5 символов")
            .matches(/(:?[a-z-A-Zа-яёА-ЯЁ]+)+\s+\s*(:?\+?\s*(375|80)\(?(:?25|29|33|44|17|16|21|23|15|22)\)?\d{3}-?\d{2}-?\d{2})?/, "Некорректное заполнение")
            .required("Обязательное поле"),
        rep_beg_period: date().required("Обязательное поле"),
        rep_end_period: date().required("Обязательное поле"),
        update_date: date().default(() => new Date()),
        update_user: string(),
    });
    const { setDataItem } = useAction();

    const initData = formLines.reduce((rez, item) => [...rez, { ...item, target_count: 0, distribution_count: 0, all_count: 0 }], []);

    const formHandler = (values) => {
        const user = {
            insert_date: dayjs(new Date()).format('YYYY-MM-DDThh:mm:ss.SSSSSSZ'),
            insert_user: values.insert_user,
            org_employee: values.org_employee,
            rep_beg_period: values.rep_beg_period["$d"].toLocaleDateString().replace(/(\d{2}).(\d{2}).(\d{4})/, "$3-$2-$1"),
            rep_end_period: values.rep_end_period["$d"].toLocaleDateString().replace(/(\d{2}).(\d{2}).(\d{4})/, "$3-$2-$1"),
            update_date: dayjs(new Date()).format('YYYY-MM-DDThh:mm:ss.SSSSSSZ'),
            update_user: "string",
        };
        const data = {
            target_count: values.data.reduce((acc, item) => (acc += +item.target_count), 0),
            distribution_count: values.data.reduce((acc, item) => (acc += +item.distribution_count), 0),
            update_date: new Date().toISOString(),
            update_user: values.insert_user,
            nsi_pers_indicate_id: 1,
            f_pers_young_spec_id: 1,
        };
        console.log(dayjs(new Date()).format('YYYY-MM-DDThh:mm:ss.SSSSSSZ'));
        setDataItem(data, user);
    };

    return (
        <Box className={'form'}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Formik
                    initialValues={{
                        insert_user: "",
                        org_employee: "",
                        rep_beg_period: "",
                        rep_end_period: "",
                        data: [...initData],
                    }}
                    validationSchema={formValidate}
                    onSubmit={formHandler}
                >
                    {({ values }) => (
                        <Form>
                            <Box className={'inputRow'}>
                                <MyDatePicker label="Дата начала отчетного периода" name="rep_beg_period" format="DD MMMM YYYY" renderInput={(params) => <TextField {...params} label={"Начало"} />} />
                                <MyDatePicker
                                    label="Дата окончания отчетного периода"
                                    name="rep_end_period"
                                    format="DD MMMM YYYY"
                                    renderInput={(params) => <TextField {...params} label={"Окончание"} />}
                                />
                            </Box>
                            <Box className={'inputRow'}>
                                <FormikTextField label="Имя пользователя который добавил запись" name="insert_user" />
                                <FormikTextField label="ФИО и контактные данные сотрудника организации для связи" name="org_employee" />
                            </Box>
                            <Box>
                                <table>
                                    <thead>
                                        <tr>
                                            <th rowSpan={2}>Наименование показателя</th>
                                            <th rowSpan={2}>Общее количество молодых специалистов</th>
                                            <th colSpan={2}>категория, источник приема на работу</th>
                                        </tr>
                                        <tr>
                                            <th>целевое</th>
                                            <th>распределение</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <FieldArray name="data">
                                            <>
                                                {console.log(values.data)}
                                                {values.data.map((item, index) => (
                                                    <tr key={item.nsi_pers_young_spec_id}>
                                                        <td>
                                                            {item.name}, {index}
                                                        </td>
                                                        <td>
                                                            <ComposeTextField disabled id={item.nsi_pers_young_spec_id} name={`data.${item.nsi_pers_young_spec_id - 1}.all_count`} />
                                                        </td>
                                                        <td>
                                                            <FormikTextField type="number" name={`data.${item.nsi_pers_young_spec_id - 1}.target_count`} />
                                                        </td>
                                                        <td>
                                                            <FormikTextField type="number" name={`data.${item.nsi_pers_young_spec_id - 1}.distribution_count`} />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </>
                                        </FieldArray>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td>&nbsp;</td>
                                            <td>{values.data.reduce((acc, item) => (acc += +item.all_count), 0)}</td>
                                            <td>{values.data.reduce((acc, item) => (acc += +item.target_count), 0)}</td>
                                            <td>{values.data.reduce((acc, item) => (acc += +item.distribution_count), 0)}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </Box>
                            <Button type="submit" variant="contained">
                                Сохранить
                            </Button>
                        </Form>
                    )}
                </Formik>
            </LocalizationProvider>
        </Box>
    );
};

export default BaseForm;
