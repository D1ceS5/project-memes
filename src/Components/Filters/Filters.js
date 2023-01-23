import React from 'react';

import './Filters.scss';

import { ThemeProvider, createTheme, } from "@mui/material/styles";
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
const Filters = (props) => {

    function searchChange(e) {
        props.changeSearch(e)
    }
    function sortChange(e) {
        props.changeSort(e)
    }

    return (
        <ThemeProvider theme={theme}>
            <>
                <input type="text" placeholder='Search' className='inp' onChange={searchChange} />
                <select placeholder="Sort by" onChange={sortChange} className='select inp'>
                    <option  className='option' value={null}>Sort by</option>
                    <option  className='option' value={JSON.stringify({field:"Likes",type:"ASC"})}>Likes (Low to high)</option>
                    <option  className='option' value={JSON.stringify({field:"Likes",type:"DESC"})}>Likes (High to low)</option>
                    <option  className='option' value={JSON.stringify({field:"Name",type:"ASC"})}>Name (A-Z)</option>
                    <option  className='option' value={JSON.stringify({field:"Name",type:"DESC"})}>Name (Z-A)</option>
                </select>
            </ >
        </ThemeProvider>
    );
}

export default Filters;
