import React, { useState, useEffect } from 'react';

import { Button, Modal,
  DatePicker,
  Form,
  Input,
  Divider,
  Radio,
  Row,
  Col,
  Select } from 'antd';

import { CreateContract, GetPartyAList } from '../../request';

import locale from 'antd/locale/zh_CN';
import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');
  
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const noChoosedPartyA = 'noChoosedPartyA';


function isValidNumber(value) {
  const num = Number(value);
  return !isNaN(num); // 只要能转为数字即可，包括 0
}

const ContractCreatedModal = (props) => {

  const [form] = Form.useForm();
  

  const [quote, setQuote] = useState(1);

  const [choosedPartyAId , setChoosedPartyAId] = useState('');
  const [partyACustomname, setPartyACustomname] = useState('');
  const [filingMethod, setFilingMethod] = useState('(2)');

  const [filingParty, setFilingParty] = useState('乙');

  const [choosedPartyAInfo, setChoosedPartyAInfo] = useState({});
  const [customerList, setCustomerList] = useState([]);

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);


  useEffect(() => {
    getCustomerList();
  }, []);

  const getCustomerList = () => {
    GetPartyAList().then((resp) => {
      setCustomerList(resp.data.data.party_a_list);
    })
    .catch((error) => {
      console.log('fetch data failed', error);
    }).finally(() => {
    });
  }

  const showModal = () => {
    setOpen(true);
  };


  const handleOk = () => {
    setConfirmLoading(true);
    let submitInfo = form.getFieldsValue();

    let trade_start_time = form.getFieldValue('trade_time_form')[0].date(1);
    let trade_end_time = form.getFieldValue('trade_time_form')[1].endOf('month');
    let monthly_electricity_array = [];
    while(trade_start_time.isBefore(trade_end_time)) {
      monthly_electricity_array.push(`${trade_start_time.format('YYYY-MM')}`);
      trade_start_time = trade_start_time.add(1, 'month');
    }
    let monthly_electricity = {};
    monthly_electricity_array.map(i => {
      const total = form.getFieldValue(['quotation', 'total_electricity']) || 0;
      monthly_electricity[`${i}`] = Number(total) / monthly_electricity_array.length;
    });

    let req = {
      ...submitInfo,    
      party_b_id: Number(submitInfo.party_b_id),

      // work_order_number: `WO-2025-0012-${new Date().toISOString().slice(0,19).replace(/:/g, '-')}`,
      // contract_sign_date: form.getFieldValue('contract_sign_date').format('YYYY-MM-DD'),
      // submission_time: form.getFieldValue('submission_time').format('YYYY-MM-DD'),
      // confirmation_time: form.getFieldValue('confirmation_time').format('YYYY-MM-DD'),
      // order_time: form.getFieldValue('order_time').format('YYYY-MM-DD'),

      party_a_sign_date: form.getFieldValue('party_a_sign_date').format('YYYY-MM-DD'),
      party_b_sign_date: form.getFieldValue('party_b_sign_date').format('YYYY-MM-DD'),

      quotation: {
        ...submitInfo.quotation,

        total_electricity:Number(submitInfo.quotation.total_electricity),
        monthly_electricity,
        trade_start_time: form.getFieldValue('trade_time_form')[0].date(1).format('YYYY-MM-DD'),
        trade_end_time: form.getFieldValue('trade_time_form')[1].endOf('month').format('YYYY-MM-DD'),
      }
    }

    // 甲方的处理
    if(choosedPartyAId == noChoosedPartyA) {
      req.party_a_custom = true;
      // req.party_a_id =  -1,
      req.party_a_custom_company = partyACustomname;
      // req.party_a_custom_credit_code = '';
      // req.party_a_custom_legal_person = '';
      // req.party_a_custom_address = '';
      // req.party_a_custom_bank = '';
      // req.party_a_custom_bank_account = '';
      // req.party_a_custom_contact_person = '';
    } else {
      req.party_a_custom = false;
    }

    //处理套餐启动和结束时间
    delete(req.trade_time_form);

    // 处理套餐
    {
      req.quotation.green_elec_price = isValidNumber(req.quotation.green_elec_price) ? Number(req.quotation.green_elec_price) : null;

      req.quotation.electricity_deviation = isValidNumber(req.quotation.electricity_deviation) ? Number(req.quotation.electricity_deviation) : null;
      req.quotation.positive_deviation_ratio = isValidNumber(req.quotation.positive_deviation_ratio) ? Number(req.quotation.positive_deviation_ratio) : null;
      req.quotation.positive_deviation_price = isValidNumber(req.quotation.positive_deviation_price) ? Number(req.quotation.positive_deviation_price) : null;
      req.quotation.negative_deviation_ratio = isValidNumber(req.quotation.negative_deviation_ratio) ? Number(req.quotation.negative_deviation_ratio) : null;
      req.quotation.negative_deviation_price = isValidNumber(req.quotation.negative_deviation_price) ? Number(req.quotation.negative_deviation_price) : null;

      req.quotation.curve_modify_days = isValidNumber(req.quotation.curve_modify_days) ? Number(req.quotation.curve_modify_days) : null;
      req.quotation.curve_deviation = isValidNumber(req.quotation.curve_deviation) ? Number(req.quotation.curve_deviation) : null;
      req.quotation.curve_positive_ratio = isValidNumber(req.quotation.curve_positive_ratio) ? Number(req.quotation.curve_positive_ratio) : null;
      req.quotation.curve_positive_price = isValidNumber(req.quotation.curve_positive_price) ? Number(req.quotation.curve_positive_price) : null;
      req.quotation.curve_negative_ratio = isValidNumber(req.quotation.curve_negative_ratio) ? Number(req.quotation.curve_negative_ratio) : null;
     req.quotation.curve_negative_price = isValidNumber(req.quotation.curve_negative_price) ? Number(req.quotation.curve_negative_price) : null;

    }
    // 处理套餐detail 
    if(quote == 1) {

      req.quotation.quote_details.fixed_price_ratio = isValidNumber(req.quotation.quote_details.fixed_price_ratio) ? Number(req.quotation.quote_details.fixed_price_ratio) : null;
      req.quotation.quote_details.market_transaction_price = isValidNumber(req.quotation.quote_details.market_transaction_price) ? Number(req.quotation.quote_details.market_transaction_price) : null;
      req.quotation.quote_details.price_limit = isValidNumber(req.quotation.quote_details.price_limit) ? Number(req.quotation.quote_details.price_limit) : null;

      delete(req.quotation.quote_details.ps_prop_sharing_ratio);
      delete(req.quotation.quote_details.ps_dist_ref_price);
      delete(req.quotation.quote_details.ps_long_term_trans_ratio);
      delete(req.quotation.quote_details.ps_party_a_prop_below_long_term);
      delete(req.quotation.quote_details.ps_party_b_prop_below_long_term);
      delete(req.quotation.quote_details.ps_party_a_prop_above_long_term);
      delete(req.quotation.quote_details.ps_party_b_prop_above_long_term);
      delete(req.quotation.quote_details.ps_monthly_bid_ratio);
      delete(req.quotation.quote_details.ps_party_a_prop_below_monthly_bid);
      delete(req.quotation.quote_details.ps_party_b_prop_below_monthly_bid);
      delete(req.quotation.quote_details.ps_party_a_prop_above_monthly_bid);
      delete(req.quotation.quote_details.ps_party_b_prop_above_monthly_bid);
      delete(req.quotation.quote_details.ps_agent_proc_ratio);
      delete(req.quotation.quote_details.ps_party_a_prop_below_agent_proc);
      delete(req.quotation.quote_details.ps_party_b_prop_below_agent_proc);
      delete(req.quotation.quote_details.ps_party_a_prop_above_agent_proc);
      delete(req.quotation.quote_details.ps_party_b_prop_above_agent_proc);
      delete(req.quotation.quote_details.ps_intra_month_ratio);
      delete(req.quotation.quote_details.ps_party_a_prop_below_intra_month);
      delete(req.quotation.quote_details.ps_party_b_prop_below_intra_month);
      delete(req.quotation.quote_details.ps_party_a_prop_above_intra_month);
      delete(req.quotation.quote_details.ps_party_b_prop_above_intra_month);
      delete(req.quotation.quote_details.ps_long_term_trans_limit);
      delete(req.quotation.quote_details.ps_monthly_bid_limit);
      delete(req.quotation.quote_details.ps_agent_proc_limit);
      delete(req.quotation.quote_details.ps_intra_month_limit);


      delete(req.quotation.quote_details.pd_intra_month_ratio);
      delete(req.quotation.quote_details.pd_intra_month_avg_price);
      delete(req.quotation.quote_details.pd_monthly_bid_limit);
      delete(req.quotation.quote_details.pd_agent_proc_limit);
      delete(req.quotation.quote_details.pd_intra_month_limit);
      delete(req.quotation.quote_details.pd_price_diff_fluc_ratio);
      delete(req.quotation.quote_details.pd_long_term_trans_ratio);
      delete(req.quotation.quote_details.pd_long_term_trans_avg_price);
      delete(req.quotation.quote_details.pd_long_term_trans_limit);
      delete(req.quotation.quote_details.pd_monthly_bid_ratio);
      delete(req.quotation.quote_details.pd_monthly_bid_clear_price);
      delete(req.quotation.quote_details.pd_agent_proc_ratio);
      delete(req.quotation.quote_details.pd_agent_avg_price);
    }

    if(quote == 2) {
      delete(req.quotation.quote_details.fixed_price_ratio);
      delete(req.quotation.quote_details.market_transaction_price);
      delete(req.quotation.quote_details.price_limit);

      req.quotation.quote_details.ps_prop_sharing_ratio = isValidNumber(req.quotation.quote_details.ps_prop_sharing_ratio) ? Number(req.quotation.quote_details.ps_prop_sharing_ratio) : null;
      req.quotation.quote_details.ps_dist_ref_price = isValidNumber(req.quotation.quote_details.ps_dist_ref_price) ? Number(req.quotation.quote_details.ps_dist_ref_price) : null;
      req.quotation.quote_details.ps_long_term_trans_ratio = isValidNumber(req.quotation.quote_details.ps_long_term_trans_ratio) ? Number(req.quotation.quote_details.ps_long_term_trans_ratio) : null;
      req.quotation.quote_details.ps_party_a_prop_below_long_term = isValidNumber(req.quotation.quote_details.ps_party_a_prop_below_long_term) ? Number(req.quotation.quote_details.ps_party_a_prop_below_long_term) : null;
      req.quotation.quote_details.ps_party_b_prop_below_long_term = isValidNumber(req.quotation.quote_details.ps_party_b_prop_below_long_term) ? Number(req.quotation.quote_details.ps_party_b_prop_below_long_term) : null;
      req.quotation.quote_details.ps_party_a_prop_above_long_term = isValidNumber(req.quotation.quote_details.ps_party_a_prop_above_long_term) ? Number(req.quotation.quote_details.ps_party_a_prop_above_long_term) : null;
      req.quotation.quote_details.ps_party_b_prop_above_long_term = isValidNumber(req.quotation.quote_details.ps_party_b_prop_above_long_term) ? Number(req.quotation.quote_details.ps_party_b_prop_above_long_term) : null;
      req.quotation.quote_details.ps_monthly_bid_ratio = isValidNumber(req.quotation.quote_details.ps_monthly_bid_ratio) ? Number(req.quotation.quote_details.ps_monthly_bid_ratio) : null;
      req.quotation.quote_details.ps_party_a_prop_below_monthly_bid = isValidNumber(req.quotation.quote_details.ps_party_a_prop_below_monthly_bid) ? Number(req.quotation.quote_details.ps_party_a_prop_below_monthly_bid) : null;
      req.quotation.quote_details.ps_party_b_prop_below_monthly_bid = isValidNumber(req.quotation.quote_details.ps_party_b_prop_below_monthly_bid) ? Number(req.quotation.quote_details.ps_party_b_prop_below_monthly_bid) : null;
      req.quotation.quote_details.ps_party_a_prop_above_monthly_bid = isValidNumber(req.quotation.quote_details.ps_party_a_prop_above_monthly_bid) ? Number(req.quotation.quote_details.ps_party_a_prop_above_monthly_bid) : null;
      req.quotation.quote_details.ps_party_b_prop_above_monthly_bid = isValidNumber(req.quotation.quote_details.ps_party_b_prop_above_monthly_bid) ? Number(req.quotation.quote_details.ps_party_b_prop_above_monthly_bid) : null;
      req.quotation.quote_details.ps_agent_proc_ratio = isValidNumber(req.quotation.quote_details.ps_agent_proc_ratio) ? Number(req.quotation.quote_details.ps_agent_proc_ratio) : null;
      req.quotation.quote_details.ps_party_a_prop_below_agent_proc = isValidNumber(req.quotation.quote_details.ps_party_a_prop_below_agent_proc) ? Number(req.quotation.quote_details.ps_party_a_prop_below_agent_proc) : null;
      req.quotation.quote_details.ps_party_b_prop_below_agent_proc = isValidNumber(req.quotation.quote_details.ps_party_b_prop_below_agent_proc) ? Number(req.quotation.quote_details.ps_party_b_prop_below_agent_proc) : null;
      req.quotation.quote_details.ps_party_a_prop_above_agent_proc = isValidNumber(req.quotation.quote_details.ps_party_a_prop_above_agent_proc) ? Number(req.quotation.quote_details.ps_party_a_prop_above_agent_proc) : null;
      req.quotation.quote_details.ps_party_b_prop_above_agent_proc = isValidNumber(req.quotation.quote_details.ps_party_b_prop_above_agent_proc) ? Number(req.quotation.quote_details.ps_party_b_prop_above_agent_proc) : null;
      req.quotation.quote_details.ps_intra_month_ratio = isValidNumber(req.quotation.quote_details.ps_intra_month_ratio) ? Number(req.quotation.quote_details.ps_intra_month_ratio) : null;
      req.quotation.quote_details.ps_party_a_prop_below_intra_month = isValidNumber(req.quotation.quote_details.ps_party_a_prop_below_intra_month) ? Number(req.quotation.quote_details.ps_party_a_prop_below_intra_month) : null;
      req.quotation.quote_details.ps_party_b_prop_below_intra_month = isValidNumber(req.quotation.quote_details.ps_party_b_prop_below_intra_month) ? Number(req.quotation.quote_details.ps_party_b_prop_below_intra_month) : null;
      req.quotation.quote_details.ps_party_a_prop_above_intra_month = isValidNumber(req.quotation.quote_details.ps_party_a_prop_above_intra_month) ? Number(req.quotation.quote_details.ps_party_a_prop_above_intra_month) : null;
      req.quotation.quote_details.ps_party_b_prop_above_intra_month = isValidNumber(req.quotation.quote_details.ps_party_b_prop_above_intra_month) ? Number(req.quotation.quote_details.ps_party_b_prop_above_intra_month) : null;
      req.quotation.quote_details.ps_long_term_trans_limit = isValidNumber(req.quotation.quote_details.ps_long_term_trans_limit) ? Number(req.quotation.quote_details.ps_long_term_trans_limit) : null;
      req.quotation.quote_details.ps_monthly_bid_limit = isValidNumber(req.quotation.quote_details.ps_monthly_bid_limit) ? Number(req.quotation.quote_details.ps_monthly_bid_limit) : null;
      req.quotation.quote_details.ps_agent_proc_limit = isValidNumber(req.quotation.quote_details.ps_agent_proc_limit) ? Number(req.quotation.quote_details.ps_agent_proc_limit) : null;
      req.quotation.quote_details.ps_intra_month_limit = isValidNumber(req.quotation.quote_details.ps_intra_month_limit) ? Number(req.quotation.quote_details.ps_intra_month_limit) : null;
      
      delete(req.quotation.quote_details.pd_intra_month_ratio);
      delete(req.quotation.quote_details.pd_intra_month_avg_price);
      delete(req.quotation.quote_details.pd_monthly_bid_limit);
      delete(req.quotation.quote_details.pd_agent_proc_limit);
      delete(req.quotation.quote_details.pd_intra_month_limit);
      delete(req.quotation.quote_details.pd_price_diff_fluc_ratio);
      delete(req.quotation.quote_details.pd_long_term_trans_ratio);
      delete(req.quotation.quote_details.pd_long_term_trans_avg_price);
      delete(req.quotation.quote_details.pd_long_term_trans_limit);
      delete(req.quotation.quote_details.pd_monthly_bid_ratio);
      delete(req.quotation.quote_details.pd_monthly_bid_clear_price);
      delete(req.quotation.quote_details.pd_agent_proc_ratio);
      delete(req.quotation.quote_details.pd_agent_avg_price);

    }

    if(quote == 3) {
      delete(req.quotation.quote_details.fixed_price_ratio);
      delete(req.quotation.quote_details.market_transaction_price);
      delete(req.quotation.quote_details.price_limit);

      delete(req.quotation.quote_details.ps_prop_sharing_ratio);
      delete(req.quotation.quote_details.ps_dist_ref_price);
      delete(req.quotation.quote_details.ps_long_term_trans_ratio);
      delete(req.quotation.quote_details.ps_party_a_prop_below_long_term);
      delete(req.quotation.quote_details.ps_party_b_prop_below_long_term);
      delete(req.quotation.quote_details.ps_party_a_prop_above_long_term);
      delete(req.quotation.quote_details.ps_party_b_prop_above_long_term);
      delete(req.quotation.quote_details.ps_monthly_bid_ratio);
      delete(req.quotation.quote_details.ps_party_a_prop_below_monthly_bid);
      delete(req.quotation.quote_details.ps_party_b_prop_below_monthly_bid);
      delete(req.quotation.quote_details.ps_party_a_prop_above_monthly_bid);
      delete(req.quotation.quote_details.ps_party_b_prop_above_monthly_bid);
      delete(req.quotation.quote_details.ps_agent_proc_ratio);
      delete(req.quotation.quote_details.ps_party_a_prop_below_agent_proc);
      delete(req.quotation.quote_details.ps_party_b_prop_below_agent_proc);
      delete(req.quotation.quote_details.ps_party_a_prop_above_agent_proc);
      delete(req.quotation.quote_details.ps_party_b_prop_above_agent_proc);
      delete(req.quotation.quote_details.ps_intra_month_ratio);
      delete(req.quotation.quote_details.ps_party_a_prop_below_intra_month);
      delete(req.quotation.quote_details.ps_party_b_prop_below_intra_month);
      delete(req.quotation.quote_details.ps_party_a_prop_above_intra_month);
      delete(req.quotation.quote_details.ps_party_b_prop_above_intra_month);
      delete(req.quotation.quote_details.ps_long_term_trans_limit);
      delete(req.quotation.quote_details.ps_monthly_bid_limit);
      delete(req.quotation.quote_details.ps_agent_proc_limit);
      delete(req.quotation.quote_details.ps_intra_month_limit);

      req.quotation.quote_details.pd_intra_month_ratio = isValidNumber(req.quotation.quote_details.pd_intra_month_ratio) ? Number(req.quotation.quote_details.pd_intra_month_ratio) : null;
      req.quotation.quote_details.pd_intra_month_avg_price = isValidNumber(req.quotation.quote_details.pd_intra_month_avg_price) ? Number(req.quotation.quote_details.pd_intra_month_avg_price) : null;
      req.quotation.quote_details.pd_monthly_bid_limit = isValidNumber(req.quotation.quote_details.pd_monthly_bid_limit) ? Number(req.quotation.quote_details.pd_monthly_bid_limit) : null;
      req.quotation.quote_details.pd_agent_proc_limit = isValidNumber(req.quotation.quote_details.pd_agent_proc_limit) ? Number(req.quotation.quote_details.pd_agent_proc_limit) : null;
      req.quotation.quote_details.pd_intra_month_limit = isValidNumber(req.quotation.quote_details.pd_intra_month_limit) ? Number(req.quotation.quote_details.pd_intra_month_limit) : null;
      req.quotation.quote_details.pd_price_diff_fluc_ratio = isValidNumber(req.quotation.quote_details.pd_price_diff_fluc_ratio) ? Number(req.quotation.quote_details.pd_price_diff_fluc_ratio) : null;
      req.quotation.quote_details.pd_long_term_trans_ratio = isValidNumber(req.quotation.quote_details.pd_long_term_trans_ratio) ? Number(req.quotation.quote_details.pd_long_term_trans_ratio) : null;
      req.quotation.quote_details.pd_long_term_trans_avg_price = isValidNumber(req.quotation.quote_details.pd_long_term_trans_avg_price) ? Number(req.quotation.quote_details.pd_long_term_trans_avg_price) : null;
      req.quotation.quote_details.pd_long_term_trans_limit = isValidNumber(req.quotation.quote_details.pd_long_term_trans_limit) ? Number(req.quotation.quote_details.pd_long_term_trans_limit) : null;
      req.quotation.quote_details.pd_monthly_bid_ratio = isValidNumber(req.quotation.quote_details.pd_monthly_bid_ratio) ? Number(req.quotation.quote_details.pd_monthly_bid_ratio) : null;
      req.quotation.quote_details.pd_monthly_bid_clear_price = isValidNumber(req.quotation.quote_details.pd_monthly_bid_clear_price) ? Number(req.quotation.quote_details.pd_monthly_bid_clear_price) : null;
      req.quotation.quote_details.pd_agent_proc_ratio = isValidNumber(req.quotation.quote_details.pd_agent_proc_ratio) ? Number(req.quotation.quote_details.pd_agent_proc_ratio) : null;
      req.quotation.quote_details.pd_agent_avg_price = isValidNumber(req.quotation.quote_details.pd_agent_avg_price) ? Number(req.quotation.quote_details.pd_agent_avg_price) : null;

    }

    // 补充信息
    {
      req.party_b_termination_before30 = isValidNumber(req.party_b_termination_before30) ? Number(req.party_b_termination_before30) : null;
      req.party_b_termination_other = isValidNumber(req.party_b_termination_other) ? Number(req.party_b_termination_other) : null;
      req.party_b_termination_active = isValidNumber(req.party_b_termination_active) ? Number(req.party_b_termination_active) : null;
      req.party_a_termination_before30 = isValidNumber(req.party_a_termination_before30) ? Number(req.party_a_termination_before30) : null;
      req.party_a_termination_in30 = isValidNumber(req.party_a_termination_in30) ? Number(req.party_a_termination_in30) : null;
      req.party_a_termination_active = isValidNumber(req.party_a_termination_active) ? Number(req.party_a_termination_active) : null;
    }

    // 处理备案方式 逻辑
    if(req.filing_method != '(2)') {
      delete(req.filing_party);
    }

    if(!req.additional_terms) {
      delete(req.additional_terms)
    }
    
    console.info('==========111', req);

    CreateContract(req).then(() => {
      props.messageApi.success("创建成功");
      props.reload();
    }).catch(()=> {
      props.messageApi.error("创建失败");
    }).finally(() => {
      setOpen(false);
      setConfirmLoading(false);
    });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const setCusPartyAName = (e) => {
    setPartyACustomname(e.target.value);
  }


  const onFormLayoutChange = (info) => {
    if(info.quotation && info.quotation.quote_type_id && info.quotation.quote_type_id != quote) {
      setQuote(info.quotation.quote_type_id);
    }
    if(info.party_a_id && info.party_a_id != choosedPartyAId ) {
      setChoosedPartyAId(info.party_a_id);
      
      if(info.party_a_id == noChoosedPartyA) {
        setChoosedPartyAInfo({});
        setPartyACustomname();
      }
      
      customerList.map(i => {
        if(i.party_a_id ==info.party_a_id) {
          setChoosedPartyAInfo(i);
        }
      })
    }
    if(info.filing_method && info.filing_method != filingMethod ){
      setFilingMethod(info.filing_method);
    }

    if(info.filing_party && info.filing_party != filingParty)  {
      setFilingParty(info.filing_party);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>生成新合同</Button>
      <Modal
        width={'50%'}
        closable={false}
        maskClosable={false}
        title="创建新合同"
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
          initialValues={
            { 
              party_b_id: "1", 
              confirmation_method: '电子确认',
              dispute_resolution_method: '(2)',
              filing_method: '(2)',
              filing_party: filingParty,
              original_copies: 2,
              duplicate_copies: 1,
              party_a_sign_date: dayjs(),
              party_b_sign_date: dayjs(),

              party_b_termination_before30: '/',
              party_b_termination_other: '/',
              party_b_termination_active: '/',
              party_a_termination_before30: '/',
              party_a_termination_in30: '/',
              party_a_termination_active: '/',

              quotation: {
                quote_type_id: quote, 
                green_elec_allow: false,
                green_elec_price: '/',
                standard_curve_method: false, 

                electricity_deviation: '/',
                positive_deviation_ratio: '/',
                positive_deviation_price: '/',
                negative_deviation_ratio: '/',
                negative_deviation_price: '/',
                curve_modify_days: '/',
                curve_deviation: '/',
                curve_positive_ratio: '/',
                curve_positive_price: '/',
                curve_negative_ratio: '/',
                curve_negative_price: '/',

                quote_details:{
                  fixed_price_ratio: '/',
                  market_transaction_price: '/',
                  price_limit: '/',

                  ps_prop_sharing_ratio: '/',
                  ps_dist_ref_price: '/',
                  ps_long_term_trans_ratio: '/',
                  ps_party_a_prop_below_long_term: '/',
                  ps_party_b_prop_below_long_term: '/',
                  ps_party_a_prop_above_long_term: '/',
                  ps_party_b_prop_above_long_term: '/',
                  ps_monthly_bid_ratio: '/',
                  ps_party_a_prop_below_monthly_bid: '/',
                  ps_party_b_prop_below_monthly_bid: '/',
                  ps_party_a_prop_above_monthly_bid: '/',
                  ps_party_b_prop_above_monthly_bid: '/',
                  ps_agent_proc_ratio: '/',
                  ps_party_a_prop_below_agent_proc: '/',
                  ps_party_b_prop_below_agent_proc: '/',
                  ps_party_a_prop_above_agent_proc: '/',
                  ps_party_b_prop_above_agent_proc: '/',
                  ps_intra_month_ratio: '/',
                  ps_party_a_prop_below_intra_month: '/',
                  ps_party_b_prop_below_intra_month: '/',
                  ps_party_a_prop_above_intra_month: '/',
                  ps_party_b_prop_above_intra_month: '/',
                  ps_long_term_trans_limit: '/',
                  ps_monthly_bid_limit: '/',
                  ps_agent_proc_limit: '/',
                  ps_intra_month_limit: '/',
            
                  pd_intra_month_ratio: '/',
                  pd_intra_month_avg_price: '/',
                  pd_monthly_bid_limit: '/',
                  pd_agent_proc_limit: '/',
                  pd_intra_month_limit: '/',
                  pd_price_diff_fluc_ratio: '/',
                  pd_long_term_trans_ratio: '/',
                  pd_long_term_trans_avg_price: '/',
                  pd_long_term_trans_limit: '/',
                  pd_monthly_bid_ratio: '/',
                  pd_monthly_bid_clear_price: '/',
                  pd_agent_proc_ratio: '/',
                  pd_agent_avg_price: '/',
                }
              } 
            }
          }
          onValuesChange={onFormLayoutChange}
          
        >
          <>
            <Divider orientation="center" size='large'>合同基本信息</Divider>

            <Row justify="space-between" gutter={16}>
              <Col span={12} ><Form.Item required label="甲方合同编号" name="party_a_contract_no" ><Input /></Form.Item></Col>
              <Col span={12} ><Form.Item required label="乙方合同编号" name="party_b_contract_no" ><Input /></Form.Item></Col>
            </Row> 
            <Row justify="space-between" gutter={16}>
              <Col span={12} >
                <Form.Item required label="甲方签订日期" name="party_a_sign_date">
                  <DatePicker style={{width:'100%'}} />
                </Form.Item>
              </Col>
              <Col span={12} >
                <Form.Item required label="乙方签订日期" name="party_b_sign_date">
                  <DatePicker style={{width:'100%'}} />
                </Form.Item>
              </Col>
            </Row> 
          </>
          <>
            <Divider orientation="center" size='large'>甲方详细信息</Divider>

            <Row justify="space-between" gutter={16}>
              <Col span={8} >
                <Form.Item required label="甲方主体名" name={['party_a_id']}>
                  <Select placeholder="选择已录入的客户信息">
                  <Option value={noChoosedPartyA}>自定义客户</Option>
                    {
                      customerList.map(cus => {
                        return (
                          <Option value={cus.party_a_id}>{cus.company_name}</Option>
                        )
                      })
                    }
                  </Select>
                </Form.Item>
              </Col>
              {
                choosedPartyAId && choosedPartyAId == noChoosedPartyA ?
                <>
                  <Col span={8} style={{display: (choosedPartyAId ? 'block': 'none')}}>
                    <p style={{padding: '0 0 8px', margin: 0, height: '40px', boxSizing: 'border-box', lineHeight: '36px'}}>甲方主体名</p>
                    <div><Input disabled={choosedPartyAId != noChoosedPartyA } value={partyACustomname} onChange={setCusPartyAName}/></div>
                  </Col>
                  <Col span={8}></Col>
                </>
                :
                <>
                  <Col span={8} style={{display: (choosedPartyAId ? 'block': 'none')}}>
                    <p style={{padding: '0 0 8px', margin: 0, height: '40px', boxSizing: 'border-box', lineHeight: '36px'}}>法人</p>
                    <div><Input disabled={choosedPartyAId != noChoosedPartyA } value={choosedPartyAInfo.legal_person}/></div>
                  </Col>
                  <Col span={8} style={{display: (choosedPartyAId ? 'block': 'none')}}>
                    <p style={{padding: '0 0 8px', margin: 0, height: '40px', boxSizing: 'border-box', lineHeight: '36px'}}>统一社会信用代码</p>
                    <div><Input disabled={choosedPartyAId != noChoosedPartyA } value={choosedPartyAInfo.credit_code}/></div>
                  </Col>
                </>
              }              
            </Row> 
            {
                choosedPartyAId && choosedPartyAId == noChoosedPartyA ? null :
                <div style={{display: (choosedPartyAId ? 'block': 'none'), marginTop:'-24px'}}>
                  <Row justify="space-between" gutter={16}>
                    <Col span={8} >
                      <p>经办人姓名</p>
                      <div><Input disabled={choosedPartyAId != noChoosedPartyA }  value={choosedPartyAInfo.contact_person}/></div>
                    </Col>
                    <Col span={8} >
                      <p>经办人电话</p>
                      <div><Input disabled={choosedPartyAId != noChoosedPartyA } value={choosedPartyAInfo.contact_phone}/></div>
                    </Col>
                    <Col span={8} >
                      <p>开户银行</p>
                      <div><Input disabled={choosedPartyAId != noChoosedPartyA } value={choosedPartyAInfo.depository_bank}/></div>
                    </Col>
                  </Row>  
                </div>
            }
          </>

          <>
            <Divider orientation="center" size='large'>乙方详细信息</Divider>

            <Row justify="space-between" gutter={16}>
              <Col span={8} >
                <Form.Item label="乙方主体名" name={['party_b_id']}>
                  <Select placeholder="选择乙方信息">
                    <Option value={"1"}>苏州中鑫新能源有限公司</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8} >
                <p style={{padding: '0 0 8px', margin: 0, height: '40px', boxSizing: 'border-box', lineHeight: '36px'}}>乙方经办人姓名</p>
                <div><Input disabled value={'董小燕'}/></div>
              </Col>
              <Col span={8} >
                <p style={{padding: '0 0 8px', margin: 0, height: '40px', boxSizing: 'border-box', lineHeight: '36px'}}>乙方经办人电话</p>
                <div><Input disabled value={'13814857279'}/></div>
              </Col>
            </Row> 
          </>

          <>
            <Divider orientation="center" size='large'>套餐信息</Divider>

            <Row justify="space-between" gutter={16}>
              <Col span={10} >
                <Form.Item  required label="套餐启止月份" name={['trade_time_form']} >
                  <RangePicker picker="month" style={{width:'100%'}}/>
                </Form.Item>
              </Col>
              <Col span={10} ><Form.Item required label="合计电量" name={['quotation', 'total_electricity']} ><Input /></Form.Item></Col>
              <Col span={4} >
                <Form.Item label="是否使用绿电" name={['quotation', 'green_elec_allow']} >
                  <Radio.Group>
                    <Radio.Button value={true}>是</Radio.Button>
                    <Radio.Button value={false}>否</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <Row justify="space-between" gutter={16}>
              <Col span={24} ><Form.Item label="绿电电价(¥)" name={['quotation', 'green_elec_price']} ><Input /></Form.Item></Col>
            </Row>


            <Form.Item required label="电价套餐" name={['quotation', 'quote_type_id']}>
              <Radio.Group>
                <Radio.Button value={1}>固定价格</Radio.Button>
                <Radio.Button value={2}>比例分成</Radio.Button>
                <Radio.Button value={3}>价差浮动</Radio.Button>
              </Radio.Group>
            </Form.Item>

            
            <div style={{display: (quote == 1 ? 'block': 'none') }}>
              <Row justify="space-between" gutter={16}>
                <Col span={8} ><Form.Item label="固定价格用电量比例(%)" name={['quotation', 'quote_details', 'fixed_price_ratio']} ><Input /></Form.Item></Col>
                <Col span={8} ><Form.Item label="市场化成交电价(¥)" name={['quotation', 'quote_details', 'market_transaction_price']}><Input /></Form.Item></Col>
                <Col span={8} ><Form.Item label="限价(¥)" name={['quotation', 'quote_details', 'price_limit']}><Input /></Form.Item></Col>
              </Row>  
            </div>

            <div style={{display: (quote == 2 ? 'block': 'none') }}>    
              <Row justify="space-between" gutter={16}>
                <Col span={8} ><Form.Item label="比例分成用电量比例(%)" name={['quotation', 'quote_details', 'ps_prop_sharing_ratio']} ><Input /></Form.Item></Col>
                <Col span={8} ><Form.Item label="分成参考价(¥)" name={['quotation', 'quote_details', 'ps_dist_ref_price']}><Input /></Form.Item></Col>
                <Col span={8} ><Form.Item label="长协交易限价(¥)" name={['quotation', 'quote_details', 'ps_long_term_trans_limit']} ><Input /></Form.Item></Col>
              </Row> 

              <Row justify="space-between" gutter={16}>
                <Col span={8} ><Form.Item label="月度竞价限价(¥)" name={['quotation', 'quote_details', 'ps_monthly_bid_limit']} ><Input /></Form.Item></Col>
                <Col span={8} ><Form.Item label="代理购电限价(¥)" name={['quotation', 'quote_details', 'ps_agent_proc_limit']}><Input /></Form.Item></Col>
                <Col span={8} ><Form.Item label="月内挂牌限价(¥)" name={['quotation', 'quote_details', 'ps_intra_month_limit']} ><Input /></Form.Item></Col>
              </Row> 


              <Row justify="space-between" gutter={16}>
                <Col span={6} ><Form.Item label="长协交易比例(%)" name={['quotation', 'quote_details', 'ps_long_term_trans_ratio']} ><Input /></Form.Item></Col>
                <Col span={6} ><Form.Item label="月度竞价比例(%)" name={['quotation', 'quote_details', 'ps_monthly_bid_ratio']} ><Input /></Form.Item></Col>
                <Col span={6} ><Form.Item label="代理购电比例(%)" name={['quotation', 'quote_details', 'ps_agent_proc_ratio']} ><Input /></Form.Item></Col>
                <Col span={6} ><Form.Item label="月内挂牌比例(%)" name={['quotation', 'quote_details', 'ps_intra_month_ratio']} ><Input /></Form.Item></Col>
              </Row>

              <Row justify="space-between" gutter={16}>
                <Col span={6} ><Form.Item label="低于长协交易价格甲方比例(%)" name={['quotation', 'quote_details', 'ps_party_a_prop_below_long_term']} ><Input /></Form.Item></Col>
                <Col span={6} ><Form.Item label="低于长协交易价格乙方比例(%)" name={['quotation', 'quote_details', 'ps_party_b_prop_below_long_term']}><Input /></Form.Item></Col>
                <Col span={6} ><Form.Item label="高于长协交易价格甲方比例(%)" name={['quotation', 'quote_details', 'ps_party_a_prop_above_long_term']}><Input /></Form.Item></Col>
                <Col span={6} ><Form.Item label="高于长协交易价格乙方比例(%)" name={['quotation', 'quote_details', 'ps_party_b_prop_above_long_term']}><Input /></Form.Item></Col>
              </Row>   
             
              <Row justify="space-between" gutter={16}>
                <Col span={6} ><Form.Item label="低于月度竞价价格甲方比例(%)" name={['quotation', 'quote_details', 'ps_party_a_prop_below_monthly_bid']} ><Input /></Form.Item></Col>
                <Col span={6} ><Form.Item label="低于月度竞价价格乙方比例(%)" name={['quotation', 'quote_details', 'ps_party_b_prop_below_monthly_bid']}><Input /></Form.Item></Col>
                <Col span={6} ><Form.Item label="高于月度竞价价格甲方比例(%)" name={['quotation', 'quote_details', 'ps_party_a_prop_above_monthly_bid']}><Input /></Form.Item></Col>
                <Col span={6} ><Form.Item label="高于月度竞价价格乙方比例(%)" name={['quotation', 'quote_details', 'ps_party_b_prop_above_monthly_bid']}><Input /></Form.Item></Col>
              </Row>  
            
              <Row justify="space-between" gutter={16}>
                <Col span={6} ><Form.Item label="低于代理购电价格甲方比例(%)" name={['quotation', 'quote_details', 'ps_party_a_prop_below_agent_proc']} ><Input /></Form.Item></Col>
                <Col span={6} ><Form.Item label="低于代理购电价格乙方比例(%)" name={['quotation', 'quote_details', 'ps_party_b_prop_below_agent_proc']}><Input /></Form.Item></Col>
                <Col span={6} ><Form.Item label="高于代理购电价格甲方比例(%)" name={['quotation', 'quote_details', 'ps_party_a_prop_above_agent_proc']}><Input /></Form.Item></Col>
                <Col span={6} ><Form.Item label="高于代理购电价格乙方比例(%)" name={['quotation', 'quote_details', 'ps_party_b_prop_above_agent_proc']}><Input /></Form.Item></Col>
              </Row>   

              <Row justify="space-between" gutter={16}>
                <Col span={6} ><Form.Item label="低于月内挂牌价格甲方比例(%)" name={['quotation', 'quote_details', 'ps_party_a_prop_below_intra_month']} ><Input /></Form.Item></Col>
                <Col span={6} ><Form.Item label="低于月内挂牌价格乙方比例(%)" name={['quotation', 'quote_details', 'ps_party_b_prop_below_intra_month']}><Input /></Form.Item></Col>
                <Col span={6} ><Form.Item label="高于月内挂牌价格甲方比例(%)" name={['quotation', 'quote_details', 'ps_party_a_prop_above_intra_month']}><Input /></Form.Item></Col>
                <Col span={6} ><Form.Item label="高于月内挂牌价格乙方比例(%)" name={['quotation', 'quote_details', 'ps_party_b_prop_above_intra_month']}><Input /></Form.Item></Col>
              </Row>   
            </div>

            <div style={{display: (quote == 3 ? 'block': 'none') }}>
              <Row justify="space-between" gutter={16}>
                <Col span={12} ><Form.Item label="月内挂牌比例(%)" name={['quotation', 'quote_details', 'pd_intra_month_ratio']}><Input /></Form.Item></Col>
                <Col span={12} ><Form.Item label="月内挂牌均价(¥)" name={['quotation', 'quote_details', 'pd_intra_month_avg_price']} ><Input /></Form.Item></Col>
              </Row>   
              <Row justify="space-between" gutter={16}>
                <Col span={8} ><Form.Item label="月度竞价限价" name={['quotation', 'quote_details', 'pd_monthly_bid_limit']}><Input /></Form.Item></Col>
                <Col span={8} ><Form.Item label="代理购电限价" name={['quotation', 'quote_details', 'pd_agent_proc_limit']}><Input /></Form.Item></Col>
                <Col span={8} ><Form.Item label="月内挂牌限价" name={['quotation', 'quote_details', 'pd_intra_month_limit']}><Input /></Form.Item></Col>
              </Row>  

              <Row justify="space-between" gutter={16}>
                <Col span={6} ><Form.Item label="价差浮动比例(%)" name={['quotation', 'quote_details', 'pd_price_diff_fluc_ratio']} ><Input /></Form.Item></Col>
                <Col span={6} ><Form.Item label="长协交易比例(%)" name={['quotation', 'quote_details', 'pd_long_term_trans_ratio']}><Input /></Form.Item></Col>
                <Col span={6} ><Form.Item label="长协交易均价(¥)" name={['quotation', 'quote_details', 'pd_long_term_trans_avg_price']} ><Input /></Form.Item></Col>
                <Col span={6} ><Form.Item label="长协交易限价(¥)" name={['quotation', 'quote_details', 'pd_long_term_trans_limit']}><Input /></Form.Item></Col>
              </Row> 
              <Row justify="space-between" gutter={16}>
                <Col span={6} ><Form.Item label="月度竞价比例(%)" name={['quotation', 'quote_details', 'pd_monthly_bid_ratio']}><Input /></Form.Item></Col>
                <Col span={6} ><Form.Item label="月度竞价出清价(¥)" name={['quotation', 'quote_details', 'pd_monthly_bid_clear_price']} ><Input /></Form.Item></Col>
                <Col span={6} ><Form.Item label="代理购电比例(%)" name={['quotation', 'quote_details', 'pd_agent_proc_ratio']}><Input /></Form.Item></Col>
                <Col span={6} ><Form.Item label="代理挂牌均价(¥)" name={['quotation', 'quote_details', 'pd_agent_avg_price']}><Input /></Form.Item></Col>
              </Row>   
            </div>
                
            <Row justify="space-between" gutter={16}>
              <Col span={12} ><Form.Item label="用电量正负偏差(%)" name={['quotation', 'electricity_deviation']} ><Input /></Form.Item></Col>
              <Col span={12} >
                <Form.Item label="是否约定执行标准用电曲线" name={['quotation', 'standard_curve_method']} >
                  <Radio.Group>
                    <Radio.Button value={true}>是</Radio.Button>
                    <Radio.Button value={false}>否</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            
            <Row justify="space-between" gutter={16}>
              <Col span={6} ><Form.Item label="用电量超出正偏差比例(%)" name={['quotation', 'positive_deviation_ratio']} ><Input /></Form.Item></Col>
              <Col span={6} ><Form.Item label="用电量正偏差外价格(¥)" name={['quotation', 'positive_deviation_price']} ><Input /></Form.Item></Col>
              <Col span={6} ><Form.Item label="用电量超出负偏差比例(%)" name={['quotation', 'negative_deviation_ratio']} ><Input /></Form.Item></Col>
              <Col span={6} ><Form.Item label="用电量负偏差外价格(¥)" name={['quotation', 'negative_deviation_price']} ><Input  /></Form.Item></Col>
            </Row>

            <Row justify="space-between" gutter={16}>
              <Col span={6} ><Form.Item label="用电曲线超出正偏差比例(%)" name={['quotation', 'curve_positive_ratio']} ><Input /></Form.Item></Col>
              <Col span={6} ><Form.Item label="用电曲线超出正偏差外价格(¥)" name={['quotation', 'curve_positive_price']} ><Input /></Form.Item></Col>
              <Col span={6} ><Form.Item label="用电曲线超出负偏差比例(%)" name={['quotation', 'curve_negative_ratio']} ><Input /></Form.Item></Col>
              <Col span={6} ><Form.Item label="用电曲线负偏差外价格(¥)" name={['quotation', 'curve_negative_price']} ><Input  /></Form.Item></Col>
            </Row>

            <Row justify="space-between" gutter={16}>
              <Col span={12} ><Form.Item label="用电曲线修改期限" name={['quotation', 'curve_modify_days']} ><Input /></Form.Item></Col>
              <Col span={12} ><Form.Item label="用电曲线正负偏差" name={['quotation', 'curve_deviation']} ><Input /></Form.Item></Col>
            </Row>

          </>

          <>
            <Divider orientation="center" size='large'>补充信息</Divider>

            <Row justify="space-between" gutter={16}>
              <Col span={24} ><Form.Item required label="签约地点" name="sign_location"><Input /></Form.Item></Col>
            </Row>

            <Row justify="space-between" gutter={16}>
              <Col span={24} ><Form.Item label="附加条款" name="additional_terms"><TextArea /></Form.Item></Col>
            </Row>

            <Row justify="space-between" gutter={16}>
              <Col span={8} ><Form.Item label="甲方解约赔偿（30日前）" name="party_a_termination_before30" ><Input suffix={'万元'}/></Form.Item></Col>
              <Col span={8} ><Form.Item label="甲方解约赔偿（30日内）" name="party_a_termination_in30" ><Input suffix={'万元'}/></Form.Item></Col>
              <Col span={8} ><Form.Item label="甲方解约赔偿（执行中）" name="party_a_termination_active" ><Input suffix={'万元/月'}/></Form.Item></Col>
            </Row>  

            <Row justify="space-between" gutter={16}>
              <Col span={8} ><Form.Item label="乙方30天前终止赔偿" name="party_b_termination_before30"  ><Input suffix={'万元'}/></Form.Item></Col>
              <Col span={8} ><Form.Item label="乙方其他终止赔偿" name="party_b_termination_other" ><Input suffix={'万元'}/></Form.Item></Col>
              <Col span={8} ><Form.Item label="乙方主动终止比例" name="party_b_termination_active" ><Input suffix={'倍'}/></Form.Item></Col>
            </Row>


            <Row justify="space-between" gutter={16}>
              <Col span={24} >
                <Form.Item label="争议解决方式" name={['dispute_resolution_method']}>
                  <Select placeholder="选择争议解决方式">
                    <Option value={"(1)"}>(1)双方同意提请仲裁委员会，请求按照其仲裁规则进 行仲裁。仲裁裁决是终局的，对双方均具有法律约束力。</Option>
                    <Option value={"(2)"}>(2)任何一方依法提请人民法院通过诉讼程序解决。</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>  

            <Row justify="space-between" gutter={16}>
              <Col span={8} ><Form.Item label="确认方式" name="confirmation_method"><Input /></Form.Item></Col>
              <Col span={8} ><Form.Item label="正本份数" name="original_copies" ><Input suffix={'份'}/></Form.Item></Col>
              <Col span={8} ><Form.Item label="双方各执份数" name="duplicate_copies" ><Input suffix={'份'}/></Form.Item></Col>
            </Row>  

            <Row justify="start" gutter={16}>
              <Col span={18} >
                <Form.Item label="备案方式" name={['filing_method']}>
                  <Select placeholder="选择备案方式">
                    <Option value={"(1)"}>1. 甲方与乙方共同办理本合同在交易中心的备案及其他相关执行手续。</Option>
                    <Option value={"(2)"}>2. 由 {filingParty} 方代为办理本合同在交易中心的备案和相关执行手续。</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6} style={{display: (filingMethod == '(2)' ? 'block': 'none')}}>
                <Form.Item label="备案方" name={['filing_party']}>
                  <Select placeholder="选择备案方">
                    <Option value={"甲"}>甲</Option>
                    <Option value={"乙"}>乙</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </>
          
        </Form>
      </Modal>
    </>
  );
};
export default ContractCreatedModal;