import React, { useState, useEffect, useContext } from 'react'
import './App.css'
import './index.css'

import { Route, Routes } from 'react-router-dom';
import Landing from './screens/LandingPage';
import Login from './screens/Login';
import NewCustomer from './screens/NewCustomer';
import Admin from './screens/Admin'
import ViewApplication from './screens/ViewApplication'
import ApproveList from './screens/ApproveList'
import AdminApproveList from './screens/AdminApproveList'
import ManageCustomer from './screens/ManageCustomer';
import Withdraw from './screens/Withdraw';
import DepositCash from './screens/Deposit';
import TransferCash from './screens/Transfer';
import NewLoan from './screens/NewLoan';
import NewCustomerAdmin from './screens/NewCustomerAdmin';
import ApplyLoan from './screens/ApplyLoan';
import ApproveLoan from './screens/ApproveLoan';
import AccountStatement from './screens/AccountStatement';
import AddUserForm from './screens/AddUserForm';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route index element={<Landing />} />
      <Route path='/newuser' element={<NewCustomer />} />
      <Route path='/login' element={<Login />} />
      <Route path='/deposit' element={<DepositCash />} />
      <Route path='/withdraw' element={<Withdraw />} />
      <Route path='/transfer' element={<TransferCash />} />
      <Route path='/newloan' element={<NewLoan />} />
      <Route path='/admin' element={<Admin />} />
      <Route path='/newuser admin' element={<NewCustomerAdmin />} />
      <Route path='/approve' element={<ApproveList />} />
      <Route path='/adminapprove' element={<AdminApproveList />} />
      <Route path='/managecust' element={<ManageCustomer />} />
      <Route path='/applyloan' element={<ApplyLoan />} />
      <Route path='/approveloan' element={<ApproveLoan />} />
      <Route path='/acctstatement' element={<AccountStatement />} />
      <Route path='/userform' element={<AddUserForm />} />
    </Routes>
  )
}

export default App
