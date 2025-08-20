import React, { useState, useEffect } from 'react';

import { Space, Table, Tag, Input, Form, Button, message, Flex } from 'antd';
import { Link } from 'react-router-dom';
import { routerName } from '../../router';

import { response} from './mock';

import ContractCreatedModal from '../contractCreate/index';
import { ContractPDF, GetContractList } from '../../request';

const { Column, ColumnGroup } = Table;



const ContractList = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const [tableLoading, setTableLoading] = useState(false);

  const [list, setList] = useState([]);
  
   useEffect(() => {
      reload();
    }, []);
  
  const reload = () => {
    setTableLoading(true);

    GetContractList().then((resp) => {
      console.info('=======123', resp)
      setList(resp.data.data);
      setTableLoading(false);
    })
    .catch((error) => {
      console.log('fetch data failed', error);
      setTableLoading(false);

    }).finally(() => {
    });
  };


  const downloadContractWord = (id) => {
    ContractPDF(id).then((resp) => {
      const blobObj = new Blob([resp.data], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
      const downloadLink = document.createElement('a');
      let url = window.URL || window.webkitURL || window.moxURL; // 浏览器兼容
      url = url.createObjectURL(blobObj);
      downloadLink.href = url;
      downloadLink.download = `contract_${id}_${new Date().toISOString().slice(0,19).replace(/:/g, '-')}.docx`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      window.URL.revokeObjectURL(url);
    })
  } 


  const getElectricityQuoteTagColor = (id) => {
    if(id == 1) {
      return '#87d068';
    } 
    if(id == 2) {
      return '#108ee9';
    } 
    if(id == 3) {
      return '#2db7f5';
    } 
    return '#87d068';
  }


  const handleSubmit = async () => {
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
      <div style={{paddingBottom: 24}}>
        <Flex gap="middle" justify="space-between">
          <ContractCreatedModal />
          <Form form={form} layout="inline">
            <Form.Item name="party_a_name" label="甲方主体名称">
              <Input placeholder="请输入工单号"/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" onClick={handleSubmit} loading={loading}>
                  搜索
                </Button>
            </Form.Item>
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
        {/* <Column title="工单号" dataIndex="id" key="id" fixed='left'/> */}
        <ColumnGroup title="甲方信息">
          <Column title="主体名称" dataIndex={['contract_content', 'party_a', 'company_name']} />
          <Column title="经办人姓名" minWidth={95} dataIndex={['contract_content', 'party_a', 'contact_person']} />
          <Column title="经办人电话" dataIndex={['contract_content', 'party_a', 'contact_phone']} />
        </ColumnGroup>

        <ColumnGroup title="合同信息">
          <Column title="甲方合同编号" dataIndex={['contract_content', 'party_a_contract_no']} />
          <Column title="乙方合同编号" dataIndex={['contract_content', 'party_b_contract_no']} />
        </ColumnGroup>

        <Column title="交易开始时间" dataIndex={['contract_content', 'electricity_quote', 'trade_start_time']} />
        <Column title="交易结束时间" dataIndex={['contract_content', 'electricity_quote', 'trade_end_time']} />
        <Column title="合计电量" dataIndex={['contract_content', 'electricity_quote', 'total_electricity']} fixed='right' />
        <Column
          fixed='right'
          title="套餐类型"
          dataIndex={['contract_content', 'electricity_quote']}
          render={(electricity_quote) => {
            return (
              <Tag color={getElectricityQuoteTagColor(electricity_quote.quote_type_id)}> {electricity_quote.quote_type}</Tag>
            )
          }}
          />
        <Column
          title="Action"
          key="action"
          fixed='right'
          render={(_, record) => (
              <Space size="middle">
                <Link to={`${routerName.contract.list}/${record.id}`}>详情</Link>
                <Button color="danger" variant="link" onClick={() =>downloadContractWord(record.id)}>生成合同</Button>
                {/* <Button color="danger" variant="link" >报价单生成</Button> */}
              </Space>
        )}
        />
      </Table>
    </div>
  );
};
export default ContractList;