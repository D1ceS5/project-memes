import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

const NewPack = () => {

    const [pack, setPack] = useState({
        theme: {
            name: '',
            description: '',
            list: []
        },
        memes: {
            name: '',
            description: '',
            list: []
        }
    })
    const [theme, setTheme] = useState('')
    const [editId, setEditId] = useState('')
    const [editText, setEditText] = useState('')

    useEffect(() => {

    }, [editId])

    let guid = () => {
        let s4 = () => {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
    function handleThemeChange(e) {
        let v = e.target.value
        setTheme(v);
    }

    function addTheme(e) {
        if (theme) {
            let oldList = pack.theme.list
            oldList.push({
                id: guid(),
                text: theme
            })
            setPack(prevPack => {
                return {
                    ...prevPack,
                    theme: {
                        ...prevPack.theme,
                        list: oldList
                    }
                }
            })
            setTheme('')
        }
    }

    function changeMemesName(e) {
        setPack(prevPack => {
            return {
                ...prevPack,
                memes: {
                    ...prevPack.memes,
                    name: e.target.value
                }
            }
        })
    }
    function changeMemesDescription(e) {
        setPack(prevPack => {
            return {
                ...prevPack,
                memes: {
                    ...prevPack.memes,
                    description: e.target.value
                }
            }
        })
    }
    function changeThemeName(e) {
        setPack(prevPack => {
            return {
                ...prevPack,
                theme: {
                    ...prevPack.theme,
                    name: e.target.value
                }
            }
        })
    }
    function changeThemeDescription(e){
        setPack(prevPack => {
            return {
                ...prevPack,
                theme: {
                    ...prevPack.theme,
                    description: e.target.value
                }
            }
        })
    }

    function deleteTheme(e) {
        let id = e.target.parentNode.getAttribute("data-key") || e.target.getAttribute("data-key")
        if (id) {
            let oldList = pack.theme.list
            oldList.splice(oldList.findIndex(e => e.id == id), 1)
            setPack(prevPack => {
                return {
                    ...prevPack,
                    theme: {
                        ...prevPack.theme,
                        list: oldList
                    }
                }
            })
        }
    }
    function deleteMeme(e) {
        let id = e.target.parentNode.getAttribute("data-key") || e.target.getAttribute("data-key")
        if (id) {
            let oldList = pack.memes.list
            oldList.splice(oldList.findIndex(e => e.id == id), 1)
            setPack(prevPack => {
                return {
                    ...prevPack,
                    memes: {
                        ...prevPack.memes,
                        list: oldList
                    }
                }
            })
        }
    }
    function editChange(e) {
        setEditText(e.target.value)
    }
    function editTheme(e) {
        let id = e.target.parentNode.getAttribute("data-key") || e.target.getAttribute("data-key")
        if (id) {
            setEditId(id)
            setEditText(pack.theme.list[pack.theme.list.findIndex(e => e.id == id)].text)
        }
    }
    function confirmTheme(e) {
        let id = e.target.parentNode.getAttribute("data-key") || e.target.getAttribute("data-key")
        if (editText && id) {
            let oldList = pack.theme.list
            oldList[oldList.findIndex(e => e.id == id)].text = editText
            setPack(prevPack => {
                return {
                    ...prevPack,
                    theme: {
                        ...prevPack.theme,
                        list: oldList
                    }
                }
            })
            setEditId('')
            setEditText('')
        }
    }
    async function handleImageChange(e) {
        console.log(e.target.files)
        for (let f of e.target.files) {
            getBase64(f).then(r => {
                let oldList = pack.memes.list
                oldList.push({
                    id: guid(),
                    file: r
                })
                setPack(prevPack => {
                    return {
                        ...prevPack,
                        memes: {
                            ...prevPack.memes,
                            list: oldList
                        }
                    }
                })
            })
        }
    }
    function createThemeEl(text, key) {
        return <div className='theme' key={'item' + key} >
            <div className='icons' >
                <div className={key == editId ? 'icons-cont ' : 'icons-cont hidden'} onClick={confirmTheme} data-key={key} >
                    <SvgIcon data-key={key} children={<CheckIcon data-key={key} />}></SvgIcon>
                </div>
                <div className={key == editId ? 'icons-cont hidden' : 'icons-cont '} onClick={editTheme} data-key={key} >
                    <SvgIcon data-key={key} children={<EditIcon data-key={key} />}></SvgIcon>
                </div>
                <div className='icons-cont' onClick={deleteTheme} data-key={key}>
                    <SvgIcon data-key={key} children={<DeleteIcon data-key={key} />}></SvgIcon >
                </div>

            </div>
            <textarea type="text" placeholder="Enter memes name.." value={editText} onChange={editChange} className={key == editId ? 'inp' : 'inp hidden'} ></textarea>
            <div className={key == editId ? 'texttheme hidden' : 'texttheme'}>{text}</div>
        </div>
    }
    function getBase64(file) {
        const reader = new FileReader()
        return new Promise(resolve => {
            reader.onload = ev => {
                resolve(ev.target.result)
            }
            reader.readAsDataURL(file)
        })
    }
    function createMemeEl(file, key) {
        return <div className='theme transparent meme' key={'item' + key} >
            <div className='icons' >

                <div className='icons-cont' onClick={deleteMeme} data-key={key}>
                    <SvgIcon data-key={key} children={<DeleteIcon data-key={key} />}></SvgIcon >
                </div>

            </div>
            <img src={file}></img>
        </div>
    }

    function createPack(e){
        console.log(pack)

    }

    return (
        <div className='main-cont' >
            <Button className='add-btn orange' variant="contained" onClick={createPack} >CREATE</Button>
            <div className='two-form-cont' >
                <input type="text" placeholder="Enter theme name.." onChange={changeThemeName} className='inp' ></input>
                <input type="text" placeholder="Enter theme description.." onChange={changeThemeDescription} className='inp' ></input>
                <div className='theme-cont'>
                    {pack.theme.list.map(t => createThemeEl(t.text, t.id))}
                    <div className='theme' >
                        <textarea type="text" placeholder="Enter theme.." value={theme} onChange={handleThemeChange} maxLength={250} className='inp' ></textarea>
                        <Button className='add-btn' variant="contained" onClick={addTheme} >ADD</Button>
                    </div>
                </div>
            </div>
            <div className='two-form-cont' >
                <input type="text" placeholder="Enter memes name.." onChange={changeMemesName} className='inp' ></input>
                <input type="text" placeholder="Enter memes description.." onChange={changeMemesDescription} className='inp' ></input>
                <div className='theme-cont'>
                    {pack.memes.list.map((t) => createMemeEl(t.file, t.id))}
                    <div className='theme' >

                        <Button className='add-btn full-height' variant="contained" component="label">
                            Upload
                            <input hidden id="file" accept="image/*" onChange={handleImageChange} multiple type="file" />
                        </Button>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default NewPack;
