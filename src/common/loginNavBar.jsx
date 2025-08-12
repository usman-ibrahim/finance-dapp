import React from 'react';
import '../App.css'
import { Link } from 'react-router-dom';

function LoginNavBar() {
    return (
        <div className='nab-container'>
            <nav>
                <ul>
                    <Link to='/' ><li className='sub-item'>Landing</li></Link>
    
                </ul>
            </nav>
        </div>
    )
}

export default LoginNavBar;