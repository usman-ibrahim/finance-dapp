import React, { useContext } from 'react';
import Head from '../common/head';
import NavBar from '../common/navBar';
import '../App.css'

import { TransactionContext } from '../context/TransactionContext';

const LoantCard = ({ name, interest,loan_amount, amount, account}) => {
    
    const { formData, setformData, handleChange, addApproveLoan } = useContext(TransactionContext)
    
    const handleSubmit = (e) => {

        addApproveLoan(name, interest, loan_amount, amount, account);
        e.preventDefault();

    }
    
    return (

        <div className='statement'>
            <h3>{name}</h3>
            <div style={{ padding: '20px' }}>
                <p>interest: {interest} % </p>
                <p>Max Amount: N{loan_amount} </p>
                <p>Amount: N{amount} </p>
                <p>Account: {account} </p>
            </div>
            <div className='flex justify-center'>
              <button className='btn' onClick={handleSubmit}> Approve</button>
            </div>
            
        </div>

    );

}

function ApproveLoan() {

    const { formData, setformData, handleChange, applyLoans } = useContext(TransactionContext)

    return (
        <>
            <Head />

            <div className='main-content'>
                <NavBar />
                <div className='content'>
                    <h1>Approve Loan</h1>
                    <div className='menu-conten loanlist'>
                        {applyLoans.reverse().map((loan, i) => (
                            <LoantCard key={i} {...loan} />
                        ))}
                    </div>
                </div>

            </div>
        </>
    )
}

export default ApproveLoan;