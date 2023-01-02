import React, { useState, useEffect } from 'react';
import './styles/packs.css';
import axios from "axios";
import configData from "../config.json";
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from '@mui/material/styles';
import ItemList from './ItemList';

const PackList = (props) => {

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

            if (response.data.themes || response.data.memes) {

                setThemes((prev) => {
                    return {
                        ...prev,
                        list: response.data.themes
                    }
                })
                setMemes((prev) => {
                    return {
                        ...prev,
                        list: response.data.memes
                    }
                })
                setLoading(false)
                
            }
            
        });

    }, [loading])

    function tabChange(e) {

        setTab(Number(e.target.getAttribute("data-value")))
    }
    function renderCurrentTab() {
        console.log("PACK LIST USER",props.user);
        switch (tab) {
            case 0: {
                return <ItemList user={props.user} type="themes" list={themes.list.map(e => { return { ...e, id: e.ThemeID } })} />
            }
            case 1: {
                return <ItemList user={props.user} type="memes" list={memes.list.map(e => { return { ...e, id: e.MemeID } })} />
            }
        }
    }

    return (
        <ThemeProvider theme={muiTheme}>
            <div className='list-cont'>
                <div className='packs-cont' >
                    <Tabs value={tab} variant="fullWidth" onChange={tabChange} centered>
                        <Tab className='font' data-value="0" label="Themes" />
                        <Tab className='font' data-value="1" label="Memes" />
                    </Tabs>

                </div>
                <div className='packs-cont' >
                    {renderCurrentTab()}
                </div>
            </div>


        </ThemeProvider>

    );
}

export default PackList;
