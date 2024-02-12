import React, {useEffect, useMemo, useState} from 'react';
import {Tag} from 'antd';
import {Api} from "~/api";
const _ = require('lodash')
import InfoBlock, {FormEditFieldTypes} from "~/components/infoBlock";
import dayjs from "dayjs";
import {WorkFields} from "~/backendTypes/work";

export default function Works() {
    const tableItems: WorkFields[] = [
        WorkFields.sort,
        WorkFields.companyName,
        WorkFields.position,
        WorkFields.startDate,
        WorkFields.endDate,
        WorkFields.location,
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
            name: WorkFields.sort,
            required: true,
            type: FormEditFieldTypes.string,
        },
        {
            name: WorkFields.companyName,
            required: true,
            type: FormEditFieldTypes.string,
        },
        {
            name: WorkFields.link,
            type: FormEditFieldTypes.string,
        },
        {
            name: WorkFields.position,
            type: FormEditFieldTypes.string,
        },
        {
            name: WorkFields.description,
            type: FormEditFieldTypes.textarea,
        },
        {
            name: WorkFields.startDate,
            type: FormEditFieldTypes.date,
            picker: "month"
        },
        {
            name: WorkFields.endDate,
            type: FormEditFieldTypes.date,
            picker: "month"
        },
        {
            name: WorkFields.location,
            type: FormEditFieldTypes.string,
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
