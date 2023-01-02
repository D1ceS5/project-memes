import React, { useState, useEffect } from 'react';
import Instruction from './Instruction';
import axios from "axios";
import configData from "../config.json";
import './styles/packs.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Item = (props) => {
    let data = props.data

    const [likeList, setLikeList] = useState({
        list: [],
        loaded: false,
        currentCount: data.Likes,
        type: ''
    })
    const [loading, setLoading] = useState(false)
    useEffect(() => {

        if (likeList.loaded && likeList.type == props.type) return

        axios.get(`${configData.SERVER_URL}/getOrCreateUser`).then((response) => {
            axios({
                method: "post",
                url: `${configData.SERVER_URL}/${props.type == "memes" ? "userlikedmemes" : "userlikedthemes"}`,
                data: JSON.stringify({ id: data.id, user: response.data.UserID }),
                headers: { "Content-Type": "application/json" },
            }).then((res) => {
                setLikeList((prev) => {
                    return {
                        ...prev,
                        list: res.data.likes,
                        loaded: true,
                        currentCount: res.data.count,
                        type: props.type
                    }
                })


            })
        });


    }, [likeList, loading,props.type])
    function getLikeIcon(id) {
        
        if (likeList != null && !loading) {
            let liked = likeList.list.some(like => like.UserID == props.user && ((like.MemeID == id && props.type == "memes") || (like.ThemeID == id && props.type == "themes")))
            if (liked) return <FavoriteIcon data-key={id} />
            else return <FavoriteBorderIcon data-key={id} />
        }
        else return <FavoriteBorderIcon data-key={id} />

    }
    async function clickLike(e) {
        e.stopPropagation();
        let id = e.target.parentNode.getAttribute("data-key") || e.target.getAttribute("data-key")
        await axios({
            method: "post",
            url: `${configData.SERVER_URL}/${props.type == "memes" ? "likememes" : "liketheme"}`,
            data: JSON.stringify({ id: id, user: props.user }),
            headers: { "Content-Type": "application/json" },
        })
        setLikeList((prev) => {
            return {
                ...prev,
                loaded: false
            }
        });
    }
    function clickDownload(e) {
        e.stopPropagation();
    }
    function previewClick(e) {
        e.stopPropagation();
    }

    return <Accordion key={crypto.randomUUID()} className='dark-back marged' >
        <AccordionSummary
            expandIcon={<ExpandMoreIcon fontSize='large' color='secondary' />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className='dark-back'
        >
            <div className='main-info'>
                <div className='item-title'>{data.Name}</div>
                <div className='button-cont' >
                    <Button className='preview-btn' color='secondary' onClick={previewClick} variant="contained" >PREVIEW</Button>
                    <Button className='icon-btn' color='secondary' onClick={clickDownload} data-key={data.id} startIcon={<ContentCopyIcon data-key={data.id} />} variant="contained" >#AC2F4G</Button>
                    <Button className='icon-btn' color='secondary' onClick={clickLike} data-key={data.id} startIcon={getLikeIcon(data.id)} variant="contained" >{likeList.currentCount}</Button>
                </div>
            </div>
        </AccordionSummary>
        <AccordionDetails>
            <div className='more-info'>
                <div className='item-description'>{data.Description}</div>
            </div>
        </AccordionDetails>
    </Accordion>
}

export default Item;
