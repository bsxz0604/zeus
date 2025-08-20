import React, { useEffect, useState } from 'react';
import { Line, Area } from '@ant-design/plots';

import { Col, Row, Input, Descriptions, Divider, DatePicker, Select, Form, Space, Button } from 'antd';

import { mockInfo, areaMockInfo } from './mock';

import './index.css';

const ElectricPredictPrice = () => {


  const [form] = Form.useForm();


  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);


  useEffect(() => {
    asyncFetch();
    asyncFetch1();
  }, []);

  const asyncFetch = () => {
    new Promise(function(resolve, reject){ 
      setTimeout(function(){ 
          resolve(mockInfo);
      }, 500);
    }).then((json) => {
      setData(json)
    })
    .catch((error) => {
      console.log('fetch data failed', error);
    });
  };

  const asyncFetch1 = () => {
    new Promise(function(resolve, reject){ 
      setTimeout(function(){ 
          resolve(areaMockInfo);
      }, 500);
    }).then((json) => {
      setData1(json)
    })
    .catch((error) => {
      console.log('fetch data failed', error);
    });
  };

  const config = {
    // title: {
    //   title: '实时电价', // 主标题
    //   titleFontSize: 20,
    //   titleLineHeight: 40,

    // },
    title: false,
    data,
    xField: 'date',
    yField: 'value',
    colorField: 'type',
    axis: {
      y: {
        labelFormatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
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
      lineDash: (data) => {
        if (data[0].type === '预测价格') return [4, 4];
      },
      opacity: (data) => {
        if (data[0].type !== '预测价格') return 0.5;
      },
    },
  };

  const config1 = {   
    // title: {
    //   title: '预测偏差', // 主标题
    //   titleFontSize: 20,
    //   titleLineHeight: 40,
    // }, 
    title: false,
    data: data1,
    xField: 'date',
    yField: '预测电量',
    // shapeField: 'smooth',

    scale: {
      y: {
        type: "linear",
        domain: [-0.06, 0.06],
        tickMethod: ()=> [-0.06, -0.03, 0 , 0.03,  0.06],
        // tickFilter: (_, i) => i % 3 !== 0, // 过滤 y 轴刻度线，只显示每隔 3 个刻度线
        // tickMethod: (min, max, count, base) => {
        //   // console.info('--------', min, max, count, base);
        //   // // 计算对数范围
        //   // const logMin = Math.log(min) / Math.log(base);
        //   // const logMax = Math.log(max) / Math.log(base);
        //   // // 计算对数步长
        //   // const logStep = (logMax - logMin) / (count - 1);
        //   // // 生成刻度数组

        //   // console.info('=====', logMin, logMax, logStep);

        //   // const ticks = [];
        //   // for (let i = 0; i < count; i++) {
        //   //   const logValue = logMin + i * logStep;
        //   //   const value = Math.pow(base, logValue);
        //   //   // 过滤超出范围的值
        //   //   if (value >= min && value <= max) {
        //   //     ticks.push(Math.round(value));
        //   //   }
        //   // }
        //   // return ticks;
        // },
      }
    },
    tooltip: {
      items: [{ channel: 'y', valueFormatter: '.2%' }],
    },

    axis: {
      x: {
        type: 'timeCat'
      },
      y: { 
        title: false,
        labelFormatter: (datum, index, array) => {
          return `${datum * 100}%`;
        }
      },
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      fillOpacity: 0,
      fill: 'linear-gradient(-90deg, white 0%, darkgreen 100%)',
      lineWidth: 1,
    },
    line: {
      style: {
        opacity: 0.3,
        stroke: 'darkgreen',
        lineWidth: 1,
      },
    },
    // point: {
    //   sizeField: 4,
    //   style: {
    //     stroke: 'darkgreen',
    //     fill: '#fff',
    //   },
    // },
  };



  const items = [
    {
      key: '1',
      label: '最大值',
      children: '0.595 ¥/kWh',
      span: 16,
    },
    {
      key: '2',
      label: '最小值',
      children: '0.536 ¥/kWh',
      span: 16,
    },
    {
      key: '3',
      label: '平均值',
      children: '0.552 ¥/kWh',
      span: 16,
    },
    // {
    //   key: '4',
    //   label: '中间值',
    //   children: '0.547 ¥/kWh',
    //   span: 16,
    // },
    // {
    //   key: '5',
    //   label: '标准差',
    //   children: '-3.2%',
    //   span: 16,
    // },
  ];
  return (
    <>
    <div style={{ border: '1px dashed #333333', borderRadius: '10px', paddingBottom:'20px', marginBottom: 20}}>
      <div style={{paddingBottom: 24, paddingTop: 20, display: 'flex', justifyContent: 'space-between'}}>
        <span style={{fontSize:16, fontWeight: 700, paddingLeft: 15}}>实时电价</span>
        <Form form={form} layout="inline">
          <Form.Item name="area" label="地区">
            <Input placeholder="地区" allowClear />
          </Form.Item>
          <Form.Item name="time" label="交易日">
            <DatePicker onChange={()=>{}} />
          </Form.Item>
          <Form.Item name="electricType" label="电价类型">
            <Input placeholder="实时电价" allowClear />
          </Form.Item>
          <Form.Item name="abc" label="显示范围">
            <Select
              defaultValue="6"
              style={{ width: 120 }}
              onChange={()=>{}}
              options={[
                { value: '4', label: '4小时' },
                { value: '6', label: '6小时' },
                { value: '8', label: '8小时' },
                { value: '10', label: '10小时' },
              ]}
            />
          </Form.Item>
          <Form.Item name="dec" label="预测时长">
            <Select
              defaultValue="4"
              style={{ width: 120 }}
              onChange={()=>{}}
              options={[
                { value: '4', label: '4小时' },
                { value: '6', label: '6小时' },
                { value: '8', label: '8小时' },
                { value: '10', label: '10小时' },
              ]}
            />
          </Form.Item>

          <Form.Item>
            <Space><Button type="primary">搜索</Button></Space>
          </Form.Item>
        </Form>
      </div>
      <Line {...config} />

     </div>
     
     {/* <Divider size='large' /> */}

     <Row wrap={false} style={{maxWidth:'100%'}}>
      <Col span={16} style={{ border: '1px dashed #333333', borderRadius: '10px', padding: 20 }}>
        <div style={{paddingBottom: 24, display: 'flex', justifyContent: 'space-between'}}>
          <span style={{fontSize:16, fontWeight: 700, paddingLeft: 15}}>预测电价</span>
          <Form form={form} layout="inline">
            <Form.Item name="abc" label="显示范围">
              <Select
                defaultValue="6"
                style={{ width: 120 }}
                onChange={()=>{}}
                options={[
                  { value: '4', label: '4小时' },
                  { value: '6', label: '6小时' },
                  { value: '8', label: '8小时' },
                  { value: '10', label: '10小时' },
                ]}
              />
            </Form.Item>
            <Form.Item name="dec" label="预测时长">
              <Select
                defaultValue="4"
                style={{ width: 120 }}
                onChange={()=>{}}
                options={[
                  { value: '4', label: '4小时' },
                  { value: '6', label: '6小时' },
                  { value: '8', label: '8小时' },
                  { value: '10', label: '10小时' },
                ]}
              />
            </Form.Item>

            <Form.Item>
              <Space><Button type="primary">搜索</Button></Space>
            </Form.Item>
          </Form>
        </div>
        <Area {...config1} />
      </Col>
      <Col span={8}  style={{ marginLeft:20, border: '1px dashed #333333', borderRadius: '10px', padding:20 }}>
        <div style={{paddingBottom: 24, display: 'flex', justifyContent: 'space-between'}}>
          <span style={{fontSize:16, fontWeight: 700, paddingLeft: 15}}>电价统计</span>
          <Form form={form} layout="inline">
            <Form.Item name="abc" label="统计范围">
              <Select
                defaultValue="6"
                style={{ width: 120 }}
                onChange={()=>{}}
                options={[
                  { value: '4', label: '4小时' },
                  { value: '6', label: '6小时' },
                  { value: '8', label: '8小时' },
                  { value: '10', label: '10小时' },
                ]}
              />
            </Form.Item>
            <Form.Item>
              <Space><Button type="primary">搜索</Button></Space>
            </Form.Item>
          </Form>
        </div>
        <div style={{padding:20,  marginTop:120,   textAlign: 'center'}}>
          <Row justify="space-between" gutter={16}>
            <Col span={6} className="text-a">最大值: </Col>
            <Col span={18} className="text-a">0.595 ¥/kWh</Col>
          </Row> 
          <Row justify="space-between" gutter={16}>
            <Col span={6} className="text-a">最小值: </Col>
            <Col span={18} className="text-a">0.536 ¥/kWh</Col>
          </Row>
          <Row justify="space-between" gutter={16}>
            <Col span={6} className="text-a">平均值: </Col>
            <Col span={18} className="text-a" >0.552 ¥/kWh</Col>
          </Row>
        </div>
      </Col>
    </Row>

    </>
  );
};
export default ElectricPredictPrice;

