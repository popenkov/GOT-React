import React, {Component} from 'react';
import './itemList.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner/';


export default class ItemList extends Component {

    gotService = new gotService();

    state = { //в состоянии будем хранить список персонажей.
        charList: null
    }

    
    componentDidMount() {
        this.gotService.getAllCharacters()
        .then((charList)=> this.setState({
            charList
        }));
    }

    //пишем рендеращий метод для формирования списка героев
    renderItems (arr) {
        return arr.map((item, index) => {
            return <>
                <li 
                key={index} // не забываем создавать ключи. Не самый лучший способ создания.
                className="list-group-item" // метод выбора персонажа подхватывает ИД, чтобы знать, что показывать. 
                onClick={() => {this.props.onCharSelected( 41 + index)}}> 
                    {item.name}
                </li>
            </>
        });
    }

    render() {
        
        const {charList} = this.state;

        

        if(!charList) {
            return <Spinner/>
        }

        const items = this.renderItems(charList);

        return (
            <ul className="item-list list-group-item">
                {items}
            </ul>
        );
    }
}