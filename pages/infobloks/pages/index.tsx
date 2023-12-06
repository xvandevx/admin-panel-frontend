import MainLayout from "~/components/layouts/main";
import React, {useEffect, useMemo, useState} from 'react';
import {Table, Tag, message, Popconfirm} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import {Api} from "~/api";
import {router} from "next/client";

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

export default function Infobloks() {
    const [open, setOpen] = useState(false);

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
                            setOpen(true);
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

    const showDrawer = () => {
        form.resetFields();
        setOpen(true);

    };

    const onClose = () => {
        setOpen(false);
        setCurrentId(0);
    };

    const [form] = Form.useForm();

    const [currentId, setCurrentId] = useState(0);

    useEffect(() => {
        if (currentId) {
          console.log(router);
        }
    }, [currentId]);

    const onFinish = async () => {
        try {
            await Api.pages.add(form.getFieldsValue());
            getItems();
            message.success('Item added');
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

    return (
        <MainLayout showDrawer={showDrawer}>
            <Table
                columns={columns}
                dataSource={dataSource}
            />

            <Drawer
                title="Add new page"
                width={720}
                onClose={onClose}
                open={open}
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
                                name="h1"
                                label="H1"
                            >
                                <Input
                                    placeholder="Please enter H1"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="content"
                                label="Content"
                            >

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
                                    placeholder="please enter url description"
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
        </MainLayout>
    )
}
