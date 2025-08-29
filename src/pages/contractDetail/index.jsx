import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Descriptions } from 'antd';

import { GetContractInfo } from '../../request';





const ContractDetail = () => {


  let { id } = useParams();
  const [info, setInfo] = useState({});

  if(!info) {
    return (<div></div>)
  }
  
  useEffect(() => {
    getInfo();
  }, []);
  
  const getInfo = () => {
    GetContractInfo(id).then((resp) => {
      console.info('=======',resp.data.data);
      setInfo(resp.data.data);
    })
    .catch((error) => {
      console.log('fetch data failed', error);
    }).finally(() => {
    });
  };  

  const detailInfo = [
    // {
    //   label: '甲方主体名称',
    //   children: info.partyAName,
    // },
    // {
    //   label: '提交时间',
    //   children: info.uploadTime,
    // },
    // {
    //   label: '确认时间',
    //   children: info.confirmTime,
    // },
    {
      label: '甲方合同编号',
      children: info.contract_content?.party_a_contract_no,
    },
    {
      label: '乙方合同编号',
      children: info.contract_content?.party_b_contract_no,
    },
    {
      label: '合同签订日期',
      children: info.contract_content?.contract_sign_date,
    },
    // {
    //   label: '交易开始时间',
    //   children: info.contractStartTime,
    // },
    // {
    //   label: '交易结束时间',
    //   children: info.contractEndTime,
    // },
    // {
    //   label: '合计电量',
    //   children: info.totalElectric,
    // },
    // {
    //   label: '甲方签订日期',
    //   children: info.partyASignTime,
    // },
    // {
    //   label: '乙方签订日期',
    //   children: info.partyBSignTime,
    // },
    // {
    //   label: '零售平台下单时间',
    //   children: info.orderTime,
    // },
    // {
    //   label: '签约地点',
    //   children: info.orderAddress,
    // }
  ];

  const partyAInfo = [
    {
      label: '甲方主体名称',
      children: info.contract_content?.party_a.company_name,
    },
    {
      label: '甲方统一社会信用代码',
      children: info.contract_content?.party_a.credit_code,
    },
    {
      label: '甲方经办人姓名',
      children: info.contract_content?.party_a.contact_person,
    },
    {
      label: '甲方经办人电话',
      children: info.contract_content?.party_a.contact_phone,
    },
    {
      label: '甲方经办人联系邮箱',
      children: info.contract_content?.party_a.contact_email,
    },
    {
      label: '甲方公司住所',
      children: info.contract_content?.party_a.company_address,
    },
    {
      label: '甲方法人',
      children: info.contract_content?.party_a.legal_person,
    },
    {
      label: '甲方开户银行',
      children: info.contract_content?.party_a.depository_bank,
    },
    {
      label: '甲方开户账号',
      children: info.contract_content?.party_a.bank_account_no,
    }
  ];

  const partyBInfo = [
    {
      label: '乙方主体名称',
      children: info.contract_content?.party_b.company_name,
    },
    {
      label: '乙方经办人姓名',
      children: info.contract_content?.party_b.contact_person,
    },
    {
      label: '乙方经办人电话',
      children: info.contract_content?.party_b.contact_phone,
    },
  ];

  const packageInfo = [   
    {
      label: '套餐名称',
      children: info.contract_content?.quotation_info?.quote_type,
    },
    {
      label: '合计电量',
      children: info.contract_content?.quotation_info?.total_electricity,
    },
    {
      label: '交易开始时间',
      children: info.contract_content?.quotation_info?.trade_start_time,
    },
    {
      label: '交易结束时间',
      children: info.contract_content?.quotation_info?.trade_end_time,
    },
    {
      label: '固定价格用电量比例',
      children: info.contract_content?.quote_details?.fixed_price_ratio|| '/',
    },    
    {
      label: '市场化成交电价',
      children: info.contract_content?.quote_details?.market_transaction_price || '/',
    },    
    {
      label: '限价',
      children: info.contract_content?.quote_details?.price_limit || '/',
    },
    {
      label: '绿电价格',
      children: info.contract_content?.quote_details?.green_electricity_price|| '/',
    },
    {
      label: '合计电量',
      children: info.contract_content?.quotation_info?.total_electricity,
    },
    {
      label: '用电量正负偏差',
      children: info.contract_content?.quotation_info?.electricity_deviation ? `${info.contract_content?.quotation_info?.electricity_deviation}%` : '/',
    },
    {
      label: '是否约定执行标准用电曲线',
      children: info.contract_content?.quotation_info?.standard_curve_method ? '是' : '否',
    },

    {
      label: '用电量超出正偏差比例',
      children: info.contract_content?.quotation_info?.positive_deviation_ratio ? `${info.contract_content?.quotation_info?.positive_deviation_ratio}%`: '/',
    },
    {
      label: '用电量正偏差外价格',
      children: info.contract_content?.quotation_info?.positive_deviation_price ? `¥${info.contract_content?.quotation_info?.positive_deviation_price}` : '/',
    },
    {
      label: '用电量超出负偏差比例',
      children: info.contract_content?.quotation_info?.negative_deviation_ratio ? `${info.contract_content?.quotation_info?.negative_deviation_ratio}%` : '/',
    },
    {
      label: '用电量负偏差外价格',
      children: info.contract_content?.quotation_info?.negative_deviation_price ? `¥${info.contract_content?.quotation_info?.negative_deviation_price}` : '/',
    }
  ];

  return (
    <>
    <Descriptions
      title="合同基本信息"
      bordered
      items={detailInfo}
    />

    <Descriptions
      title="甲方详细信息"
      bordered
      items={partyAInfo}
      style={{paddingTop:24}}
    />

    <Descriptions
      title="乙方详细信息"
      bordered
      items={partyBInfo}
      style={{paddingTop:24}}
    />

    <Descriptions
      title="套餐信息"
      bordered
      items={packageInfo}
      style={{paddingTop:24}}
    />

    </>
    
  )

};

  
export default ContractDetail;