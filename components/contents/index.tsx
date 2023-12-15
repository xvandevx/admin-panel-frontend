import React, {useEffect, useMemo, useState} from 'react';
import {Col, Form, Input, Radio, Row, Tag} from 'antd';
import {Api} from "~/api";
import InfoBlock from "~/components/infoBlock/";

const _ = require('lodash');
interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

export default function Contents() {
    const tableItems: string[] = [
        'name',
        'code',
        'type',
        'value',
        'pages',
    ];

    const renderTableItems = {
        'pages': (_, { pages }: any) => (
            <>
                {pages.map((page: any) => {
                    return (
                        <Tag key={page.id}>
                            {page.title}
                        </Tag>
                    );
                })}
            </>
        ),
    };

    const [type, setType] = useState('text');

    const [pages, setPages] = useState([]);

    const getPages = async () => {
        const data = await Api.pages.get();
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

    const editFormItems = [
        {
            name: 'name',
            required: true,
            type: 'string',
        },
        {
            name: 'code',
            required: true,
            type: 'string',
        },
        {
            name: 'pages',
            required: true,
            type: 'select',
            mode: 'multiple',
            options: dataPages
        },
        {
            name: 'type',
            required: true,
            type: 'custom',
            render: <Radio.Group
                onChange={(e) => {
                    setType(e.target.value)
                }}
            >
                <Radio.Button value="string">String</Radio.Button>
                <Radio.Button value="text">Text</Radio.Button>
            </Radio.Group>
        }
    ]

    return (
        <InfoBlock
            tableItems={tableItems}
            getTableItems={Api.contents.get}
            deleteTableItem={Api.contents.delete}
            updateItem={Api.contents.update}
            addItem={Api.contents.add}
            prepareFormFields={(record) => {
                const data =  _.cloneDeep(record)
                data.pages = data.pages.map(({id}: any) => id);
                return data
            }}
            renderTableItems={renderTableItems}
            editFormItems={editFormItems}
            customFormItem={type && (
                <>
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
                </>
            )}
        />
    )
}
