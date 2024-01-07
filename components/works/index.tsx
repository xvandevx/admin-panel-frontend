import React, {useEffect, useMemo, useState} from 'react';
import {Table, Tag, message, Popconfirm, Radio} from 'antd';
import {Api} from "~/api";
const _ = require('lodash')
import InfoBlock from "~/components/infoBlock";
import dayjs from "dayjs";

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

export default function Works() {
    const tableItems: string[] = [
        'sort',
        'companyName',
        'position',
        'startDate',
        'endDate',
        'location',
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
            name: 'sort',
            required: true,
            type: 'string',
        },
        {
            name: 'companyName',
            required: true,
            type: 'string',
        },
        {
            name: 'link',
            type: 'string',
        },
        {
            name: 'position',
            type: 'string',
        },
        {
            name: 'description',
            type: 'textarea',
        },
        {
            name: 'startDate',
            type: 'date',
            picker: "month"
        },
        {
            name: 'endDate',
            type: 'date',
            picker: "month"
        },
        {
            name: 'location',
            type: 'string',
        },
        {
            name: 'skills',
            type: 'select',
            mode: 'multiple',
            options: dataSkills
        },

    ]

    return (
        <InfoBlock
            tableItems={tableItems}
            getTableItems={Api.works.get}
            deleteTableItem={Api.works.delete}
            updateItem={Api.works.update}
            addItem={Api.works.add}
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
