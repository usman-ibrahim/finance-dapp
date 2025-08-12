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


function ManageCustomer() {

    const { formData, setformData, handleChange, userSignup } = useContext(TransactionContext)

    const handleSubmit = (e) => {
        const { fullname, accountAddress, username, password, email, contact, city } = formData;

        if (!fullname || !city || !accountAddress || !username || !email || !contact || !password) return alert('Fill the remaining field');
        // console.log('salma: ', surname)
        userSignup();

        e.preventDefault();
    }
    return (
        <>
            <Head />

            <div className='main-content'>
                <NavBar />
                <div className='content'>
                    <h1>Manage Customer</h1>
                    <div className='menu-conten create-customer'>      
                        <Link to={'/acctstatement'}>
                            <button className='btn' style={{marginLeft: 10}}>Account Statement</button>
                        </Link>
                        <Link to={'/approveloan'}>
                            <button className='btn' style={{marginLeft: 10}}>Approve Loan</button>
                        </Link>
                            
                    </div>


                </div>

            </div>
        </>
    )
}

export default ManageCustomer;