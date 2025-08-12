import React, { useContext, useEffect, useState } from 'react';
import Head from '../common/head';
import NavBar from '../common/navBar';
import '../App.css'

import { TransactionContext } from '../context/TransactionContext';


const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => handleChange(e, name)}

    />
);

const TransactionCard = ({ title, amount, description, balance, timestamp}) => {
    
    return (

        <div className='statement'>
            <h3>{title}</h3>
            <div style={{ padding: '20px' }}>
                <p>Amount: {amount} </p>
                <p>Desc: {description} </p>
                <p>Bal: N{balance} </p>
                <p>Date: {timestamp} </p>
            </div>
        </div>

    );

}

function AccountStatement() {

    const { formData, setformData, handleChange, currentAccount, statements, getStatement} = useContext(TransactionContext)
    const [searchAddress, setSearchAddress] = useState('');

    const handleSubmit = (e) => {

        const { account_address} = formData;

        if (!account_address) return alert('Fill the remaining field');

        setSearchAddress(account_address);
        e.preventDefault();
    }

    useEffect(() => {
        getStatement(searchAddress);
    }, [searchAddress]);

    return (
        <>
            <Head />

            <div className='main-content'>
                <NavBar />
                <div className='content'>
                    <h1>Statement of Account</h1>
                    <div className='mt-8'>
                        <Input  name='account_address' placeholder={'Enter Account Address'} type='text' handleChange={handleChange} />
                        <button
                            onClick={handleSubmit} 
                            className='px-8 bg-blue-800 text-white rounded-r-md'
                        >Search</button>
                    </div>
                    <div className='menu-conten loanlist'>
                        {statements.reverse().map((statement, i) => (
                            <TransactionCard key={i} {...statement} />
                        ))}
                    </div>
                </div>

            </div>
        </>
    )
}

export default AccountStatement;