import React, { useState, useEffect } from 'react';

import { Button, Form, Input, Row, Col, Space, message } from 'antd';

import { CloseOutlined } from '@ant-design/icons';
  
import { CreateSettlement } from '../../request';
import './index.css';

const { TextArea } = Input;

const SettlementCreate = (props) => {

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  
  useEffect(() => {

  }, []);

  const onReset = () => {
    form.resetFields();
  };

  const downloadSettlement = (data) => {
    CreateSettlement(data).then((resp) => {
      const blobObj = new Blob([resp.data], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
      const downloadLink = document.createElement('a');
      let url = window.URL || window.webkitURL || window.moxURL; // 浏览器兼容
      url = url.createObjectURL(blobObj);
      downloadLink.href = url;
      downloadLink.download = `settlement_${new Date().toISOString().slice(0,19).replace(/:/g, '-')}.docx`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      window.URL.revokeObjectURL(url);
      messageApi.success("创建成功")
    })
  } 


  const onFinish = values => {
    console.log(values);
    downloadSettlement(values);
  };

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        labelAlign='left'
        labelWrap
        onFinish={onFinish}
        layout="horizontal"
        initialValues={
          {
            quota_info: [{
              quota_price: undefined,
              quota_type: undefined,
            }]
          }
        }
      >
        <>
          <p style={{ fontSize:16, fontWeight:600, margin:'0 0 16px 0'}}>生成报价单</p>

          <Row justify="space-between" gutter={16}>
            <Col span={14} ><Form.Item required label="客户名称" name="party_a_name" ><Input /></Form.Item></Col>
          </Row> 
          <Row justify="space-between" gutter={16}>
            <Col span={14} >
              <Form.Item label="报价套餐信息">
                <Form.List name='quota_info'>
                  {(fields, subOpt) => (
                    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                      {fields.map((field, index) => (
                        <div key={field.key} className='quota_block'>
                          <p style={{ fontWeight:600 }}>套餐{index +1}</p>
                          <Form.Item required labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="价格（元）" name={[field.name, 'quota_price']}><Input /></Form.Item>
                          <Form.Item required labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="备注信息" name={[field.name, 'quota_type']}><TextArea /></Form.Item>
                          <CloseOutlined className='close_in_quota_block' onClick={() => { subOpt.remove(field.name); }}
                          />
                        </div>
                      ))}
                      <Button type="dashed" onClick={() => subOpt.add()} block>添加套餐</Button>
                    </div>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
          </Row> 
          <Space>
            <Button type="primary" htmlType="submit">生成报价单</Button>
            <Button htmlType="button" onClick={onReset}>重置</Button>
          </Space>
        </>        
      </Form>
    </>
  );
};
export default SettlementCreate;