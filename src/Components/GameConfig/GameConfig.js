import React, {useEffect, useState} from "react";
import {Chip,Tooltip} from "@mui/material";
import "./GameConfig.scss"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import configData from "../../config.json";
const GameConfig = ({changePreview}) => {

    const [configState,setConfigState] = useState(null)

    let interval
    useEffect(()=>{
        if(interval)clearInterval(interval)
        interval = setInterval(()=>{
            const ctx = localStorage.getItem("gameConfig")
            if(ctx !== configState) setConfigState(ctx);
        },300)
    },[configState])

    function createMemeChip(meme){
        function changeMemePrev(){
            changePreview(JSON.parse(meme.List).map(e=>`${configData.SERVER_URL}/${e.image}`),"meme")
        }
        function deleteTag(){
            let gameConfig = JSON.parse(configState)
            let index = gameConfig.memes.findIndex(m=>m.Hashtag === meme.Hashtag)
            console.log(gameConfig)
            gameConfig.memes.splice(index,1)
            localStorage.setItem('gameConfig',JSON.stringify(gameConfig))
        }

        return <Tooltip title={meme.Name} key={meme.Hashtag} arrow>
            <Chip
                className="config-chip"

                label={"#"+meme.Hashtag}
                variant="outlined"
                onClick={changeMemePrev}
                onDelete={deleteTag}
                deleteIcon={<HighlightOffIcon />}
            />
        </Tooltip>

    }

    function createThemeChip(theme){
        function changeThemePrev(){
            changePreview(JSON.parse(theme.List).map(e=>e.text),"theme")
        }
        function deleteTag(){
            let gameConfig = JSON.parse(configState)
            let index = gameConfig.themes.findIndex(t=>t.Hashtag === theme.Hashtag)
            console.log(gameConfig)
            gameConfig.themes.splice(index,1)
            localStorage.setItem('gameConfig',JSON.stringify(gameConfig))
        }

        return <Tooltip title={theme.Name} key={theme.Hashtag} arrow>
            <Chip
                className="config-chip"

                label={"#"+theme.Hashtag}
                variant="outlined"
                onClick={changeThemePrev}
                onDelete={deleteTag}
                deleteIcon={<HighlightOffIcon />}
            />
        </Tooltip>

    }


    if(configState){
        const config = JSON.parse(configState)
        return(
            <div className="config-cont">
                <div className='config-header' >GAME CONFIG</div>
                <div className="theme-config">
                    {config?.themes?.map( t => createThemeChip(t) )}
                </div>
                <div className="memes-config">
                    {config?.memes?.map( m => createMemeChip(m) )}
                </div>
            </div>
        )
    }
    else{
        return <></>
    }


}

export default  GameConfig