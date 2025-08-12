import React, { useContext, useState } from 'react';
import Head from '../common/head';
import NavBar from '../common/navBar';
import '../App.css'
import { Link, useNavigate } from 'react-router-dom';

import { TransactionContext } from '../context/TransactionContext';
import LoginNavBar from '../common/loginNavBar';

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => handleChange(e, name)}

    />
);


function NewLoan() {

    const { formData, setformData, handleChange, addLoan } = useContext(TransactionContext)

    const handleSubmit = (e) => {
        const { loan_name, interest, amount } = formData;

        if (!loan_name || !interest || !amount) return alert('Fill the remaining field');
        
        addLoan();

        e.preventDefault();
    }
    return (
        <>
            <Head />

            <div className='main-content'>
                <NavBar />
                <div className='content'>
                    <h1>New Loan</h1>
                    <div className='menu-conten create-customer'>
                        <h3>Create New Loan</h3>
                        <form>
                            <div id='form-info' style={{ marginTop: '5px' }}>

                                <div className='form trans-input'>
                                
                                    <div className='form-group'>
                                        <labe >Name </labe> <br />
                                        <Input name='loan_name' type='text' handleChange={handleChange} />
                                    </div>
                                    <div className='form-group'>
                                        <labe >Amount </labe> <br />
                                        <Input name='amount' type='number' handleChange={handleChange} />
                                    </div>
                                    <div className='form-group'>
                                        <labe >Interest </labe> <br />
                                        <Input name='interest' type='number' handleChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                            <div className='btn-group'>
                                <button className='btn' onClick={handleSubmit}>Save</button>
                            </div>

                        </form>
                    </div>


                </div>

            </div>
        </>
    )
}

export default NewLoan;