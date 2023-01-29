export function  guid(){
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function handleCreate(data){
    localStorage.removeItem("gameConfig") // Clear game config which used to create game
    localStorage.setItem("gameData",JSON.stringify(data)); // Set game data which used to run the game
    window.location = `/game/${data.id}` // Redirect user to game lobby
}

export function handleMessage(message){
    switch (message.type){
        case 'create': {
            return handleCreate(message.data)
        }
        default:{
            return
        }
    }
}