import { useEffect, useState } from 'react';
import { Area } from '@ant-design/plots';

import { Flex, Spin, Table, DatePicker, Select, Form, Button, Divider, message } from 'antd';

import { GetIntervalSummary, GetAllCompanies, ContractCSV } from '../../request'

import dayjs from 'dayjs';

import './index.css';

const { Column } = Table;


const ElectricPredictPrice = () => {
  const [form] = Form.useForm();

  const [messageApi, contextHolder] = message.useMessage();


  const [companyList, setCompanyList] = useState([]);

  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);

  useEffect(() => {
    asyncFetch();
  }, []);


  const getIntervalInfo = (company_name, date) => {
    setData([]);
    setList([]);
    setTableLoading(true);
    GetIntervalSummary(company_name, date, date).then(res => {
      const value  = res.data.data.points.map(i => ({
        timestamp: dayjs(i.timestamp).format('HH:mm'),
        forecast_energy_KWh: i.forecast_energy_KWh,
        type: '预测数据(kWh)'
      }));
      setData(value);
      setList(value);
    }).catch(() => {
      messageApi.error('加载失败, 请刷新页面或者联系管理员');
    }).finally(() => {
      setTableLoading(false);
    });
  }

  const asyncFetch = () => {
    GetAllCompanies().then((res) => {
      setCompanyList(res.data.data);
      form.setFieldsValue({
        company_name: res.data.data[0],
        date: dayjs(),
      });
      getIntervalInfo(res.data.data[0], dayjs().format('YYYY-MM-DD'));
    }).catch(()=> {
      messageApi.error('加载失败, 请刷新页面');
    }).finally(() => {
    });
  };


  const downloadCSV = () => {
    let {company_name, date} = form.getFieldsValue();
    ContractCSV(company_name, date, date ).then((resp) => {
      const blobObj = new Blob([resp.data], { type: "text/csv" });
      const downloadLink = document.createElement('a');
      let url = window.URL || window.webkitURL || window.moxURL; // 浏览器兼容
      url = url.createObjectURL(blobObj);
      downloadLink.href = url;
      downloadLink.download = `forecast_report_${company_name}_${date}.csv`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      window.URL.revokeObjectURL(url);
    })
  } 

  

  const onFormChange =(_info) => {
    const {company_name, date} = form.getFieldsValue();
    getIntervalInfo(company_name, date.format('YYYY-MM-DD'));
  }

  const config = {
    title: false,
    data,
    xField: 'timestamp',
    yField: 'forecast_energy_KWh',
    colorField: 'type',
    shapeField: 'smooth',
    axis: {
      y: { title: '用电量(kWh)' },
    },
    line: {
      style: {
        stroke: 'rgba(23,163,74,1)',
      },
    },
    legend: {
      color: {
        crossPadding: 30,
        position: 'bottom',
        layout: {
          justifyContent: 'center',
        },

        itemMarker: 'dash',
        itemMarkerStroke: 'rgba(23,163,74,1)',
      },
    },
    style: {
      fill: 'rgba(23,163,74,0.3)',
    },
  };

  return (
    <>
    {contextHolder}
    <div style={{ paddingBottom:'20px', marginBottom: 20}}>
      <div style={{paddingBottom: 24, paddingTop: 20, display: 'flex', justifyContent: 'space-between'}}>
        <span style={{fontSize:16, fontWeight: 700, paddingLeft: 15,lineHeight:'32px'}}>用电量预测</span>
        <Form form={form} layout="inline" onValuesChange={onFormChange}>
          <Form.Item name="company_name" label="企业名称" >
            <Select placeholder="企业名称" style={{minWidth:300}}>
              {
                companyList.map((comp, _index) => {
                  let show_name = comp;
                  if(comp === "--全部--") {
                    show_name = "全部";
                  }
                  return (
                    <Select.Option value={comp}>{show_name}</Select.Option>
                  )
                })
              }
            </Select>          
          </Form.Item>
          <Form.Item name="date" label="预测日期">
            <DatePicker picker='day' onChange={()=>{}} />
          </Form.Item>
        </Form>
      </div>
      {tableLoading ? <Spin tip="Loading" size="large"></Spin> : <Area {...config}/>}
      

     </div>

    <Divider size='large' />

     <div>
      <Flex justify="space-between" style={{padding:'0 16px 0', margin:"20px 0 16px 0"}}>
        <span span={6} style={{fontWeight:700, fontSize:16, lineHeight:'32px'}}>预测数据详情 </span>
        <span span={18} ><Button color="cyan" variant="solid" onClick={downloadCSV}>下载csv</Button></span>
      </Flex>

      <Table 
        dataSource={list}
        scroll={{ y: 55 * 8 }}
        sticky={{ offsetHeader: 64 }}
        loading={tableLoading}
        bordered
        pagination={false}
      >
        <Column title="时间" dataIndex="timestamp" key="timestamp" fixed='left' width={300}/>
        <Column title="预测用电量 (kWh)" dataIndex="forecast_energy_KWh" fixed='left'/>
      </Table>

     </div>
    </>
  );
};
export default ElectricPredictPrice;

