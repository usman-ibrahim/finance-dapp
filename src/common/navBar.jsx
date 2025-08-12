import React from 'react';
import '../App.css'
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <div className='nab-container'>
            <nav>
                <ul>
                    <li className='item'>Admin Account
                        <ul>
                            <Link to='/admin'>
                                <li className='sub-item'>Dashboar</li>
                            </Link>

                        </ul>
                    </li>
                    <li className='item'>
                        Users
                        <ul>
                            <Link to='/newuser admin' ><li className='sub-item'>New Customers</li></Link>
                        </ul>
                        <ul>
                            <Link to='/managecust' ><li className='sub-item'>Manage Customers</li></Link>
                        </ul>
                    </li>
                    <li className='item'>
                        <ul>
                            <Link to='/deposit' ><li className='sub-item'>Credit Account</li></Link>
                            <Link to='/withdraw' ><li className='sub-item'>Debit Account</li></Link>
                            <Link to='/transfer' ><li className='sub-item'>Transfer</li></Link>
                        </ul>
                    </li>
                    <li className='item'>
                        <ul>
                            <Link to='/newloan' ><li className='sub-item'>New Loan</li></Link>
                            <Link to='/applyloan' ><li className='sub-item'>Apply Loan</li></Link>
                          
                        </ul>
                    </li>
                    <li className='item'>
                        <ul>
                            <Link to='/' ><li className='sub-item'>Log Out</li></Link>
                        </ul>
                    </li>

                </ul>
            </nav>
        </div>
    )
}

export default NavBar;