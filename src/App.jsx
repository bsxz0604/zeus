import React, { useState } from 'react';
import { observer } from 'mobx-react';
import appStore from './store/store';
import './App.css';
import { routerItems } from './router';
import { Layout, Menu, theme, Avatar, ConfigProvider } from 'antd';
import { Outlet } from "react-router-dom";
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

import zhCN from 'antd/locale/zh_CN';
// import dayjs from 'dayjs';
// import 'dayjs/locale/zh-cn';
// dayjs.locale('en');


const { Header, Content, Sider } = Layout;

const Counter = observer(() => {
  return (
      <div>
          <h1>Count: {appStore.count}</h1>
          <button onClick={() => appStore.increment()}>Increment</button>
      </div>
  );
});

const UserInfo = observer(() => {
  return (
    <div className='user-wrapper'>
      <Avatar style={{ backgroundColor: '#87d068', marginRight: '8px' }} size={36} icon={<UserOutlined />} />
      <span>{appStore.userName}</span>
      <LogoutOutlined  style={{  marginLeft: '8px' }}/>
    </div>
  );
});


function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);
  return (
    <ConfigProvider locale={zhCN}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
          <p className="demo-logo-vertical" >江苏电力交易中心</p>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={routerItems} />
        </Sider>


        <Layout>
          <Header className='header-wrapper'>
            <p className='title'></p>
            <UserInfo/>
          </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            > 
              <Outlet/>
              {/* <Counter /> */}
            </Content>
        </Layout>    
      </Layout>
    </ConfigProvider>
  );
}

export default App;
