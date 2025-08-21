
import React, { useState } from 'react';

import { CloseOutlined } from '@ant-design/icons';
import { Button, Modal, Form, Input, Row, Col } from 'antd';
import { EditPartyAInfo, GetPartyAInfo } from '../../request';  
import './index.css';


const CustomerEditdModal = (props) => {

  const [form] = Form.useForm();


  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const [info, setInfo] = useState({});
  

  const showModal = () => {
    setOpen(true);
    getInfo();
  };

  const getInfo = () => {
    GetPartyAInfo(props.id).then((resp) => {
      form.setFieldsValue({
        company_name: resp.data.data.company_name,
        credit_code: resp.data.data.credit_code,
        legal_person: resp.data.data.legal_person,
        company_address: resp.data.data.company_address,
        depository_bank: resp.data.data.depository_bank,
        bank_account_no: resp.data.data.bank_account_no,
        contact_person: resp.data.data.contact_person,
        contact_phone: resp.data.data.contact_phone,
        contact_email: resp.data.data.contact_email,
        power_supply_info: resp.data.data.power_supply_info,
      })
    })
    .catch((error) => {
      console.log('fetch data failed', error);
    }).finally(() => {
    });
  };    
  

  const handleOk = () => {
    setConfirmLoading(true);
    const submitInfo = form.getFieldsValue();
    
    EditPartyAInfo(props.id, submitInfo).then(() => {
      props.messageApi.success("更新客户信息成功")
      props.reload();
    }).catch(()=> {
      props.messageApi.error("更新客户信息失败")
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
      <Button color="cyan" variant="link" className='nopadding'  onClick={showModal}>编辑</Button>
      <Modal
        closable={false}
        maskClosable={false}
        title="更新客户信息"
        okText="确定"
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
          // initialValues={{
          // }}
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
export default CustomerEditdModal;