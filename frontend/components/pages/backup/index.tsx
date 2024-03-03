import React, {useEffect, useMemo, useState} from 'react';
import {Button, Popconfirm, Space, Table} from "antd";
import {Api} from "~/api";
import {DeleteOutlined, EditOutlined, RollbackOutlined} from "@ant-design/icons";

export default function Backup() {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Action',
            key: 'action',
            render: (key: any, record: any) => (
                <Space size="middle">
                    <Popconfirm
                        title="Delete item"
                        description={`Are you sure to restore backup ${record.name}?`}
                        onConfirm={async () => {
                            await Api.backup.restore(record.name);
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="primary" ghost
                            icon={ <RollbackOutlined rev={undefined}/>}
                        />
                    </Popconfirm>

                    <Popconfirm
                        title="Delete item"
                        description={`Are you sure to delete backup ${record.name}?`}
                        onConfirm={async () => {
                            await Api.backup.delete(record.name);
                            window.location.reload();
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
    ];

    const createBackup = async () => {
        await Api.backup.generate();
        window.location.reload();
    }

    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const getItems = async () => {
        setData(await Api.backup.list());
        setIsLoaded(true);
    }

    useEffect( () => {
        getItems();
    }, []);

    const dataSource = useMemo(() => {
        return data.map((item: any) => {
            return {
                key: item,
                name: item,
            }
        })
    }, [data])

    return (
        <div>
            <Table
                columns={columns}
                dataSource={dataSource}
            />
            <br/>
            <Button type="primary" onClick={createBackup}>
                Create new backup
            </Button>
        </div>
    )
}
