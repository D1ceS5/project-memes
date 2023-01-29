import React from 'react';

import './ItemList.scss';

import Item from '../Item/Item';

const ItemList = (props) => {



    return (
        <>
            {props.list.map(item => <Item key={item.id} user={props.user} type={props.type} changeData={props.changeData} data={item} />)}
        </>
    );
}
export default ItemList;
