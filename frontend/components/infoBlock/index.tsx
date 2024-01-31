import React, {useEffect, useMemo, useState} from 'react';
import {DatePicker, message} from 'antd';
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd';
import {useRouter} from "next/router";
import InfoBlockTable from "~/components/infoBlock/table";

export enum FormEditFieldTypes {
    string,
    textarea,
    date,
    select
}

export default function InfoBlock({
    tableItems,
    getTableItems,
    deleteTableItem,
    updateItem,
    addItem,
    prepareFormFields,
    renderTableItems,
    editFormItems,
    customFormItem
}: any) {
    const router = useRouter();
    const [isLoaded, setIsLoaded] = useState(false);



    const routerRoot = useMemo(() => {
        return router.pathname.replace('/[...id]', '');
    }, [])

    const currentId: number = useMemo(() => {
        const id = router.asPath.replace(`${routerRoot}/`, '')
        return id ? Number(id) : -1;
    }, [router])

    const isOpen = useMemo(() => {
        return currentId > -1;
    }, [currentId])

    const [form] = Form.useForm();

    const onFinish = async () => {
        try {
            const formData = form.getFieldsValue();
            if (currentId) {
                await updateItem(currentId, formData);
                message.success('Item updated');
            } else {
                await addItem(formData);
                message.success('Item added');
            }
            await getItems()
            onClose();
        } catch (e: any) {
            message.error(`Error item save: ${e.message}`);
        }
    };

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };

    const onClose = async () => {
        console.log(routerRoot)
        await router.replace(routerRoot , routerRoot)
        form.resetFields();
    };

    const [data, setData] = useState([]);

    const getItems = async () => {
        setData(await getTableItems());
        setIsLoaded(true);
    }

    useEffect( () => {
        getItems();
    }, []);

    useEffect(() => {
        if (currentId && isLoaded) {
            const record = data.find((item: any) => item.id === currentId)
            if (record) {
                form.setFieldsValue(prepareFormFields(record));
            } else {
                onClose();
            }
        }
    }, [currentId, isLoaded]);

    return (
        <>
            <InfoBlockTable
                tableItems={tableItems}
                renderTableItems={renderTableItems}
                getTableItems={getTableItems}
                deleteTableItem={deleteTableItem}
                data={data}
                getItems={getItems}
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
                    {editFormItems.map((item: any) => (
                        <div key={item.name}>
                            {(item.type === FormEditFieldTypes.string) && (
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item
                                            name={item.name}
                                            label={item.name}
                                            rules={[{required: item.required, message: `Please enter ${item.name}`}]}
                                        >
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            )}
                            {(item.type === FormEditFieldTypes.textarea) && (
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item
                                            name={item.name}
                                            label={item.name}
                                            rules={[{ required: item.required, message: `Please enter ${item.name}` }]}
                                        >
                                            <Input.TextArea
                                                rows={4}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            )}
                            {(item.type === FormEditFieldTypes.date) && (
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item
                                            name={item.name}
                                            label={item.name}
                                            rules={[{ required: item.required, message: `Please enter ${item.name}` }]}
                                        >
                                            <DatePicker picker={item.picker} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            )}
                            {(item.type === FormEditFieldTypes.select) && (
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item
                                            name={item.name}
                                            label={item.name}
                                            rules={[{ required: item.required, message: `Please enter ${item.name}` }]}
                                        >
                                            <Select
                                                mode={item.mode}
                                                allowClear
                                                style={{ width: '100%' }}
                                                options={item.options}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            )}
                        </div>
                    ))}
                    {customFormItem}
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
