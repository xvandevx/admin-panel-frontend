import React from 'react';
import {Api} from "~/api";
const _ = require('lodash')
import InfoBlock, {FormEditFieldTypes} from "~/components/infoBlock";
import dayjs from "dayjs";
import {PetsFields} from "~/backendTypes/pets";

export default function Pets() {
    const tableItems: PetsFields[] = [
        PetsFields.sort,
        PetsFields.name,
        PetsFields.type,
        PetsFields.startDate,
        PetsFields.endDate,
        PetsFields.github,
    ];

    const editFormItems = [
        {
            name: PetsFields.sort,
            required: true,
            type: FormEditFieldTypes.string,
        },
        {
            name:  PetsFields.name,
            required: true,
            type: FormEditFieldTypes.string,
        },
        {
            name: PetsFields.link,
            type: FormEditFieldTypes.string,
        },
        {
            name: PetsFields.type,
            type: FormEditFieldTypes.string,
        },
        {
            name: PetsFields.description,
            type: FormEditFieldTypes.textarea,
        },
        {
            name: PetsFields.startDate,
            type: FormEditFieldTypes.date,
            picker: "month"
        },
        {
            name: PetsFields.endDate,
            type: FormEditFieldTypes.date,
            picker: "month"
        },
        {
            name: PetsFields.github,
            type: FormEditFieldTypes.string,
        },
    ]

    return (
        <InfoBlock
            tableItems={tableItems}
            getTableItems={Api.pets.get}
            deleteTableItem={Api.pets.delete}
            updateItem={Api.pets.update}
            addItem={Api.pets.add}
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
