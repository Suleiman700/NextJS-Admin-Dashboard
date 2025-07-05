'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { signIn, signOut } from 'next-auth/react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Button as AntButton, message, Select } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslations } from '@/lib/translations';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { t, setLanguage, language, appLanguages } = useTranslations();

    const onValuesChange = () => {
        setErrorMessage('');
    }

    const onFinish = async (values) => {
        setLoading(true);
        setErrorMessage('');

        try {
            // Option 1: Using next-auth/react (recommended)
            const response = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
                callbackUrl: '/admin/dashboard'
            });

            if (response?.error) {
                setErrorMessage(t('wrong_email_or_password'));
                message.error('Invalid email or password');
            }
            else {
                router.replace('/admin/dashboard');
                return;
            }
        }
        catch (error) {
            console.error('Login error:', error);
            setErrorMessage(t('wrong_email_or_password'));
            message.error('An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="min-h-screen flex justify-center items-center md:items-center p-8">
            <Card className="w-full max-w-sm shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">{t('sign_in')}</CardTitle>
                    {/*<CardDescription>*/}
                    {/*    {t('login.description')}*/}
                    {/*</CardDescription>*/}
                </CardHeader>
                <CardContent className="mt-4">
                    <Select
                        value={language}
                        onChange={(value) => setLanguage(value)}
                        className="w-full mb-4"
                    >
                        {appLanguages.map((lang) => (
                            <Select.Option key={lang} value={lang}>
                                {lang.toUpperCase()}
                            </Select.Option>
                        ))}
                    </Select>
                </CardContent>
                <CardFooter className="flex-col space-y-4">
                    {/* Display error message */}
                    {errorMessage && (
                        <div className="w-full text-red-500 text-sm text-center">
                            {t(errorMessage)}
                        </div>
                    )}

                    {/* Ant Design Form */}
                    <Form
                        name="login"
                        onFinish={onFinish}
                        onValuesChange={onValuesChange}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout="vertical"
                        className="w-full"
                        disabled={loading}
                        initialValues={{
                            email: 'admin@admin.com',
                            password: 'password1233'
                        }}
                    >
                        <Form.Item
                            label={t('email')}
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: t('field_is_required'),
                                },
                                {
                                    type: 'email',
                                    message: t('field_is_invalid'),
                                },
                            ]}
                        >
                            <Input
                                size="large"
                                placeholder={t('email')}
                                prefix={<UserOutlined />}
                            />
                        </Form.Item>

                        <Form.Item
                            label={t('password')}
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: t('field_is_required'),
                                },
                                {
                                    min: 6,
                                    message: t('field_is_required'),
                                },
                            ]}
                        >
                            <Input.Password
                                size="large"
                                placeholder={t('password')}
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
                                {t('sign_in')}
                            </AntButton>
                        </Form.Item>
                    </Form>
                </CardFooter>
            </Card>
        </div>
    );
}