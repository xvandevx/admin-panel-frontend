import React from 'react';
import {Api} from "~/api";
const _ = require('lodash')
import InfoBlock, {FormEditFieldTypes} from "~/components/infoBlock";
import dayjs from "dayjs";

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

export default function Edications() {
    const tableItems: string[] = [
        'sort',
        'universityName',
        'speciality',
        'startDate',
        'endDate',
        'location',
    ];

    const editFormItems = [
        {
            name: 'sort',
            required: true,
            type: FormEditFieldTypes.string,
        },
        {
            name: 'universityName',
            required: true,
            type: FormEditFieldTypes.string,
        },
        {
            name: 'link',
            type: FormEditFieldTypes.string,
        },
        {
            name: 'speciality',
            type: FormEditFieldTypes.string,
        },
        {
            name: 'description',
            type: FormEditFieldTypes.textarea,
        },
        {
            name: 'startDate',
            type: FormEditFieldTypes.date,
            picker: "month"
        },
        {
            name: 'endDate',
            type: FormEditFieldTypes.date,
            picker: "month"
        },
        {
            name: 'location',
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
