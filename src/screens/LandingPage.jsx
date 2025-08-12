import React, { useContext } from 'react';

import Admin from './Admin';
import Login from './Login';
import { Link, useNavigate } from 'react-router-dom';

import '../index.css'
import { TransactionContext } from '../context/TransactionContext';

import { BrowserProvider } from "ethers";

// async function connectWallet() {
//   if (window.ethereum) {
//     const provider = new BrowserProvider(window.ethereum);
//     const accounts = await provider.send("eth_requestAccounts", []);
//     console.log("Connected account:", accounts[0]);
//   } else {
//     console.error("MetaMask not detected");
//   }
// }

// connectWallet();

function Landing() {

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

export default Landing;