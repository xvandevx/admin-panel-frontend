import MainLayout from "~/components/layouts/main";
import React, {useEffect, useMemo, useState} from 'react';
import {Table, Tag, message, Popconfirm, Radio} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import {Api} from "~/api";
import {useRouter} from "next/router";
import { subscribe, unsubscribe } from "~/utils/events";
const _ = require('lodash');
import dayjs from 'dayjs';

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

export default function Edications({id}: any) {
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
            title: 'Sort',
            dataIndex: 'sort',
            key: 'sort',
        },
        {
            title: 'UniversityName',
            dataIndex: 'universityName',
            key: 'universityName',
        },
        {
            title: 'Speciality',
            dataIndex: 'speciality',
            key: 'speciality',
        },
        {
            title: 'StartDate',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: 'EndDate',
            dataIndex: 'endDate',
            key: 'endDate',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Action',
            key: 'action',
            render: (key, record: any) => (
                <Space size="middle">
                    <Button
                        type="primary" ghost
                        icon={ <EditOutlined/>}
                        onClick={() => {
                            const fields = _.cloneDeep(record)
                            fields.endDate = dayjs(fields.endDate)
                            fields.startDate = dayjs(fields.startDate)
                            form.setFieldsValue(fields);
                            setCurrentId(fields.id);
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
                await Api.educations.update(currentId, form.getFieldsValue());
                message.success('Item updated');
            } else {
                await Api.educations.add(form.getFieldsValue());
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
        const data = await Api.educations.get();
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
                                name="sort"
                                label="Sort"
                                rules={[{ required: true }]}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="universityName"
                                label="University Name"
                                rules={[{ required: true }]}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="link"
                                label="Link"
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="speciality"
                                label="Speciality"
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
                            >
                                <Input.TextArea
                                    rows={4}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="startDate"
                                label="Start Date"
                            >
                                <DatePicker picker="month" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="endDate"
                                label="End Date"
                            >
                                <DatePicker picker="month" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="location"
                                label="Location"
                            >
                                <Input/>
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
