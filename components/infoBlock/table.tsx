import React, {useEffect, useMemo, useState} from 'react';
import {Table, Tag, message, Popconfirm, Radio} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import {Api} from "~/api";
import {useRouter} from "next/router";
import { subscribe, unsubscribe } from "~/utils/events";
const _ = require('lodash');
interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

export default function InfoBlockTable({
    tableItems,
    renderTableItems = {},
    deleteTableItem,
    getItems,
    data,
}: any) {
    const router = useRouter();
    const routerRoot = useMemo(() => {
        return router.pathname.replace('/[...id]', '');
    }, [])
    const columns = useMemo(() => {
        console.log('renderTableItems', renderTableItems, tableItems)
        return [
            {
                title: 'Id',
                dataIndex: 'id',
                key: 'id',
                sorter: (a, b) => a.id - b.id,
                width: '70px',
                rowScope: 'row',
            },
            ...tableItems.map((item: any) => {
                const items = {
                    title: item[0].toUpperCase() + item.substring(1),
                    dataIndex: item,
                    key: item,
                }
                if (renderTableItems[item]) {
                    items.render = renderTableItems[item];
                }
                return items;
            }),
            {
                title: 'Action',
                key: 'action',
                render: (key, record: any) => (
                    <Space size="middle">
                        <Button
                            type="primary" ghost
                            icon={ <EditOutlined/>}
                            onClick={() => {
                                router.replace("", `${routerRoot}/${record.id}` )
                            }}
                        />
                        <Popconfirm
                            title="Delete item"
                            description={`Are you sure to delete item #${record.id}?`}
                            onConfirm={async () => {
                                await deleteTableItem(record.id)
                                await getItems();
                            }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                danger
                                icon={<DeleteOutlined />}
                            />
                        </Popconfirm>

                    </Space>
                ),
                width: '110px',
            },
        ]
    }, [tableItems])

    const dataSource = useMemo(() => {
        return data.map((item: any) => {
            return {
                key: item.id,
                ...item,
            }
        })
    }, [data])


    return (
        <Table
            columns={columns}
            dataSource={dataSource}
        />
    )
}
