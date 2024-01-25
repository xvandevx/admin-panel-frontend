import React from 'react';

import {Flex, Layout, Menu, theme} from 'antd';

const { Header, Content, Footer, Sider } = Layout;

export default function AuthLayout({children}: any) {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

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
                            background: colorBgContainer,
                            padding: '25px 50px 25px',
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {children}
                    </div>
                </Flex>
            </Content>
        </Layout>
    );
};