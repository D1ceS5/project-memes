import React, { useState, useEffect } from 'react';
import './Lobby.scss';
import PlayerList from "../../Components/PlayerList/PlayerList";

const Lobby = ({player,socket}) => {


    return (
        <div className='lobby-cont' >
            <div className="lobby-header" > WAITING FOR PLAYERS </div>
            <div className="game-wrapper" >
                <div className="game-field" >

                </div>
                <div className="game-player-list">
                    <PlayerList></PlayerList>
                </div>

            </div>
        </div>
    );
}

export default Lobby;
