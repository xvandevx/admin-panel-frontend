import React from 'react';
import {Api} from "~/api";
const _ = require('lodash')
import InfoBlock, {FormEditFieldTypes} from "~/components/infoBlock";
import dayjs from "dayjs";
import {EducationFields} from "~/backendTypes/education";

export default function Edications() {
    const tableItems: EducationFields[] = [
        EducationFields.sort,
        EducationFields.universityName,
        EducationFields.speciality,
        EducationFields.startDate,
        EducationFields.endDate,
        EducationFields.location,
    ];

    const editFormItems = [
        {
            name: EducationFields.sort,
            required: true,
            type: FormEditFieldTypes.string,
        },
        {
            name:  EducationFields.universityName,
            required: true,
            type: FormEditFieldTypes.string,
        },
        {
            name: EducationFields.link,
            type: FormEditFieldTypes.string,
        },
        {
            name: EducationFields.speciality,
            type: FormEditFieldTypes.string,
        },
        {
            name: EducationFields.description,
            type: FormEditFieldTypes.textarea,
        },
        {
            name: EducationFields.startDate,
            type: FormEditFieldTypes.date,
            picker: "month"
        },
        {
            name: EducationFields.endDate,
            type: FormEditFieldTypes.date,
            picker: "month"
        },
        {
            name: EducationFields.location,
            type: FormEditFieldTypes.string,
        },
    ]

    return (
        <InfoBlock
            tableItems={tableItems}
            getTableItems={Api.educations.get}
            deleteTableItem={Api.educations.delete}
            updateItem={Api.educations.update}
            addItem={Api.educations.add}
            prepareFormFields={(record: any) => {
                const data =  _.cloneDeep(record)
                data.endDate = data.endDate ? dayjs(data.endDate) : ''
                data.startDate = data.startDate ? dayjs(data.startDate) : ''
                return data
            }}
            editFormItems={editFormItems}
        />
    )
}
