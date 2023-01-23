import React, { useState, useEffect } from 'react';
import Header from './Header/Header';
import axios from "axios";
import configData from "../config.json";
import CreatePage from './CreatePage/CreatePage';
import NewPack from './NewPack/NewPack';
import PackList from './PackList/PackList';
import {
    Route, Routes,
} from 'react-router-dom'

import { ThemeProvider, createTheme, } from "@mui/material/styles";
import { GlobalStyles } from '@mui/material';
const inputGlobalStyles = <GlobalStyles styles={{ "*": { color: "#FFF !important" } }} />;
const themeOptions = {
    palette: {
        type: 'dark',
        primary: {
            main: '#c25700',
            contrastText: "#fff"
        },
        secondary: {
            main: '#fff',
            contrastText: "#fff"
        },
        background: {
            default: '#000',
            paper: '#fff'
        },
        action: {
            active: "#FFF",
            hover: "#FFF",
            selected: "#FFF",
            disabled: "#FFF",
            disabledBackground: "#FFF",
        }
        
    },
    text: {
        primary: 'rgba(255,255,255,0.87)'
    },
    components: {
        MuiSelect: {
            styleOverrides: {
                select: {
                    color: "#fff",
                    '&:before': {
                        borderColor: "#fff",
                    },
                    '&:after': {
                        borderColor: "#fff",
                    },
                    '&:not(.Mui-disabled):hover::before': {
                        borderColor: 'white',
                    },
                },
                notchedOutline: {
                    borderColor: "#fff !important"
                },
                icon: {
                    fill: 'white',
                },
            }
        }
    }
};
const theme = createTheme(themeOptions)

const App = () => {
    const [player, setPlayer] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (player) return
        setLoading(true)
        axios.get(`${configData.SERVER_URL}/getOrCreateUser`).then((response) => {
            setPlayer(response.data);
            setLoading(false)
        });

    }, [player,loading])


    console.log("MAIN USER", player.UserID)
    return (
        <ThemeProvider theme={theme}>
            {inputGlobalStyles}
            <Header data={player} ></Header>
            <Routes>
                <Route path="/" element={<CreatePage />} />
                <Route path="/create" element={<NewPack />} />
                <Route path="/packs" element={<PackList user={player.UserID} />} />
            </Routes>

        </ThemeProvider>
    );
}

export default App;
