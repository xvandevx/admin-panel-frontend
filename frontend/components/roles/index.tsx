import React from 'react';
import {Api} from "~/api";
import InfoBlock from "~/components/infoBlock";
const _ = require('lodash');

export default function Roles() {
    const tableItems: string[] = [
        'name',
    ];

    const editFormItems = [
        {
            name: 'name',
            required: true,
            type: 'string',
        },
    ]

    return (
        <InfoBlock
            tableItems={tableItems}
            getTableItems={Api.roles.get}
            deleteTableItem={Api.roles.delete}
            updateItem={Api.roles.update}
            addItem={Api.roles.add}
            prepareFormFields={(record: any) => {
                const data =  _.cloneDeep(record)
                return data
            }}
            editFormItems={editFormItems}
        />
    )
}
