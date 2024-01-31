import {Form, Input, Button, Checkbox, Flex, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import AuthLayout from "~/components/layouts/auth";
import {useState} from "react";
import {Api} from "~/api";
import {useRouter} from "next/router";
import Cookies from 'js-cookie'

export default function Home() {
    const router = useRouter();
    const [form] = Form.useForm();
    const [setPasswordForm] = Form.useForm();
    const [resetPasswordEmail, setResertPasswordEmail] = useState('');
    const onFinishAuth = async () => {
        try {
            const formData = form.getFieldsValue();
            const auth = await Api.auth.login(formData);

            console.log(auth)

            if (auth.status === 'setPassword') {
                setResertPasswordEmail(formData.email)
            } else if (auth.status === 'success') {
                Cookies.set('token', auth.token, {
                    path: '/',
                });
                window.location.href = '/';
            } else {
                message.error('Auth failed!');
            }
        } catch (e: any) {
            if (e.message.includes("401")) {
                message.error('Wrong user name or password');
            } else {
                message.error(e.message);
            }
        }
    };

    const onFinishSet = async () => {
        try {
            const formData = setPasswordForm.getFieldsValue();
            if (formData.password !== formData.passwordRepeat) {
                message.error('Passwords does not match');
                return;
            }
            await Api.auth.setPassword({
                email: resetPasswordEmail,
                password: formData.password
            });
            setResertPasswordEmail('');
        } catch (e: any) {
            if (e.message.includes("401")) {
                message.error('Error');
            } else {
                message.error(e.message);
            }
        }

    }

    const onFinishFailedAuth = () => {
        message.error('Auth failed!');
    }

    const onFinishFailedSet = () => {
        message.error('Set password failed!');
    }

    return (
        <AuthLayout>
            {!resetPasswordEmail && (
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinishAuth}
                    onFinishFailed={onFinishFailedAuth}
                    form={form}
                >
                    <h2>Login</h2>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input size="large" prefix={<UserOutlined className="site-form-item-icon" rev={undefined} />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" rev={undefined} />}
                            type="password"
                            placeholder="Password"
                            size="large"
                        />
                    </Form.Item>
                    {/*<Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Form.Item>*/}

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            )}
            {resetPasswordEmail && (
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    form={setPasswordForm}
                    onFinish={onFinishSet}
                    onFinishFailed={onFinishFailedSet}
                >
                    <h2>Set user password</h2>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" rev={undefined} />}
                            type="password"
                            placeholder="Password"
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item
                        name="passwordRepeat"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" rev={undefined} />}
                            type="password"
                            placeholder="Repeat password"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Set and login
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </AuthLayout>
    )
}
