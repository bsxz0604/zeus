import React, { useState, useEffect } from 'react';

import { Button, Modal,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Segmented,
  Divider,
  Radio,
  Row,
  Col,
  Select,
  TreeSelect } from 'antd';

import { CreateContract, GetPartyAList } from '../../request';

import locale from 'antd/locale/zh_CN';
import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

  
// import { Space, Table, Tag, Input, Form, Button, message, Flex } from 'antd';
// import { Link } from 'react-router-dom';
// import { routerName } from '../../router';

// import { data, response} from './mock';

// const { Column, ColumnGroup } = Table;

const { RangePicker } = DatePicker;




const ContractCreatedModal = (props) => {

  const [form] = Form.useForm();
  

  const [quote, setQuote] = useState(1);

  const [choosedPartyAId , setChoosedPartyAId] = useState('');
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
    // setConfirmLoading(true);
    let submitInfo = form.getFieldsValue();
    console.info('==========123', submitInfo);

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

      work_order_number: `WO-2025-0012-${new Date().toISOString().slice(0,19).replace(/:/g, '-')}`,
      contract_sign_date: form.getFieldValue('contract_sign_date').format('YYYY-MM-DD'),
      submission_time: form.getFieldValue('submission_time').format('YYYY-MM-DD'),
      confirmation_time: form.getFieldValue('confirmation_time').format('YYYY-MM-DD'),
      party_a_sign_date: form.getFieldValue('party_a_sign_date').format('YYYY-MM-DD'),
      party_b_sign_date: form.getFieldValue('party_b_sign_date').format('YYYY-MM-DD'),
      order_time: form.getFieldValue('order_time').format('YYYY-MM-DD'),

      party_b_termination_before30: Number(submitInfo.party_b_termination_before30),
      party_b_termination_other: Number(submitInfo.party_b_termination_other),
      party_b_termination_active: Number(submitInfo.party_b_termination_active),
      party_a_termination_before30:  Number(submitInfo.party_a_termination_before30),
      party_a_termination_in30: Number(submitInfo.party_a_termination_in30),
      party_a_termination_active: Number(submitInfo.party_a_termination_active),

      quotation: {
        ...submitInfo.quotation,

        total_electricity:Number(submitInfo.quotation.total_electricity),
        electricity_deviation:Number(submitInfo.quotation.electricity_deviation),
        positive_deviation_ratio:Number(submitInfo.quotation.positive_deviation_ratio),
        positive_deviation_price:Number(submitInfo.quotation.positive_deviation_price),
        negative_deviation_ratio:Number(submitInfo.quotation.negative_deviation_ratio),
        negative_deviation_price:Number(submitInfo.quotation.negative_deviation_price),

        monthly_electricity,
        trade_start_time: form.getFieldValue('trade_time_form')[0].date(1).format('YYYY-MM-DD'),
        trade_end_time: form.getFieldValue('trade_time_form')[1].endOf('month').format('YYYY-MM-DD'),
      }
    }

    delete(req.trade_time_form);

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


  const onFormLayoutChange = (info) => {
    if(info.quotation && info.quotation.quote_type_id && info.quotation.quote_type_id != quote) {
      setQuote(info.quotation.quote_type_id);
    }
    if(info.party_a_id && info.party_a_id != choosedPartyAId ) {
      setChoosedPartyAId(info.party_a_id);
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
              filing_method: '(2)',
              filing_party: filingParty,
              original_copies: 2,
              duplicate_copies: 1,
              quotation: {
                quote_type_id: quote, 
                standard_curve_method: false, 
                quote_details:{
                  fixed_price_ratio: 100,
                  market_transaction_price: 0.23,
                  price_limit: 0.57,
                  green_electricity_price: 0.46
                }
              } 
            }
          }
          onValuesChange={onFormLayoutChange}
          
        >
          <>
            <Divider orientation="center" size='large'>合同基本信息</Divider>

            <Row justify="space-between" gutter={16}>
              <Col span={12} ><Form.Item label="甲方合同编号" name="party_a_contract_no" ><Input /></Form.Item></Col>
              <Col span={12} ><Form.Item label="乙方合同编号" name="party_b_contract_no" ><Input /></Form.Item></Col>
            </Row> 

            <Row justify="space-between" gutter={16}>
              <Col span={8} >
                <Form.Item label="甲方签订日期" name="party_a_sign_date">
                  <DatePicker style={{width:'100%'}} />
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item label="乙方签订日期" name="party_b_sign_date">
                  <DatePicker style={{width:'100%'}} />
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item label="零售平台下单时间" name="order_time">
                  <DatePicker style={{width:'100%'}} />
                </Form.Item>
              </Col>
            </Row> 

            <Row justify="space-between" gutter={16}>
              <Col span={8} >
                <Form.Item label="合同签订日期" name="contract_sign_date">
                  <DatePicker style={{width:'100%'}} />
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item label="提交时间" name="submission_time">
                  <DatePicker style={{width:'100%'}} />
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item label="确认时间" name="confirmation_time">
                  <DatePicker style={{width:'100%'}} />
                </Form.Item>
              </Col>
            </Row> 
          </>
          <>
            <Divider orientation="center" size='large'>甲方详细信息</Divider>

            <Row justify="space-between" gutter={16}>
              <Col span={8} >
                <Form.Item label="甲方主体名" name={['party_a_id']}>
                  <Select placeholder="选择已录入的客户信息">
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
              <Col span={8} style={{display: (choosedPartyAId ? 'block': 'none')}}>
                <p style={{padding: '0 0 8px', margin: 0, height: '40px', boxSizing: 'border-box', lineHeight: '36px'}}>法人</p>
                <div><Input disabled value={choosedPartyAInfo.legal_person}/></div>
              </Col>
              <Col span={8} style={{display: (choosedPartyAId ? 'block': 'none')}}>
                <p style={{padding: '0 0 8px', margin: 0, height: '40px', boxSizing: 'border-box', lineHeight: '36px'}}>统一社会信用代码</p>
                <div><Input disabled value={choosedPartyAInfo.credit_code}/></div>
              </Col>
            </Row> 
            <div style={{display: (choosedPartyAId ? 'block': 'none'), marginTop:'-24px'}}>
              <Row justify="space-between" gutter={16}>
                <Col span={8} >
                  <p>经办人姓名</p>
                  <div><Input disabled value={choosedPartyAInfo.contact_person}/></div>
                </Col>
                <Col span={8} >
                  <p>经办人电话</p>
                  <div><Input disabled value={choosedPartyAInfo.contact_phone}/></div>
                </Col>
                <Col span={8} >
                  <p>开户银行</p>
                  <div><Input disabled value={choosedPartyAInfo.depository_bank}/></div>
                </Col>
              </Row>  
            </div>
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

            <Form.Item label="电价套餐" name={['quotation', 'quote_type_id']}>
              <Radio.Group>
                <Radio.Button value={1}>绿电固定价格</Radio.Button>
                <Radio.Button value={2}>比例分成</Radio.Button>
                <Radio.Button value={3}>价差浮动</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <div style={{display: (quote == 1 ? 'block': 'none') }}>
              <Row justify="space-between" gutter={16}>
                <Col span={6} ><Form.Item label="固定价格用电量比例" name={['quotation', 'quote_details', 'fixed_price_ratio']} ><Input /></Form.Item></Col>
                <Col span={6} ><Form.Item label="市场化成交电价" name={['quotation', 'quote_details', 'market_transaction_price']}><Input /></Form.Item></Col>
                <Col span={6} ><Form.Item label="限价" name={['quotation', 'quote_details', 'price_limit']}><Input /></Form.Item></Col>
                <Col span={6} ><Form.Item label="绿电价格" name={['quotation', 'quote_details', 'green_electricity_price']}><Input /></Form.Item></Col>
              </Row>  
            </div>

            {/* <div style={{display: (quote == 2 ? 'block': 'none') }}>
              <Form.Item label="比例分成用电量比例" name="elec_cons_prop" defaultValue="100"><Input /></Form.Item>
              <Form.Item label="分成参考价" name="dist_ref_price"><Input /></Form.Item>
              <Form.Item label="交易均价比例" name="avg_trans_price_prop"><Input /></Form.Item>
              <Form.Item label="绿电价格" name="green_electricity_price"><Input /></Form.Item>

              <Row justify="space-between" gutter={16}>
                <Col span={6} ><Form.Item label="固定价格用电量比例" name="fixed_price_ratio" ><Input /></Form.Item></Col>
                <Col span={6} ><Form.Item label="市场化成交电价" name="market_transaction_price" ><Input /></Form.Item></Col>
                <Col span={6} ><Form.Item label="限价" name="price_limit" ><Input /></Form.Item></Col>
                <Col span={6} ><Form.Item label="绿电价格" name="green_electricity_price" ><Input /></Form.Item></Col>
              </Row>

              <Row justify="space-between" gutter={16}>
                <Col span={6} ><Form.Item label="低于长协交易价格甲方比例" name="party_a_prop_below_long_term" ><Input suffix="%"/></Form.Item></Col>
                <Col span={6} ><Form.Item label="高于长协交易价格甲方比例" name="party_a_prop_above_long_term" ><Input suffix="%"/></Form.Item></Col>
                <Col span={6} ><Form.Item label="低于月度竞价价格甲方比例" name="party_a_prop_below_monthly_bid" ><Input suffix="%"/></Form.Item></Col>
                <Col span={6} ><Form.Item label="高于月度竞价价格甲方比例" name="party_a_prop_above_monthly_bid" ><Input suffix="%"/></Form.Item></Col>
              </Row>  
              <Row justify="space-between" gutter={16}>
                <Col span={6} ><Form.Item label="低于代理购电价格甲方比例" name="party_a_prop_below_agent_proc" ><Input suffix="%"/></Form.Item></Col>
                <Col span={6} ><Form.Item label="高于代理购电价格甲方比例" name="party_a_prop_above_agent_proc" ><Input suffix="%"/></Form.Item></Col>
                <Col span={6} ><Form.Item label="低于月内挂牌价格甲方比例" name="party_a_prop_below_intra_month" ><Input suffix="%"/></Form.Item></Col>
                <Col span={6} ><Form.Item label="高于月内挂牌价格甲方比例" name="party_a_prop_above_intra_month" ><Input suffix="%"/></Form.Item></Col>
              </Row>  


              <Row justify="space-between" gutter={16}>
                <Col span={6} ><Form.Item label="低于长协交易价格乙方比例" name="party_b_prop_below_long_term" ><Input suffix="%"/></Form.Item></Col>
                <Col span={6} ><Form.Item label="高于长协交易价格乙方比例" name="party_b_prop_above_long_term" ><Input suffix="%"/></Form.Item></Col>
                <Col span={6} ><Form.Item label="低于月度竞价价格乙方比例" name="party_b_prop_below_monthly_bid" ><Input suffix="%"/></Form.Item></Col>
                <Col span={6} ><Form.Item label="高于月度竞价价格乙方比例" name="party_b_prop_above_monthly_bid" ><Input suffix="%"/></Form.Item></Col>
              </Row>  
              <Row justify="space-between" gutter={16}>
                <Col span={6} ><Form.Item label="低于代理购电价格乙方比例" name="party_b_prop_below_agent_proc" ><Input suffix="%"/></Form.Item></Col>
                <Col span={6} ><Form.Item label="高于代理购电价格乙方比例" name="party_b_prop_above_agent_proc" ><Input suffix="%"/></Form.Item></Col>
                <Col span={6} ><Form.Item label="低于月内挂牌价格乙方比例" name="party_b_prop_below_intra_month" ><Input suffix="%"/></Form.Item></Col>
                <Col span={6} ><Form.Item label="高于月内挂牌价格乙方比例" name="party_b_prop_above_intra_month" ><Input suffix="%"/></Form.Item></Col>
              </Row>  
              
              <Form.Item label="长协交易限价" name="long_term_trans_limit" ><Input/></Form.Item>
              <Form.Item label="月度竞价限价" name="monthly_bid_limit" ><Input/></Form.Item>
              <Form.Item label="代理购电限价" name="agent_proc_limit" ><Input/></Form.Item>
              <Form.Item label="月内挂牌限价" name="intra_month_list_limit" ><Input/></Form.Item>
              <Form.Item label="绿电价格" name="green_elec_price" ><Input/></Form.Item>
            </div>
            
            <div style={{display: (quote == 3 ? 'block': 'none') }}>
              <Form.Item label="价差浮动比例" name="price_diff_fluc_ratio" ><Input /></Form.Item>
              <Form.Item label="长协交易比例" name="long_term_trans_ratio" ><Input /></Form.Item>
              <Form.Item label="长协交易均价" name="long_term_trans_avg_price" ><Input /></Form.Item>
              <Form.Item label="月度竞价比例" name="monthly_bid_ratio" ><Input /></Form.Item>
              <Form.Item label="月度竞价出清价" name="monthly_bid_clear_price" ><Input /></Form.Item>
              <Form.Item label="代理购电比例" name="agent_proc_ratio" ><Input /></Form.Item>
              <Form.Item label="代理挂牌均价" name="agent_avg_price" ><Input /></Form.Item>
              <Form.Item label="长协交易限价" name="long_term_trans_limit" ><Input /></Form.Item>
              <Form.Item label="月度竞价限价" name="monthly_bid_limit" ><Input /></Form.Item>
              <Form.Item label="代理购电限价" name="agent_proc_limit" ><Input /></Form.Item>
              <Form.Item label="月内挂牌限价" name="intra_month_limit" ><Input /></Form.Item>
              <Form.Item label="绿电价格" name="green_elec_price" ><Input /></Form.Item>
            </div> */}

            <Row justify="space-between" gutter={16}>
              <Col span={6} >
                <Form.Item label="套餐启止月份" name={['trade_time_form']} >
                  <RangePicker picker="month" style={{width:'100%'}}/>
                </Form.Item>
              </Col>
              <Col span={6} ><Form.Item label="合计电量" name={['quotation', 'total_electricity']} ><Input /></Form.Item></Col>
              <Col span={6} ><Form.Item label="用电量正负偏差" name={['quotation', 'electricity_deviation']} ><Input suffix="%"/></Form.Item></Col>
              <Col span={6} >
                <Form.Item label="是否约定执行标准用电曲线" name={['quotation', 'standard_curve_method']} >
                  <Radio.Group>
                    <Radio.Button value={true}>是</Radio.Button>
                    <Radio.Button value={false}>否</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            
            <Row justify="space-between" gutter={16}>
              <Col span={6} ><Form.Item label="用电量超出正偏差比例" name={['quotation', 'positive_deviation_ratio']} ><Input suffix="%"/></Form.Item></Col>
              <Col span={6} ><Form.Item label="用电量正偏差外价格" name={['quotation', 'positive_deviation_price']} ><Input prefix="¥"/></Form.Item></Col>
              <Col span={6} ><Form.Item label="用电量超出负偏差比例" name={['quotation', 'negative_deviation_ratio']} ><Input suffix="%"/></Form.Item></Col>
              <Col span={6} ><Form.Item label="用电量负偏差外价格" name={['quotation', 'negative_deviation_price']} ><Input  prefix="¥"/></Form.Item></Col>
            </Row>
          </>

          <>
            <Divider orientation="center" size='large'>补充信息</Divider>

            <Row justify="space-between" gutter={16}>
              <Col span={8} ><Form.Item label="签约地点" name="sign_location"><Input /></Form.Item></Col>
              <Col span={8} ><Form.Item label="附加条款" name="additional_terms"><Input /></Form.Item></Col>
              <Col span={8} ><Form.Item label="确认方式" name="confirmation_method"><Input /></Form.Item></Col>
              
            </Row>

            <Row justify="space-between" gutter={16}>
              <Col span={8} ><Form.Item label="乙方30天前终止赔偿" name="party_b_termination_before30"  ><Input suffix={'万元'}/></Form.Item></Col>
              <Col span={8} ><Form.Item label="乙方其他终止赔偿" name="party_b_termination_other" ><Input suffix={'万元'}/></Form.Item></Col>
              <Col span={8} ><Form.Item label="乙方主动终止比例" name="party_b_termination_active" ><Input suffix={'倍'}/></Form.Item></Col>
            </Row>

            <Row justify="space-between" gutter={16}>
              <Col span={8} ><Form.Item label="甲方解约赔偿（30日前）" name="party_a_termination_before30" ><Input suffix={'万元'}/></Form.Item></Col>
              <Col span={8} ><Form.Item label="甲方解约赔偿（30日内）" name="party_a_termination_in30" ><Input suffix={'万元'}/></Form.Item></Col>
              <Col span={8} ><Form.Item label="甲方解约赔偿（执行中）" name="party_a_termination_active" ><Input suffix={'万元/月'}/></Form.Item></Col>
            </Row>  

            <Row justify="space-between" gutter={16}>
              <Col span={8} >
                <Form.Item label="争议解决方式" name={['dispute_resolution_method']}>
                  <Select placeholder="选择争议解决方式">
                    <Option value={"(1)"}>(1)双方同意提请仲裁委员会，请求按照其仲裁规则进 行仲裁。仲裁裁决是终局的，对双方均具有法律约束力。</Option>
                    <Option value={"(2)"}>(2)任何一方依法提请人民法院通过诉讼程序解决。</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8} ><Form.Item label="正本份数" name="original_copies" ><Input suffix={'份'}/></Form.Item></Col>
              <Col span={8} ><Form.Item label="双方各执份数" name="duplicate_copies" ><Input suffix={'份'}/></Form.Item></Col>
            </Row>  

            <Row justify="start" gutter={16}>
              <Col span={12} >
                <Form.Item label="备案方式" name={['filing_method']}>
                  <Select placeholder="选择备案方式">
                    <Option value={"(1)"}>1. 甲方与乙方共同办理本合同在交易中心的备案及其他相关执行手续。</Option>
                    <Option value={"(2)"}>2. 由 {filingParty} 方代为办理本合同在交易中心的备案和相关执行手续。</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6} style={{display: (filingMethod == '(2)' ? 'block': 'none')}}>
                <Form.Item label="备案方" name={['filing_party']}>
                  <Input />
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