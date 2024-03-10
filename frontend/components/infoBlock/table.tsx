import React, {useMemo} from 'react';
import {Table, Popconfirm} from 'antd';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import { Button, Space } from 'antd';
import {useRouter} from "next/router";


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


    const getName = (name: string) => {
        return name.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    const columns = useMemo(() => {
        return [
            {
                title: 'Id',
                dataIndex: 'id',
                key: 'id',
                sorter: (a: any, b: any) => a.id - b.id,
                width: '70px',
                rowScope: 'row',
            },
            ...tableItems.map((item: any) => {
                const items: any = {
                    title: getName(item),
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
                render: (key: any, record: any) => (
                    <Space size="middle">
                        <Button
                            type="primary" ghost
                            icon={ <EditOutlined rev={undefined}/>}
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
                                icon={<DeleteOutlined rev={undefined} />}
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
            for (const val in item) {
                if (typeof item[val] === 'boolean') {
                     item[val] = (item[val] && 'yes');
                }
            }
            return {
                key: item.id,
                ...item
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
