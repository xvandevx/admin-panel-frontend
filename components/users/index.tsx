import React, {useEffect, useMemo, useState} from 'react';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {Api} from "~/api";
import InfoBlock from "~/components/infoBlock";
import {Tag} from "antd";
const _ = require('lodash');
interface DataType {
    key: string;
    name: string;
    email: number;
    password: string;
    tags: string[];
}

export default function Users() {
    const tableItems: string[] = [
        'name',
        'roles',
        'email',
    ];

    const renderTableItems = {
        'roles': (_, { roles }: any) => (
            <>
                {roles.map((role: any) => {
                    return (
                        <Tag key={role.id}>
                            {role.name}
                        </Tag>
                    );
                })}
            </>
        ),
    };

    const [roles, setRoles] = useState([]);

    const getRoles = async () => {
        const data = await Api.roles.get();
        setRoles(data);
    }

    useEffect( () => {
        getRoles();
    }, []);

    const dataRoles = useMemo(() => {
        return roles.map((item: any) => {
            return {
                label: item.name,
                value: item.id,
            }
        })
    }, [roles])

    const editFormItems = [
        {
            name: 'name',
            required: true,
            type: 'string',
        },
        {
            name: 'email',
            required: true,
            type: 'string',
        },
        {
            name: 'roles',
            required: true,
            type: 'select',
            mode: 'multiple',
            options: dataRoles
        },
    ]

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <InfoBlock
            tableItems={tableItems}
            getTableItems={Api.users.get}
            deleteTableItem={Api.users.delete}
            updateItem={Api.users.update}
            addItem={Api.users.add}
            renderTableItems={renderTableItems}
            prepareFormFields={(record) => {
                const data =  _.cloneDeep(record)
                data.roles = data.roles.map(({id}: any) => id);
                return data
            }}
            editFormItems={editFormItems}
        />
    )
}
