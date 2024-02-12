import React, {useEffect, useMemo, useState} from 'react';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {Api} from "~/api";
import InfoBlock, {FormEditFieldTypes} from "~/components/infoBlock";
import {Tag} from "antd";
import {UserFields} from "~/backendTypes/user";
const _ = require('lodash');

export default function Users() {
    const tableItems: UserFields[] = [
        UserFields.name,
        UserFields.roles,
        UserFields.email,
    ];

    const renderTableItems = {
        'roles': (_: any, { roles }: any) => (
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
        // @ts-ignore
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
            name: UserFields.name,
            required: true,
            type: FormEditFieldTypes.string,
        },
        {
            name: UserFields.email,
            required: true,
            type: FormEditFieldTypes.string,
        },
        {
            name: UserFields.roles,
            required: true,
            type: FormEditFieldTypes.string,
            mode: 'multiple',
            options: dataRoles
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
            getTableItems={Api.users.get}
            deleteTableItem={Api.users.delete}
            updateItem={Api.users.update}
            addItem={Api.users.add}
            renderTableItems={renderTableItems}
            prepareFormFields={(record: any) => {
                const data =  _.cloneDeep(record)
                data.roles = data.roles.map(({id}: any) => id);
                return data
            }}
            editFormItems={editFormItems}
        />
    )
}
