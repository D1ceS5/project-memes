import React, { useState, useEffect } from 'react';
import Instruction from './Instruction';
import axios from "axios";
import './styles/packs.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
const ItemList = (props) => {
    console.log(props);
    function createElement(data) {
        return <Accordion key={crypto.randomUUID()} className='dark-back' >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className='dark-back'
            >
                <Typography>{data.Name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {data.Description}
                </Typography>
            </AccordionDetails>
        </Accordion>
    }

    return (
        <>
            {props.list.map(item => createElement(item))}
        </>

    );
}

export default ItemList;
