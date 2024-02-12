import React, {useEffect, useMemo, useState} from 'react';
import {message, Radio} from 'antd';
import { Button, Col, Drawer, Form, Input, Row, Select } from 'antd';
import {Api} from "~/api";
import {useRouter} from "next/router";
import { subscribe, unsubscribe } from "~/utils/events";
const _ = require('lodash');


export default function InfoBlock({id, tableItems, renderTableItems}: any) {
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
                await Api.contents.update(currentId, form.getFieldsValue());
                message.success('Item updated');
            } else {
                await Api.contents.add(form.getFieldsValue());
                message.success('Item added');
            }
            setCurrentId(0);
            setIsOpen(false);
            getItems();

        } catch (e: any) {
            message.error(`Error item save: ${e.message}`);
        }
    };

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };

    const [data, setData] = useState([]);

    const getItems = async () => {
        const data = await Api.contents.get();
        // @ts-ignore
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

    useEffect(() => {
        console.log('form', form)
    }, [form]);

    const [type, setType] = useState('text');

    const [pages, setPages] = useState([]);

    const getPages = async () => {
        const data = await Api.pages.get();
        // @ts-ignore
        setPages(data);
    }

    useEffect( () => {
        getPages();
    }, []);

    const dataPages = useMemo(() => {
        return pages.map((item: any) => {
            return {
                label: item.title,
                value: item.id,
            }
        })
    }, [pages])

    return (
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
                            name="code"
                            label="Code"
                            rules={[{ required: true, message: 'Please enter code' }]}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="pages"
                            label="Pages"
                            rules={[{ required: true, message: 'Please select pages' }]}
                        >
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: '100%' }}
                                options={dataPages}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="type"
                            label="Type"
                            rules={[{ required: true, message: 'Please select type' }]}
                        >
                            <Radio.Group
                                onChange={(e) => {
                                    setType(e.target.value)
                                }}
                            >
                                <Radio.Button value="string">String</Radio.Button>
                                <Radio.Button value="text">Text</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
                {type && (
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="value"
                                label="Value"
                                rules={[{ required: true, message: 'Please select value' }]}

                            >
                                {type === 'string' && (
                                    <Input/>
                                )}
                                {type === 'text' && (
                                    <Input.TextArea
                                        rows={4}
                                    />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                )}
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
    )
}
