import React from 'react';
import {Api} from "~/api";
import InfoBlock, {FormEditFieldTypes} from "~/components/infoBlock";
import {RoleFields} from "~/backendTypes/role";
const _ = require('lodash');

export default function Roles() {
    const tableItems: RoleFields[] = [
        RoleFields.name,
    ];

    const editFormItems = [
        {
            name: RoleFields.name,
            required: true,
            type: FormEditFieldTypes.string,
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
