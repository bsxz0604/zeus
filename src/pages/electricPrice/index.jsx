import { useEffect, useState, useRef } from 'react';
import { Line } from '@ant-design/plots';

import { Flex, Spin, Table, DatePicker, Select, Form, Button, Divider, message, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { GetDailySummary, GetIntervalSummary, GetAllCompanies, baseURL, GetTaskStatusByComp } from '../../request'

import dayjs from 'dayjs';


import './index.css';

const { Column } = Table;


const ElectricHistoryPrice = () => {
  const myRef = useRef(null);
  const [form] = Form.useForm();

  const [messageApi, contextHolder] = message.useMessage();
  const [notificationApi, contextNotificationHolder] = notification.useNotification();

  const [companyList, setCompanyList] = useState([]);

  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    asyncFetch();
  }, []);

  const getDailyInfo = (company_name, date, date1) => {
    setList([]);
    GetDailySummary(company_name, date, date1).then(res => {
      const value  = res.data.data.days.map(i => ({
        summary_date: i.summary_date,
        actual_energy_KWh: i.actual_energy_KWh || '--',
        forecast_energy_KWh: i.forecast_energy_KWh || '--',
        forecast_deviation: i.forecast_deviation ? i.forecast_deviation.toFixed(2) + '%' : '--',
      }));
      setList(value);
    }).catch(() => {
      messageApi.error('加载失败, 请刷新页面');
    }).finally(() => {
    });
  }

  const getIntervalInfo = (company_name, date, date1) => {
    setData([]);
    setTableLoading(true);
    GetIntervalSummary(company_name, date, date1).then(res => {
      let value = [];
      res.data.data.points.map(i => {
        value.push({
          timestamp: dayjs(i.timestamp).format('MM-DD HH:mm'),
          value: i.forecast_energy_KWh,
          type: '历史预测值(kWh)'
        }, {
          timestamp: dayjs(i.timestamp).format('MM-DD HH:mm'),
          value: i.actual_energy_KWh,
          type: '实际用电量(kWh)'
        })
      });
      setData(value);
      if(res.data.data.need_upload) {
        notificationApi.warning({
          message: '补足数据提示',
          description: <div style={{whiteSpace: 'pre-line'}}>{res.data.data.forecast_report || ''}</div>,
          // className: 'custom-class',
          // style: {
          //   width: 600,
          // },
        });;
      }
    }).catch(() => {
      messageApi.error('加载失败, 请刷新页面');
    }).finally(() => {
      setTableLoading(false);
    });
  }

  const asyncFetch = () => {
    GetAllCompanies().then((res) => {
      setCompanyList(res.data.data);
      form.setFieldsValue({
        company_name: res.data.data[0],
        start_date: dayjs(),
        end_date: dayjs(),
      });
      getDailyInfo(res.data.data[0], dayjs().format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD'));
      getIntervalInfo(res.data.data[0], dayjs().format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD'));
      getTaskStatusByUser();
    }).catch(()=> {
      messageApi.error('加载失败, 请刷新页面');
    }).finally(() => {
    });
  };

  

  const onFormChange =(_info) => {
    const {company_name, start_date, end_date} = form.getFieldsValue();
    getTaskStatusByUser();
    getDailyInfo(company_name, start_date.format('YYYY-MM-DD'), end_date.format('YYYY-MM-DD'));
    getIntervalInfo(company_name, start_date.format('YYYY-MM-DD'), end_date.format('YYYY-MM-DD'));
  }

  const config = {
    title: false,
    data,
    xField: 'timestamp',
    yField: 'value',
    colorField: 'type',
    shapeField: 'smooth',
    axis: {
      y: { title: '用电量(kWh)' },
    },
    legend: {
      color: {
        crossPadding: 30,
        position: 'bottom',
        layout: {
          justifyContent: 'center',
        },
      },
    },
    scale: { color: { range: ['#30BF78', '#F4664A'] } },
    style: {
      lineWidth: 2,
    },
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    fetch(`${baseURL}/api/v1/power-consumption/tasks/execute`, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
      notificationApi.info({
        message: '上传文件',
        description: <div style={{whiteSpace: 'pre-line'}}>{data.upload_report || ''}</div>,
      });
      getTaskStatusByUser();
      console.log('====', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  } 

  const uploadFiles = () => {
    if (myRef.current) {
      // 操作DOM元素
      myRef.current.click();
    }
  }

  const getTaskStatusByUser = () => {
    if(inProgress) {
      return;
    } else {
      requestTask();
    }
  }

  const requestTask = () => {
    const {company_name} = form.getFieldsValue();
    GetTaskStatusByComp(company_name).then(res => {
      setInProgress(res.data.data.in_progress);

      if(res.data.data.in_progress) {
        let tx = '';
        res.data.data.jobs.map(i => {
          if(i.status !== 'success') {
            tx = tx + i.predicted_date + '、';
          }
        })
        if(tx.length > 0) {
          setText(tx.substring(0, tx.length - 1));
        }
        setTimeout(()=>{requestTask();},10000);
      }
    }).catch(error => {
      if(inProgress) {
        setTimeout(()=>{requestTask();},10000);
      }
    })

  }

  return (
    <>
    {contextHolder}
    {contextNotificationHolder}
    <div style={{ paddingBottom:'20px', marginBottom: 20}}>
      <div style={{paddingBottom: 24, paddingTop: 20, display: 'flex', justifyContent: 'space-between'}}>
        <span style={{fontSize:16, fontWeight: 700, paddingLeft: 15, lineHeight:'32px'}}>用电量展示</span>
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
          <Form.Item name="start_date" label="起始日期">
            <DatePicker picker='day' onChange={()=>{}} />
          </Form.Item>
          <Form.Item name="end_date" label="结束日期">
            <DatePicker picker='day' onChange={()=>{}} />
          </Form.Item>
        </Form>
        <span>
          <input style={{display: 'none'}} ref={myRef} type="file"className='uploadBtn' multiple onChange={handleFileChange} />
          <Button color="cyan" variant="solid" icon={<UploadOutlined />} onClick={uploadFiles}>上传数据</Button>
        </span>
      </div>
      {tableLoading ? <Spin tip="Loading" size="large"></Spin> : <Line {...config}/>}
      <div className='gradient-container'>
        {inProgress ?  <p className='gradient'>AI正在更新{text}的预测结果中..</p>: null}
      </div>
     
     
     </div>

    <Divider size='large' />

     <div>
      <Flex justify="space-between" style={{padding:'0 16px 0', margin:"20px 0 16px 0"}}>
        <span span={6} style={{fontWeight:700, fontSize:16, lineHeight:'32px', height:32}}>预测数据详情 </span>
      </Flex>

      <Table 
        dataSource={list}
        scroll={{ y: 55 * 8 }}
        sticky={{ offsetHeader: 64 }}
        loading={tableLoading}
        bordered
        pagination={false}
      >
        <Column title="日期" dataIndex="summary_date" key="summary_date" fixed='left'/>
        <Column title="实际总电量(kWh)" dataIndex="actual_energy_KWh" fixed='left'/>
        <Column title="预测总电量(kWh)" dataIndex="forecast_energy_KWh" fixed='left'/>
        <Column title="预测偏差(百分比)" dataIndex="forecast_deviation" fixed='left'/>
      </Table>

     </div>
    </>
  );
};
export default ElectricHistoryPrice;

