import React, { useState, useEffect } from 'react';
import Header from './Header';
import axios from "axios";
import configData from "../config.json";
import CreateForm from './CreateForm';
import NewPack from './NewPack';
import {
    Route, Routes,
} from 'react-router-dom'

const App = () => {
    const [player, setPlayer] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if(player) return
        setLoading(true)
        axios.get(`${configData.SERVER_URL}/getOrCreateUser`).then((response) => {
            setPlayer(response.data);
            setLoading(false)
        });
       
    },[loading])

    
    return (
        <>
            <Header data={player} ></Header>
            <Routes>
                <Route path="/" element={<CreateForm />} />
                <Route path="/create" element={<NewPack/>} />
            </Routes>

        </>
    );
}

export default App;
