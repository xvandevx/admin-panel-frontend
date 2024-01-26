import React from 'react';

import {Flex, Layout, theme} from 'antd';

const { Content } = Layout;
import {useBack} from "~/hooks/useBack";

export default function AuthLayout({children}: any) {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const back = useBack();

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Content>
                <Flex style={{
                    height: '100vh',
                }} gap="middle" justify={'center'} align={'center'}>
                    <div
                        style={{
                            background: '#ffffffe6',
                            padding: '25px 50px 25px',
                            borderRadius: borderRadiusLG,
                            zIndex: 1,
                        }}
                    >
                        {children}
                    </div>
                </Flex>
            </Content>
        </Layout>
    );
};