import React, { useContext } from 'react';
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

const LoantCard = ({ name, interest, amount}) => {
    const { formData, setformData, handleChange, addAplyLoan } = useContext(TransactionContext)
    
    const handleSubmit = (e) => {
        const { user_amount} = formData;

        if (!user_amount) return alert('Fill the remaining field');

        addAplyLoan(name, interest, amount);
        e.preventDefault();

    }
    
    return (

        <div className='statement'>
            <h3>{name}</h3>
            <div style={{ padding: '20px' }}>
                <p>interest: {interest} % </p>
                <p>Max Amount: {amount} </p>
                <Input name='user_amount' type='number' placeholder='Enter Amount' handleChange={handleChange} />
            </div>
            <div className='flex justify-center'>
              <button className='btn' onClick={handleSubmit}> Apply</button>
            </div>
            
        </div>

    );

}

function ApplyLoan() {

    const { formData, setformData, handleChange, loans } = useContext(TransactionContext)

    return (
        <>
            <Head />

            <div className='main-content'>
                <NavBar />
                <div className='content'>
                    <h1>Loan Application</h1>
                    <div className='menu-conten loanlist'>
                        {loans.reverse().map((loan, i) => (
                            <LoantCard key={i} {...loan} />
                        ))}
                    </div>
                </div>

            </div>
        </>
    )
}

export default ApplyLoan;