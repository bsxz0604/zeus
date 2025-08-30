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
    {
      label: '甲方合同编号',
      children: info.contract_content?.party_a_contract_no,
    },
    {
      label: '乙方合同编号',
      children: info.contract_content?.party_b_contract_no,
    },
    {
      label: '甲方签订日期',
      children: info.contract_content?.party_a_sign_date,
    },
    {
      label: '乙方签订日期',
      children: info.contract_content?.party_b_sign_date,
    }
  ];



  const customPartyAInfo = [
     {
      label: '甲方主体名称',
      children: info.contract_content?.party_a_custom_company || '/',
    },
    {
      label: '甲方统一社会信用代码',
      children: info.contract_content?.party_a_custom_credit_code || '/',
    },
    {
      label: '甲方经办人姓名',
      children: info.contract_content?.party_a_custom_contact_person|| '/',
    },
    {
      label: '甲方法人',
      children: info.contract_content?.party_a_custom_legal_person|| '/',
    },
    {
      label: '甲方公司住所',
      children: info.contract_content?.party_a_custom_address || '/',
    },
    {
      label: '甲方开户银行',
      children: info.contract_content?.party_a_custom_bank || '/',
    },
    {
      label: '甲方开户账号',
      children: info.contract_content?.party_a_custom_bank_account || '/',
    }
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


  const getPackage = (quote_type) => {
    if(quote_type ==1 ) {
      return [
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
        }
      ];
    }

    if(quote_type == 2) {
      return [        
        {
          label: '比例分成用电量比例(%)',
          children: info.contract_content?.quote_details?.ps_prop_sharing_ratio|| '/',
        },    
        {
          label: '分成参考价(¥)',
          children: info.contract_content?.quote_details?.ps_dist_ref_price || '/',
        },    
        {
          label: '长协交易限价(¥)',
          children: info.contract_content?.quote_details?.ps_long_term_trans_ratio || '/',
        },

        {
          label: '月度竞价限价(¥)',
          children: info.contract_content?.quote_details?.ps_monthly_bid_limit|| '/',
        },    
        {
          label: '代理购电限价(¥)',
          children: info.contract_content?.quote_details?.ps_agent_proc_limit || '/',
        },    
        {
          label: '月内挂牌限价(¥)',
          children: info.contract_content?.quote_details?.ps_intra_month_limit || '/',
        },

        {
          label: "长协交易比例(%)",
          children: info.contract_content?.quote_details?.ps_long_term_trans_ratio|| '/',
        },    
        {
          label: "月度竞价比例(%)",
          children: info.contract_content?.quote_details?.ps_monthly_bid_ratio || '/',
        },
        {
          label: "代理购电比例(%)",
          children: info.contract_content?.quote_details?.ps_agent_proc_ratio|| '/',
        },    
        {
          label: "月内挂牌比例(%)",
          children: info.contract_content?.quote_details?.ps_intra_month_ratio || '/',
        },  


        {
          label: "低于长协交易价格甲方比例(%)",
          children: info.contract_content?.quote_details?.ps_party_a_prop_below_long_term|| '/',
        },    
        {
          label: "低于长协交易价格乙方比例(%)",
          children: info.contract_content?.quote_details?.ps_party_b_prop_below_long_term || '/',
        },
        {
          label: "高于长协交易价格甲方比例(%)",
          children: info.contract_content?.quote_details?.ps_party_a_prop_above_long_term|| '/',
        },    
        {
          label: "高于长协交易价格乙方比例(%)",
          children: info.contract_content?.quote_details?.ps_party_b_prop_above_long_term || '/',
        },  


        {
          label: "低于月度竞价价格甲方比例(%)",
          children: info.contract_content?.quote_details?.ps_party_a_prop_below_monthly_bid|| '/',
        },    
        {
          label: "低于月度竞价价格乙方比例(%)",
          children: info.contract_content?.quote_details?.ps_party_b_prop_below_monthly_bid || '/',
        },
        {
          label: "高于月度竞价价格甲方比例(%)",
          children: info.contract_content?.quote_details?.ps_party_a_prop_above_monthly_bid|| '/',
        },    
        {
          label: "高于月度竞价价格乙方比例(%)",
          children: info.contract_content?.quote_details?.ps_party_b_prop_above_monthly_bid || '/',
        },  


        {
          label: "低于代理购电价格甲方比例(%)",
          children: info.contract_content?.quote_details?.ps_party_a_prop_below_agent_proc|| '/',
        },    
        {
          label: "低于代理购电价格乙方比例(%)",
          children: info.contract_content?.quote_details?.ps_party_b_prop_below_agent_proc || '/',
        },
        {
          label: "高于代理购电价格甲方比例(%)",
          children: info.contract_content?.quote_details?.ps_party_a_prop_above_agent_proc|| '/',
        },    
        {
          label: "高于代理购电价格乙方比例(%)",
          children: info.contract_content?.quote_details?.ps_party_b_prop_above_agent_proc || '/',
        }, 


        {
          label: "低于月内挂牌价格甲方比例(%)",
          children: info.contract_content?.quote_details?.ps_party_a_prop_below_intra_month|| '/',
        },    
        {
          label: "低于月内挂牌价格乙方比例(%)",
          children: info.contract_content?.quote_details?.ps_party_b_prop_below_intra_month || '/',
        },
        {
          label: "高于月内挂牌价格甲方比例(%)",
          children: info.contract_content?.quote_details?.ps_party_a_prop_above_intra_month|| '/',
        },    
        {
          label: "高于月内挂牌价格乙方比例(%)",
          children: info.contract_content?.quote_details?.ps_party_b_prop_above_intra_month || '/',
        }
      ]
    }

    if(quote_type == 3) {
      return [
        {
          label: "月内挂牌比例(%)",
          children: info.contract_content?.quote_details?.pd_intra_month_ratio|| '/',
        },    
        {
          label: "月内挂牌均价(¥)",
          children: info.contract_content?.quote_details?.pd_intra_month_avg_price || '/',
        },


        {
          label: "月度竞价限价",
          children: info.contract_content?.quote_details?.pd_monthly_bid_limit|| '/',
        },    
        {
          label: "代理购电限价",
          children: info.contract_content?.quote_details?.pd_agent_proc_limit || '/',
        },
        {
          label: "月内挂牌限价",
          children: info.contract_content?.quote_details?.pd_intra_month_limit || '/',
        },



        {
          label: "价差浮动比例(%)",
          children: info.contract_content?.quote_details?.pd_price_diff_fluc_ratio|| '/',
        },    
        {
          label: "长协交易比例(%)",
          children: info.contract_content?.quote_details?.pd_long_term_trans_ratio || '/',
        },
        {
          label: "长协交易均价(¥)",
          children: info.contract_content?.quote_details?.pd_long_term_trans_avg_price|| '/',
        },    
        {
          label: "长协交易限价(¥)",
          children: info.contract_content?.quote_details?.pd_long_term_trans_limit || '/',
        },


        {
          label: "月度竞价比例(%)",
          children: info.contract_content?.quote_details?.pd_monthly_bid_ratio|| '/',
        },    
        {
          label: "月度竞价出清价(¥)",
          children: info.contract_content?.quote_details?.pd_monthly_bid_clear_price || '/',
        },
        {
          label: "代理购电比例(%)",
          children: info.contract_content?.quote_details?.pd_agent_proc_ratio|| '/',
        },    
        {
          label: "代理挂牌均价(¥)",
          children: info.contract_content?.quote_details?.pd_agent_avg_price || '/',
        }
      ]
    }
    return [];
  }

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
      label: '是否使用绿电',
      children: info.contract_content?.quotation_info?.green_elec_allow ? '是' : '否',
    },

    {
      label: '绿电电价(¥)',
      children: info.contract_content?.quotation_info?.green_elec_price|| '/',
    },


    ...getPackage(info.contract_content?.quotation_info?.quote_type_id),



    {
      label: '用电量正负偏差(%)',
      children: info.contract_content?.quotation_info?.electricity_deviation || '/',
    },
    {
      label: '是否约定执行标准用电曲线',
      children: info.contract_content?.quotation_info?.standard_curve_method ? '是' : '否',
    },



    {
      label: '用电量超出正偏差比例(%)',
      children: info.contract_content?.quotation_info?.positive_deviation_ratio || '/',
    },
    {
      label: '用电量正偏差外价格(¥)',
      children: info.contract_content?.quotation_info?.positive_deviation_price || '/',
    },
    {
      label: '用电量超出负偏差比例(%)',
      children: info.contract_content?.quotation_info?.negative_deviation_ratio || '/',
    },
    {
      label: '用电量负偏差外价格(¥)',
      children: info.contract_content?.quotation_info?.negative_deviation_price || '/',
    },


    {
      label: '用电曲线超出正偏差比例(%)',
      children: info.contract_content?.quotation_info?.curve_positive_ratio || '/',
    },
    {
      label: '用电曲线超出正偏差外价格(¥)',
      children: info.contract_content?.quotation_info?.curve_positive_price || '/',
    },
    {
      label: '用电曲线超出负偏差比例(%)',
      children: info.contract_content?.quotation_info?.curve_negative_ratio || '/',
    },
    {
      label: '用电曲线负偏差外价格(¥)',
      children: info.contract_content?.quotation_info?.curve_negative_price || '/',
    },

    {
      label: '用电曲线修改期限',
      children: info.contract_content?.quotation_info?.curve_modify_days || '/',
    },
    {
      label: '用电曲线正负偏差',
      children: info.contract_content?.quotation_info?.curve_deviation || '/',
    },
  ];



  const otherInfo = [
    {
      label: "签约地点",
      children: info.contract_content?.sign_location || '/',
    },
    {
      label: "附加条款",
      children: info.contract_content?.additional_terms || '/',
    },       


    {
      label: "甲方解约赔偿（30日前）",
      children: info.contract_content?.party_a_termination_before30 || '/',
    },
    {
      label: "甲方解约赔偿（30日内）",
      children: info.contract_content?.party_a_termination_in30 || '/',
    },
    {
      label: "甲方解约赔偿（执行中）",
      children: info.contract_content?.party_a_termination_active || '/',
    },


    {
      label: "乙方30天前终止赔偿",
      children: info.contract_content?.party_b_termination_before30 || '/',
    },
    {
      label: "乙方其他终止赔偿",
      children: info.contract_content?.party_b_termination_other || '/',
    },
    {
      label: "乙方主动终止比例",
      children: info.contract_content?.party_b_termination_active || '/',
    },

    {
      label: "争议解决方式",
      children: info.contract_content?.dispute_resolution_method  == '(1)' ? 
        "(1)双方同意提请仲裁委员会，请求按照其仲裁规则进 行仲裁。仲裁裁决是终局的，对双方均具有法律约束力。"
        :  info.contract_content?.dispute_resolution_method  == '(2)' ?
          "(2)任何一方依法提请人民法院通过诉讼程序解决。"
          :'/',
    },

    {
      label: "确认方式",
      children: info.contract_content?.confirmation_method || '/',
    },
    {
      label: "正本份数",
      children: info.contract_content?.original_copies || '/',
    },
    {
      label: "双方各执份数",
      children: info.contract_content?.duplicate_copies || '/',
    },

    {
      label: "备案方式",
      children: info.contract_content?.filing_method  == '(1)' ? 
        "1. 甲方与乙方共同办理本合同在交易中心的备案及其他相关执行手续。"
        :  info.contract_content?.filing_method  == '(2)' ?
          `2. 由 ${info.contract_content?.filing_party || 'X'} 方代为办理本合同在交易中心的备案和相关执行手续。`
          :'/',
    },

  ];

  return (
    <>
    <Descriptions
      title="合同基本信息"
      bordered
      items={detailInfo}
    />

    <Descriptions
      title={info.contract_content?.party_a_custom ? "甲方详细信息(临时)" :"甲方详细信息"}
      bordered
      items={info.contract_content?.party_a_custom ? customPartyAInfo : partyAInfo}
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

    <Descriptions
      title="补充信息"
      bordered
      items={otherInfo}
      style={{paddingTop:24}}
    />
    </>
    
  )

};

  
export default ContractDetail;