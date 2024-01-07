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
    name: string;
}

export default function Roles() {
    const tableItems: string[] = [
        'name',
    ];

    const editFormItems = [
        {
            name: 'name',
            required: true,
            type: 'string',
        },
    ]

    return (
        <InfoBlock
            tableItems={tableItems}
            getTableItems={Api.roles.get}
            deleteTableItem={Api.roles.delete}
            updateItem={Api.roles.update}
            addItem={Api.roles.add}
            prepareFormFields={(record: any) => {
                const data =  _.cloneDeep(record)
                return data
            }}
            editFormItems={editFormItems}
        />
    )
}
