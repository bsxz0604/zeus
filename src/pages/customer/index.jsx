import React, { useState, useEffect } from 'react';

import { Space, Table, Input, Form, Button, Modal, message, Flex } from 'antd';
import { Link } from 'react-router-dom';
import { routerName } from '../../router';
import { GetPartyAList, DeletePartyAInfo } from '../../request';  

import CustomerCreatedModal from '../customerCreate/index';

import './index.css';

const { Column } = Table;


import axios from 'axios';
import CustomerEditdModal from '../customerEdit';



const DoubleConfirmButton = (props) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
 
  const showFirstConfirm = () => {
    setVisible(true);
  };
 
  const handleFirstConfirmCancel = () => {
    setVisible(false);
  };
 
  const handleFirstConfirmOk = () => {
    setVisible(false);
    setConfirmLoading(true);
    DeletePartyAInfo(props.id).then(() => {
      setConfirmLoading(false);
      setVisible(false); // 关闭第二次确认对话框
      props.messageApi.success("删除成功")
      props.reload();
    })
  };
 
  return (
    <>
      <Button color="danger" variant="link" className='nopadding' onClick={showFirstConfirm}>删除</Button>
      <Modal
        title="确认删除"
        open={visible}
        onOk={handleFirstConfirmOk}
        confirmLoading={confirmLoading}
        onCancel={handleFirstConfirmCancel}
      >
        <p>您确定要删除这项内容吗？</p>
      </Modal>
    </>
  );
};


const Customer = () => {
  const [form] = Form.useForm();

  const [messageApi, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState(false);

  const [tableLoading, setTableLoading] = useState(false);

  const [list, setList] = useState([]);
  
   useEffect(() => {
      reload();
    }, []);
  
  const reload = () => {
    setTableLoading(true);
    GetPartyAList().then((resp) => {
      setList(resp.data.data.party_a_list);
      setTableLoading(false);
    })
    .catch((error) => {
      console.log('fetch data failed', error);
      setTableLoading(false);

    }).finally(() => {
    });
  };

  const handleSubmit = async () => {    
    messageApi.error('请输入有效的搜索条件');
    try {
      setLoading(true);
      // const values = await form.validateFields();
      // onSearch(values);
    } catch (error) {
      message.error('请输入有效的搜索条件');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {contextHolder}
      <div style={{paddingBottom: 24}}>
        <Flex gap="middle" justify="space-between">
          <CustomerCreatedModal reload={reload} messageApi={messageApi}/>
          <Form form={form} layout="inline">
            {/* <Form.Item name="party_a_name" label="主体名称">
              <Input placeholder=""/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" onClick={handleSubmit} loading={loading}>
                  搜索
                </Button>
            </Form.Item> */}
          </Form>
        </Flex>
      </div>
      <Table 
        dataSource={list}
        scroll={{ x: 'max-content' }}
        sticky={{ offsetHeader: 64 }}
        loading={tableLoading}
        bordered
      >
        <Column title="主体名称" dataIndex={'company_name'} />
        <Column title="统一社会信用代码" minWidth={95} dataIndex={'credit_code'} />
        <Column title="经办人姓名" dataIndex={'contact_person'} />
        <Column title="经办人电话" dataIndex={'contact_phone'} />

        <Column title="法人" dataIndex={'legal_person'} />
        <Column title="开户银行" dataIndex={'depository_bank'} />

        <Column
          title="Action"
          key="action"
          fixed='right'
          render={(_, record) => (
              <Space size="middle">
                <Link to={`${routerName.customer}/${record.party_a_id}`}>详情</Link>
                <CustomerEditdModal id={record.party_a_id} reload={reload} messageApi={messageApi}/>
                <DoubleConfirmButton id={record.party_a_id} reload={reload} messageApi={messageApi}/>
              </Space>
        )}
        />
      </Table>
    </div>
  );
};
export default Customer;