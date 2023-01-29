import React, { useEffect,useState } from 'react';
import './CreateForm.scss';
import GameConfig from "../GameConfig/GameConfig";
import MemesPreview from "../MemesPreview/MemesPreview";
import ThemePreview from "../ThemePreview/ThemePreview";
import {Link} from "react-router-dom";
import configData from "../../config.json";
import {handleMessage} from "../../Utility/utils";

const CreateForm = ({socket ,openSocket,player }) => {
    const [preview,setPreview] = useState({type: false, data: false})
    const [configState,setConfigState] = useState(null)
    const [gameName,setGameName] = useState('')
    const [gamePass,setGamePass] = useState('')
    let interval
    useEffect(()=>{
        if(interval)clearInterval(interval)
        interval = setInterval(()=>{
            const ctx = localStorage.getItem("gameConfig")
            if(ctx !== configState) setConfigState(ctx);
        },300)
    },[configState])

    function changeDataPreview(data,type){
        console.log("Changing preview",data)
        setPreview((prevState)=>{
            return {
                ...prevState,
                type: type,
                data: data
            }
        })
        console.log(preview)
    }
    function closePreview(){
        setPreview((prevState)=>{
            return {
                ...prevState,
                data: false,
                type: false
            }
        })
    }
    function gameNameChange(e){
        setGameName(e.target.value)
    }
    function gamePassChange(e){
        setGamePass(e.target.value)
    }
    function gameCreate(){
        let ws = new WebSocket(configData.SOCKET_URL)
        let gamePayload = {
            type: "create",
            data: {
                gameMode: "default",
                config: JSON.parse(configState),
                name: gameName,
                password: gamePass,
                players: [player],
                status: "CREATED"
            }
        }
        ws.onmessage = (message)=>{
            let response = JSON.parse(message.data)
            handleMessage(response);
        }
        ws.onopen= ()=>{
            ws.send(JSON.stringify(gamePayload))
        }
        openSocket(ws)
    }
    let config
    try{
        config = JSON.parse(configState);
    }catch (e){
        console.log("Config empty")
    }
    let configValid =  Boolean(config) && Boolean(config.memes) && Boolean(config.themes) && config.memes.length > 0 && config.themes.length > 0
    let themeOpen = Boolean(preview.data) && preview.type === "theme"
    let memeOpen = Boolean(preview.data) && preview.type === "meme"
    return (
        <>
            <MemesPreview open={memeOpen} images={preview.data} memesClose={closePreview} />
            <ThemePreview open={themeOpen} text={preview.data} themesClose={closePreview} />
            <div className='form-cont' >
                <h3 className='form-title' >CREATE GAME</h3>
                <div className="config-create-header" hidden={configValid}>
                    <span>You need to create game config,before you start</span>
                    <Link to="/packs">CREATE CONFIG</Link>
                </div>
                <input type="text" placeholder="Enter game name.." className='inp' onChange={gameNameChange} required></input>
                <input type="password" placeholder="Enter password.." className='inp' onChange={gamePassChange}></input>
                <div className="config-create-cont" hidden={!configValid}>
                    <GameConfig changePreview={changeDataPreview} />
                </div>
                <button className='create-btn'  onClick={gameCreate} >CREATE</button>
            </div>
        </>


    );
}

export default CreateForm;
