import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './pages/login'
import { routerName } from './router';
import reportWebVitals from './reportWebVitals';

import ContractList from './pages/contractList/index';
import ContractDetail from './pages/contractDetail/index';

import SettlementCreate from './pages/settlementCreate/index'

import ElectricPredictPrice from './pages/electricPredictPrice/index';
import ElectricHistoryPrice from './pages/electricPrice/index';


import Customer from './pages/customer/index';
import CustomerDetail from './pages/customerDetail/index';


import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path={routerName.contract.list} element={<ContractList />} />
        <Route path={`${routerName.contract.list}/:id`} element={<ContractDetail />} />

        <Route path={routerName.settlement} element={<SettlementCreate />} />

        <Route path="c" element={<div>正在建设中...</div>} />


        <Route path={routerName.electric.predictPrice} element={<ElectricPredictPrice />} />
        <Route path={routerName.electric.historyPrice} element={<ElectricHistoryPrice />} />

        

        <Route path={routerName.customer} element={<Customer />} />
        <Route path={`${routerName.customer}/:id`} element={<CustomerDetail />} />



      </Route>
        {/* ... etc. */}
      <Route path="/login" element={<Login />}></Route>
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
