import React, {useState} from 'react';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {Api} from "~/api";
import InfoBlock, {FormEditFieldTypes} from "~/components/infoBlock";
import {SkillFields} from "~/backendTypes/skill";
const _ = require('lodash');

export default function Skills() {
    const tableItems: SkillFields[] = [
        SkillFields.name,
        SkillFields.category,
        SkillFields.icon
    ];

    const editFormItems = [
        {
            name: SkillFields.name,
            required: true,
            type: FormEditFieldTypes.string,
        },
        {
            name: SkillFields.category,
            required: true,
            type: FormEditFieldTypes.select,
            options: [
                {
                    label: 'Programming languages',
                    value: 'programmingLanguages',
                },
                {
                    label: 'Frameworks',
                    value: 'frameworks',
                },
                {
                    label: 'Data Bases',
                    value: 'dataBases',
                },
                {
                    label: 'Tests',
                    value: 'tests',
                },
                {
                    label: 'Deploy',
                    value: 'deploy',
                },
                {
                    label: 'Os',
                    value: 'os',
                },
                {
                    label: 'Other',
                    value: 'other',
                }
            ]
        },
        {
            name: SkillFields.icon,
            type: FormEditFieldTypes.string,
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
