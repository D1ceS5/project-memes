import React, { useState, useEffect } from 'react';

import './styles/packs.css';

import Item from './Item';

const ItemList = (props) => {

    

   

    return (
        <>
            {props.list.map(item => <Item key={item.id} user={props.user} type={props.type} data={item} />)}
        </>

    );
}

export default ItemList;
