import React, { useContext } from 'react';

import Admin from './Admin';
import Login from './Login';
import { Link, useNavigate } from 'react-router-dom';

import '../index.cScreenss'
import { TransactionContext } from '../context/TransactionContext';

function LandingScreen() {

  const { connectWallet, currentAccount } = useContext(TransactionContext)
 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    connectWallet()
    if (!currentAccount) return alert('Connect to your wallet');

    navigate('/login')
    e.preventDefault();
  }

  return (

    <div className='landing-context'>
      <div>
        <button className='btn' onClick={handleSubmit}>Connect Wallet</button>
      </div>
    </div>
  )
}

export default LandingScreen;