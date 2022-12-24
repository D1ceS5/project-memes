import React, { useState, useEffect } from 'react';
import Instruction from './Instruction';
import axios from "axios";
import './styles/index.css';
const Body = () => {

    useEffect(() => {

    }, [])




    return (
        <div className='main-cont'>
            <div className='form-cont' >
                <h3 className='form-title' >CREATE GAME</h3>
                <input type="text" placeholder="Enter game name.." className='inp' ></input>
                <input type="password" placeholder="Enter password.." className='inp' ></input>
                <label className=' file'>
                    <input type="file" accept="application/JSON" className='fileinp' ></input>
                    SELECT THEME
                </label>
                <label className=' file'>
                    <input type="file" accept="application/JSON" className='fileinp' ></input>
                    SELECT MEMES
                </label>
                <button className='create-btn'  >CREATE</button>
            </div>

            <Instruction></Instruction>
        </div>

    );
}

export default Body;
