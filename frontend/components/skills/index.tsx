import React, {useState} from 'react';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {Api} from "~/api";
import InfoBlock from "~/components/infoBlock";
const _ = require('lodash');
interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

export default function Skills() {
    const tableItems: string[] = [
        'name',
        'category',
        'icon'
    ];

    const editFormItems = [
        {
            name: 'name',
            required: true,
            type: 'string',
        },
        {
            name: 'category',
            required: true,
            type: 'select',
            options: [
                {
                    label: 'Programming languages',
                    value: 'Programming languages',
                },
                {
                    label: 'Os',
                    value: 'Os',
                },
                {
                    label: 'Tools',
                    value: 'Tools',
                }
            ]
        },
        {
            name: 'icon',
            type: 'string',
        },
    ]

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined rev={undefined} /> : <PlusOutlined rev={undefined} />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <InfoBlock
            tableItems={tableItems}
            getTableItems={Api.skills.get}
            deleteTableItem={Api.skills.delete}
            updateItem={Api.skills.update}
            addItem={Api.skills.add}
            prepareFormFields={(record: any) => {
                const data =  _.cloneDeep(record)
                return data
            }}
            editFormItems={editFormItems}
        />
    )
}
