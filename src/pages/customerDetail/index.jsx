import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Descriptions, Row, Col } from 'antd';

import { GetPartyAInfo } from '../../request';


const PowerSupplyInfo = (props) => {
  if(!props.data) {return null}
  return props.data.map(i => {
    return(
      <Row>
        <Col span={8} style={{paddingRight: 10}}><span style={{color:'gray', paddingRight: 4}}>用电地址: </span>{i.power_supply_address}</Col>
        <Col span={8} style={{paddingRight: 10}}><span style={{color:'gray', paddingRight: 4}}>用电户号: </span>{i.power_supply_number}</Col>
      </Row> 
    )
  })
}

const CustomerDetail = () => {

  let { id } = useParams();
  const [info, setInfo] = useState({});

  if(!info) {
    return (<div></div>)
  }
  
  useEffect(() => {
    getInfo();
  }, []);
  
  const getInfo = () => {
    GetPartyAInfo(id).then((resp) => {
      setInfo(resp.data.data);
    })
    .catch((error) => {
      console.log('fetch data failed', error);
    }).finally(() => {
    });
  };    
  

  const detailInfo = [
    {
      label: '公司主体名称',
      children: info.company_name,
    },
    {
      label: '公司统一社会信用代码',
      children: info.credit_code,
    },
    {
      label: '公司地址',
      children: info.company_address,
    },
    {
      label: '法人',
      children: info.legal_person,
    },
    {
      label: '开户银行',
      children: info.depository_bank,
    },
    {
      label: '开户银行账号',
      children: info.bank_account_no,
    },
    {
      label: '经办人',
      children: info.contact_person,
    },
    {
      label: '经办人联系号码',
      children: info.contact_phone,
    },
    {
      label: '经办人邮箱',
      children: info.contact_email,
    },
    {
      label: '甲方用电信息',
      key: info.ps_id,
      children: <PowerSupplyInfo data={info.power_supply_info}/>
    }
  ];

  return (
    <>
      <Descriptions
        title="客户基本信息"
        bordered
        items={detailInfo}
      />
    </>
    
  )

};

  
export default CustomerDetail;