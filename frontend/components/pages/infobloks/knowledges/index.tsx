import React, {useEffect, useMemo, useState} from 'react';
import {Tag} from 'antd';
import {Api} from "~/api";
const _ = require('lodash')
import InfoBlock, {FormEditFieldTypes} from "~/components/infoBlock";
import dayjs from "dayjs";
import {KnowledgeFields} from "~/backendTypes/knowledge";

export default function Knowledges() {
    const tableItems: KnowledgeFields[] = [
        KnowledgeFields.sort,
        KnowledgeFields.name,
        KnowledgeFields.description,
        // @ts-ignore
        'skills'
    ];

    const renderTableItems = {
        'skills': (_: any, { skills }: any) => (
            <>
                {skills.map((skill: any) => {
                    return (
                        <Tag key={skill.id}>
                            {skill.name}
                        </Tag>
                    );
                })}
            </>
        ),
    };


    const [skills, setSkills] = useState([]);

    const getSkills = async () => {
        const skills = await Api.skills.get();
        // @ts-ignore
        setSkills(skills);
    }

    useEffect( () => {
        getSkills();
    }, []);

    const dataSkills = useMemo(() => {
        return skills.map((item: any) => {
            return {
                label: item.name,
                value: item.id,
            }
        })
    }, [skills])

    const editFormItems = [
        {
            name: KnowledgeFields.sort,
            required: true,
            type: FormEditFieldTypes.string,
        },
        {
            name: KnowledgeFields.name,
            required: true,
            type: FormEditFieldTypes.string,
        },
        {
            name: KnowledgeFields.description,
            type: FormEditFieldTypes.textarea,
        },
        {
            name: 'skills',
            type: FormEditFieldTypes.select,
            mode: 'multiple',
            options: dataSkills
        },

    ]

    return (
        <InfoBlock
            tableItems={tableItems}
            getTableItems={Api.knowledges.get}
            deleteTableItem={Api.knowledges.delete}
            updateItem={Api.knowledges.update}
            addItem={Api.knowledges.add}
            prepareFormFields={(record: any) => {
                const data =  _.cloneDeep(record)
                data.endDate = data.endDate ? dayjs(data.endDate) : ''
                data.startDate = data.startDate ? dayjs(data.startDate) : ''
                data.skills = data.skills.map(({id}: any) => id);
                return data
            }}
            renderTableItems={renderTableItems}
            editFormItems={editFormItems}
        />
    )
}
