import React, { useContext } from 'react';
import Head from '../common/head';
import Header from '../common/header';
import NavBar from '../common/navBar';
import '../App.css'
import { useNavigate } from 'react-router-dom';

import { TransactionContext } from '../context/TransactionContext';
import { useEffect } from 'react';
import LoginNavBar from '../common/loginNavBar';


const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => handleChange(e, name)}

    />
);

const PostCard = ({ title, details, start_amount, closing_date, timestamp }) => {
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/applyContract');
    }

    return (

        <div className='statement' style={{ fontSize: '1.7rem' }}>
            <h3>{title}</h3>
            <div>
                <p>Details: {details} </p>
                <p>Start Amount: {start_amount} </p>
                <p>Close Date: {closing_date} </p>
                <div className='btn-group'>
                    <button className='btn' onClick={handleSubmit} >Apply</button>
                </div>
            </div>

        </div>

    );

}

function Post() {

    const { formData, setformData, handleChange, getPostContract, posted, postDate } = useContext(TransactionContext)

    useEffect(() => {

        getPostContract(postDate);
    })


    return (
        <>
            <Head />

            <div className='main-content'>
            <LoginNavBar />
                <div className='content'>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h1>Posted Contracts</h1>
                    </div>
                    <div className='menu-conten loanlist'>
                        {posted.reverse().map((post, i) => (
                            <PostCard key={i} {...post} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Post;