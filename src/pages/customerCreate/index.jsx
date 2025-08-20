
import React, { useState } from 'react';

import { CloseOutlined } from '@ant-design/icons';
import { Button, Modal, Form, Input, Row, Col } from 'antd';
import { CreatePartyA } from '../../request';  
import './index.css';


const CustomerCreatedModal = (props) => {

  const [form] = Form.useForm();


  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    const submitInfo = form.getFieldsValue();
    
    CreatePartyA(submitInfo).then(() => {
      props.messageApi.success("创建客户成功")
      props.reload();
    }).catch(()=> {
      props.messageApi.error("创建客户失败")
    }).finally(() => {
      setOpen(false);
      setConfirmLoading(false);

    });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>创建新客户</Button>
      <Modal
        closable={false}
        maskClosable={false}
        title="创建新客户"
        okText="创建"
        cancelText="取消"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          labelAlign='left'
          labelWrap
          layout="horizontal"
          // initialValues={{ quoteType: quote, company_name:"苏州中鑫新能源有限公司",  contact_person: '董小燕', contact_phone:'13814857279'}}
        >
          <>
            <Form.Item required label="客户公司名称" name="company_name"><Input /></Form.Item>
            <Form.Item required label="客户统一社会信用代码" name="credit_code"><Input /></Form.Item>
            <Form.Item required label="公司法人姓名" name="legal_person" ><Input /></Form.Item>
            <Form.Item required label="公司地址" name="company_address" ><Input /></Form.Item>


            <Row justify="space-between" gutter={16}>
              <Col span={12} ><Form.Item required label="公司开户银行" name="depository_bank" ><Input /></Form.Item></Col>
              <Col span={12} ><Form.Item required label="公司开户账号" name="bank_account_no" ><Input /></Form.Item></Col>
            </Row> 

            <Row justify="space-between" gutter={16}>
              <Col span={8} ><Form.Item required label="经办人姓名" name="contact_person"><Input /></Form.Item></Col>
              <Col span={8} ><Form.Item required label="经办人电话" name="contact_phone"><Input /></Form.Item></Col>
              <Col span={8} ><Form.Item required label="经办人邮箱" name="contact_email"><Input /></Form.Item></Col>
            </Row>

             <Form.Item label="客户用电信息">
                <Form.List name='power_supply_info'>
                  {(fields, subOpt) => (
                    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                      {fields.map(field => (
                        <div key={field.key} className='address_block'>
                          <Form.Item labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="用电地址" name={[field.name, 'power_supply_address']}><Input /></Form.Item>
                          <Form.Item labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} label="用电地址对应户号" name={[field.name, 'power_supply_number']}><Input /></Form.Item>
                          <CloseOutlined className='close_in_address_block' onClick={() => { subOpt.remove(field.name); }}
                          />
                        </div>
                      ))}
                      <Button type="dashed" onClick={() => subOpt.add()} block>添加地址</Button>
                    </div>
                  )}
                </Form.List>
              </Form.Item>
          </>
        </Form>
      </Modal>
    </>
  );
};
export default CustomerCreatedModal;