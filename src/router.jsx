import { FileOutlined, TransactionOutlined, TeamOutlined, UsergroupAddOutlined, SolutionOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const routerName = {
    contract: {
        list: '/contract',
        upload: '/contract-upload',
    },
    settlement: '/settlement',
    electric: {
        predictPrice: 'electric-predic-price',
        historyPrice: 'electric-history-price'
    },
    customer: '/customer',
}


// const contractItems = [
//     {
//         key: routerName.contract.list,
//         label: <Link to={routerName.contract.list} >合同查询</Link>,
//     },
//     // {
//     //     key: routerName.contract.upload,
//     //     label: <Link to='/a'>合同录入</Link>,
//     // },
//     {
//         key: `contract-quotation-create`,
//         label: <Link to='/c'>报价单生成</Link>,
//     },
//     // {
//     //     key: `contract-create`,
//     //     label: `合同生成`,
//     // }
// ];

// const settlementItems = [
//     {
//         key: `settlement-upload`,
//         label: <Link to='/c'>结算单录入</Link>,
//     },
//     {
//         key: `settlement-list`,
//         label: <Link to='/c'>结算单查询</Link>,
//     },
// ];


const priceItems = [
    {
        key: routerName.electric.historyPrice,
        label: <Link to={routerName.electric.historyPrice}>用电量展示</Link>,
    },
    {
        key: routerName.electric.predictPrice,
        label: <Link to={routerName.electric.predictPrice} >用电量预测</Link>,
    }

];


export const routerItems =  [
    {
        key: routerName.contract.list,
        icon: <FileOutlined />,
        label: <Link to={routerName.contract.list} >合同管理</Link>,
    },
    {
        key: `settlement`,
        icon: <SolutionOutlined />,
        label: <Link to={routerName.settlement} >报价单生成</Link>,
    },
    {
        key: `price`,
        icon: <TransactionOutlined />,
        label: `电价模块`,
        children: priceItems,
    },
    {
        key: `customer`,
        icon: <TeamOutlined />,
        label: <Link to={routerName.customer} >客户信息管理</Link>,
    },
    {
        key: `admin`,
        icon: <UsergroupAddOutlined />,
        label: <Link to='/c'>用户管理</Link>,
    },
];





