import React, {useMemo, useState} from 'react';

import {
    DatabaseOutlined, DeliveredProcedureOutlined, PlusOutlined, ReadOutlined, UserOutlined,
} from '@ant-design/icons';
import {Avatar, Breadcrumb, Button, Flex, Layout, Menu, theme} from 'antd';
import {useRouter} from "next/router";
import Cookies from "js-cookie";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label: string, key: string, icon?: any, children?: any[]) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('InfoBlocks', 'infobloks', <DatabaseOutlined rev={undefined} />, [
        getItem('Pages', 'pages'),
        getItem('Contents', 'contents'),
        getItem('Work', 'works'),
        getItem('Educatuon', 'educations'),
        getItem('Skills', 'skills'),
    ]),
    getItem('Users', 'users', <UserOutlined rev={undefined} />, [
        getItem('Users', 'users'),
        getItem('Roles', 'roles'),
    ]),
    getItem('Blog', 'blog', <ReadOutlined rev={undefined} />, [
        getItem('Posts', 'posts'),
        getItem('Tags', 'tags'),
        getItem('Comments', 'comments'),
    ]),
    getItem('Backup', 'backup', <DeliveredProcedureOutlined rev={undefined} />),
];
export default function MainLayout({children, isShowAdd = true}: any) {
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const breadcrumbItems = useMemo(() => {
        let link = '/';
        const links = [
            {
                title: 'Home',
                link
            },
            ...router.pathname.split('/').filter(link => link).map(pageCode => {
                link += `${pageCode}/`;
                return {
                    title: `${pageCode[0].toUpperCase()}${pageCode.slice(1)}`,
                    link: `${link}`
                }
            })
        ]
        return links.map(({title, link}) => {
            return {
                title: <a href={link} onClick={(e) => {
                    e.preventDefault();
                    router.push(link);
                }}>{title}</a>,
            }
        })
    }, [router])

    const routerRoot = useMemo(() => {
        return router.pathname.replace('/[...id]', '');
    }, [])

    const showDrawer = () => {
        //publish('addNewItem');
        router.replace("", `${routerRoot}/0` )
    }

    const selectedKey = useMemo(() => {
        const path = router.pathname.split('/');
        return path[2]
    }, [router])

    const openKey = useMemo(() => {
        const path = router.pathname.split('/');
        return path[1]
    }, [router])

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <Flex gap={20} align="center" style={{
                    margin: '20px',
                    background: '#1b4164',
                    color: '#fff',
                    borderRadius: 8,
                    padding: '10px'
                }}>
                    <Avatar size="large">A</Avatar>
                    <Flex gap={10} vertical={true}>
                        <div>Admin</div>
                        <Button
                            type="primary"
                            size="small"
                            onClick={() => {
                                Cookies.remove('token');
                                window.location.href = '/';
                            }}
                        >
                            Logout
                        </Button>
                    </Flex>
                </Flex>
                <Menu
                    theme="dark"
                    defaultSelectedKeys={[selectedKey]}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    items={items}
                    onClick={({ item, key, keyPath, domEvent }) => {
                        router.push('/' + keyPath.reverse().join('/'))
                    }}
                />
            </Sider>
            <Layout>
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <Flex justify="space-between" align="center">
                        <Breadcrumb
                            style={{
                                margin: '16px 0',
                            }}
                            items={breadcrumbItems}
                        >
                        </Breadcrumb>
                        {isShowAdd && (
                            <Button type="primary" onClick={showDrawer} icon={<PlusOutlined rev={undefined} />}>Add item</Button>
                        )}
                    </Flex>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                        }}
                    >
                        {children}
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    ©2024 Created by xvandev
                </Footer>
            </Layout>
        </Layout>
    );
};