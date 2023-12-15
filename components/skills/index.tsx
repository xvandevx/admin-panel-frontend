import React, {useEffect, useMemo, useState} from 'react';
import {Table, Tag, message, Popconfirm, Radio, Upload} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {DeleteOutlined, EditOutlined, LoadingOutlined, PlusOutlined} from '@ant-design/icons';
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

export default function Skills({id}: any) {
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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Icon',
            dataIndex: 'icon',
            key: 'icon',
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
                await Api.skills.update(currentId, form.getFieldsValue());
                message.success('Item updated');
            } else {
                await Api.skills.add(form.getFieldsValue());
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
        const data = await Api.skills.get();
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

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();


    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

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
                                name="name"
                                label="Name"
                                rules={[{ required: true, message: 'Please enter title' }]}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="category"
                                label="Category"
                                rules={[{ required: true, message: 'Please select category' }]}
                            >
                                <Select
                                    defaultValue="Programming languages"
                                    style={{ width: '100%' }}
                                    options={[
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
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="icon"
                                label="Icon"
                            >
                                {/*<Upload
                                    name="icon"
                                    listType="picture-card"
                                    showUploadList={false}
                                >
                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>*/}
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
