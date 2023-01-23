import React, { useState, useEffect } from 'react';
import './PackList.scss';
import axios from "axios";
import configData from "../../config.json";
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import ItemList from '../ItemList/ItemList';
import Filters from '../Filters/Filters'

const PackList = (props) => {

    const [themes, setThemes] = useState({
        list: [],
        loaded: false
    })
    const [memes, setMemes] = useState({
        list: [],
        loaded: false
    })
    const [loading, setLoading] = useState(false)
    const [tab, setTab] = useState(0)
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState(false);
    const [page, setPage] = useState()
    useEffect(() => {
        console.log(themes.loaded, memes.loaded)
        if (themes.loaded || memes.loaded) return
        setLoading(true)
        axios({
            method: "post",
            url: `${configData.SERVER_URL}/getpacks`,
            data: JSON.stringify({ search, sort }),
            headers: { "Content-Type": "application/json" },
        }).then((response) => {
            console.log(response)
            if (response.data.themes || response.data.memes) {

                setThemes((prev) => {
                    return {
                        ...prev,
                        list: response.data.themes,
                        loaded: true
                    }
                })
                setMemes((prev) => {
                    return {
                        ...prev,
                        list: response.data.memes,
                        loaded: true
                    }
                })
                setLoading(false)

            }

        });

    }, [memes.loaded,search,sort,themes.loaded,loading])

    let timer
    function changeSearch(e) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            setSearch(e.target.value)
            setThemes((prev) => {
                return {
                    ...prev,
                    loaded: false
                }
            })
            setMemes((prev) => {
                return {
                    ...prev,
                    loaded: false
                }
            })
            setLoading(true)
        }, 1000)
    }
    function changeSort(e) {
       
        try {
            setSort(JSON.parse(e.target.value))
        } catch (e) {
            setSort(null)
        }
        console.log(sort)
        setThemes((prev) => {
            return {
                ...prev,
                loaded: false
            }
        })
        setMemes((prev) => {
            return {
                ...prev,
                loaded: false
            }
        })
        setLoading(true)
    }

    function tabChange(e) {

        setTab(Number(e.target.getAttribute("data-value")))
    }
    function renderCurrentTab() {
        console.log("PACK LIST USER", props.user);
        switch (tab) {
            case 0: {
                return <ItemList user={props.user} type="themes" list={themes.list.map(e => { return { ...e, id: e.ThemeID } })} />
            }
            case 1: {
                return <ItemList user={props.user} type="memes" list={memes.list.map(e => { return { ...e, id: e.MemeID } })} />
            }
            default: {
                return <></>
            }
        }
    }

    return (
        <>
            <div className='list-cont'>
                <div className='packs-cont' >
                    <Tabs value={tab} variant="fullWidth" onChange={tabChange} centered>
                        <Tab className='font' data-value="0" label="Themes" />
                        <Tab className='font' data-value="1" label="Memes" />
                    </Tabs>

                </div>
                <div className='filters-cont' >
                    <Filters changeSearch={changeSearch} changeSort={changeSort}  ></Filters>
                </div>
                <div className='packs-cont' >
                    {renderCurrentTab()}
                </div>
            </div>


        </>

    );
}

export default PackList;
