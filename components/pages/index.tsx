import MainLayout from "~/components/layouts/main";
import React, {useEffect, useMemo, useState} from 'react';
import {Table, Tag, message, Popconfirm} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import {Api} from "~/api";
import {useRouter} from "next/router";
import { subscribe, unsubscribe } from "~/utils/events";
interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

export default function Pages({id}: any) {
    const columns: ColumnsType<DataType> = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            width: '70px',
            rowScope: 'row',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'H1',
            dataIndex: 'h1',
            key: 'h1',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record: any) => (
                <Space size="middle">
                    <Button
                        type="primary" ghost
                        icon={ <EditOutlined/>}
                        onClick={() => {
                            form.setFieldsValue(record);
                            setCurrentId(record.id);
                            setIsOpen(true);
                        }}
                    />
                    <Popconfirm
                        title="Delete the page"
                        description={`Are you sure to delete page ${record.title}?`}
                        onConfirm={async () => {
                            await Api.pages.delete(record.id)
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
    ];

    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const onClose = () => {
        setIsOpen(false);
        setCurrentId(0);
    };

    const [form] = Form.useForm();

    const [currentId, setCurrentId] = useState(0);

    const routerRoot = useMemo(() => {
        return router.pathname.replace('/[...id]', '');
    }, [])

    useEffect(() => {
        if (currentId) {
            history.pushState({}, "", `${routerRoot}/${currentId}`);
        } else {
            history.pushState({}, "", routerRoot);
        }
    }, [currentId]);

    const onFinish = async () => {
        try {
            if (currentId) {
                await Api.pages.update(currentId, form.getFieldsValue());
                message.success('Item updated');
            } else {
                await Api.pages.add(form.getFieldsValue());
                message.success('Item added');
            }
            setCurrentId(0);
            setIsOpen(false);
            getItems();

        } catch (e) {
            message.error(`Error item save: ${e.message}`);
        }
    };

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };

    const [data, setData] = useState([]);

    const getItems = async () => {
        const data = await Api.pages.get();
        setData(data);
        setIsLoaded(true);
    }

    const dataSource = useMemo(() => {
        return data.map((item: any) => {
            return {
                key: item.id,
                ...item,
            }
        })
    }, [data])

    useEffect( () => {
        getItems();
    }, []);

    useEffect(() => {
        console.log(router)
        if (id && isLoaded) {
            const record = data.find((item: any) => item.id === id)
            console.log(data, record)
            if (record) {
                form.setFieldsValue(record);
                // @ts-ignore
                setCurrentId(record.id);
                setIsOpen(true);
            } else {
                history.pushState({}, "", routerRoot);
            }
        }
    }, [id, isLoaded]);

    useEffect(() => {
        const showAddItem = () => {
            form.resetFields();
            setIsOpen(true);
        }
        subscribe("addNewItem", showAddItem);
        return () => {
            unsubscribe("addNewItem", showAddItem);
        }
    }, []);

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataSource}
            />

            <Drawer
                title={currentId ? `Edit item #${currentId}` : 'Add new item'}
                width={720}
                onClose={onClose}
                open={isOpen}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
            >
                <Form
                    layout="vertical"
                    form={form}
                    hideRequiredMark
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="title"
                                label="Title"
                                rules={[{ required: true, message: 'Please enter title' }]}
                            >
                                <Input
                                    placeholder="Please enter title"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="code"
                                label="Code"
                                rules={[{ required: true, message: 'Please enter title' }]}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="h1"
                                label="H1"
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[
                                    {
                                        message: 'Please enter description',
                                    },
                                ]}
                            >
                                <Input.TextArea
                                    rows={4}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    )
}
