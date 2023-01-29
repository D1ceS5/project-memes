import React, { useState, useEffect } from 'react';
import './Instruction.scss';

const Instruction = () => {
    const [index, setIndex] = useState(0)
    const [timer,setTimer] = useState(null)
    const instructions = [
        { text: "On first turn, random MEMELORD will be chosen automatically", image: "/instruction/inst1.png" },
        { text: "All players will have random pack ( 5 cards ) of memes on game start", image: "/instruction/inst2.png" },
        { text: "Random situation from theme will appear on game table", image: "/instruction/inst1.png" },
        { text: "Players need to choose a meme to respond to the current situation", image: "/instruction/inst1.png" },
        { text: "MEMELORD select which of the memes he liked the most, and gives the player a point, and the title of MEMELORD", image: "/instruction/inst1.png" },
    ]

    useEffect(() => {
        if(timer) clearTimeout(timer)
        let timerNew = setTimeout(() => {
            setIndex(index + 1)
        }, 5000)
        setTimer(timerNew)
        
        
    }, [index])


    function handleClick(e) {
        setIndex(Number(e.currentTarget.id))
    }

    return (
        <div className='instruction-cont' >
            <h3 className='form-title white' >GAME RULES</h3>
            <img src={instructions[index % 5].image}  alt="Instruction"/>
            <div className='instruction' >{instructions[index % 5].text}</div>

            <div className='dots' >
                <div id='0' className={index % 5 === 0 ? 'dot active' : 'dot'} onClick={handleClick} ></div>
                <div id='1' className={index % 5 === 1 ? 'dot active' : 'dot'} onClick={handleClick} ></div>
                <div id='2' className={index % 5 === 2 ? 'dot active' : 'dot'} onClick={handleClick}></div>
                <div id='3' className={index % 5 === 3 ? 'dot active' : 'dot'} onClick={handleClick}></div>
                <div id='4' className={index % 5 === 4 ? 'dot active' : 'dot'} onClick={handleClick}></div>
            </div>
        </div>
    );
}

export default Instruction;
