import React, { useContext } from 'react';
import Head from '../common/head';
import Header from '../common/header';
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

function TransferCash() {

    const { formData, setformData, handleChange, transferAdmin } = useContext(TransactionContext)

    const handleSubmit = (e) => {

        const { account_from, account_to, amount } = formData;

        if (!account_from || !account_to || !amount) return alert('Fill the remaining field');
        
        transferAdmin()

        e.preventDefault();
    }


    return (
        <>
            <Head />

            <div className='main-content'>
                <NavBar />
                <div className='content'>
                   
                    <div className='menu-conten create-customer' style={{ marginTop: '30px', padding: '10px 20px' }}>
                        <h3>Transfer Cash</h3>

                        <form>
                            <div id='form-info' style={{ marginTop: '50px' }}>

                                <div className='form trans-input'>
                                
                                    <div className='form-group'>
                                        <labe >Account Address </labe> <br />
                                        <Input name='account_from' type='text' placeholder={'From'} handleChange={handleChange} /> <br />
                                        <Input name='account_to' type='text' placeholder={'To'} handleChange={handleChange} />
                                    </div>
                                    <div className='form-group'>
                                        <labe >Amount </labe> <br />
                                        <Input name='amount' type='number' handleChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                            <div className='btn-group'>
                                <button className='btn' onClick={handleSubmit}>Transfer</button>
                            </div>

                        </form>

                    </div>


                </div>

            </div>
        </>
    )
}

export default TransferCash;