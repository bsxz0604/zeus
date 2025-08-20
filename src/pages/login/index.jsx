import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Card, Divider, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { routerName } from '../../router';
import './index.css'; // 可选的样式文件

const Login = () => {
    let navigate = useNavigate();

    const [messageApi, contextHolder] = message.useMessage();


    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        setLoading(true);
        console.log('Received values of form: ', values);
        // 模拟登录请求
        setTimeout(() => {
        setLoading(false);
        // 这里可以添加实际登录逻辑和页面跳转
        if(values.username === 'admin' && values.password === 'admin') {
            messageApi.success('登录成功！');
            navigate(routerName.contract.list);
        } else {
            messageApi.error('账号密码错误');
        }
        }, 1000);
    };

    return (
        <>
        {contextHolder}
        <div className="login-container">
        <Card className="login-card" hoverable>
            <div className="login-header">
            <h2>江苏电力交易中心</h2>
            <p>请输入您的用户名和密码</p>
            </div>
            
            <Divider />
            
            <Form
            name="normal_login"
            className="login-form"
            onFinish={onFinish}
            >
            <Form.Item
                name="username"
                rules={[{ required: true, message: '请输入用户名!' }]}
            >
                <Input 
                prefix={<UserOutlined className="site-form-item-icon" />} 
                placeholder="用户名" 
                />
            </Form.Item>
            
            <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入密码!' }]}
            >
                <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
                />
            </Form.Item>

            <Form.Item>
                <Button 
                type="primary" 
                htmlType="submit" 
                className="login-form-button"
                loading={loading}
                block
                >
                登录
                </Button>
            </Form.Item>
            </Form>
        </Card>
        </div>
        </>
    );
};

    export default Login;