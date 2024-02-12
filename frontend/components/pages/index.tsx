import React from 'react';
import {Api} from "~/api";
import InfoBlock, {FormEditFieldTypes} from "~/components/infoBlock";
import _ from "lodash";
import {PageFields} from "~/backendTypes/page";

export default function Pages() {
    const tableItems: PageFields[] = [
        PageFields.title,
        PageFields.code,
        PageFields.h1,
        PageFields.description
    ];

    const editFormItems = [
        {
            name: PageFields.title,
            required: true,
            type: FormEditFieldTypes.string,
        },
        {
            name: PageFields.code,
            required: true,
            type: FormEditFieldTypes.string,
        },
        {
            name: PageFields.h1,
            type: FormEditFieldTypes.string,
        },
        {
            name: PageFields.description,
            type: FormEditFieldTypes.textarea,
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
