import React from 'react';
import {Api} from "~/api";
import InfoBlock, {FormEditFieldTypes} from "~/components/infoBlock";
import _ from "lodash";
export default function Tags() {
    const tableItems: TagDto[] = [
        'name',
    ];

    const editFormItems = [
        {
            name: 'name',
            required: true,
            type: FormEditFieldTypes.string,
        },
    ]

    return (
        <InfoBlock
            tableItems={tableItems}
            getTableItems={Api.blogTags.get}
            deleteTableItem={Api.blogTags.delete}
            updateItem={Api.blogTags.update}
            addItem={Api.blogTags.add}
            prepareFormFields={(record: any) => {
                const data =  _.cloneDeep(record)
                return data
            }}
            editFormItems={editFormItems}
        />
    )
}
