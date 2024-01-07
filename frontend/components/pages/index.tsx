import React from 'react';
import {Api} from "~/api";
import InfoBlock from "~/components/infoBlock";
import _ from "lodash";

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

export default function Pages() {
    const tableItems: string[] = [
        'title',
        'code',
        'h1',
        'description'
    ];

    const editFormItems = [
        {
            name: 'title',
            required: true,
            type: 'string',
        },
        {
            name: 'code',
            required: true,
            type: 'string',
        },
        {
            name: 'h1',
            type: 'string',
        },
        {
            name: 'description',
            type: 'textarea',
        },
    ]

    return (
        <InfoBlock
            tableItems={tableItems}
            getTableItems={Api.pages.get}
            deleteTableItem={Api.pages.delete}
            updateItem={Api.pages.update}
            addItem={Api.pages.add}
            prepareFormFields={(record: any) => {
                const data =  _.cloneDeep(record)
                return data
            }}
            editFormItems={editFormItems}
        />
    )
}
