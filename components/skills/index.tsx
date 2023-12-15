import React, {useEffect, useMemo, useState} from 'react';
import {Table, Tag, message, Popconfirm, Radio, Upload} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {DeleteOutlined, EditOutlined, LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import {Api} from "~/api";
import {useRouter} from "next/router";
import { subscribe, unsubscribe } from "~/utils/events";
import InfoBlock from "~/components/infoBlock";
import dayjs from "dayjs";
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
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
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
            prepareFormFields={(record) => {
                const data =  _.cloneDeep(record)
                return data
            }}
            editFormItems={editFormItems}
        />
    )
}
