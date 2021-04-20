import React, {Component} from 'react';
import './itemList.css';
import styled from 'styled-components';


const UlList=styled.ul`
cursor: pointer;
`;

const UlListItem =styled.li`
cursor: pointer;
`;



export default class ItemList extends Component {

    render() {
        return (
            <ul className="item-list list-group-item">
                <li className="list-group-item">
                    John Snow
                </li>
                <li className="list-group-item">
                    Brandon Stark
                </li>
                <li className="list-group-item">
                    Geremy
                </li>
            </ul>
        );
    }
}