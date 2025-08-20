import React from 'react';
import { Space, Table, Tag, Input, Divider } from 'antd';
import { DualAxes } from '@ant-design/plots';

const { Column, ColumnGroup } = Table;

const { Search } = Input;



const DemoDualAxes = () => {
    const uvBillData = [
      { time: '2019-03', value: 350, type: 'uv' },
      { time: '2019-04', value: 30, type: 'uv' },
      { time: '2019-05', value: 300, type: 'uv' },
      { time: '2019-06', value: 450, type: 'uv' },
      { time: '2019-07', value: 470, type: 'uv' },
      { time: '2019-03', value: 220, type: 'bill' },
      { time: '2019-04', value: 300, type: 'bill' },
      { time: '2019-05', value: 250, type: 'bill' },
      { time: '2019-06', value: 220, type: 'bill' },
      { time: '2019-07', value: 362, type: 'bill' },
    ];
  
    const transformData = [
      { time: '2019-03', count: 12 },
      { time: '2019-04', count: 600 },
      { time: '2019-05', count: 400 },
      { time: '2019-06', count: 380 },
      { time: '2019-07', count: 220 },
    ];
  
    const config = {
      xField: 'time',
      legend: {
        color: {
          position: 'bottom',
          layout: { justifyContent: 'center' },
        },
      },
      scale: { color: { range: ['#5B8FF9', '#5D7092', '#5AD8A6'] } },
      children: [
        {
          data: uvBillData,
          type: 'interval',
          yField: 'value',
          colorField: 'type',
          group: true,
          style: { maxWidth: 50 },
          label: { position: 'inside' },
          interaction: { elementHighlight: { background: true } },
        },
        {
          data: transformData,
          type: 'line',
          yField: 'count',
          style: { lineWidth: 2 },
          axis: { y: { position: 'right' } },
          interaction: {
            tooltip: {
              crosshairs: false,
              marker: false,
            },
          },
        },
      ],
    };
    return <DualAxes {...config} />;
};
  
const data1 = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
    pdfurl: "https://xxxx.com/xxx.pdf"
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
const TableData = () => (
  <div>
    <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        // onSearch={onSearch}
    />
    <Table dataSource={data1}>
        <ColumnGroup title="Name">
        <Column title="First Name" dataIndex="firstName" key="firstName" />
        <Column title="Last Name" dataIndex="lastName" key="lastName" />
        </ColumnGroup>
        <Column title="Age" dataIndex="age" key="age" />
        <Column title="Address" dataIndex="address" key="address" />
        <Column
        title="Tags"
        dataIndex="tags"
        key="tags"
        render={tags => (
            <>
            {tags.map(tag => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'loser') {
                color = 'volcano';
                }
                return (
                <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                </Tag>
                );
            })}
            </>
        )}
        />
        <Column
        title="Action"
        key="action"
        render={(_, record) => (
            <Space size="middle">
            <a>Invite {record.lastName}</a>
            <a>Delete</a>
            </Space>
        )}
        />
    </Table>
    <DemoDualAxes/>
  </div>
);
export default TableData;