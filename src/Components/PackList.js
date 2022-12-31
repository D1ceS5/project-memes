import React, { useState, useEffect } from 'react';
import './styles/packs.css';
import axios from "axios";
import configData from "../config.json";
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from '@mui/material/styles';
import ItemList from './ItemList';

const PackList = () => {

    const muiTheme = createTheme(configData.THEME);
    const [themes, setThemes] = useState({
        list: []
    })
    const [memes, setMemes] = useState({
        list: []
    })
    const [loading, setLoading] = useState(false)
    const [tab, setTab] = useState(0)
    useEffect(() => {
        if (themes.list.length > 0 || memes.list.length > 0) return
        setLoading(true)
        axios.get(`${configData.SERVER_URL}/getpacks`).then((response) => {
            console.log("RESP", response);
            if (response.data.themes || response.data.memes) {
                
                setThemes((prev)=>{
                    return {
                        ...prev,
                        list: response.data.themes
                    }
                })
                setMemes((prev)=>{
                    return {
                        ...prev,
                        list: response.data.memes
                    }
                })
                setLoading(false)
                console.log("RESP INNER",themes,memes);
            }
            console.log(themes, memes)
        });

    }, [loading])

    function tabChange(e) {
        console.log(e.target.getAttribute("data-value"))
        setTab(Number(e.target.getAttribute("data-value")))
    }
    function renderCurrentTab() {
        switch (tab) {
            case 0: {
                return <ItemList list={themes.list} />
            }
            case 1: {
                return <ItemList list={memes.list} />
            }
        }
    }

    return (
        <ThemeProvider theme={muiTheme}>
            <div className='packs-cont' >
                <Tabs value={tab} variant="fullWidth" onChange={tabChange} centered>
                    <Tab className='font' data-value="0" label="Themes" />
                    <Tab className='font' data-value="1" label="Memes" />
                </Tabs>
            </div>
            {renderCurrentTab()}
        </ThemeProvider>

    );
}

export default PackList;
