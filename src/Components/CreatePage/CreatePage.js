import React, { useEffect } from 'react';
import Instruction from '../Instruction/Instruction';
import './CreatePage.scss';
import '../styles/index.scss';
import CreateForm from "../CreateForm/CreateForm";
const CreatePage = () => {

    useEffect(() => {

    }, [])




    return (
        <div className='main-cont'>
            <div className='home-cont'>
               <CreateForm />
                <Instruction />
            </div>

        </div>

    );
}

export default CreatePage;
