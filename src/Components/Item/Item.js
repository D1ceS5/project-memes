import React, { useState, useEffect } from 'react';
import axios from "axios";
import configData from "../../config.json";
import './Item.scss';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Tooltip } from '@mui/material';
import {guid} from "../../Utility/utils";

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
        let isMeme = Boolean(data.MemeID);
        let configText = localStorage.getItem("gameConfig")
        let gameConfig
        if(!configText) return createConfig()
        try{
            gameConfig = JSON.parse(configText)
            if(isMeme){
                if(!gameConfig.memes.some(gc=>gc.Hashtag === data.Hashtag))
                gameConfig.memes.push(data)
            }
            else{
                if(!gameConfig.themes.some(gc=>gc.Hashtag === data.Hashtag))
                gameConfig.themes.push(data)
            }
            localStorage.setItem("gameConfig",JSON.stringify(gameConfig))
        }catch(e){
            return createConfig()
        }

        function createConfig(){
            if(isMeme){
                gameConfig = {
                    memes: [data],
                    themes: []
                }
                localStorage.setItem('gameConfig',JSON.stringify(gameConfig))
            }
            else{
                gameConfig = {
                    memes: [],
                    themes: [data]
                }
                localStorage.setItem('gameConfig',JSON.stringify(gameConfig))
            }
        }

    }
    function previewClick(e) {
        e.stopPropagation();
        props.changeData(data.MemeID?JSON.parse(data.List).map(e=>`${configData.SERVER_URL}/${e.image}`):JSON.parse(data.List).map(e=>e.text))
        //console.log(data.MemeID?JSON.parse(data.List).map(e=>e.image):JSON.parse(data.List).map(e=>e.text))
    }
    return <>

        <Accordion key={guid()}  className='dark-back'  >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon fontSize='large' color='secondary' />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className='dark-back'
            >
                <div className='main-info'>
                    <div className='item-title-cont'>
                        <span className='item-title' >{data.Name} </span>
                        <span className='item-tag'>#{data.Hashtag} </span>
                    </div>

                    <div className='button-cont' >
                        <Button  className='preview-btn' color='secondary' data-key={data.id} onClick={previewClick} variant="contained" >PREVIEW</Button>
                        <Tooltip title="Add this pack to game config" arrow>
                            <Button className='preview-btn' color='secondary' onClick={clickCopy} data-key={data.id} data-tag={data.Hashtag} startIcon={<AddBoxIcon data-key={data.id} data-tag={data.Hashtag} />} variant="contained" >SELECT</Button>
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
