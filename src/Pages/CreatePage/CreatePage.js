import React, { useEffect } from 'react';
import Instruction from '../../Components/Instruction/Instruction';
import './CreatePage.scss';
import '../../styles/index.scss';
import CreateForm from "../../Components/CreateForm/CreateForm";
const CreatePage = ({socket,openSocket,player}) => {

    useEffect(() => {

    }, [])




    return (
        <div className='main-cont'>
            <div className='home-cont'>
               <CreateForm socket={socket} openSocket={openSocket} player={player}/>
                <Instruction />
            </div>

        </div>

    );
}

export default CreatePage;
