import React from 'react';
import {Api} from "~/api";
import InfoBlock from "~/components/infoBlock";
import _ from "lodash";

export default function Comments() {
    const tableItems: string[] = [
        'postId',
        'isActive',
        'authorName',
        'text'
    ];

    const editFormItems = [
        {
            name: 'postId',
            required: true,
            type: 'string',
        },
        {
            name: 'isActive',
            required: true,
            type: 'string',
        },
        {
            name: 'authorName',
            type: 'string',
        },
        {
            name: 'text',
            type: 'textarea',
        },
    ]

    return (
        <InfoBlock
            tableItems={tableItems}
            getTableItems={Api.blogComments.get}
            deleteTableItem={Api.blogComments.delete}
            updateItem={Api.blogComments.update}
            addItem={Api.blogComments.add}
            prepareFormFields={(record: any) => {
                const data =  _.cloneDeep(record)
                return data
            }}
            editFormItems={editFormItems}
        />
    )
}
