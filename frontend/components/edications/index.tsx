import React, {useEffect, useMemo, useState} from 'react';
import {Table, Tag, message, Popconfirm, Radio} from 'antd';
import {Api} from "~/api";
const _ = require('lodash')
import InfoBlock from "~/components/infoBlock";
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
            type: 'string',
        },
        {
            name: 'universityName',
            required: true,
            type: 'string',
        },
        {
            name: 'link',
            type: 'string',
        },
        {
            name: 'speciality',
            type: 'string',
        },
        {
            name: 'description',
            type: 'textarea',
        },
        {
            name: 'startDate',
            type: 'date',
            picker: "month"
        },
        {
            name: 'endDate',
            type: 'date',
            picker: "month"
        },
        {
            name: 'location',
            type: 'string',
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
