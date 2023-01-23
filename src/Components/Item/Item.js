import React, { useState, useEffect } from 'react';
import axios from "axios";
import configData from "../../config.json";
import './Item.scss';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Tooltip, Snackbar, Alert } from '@mui/material';

const Item = (props) => {
    let data = props.data

    const [likeList, setLikeList] = useState({
        list: [],
        loaded: false,
        currentCount: data.Likes,
        type: ''
    })
    const [loading, setLoading] = useState(false)
    const [copyShown, setCopyShown] = useState(false)
    useEffect(() => {

        if (likeList.loaded && likeList.type === props.type) return

        axios.get(`${configData.SERVER_URL}/getOrCreateUser`).then((response) => {
            axios({
                method: "post",
                url: `${configData.SERVER_URL}/${props.type === "memes" ? "userlikedmemes" : "userlikedthemes"}`,
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


    }, [data.id,likeList, loading, props.type])
    function getLikeIcon(id) {

        if (likeList != null && !loading) {
            let liked = likeList.list.some(like => like.UserID === props.user && ((like.MemeID === id && props.type === "memes") || (like.ThemeID === id && props.type === "themes")))
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
            url: `${configData.SERVER_URL}/${props.type === "memes" ? "likememes" : "liketheme"}`,
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
    function clickCopy(e) {
        e.stopPropagation();
        let tag = e.target.parentNode.getAttribute("data-tag") || e.target.getAttribute("data-tag")
        navigator.clipboard.writeText("#" + tag)
        setCopyShown(true)
    }
    function previewClick(e) {
        e.stopPropagation();
    }
    function handleCopyClose() {
        setCopyShown(false)
    }
    return <>
        <Snackbar open={copyShown} autoHideDuration={3000} onClose={handleCopyClose}>
            <Alert onClose={handleCopyClose} severity="success"  sx={{ width: '100%' }}>
                Hashtag copied successfully!
            </Alert>
        </Snackbar>
        <Accordion key={crypto.randomUUID()} className='dark-back' >
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
                        <Tooltip title="Copy this hashtag to specify which pack you want to use in game creation" arrow>
                            <Button className='icon-btn' color='secondary' onClick={clickCopy} data-key={data.id} data-tag={data.Hashtag} startIcon={<ContentCopyIcon data-key={data.id} data-tag={data.Hashtag} />} variant="contained" >#{data.Hashtag}</Button>
                        </Tooltip>
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
    </>


}

export default Item;
