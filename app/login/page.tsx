'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { signIn, signOut } from 'next-auth/react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Button as AntButton, message } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onFinish = async (values) => {
        setLoading(true);
        setErrorMessage('');

        try {
            console.log('Success:', values);

            // Option 1: Using next-auth/react (recommended)
            const response = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
                callbackUrl: '/admin/dashboard'
            });

            console.log(response);

            if (response?.error) {
                setErrorMessage('Invalid email or password');
                message.error('Invalid email or password');
            }
            else {
                router.replace('/admin/dashboard');
                return;
            }

            // Option 2: If you need to use your custom auth, make an API call instead
            // const response = await fetch('/api/auth/signin', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         email: values.email,
            //         password: values.password,
            //     }),
            // });
            // const data = await response.json();
            // if (response.ok) {
            //     router.replace('/admin/dashboard');
            // } else {
            //     setErrorMessage(data.message || 'Invalid email or password');
            //     message.error(data.message || 'Invalid email or password');
            // }

        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('An error occurred during login');
            message.error('An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="min-h-screen flex justify-center items-start md:items-center p-8">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Sign in to your account using your email and password.
                    </CardDescription>
                </CardHeader>
                <CardFooter className="flex-col space-y-4">
                    {/* Display error message */}
                    {errorMessage && (
                        <div className="w-full text-red-500 text-sm text-center">
                            {errorMessage}
                        </div>
                    )}

                    {/* Ant Design Form */}
                    <Form
                        name="login"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout="vertical"
                        className="w-full"
                        initialValues={{
                            email: 'admin@admin.com',
                            password: 'password1233'
                        }}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                                {
                                    type: 'email',
                                    message: 'Please enter a valid email!',
                                },
                            ]}
                        >
                            <Input
                                size="large"
                                placeholder="Enter your email"
                                prefix={<UserOutlined />}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                {
                                    min: 6,
                                    message: 'Password must be at least 6 characters!',
                                },
                            ]}
                        >
                            <Input.Password
                                size="large"
                                placeholder="Enter your password"
                                prefix={<LockOutlined />}
                            />
                        </Form.Item>

                        <Form.Item>
                            <AntButton
                                type="primary"
                                htmlType="submit"
                                size="large"
                                className="w-full"
                            >
                                Sign in
                            </AntButton>
                        </Form.Item>
                    </Form>
                </CardFooter>
            </Card>
        </div>
    );
}